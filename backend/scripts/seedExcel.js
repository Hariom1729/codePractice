require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const xlsx = require('xlsx');
const { GoogleGenAI } = require('@google/genai');
const path = require('path');
const Problem = require('../models/Problem');

// Force the SDK to use GEMINI_API_KEY by unsetting the global GOOGLE_API_KEY
if (process.env.GOOGLE_API_KEY) {
  delete process.env.GOOGLE_API_KEY;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runSeed() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY in .env file.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codepractice');
  console.log('Connected to MongoDB.');

  const excelPath = path.join(process.env.HOME || process.env.USERPROFILE, 'Downloads', 'final450.xlsx');
  console.log(`Reading Excel file: ${excelPath}`);
  
  const workbook = xlsx.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  console.log(`Found ${data.length} rows.`);

  const promptTemplate = (title, topic) => `
Act as an Expert Competitive Programming Problem Setter. 
I am building a coding platform. I need you to generate the problem data for the following question.

Problem Title: "${title}"
Topic: "${topic}"

You must return a strict JSON object matching my database schema. 

### CRITICAL INSTRUCTION 1: BOILERPLATE CODE (DO NOT SOLVE)
You must generate the starter boilerplate code for JavaScript (Node.js), Python, and C++. 
- DO NOT WRITE THE SOLUTION. 
- DO NOT write the logic. 
- You MUST use meaningful parameter names based on the problem context (e.g., use 'nums', 'matrix', 'head', 'k' instead of a generic 'input').
- ALL languages MUST use a class-based boilerplate named \`Solution\`.
- The boilerplate must ONLY contain the \`Solution\` class, the target method, a comment saying "// Write your code here", and a dummy return statement.
- You MUST extract the exact name of the method and store it in the \`functionName\` field for each language.

Example of CORRECT C++ Boilerplate:
class Solution {
public:
    int findMax(vector<int>& nums) {
        // Write your code here
        return 0; 
    }
};

Example of CORRECT Python Boilerplate:
class Solution:
    def findMax(self, nums: List[int]) -> int:
        # Write your code here
        return 0

Example of CORRECT JavaScript Boilerplate:
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMax(nums) {
        // Write your code here
        return 0;
    }
}

### CRITICAL INSTRUCTION 2: TEST CASES
Generate mathematically and logically flawless test cases. The output MUST perfectly match the input based on standard algorithm rules.
- 'sampleTestCases': Generate exactly 2 simple test cases for the problem description.
- 'hiddenTestCases': Generate 8 robust test cases. You MUST include edge cases: empty arrays, single elements, negative numbers, and maximum constraint bounds.
- Ensure the formatting of the input strings matches exactly what a backend parser would expect (e.g., "[1, 2, 3]").

### REQUIRED JSON STRUCTURE:
{
  "title": "${title}",
  "topic": "${topic}",
  "difficulty": "Easy" | "Medium" | "Hard",
  "descriptionMarkdown": "Rich markdown with 3 sections: Description, Examples (matching the 2 sample test cases), and Constraints.",
  "boilerplates": [
    { "language": "javascript", "functionName": "findMax", "signatureCode": "..." },
    { "language": "python", "functionName": "findMax", "signatureCode": "..." },
    { "language": "cpp", "functionName": "findMax", "signatureCode": "..." }
  ],
  "sampleTestCases": [ { "input": "...", "expectedOutput": "..." } ],
  "hiddenTestCases": [ { "input": "...", "expectedOutput": "..." } ]
}
`;

  let successCount = 0;
  
  const models = [
    'gemini-flash-latest',
    'gemini-3.1-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.0-flash-001',
    'gemini-2.0-flash-lite-001',
    'gemini-3-flash-preview',
    'gemini-3.1-flash-lite-preview',
    'gemini-flash-lite-latest',
    'gemini-3-pro-preview',
    'gemini-3.1-pro-preview',
    'gemini-2.5-pro',
    'gemini-pro-latest',
    'gemini-3.1-flash-image',
    'gemini-2.5-flash-image',
    'gemini-3.1-flash-tts-preview',
    'gemini-2.5-flash-preview-tts',
    'gemini-2.5-pro-preview-tts',
    'gemini-3-pro-image-preview',
    'gemini-3.1-flash-image-preview',
    'gemini-2.5-flash-native-audio-latest',
    'gemini-2.5-flash-native-audio-preview-12-2025',
    'gemini-3.1-flash-live-preview'
  ];
  let currentModelIndex = 0;
  
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const topicName = row['__EMPTY'] || row['Topic'] || row['topic'] || 'General';
    const problemName = row['Questions by Love Babbar:'] || row['Problem'] || row['Problem Name'] || row['Problem_Name'] || row['Title'] || row['title'];
    
    if (!problemName || problemName.includes('Youtube Channel') || problemName.includes('Problem:')) {
      continue; 
    }

    const existingProblem = await Problem.findOne({ title: problemName });
    if (existingProblem) {
      console.log(`Found existing problem: '${problemName}'. Overwriting with fresh boilerplate...`);
      // We no longer skip! We will re-generate to get the new boilerplates!
    }

    let retryCount = 0;
    const maxRetries = 20; // Allow cycling through many models
    let success = false;

    while (retryCount < maxRetries && !success) {
      if (currentModelIndex >= models.length) {
        console.error("CRITICAL: Exhausted ALL 20+ available Gemini models! Quota completely dead for today.");
        process.exit(1);
      }
      
      const activeModel = models[currentModelIndex];

      try {
        const response = await ai.models.generateContent({
          model: activeModel,
          contents: promptTemplate(problemName, topicName),
        });

        let jsonStr = response.text;
        if (jsonStr.startsWith('```json')) jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
        else if (jsonStr.startsWith('```')) jsonStr = jsonStr.replace(/```/g, '').trim();

        const generatedData = JSON.parse(jsonStr);

        await Problem.findOneAndUpdate(
          { title: problemName },
          {
            $set: {
              title: problemName,
              topic: topicName,
              descriptionMarkdown: generatedData.descriptionMarkdown,
              difficulty: generatedData.difficulty,
              boilerplates: generatedData.boilerplates,
              sampleTestCases: generatedData.sampleTestCases,
              hiddenTestCases: generatedData.hiddenTestCases
            }
          },
          { upsert: true, returnDocument: 'after' }
        );

        successCount++;
        success = true;
        console.log(`Success: [${i+1}/${data.length}] Saved '${problemName}' to MongoDB using ${activeModel}`);

      } catch (err) {
        if (err.status === 429 || err.message.includes('429') || err.message.includes('quota') || err.message.includes('retry')) {
          console.log(`[Quota Hit] Model '${activeModel}' is exhausted! Instantly rotating to next model...`);
          currentModelIndex++;
          retryCount++;
        } else if (err.status === 404 || err.message.includes('not found') || err.message.includes('not supported')) {
          console.log(`[Unsupported] Model '${activeModel}' failed. Rotating to next model...`);
          currentModelIndex++;
          retryCount++;
        } else {
          console.error(`Failed to process '${problemName}' with ${activeModel}:`, err.message);
          // Don't break, maybe another model can handle it if it's a parsing error?
          // Actually, if it's a JSON parse error, let's retry with the same model 
          console.log("Retrying parsing...");
          retryCount++;
        }
      }
    }

    if (!success && retryCount >= maxRetries) {
      console.error(`Gave up on '${problemName}' after ${maxRetries} retries.`);
    }

    // Strict 10s delay to respect Gemini rate limits on the free tier
    if (i < data.length - 1) {
      await sleep(10000);
    }
  }

  console.log(`Seeding complete! Processed ${successCount} valid problems.`);
  mongoose.connection.close();
}

runSeed();
