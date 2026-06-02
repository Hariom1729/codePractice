import pypdf
import re
from pymongo import MongoClient
import random
import datetime

def parse_pdf_and_seed():
    print("Reading PDF...")
    reader = pypdf.PdfReader('dsa_sheet.pdf')
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"

    print("Parsing problems...")
    problems = []
    for line in text.split('\n'):
        line = line.strip()
        match = re.match(r'^(\d+)\s+(.+)', line)
        if match:
            num = int(match.group(1))
            if num > 450:
                continue
            title_raw = match.group(2)
            # Remove anything from '(' onwards
            title = title_raw.split('(')[0].strip()
            
            # Additional cleanup
            if title.endswith('[V. IMP]'):
                title = title.replace('[V. IMP]', '').strip()
            if title.endswith('[V.IMP]'):
                title = title.replace('[V.IMP]', '').strip()

            if len(title) > 5 and "Questions" not in title and not title.startswith("http"):
                problems.append(title)

    # De-duplicate preserving order
    seen = set()
    unique_problems = []
    for p in problems:
        if p not in seen:
            seen.add(p)
            unique_problems.append(p)

    print(f"Found {len(unique_problems)} unique problems.")

    print("Connecting to MongoDB...")
    client = MongoClient('mongodb://localhost:27017/codepractice')
    db = client.get_database()
    Problem = db.problems

    print("Clearing existing problems...")
    Problem.delete_many({})

    docs = []
    difficulties = ["Easy", "Medium", "Hard"]

    for title in unique_problems:
        docs.append({
            "title": title,
            "description": f"<p><strong>Problem:</strong> {title}</p><p>This is a seeded problem from the Love Babbar DSA 450 sheet. Provide an optimal solution.</p>",
            "difficulty": random.choice(difficulties),
            "testCases": [{"input": "Sample Input", "expectedOutput": "Sample Output", "isHidden": False}],
            "boilerplates": {"javascript": "function solve() {\n  // Write your code here\n}\n"},
            "createdAt": datetime.datetime.utcnow(),
            "updatedAt": datetime.datetime.utcnow(),
        })

    if docs:
        Problem.insert_many(docs)
        print(f"Successfully inserted {len(docs)} problems into the database.")
    else:
        print("No problems found to insert.")

if __name__ == "__main__":
    parse_pdf_and_seed()
