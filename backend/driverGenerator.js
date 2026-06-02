/**
 * Driver Code Generator for Judge System
 * Generates language-specific wrappers that parse stringified test case inputs 
 * into native data structures, invoke the user's function, and print the result.
 */

// Helper to escape strings safely for injection into raw source code
function escapeString(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

/**
 * Parses Gemini's wild input format (e.g., "nums = [1,2,3], k = 2") 
 * into a JSON array string if possible, or returns it as a single string 
 * if it's already an array/primitive.
 */
function normalizeInputString(input) {
  if (!input) return "[]";
  input = input.trim();
  
  // If it's already a single array or primitive, wrap it in an array so it can be spread/passed safely
  if (input.startsWith('[') && input.endsWith(']')) {
    // Basic check: is it a single array?
    try {
      JSON.parse(input);
      return `[${input}]`;
    } catch(e) {}
  }
  
  // Try wrapping in brackets and parsing (e.g., "1, 2, 3")
  try {
    const wrapped = `[${input}]`;
    JSON.parse(wrapped);
    return wrapped;
  } catch(e) {}

  // If it has variable names like "nums = [1,2], k = 2", strip the variable names
  // If it has variable names like "nums = [1,2], k = 2", strip the variable names using regex
  // to avoid splitting inner array commas.
  if (input.includes('=')) {
    let stripped = input.replace(/(?:^|,\s*)[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*/g, (match) => {
        return match.startsWith(',') ? ', ' : '';
    });
    return `[${stripped}]`;
  }

  // Fallback: just return it as a string array so it can be passed as one string arg
  return `["${escapeString(input)}"]`;
}

function generateJavascriptDriver(userCode, funcName, rawInput) {
  const normalized = normalizeInputString(rawInput);
  
  return `
${userCode}

// ==============================
// HIDDEN DRIVER CODE (JS)
// ==============================
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
function deserializeTree(arr) {
    if (!arr || arr.length === 0) return null;
    let root = new TreeNode(arr[0]);
    let queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        let curr = queue.shift();
        if (arr[i] !== null && arr[i] !== undefined) {
            curr.left = new TreeNode(arr[i]);
            queue.push(curr.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
            curr.right = new TreeNode(arr[i]);
            queue.push(curr.right);
        }
        i++;
    }
    return root;
}
function deserializeList(arr) {
    if (!arr || arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i]);
        curr = curr.next;
    }
    return head;
}

try {
  // Since the AWS sandbox doesn't support passing stdin/argv directly in the payload,
  // we inject the raw stringified input here as if it were read from stdin.
  const rawInputOriginal = "${escapeString(rawInput || '')}".toLowerCase();
  const rawInputStr = "${escapeString(normalized)}";
  
  // Parse the input into an array of arguments
  let parsedArgs = JSON.parse(rawInputStr);
  
  // Heuristic deserialization based on original variable names
  if (rawInputOriginal.includes('root') || rawInputOriginal.includes('tree') || rawInputOriginal.includes('t1') || rawInputOriginal.includes('t2')) {
      parsedArgs = parsedArgs.map(arg => Array.isArray(arg) && !Array.isArray(arg[0]) ? deserializeTree(arg) : arg);
  } else if (rawInputOriginal.includes('head') || rawInputOriginal.includes('list') || rawInputOriginal.includes('l1') || rawInputOriginal.includes('l2')) {
      parsedArgs = parsedArgs.map(arg => Array.isArray(arg) && !Array.isArray(arg[0]) ? deserializeList(arg) : arg);
  }
  
  // Execute user function
  const sol = new Solution();
  const result = sol["${funcName}"](...parsedArgs);
  
  // Print exact result to stdout
  if (result === undefined) {
    // Heuristic for in-place modifications: if it returns void, print the first argument
    if (parsedArgs.length > 0 && typeof parsedArgs[0] === 'object') {
      let printVal = parsedArgs[0];
      if (printVal instanceof TreeNode) {
          // Re-serialize the tree before printing
          let resArr = []; let q = [printVal];
          while(q.length > 0) {
              let n = q.shift();
              if (n) { resArr.push(n.val); q.push(n.left); q.push(n.right); } else { resArr.push(null); }
          }
          while(resArr.length > 0 && resArr[resArr.length-1] === null) resArr.pop();
          printVal = resArr;
      }
      console.log(JSON.stringify(printVal).replace(/\\s+/g, ''));
    } else {
      console.log("undefined");
    }
  } else if (result instanceof TreeNode || (result && typeof result === 'object' && result.hasOwnProperty('left') && result.hasOwnProperty('right'))) {
    let resArr = []; let q = [result];
    while(q.length > 0) {
        let n = q.shift();
        if (n) { resArr.push(n.val); q.push(n.left); q.push(n.right); } else { resArr.push(null); }
    }
    while(resArr.length > 0 && resArr[resArr.length-1] === null) resArr.pop();
    console.log(JSON.stringify(resArr).replace(/\\s+/g, ''));
  } else if (result instanceof ListNode || (result && typeof result === 'object' && result.hasOwnProperty('next'))) {
    let resArr = []; let c = result;
    while(c) { resArr.push(c.val); c = c.next; }
    console.log(JSON.stringify(resArr).replace(/\\s+/g, ''));
  } else if (typeof result === 'object') {
    console.log(JSON.stringify(result).replace(/\\s+/g, ''));
  } else {
    console.log(result.toString().replace(/\\s+/g, ''));
  }
} catch (err) {
  console.error("Judge Execution Error:", err.message);
  process.exit(1);
}
`;
}

function generatePythonDriver(userCode, funcName, rawInput) {
  const normalized = normalizeInputString(rawInput);
  
  return `
${userCode}

# ==============================
# HIDDEN DRIVER CODE (PYTHON)
# ==============================
import json
import sys

def main():
    try:
        # Inject raw stringified input
        raw_input_str = "${escapeString(normalized)}"
        
        # Parse into arguments
        parsed_args = json.loads(raw_input_str)
        if not isinstance(parsed_args, list):
            parsed_args = [parsed_args]
            
        # Execute user function
        sol = Solution()
        result = getattr(sol, "${funcName}")(*parsed_args)
        
        # Print output
        if result is None:
            # Heuristic for in-place modifications: print first argument if returns None
            if len(parsed_args) > 0 and isinstance(parsed_args[0], (list, dict)):
                print(json.dumps(parsed_args[0]).replace(" ", ""))
            else:
                print("None")
        elif isinstance(result, (list, dict)):
            print(json.dumps(result).replace(" ", ""))
        else:
            print(str(result).replace(" ", ""))
            
    except Exception as e:
        print(f"Judge Execution Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
`;
}

function generateCppDriver(userCode, funcName, rawInput) {
  // C++ is statically typed. Parsing arbitrary JSON is extremely complex without nlohmann/json.
  // We will pass the arguments to a stub that attempts to evaluate them.
  // For C++, if the AWS sandbox lacks a JSON parser, we can dynamically rewrite the main function.
  // We will inject the literal values directly into C++ source code to bypass JSON parsing inside C++.
  
  // First, try to see if it's a list of arguments
  let args = [];
  try {
    const normalized = normalizeInputString(rawInput);
    args = JSON.parse(normalized);
  } catch(e) {
    args = [rawInput]; // Fallback
  }

  // Convert JS arguments to C++ literals
  const cppArgs = args.map(arg => {
    if (typeof arg === 'string') return `"${escapeString(arg)}"`;
    if (Array.isArray(arg)) {
      // Basic flat array to vector (assumes int or string)
      if (arg.length > 0 && typeof arg[0] === 'string') {
        return `std::vector<std::string>{${arg.map(a => `"${escapeString(a)}"`).join(', ')}}`;
      }
      return `std::vector<int>{${arg.join(', ')}}`;
    }
    return String(arg); // Numbers, booleans
  }).join(', ');

  // The user code for C++ usually contains #includes.
  // We will just append our main function.
  
  return `
${userCode}

// ==============================
// HIDDEN DRIVER CODE (C++)
// ==============================
#include <iostream>
#include <vector>
#include <string>

// Helper to print vectors easily
template<typename T>
void printResult(const std::vector<T>& vec) {
    std::cout << "[";
    for(size_t i=0; i<vec.size(); ++i) {
        std::cout << vec[i];
        if(i < vec.size()-1) std::cout << ",";
    }
    std::cout << "]" << std::endl;
}

// Overload for primitive types
template<typename T>
void printResult(const T& val) {
    std::cout << val << std::endl;
}

int main() {
    try {
        // We inject the literal parsed arguments directly into the C++ compiler 
        // to avoid complex JSON parsing dependencies in the sandbox.
        Solution sol;
        auto result = sol.${funcName}(${cppArgs});
        printResult(result);
        return 0;
    } catch (...) {
        std::cerr << "Judge Execution Error" << std::endl;
        return 1;
    }
}
`;
}

module.exports = {
  generateJavascriptDriver,
  generatePythonDriver,
  generateCppDriver
};
