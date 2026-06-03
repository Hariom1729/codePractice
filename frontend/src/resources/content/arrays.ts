import type { TopicContent } from './types';

export const arraysContent: TopicContent = {
  id: 'arrays',
  title: 'Arrays',
  subtitle: 'The Foundation of All Data Structures',
  description: 'Master Arrays from first principles to advanced interview patterns. Learn memory internals, every operation, all JavaScript methods, C++ STL functions, 7 classic patterns, and solve 15 hand-picked problems.',
  totalTime: '8–10 Hours',
  difficulty: 'Beginner',
  prerequisites: ['Basic Programming', 'Variables & Loops'],
  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // 1. INTRODUCTION
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'intro',
      title: 'Introduction to Arrays',
      icon: '📚',
      estimatedTime: '5 min',
      content: {
        hook: {
          question: "How does Instagram store a million user profiles?",
          answer: "Arrays.",
          concept: "Linear Data Storage",
          icon: "📸"
        },
        keyIdea: {
          title: "Contiguous Memory",
          description: "Arrays store data side-by-side in memory. Because elements sit next to each other, computers can instantly locate any item without searching."
        },
        whyItMatters: [
          { title: "⚡ O(1) Access", description: "Instantly jump to any element using its index.", icon: "⚡" },
          { title: "📦 Organized", description: "Keep related data grouped together cleanly.", icon: "📦" },
          { title: "🚀 Fast Processing", description: "CPUs love reading side-by-side memory (Cache Friendly).", icon: "🚀" }
        ],
        takeaways: [
          "The most fundamental data structure",
          "Stores elements in contiguous memory",
          "Zero-indexed (starts at 0)",
          "Instant O(1) access time"
        ]
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 2. THEORY & MEMORY
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'theory',
      title: 'Theory & Memory',
      icon: '🧠',
      estimatedTime: '10 min',
      content: {
        analogy: {
          title: "The Apartment Building Model",
          description: "Think of an array as an apartment building where every floor holds one piece of data.",
          mapping: [
            { realWorld: "The Building", csConcept: "The Array Block (Contiguous Memory)" },
            { realWorld: "Floor Number", csConcept: "Array Index (0, 1, 2...)" },
            { realWorld: "Apartment Size", csConcept: "Element Size (e.g., 4 bytes)" },
            { realWorld: "Street Address", csConcept: "Base Memory Address" }
          ]
        },
        memoryDiagram: {
          elements: ['10', '20', '30', '40', '50'],
          startAddress: 1000,
          elementSize: 4,
          label: 'int arr[5]',
        },
        mistakes: [
          { title: "Forgetting zero-index", description: "Trying to access the 5th element at arr[5] instead of arr[4]." },
          { title: "Out of bounds errors", description: "Looping to i <= length instead of i < length, which causes a crash." },
          { title: "Assuming auto-grow (C/Java)", description: "Forgetting that static arrays have a fixed size and must be recreated to grow." }
        ],
        takeaways: [
          "address(i) = base + i * size",
          "No gaps allowed between elements",
          "Static arrays have fixed sizes",
          "Fastest structure for linear traversal"
        ]
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 3. OPERATIONS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'operations',
      title: 'Array Operations',
      icon: '🔧',
      estimatedTime: '15 min',
      content: {
        interactiveVisualizer: 'array',
        interviewPerspective: {
          title: "What Interviewers Expect",
          checklist: [
            "Know that accessing an element by index is O(1)",
            "Know that insertion/deletion at the end is O(1)",
            "Know that insertion/deletion in the middle is O(n) due to shifting",
            "Never use shift() or unshift() in a performance-critical loop in JavaScript",
            "Understand the difference between static and dynamic arrays"
          ]
        },
        complexityTable: [
          { operation: 'Access by index', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Direct address computation' },
          { operation: 'Traversal', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Visit every element once' },
          { operation: 'Linear Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Best: found at index 0' },
          { operation: 'Binary Search', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)', notes: 'Requires sorted array' },
          { operation: 'Insert at End', best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(1)', notes: 'Worst: resize/realloc' },
          { operation: 'Insert at Middle', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Shift elements right' },
          { operation: 'Delete from End', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Just decrement size' },
          { operation: 'Delete from Middle', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Shift elements left' },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 6. METHODS (JavaScript)
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'methods',
      title: 'JavaScript Array Methods',
      icon: '📋',
      estimatedTime: '35 min',
      content: {
        prose: [
          'JavaScript provides a rich set of built-in array methods that cover almost every common operation. Mastering these methods is essential for writing clean, idiomatic JavaScript. Every method below is used constantly in real-world code and appears frequently in coding interviews.',
        ],
        methods: [
          { name: 'push()', syntax: 'arr.push(val1, val2, ...)', description: 'Adds one or more elements to the END of the array. Mutates the original array.', params: 'val1, val2, ... — elements to add', returns: 'New length of the array', complexity: 'Time: O(1) amortized | Space: O(1)', example: "const a = [1,2,3];\na.push(4, 5);\nconsole.log(a); // [1,2,3,4,5]\nconsole.log(a.push(6)); // 6 (new length)", note: 'Most common way to add to array. Use when order matters and you add to the end.' },
          { name: 'pop()', syntax: 'arr.pop()', description: 'Removes and returns the LAST element. Mutates the array. Returns undefined for empty array.', params: 'None', returns: 'The removed element', complexity: 'Time: O(1) | Space: O(1)', example: "const a = [1,2,3,4];\nconst last = a.pop();\nconsole.log(last); // 4\nconsole.log(a);    // [1,2,3]", note: 'O(1) — no shifting needed. Pair with push() to implement a stack.' },
          { name: 'shift()', syntax: 'arr.shift()', description: 'Removes and returns the FIRST element. All remaining elements shift left. Mutates the array.', params: 'None', returns: 'The removed element', complexity: 'Time: O(n) | Space: O(1)', example: "const a = [1,2,3,4];\nconst first = a.shift();\nconsole.log(first); // 1\nconsole.log(a);     // [2,3,4]", note: 'O(n) because all elements must shift. Avoid in performance-critical loops.' },
          { name: 'unshift()', syntax: 'arr.unshift(val1, val2, ...)', description: 'Inserts elements at the BEGINNING of the array. Shifts existing elements right. Mutates.', params: 'val1, val2, ... — elements to prepend', returns: 'New length', complexity: 'Time: O(n) | Space: O(1)', example: "const a = [3,4,5];\na.unshift(1, 2);\nconsole.log(a); // [1,2,3,4,5]", note: 'O(n). Pair with shift() to implement a queue (FIFO). For large arrays, consider a deque.' },
          { name: 'splice()', syntax: 'arr.splice(start, deleteCount, item1, ...)', description: 'The swiss-army knife: removes, replaces, or inserts elements at any position. Mutates. Returns array of removed elements.', params: 'start: index | deleteCount: how many to remove | item1...: elements to insert', returns: 'Array of removed elements', complexity: 'Time: O(n) | Space: O(deleted)', example: "const a = [1,2,3,4,5];\n// Remove 2 elements at index 1\nconst removed = a.splice(1, 2);\nconsole.log(removed); // [2, 3]\nconsole.log(a);       // [1, 4, 5]\n\n// Insert 'X' at index 1 (delete 0)\na.splice(1, 0, 'X');\nconsole.log(a); // [1,'X',4,5]", note: 'Most powerful mutation method. deleteCount=0 means pure insertion.' },
          { name: 'slice()', syntax: 'arr.slice(start, end)', description: 'Returns a SHALLOW COPY of a portion of the array from index start to end (exclusive). Does NOT mutate.', params: 'start: begin index (inclusive) | end: end index (exclusive, optional)', returns: 'New array', complexity: 'Time: O(n) | Space: O(n)', example: "const a = [1,2,3,4,5];\nconsole.log(a.slice(1, 4)); // [2,3,4]\nconsole.log(a.slice(-2));   // [4,5] (last 2)\nconsole.log(a.slice());     // [1,2,3,4,5] (full copy)\nconsole.log(a);             // [1,2,3,4,5] (unchanged)", note: 'splice mutates, slice does not. Slice is safe for creating copies. Negative indices count from end.' },
          { name: 'indexOf()', syntax: 'arr.indexOf(val, fromIndex)', description: 'Returns the FIRST index of a value, or -1 if not found. Uses strict equality (===).', params: 'val: value to search | fromIndex: start searching from this index', returns: 'Index (number) or -1', complexity: 'Time: O(n) | Space: O(1)', example: "const a = [10,20,30,20,10];\nconsole.log(a.indexOf(20));    // 1 (first occurrence)\nconsole.log(a.indexOf(20, 2)); // 3 (from index 2)\nconsole.log(a.indexOf(99));    // -1 (not found)", note: 'Cannot find NaN (use findIndex with Number.isNaN). Use includes() for boolean result.' },
          { name: 'includes()', syntax: 'arr.includes(val, fromIndex)', description: 'Returns true if the array contains the value. Handles NaN correctly. Uses SameValueZero comparison.', params: 'val: value to search | fromIndex: optional start index', returns: 'boolean', complexity: 'Time: O(n) | Space: O(1)', example: "console.log([1,2,NaN].includes(NaN)); // true\nconsole.log([1,2,3].includes(2));    // true\nconsole.log([1,2,3].includes(5));    // false", note: 'Prefer over indexOf when you only need a yes/no answer. Handles NaN, unlike indexOf.' },
          { name: 'find()', syntax: 'arr.find(callback)', description: 'Returns the FIRST element that satisfies the predicate. Returns undefined if none found.', params: 'callback(element, index, array) → boolean', returns: 'The found element or undefined', complexity: 'Time: O(n) | Space: O(1)', example: "const users = [{id:1,name:'Alice'},{id:2,name:'Bob'}];\nconst user = users.find(u => u.id === 2);\nconsole.log(user); // {id:2, name:'Bob'}", note: 'Returns the element itself, not its index. Use findIndex() to get the index.' },
          { name: 'findIndex()', syntax: 'arr.findIndex(callback)', description: 'Returns the index of the first element satisfying the predicate. Returns -1 if none found.', params: 'callback(element, index, array) → boolean', returns: 'Index or -1', complexity: 'Time: O(n) | Space: O(1)', example: "const a = [5, 12, 8, 130];\nconst idx = a.findIndex(x => x > 10);\nconsole.log(idx); // 1 (12 is the first > 10)", note: 'Like indexOf but accepts a predicate instead of a fixed value. Great for objects.' },
          { name: 'filter()', syntax: 'arr.filter(callback)', description: 'Returns a NEW array with all elements that pass the test. Does not mutate the original.', params: 'callback(element, index, array) → boolean', returns: 'New filtered array', complexity: 'Time: O(n) | Space: O(n)', example: "const nums = [1,2,3,4,5,6];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens); // [2, 4, 6]\nconsole.log(nums);  // [1,2,3,4,5,6] (unchanged)", note: 'One of the most used higher-order functions. Chain with map() and reduce() for data pipelines.' },
          { name: 'map()', syntax: 'arr.map(callback)', description: 'Returns a NEW array where each element is the result of calling callback on the original element.', params: 'callback(element, index, array) → newElement', returns: 'New transformed array of same length', complexity: 'Time: O(n) | Space: O(n)', example: "const nums = [1,2,3,4,5];\nconst squared = nums.map(n => n * n);\nconsole.log(squared); // [1,4,9,16,25]", note: 'Never mutates original. Always returns a new array of the same length. If you need to filter AND transform, use filter().map() chain.' },
          { name: 'reduce()', syntax: 'arr.reduce(callback, initialValue)', description: 'Reduces the array to a single value by repeatedly applying callback. Can compute sum, product, flatten, group-by, and more.', params: 'callback(accumulator, currentValue, index, array) | initialValue: starting accumulator value', returns: 'The final accumulated value', complexity: 'Time: O(n) | Space: O(1) for simple reductions', example: "// Sum\nconst sum = [1,2,3,4,5].reduce((acc, n) => acc + n, 0);\nconsole.log(sum); // 15\n\n// Group by\nconst items = [{type:'a'},{type:'b'},{type:'a'}];\nconst grouped = items.reduce((acc, item) => {\n  (acc[item.type] ||= []).push(item);\n  return acc;\n}, {});\n// {a: [{type:'a'},{type:'a'}], b: [{type:'b'}]}", note: 'The most powerful array method. All other functional methods (map, filter, etc.) can be implemented with reduce.' },
          { name: 'forEach()', syntax: 'arr.forEach(callback)', description: 'Calls callback for each element. Returns undefined — cannot be chained. Use for side effects only.', params: 'callback(element, index, array)', returns: 'undefined', complexity: 'Time: O(n) | Space: O(1)', example: "[1,2,3].forEach((val, idx) => {\n  console.log(`Index ${idx}: ${val}`);\n});\n// Index 0: 1\n// Index 1: 2\n// Index 2: 3", note: 'Cannot break or return from forEach. Use a regular for loop if you need early exit.' },
          { name: 'sort()', syntax: 'arr.sort(compareFunction)', description: 'Sorts elements IN PLACE. Without a compare function, elements are converted to strings and sorted lexicographically (GOTCHA: [10,9,2] → [10,2,9]).', params: 'compareFunction(a, b) optional: return negative if a < b, 0 if equal, positive if a > b', returns: 'The sorted array (same reference)', complexity: 'Time: O(n log n) | Space: O(log n)', example: "// Lexicographic (WRONG for numbers)\n[10,9,2].sort();            // [10, 2, 9] ← WRONG!\n\n// Numeric ascending\n[10,9,2].sort((a,b)=>a-b); // [2, 9, 10] ← CORRECT\n\n// Numeric descending\n[10,9,2].sort((a,b)=>b-a); // [10, 9, 2]\n\n// Sort objects by property\nconst users = [{name:'Bob',age:25},{name:'Alice',age:30}];\nusers.sort((a,b) => a.age - b.age);", note: 'ALWAYS provide a compare function for numbers! The default string sort is a frequent interview bug.' },
          { name: 'reverse()', syntax: 'arr.reverse()', description: 'Reverses the array IN PLACE. Mutates original.', params: 'None', returns: 'The reversed array (same reference)', complexity: 'Time: O(n) | Space: O(1)', example: "const a = [1,2,3,4,5];\na.reverse();\nconsole.log(a); // [5,4,3,2,1]\n\n// To reverse without mutating:\nconst rev = [...a].reverse();", note: 'Mutates! Use [...arr].reverse() or arr.slice().reverse() for a non-mutating version.' },
          { name: 'concat()', syntax: 'arr.concat(arr2, arr3, ...)', description: 'Merges two or more arrays (or values) into a new array. Does not mutate.', params: 'arr2, arr3, ... or values to concatenate', returns: 'New merged array', complexity: 'Time: O(n+m) | Space: O(n+m)', example: "const a = [1,2,3];\nconst b = [4,5,6];\nconst c = a.concat(b, [7,8]);\nconsole.log(c); // [1,2,3,4,5,6,7,8]\n\n// Modern spread alternative:\nconst d = [...a, ...b, 7, 8];", note: 'Spread syntax `[...a, ...b]` is generally preferred in modern code for clarity.' },
          { name: 'join()', syntax: 'arr.join(separator)', description: 'Joins all elements into a string, separated by the given separator (default: comma).', params: 'separator: string (default ",")', returns: 'String', complexity: 'Time: O(n) | Space: O(n)', example: "console.log(['a','b','c'].join('-'));  // 'a-b-c'\nconsole.log([1,2,3].join(''));         // '123'\nconsole.log([1,2,3].join());           // '1,2,3'", note: 'Pair with split() on strings to convert between arrays and strings.' },
          { name: 'flat()', syntax: 'arr.flat(depth)', description: 'Flattens nested arrays up to the specified depth (default: 1).', params: 'depth: how many levels to flatten (Infinity to fully flatten)', returns: 'New flattened array', complexity: 'Time: O(n) | Space: O(n)', example: "[[1,2],[3,[4,5]]].flat();       // [1,2,3,[4,5]]\n[[1,2],[3,[4,5]]].flat(2);      // [1,2,3,4,5]\n[[1,[2,[3,[4]]]]].flat(Infinity); // [1,2,3,4]", note: 'Use flat(Infinity) to completely flatten deeply nested arrays.' },
          { name: 'flatMap()', syntax: 'arr.flatMap(callback)', description: 'Maps then flattens one level. More efficient than calling .map().flat(1) separately.', params: 'callback(element, index, array) → value or array', returns: 'New array (mapped and flattened 1 level)', complexity: 'Time: O(n) | Space: O(n)', example: "const sentences = ['Hello World', 'Foo Bar'];\nconst words = sentences.flatMap(s => s.split(' '));\nconsole.log(words); // ['Hello','World','Foo','Bar']", note: 'Great for mapping where each element might produce 0, 1, or many results.' },
          { name: 'fill()', syntax: 'arr.fill(value, start, end)', description: 'Fills all (or a range of) elements with a static value. Mutates in place.', params: 'value: fill value | start: optional start index | end: optional end index (exclusive)', returns: 'The modified array', complexity: 'Time: O(n) | Space: O(1)', example: "new Array(5).fill(0);         // [0,0,0,0,0]\n[1,2,3,4,5].fill(9, 1, 4);  // [1,9,9,9,5]", note: 'new Array(n).fill(0) is the idiomatic way to create a pre-filled array in JS.' },
          { name: 'Array.from()', syntax: 'Array.from(iterable, mapFn)', description: 'Creates an array from an iterable or array-like object. Optionally applies a mapping function.', params: 'iterable: any iterable | mapFn: optional transform', returns: 'New Array', complexity: 'Time: O(n) | Space: O(n)', example: "// From string\nArray.from('hello');           // ['h','e','l','l','o']\n// From Set\nArray.from(new Set([1,2,2,3])); // [1,2,3]\n// Create range\nArray.from({length:5}, (_,i)=>i); // [0,1,2,3,4]", note: 'The most versatile array creation method. Use to deduplicate with Set or create index arrays.' },
          { name: 'Array.isArray()', syntax: 'Array.isArray(value)', description: 'Returns true if the value is an Array. More reliable than typeof or instanceof for arrays.', params: 'value: any value', returns: 'boolean', complexity: 'Time: O(1) | Space: O(1)', example: "Array.isArray([1,2,3]);  // true\nArray.isArray('hello');  // false\nArray.isArray({});       // false\nArray.isArray(null);     // false", note: 'Always use Array.isArray() to check for arrays, not typeof (which returns "object").' },
          { name: 'every()', syntax: 'arr.every(callback)', description: 'Returns true if ALL elements pass the test. Short-circuits on first failure.', params: 'callback(element, index, array) → boolean', returns: 'boolean', complexity: 'Time: O(n) worst | Space: O(1)', example: "[2,4,6,8].every(n => n%2===0);   // true\n[2,4,5,8].every(n => n%2===0);   // false", note: 'Returns true for empty array (vacuously true). Short-circuits early — efficient.' },
          { name: 'some()', syntax: 'arr.some(callback)', description: 'Returns true if AT LEAST ONE element passes the test. Short-circuits on first success.', params: 'callback(element, index, array) → boolean', returns: 'boolean', complexity: 'Time: O(n) worst | Space: O(1)', example: "[1,3,5,7].some(n => n%2===0);  // false (no evens)\n[1,3,4,7].some(n => n%2===0);  // true (4 is even)", note: 'Returns false for empty array. Complements every().' },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 7. C++ STL FUNCTIONS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'stl',
      title: 'C++ STL Functions',
      icon: '⚡',
      estimatedTime: '25 min',
      content: {
        prose: [
          'The C++ Standard Template Library (STL) provides a powerful suite of algorithms in the `<algorithm>` and `<numeric>` headers that work on arrays and vectors via iterators. These functions are battle-tested, highly optimized, and used in competitive programming and production code alike. Knowing these is essential for C++ interviews.',
          'STL algorithms follow a consistent pattern: they take iterators (begin, end) as parameters rather than the container directly. `arr.begin()` returns an iterator to the first element, and `arr.end()` returns a past-the-end iterator. For raw arrays: `sort(arr, arr + n)` where n is the size.',
        ],
        methods: [
          { name: 'sort()', syntax: 'sort(begin, end)\nsort(begin, end, comparator)', description: 'Sorts elements in the range [begin, end) in ascending order (or by comparator). Uses introsort (hybrid of quicksort, heapsort, insertion sort) — guaranteed O(n log n).', params: 'begin/end: iterators | comparator: optional function returning bool', returns: 'void', complexity: 'Time: O(n log n) | Space: O(log n)', example: '#include <algorithm>\nvector<int> v = {5,3,1,4,2};\nsort(v.begin(), v.end());          // [1,2,3,4,5]\nsort(v.begin(), v.end(), greater<int>()); // [5,4,3,2,1]\n\n// Sort by custom key\nsort(v.begin(), v.end(), [](int a, int b){\n  return a % 3 < b % 3;\n});', note: 'NOT stable sort. Use stable_sort() if equal elements must keep their relative order.' },
          { name: 'reverse()', syntax: 'reverse(begin, end)', description: 'Reverses the order of elements in range [begin, end). In-place, O(n).', params: 'begin/end: iterators', returns: 'void', complexity: 'Time: O(n) | Space: O(1)', example: 'vector<int> v = {1,2,3,4,5};\nreverse(v.begin(), v.end());\n// v = [5,4,3,2,1]\n\n// Reverse only part:\nreverse(v.begin(), v.begin()+3);\n// v = [3,4,5,2,1]', note: 'Works on any bidirectional iterator. In-place with no extra memory.' },
          { name: 'find()', syntax: 'find(begin, end, value)', description: 'Linear search: returns an iterator to the first occurrence of value, or end if not found. O(n).', params: 'begin/end: iterators | value: what to find', returns: 'Iterator', complexity: 'Time: O(n) | Space: O(1)', example: 'vector<int> v = {10,20,30,40,50};\nauto it = find(v.begin(), v.end(), 30);\nif (it != v.end()) {\n  cout << *it << endl;              // 30\n  cout << (it-v.begin()) << endl;   // 2 (index)\n}', note: 'For sorted containers, prefer binary_search() or lower_bound()/upper_bound() for O(log n) lookup.' },
          { name: 'binary_search()', syntax: 'binary_search(begin, end, value)', description: 'Returns true if value exists in SORTED range. Does NOT return the position.', params: 'begin/end: iterators to sorted range | value: target', returns: 'bool', complexity: 'Time: O(log n) | Space: O(1)', example: 'vector<int> v = {1,3,5,7,9};\ncout << binary_search(v.begin(), v.end(), 5) << endl; // 1 (true)\ncout << binary_search(v.begin(), v.end(), 4) << endl; // 0 (false)', note: 'REQUIRES sorted range! Use lower_bound/upper_bound to also get the position.' },
          { name: 'lower_bound()', syntax: 'lower_bound(begin, end, value)', description: 'Returns iterator to first element >= value in sorted range. Use for insertion point.', params: 'begin/end: sorted range iterators | value: threshold', returns: 'Iterator', complexity: 'Time: O(log n) | Space: O(1)', example: 'vector<int> v = {1,3,5,7,9};\nauto it = lower_bound(v.begin(), v.end(), 5);\ncout << *it << endl;              // 5\ncout << (it-v.begin()) << endl;   // 2\n\n// First element >= 4:\nauto it2 = lower_bound(v.begin(), v.end(), 4);\ncout << *it2 << endl;             // 5', note: 'Key for counting elements in range, finding insertion points, and solving "first occurrence >= k" problems.' },
          { name: 'upper_bound()', syntax: 'upper_bound(begin, end, value)', description: 'Returns iterator to first element STRICTLY > value in sorted range.', params: 'begin/end: sorted range iterators | value: threshold', returns: 'Iterator', complexity: 'Time: O(log n) | Space: O(1)', example: 'vector<int> v = {1,3,5,5,7,9};\nauto lo = lower_bound(v.begin(), v.end(), 5);\nauto hi = upper_bound(v.begin(), v.end(), 5);\ncout << (hi-lo) << " fives" << endl; // 2 fives', note: 'upper_bound - lower_bound = count of a specific value. Classic technique.' },
          { name: 'max_element()', syntax: 'max_element(begin, end)', description: 'Returns iterator to the maximum element in the range.', params: 'begin/end: iterators', returns: 'Iterator to maximum', complexity: 'Time: O(n) | Space: O(1)', example: 'vector<int> v = {3,1,4,1,5,9,2,6};\nauto it = max_element(v.begin(), v.end());\ncout << *it << endl;             // 9\ncout << (it-v.begin()) << endl;  // 5 (index)', note: 'Dereference the returned iterator to get the value. Subtract begin() to get the index.' },
          { name: 'min_element()', syntax: 'min_element(begin, end)', description: 'Returns iterator to the minimum element in the range.', params: 'begin/end: iterators', returns: 'Iterator to minimum', complexity: 'Time: O(n) | Space: O(1)', example: 'vector<int> v = {3,1,4,1,5};\nauto it = min_element(v.begin(), v.end());\ncout << *it << endl;             // 1', note: 'For both min AND max in one pass, use minmax_element().' },
          { name: 'accumulate()', syntax: 'accumulate(begin, end, init)\naccumulate(begin, end, init, binaryOp)', description: 'Computes the sum (or custom reduction) of elements. From <numeric> header.', params: 'begin/end: iterators | init: starting value | binaryOp: optional', returns: 'Accumulated value', complexity: 'Time: O(n) | Space: O(1)', example: '#include <numeric>\nvector<int> v = {1,2,3,4,5};\nint sum = accumulate(v.begin(), v.end(), 0); // 15\nint product = accumulate(v.begin(), v.end(), 1,\n  [](int a, int b){ return a*b; });          // 120', note: 'Include <numeric>. The initializer type determines the return type — use 0LL for long long sums.' },
          { name: 'count()', syntax: 'count(begin, end, value)', description: 'Counts occurrences of value in the range.', params: 'begin/end: iterators | value: what to count', returns: 'Count (ptrdiff_t)', complexity: 'Time: O(n) | Space: O(1)', example: 'vector<int> v = {1,2,3,2,4,2};\ncout << count(v.begin(), v.end(), 2) << endl; // 3', note: 'Use count_if() with a predicate for conditional counting.' },
          { name: 'fill()', syntax: 'fill(begin, end, value)', description: 'Sets all elements in [begin, end) to value.', params: 'begin/end: iterators | value: fill value', returns: 'void', complexity: 'Time: O(n) | Space: O(1)', example: 'vector<int> v(5);\nfill(v.begin(), v.end(), 7);\n// v = [7,7,7,7,7]\n\n// Fill portion:\nfill(v.begin()+1, v.begin()+4, 0);\n// v = [7,0,0,0,7]', note: 'Equivalent to memset for primitives but works with any type.' },
          { name: 'unique()', syntax: 'unique(begin, end)', description: 'Removes consecutive DUPLICATE elements (not all duplicates — sort first!). Returns new end iterator.', params: 'begin/end: iterators', returns: 'Iterator to new logical end', complexity: 'Time: O(n) | Space: O(1)', example: 'vector<int> v = {1,1,2,3,3,3,4};\nauto newEnd = unique(v.begin(), v.end());\nv.erase(newEnd, v.end());\n// v = [1,2,3,4]\n\n// For non-consecutive duplicates:\nsort(v.begin(), v.end()); // sort first!\nauto it = unique(v.begin(), v.end());\nv.erase(it, v.end());', note: 'Must sort before unique() to remove ALL duplicates, not just consecutive ones.' },
          { name: 'rotate()', syntax: 'rotate(begin, middle, end)', description: 'Rotates elements so that middle becomes the new first element. In-place, O(n).', params: 'begin: start | middle: new first element | end: past-the-end', returns: 'void', complexity: 'Time: O(n) | Space: O(1)', example: 'vector<int> v = {1,2,3,4,5};\nrotate(v.begin(), v.begin()+2, v.end());\n// v = [3,4,5,1,2]  (left rotation by 2)', note: 'Useful for circular array problems and implementing cyclic rotations in O(n).' },
          { name: 'nth_element()', syntax: 'nth_element(begin, nth, end)', description: 'Rearranges so that the element at nth is what would be there if sorted. Elements before nth ≤ *nth; after nth ≥ *nth. Average O(n).', params: 'begin: start | nth: target position | end: past-the-end', returns: 'void', complexity: 'Time: O(n) average | Space: O(1)', example: 'vector<int> v = {7,2,9,1,5,4,8};\nnth_element(v.begin(), v.begin()+3, v.end());\n// Element at index 3 is now the 4th smallest\ncout << v[3] << endl; // 5', note: 'Faster than full sort when you only need the kth element or the median.' },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 8. COMPLEXITY ANALYSIS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'complexity',
      title: 'Complexity Analysis',
      icon: '📊',
      estimatedTime: '20 min',
      content: {
        prose: [
          'Big-O notation describes how an algorithm\'s running time or memory usage grows as the input size n grows toward infinity. For arrays, understanding why each operation has its particular complexity is more important than memorizing the table — because understanding the "why" lets you derive any complexity on the fly.',
          'Why is array ACCESS O(1)? Because accessing element i requires exactly one arithmetic computation: `base + i × size`. This is a constant number of CPU instructions regardless of n. Whether the array has 10 elements or 10 billion, accessing index 5 takes the same time. This is the killer feature of arrays.',
          'Why is array SEARCH O(n)? Without any ordering guarantee, you have no choice but to check every element. In the worst case (element not present or at the last position), you check all n elements. Binary search reduces this to O(log n) by exploiting sorted order — each comparison eliminates half the remaining candidates.',
        ],
        complexityTable: [
          { operation: 'Access', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Direct computation: base + i×size' },
          { operation: 'Search (Linear)', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Best: found at index 0' },
          { operation: 'Search (Binary)', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)', notes: 'Sorted array only' },
          { operation: 'Insert at End', best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(1)', notes: 'Worst: reallocation' },
          { operation: 'Insert at Middle', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Shift n/2 elements avg' },
          { operation: 'Insert at Start', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Always shift ALL elements' },
          { operation: 'Delete from End', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'No shifting needed' },
          { operation: 'Delete from Middle', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Shift remaining elements' },
          { operation: 'Delete from Start', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Always shift ALL elements' },
        ],
        tableData: [
          {
            headers: ['Operation', 'Array', 'Dynamic Array (Vector)', 'Linked List', 'Hash Map'],
            rows: [
              ['Access by index', 'O(1)', 'O(1)', 'O(n)', 'N/A'],
              ['Search (unsorted)', 'O(n)', 'O(n)', 'O(n)', 'O(1) avg'],
              ['Insert at end', 'N/A (fixed)', 'O(1) amortized', 'O(1)*', 'O(1) avg'],
              ['Insert at beginning', 'O(n)', 'O(n)', 'O(1)', 'N/A'],
              ['Delete from end', 'O(1)', 'O(1)', 'O(n)*', 'O(1) avg'],
              ['Memory overhead', 'Minimal', 'Minimal + capacity', 'High (pointers)', 'High (buckets)'],
              ['Cache performance', 'Excellent', 'Excellent', 'Poor', 'Poor'],
            ],
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 9. VISUAL EXPLANATION
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'visual',
      title: 'Visual & Interactive Learning',
      icon: '👁️',
      estimatedTime: '15 min',
      content: {
        prose: [
          'The interactive visualizer embedded in this course lets you see array operations play out step-by-step with animated graphics. Seeing algorithms execute visually is one of the most effective ways to build intuition — especially for operations like insertion (watching elements shift right) and binary search (watching the search window shrink).',
          'In the Visualizer tab above, you can create an array of your choice, then trigger operations: click elements to highlight them, use the insert/delete/search controls, and watch the animations. For binary search, you will see the left and right pointers converge toward the target as each step eliminates half the remaining range.',
          'Pay special attention to the memory address display in the visualizer. As you hover over each element, you can see its address, which is always exactly `elementSize` bytes away from the previous element. This visually confirms the contiguous memory guarantee and the address formula you learned in the Memory section.',
        ],
        keyPoints: [
          'Use the visualizer to understand WHY binary search is O(log n): watch how the search range halves each step.',
          'Toggle between insertion at beginning vs end to see the difference in how many elements shift.',
          'Use the sort animation to see how comparison-based sorting works.',
          'The memory view shows real address offsets — hover over elements to see addresses increment by exactly sizeof(element) bytes.',
          'Try the Two-Pointer animation for palindrome check and two-sum to see how pointers move toward each other.',
        ],
        callouts: [
          {
            type: 'note',
            title: 'Visualization = Comprehension',
            body: 'Research shows that students who use interactive visualizations learn algorithms 40% faster than those who only read code. Spend at least 10 minutes experimenting with the visualizer before moving to the next section.',
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 10. REAL WORLD APPLICATIONS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'realworld',
      title: 'Real-World Applications',
      icon: '🌍',
      estimatedTime: '15 min',
      content: {
        prose: [
          'Arrays are not just an academic exercise — they are the backbone of virtually every piece of software ever written. Understanding where arrays appear in the real world helps you see why every performance characteristic matters in practice.',
        ],
        keyPoints: [
          '🖼️ Pixel Storage in Images: A digital image is a 2D array of pixels. A 4K image (3840×2160) is an array of 8,294,400 pixels, each storing 3 bytes (RGB) or 4 bytes (RGBA). Image processing algorithms (blur, sharpen, edge detection) traverse this array in specific patterns. The entire JPEG/PNG compression pipeline operates on array representations of pixel data.',
          '📊 Spreadsheet Cells: Excel, Google Sheets, and LibreOffice Calc are fundamentally 2D arrays in memory. Each cell is accessed by row and column index. Formulas like SUM(A1:A100) are array traversals. Sorting a column is an array sort. Pivot tables are array aggregations.',
          '🎮 Video Game Grids: Tile-based games (Minecraft, Stardew Valley, Tetris) use 2D arrays to represent the game world. Collision detection checks neighboring cells in the grid. Pathfinding (A*) treats the grid as an array of nodes. Even 3D games use arrays for voxel storage and spatial partitioning (octrees are tree-structured arrays).',
          '🌐 Browser History: Your browser stores your visited URLs in an array (or array-like structure). The Back button pops from the end. The Forward button navigates forward in the array. Tab ordering is an array. The DOM (Document Object Model) represents HTML elements in tree structures built on arrays of children.',
          '📈 Stock Price Charts: Time-series financial data — stock prices, cryptocurrency values, sensor readings — is stored as arrays of (timestamp, value) pairs. Technical analysis indicators like Moving Average, RSI, and Bollinger Bands are computed using sliding window operations on these arrays.',
          '🏆 Leaderboards: Game rankings, competitive programming leaderboards, and exam score boards are sorted arrays. Adding a new player requires insertion-sort or a binary search for the correct position. Displaying the top 10 is a slice operation.',
          '📱 Contact Lists: Phone contact storage, whether on your device or in the cloud, is an array of contact objects sorted by name. Searching by name uses binary search. The alphabetical scroll bar in your contacts app divides the sorted array into sections.',
          '💾 Database Indexing: B-Tree indexes in databases (MySQL, PostgreSQL) are balanced tree structures where each node stores a sorted array of keys. Binary search on these arrays makes record lookups O(log n). Database buffers (buffer pools) are arrays of fixed-size memory pages.',
          '🧬 DNA Sequence Storage: In bioinformatics, a DNA sequence is literally a character array: each element is one of {A, C, G, T}. The human genome (3.2 billion base pairs) is stored as a compressed array. Sequence alignment algorithms (Smith-Waterman, Needleman-Wunsch) use 2D dynamic programming on arrays of sequence characters.',
          '🔊 Audio Samples: Digital audio is an array of amplitude samples. A 1-second audio clip at 44100 Hz is an array of 44,100 floating-point numbers. Audio effects (reverb, EQ, compression) are sliding window operations on this array. MP3 compression uses FFT (Fast Fourier Transform) on blocks of 1152 samples each.',
        ],
        callouts: [
          {
            type: 'tip',
            title: 'Why This Matters for Interviews',
            body: 'When interviewers ask "can you think of a real-world use case for this algorithm?" — think in terms of the underlying array operations. A sliding window on sensor data, a prefix sum on financial data, binary search on a sorted contact list. Real-world context shows engineering depth.',
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 11. INTERVIEW QUESTIONS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'interview',
      title: 'Interview Questions',
      icon: '🎯',
      estimatedTime: '30 min',
      content: {
        prose: [
          'Arrays are the #1 most frequently tested data structure in software engineering interviews at FAANG and top-tier companies. Every array interview question tests one or more fundamental patterns: two pointers, sliding window, prefix sum, sorting, or hash maps. The key to cracking array interviews is pattern recognition — once you identify the pattern, the solution flows naturally.',
        ],
        keyPoints: [
          '💡 Always clarify: is the array sorted? Can it have duplicates? Can values be negative? What are the constraints on n?',
          '💡 For O(n) target: think Two Pointers or Sliding Window or Hash Map.',
          '💡 For O(n log n) target: think Sort the array, then use binary search or two pointers.',
          '💡 For range queries: think Prefix Sum (precompute in O(n), query in O(1)).',
          '💡 Always consider edge cases: empty array, single element, all duplicates, all negative, sorted ascending/descending.',
        ],
        tableData: [
          {
            headers: ['Problem', 'Difficulty', 'Pattern', 'Companies'],
            rows: [
              ['Two Sum', 'Easy', 'Hash Map', 'Google, Amazon, Meta, Apple'],
              ['Best Time to Buy and Sell Stock', 'Easy', 'Sliding Window / Greedy', 'Amazon, Google, Microsoft'],
              ['Contains Duplicate', 'Easy', 'Hash Set', 'Google, Adobe, Bloomberg'],
              ['Move Zeroes', 'Easy', 'Two Pointers', 'Facebook, Microsoft'],
              ['Merge Sorted Array', 'Easy', 'Two Pointers', 'Google, Bloomberg'],
              ['Remove Duplicates from Sorted Array', 'Easy', 'Two Pointers', 'Amazon, Google'],
              ['Find Maximum Subarray Sum', 'Easy', "Kadane's", 'Amazon, Microsoft, Apple'],
              ['Rotate Array', 'Easy', 'Reversal / Cyclic', 'Microsoft, Amazon'],
              ['Maximum Subarray (Kadane)', 'Medium', "Kadane's Algorithm", 'Amazon, Google, Facebook'],
              ['3Sum', 'Medium', 'Two Pointers + Sort', 'Google, Facebook, Amazon'],
              ['Container With Most Water', 'Medium', 'Two Pointers', 'Google, Facebook, Bloomberg'],
              ['Product of Array Except Self', 'Medium', 'Prefix + Suffix Product', 'Amazon, Facebook, Microsoft'],
              ['Subarray Sum Equals K', 'Medium', 'Prefix Sum + Hash Map', 'Facebook, Google'],
              ['Longest Subarray with Sum K', 'Medium', 'Sliding Window / Prefix Sum', 'Amazon, Flipkart'],
              ['Find Minimum in Rotated Sorted Array', 'Medium', 'Binary Search', 'Google, Amazon, Microsoft'],
              ['Search in Rotated Sorted Array', 'Medium', 'Binary Search', 'Amazon, Facebook, LinkedIn'],
              ['Sort Colors (Dutch National Flag)', 'Medium', 'Three-Way Partition', 'Google, Facebook'],
              ['Merge Intervals', 'Medium', 'Sort + Greedy', 'Google, Facebook, Amazon'],
              ['Jump Game', 'Medium', 'Greedy', 'Amazon, Microsoft, Adobe'],
              ['Next Permutation', 'Medium', 'Two Pointer + Reversal', 'Google, Qualcomm'],
              ['Trapping Rain Water', 'Hard', 'Two Pointers / Stack', 'Amazon, Google, Facebook, Apple'],
              ['First Missing Positive', 'Hard', 'Index-as-Hash / Cyclic Sort', 'Amazon, Google, Microsoft'],
              ['Largest Rectangle in Histogram', 'Hard', 'Monotonic Stack', 'Amazon, Google, Microsoft'],
              ['Median of Two Sorted Arrays', 'Hard', 'Binary Search', 'Google, Amazon, Apple'],
              ['Count of Smaller Numbers After Self', 'Hard', 'Merge Sort / BIT', 'Google, Amazon'],
            ],
          },
        ],
        callouts: [
          {
            type: 'important',
            title: 'FAANG Array Interview Strategy',
            body: '1. Restate the problem + examples. 2. Ask clarifying questions (sorted? duplicates? constraints?). 3. State your initial brute-force O(n²) solution. 4. Optimize: identify the pattern (two pointers / sliding window / prefix sum). 5. Code the optimized solution. 6. Walk through your example. 7. Analyze time + space complexity. 8. Mention edge cases.',
          },
          {
            type: 'tip',
            title: 'The 5 Most Important Array Patterns',
            body: 'If you master only 5 patterns, master these: (1) Two Pointers — covers 25% of array problems. (2) Sliding Window — covers 20%. (3) Prefix Sum — covers 15%. (4) Kadane\'s Algorithm — covers max subarray family. (5) Sort + Two Pointers — covers 3Sum, k-sum, and interval problems.',
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 12. COMMON MISTAKES
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'mistakes',
      title: 'Common Mistakes & Gotchas',
      icon: '⚠️',
      estimatedTime: '15 min',
      content: {
        prose: [
          'Even experienced developers make predictable mistakes with arrays. These mistakes fall into two categories: correctness bugs (off-by-one errors, mutation during iteration) and performance bugs (unnecessary O(n) operations that could be O(1)). Learn them now so you never lose an interview to a silly bug.',
        ],
        callouts: [
          {
            type: 'warning',
            title: 'Mistake 1: Off-By-One Errors',
            body: 'The classic bug. Using `i <= arr.length` instead of `i < arr.length` accesses `arr[arr.length]` which is undefined (JS) or segfault (C++). For reverse traversal: start at `arr.length - 1`, not `arr.length`. For binary search: `left <= right` (not `<`). Always trace through your boundary conditions with a tiny example.',
          },
          {
            type: 'warning',
            title: 'Mistake 2: Out-of-Bounds Access',
            body: 'Accessing `arr[-1]` or `arr[arr.length]` in JavaScript returns `undefined` silently — a sneaky bug. In C/C++, it reads garbage memory or segfaults. ALWAYS validate indices before access. When computing `mid = (left+right)/2`, ensure it stays within range. Use `.at(i)` in C++ for bounds-checked access in debug builds.',
          },
          {
            type: 'warning',
            title: 'Mistake 3: Modifying an Array While Iterating',
            body: 'Using `forEach`, `for...of`, or a regular for-loop while calling `splice()` or `push()` on the same array causes index drift. Elements get skipped or visited twice. Solution: iterate backwards when deleting, or collect items to delete/add in a separate pass, or use `filter()` which creates a new array.',
          },
          {
            type: 'warning',
            title: 'Mistake 4: Shallow Copy vs Deep Copy',
            body: '`const copy = arr` does NOT copy — it creates another reference to the same array. `const copy = [...arr]` or `arr.slice()` creates a SHALLOW copy (1D arrays ok, but nested arrays still share references). For deep copy of nested arrays/objects, use `JSON.parse(JSON.stringify(arr))` or `structuredClone(arr)` in modern environments.',
          },
          {
            type: 'warning',
            title: 'Mistake 5: Not Handling the Empty Array',
            body: '`arr[0]` on an empty array returns `undefined` in JS and crashes in C++. Always check `if (arr.length === 0) return ...` or `if (arr.empty()) return ...` at the start. Many algorithm bugs only appear on empty input or single-element input — always test these edge cases.',
          },
          {
            type: 'warning',
            title: 'Mistake 6: Using == Instead of === for Search',
            body: 'In JavaScript, `==` uses type coercion: `[1,2,3].indexOf("2")` returns `-1` because `"2" != 2` with strict equality. But `[1,2,3].includes("2")` also returns false. The gotcha is the `==` operator: `"2" == 2` is true in JS but `indexOf` uses `===`. Use `===` or explicit type conversion everywhere.',
          },
          {
            type: 'warning',
            title: 'Mistake 7: Using Binary Search on Unsorted Array',
            body: 'Binary search REQUIRES a sorted array. Calling it on an unsorted array produces incorrect results — no errors, just wrong answers. Always sort first: `arr.sort((a,b)=>a-b)` before `binarySearch()` or `lower_bound()`/`upper_bound()` in C++. This is a silent correctness bug that fails on 50%+ of test cases.',
          },
          {
            type: 'warning',
            title: 'Mistake 8: Integer Overflow in Index Calculation',
            body: 'In C/C++ with 32-bit integers, computing `mid = (left + right) / 2` overflows when left + right > 2,147,483,647. Use `mid = left + (right - left) / 2` instead. In JavaScript, numbers are 64-bit floats so overflow is less common, but very large index calculations can lose precision beyond 2^53.',
          },
          {
            type: 'warning',
            title: 'Mistake 9: Confusing Array Length and Last Index',
            body: 'The LAST VALID INDEX is always `arr.length - 1`. A 5-element array has indices 0,1,2,3,4 — not 5. `arr.length` itself is NOT a valid index. When reversing or doing two-pointer: `right = arr.length - 1` (not `arr.length`). Memorize: last index = length - 1.',
          },
          {
            type: 'warning',
            title: 'Mistake 10: Not Considering Duplicates',
            body: 'Many array problems have subtly different answers when duplicates are present. "Remove duplicates" changes behavior. Binary search may find any of the duplicates (not necessarily the leftmost). "Find if pair sums to target" must avoid using the same element twice. ALWAYS ask in interviews: "Can the array have duplicate values?"',
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 13. PATTERNS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'patterns',
      title: 'Interview Patterns',
      icon: '🧩',
      estimatedTime: '50 min',
      content: {
        prose: [
          'The secret to solving array interview problems is recognizing which of ~7 core patterns applies. Once you identify the pattern, the solution is almost mechanical. Here are the 7 most important patterns, each with a complete template, dry run, and linked problems.',
        ],
        patterns: [
          {
            name: 'Two Pointers',
            description: 'Use two indices (left and right) that move toward each other or in the same direction. Avoids nested loops — reduces O(n²) brute force to O(n).',
            whenToUse: 'Sorted array problems, palindrome check, pair sum, removing duplicates in-place, container with most water.',
            template: [
              {
                language: 'javascript',
                code: `function twoPointers(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    // Process arr[left] and arr[right]
    if (condition) {
      left++;
    } else {
      right--;
    }
  }
}`,
                explanation: 'Classic opposing two-pointer template. Works on sorted arrays.',
              },
              {
                language: 'python',
                code: `def two_pointers(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        # Process arr[left] and arr[right]
        if condition:
            left += 1
        else:
            right -= 1`,
              },
              {
                language: 'cpp',
                code: `void twoPointers(vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        // Process arr[left] and arr[right]
        if (condition) left++;
        else right--;
    }
}`,
              },
            ],
            dryRun: 'Example: Two Sum in sorted array [2,7,11,15], target=9. left=0,right=3: 2+15=17>9 → right--. left=0,right=2: 2+11=13>9 → right--. left=0,right=1: 2+7=9 ✓ → return [0,1]. Total: 3 operations vs 6 for brute force.',
            problems: ['Two Sum II (Sorted Input)', 'Valid Palindrome', 'Container With Most Water', '3Sum', 'Remove Duplicates from Sorted Array', 'Squares of Sorted Array'],
          },
          {
            name: 'Sliding Window (Fixed Size)',
            description: 'Maintain a window of fixed size k that slides through the array. Add one element on the right, remove one from the left. Solves subarray problems in O(n) instead of O(n×k).',
            whenToUse: 'Maximum/minimum sum of subarray of size k, average of subarrays, number of 1s in binary subarray.',
            template: [
              {
                language: 'javascript',
                code: `function fixedWindow(arr, k) {
  // Build initial window
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  let maxSum = windowSum;

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i];       // add new right element
    windowSum -= arr[i - k];   // remove old left element
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
                explanation: 'Add right, subtract left. O(n) — window always has exactly k elements.',
              },
            ],
            dryRun: 'Array=[2,1,5,1,3,2], k=3. Initial window [2,1,5]=8. Slide: +1-2=7. Slide: +3-1=9. Slide: +2-5=6. Max=9 (subarray [5,1,3]).',
            problems: ['Maximum Average Subarray I', 'Maximum Sum of K Consecutive Elements', 'Number of 1s in Binary Subarray of Size K', 'Grumpy Bookstore Owner'],
          },
          {
            name: 'Sliding Window (Variable Size)',
            description: 'Window expands or shrinks based on a condition. Expand right pointer; when condition violated, shrink from left. Finds optimal subarray size in O(n).',
            whenToUse: 'Longest subarray/substring with constraint (max sum ≤ k, at most k distinct, no duplicate characters).',
            template: [
              {
                language: 'javascript',
                code: `function variableWindow(arr, target) {
  let left = 0, windowState = 0, best = 0;
  
  for (let right = 0; right < arr.length; right++) {
    // Expand window: add arr[right]
    windowState += arr[right];
    
    // Shrink window while constraint violated
    while (windowState > target) {
      windowState -= arr[left];
      left++;
    }
    
    // Update best (window is valid here)
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
                explanation: 'Right pointer always moves forward. Left pointer catches up when constraint is violated.',
              },
            ],
            dryRun: 'Array=[1,2,3,1,2], target=5. right=0: state=1, best=1. right=1: state=3, best=2. right=2: state=6>5 → shrink: left=1,state=5, best=3. right=3: state=6>5 → shrink: left=2,state=4, best=3. right=4: state=6>5 → shrink: left=3,state=3, best=3. Answer: 3 (subarray [2,3,1] or [3,1,2]).',
            problems: ['Longest Substring Without Repeating Characters', 'Minimum Size Subarray Sum', 'Longest Subarray with Sum ≤ K', 'Fruit Into Baskets', 'Permutation in String'],
          },
          {
            name: 'Prefix Sum',
            description: 'Precompute cumulative sums so any subarray sum query [l, r] can be answered in O(1). Transforms O(n) query to O(1) after O(n) preprocessing.',
            whenToUse: 'Range sum queries, subarray sum equals K, 2D matrix range queries, count of subarrays with given property.',
            template: [
              {
                language: 'javascript',
                code: `// 1D Prefix Sum
function buildPrefix(arr) {
  const prefix = new Array(arr.length + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }
  return prefix;
}

// Query: sum of arr[l..r] inclusive
function query(prefix, l, r) {
  return prefix[r + 1] - prefix[l];
}

// Subarray Sum Equals K (use hash map)
function subarraySumK(nums, k) {
  let count = 0, sum = 0;
  const map = { 0: 1 }; // base case: empty prefix sum
  for (const num of nums) {
    sum += num;
    count += (map[sum - k] || 0);
    map[sum] = (map[sum] || 0) + 1;
  }
  return count;
}`,
                explanation: 'prefix[i+1] = prefix[i] + arr[i]. Query [l,r] = prefix[r+1] - prefix[l]. O(1) per query after O(n) build.',
              },
            ],
            dryRun: 'Array=[1,2,3,4,5]. Prefix=[0,1,3,6,10,15]. Sum(1,3)=prefix[4]-prefix[1]=10-1=9. Verify: 2+3+4=9 ✓.',
            problems: ['Range Sum Query', 'Subarray Sum Equals K', 'Continuous Subarray Sum', 'Number of Submatrices That Sum to Target', 'Count of Nice Subarrays'],
          },
          {
            name: "Kadane's Algorithm",
            description: "Finds the maximum sum contiguous subarray in O(n). Based on the insight: at each position, either extend the previous subarray or start a new one — whichever is larger.",
            whenToUse: 'Maximum subarray sum, maximum product subarray (modified), stock profit maximization.',
            template: [
              {
                language: 'javascript',
                code: `function maxSubarraySum(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    // Either extend previous subarray or start fresh
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  
  return maxSoFar;
}

// To also return the subarray indices:
function maxSubarrayWithIndices(nums) {
  let maxSoFar = nums[0], currentMax = nums[0];
  let start = 0, end = 0, tempStart = 0;
  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > currentMax + nums[i]) {
      currentMax = nums[i];
      tempStart = i;
    } else {
      currentMax += nums[i];
    }
    if (currentMax > maxSoFar) {
      maxSoFar = currentMax;
      start = tempStart;
      end = i;
    }
  }
  return { sum: maxSoFar, subarray: nums.slice(start, end + 1) };
}`,
                explanation: "currentMax = max(nums[i], currentMax + nums[i]). If adding nums[i] makes it worse, restart from nums[i].",
              },
            ],
            dryRun: "Array=[-2,1,-3,4,-1,2,1,-5,4]. currentMax: -2,1,-2,4,3,5,6,1,5. maxSoFar: -2,1,1,4,4,5,6,6,6. Answer: 6 (subarray [4,-1,2,1]).",
            problems: ['Maximum Subarray (LeetCode 53)', 'Maximum Product Subarray', 'Best Time to Buy and Sell Stock', 'Maximum Sum Circular Subarray'],
          },
          {
            name: 'Dutch National Flag (3-Way Partition)',
            description: 'Partition array into 3 groups (typically: < pivot, = pivot, > pivot) using 3 pointers in a single O(n) pass with O(1) space.',
            whenToUse: 'Sort Colors (0,1,2), 3-way partition, separate negative/zero/positive, 3-group classification.',
            template: [
              {
                language: 'javascript',
                code: `function dutchFlag(arr) {
  // Partition into: [0s | 1s | 2s]
  let low = 0;              // boundary: all left of low are 0s
  let mid = 0;              // current element being examined
  let high = arr.length - 1; // boundary: all right of high are 2s
  
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++; mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else { // arr[mid] === 2
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--; // don't increment mid (new element at mid unchecked)
    }
  }
  return arr;
}`,
                explanation: '3 pointers: low (0s boundary), mid (current), high (2s boundary). O(n) time, O(1) space.',
              },
            ],
            dryRun: 'Array=[2,0,2,1,1,0]. low=0,mid=0,high=5. arr[0]=2: swap(0,5)→[0,0,2,1,1,2],high=4. arr[0]=0: swap(0,0)→same,low=1,mid=1. arr[1]=0: swap(1,1)→same,low=2,mid=2. arr[2]=2: swap(2,4)→[0,0,1,1,2,2],high=3. arr[2]=1: mid=3. arr[3]=1: mid=4. mid>high: done. Result=[0,0,1,1,2,2] ✓',
            problems: ['Sort Colors (LeetCode 75)', 'Separate 0s, 1s, 2s', 'Partition Array Around Pivot', 'Wiggle Sort II'],
          },
          {
            name: 'Merge Intervals',
            description: 'Sort intervals by start time, then greedily merge overlapping ones. Reduces O(n²) comparison to O(n log n).',
            whenToUse: 'Merging meeting times, calendar overlap, IP range merging, interval scheduling.',
            template: [
              {
                language: 'javascript',
                code: `function mergeIntervals(intervals) {
  // Step 1: Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);
  
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];
    
    // If current overlaps with last, merge
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      // No overlap, add separately
      merged.push(current);
    }
  }
  
  return merged;
}`,
                explanation: 'Sort is O(n log n). Single pass merge is O(n). Total: O(n log n).',
              },
            ],
            dryRun: 'intervals=[[1,3],[2,6],[8,10],[15,18]]. Sorted. last=[1,3]. current=[2,6]: 2≤3→merge→[1,6]. current=[8,10]: 8>6→add. current=[15,18]: 15>10→add. Result=[[1,6],[8,10],[15,18]].',
            problems: ['Merge Intervals (LeetCode 56)', 'Insert Interval', 'Non-overlapping Intervals', 'Meeting Rooms II', 'Employee Free Time'],
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 14. ADVANCED CONCEPTS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'advanced',
      title: 'Advanced Concepts',
      icon: '🚀',
      estimatedTime: '30 min',
      content: {
        prose: [
          '2D Arrays (Matrices): A 2D array is the most common advanced array structure. In memory it is stored in row-major order (all of row 0, then row 1, etc.). Common 2D array algorithms include: matrix rotation (90°, 180°), spiral traversal, diagonal traversal, search in a 2D sorted matrix, matrix multiplication, and flood fill. For interviews, matrix problems require careful index manipulation — always draw a small example and trace your indices before coding.',
          'Sparse Arrays: A sparse array is one where most values are zero (or some default). Storing it as a full array wastes memory. The efficient representation is a hash map from index to non-zero value. Sparse matrices (2D) appear in graph theory (adjacency matrices for graphs with few edges) and machine learning (TF-IDF vectors). Libraries like SciPy and Eigen have dedicated sparse matrix types.',
          'Circular Arrays: A circular array treats the array as if it wraps around — the element after the last element is the first element. Index arithmetic uses modulo: `(i + 1) % n`. Applications include: circular queues (ring buffers), round-robin scheduling, cyclic rotation, and sliding window on circular ranges. Many problems like "Maximum Sum Circular Subarray" require thinking in terms of circular arrays.',
          'Prefix Products and Difference Arrays: Beyond prefix sums, prefix products are useful for "product of array except self" (divide total product by current element — careful with zeros!). Difference arrays are a technique for range update queries: if you need to add a constant to all elements in range [l, r] repeatedly, maintain a difference array and apply updates in O(1), then compute final values with a prefix sum in O(n). This is O(n + q) vs O(nq) for q updates.',
          'SIMD and Memory Layout: At the hardware level, modern CPUs support SIMD (Single Instruction, Multiple Data) instructions that process 4–16 array elements simultaneously. Compilers automatically vectorize tight loops over contiguous arrays. This is why well-written array code can run 4–16x faster than equivalent linked-list code even at the same algorithmic complexity. Understanding this helps you explain to interviewers why cache-friendly access patterns matter in practice.',
        ],
        codeExamples: [
          {
            language: 'javascript',
            code: `// ─── 2D ARRAY OPERATIONS ────────────────────

// Spiral Traversal
function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++)   result.push(matrix[top][i]);   top++;
    for (let i = top; i <= bottom; i++)   result.push(matrix[i][right]); right--;
    if (top <= bottom)
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]); bottom--;
    if (left <= right)
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);  left++;
  }
  return result;
}

// Rotate Matrix 90° Clockwise (in-place)
function rotate90(matrix) {
  const n = matrix.length;
  // Step 1: Transpose
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
  // Step 2: Reverse each row
  for (let i = 0; i < n; i++)
    matrix[i].reverse();
}`,
            explanation: 'Spiral traversal uses 4 boundary pointers. 90° rotation = transpose + row-reverse.',
          },
          {
            language: 'javascript',
            code: `// ─── DIFFERENCE ARRAY ─────────────────────
// Apply range updates in O(1), compute final values in O(n)

function rangeUpdate(n, updates) {
  // updates: [[l, r, val], ...]
  const diff = new Array(n + 1).fill(0);
  
  for (const [l, r, val] of updates) {
    diff[l] += val;
    diff[r + 1] -= val;
  }
  
  // Reconstruct the final array
  const result = new Array(n).fill(0);
  let running = 0;
  for (let i = 0; i < n; i++) {
    running += diff[i];
    result[i] = running;
  }
  return result;
}

// Example: n=5, updates=[[0,2,+3],[1,4,-1],[2,3,+5]]
// After +3 on [0,2]: [3,3,3,0,0]
// After -1 on [1,4]: [3,2,2,-1,-1]
// After +5 on [2,3]: [3,2,7,4,-1]
console.log(rangeUpdate(5, [[0,2,3],[1,4,-1],[2,3,5]]));
// [3, 2, 7, 4, -1]`,
            explanation: 'Difference array turns O(nq) range updates into O(n+q). Key interview pattern.',
          },
          {
            language: 'javascript',
            code: `// ─── CIRCULAR ARRAY ─────────────────────
// Circular array: next(i) = (i+1)%n, prev(i) = (i-1+n)%n

// Maximum Sum Circular Subarray
function maxCircularSum(nums) {
  const n = nums.length;
  let totalSum = 0;
  let maxSum = nums[0], curMax = 0;
  let minSum = nums[0], curMin = 0;
  
  for (const num of nums) {
    // Kadane's for max
    curMax = Math.max(curMax + num, num);
    maxSum = Math.max(maxSum, curMax);
    // Kadane's for min (inverted)
    curMin = Math.min(curMin + num, num);
    minSum = Math.min(minSum, curMin);
    totalSum += num;
  }
  
  // Either non-circular max, or circular = total - min subarray
  return maxSum > 0 ? Math.max(maxSum, totalSum - minSum) : maxSum;
}`,
            explanation: 'Circular max subarray = max(normal Kadane, totalSum - minSubarray). Brilliant reduction.',
          },
        ],
        callouts: [
          {
            type: 'tip',
            title: 'Transpose + Reverse = Rotation',
            body: 'Rotating an N×N matrix 90° clockwise = Transpose + Reverse each row. 90° counterclockwise = Transpose + Reverse each column. 180° = Reverse each row + Reverse each column. These in-place transformations are O(n²) time, O(1) space — a common Hard interview problem.',
          },
          {
            type: 'important',
            title: 'When to Use Difference Array',
            body: 'If a problem gives you a series of range update queries [l, r, +val] and asks for the final array, use the difference array technique. It reduces O(nq) naive approach to O(n + q). This appears in: "Corporate Flight Bookings", "Range Addition", "Car Pooling" on LeetCode.',
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 15. CHEAT SHEET
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'cheatsheet',
      title: 'Cheat Sheet',
      icon: '📄',
      estimatedTime: '10 min',
      content: {
        prose: [
          'Your one-page quick reference for Arrays. Covers all complexities, essential methods, and the 7 most important patterns at a glance.',
        ],
        keyPoints: [
          '⚡ Access: O(1) — best in class, use arrays when you need random access',
          '🔍 Linear Search: O(n) — check every element; works on unsorted arrays',
          '🔍 Binary Search: O(log n) — requires sorted array; HUGE speedup for large n',
          '➕ Insert/Delete at END: O(1) — use arrays as stacks',
          '➕ Insert/Delete at START/MIDDLE: O(n) — avoid in hot loops',
          '📝 sort(): O(n log n) — always pass a comparator for numbers in JS!',
          '🗺️ Memory formula: address(i) = base + i × sizeof(element)',
          '🧩 Pattern: Two Pointers → sorted array, pair sum, palindrome',
          '🧩 Pattern: Sliding Window → subarray problems, fixed or variable window',
          '🧩 Pattern: Prefix Sum → range sum in O(1) after O(n) build',
          "🧩 Pattern: Kadane's → maximum subarray sum, O(n)",
          '🧩 Pattern: Dutch National Flag → 3-way partition in O(n)',
          '🧩 Pattern: Merge Intervals → sort by start, greedily merge',
          '🧩 Pattern: Difference Array → range updates in O(1), finalize in O(n)',
        ],
        tableData: [
          {
            headers: ['Operation', 'Best', 'Average', 'Worst', 'Space'],
            rows: [
              ['Access', 'O(1)', 'O(1)', 'O(1)', 'O(1)'],
              ['Search (Linear)', 'O(1)', 'O(n)', 'O(n)', 'O(1)'],
              ['Search (Binary)', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)'],
              ['Insert (End)', 'O(1)', 'O(1)', 'O(n)', 'O(1)'],
              ['Insert (Middle/Start)', 'O(n)', 'O(n)', 'O(n)', 'O(1)'],
              ['Delete (End)', 'O(1)', 'O(1)', 'O(1)', 'O(1)'],
              ['Delete (Middle/Start)', 'O(n)', 'O(n)', 'O(n)', 'O(1)'],
              ['Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(log n)'],
            ],
          },
          {
            headers: ['Pattern', 'When to Use', 'Time', 'Space'],
            rows: [
              ['Two Pointers', 'Pair sum on sorted arr, palindrome, remove dups', 'O(n)', 'O(1)'],
              ['Sliding Window (Fixed)', 'Max/min of k-size subarray', 'O(n)', 'O(1)'],
              ['Sliding Window (Variable)', 'Longest subarray with constraint', 'O(n)', 'O(1)'],
              ['Prefix Sum', 'Range sum queries, subarray sum = K', 'O(n+q)', 'O(n)'],
              ["Kadane's", 'Max subarray sum', 'O(n)', 'O(1)'],
              ['Dutch National Flag', '3-way partition (0s/1s/2s)', 'O(n)', 'O(1)'],
              ['Merge Intervals', 'Overlapping intervals', 'O(n log n)', 'O(n)'],
            ],
          },
        ],
        callouts: [
          {
            type: 'important',
            title: '#1 Interview Tip',
            body: 'Always sort the array if you\'re stuck on an O(n²) brute force. Sorting costs O(n log n) but often enables O(n) or O(log n) solutions, making the total O(n log n) which is much better.',
          },
          {
            type: 'tip',
            title: '#2 Interview Tip',
            body: 'Before writing any code, state the time and space complexity of your approach. "I think this is O(n) time and O(1) space because..." shows interviewers you think analytically.',
          },
          {
            type: 'note',
            title: '#3 Interview Tip',
            body: 'When using Two Pointers on an unsorted array, use a Hash Map instead. Two Pointers requires sorted order; Hash Map works on arbitrary order. Both achieve O(n) for pair-sum problems.',
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 16. QUIZ
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'quiz',
      title: 'Knowledge Quiz',
      icon: '🧠',
      estimatedTime: '20 min',
      content: {
        quiz: [
          {
            id: 'q1',
            question: 'What is the time complexity of accessing an element in an array by its index?',
            options: [
              { id: 'a', text: 'O(1) — constant time' },
              { id: 'b', text: 'O(log n) — logarithmic' },
              { id: 'c', text: 'O(n) — linear' },
              { id: 'd', text: 'O(n²) — quadratic' },
            ],
            correctId: 'a',
            explanation: 'Array access is O(1) because the CPU computes the exact memory address in one step: address = base + index × elementSize. This is a single arithmetic operation, independent of n.',
          },
          {
            id: 'q2',
            question: 'For `int arr[5]` starting at base address 2000, where each int is 4 bytes, what is the address of arr[3]?',
            options: [
              { id: 'a', text: '2003' },
              { id: 'b', text: '2006' },
              { id: 'c', text: '2012' },
              { id: 'd', text: '2015' },
            ],
            correctId: 'c',
            explanation: 'address(3) = 2000 + 3 × 4 = 2000 + 12 = 2012. The formula is: base_address + index × size_of_element.',
          },
          {
            id: 'q3',
            question: 'Why are arrays generally faster than linked lists for sequential traversal, even though both are O(n)?',
            options: [
              { id: 'a', text: 'Arrays have fewer elements to visit' },
              { id: 'b', text: 'Arrays exploit CPU cache: contiguous memory loads multiple elements per cache line' },
              { id: 'c', text: 'Array traversal uses a faster sorting algorithm' },
              { id: 'd', text: 'Arrays use hardware-level parallelism automatically' },
            ],
            correctId: 'b',
            explanation: 'Arrays store elements contiguously, so a single cache line (64 bytes) loads 16 integers at once. Sequential access hits cache every time. Linked list nodes are at random memory locations, causing a cache miss (main memory access, ~200 cycles) on every node.',
          },
          {
            id: 'q4',
            question: 'What is the time complexity of inserting an element at the BEGINNING of an array of n elements?',
            options: [
              { id: 'a', text: 'O(1)' },
              { id: 'b', text: 'O(log n)' },
              { id: 'c', text: 'O(n)' },
              { id: 'd', text: 'O(n log n)' },
            ],
            correctId: 'c',
            explanation: 'Inserting at the beginning requires shifting ALL n existing elements one position to the right to make room at index 0. This is O(n) in all cases — best, average, and worst.',
          },
          {
            id: 'q5',
            question: 'What is the danger of the following C++ binary search: `int mid = (left + right) / 2`?',
            options: [
              { id: 'a', text: 'It gives a floating point result instead of integer' },
              { id: 'b', text: 'It can cause integer overflow when left and right are large' },
              { id: 'c', text: 'It always rounds up instead of down' },
              { id: 'd', text: 'It skips the middle element' },
            ],
            correctId: 'b',
            explanation: 'When left and right are both near INT_MAX (2,147,483,647), their sum overflows a 32-bit integer, producing a negative number. The safe version is: mid = left + (right - left) / 2, which avoids the overflow.',
          },
          {
            id: 'q6',
            question: 'You have a SORTED array and need to find the count of elements equal to a target value. Which approach is most efficient?',
            options: [
              { id: 'a', text: 'Linear search — O(n)' },
              { id: 'b', text: 'Sort again then linear search — O(n log n)' },
              { id: 'c', text: 'upper_bound(target) - lower_bound(target) — O(log n)' },
              { id: 'd', text: 'Hash map frequency count — O(n)' },
            ],
            correctId: 'c',
            explanation: 'upper_bound gives the first position AFTER the last occurrence of target. lower_bound gives the first position of target. Their difference is the count. Both are O(log n) binary searches, so total is O(log n) — optimal for sorted arrays.',
          },
          {
            id: 'q7',
            question: 'What does `[1,2,3].sort()` return in JavaScript?',
            options: [
              { id: 'a', text: '[1, 2, 3] (already sorted, unchanged)' },
              { id: 'b', text: '[3, 2, 1] (reversed)' },
              { id: 'c', text: '[1, 2, 3] (correct numeric sort)' },
              { id: 'd', text: 'Depends on the input but for [10, 9, 2] you get [10, 2, 9]' },
            ],
            correctId: 'd',
            explanation: 'JavaScript\'s default sort converts elements to strings and sorts lexicographically. "10" < "2" because "1" < "2" in string comparison. So [10, 9, 2].sort() gives [10, 2, 9] — completely wrong for numeric sorting! Always use .sort((a,b) => a-b) for numbers.',
          },
          {
            id: 'q8',
            question: 'Given an unsorted array, you need to find two numbers that sum to a target. What is the optimal approach?',
            options: [
              { id: 'a', text: 'Nested for loops — O(n²) time, O(1) space' },
              { id: 'b', text: 'Sort then two pointers — O(n log n) time, O(1) space' },
              { id: 'c', text: 'Hash map — O(n) time, O(n) space' },
              { id: 'd', text: 'Binary search each element — O(n log n) time, O(1) space' },
            ],
            correctId: 'c',
            explanation: 'For an UNSORTED array, a hash map is optimal: iterate once, storing each number. For each element x, check if (target - x) exists in the map. O(n) time, O(n) space. Note: if the array were sorted, two pointers would give O(n) time, O(1) space — even better in terms of space.',
          },
          {
            id: 'q9',
            question: 'You need to add the same value to ALL elements in a range [l, r] multiple times (q range updates), then output the final array. What technique reduces total complexity from O(nq) to O(n + q)?',
            options: [
              { id: 'a', text: 'Prefix sum' },
              { id: 'b', text: 'Difference array' },
              { id: 'c', text: 'Sliding window' },
              { id: 'd', text: 'Binary search' },
            ],
            correctId: 'b',
            explanation: 'The difference array technique: for update [l, r, val], do diff[l] += val and diff[r+1] -= val (each O(1)). After all q updates, compute prefix sum of diff to get final values (O(n)). Total: O(n + q) vs O(nq) naive approach.',
          },
          {
            id: 'q10',
            question: 'What is the maximum sum subarray of [-2, 1, -3, 4, -1, 2, 1, -5, 4]?',
            options: [
              { id: 'a', text: '6 (subarray [4, -1, 2, 1])' },
              { id: 'b', text: '4 (just [4])' },
              { id: 'c', text: '8 (subarray [4, -1, 2, 1, -5, 4] — wrong)' },
              { id: 'd', text: '5 (subarray [4, -1, 2])' },
            ],
            correctId: 'a',
            explanation: "Kadane's Algorithm traces: currentMax = -2, 1, -2, 4, 3, 5, 6, 1, 5. maxSoFar = -2, 1, 1, 4, 4, 5, 6, 6, 6. The maximum is 6, achieved by [4, -1, 2, 1] (indices 3-6).",
          },
        ],
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 17. PRACTICE PROBLEMS
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'practice',
      title: 'Practice Problems',
      icon: '💪',
      estimatedTime: '3+ Hours',
      content: {
        prose: [
          'Practice is the only way to master arrays. These 15 problems are carefully selected to progressively challenge every concept you learned in this course. Start with Easy, master each one, then move to Medium. Do not look at solutions before attempting for at least 20 minutes. The struggle is where the learning happens.',
        ],
        practice: [
          {
            title: 'Two Sum',
            difficulty: 'Easy',
            description: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. Each input has exactly one solution, and you may not use the same element twice.',
            hint: 'Use a hash map to store each number and its index as you iterate. For each number x, check if (target - x) is already in the map.',
            approach: 'Hash Map Approach: Create an empty hash map. Iterate through the array once. For each element nums[i], compute complement = target - nums[i]. If complement exists in the map, return [map[complement], i]. Otherwise, store nums[i] → i in the map. This is O(n) time, O(n) space.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
          },
          {
            title: 'Find Maximum Element',
            difficulty: 'Easy',
            description: 'Given an integer array nums, return the maximum element. Do this in a single pass without using built-in max functions.',
            hint: 'Initialize max as the first element, then update it whenever you find something larger.',
            approach: 'Initialize max = nums[0]. Iterate from index 1 to n-1. For each nums[i], if nums[i] > max, update max = nums[i]. Return max. Time: O(n), Space: O(1).',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Reverse an Array',
            difficulty: 'Easy',
            description: 'Reverse an array in-place. Do not allocate an extra array. The reversal must happen within the original array.',
            hint: 'Use two pointers: one at the start, one at the end. Swap them and move inward.',
            approach: 'Two Pointers: left = 0, right = n-1. While left < right: swap(arr[left], arr[right]), left++, right--. This swaps elements symmetrically around the center. O(n) time, O(1) space.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Remove Duplicates from Sorted Array',
            difficulty: 'Easy',
            description: 'Given a sorted integer array, remove duplicates in-place. Return the count k of unique elements. The first k elements of the array should contain the unique elements in sorted order.',
            hint: 'Use a slow pointer that only advances when a new unique element is found.',
            approach: 'Slow-Fast Pointers: slow = 0. Iterate fast from 1 to n-1. If nums[fast] !== nums[slow]: slow++, then nums[slow] = nums[fast]. Return slow + 1. The "slow" pointer marks the boundary of unique elements. O(n) time, O(1) space.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Rotate Array',
            difficulty: 'Easy',
            description: 'Given an integer array nums, rotate it to the right by k steps, where k is non-negative. Do this in O(1) extra space.',
            hint: 'Reverse the entire array, then reverse the first k elements, then reverse the rest.',
            approach: 'Three Reversals: k = k % n (handle k > n). Reverse entire array. Reverse first k elements. Reverse remaining n-k elements. Why it works: reversing "wraps around" the rotation. O(n) time, O(1) space. Example: [1,2,3,4,5], k=2 → Reverse all: [5,4,3,2,1] → Reverse first 2: [4,5,3,2,1] → Reverse last 3: [4,5,1,2,3] ✓',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Maximum Subarray (Kadane\'s)',
            difficulty: 'Medium',
            description: 'Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.',
            hint: "At each index: should you extend the previous subarray or start fresh? Pick whichever gives a larger value.",
            approach: "Kadane's Algorithm: currentMax = nums[0], maxSoFar = nums[0]. For i from 1 to n-1: currentMax = max(nums[i], currentMax + nums[i]); maxSoFar = max(maxSoFar, currentMax). Return maxSoFar. Key insight: if currentMax goes negative, restart from current element. O(n) time, O(1) space.",
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Container With Most Water',
            difficulty: 'Medium',
            description: 'Given n vertical lines at positions 1..n with heights height[i], find two lines that together with the x-axis forms a container that holds the most water.',
            hint: 'Two pointers. Move the shorter line inward — moving the taller one can only make things worse.',
            approach: 'Two Pointers: left=0, right=n-1, maxWater=0. While left < right: water = min(height[left], height[right]) × (right-left); maxWater = max(maxWater, water). Move the pointer of the shorter line inward. Why? Moving the taller line can only maintain or decrease the height constraint. O(n) time, O(1) space.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: '3Sum',
            difficulty: 'Medium',
            description: 'Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i≠j, j≠k, i≠k, and nums[i]+nums[j]+nums[k]=0. The solution set must not contain duplicate triplets.',
            hint: 'Sort first. Fix one element, then use two pointers for the remaining pair.',
            approach: 'Sort + Two Pointers: Sort the array. For each i from 0 to n-3: if nums[i] > 0: break (no triple can sum to 0). Skip duplicates: if i>0 and nums[i]==nums[i-1]: continue. Set left=i+1, right=n-1. While left<right: sum=nums[i]+nums[left]+nums[right]. If sum==0: add triplet, skip duplicates, move both pointers. If sum<0: left++. If sum>0: right--. O(n²) time, O(1) extra space.',
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Product of Array Except Self',
            difficulty: 'Medium',
            description: 'Given an integer array nums, return an array answer where answer[i] equals the product of all elements except nums[i]. You must do it in O(n) and without division.',
            hint: 'Build prefix products (left) and suffix products (right). answer[i] = prefix[i] × suffix[i].',
            approach: 'Prefix × Suffix: Build left[i] = product of all elements to the LEFT of i. Build right[i] = product of all elements to the RIGHT of i. answer[i] = left[i] × right[i]. Optimize space: use the result array for prefix, then traverse right-to-left with a running suffix. O(n) time, O(1) extra space (output array not counted).',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Find the Missing Number',
            difficulty: 'Medium',
            description: 'Given an array nums of n distinct numbers in range [0, n], return the only number missing from the range.',
            hint: 'Sum of [0..n] is n*(n+1)/2. Subtract the actual sum to find the missing number.',
            approach: 'Mathematical: expectedSum = n*(n+1)/2. actualSum = sum of all elements. Missing = expectedSum - actualSum. O(n) time, O(1) space. Alternative: XOR all indices 0..n with all elements — XOR cancels matching pairs, leaving the missing number. Both approaches handle n up to ~10^4 without overflow in most languages.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Trapping Rain Water',
            difficulty: 'Hard',
            description: 'Given n non-negative integers representing an elevation map where each bar has width 1, compute how much water it can trap after raining.',
            hint: 'Water at position i = min(maxLeft[i], maxRight[i]) - height[i]. Use two pointers to compute this in O(1) space.',
            approach: 'Two Pointers: left=0, right=n-1, leftMax=0, rightMax=0, water=0. While left<right: if height[left] < height[right]: if height[left] >= leftMax: leftMax=height[left]; else water += leftMax-height[left]. left++. Else: if height[right] >= rightMax: rightMax=height[right]; else water += rightMax-height[right]. right--. Return water. O(n) time, O(1) space. Key insight: the water at position i is bounded by the SHORTER of the two max walls.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Jump Game II',
            difficulty: 'Hard',
            description: 'Given an integer array nums where nums[i] is the max jump from index i, return the minimum number of jumps to reach index n-1.',
            hint: 'Greedy: at each step, jump to the position that maximizes your reach for the next step.',
            approach: 'Greedy BFS: jumps=0, currentEnd=0, farthest=0. For i from 0 to n-2: farthest=max(farthest, i+nums[i]). If i==currentEnd: jumps++; currentEnd=farthest. Return jumps. Think of it as BFS levels: currentEnd marks the end of the current "level". When you reach it, you need one more jump and advance to farthest. O(n) time, O(1) space.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'First Missing Positive',
            difficulty: 'Hard',
            description: 'Given an unsorted integer array nums, return the smallest missing positive integer. Must be O(n) time and O(1) space.',
            hint: 'The answer is always in [1, n+1]. Use the array itself as a hash map: place number k at index k-1.',
            approach: 'Index-as-Hash (Cyclic Sort): Place each number in its "correct" position (num k → index k-1) if 1 <= k <= n. After placing, scan: the first index i where nums[i] != i+1 gives the answer i+1. If all positions are correct, answer is n+1. Key: swap nums[i] with nums[nums[i]-1] until nums[i] is out of range or already in place. O(n) time, O(1) space.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Median of Two Sorted Arrays',
            difficulty: 'Expert',
            description: 'Given two sorted arrays nums1 and nums2 of size m and n, return the median of the merged array. The overall runtime complexity must be O(log(m+n)).',
            hint: 'Binary search on the smaller array to find the correct partition point where left halves of both arrays form the left half of the merged array.',
            approach: 'Binary Search on Partition: Ensure nums1 is smaller (swap if needed). Binary search for partition i in nums1: j = (m+n+1)/2 - i in nums2. Valid partition when maxLeft1 <= minRight2 and maxLeft2 <= minRight1. If maxLeft1 > minRight2: i too large, search left. If maxLeft2 > minRight1: i too small, search right. Median = avg(max(maxLeft1,maxLeft2), min(minRight1,minRight2)) for even total, or max(maxLeft1,maxLeft2) for odd. O(log(min(m,n))) time, O(1) space.',
            timeComplexity: 'O(log(min(m,n)))',
            spaceComplexity: 'O(1)',
          },
          {
            title: 'Largest Rectangle in Histogram',
            difficulty: 'Expert',
            description: 'Given an array of integers heights representing the histogram bar heights, return the area of the largest rectangle in the histogram.',
            hint: 'Use a monotonic stack. For each bar, find the nearest shorter bar to its left and right. The rectangle using this bar spans between those two boundaries.',
            approach: 'Monotonic Stack: Maintain a stack of indices with increasing heights. For each bar i: while stack not empty and heights[stack.top()] > heights[i]: pop height h, compute width = i - stack.top() - 1 (or i if stack empty), area = h × width, update maxArea. Push i. After array: process remaining stack similarly. Intuition: popping a bar when a shorter one appears means we\'ve found the right boundary; left boundary is the new top of stack. O(n) time, O(n) space.',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
          },
        ],
      },
    },
  ],
};
