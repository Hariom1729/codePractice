import { TopicContent } from './types';

export const stringsContent: TopicContent = {
  id: 'strings',
  title: 'Master Strings',
  subtitle: 'From Encodings to Advanced Pattern Matching',
  description: 'Understand how text is represented, encoded, and manipulated inside the machine.',
  totalTime: '10–12 Hours',
  difficulty: 'Beginner',
  prerequisites: ['Basic Programming', 'Arrays'],
  sections: [
    // 1. INTRODUCTION
    {
      id: 'intro',
      title: 'Introduction to Strings',
      icon: '🔤',
      estimatedTime: '15 min',
      content: {
        hook: {
          question: "How does Google search billions of web pages in milliseconds?",
          answer: "By mastering Strings.",
          concept: "Text Data",
          icon: "🔍"
        },
        keyIdea: {
          title: "Text as Data",
          description: "A string is a contiguous sequence of characters treated as a single piece of data."
        },
        prose: [
          "Strings are arguably the most common data type you will interact with in software engineering. Everything humans read on a screen—from the words you are reading right now, to the URLs in your browser, to the JSON payloads powering APIs—is represented as a string.",
          "At its core, a string is simply an array of characters. However, because text manipulation is so ubiquitous, most programming languages provide a dedicated String class or primitive type that wraps this character array with powerful built-in methods.",
          "Understanding strings means understanding how computers bridge the gap between human language and binary data. We don't just store letters; we encode them into numbers using standards like ASCII and Unicode, and we store those numbers sequentially in memory."
        ],
        whyItMatters: [
          { title: "📱 Communication", description: "WhatsApp messages, emails, and tweets are all strings.", icon: "💬" },
          { title: "🌐 The Web", description: "URLs, HTML, and JSON are entirely string-based.", icon: "🕸️" },
          { title: "🧠 AI & LLMs", description: "ChatGPT processes and generates strings.", icon: "🤖" }
        ],
        takeaways: [
          "Strings are sequences of characters",
          "They are the most common data type in programming",
          "Under the hood, they are backed by arrays"
        ]
      }
    },
    // 2. THEORY & CORE CONCEPTS
    {
      id: 'theory',
      title: 'Theory & Core Concepts',
      icon: '🧠',
      estimatedTime: '20 min',
      content: {
        analogy: {
          title: "The Pearl Necklace Model",
          description: "Think of a string as a pearl necklace, where every pearl is a single character.",
          mapping: [
            { realWorld: "The Necklace", csConcept: "The String" },
            { realWorld: "A Single Pearl", csConcept: "A Character (char)" },
            { realWorld: "Adding a Pearl", csConcept: "Concatenation" },
            { realWorld: "Cutting the Necklace", csConcept: "Substring" }
          ]
        },
        prose: [
          "A character (char) is the smallest unit of a string. It represents a single letter, digit, or symbol. A string is formed by chaining these characters together.",
          "One of the most important concepts to master early is Immutability. In languages like Java, Python, and JavaScript, strings are Immutable. This means once a string is created in memory, it can never be changed. If you try to append a letter, the language actually creates a brand new string, copies the old characters over, adds the new letter, and destroys the old string. This has massive performance implications.",
          "In C++, strings are Mutable. You can change a character at a specific index without reallocating the entire string, making C++ highly efficient for string manipulation algorithms."
        ],
        codeExamples: [
          {
            language: 'javascript',
            code: `// JavaScript Strings are Immutable
let s = "Hello";
s[0] = "J"; // Fails silently, string remains "Hello"
s = "J" + s.slice(1); // Creates a brand new string "Jello"`,
            explanation: "You cannot change a character in-place in JS."
          },
          {
            language: 'cpp',
            code: `// C++ Strings are Mutable
std::string s = "Hello";
s[0] = 'J'; // Instantly modifies memory to "Jello" without copying`,
            explanation: "C++ allows O(1) in-place modification."
          }
        ],
        mistakes: [
          { title: "Confusing Strings and Arrays", description: "While strings are backed by arrays, treating an immutable string like a mutable array leads to O(N^2) bugs." },
          { title: "Ignoring Immutability", description: "Doing str += 'a' inside a loop in Java/JS forces the CPU to copy the string N times." }
        ]
      }
    },
    // 3. INTERNAL WORKING & ENCODING
    {
      id: 'internal',
      title: 'Internal Working & Encoding',
      icon: '⚙️',
      estimatedTime: '30 min',
      content: {
        keyIdea: {
          title: "Memory Mapping & Encoding",
          description: "Computers only understand 0s and 1s. Every character is mapped to a secret integer behind the scenes."
        },
        prose: [
          "How does a computer store the letter 'A'? It uses a character encoding standard. The most fundamental standard is ASCII (American Standard Code for Information Interchange). It maps 128 characters to numbers from 0 to 127. For example, 'A' is 65, 'B' is 66, and 'a' is 97. Space is 32.",
          "Because ASCII only covers English, Unicode was invented. Unicode assigns a unique number (Code Point) to every character in every human language, plus emojis. However, storing every character as a massive integer wastes memory for plain English text.",
          "Enter UTF-8: A variable-length encoding. It stores English characters in 1 byte (exactly matching ASCII), but uses 2 to 4 bytes for complex characters like Chinese symbols or Emojis. This is why a string's length in bytes doesn't always equal its length in characters.",
          "In memory, a C-style string is an array of chars terminated by a special Null Character ('\\0'). This tells the computer where the string ends. Modern string objects (like std::string or Java String) store the length as an explicit integer variable, avoiding the need to scan for the null terminator."
        ],
        memoryDiagram: {
          elements: ['H(72)', 'e(101)', 'l(108)', 'l(108)', 'o(111)', '\\0(0)'],
          startAddress: 1000,
          elementSize: 1,
          label: 'C-String "Hello"'
        },
        whyItMatters: [
          { title: "📜 ASCII", description: "128 characters. 1 byte each. A=65, a=97.", icon: "🇺🇸" },
          { title: "🌍 Unicode", description: "Universal standard for all languages.", icon: "🌐" },
          { title: "📦 UTF-8", description: "Variable length (1-4 bytes). Web standard.", icon: "🧠" }
        ],
        interviewPerspective: {
          title: "What Interviewers Expect",
          checklist: [
            "Know that 'a' - 'A' = 32 (difference between cases).",
            "To map 'a'-'z' to an array index 0-25, use charCode - 97.",
            "Understand that characters are just integers and can be added/subtracted."
          ]
        },
        mistakes: [
          { title: "Emoji Lengths", description: "In JavaScript, '😊'.length is 2, not 1, because it uses UTF-16 surrogate pairs." },
          { title: "Buffer Overflow", description: "In C, forgetting the \\0 terminator causes the program to read random memory." }
        ]
      }
    },
    // 4. BASIC OPERATIONS
    {
      id: 'operations',
      title: 'String Operations',
      icon: '🛠️',
      estimatedTime: '45 min',
      content: {
        keyIdea: {
          title: "The String Lifecycle",
          description: "Every string operation comes with a hidden cost. Concatenating, splitting, and slicing all behave differently depending on the language's immutability rules."
        },
        prose: [
          "Let's look at the core operations you will perform on strings every day.",
          "**1. Concatenation (+):** Joining two strings together. In Java and Python, because strings are immutable, `a + b` means allocating a new string of size `length(a) + length(b)`, copying `a` into it, and then copying `b`. Time complexity is O(N+M).",
          "**2. Substring / Slicing:** Extracting a portion of a string. This creates a brand new string copy containing the extracted characters. Time complexity is O(K) where K is the length of the substring.",
          "**3. Comparison (==, ===):** Checking if two strings are identical. The computer must check them character-by-character from left to right. Best case O(1) if the first characters differ or lengths differ. Worst case O(N) if they are identical."
        ],
        complexityTable: [
          { operation: 'Access arr[i]', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Direct memory access' },
          { operation: 'Length', best: 'O(1)', average: 'O(1)', worst: 'O(N)', space: 'O(1)', notes: 'O(1) in modern languages. O(N) in C (strlen)' },
          { operation: 'Concatenation', best: 'O(N+M)', average: 'O(N+M)', worst: 'O(N+M)', space: 'O(N+M)', notes: 'Must allocate and copy both strings' },
          { operation: 'Substring', best: 'O(K)', average: 'O(K)', worst: 'O(K)', space: 'O(K)', notes: 'K is length of the substring' },
          { operation: 'Comparison', best: 'O(1)', average: 'O(N)', worst: 'O(N)', space: 'O(1)', notes: 'Worst case: strings are identical' }
        ],
        codeExamples: [
          {
            language: 'python',
            code: `# The hidden cost of concatenation
s = ""
for i in range(1000):
    s += "a"  # BAD: O(N^2) complexity in many languages

# GOOD: Use join for O(N) concatenation
s = "".join(["a"] * 1000)`,
            explanation: "Loop concatenation creates 1000 intermediate strings and copies them."
          }
        ],
        interviewPerspective: {
          title: "What Interviewers Expect",
          checklist: [
            "Never use string concatenation (`+=`) inside a loop in Java/Python. Use `StringBuilder` or `.join()`.",
            "Understand that substring operations use O(K) extra space. They are not free.",
            "If asked to check if two strings match, mention the O(N) time complexity."
          ]
        }
      }
    },
    // 5. STRING METHODS DICTIONARY
    {
      id: 'methods',
      title: 'String Methods Dictionary',
      icon: '📖',
      estimatedTime: '60 min',
      content: {
        keyIdea: {
          title: "The Standard Library",
          description: "Don't reinvent the wheel. Every language provides highly optimized C-level methods for common string operations."
        },
        prose: [
          "Below is a comprehensive guide to every string method you will need for algorithmic interviews in C++, Python, and JavaScript."
        ],
        codeExamples: [
          {
            language: 'cpp',
            code: `// C++ std::string methods
#include <string>
using namespace std;
string s = "Hello World";

s.length();           // O(1) - Returns 11
s.size();             // O(1) - Same as length
s.substr(0, 5);       // O(K) - Returns "Hello"
s.find("World");      // O(N*M) - Returns index 6. Returns string::npos if not found.
s.rfind("l");         // O(N) - Searches from right, returns 9
s.compare("Hello");   // O(N) - Returns 0 if equal
s.insert(5, " C++");  // O(N) - Inserts string, shifts remainder right
s.erase(5, 4);        // O(N) - Removes 4 chars starting at index 5
s.replace(6, 5, "JS");// O(N) - Replaces 5 chars at index 6 with "JS"
s.append("!");        // O(1) amortized - Adds to end
s.push_back('?');     // O(1) amortized - Adds single char to end
s.pop_back();         // O(1) - Removes last char
s.front();            // O(1) - Returns first char 'H'
s.back();             // O(1) - Returns last char 'd'
s.empty();            // O(1) - Returns true if length == 0
s.clear();            // O(1) - Empties the string
s.swap(otherString);  // O(1) - Swaps internal pointers`,
            explanation: "C++ strings are fully mutable and operate much like std::vector<char>."
          },
          {
            language: 'python',
            code: `# Python string methods
s = "  Hello World  "

s.split(" ")          # O(N) - Returns ['Hello', 'World']
"-".join(['a', 'b'])  # O(N) - Returns "a-b"
s.replace("World", "Py") # O(N) - Replaces all occurrences
s.find("World")       # O(N*M) - Returns index, or -1 if not found
s.count("l")          # O(N) - Returns 2
s.startswith("  H")   # O(K) - Returns True
s.endswith("d  ")     # O(K) - Returns True
s.strip()             # O(N) - Removes leading/trailing whitespace
s.upper()             # O(N) - "  HELLO WORLD  "
s.lower()             # O(N) - "  hello world  "
s.title()             # O(N) - Capitalizes first letter of each word
s.capitalize()        # O(N) - Capitalizes only the first letter of string`,
            explanation: "Python strings are immutable. Every method here returns a brand new string."
          },
          {
            language: 'javascript',
            code: `// JavaScript string methods
let s = "  Hello World  ";

s.slice(2, 7);        // O(K) - Returns "Hello" (start, end exclusive)
s.substring(2, 7);    // O(K) - Same as slice but handles negative indices differently
s.replace("l", "L");  // O(N) - Replaces FIRST occurrence
s.replaceAll("l","L");// O(N) - Replaces ALL occurrences
s.split(" ");         // O(N) - Returns ['', '', 'Hello', 'World', '', '']
s.includes("World");  // O(N*M) - Returns true
s.startsWith(" ");    // O(K) - Returns true
s.endsWith(" ");      // O(K) - Returns true
s.trim();             // O(N) - Removes leading/trailing whitespace
s.indexOf("o");       // O(N*M) - Returns index of first occurrence`,
            explanation: "JS strings are immutable. Slice is preferred over substring."
          }
        ]
      }
    },
    // 6. TWO POINTERS
    {
      id: 'two-pointers',
      title: 'Two Pointer Technique',
      icon: '👉',
      estimatedTime: '30 min',
      content: {
        keyIdea: {
          title: "Squeeze from Both Ends",
          description: "Place one pointer at the start (Left) and one at the end (Right). Move them towards the center."
        },
        prose: [
          "The Two Pointer technique is the most common algorithmic pattern for Strings and Arrays.",
          "Because strings are linear sequences, many problems ask you to find symmetry (Palindromes) or process the string from both ends (Reversing). Instead of a standard `for` loop, you use a `while(left < right)` loop."
        ],
        patterns: [
          {
            name: "Valid Palindrome",
            description: "Check if a string reads the same forwards and backwards, ignoring non-alphanumeric characters.",
            whenToUse: "When checking symmetry or reversing.",
            template: [
              {
                language: "javascript",
                code: `function isPalindrome(s) {
  // Clean string: remove non-alphanumeric and lowercase
  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  let L = 0, R = s.length - 1;
  while (L < R) {
    if (s[L] !== s[R]) return false;
    L++;
    R--;
  }
  return true;
}`
              }
            ],
            dryRun: "L=0('r'), R=6('r') -> Match. L=1('a'), R=5('a') -> Match. Valid.",
            problems: ["Valid Palindrome (LeetCode 125)", "Reverse String (LeetCode 344)"]
          }
        ]
      }
    },
    // 7. SLIDING WINDOW
    {
      id: 'sliding-window',
      title: 'Sliding Window',
      icon: '🪟',
      estimatedTime: '45 min',
      content: {
        keyIdea: {
          title: "The Expanding Window",
          description: "Use two pointers to create a 'window'. Expand Right to add items. Shrink Left to remove items when a condition breaks."
        },
        analogy: {
          title: "The Camera Frame",
          description: "Imagine looking at a panoramic painting through a small camera frame that can stretch or shrink.",
          mapping: [
            { realWorld: "Left Edge of Frame", csConcept: "Left Pointer" },
            { realWorld: "Right Edge of Frame", csConcept: "Right Pointer" },
            { realWorld: "Visible Picture", csConcept: "Current Substring" }
          ]
        },
        prose: [
          "Whenever a problem asks for the 'Longest Substring', 'Shortest Substring', or 'Subarrays satisfying a condition', your mind should immediately jump to Sliding Window.",
          "Brute-forcing all substrings takes O(N³). Sliding window reduces this to O(N)."
        ],
        patterns: [
          {
            name: "Longest Substring Without Repeating Characters",
            description: "Find the length of the longest substring containing unique characters.",
            whenToUse: "Optimization over contiguous sequences.",
            template: [
              {
                language: "python",
                code: `def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        # Shrink window until it's valid
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
            
        # Expand window
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
        
    return max_len`
              }
            ],
            dryRun: "s='abcabc'. R adds 'a','b','c'. max=3. R hits 'a'. L removes 'a', shrinks, R adds 'a'.",
            problems: ["Longest Substring Without Repeating (LC 3)", "Minimum Window Substring (LC 76)", "Anagrams in String (LC 438)"]
          }
        ]
      }
    },
    // 8. STRING HASHING
    {
      id: 'string-hashing',
      title: 'String Hashing & Rabin-Karp',
      icon: '#️⃣',
      estimatedTime: '45 min',
      content: {
        keyIdea: {
          title: "Fingerprinting Text",
          description: "Hashing converts a long string into a single unique integer (a fingerprint) so we can compare strings in O(1) time."
        },
        prose: [
          "Comparing two strings of length N takes O(N) time. If we have to compare a pattern of length M against every substring in a text of length N, it takes O(N * M).",
          "String hashing allows us to compute a 'Hash Code' for the pattern, and 'Hash Codes' for every substring. Comparing two integers is O(1)!",
          "The most powerful form is a **Rolling Hash**. As our sliding window moves one character to the right, we don't recalculate the hash from scratch. We simply subtract the character leaving the window and add the new character entering the window. This makes moving the window O(1). This algorithm is called Rabin-Karp."
        ],
        mistakes: [
          { title: "Hash Collisions", description: "Two different strings might generate the same hash! If hashes match, you MUST do a strict O(M) character comparison to confirm." }
        ]
      }
    },
    // 9. PATTERN MATCHING ALGORITHMS
    {
      id: 'pattern-matching',
      title: 'Advanced Pattern Matching',
      icon: '🔎',
      estimatedTime: '60 min',
      content: {
        prose: [
          "How does CTRL+F work in your browser? It searches for a pattern string within a massive text string.",
          "**1. Naive Matching (O(N*M)):** Check every single starting index. If a mismatch occurs, go back to the next starting index and try again. Very slow for repetitive texts.",
          "**2. KMP - Knuth-Morris-Pratt (O(N+M)):** Uses an LPS (Longest Prefix Suffix) array. When a mismatch occurs, KMP uses the LPS array to know exactly how far to skip ahead, guaranteeing we NEVER move backwards in the main text.",
          "**3. Z-Algorithm (O(N+M)):** Concatenates `Pattern + '$' + Text` and builds a Z-array where Z[i] stores the length of the longest substring starting at `i` that matches the prefix. If Z[i] == Pattern.length, we found a match!"
        ],
        whyItMatters: [
          { title: "🐌 Naive", description: "O(N×M). Checks everything.", icon: "🐌" },
          { title: "🚀 KMP", description: "O(N+M). Never backtracks.", icon: "🚀" },
          { title: "🌀 Rabin-Karp", description: "O(N+M). Rolling hash.", icon: "🌀" }
        ],
        interviewPerspective: {
          title: "What Interviewers Expect",
          checklist: [
            "For FAANG interviews, KMP is rarely asked to be coded from scratch unless it's a specialized team.",
            "You MUST know the time complexity (O(N+M)) of KMP and Rabin Karp.",
            "If asked to solve string matching, code the naive approach first, then mention Rabin Karp / Rolling Hash as the optimal O(N) upgrade."
          ]
        }
      }
    },
    // 10. PRACTICE CHALLENGES
    {
      id: 'practice',
      title: 'Top Interview Questions',
      icon: '💻',
      estimatedTime: '5+ Hours',
      content: {
        keyIdea: {
          title: "Pattern Recognition",
          description: "Don't memorize 50 solutions. Memorize the 5 core string patterns and apply them."
        },
        practice: [
          {
            title: "Valid Anagram (LC 242)",
            difficulty: "Easy",
            description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
            hint: "Count the frequency of each character in both strings.",
            approach: "Create a frequency array of size 26. Increment for s, decrement for t. If all zeros, it's an anagram.",
            timeComplexity: "O(N)",
            spaceComplexity: "O(1)"
          },
          {
            title: "Longest Palindromic Substring (LC 5)",
            difficulty: "Medium",
            description: "Given a string s, return the longest palindromic substring in s.",
            hint: "Expand around center.",
            approach: "For every character (and between every pair of characters), expand outwards with two pointers while L==R. Track the max length found.",
            timeComplexity: "O(N²)",
            spaceComplexity: "O(1)"
          },
          {
            title: "Group Anagrams (LC 49)",
            difficulty: "Medium",
            description: "Given an array of strings, group the anagrams together.",
            hint: "What do all anagrams share in common if you sort them?",
            approach: "Sort each string and use it as a key in a Hash Map. Append the original string to the map's list. Return all values.",
            timeComplexity: "O(N * K log K)",
            spaceComplexity: "O(N * K)"
          },
          {
            title: "Find All Anagrams in a String (LC 438)",
            difficulty: "Medium",
            description: "Find all start indices of p's anagrams in s.",
            hint: "Sliding window of size p.length.",
            approach: "Maintain a frequency array for the window in s and for p. Compare the arrays at each step. Slide the window O(1).",
            timeComplexity: "O(N)",
            spaceComplexity: "O(1)"
          },
          {
            title: "Implement strStr() / KMP (LC 28)",
            difficulty: "Hard",
            description: "Find the first occurrence of needle in haystack.",
            hint: "Can you do better than O(N*M)?",
            approach: "Rabin-Karp (Rolling Hash) or KMP (LPS array). KMP guarantees O(N) by skipping redundant comparisons.",
            timeComplexity: "O(N + M)",
            spaceComplexity: "O(M)"
          }
        ]
      }
    },
    // 11. REVISION HUB
    {
      id: 'cheatsheet',
      title: 'Revision Hub',
      icon: '🎯',
      estimatedTime: '5 min',
      content: {
        keyIdea: {
          title: "The Ultimate String Summary",
          description: "Strings are character arrays. Immutability forces copies. Use Two Pointers for symmetry and Sliding Windows for substrings."
        },
        complexityTable: [
          { operation: 'Access arr[i]', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Direct memory' },
          { operation: 'Concatenation', best: 'O(N+M)', average: 'O(N+M)', worst: 'O(N+M)', space: 'O(N+M)', notes: 'Creates new string copy' },
          { operation: 'Substring', best: 'O(K)', average: 'O(K)', worst: 'O(K)', space: 'O(K)', notes: 'K is length of substring' },
          { operation: 'Naive Search', best: 'O(N)', average: 'O(N*M)', worst: 'O(N*M)', space: 'O(1)', notes: 'M is pattern length' },
          { operation: 'KMP Search', best: 'O(N+M)', average: 'O(N+M)', worst: 'O(N+M)', space: 'O(M)', notes: 'Never moves backwards' }
        ],
        takeaways: [
          "Always clarify if strings are ASCII (array[128]) or Unicode (Hash Map).",
          "Never concatenate strings in a loop in immutable languages.",
          "Two pointers and Sliding Windows reduce O(N²) string problems to O(N)."
        ]
      }
    }
  ]
};
