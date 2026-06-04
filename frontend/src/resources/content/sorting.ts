import type { TopicContent } from './types';

export const sortingContent: TopicContent = {
  id: 'sorting',
  title: 'Sorting Algorithms',
  subtitle: 'Organizing Data for Efficient Computation',
  description: 'Master comparison and non-comparison sorting algorithms. Learn Bubble, Selection, Insertion, Merge, Quick, and Heap Sort with C++ STL implementations and memory visualizers.',
  totalTime: '5-7 Hours',
  difficulty: 'Intermediate',
  prerequisites: ['Arrays', 'Basic Recursion'],
  sections: [
    {
      id: 'intro',
      title: 'Introduction to Sorting',
      icon: '📊',
      estimatedTime: '8 min',
      layoutType: 'introduction',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Sorting is the process of arranging a collection of data in a specific order (ascending or descending). It is one of the most fundamental operations in computer science, acting as a crucial pre-processing step for many algorithms.',
              'For instance, search engines, databases, and e-commerce platforms sort millions of records to deliver query results instantly. A sorted collection unlocks fast searching techniques like Binary Search, which drops search time from linear O(N) to logarithmic O(log N).'
            ],
            visual: { type: 'sort-comparison' }
          },
          {
            type: 'internal-working',
            text: [
              'Sorting algorithms are classified by their memory usage and stability. An algorithm is "In-Place" if it requires O(1) auxiliary space, meaning it swaps elements inside the original array without allocating extra arrays.',
              'An algorithm is "Stable" if it preserves the relative order of duplicate elements. If you sort a list of students by grade, and two students have the same grade, a stable sort guarantees they remain in their original relative order. This is highly important when sorting complex objects with multiple fields.'
            ],
            steps: [
              { title: 'Stability Guarantee', description: 'Keeps duplicate element order intact (e.g. A1, A2 remains A1, A2).' },
              { title: 'In-Place Sorting', description: 'Requires O(1) extra memory; sorts by swapping elements within the original array.' },
              { title: 'Out-Place Sorting', description: 'Allocates auxiliary memory (like Merge Sort) to hold intermediate sorted blocks.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Sorting speeds range from O(N²) for simple algorithms to O(N log N) for optimal divide-and-conquer algorithms. Non-comparison sorting (like Counting Sort or Radix Sort) can even achieve O(N) linear time under specific constraints.',
              'Understanding these trade-offs helps you select the correct sorting strategy based on dataset size, memory limits, and hardware constraints.'
            ],
            operation: 'Theoretical Comparison Limit',
            time: 'O(N log N)',
            space: 'O(1)',
            reason: 'Mathematically proven lower bound for any comparison-based sorting algorithm.'
          },
          {
            type: 'real-world',
            text: [
              'Consider contact list search on your phone. Contacts are kept sorted lexicographically so the OS can execute instant O(log N) lookups as you type.',
              'Another use case is database indexing, where keys are stored in sorted B-Trees to keep queries fast.'
            ],
            visual: { type: 'contact-search', title: 'Lexicographical Indexing' }
          },
          {
            type: 'interview-insight',
            text: [
              'Interviewers frequently ask you to explain sorting stability and cache locality. Algorithms with good cache locality (like Quicksort) perform faster in practice because they access contiguous memory blocks sequentially.',
              'Always confirm if the sorted output needs to be stable, as this filters out Quicksort or Heapsort unless modified.'
            ],
            checklist: [
              'Understand the difference between stable and unstable sorts',
              'Understand how cache lines favor contiguous memory sorting',
              'Know the mathematical lower bound of O(N log N) for comparison sorts'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Determine if Quicksort is a stable sorting algorithm.',
            current: 'Options: Stable vs Unstable',
            expected: 'Unstable',
            interactiveDemoType: 'check-stability'
          }
        ]
      }
    },
    {
      id: 'theory',
      title: 'Bubble Sort & Selection Sort',
      icon: '🧼',
      estimatedTime: '15 min',
      layoutType: 'operation-visualizer',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Bubble Sort works by repeatedly swapping adjacent elements if they are in the wrong order. With each pass, the largest unsorted element "bubbles" up to its correct position at the end of the array.',
              'Selection Sort builds the sorted array by repeatedly finding the minimum element from the unsorted portion and swapping it with the first unsorted element. It guarantees a maximum of N-1 swaps, which is useful when write operations are expensive.'
            ],
            visual: { type: 'bubble-selection-trace' }
          },
          {
            type: 'internal-working',
            text: [
              'A standard Bubble Sort executes (N-1) passes. In each pass, it compares adjacent values from index 0 to N-i-1. We can optimize it by adding a boolean flag: if a pass completes with zero swaps, the array is already sorted, and we can exit early.',
              'In C++, we implement Bubble Sort using nested loops and `std::swap`. The outer loop tracks passes, and the inner loop performs adjacent comparisons.'
            ],
            steps: [
              { title: 'Bubble Pass', description: 'Compare adjacent elements. Swap if arr[i] > arr[i+1].' },
              { title: 'Flag Optimization', description: 'Exit early if no swaps occur in a full pass.' },
              { title: 'Selection Minimum', description: 'Scan unsorted subarray to find the min element, then swap to the front.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Bubble Sort takes O(N) time in the best case (optimized with flag on a sorted array) and O(N²) in the average/worst cases. Selection Sort always takes O(N²) time because it must scan the unsorted portion completely to find the minimum, regardless of initial order.',
              'Both algorithms run in-place, requiring only O(1) auxiliary space.'
            ],
            operation: 'Bubble Sort (Optimized Best Case)',
            time: 'O(N)',
            space: 'O(1)',
            reason: 'Single traversal pass with no swaps terminates the algorithm.'
          },
          {
            type: 'real-world',
            text: [
              'Bubble Sort is rarely used in production due to its high swap count. However, Selection Sort is useful in EE/Embedded systems where memory writes (swapping) are much more expensive than reads, as it guarantees at most O(N) swaps.'
            ],
            visual: { type: 'embedded-system', title: 'Flash Memory Writes Optimization' }
          },
          {
            type: 'interview-insight',
            text: [
              'Be prepared to write the optimized Bubble Sort code with the swap flag, and explain why Selection Sort is unstable (swapping the minimum element can jump over identical elements, changing their relative order).',
              'Draw a trace diagram showing how Selection Sort breaks stability with a duplicate array like [4, 4, 1].'
            ],
            checklist: [
              'Write optimized Bubble Sort with early exit flag',
              'Explain why Selection Sort requires exactly N-1 swaps',
              'Demonstrate how Selection Sort swaps break stability'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Apply one pass of Bubble Sort on [5, 1, 4, 2]. What is the resulting array?',
            current: '[5, 1, 4, 2]',
            expected: '[1, 4, 2, 5]',
            interactiveDemoType: 'bubble-pass'
          }
        ]
      }
    },
    {
      id: 'operations',
      title: 'Insertion Sort',
      icon: '🃏',
      estimatedTime: '12 min',
      layoutType: 'algorithm-simulation',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Insertion Sort builds a sorted array one element at a time. It behaves like sorting playing cards in your hand: you take a card from the unsorted deck and slide it into its correct relative position within the sorted hand.',
              'It splits the array logically into sorted (left) and unsorted (right) portions. For each unsorted item, we shift larger elements right to clear a slot for insertion.'
            ],
            visual: { type: 'insertion-sort-card' }
          },
          {
            type: 'internal-working',
            text: [
              'We iterate from index 1 to N-1. In each iteration, we store the current element in a `temp` variable. We then scan backwards through the sorted portion (from index i-1 down to 0).',
              'As long as elements are larger than `temp`, we copy them one index to the right (`arr[j+1] = arr[j]`). Once we find an element smaller than `temp` (or reach index -1), we place `temp` in the vacant slot.'
            ],
            steps: [
              { title: 'Store Key', description: 'temp = arr[i]' },
              { title: 'Shift Right', description: 'Shift elements arr[j] > temp to the right.' },
              { title: 'Insert Key', description: 'Place temp at index j+1.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Insertion Sort takes O(N) time in the best case (already sorted array, requiring zero shifts) and O(N²) in the worst case (reverse sorted array, where every element must shift all the way to index 0).',
              'It is highly efficient for small datasets (N < 15) and almost-sorted arrays.'
            ],
            operation: 'Insertion Sort (Almost Sorted)',
            time: 'O(N)',
            space: 'O(1)',
            reason: 'Inner loop terminates almost instantly, minimizing shifts.'
          },
          {
            type: 'real-world',
            text: [
              'Insertion Sort is used in hybrid sorting algorithms like Timsort (used in Python and Java) and Introsort (used in C++ std::sort). When recursion partitions sub-arrays down to a small size (typically < 16), the algorithm switches to Insertion Sort because of its low overhead and O(N) speed on small arrays.'
            ],
            visual: { type: 'hybrid-sort', title: 'Introsort Partition Switch' }
          },
          {
            type: 'interview-insight',
            text: [
              'Interviewers look for the shift-versus-swap optimization. Shifting requires only 1 copy operation per step, whereas swapping requires 3 copy operations. Ensure you write the shift-based inner loop.',
              'Explain how the number of shifts is directly proportional to the number of inversions in the array.'
            ],
            checklist: [
              'Implement shift logic instead of inner loops swaps',
              'Describe the connection between swaps and inversions',
              'Explain why standard libraries use it for small arrays'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Insert 3 into the sorted subarray [1, 4, 5, 8]. What is the resulting shift path?',
            current: 'Key: 3, Subarray: [1, 4, 5, 8]',
            expected: 'Shift 8, Shift 5, Shift 4, Insert at index 1',
            interactiveDemoType: 'insert-path'
          }
        ]
      }
    },
    {
      id: 'advanced',
      title: 'Merge Sort & Quicksort',
      icon: '⚡',
      estimatedTime: '20 min',
      layoutType: 'complexity-analysis',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Merge Sort is a stable, divide-and-conquer algorithm. It recursively splits the array in half, sorts each half, and merges them back together. It guarantees O(N log N) performance in all cases.',
              'Quicksort is an unstable, in-place algorithm. It selects a "pivot" element, partitions the array so that elements smaller than the pivot go to the left and larger ones go to the right, then recurses on the partitions.'
            ],
            visual: { type: 'divide-conquer-split' }
          },
          {
            type: 'internal-working',
            text: [
              'Merge Sort requires an auxiliary array of size N to merge elements, making it "out-place". In C++, Quicksort partitions the array using pointers `i` and `j` to swap elements. choosing pivot elements randomly or via the "median-of-three" avoids the O(N²) worst-case on sorted arrays.',
              'Quicksort has excellent cache locality because it accesses contiguous array indices sequentially.'
            ],
            steps: [
              { title: 'Divide Step', description: 'Split array at mid = (left + right) / 2.' },
              { title: 'Merge Step', description: 'Merge two sorted halves using auxiliary memory.' },
              { title: 'Partition Step', description: 'Weave elements around pivot so left <= pivot <= right.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Merge Sort runs in O(N log N) time in all cases, but requires O(N) auxiliary space. Quicksort runs in O(N log N) on average, but can degrade to O(N²) if pivot selection splits the array unevenly (e.g. choosing the first element of an already sorted array).',
              'Quicksort requires only O(log N) recursive call stack space.'
            ],
            operation: 'Merge Sort Memory Allocation',
            time: 'O(N log N)',
            space: 'O(N)',
            reason: 'Requires temp arrays to merge partitioned elements without overwriting.'
          },
          {
            type: 'real-world',
            text: [
              'Merge Sort is preferred for sorting Linked Lists because pointers allow elements to be merged in O(1) space without allocating new arrays.',
              'Quicksort is the default general-purpose sort in most C++ STL runtimes (`std::sort`) due to superior cache performance.'
            ],
            visual: { type: 'stl-sort-details', title: 'C++ std::sort Pipeline' }
          },
          {
            type: 'interview-insight',
            text: [
              'Be prepared to implement the Merge algorithm and Quicksort partition algorithm (Lomuto or Hoare schemes) on a whiteboard.',
              'Explain how Quicksort\'s pivot selection affects its stack recursion depth.'
            ],
            checklist: [
              'Write Lomuto partition scheme cleanly',
              'Implement Merge sort auxiliary arrays merge logic',
              'Contrast stack space constraints of Quick vs Merge Sort'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Pick the best pivot strategy to prevent Quicksort O(n^2) degradation on sorted input.',
            current: 'Options: First Element vs Median-of-Three',
            expected: 'Median-of-Three',
            interactiveDemoType: 'choose-pivot'
          }
        ]
      }
    },
    {
      id: 'stl',
      title: 'Heap Sort & C++ STL Sort',
      icon: '🏔️',
      estimatedTime: '15 min',
      layoutType: 'algorithm-simulation',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Heap Sort is an in-place, unstable sorting algorithm based on a Binary Heap. It builds a Max-Heap from the array, then repeatedly extracts the maximum element and swaps it to the end.',
              'C++ provides highly optimized built-in sorting utilities like `std::sort` (implemented as Introsort, which starts with Quicksort and switches to Heapsort if the recursion depth exceeds a limit) and `std::stable_sort` (implemented using Merge Sort).'
            ],
            visual: { type: 'max-heapify-trace' }
          },
          {
            type: 'internal-working',
            text: [
              'A Binary Heap can be stored efficiently in a contiguous array. For any element at index `i`, its left child is at `2*i + 1`, right child is at `2*i + 2`, and its parent is at `(i-1)/2`.',
              'Heap Sort consists of two phases: 1) Build Max-Heap in O(N) time using heapify bottom-up, 2) Repeatedly swap the root with the last unsorted item and restore the heap property in O(log N) steps.'
            ],
            steps: [
              { title: 'Heapify Down', description: 'Compare node with children. Swap with largest child if node is smaller.' },
              { title: 'Build Max-Heap', description: 'Run heapify down from index N/2 - 1 down to 0.' },
              { title: 'Extract & Sort', description: 'Swap root (max) with last element. Decrease heap size and heapify down.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Heap Sort runs in guaranteed O(N log N) time for all cases, and performs in-place with O(1) space.',
              'However, it suffers from poor cache locality because heap parent-child references jump across large memory gaps (index `i` to `2*i`).'
            ],
            operation: 'Heap Sort (Worst Case)',
            time: 'O(N log N)',
            space: 'O(1)',
            reason: 'Guaranteed log N heapify operations for all N extractions.'
          },
          {
            type: 'real-world',
            text: [
              'Heap Sort is used in real-time systems where guaranteed O(N log N) runtime is mandatory, and extra memory allocations (Merge Sort) or recursion depth risks (Quicksort) cannot be tolerated.',
              'It is also the core algorithm behind priority queues.'
            ],
            visual: { type: 'priority-queue-scheduling', title: 'SJF Process Queue' }
          },
          {
            type: 'interview-insight',
            text: [
              'C++ developers are expected to know the difference between `std::sort` (O(N log N) average, unstable) and `std::stable_sort` (O(N log N) stable, requires extra memory).',
              'Also, understand that `std::priority_queue` in C++ utilizes heap operations (`std::push_heap`, `std::pop_heap`) internally.'
            ],
            checklist: [
              'Compute parent and children indices correctly',
              'Contrast standard sort vs stable sort performance in C++',
              'Explain cache locality issues in heaps'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Find the left child index of an element stored at index 3 in a zero-indexed binary heap array.',
            current: 'Index: 3',
            expected: '7',
            interactiveDemoType: 'compute-heap-index'
          }
        ]
      }
    },
    {
      id: 'cheatsheet',
      title: 'Sorting Cheat Sheet & Code',
      icon: '📜',
      estimatedTime: '20 min',
      layoutType: 'pattern-matching',
      content: {
        prose: [
          'Here is the definitive C++ implementation code and comparison matrix for all key sorting algorithms.',
          'Review these implementations before writing code in interviews.'
        ],
        codeExamples: [
          {
            language: 'cpp',
            title: 'Bubble & Selection Sort (C++)',
            code: `// C++ Implementations
#include <iostream>
#include <vector>
#include <algorithm>

// Optimized Bubble Sort
void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // Early termination
    }
}

// Selection Sort
void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        std::swap(arr[i], arr[minIdx]);
    }
}`,
            explanation: 'Clean implementation of O(N²) comparison sorts with early exit check in bubble sort.'
          },
          {
            language: 'cpp',
            title: 'Insertion & Merge Sort (C++)',
            code: `// Insertion Sort
void insertionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int temp = arr[i];
        int j = i - 1;
        // Shift elements greater than temp to the right
        while (j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
}

// Helper for Merge Sort
void merge(std::vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    std::vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
            explanation: 'Insertion sort shifts elements instead of swapping. Merge sort splits arrays recursively and merges with O(N) temp space.'
          },
          {
            language: 'cpp',
            title: 'Quicksort & Heapsort (C++)',
            code: `// Partition helper for Quicksort (Lomuto Scheme)
int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // Last element as pivot
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Helper for Heapsort
void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = arr.size();
    // Build Max-Heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    // Extract elements
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        heapify(arr, i, 0); // Heapify reduced heap
    }
}`,
            explanation: 'Quicksort partitions in-place. Heapsort runs in O(N log N) using array parent/child indexes.'
          }
        ],
        complexityTable: [
          { operation: 'Bubble Sort', best: 'O(N)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', notes: 'Best case with early-exit flag' },
          { operation: 'Selection Sort', best: 'O(N²)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', notes: 'Minimizes swaps (always N-1)' },
          { operation: 'Insertion Sort', best: 'O(N)', average: 'O(N²)', worst: 'O(N²)', space: 'O(1)', notes: 'O(N) for almost sorted inputs' },
          { operation: 'Merge Sort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)', notes: 'Stable sort, requires auxiliary array' },
          { operation: 'Quicksort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N²)', space: 'O(log N)', notes: 'Pivot dependent, unstable' },
          { operation: 'Heap Sort', best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)', space: 'O(1)', notes: 'In-place, poor cache locality' }
        ]
      }
    },
    {
      id: 'quiz',
      title: 'Sorting Quiz & Practice',
      icon: '✏️',
      estimatedTime: '15 min',
      layoutType: 'interview-prep',
      content: {
        quiz: [
          {
            id: 'q1',
            question: 'Which sorting algorithm guarantees O(N log N) time complexity in the worst case with O(1) auxiliary space?',
            options: [
              { id: 'a', text: 'Merge Sort' },
              { id: 'b', text: 'Quicksort' },
              { id: 'c', text: 'Heap Sort' },
              { id: 'd', text: 'Insertion Sort' }
            ],
            correctId: 'c',
            explanation: 'Heap Sort runs in-place (O(1) space) and guarantees O(N log N) in all cases (unlike Quicksort which can degrade to O(N²), or Merge Sort which requires O(N) space).'
          },
          {
            id: 'q2',
            question: 'What is the primary reason why Quicksort is often faster than Heap Sort in practice on large arrays?',
            options: [
              { id: 'a', text: 'Quicksort has a lower worst-case time complexity' },
              { id: 'b', text: 'Quicksort has superior cache locality' },
              { id: 'c', text: 'Quicksort does not require recursion' },
              { id: 'd', text: 'Heap Sort uses dynamic memory allocation for heap creation' }
            ],
            correctId: 'b',
            explanation: 'Quicksort accesses memory sequentially inside partitions, taking advantage of contiguous CPU cache lines. Heap Sort jumps between indices i and 2*i + 1, causing frequent cache misses.'
          },
          {
            id: 'q3',
            question: 'Why does Selection Sort always take O(N²) time even when the input array is already sorted?',
            options: [
              { id: 'a', text: 'Because it performs N-1 swaps in every case' },
              { id: 'b', text: 'Because it must scan the remaining unsorted subarray completely to verify the minimum' },
              { id: 'c', text: 'Because the recursion tree is deeply skewed' },
              { id: 'd', text: 'Because it shifts elements right sequentially' }
            ],
            correctId: 'b',
            explanation: 'Selection Sort has no early-exit logic; it must perform nested scans to find the minimum value in the unsorted subarray, resulting in (N-1) + (N-2) + ... comparisons in all cases.'
          }
        ],
        practice: [
          {
            title: 'Kth Largest Element in an Array',
            difficulty: 'Medium',
            description: 'Given an unsorted array of integers, return the kth largest element. Do it in O(N) average time complexity.',
            hint: 'Use the Quickselect algorithm, which is based on Quicksort partitioning but only recurses into one partition.',
            approach: 'Choose a pivot. Partition the array. If the pivot index matches N-K, return it. Otherwise, recurse only into the half containing N-K.',
            timeComplexity: 'O(N) average, O(N²) worst',
            spaceComplexity: 'O(1) auxiliary'
          },
          {
            title: 'Merge Sorted Array',
            difficulty: 'Easy',
            description: 'You are given two sorted integer arrays nums1 and nums2, merge them into nums1 as one sorted array in-place.',
            hint: 'Work backwards from the end of the arrays to avoid overwriting elements in nums1.',
            approach: 'Initialize three pointers: one at the end of elements in nums1, one at the end of nums2, and one at the very end of nums1 array block. Compare and place the larger element at the back.',
            timeComplexity: 'O(N + M)',
            spaceComplexity: 'O(1)'
          }
        ]
      }
    }
  ]
};
