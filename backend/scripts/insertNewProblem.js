require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Problem = require('../models/Problem');

async function insert() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codepractice');
  
  const desc = `
# Find Non-Negative Integer Pairs with Prime Sums

Given an array of non-negative integers \`nums\`, find the number of unordered pairs of distinct indices \`(i, j)\` such that \`i < j\` and the sum \`nums[i] + nums[j]\` is a prime number.

## Examples

### Example 1
- **Input:** \`nums = [1, 2, 3, 4]\`
- **Output:** \`4\`
- **Explanation:** 
  The possible pairs are:
  - (1, 2) -> 3 (prime)
  - (1, 4) -> 5 (prime)
  - (2, 3) -> 5 (prime)
  - (3, 4) -> 7 (prime)

### Example 2
- **Input:** \`nums = [4, 6]\`
- **Output:** \`0\`
- **Explanation:** The only sum is 10, which is not prime.

## Constraints
* \`1 <= nums.length <= 2000\`
* \`0 <= nums[i] <= 10^5\`
`;

  const newProblem = new Problem({
    title: "Find Non-Negative Integer Pairs with Prime Sums",
    topic: "Math",
    description: desc.trim(),
    difficulty: "Medium",
    boilerplates: {
      javascript: "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction findPrimePairs(nums) {\n  // Write your solution here\n  return 0;\n}\n\n// Default test case: \n// console.log(findPrimePairs([1, 2, 3, 4]));\n",
      python: "from typing import List\n\ndef find_prime_pairs(nums: List[int]) -> int:\n    \"\"\"\n    Returns the number of pairs with a prime sum.\n    \"\"\"\n    # Write your solution here\n    return 0\n\n# Default test case:\n# print(find_prime_pairs([1, 2, 3, 4]))\n",
      cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint findPrimePairs(vector<int>& nums) {\n    // Write your solution here\n    return 0;\n}\n\n// Default test case:\n// int main() {\n//     vector<int> nums = {1, 2, 3, 4};\n//     cout << findPrimePairs(nums) << endl;\n//     return 0;\n// }\n"
    },
    sampleTestCases: [
      { input: "[1, 2, 3, 4]", expectedOutput: "4" },
      { input: "[4, 6]", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "[2, 2, 2]", expectedOutput: "0" },
      { input: "[1, 1, 1]", expectedOutput: "3" },
      { input: "[0, 2]", expectedOutput: "1" }
    ]
  });

  await newProblem.save();
  console.log("Problem inserted successfully!");
  mongoose.connection.close();
}
insert();
