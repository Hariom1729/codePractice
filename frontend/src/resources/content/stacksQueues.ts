import type { TopicContent } from './types';

export const stacksQueuesContent: TopicContent = {
  id: 'stacks-queues',
  title: 'Stacks & Queues',
  subtitle: 'Linear Structures with Restricted Access',
  description: 'Master Stacks and Queues. Learn contiguous array and dynamic pointer-based implementations, priority queues, and deque details with high-performance C++ code.',
  totalTime: '5-7 Hours',
  difficulty: 'Beginner',
  prerequisites: ['Arrays', 'Linked Lists'],
  sections: [
    {
      id: 'intro',
      title: 'Introduction to Stacks & Queues',
      icon: '🥞',
      estimatedTime: '8 min',
      layoutType: 'introduction',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Stacks and Queues are linear data structures that restrict access to their elements. Unlike arrays or vectors, which permit reading or writing elements at any index instantly, stacks and queues enforce strict access policies.',
              'A Stack operates on a LIFO (Last-In First-Out) model: elements are added and removed from the exact same end (the "top"). A Queue operates on a FIFO (First-In First-Out) model: elements are added at the back ("rear") and removed from the front ("head").'
            ],
            visual: { type: 'lifo-fifo-comparison' }
          },
          {
            type: 'internal-working',
            text: [
              'Internally, stacks and queues are implemented using either: 1) Contiguous Arrays, which are fast and cache-friendly but have a fixed size or require O(N) resizing, or 2) Linked Lists, which offer O(1) dynamic growth without shifting but incur memory overhead for pointers.',
              'Choosing between array-backed and list-backed implementations is a classic engineering trade-off depending on whether insertion latency spikes can be tolerated.'
            ],
            steps: [
              { title: 'LIFO (Stack)', description: 'Element insertion (push) and removal (pop) happen at the top.' },
              { title: 'FIFO (Queue)', description: 'Insertion (enqueue) happens at the rear; removal (dequeue) happens at the head.' },
              { title: 'Allocation Strategies', description: 'Contiguous arrays minimize cache misses; linked lists avoid resizing overhead.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Because access is restricted to the top of a stack or the ends of a queue, basic operations like push, pop, enqueue, and dequeue do not require scanning or shifting elements.',
              'These operations execute in guaranteed constant O(1) time complexity.'
            ],
            operation: 'Push / Pop / Enqueue / Dequeue',
            time: 'O(1)',
            space: 'O(1)',
            reason: 'Direct element modification at tracking pointers without shifting index ranges.'
          },
          {
            type: 'real-world',
            text: [
              'A stack is exactly like undo history in Microsoft Word: every character you type is pushed onto a stack, and undoing pops the last edit.',
              'A queue is like print jobs sent to an office printer: the first document submitted is printed first.'
            ],
            visual: { type: 'word-undo-print-queue', title: 'Real-world Restricting Pipelines' }
          },
          {
            type: 'interview-insight',
            text: [
              'Interviewers love asking you to implement a Queue using Stacks, or a Stack using Queues. These challenges test your ability to maintain element ordering using limited APIs.',
              'Also, understand that circular queues are preferred for bounded buffers to avoid shifting elements.'
            ],
            checklist: [
              'Contrast LIFO vs FIFO access rules',
              'Understand circular queues index wrap: (rear + 1) % capacity',
              'Identify the optimal backing container (vector vs list) for stacks'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Determine the correct circular index formula to wrap the rear pointer in a queue of size C.',
            current: 'Formula options: (rear + 1) or (rear + 1) % C',
            expected: '(rear + 1) % C',
            interactiveDemoType: 'wrap-index'
          }
        ]
      }
    },
    {
      id: 'theory',
      title: 'Stack & Queue Internals',
      icon: '🧠',
      estimatedTime: '15 min',
      layoutType: 'memory-map',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Let\'s examine the memory layout of an Array-based Stack. An array stack uses a single integer variable `top` initialized to -1. When we push an element, we increment `top` and assign the element to `arr[top]`. Pop simply returns `arr[top]` and decrements `top`.',
              'An Array-based Queue uses two pointer indices: `front` (to dequeue) and `rear` (to enqueue). If we dequeue, the vacant space at index 0 goes to waste. To solve this, circular queues wrap indices around using modulo arithmetic.'
            ],
            visual: { type: 'circular-queue-wrap' }
          },
          {
            type: 'internal-working',
            text: [
              'In C++, standard libraries provide `std::stack` and `std::queue`. These are "container adapters"—they wrap around an underlying container (usually `std::deque` or `std::vector`) and expose a restricted interface.',
              'For instance, `std::stack<int, std::vector<int>>` forces the stack to use a vector as its internal storage container.'
            ],
            steps: [
              { title: 'Circular Wrap', description: 'rear = (rear + 1) % capacity' },
              { title: 'Queue Full Condition', description: '(rear + 1) % capacity == front' },
              { title: 'Queue Empty Condition', description: 'front == -1' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'For static array implementations, operations are guaranteed O(1) time. For dynamic vector-backed stacks, operations are O(1) amortized because resizing vectors takes O(N) copy time occasionally.',
              'A linked list implementation guarantees O(1) worst-case time for all operations since it allocates memory on demand.'
            ],
            operation: 'Linked List Push/Enqueue',
            time: 'O(1)',
            space: 'O(1)',
            reason: 'Pointer allocation and re-weaving runs in constant instructions.'
          },
          {
            type: 'real-world',
            text: [
              'Operating systems use priority queues for process scheduling, allocating CPU time slots to system threads ahead of low-priority user tasks.',
              'Web servers use thread pools backed by concurrent queues to distribute incoming HTTP requests to idle workers.'
            ],
            visual: { type: 'web-server-queue', title: 'HTTP Request Distribution' }
          },
          {
            type: 'interview-insight',
            text: [
              'Know the difference between standard queues and priority queues. Standard queues are FIFO. Priority queues are backed by heaps, so the element with the highest priority is extracted first in O(log N) time.',
              'Understand that C++ std::stack does not support iterators; you cannot traverse a stack directly without popping elements.'
            ],
            checklist: [
              'Describe stack overflow and underflow scenarios',
              'Implement a circular queue in C++ using modulo math',
              'Differentiate priority queue heap performance'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Calculate the next index of rear if rear = 4 and capacity = 5 in a circular queue.',
            current: 'rear = 4, cap = 5',
            expected: '0',
            interactiveDemoType: 'compute-wrap'
          }
        ]
      }
    },
    {
      id: 'cheatsheet',
      title: 'C++ STL Stack & Queue Usage',
      icon: '⚡',
      estimatedTime: '15 min',
      layoutType: 'pattern-matching',
      content: {
        prose: [
          'Here is the complete C++ reference code for both stack and queue container adapters, including custom vector-backed declarations.'
        ],
        codeExamples: [
          {
            language: 'cpp',
            title: 'std::stack General Operations',
            code: `#include <iostream>
#include <stack>
#include <vector>

int main() {
    // Default stack (backed by std::deque)
    std::stack<int> s;

    // Push elements onto the stack
    s.push(10);
    s.push(20);
    s.push(30);

    // Get current size
    std::cout << "Stack size: " << s.size() << std::endl; // Output: 3

    // Access top element without removing
    std::cout << "Top element: " << s.top() << std::endl; // Output: 30

    // Remove element (does not return it!)
    s.pop();
    std::cout << "New top: " << s.top() << std::endl; // Output: 20

    // Check if empty
    if (!s.empty()) {
        std::cout << "Stack has elements" << std::endl;
    }

    // Stack backed specifically by std::vector
    std::stack<int, std::vector<int>> vecStack;
    vecStack.push(100);
    
    return 0;
}`,
            explanation: 'Demonstrates push, pop, top, empty, and vector container adapter injection.'
          },
          {
            language: 'cpp',
            title: 'std::queue & std::priority_queue Operations',
            code: `#include <iostream>
#include <queue>
#include <vector>

int main() {
    // Queue (backed by std::deque by default)
    std::queue<int> q;
    q.push(10); // Enqueue
    q.push(20);
    q.push(30);

    std::cout << "Front: " << q.front() << std::endl; // 10
    std::cout << "Back: " << q.back() << std::endl;   // 30

    q.pop(); // Dequeue
    std::cout << "New front: " << q.front() << std::endl; // 20

    // Max Heap Priority Queue (default)
    std::priority_queue<int> maxPQ;
    maxPQ.push(10);
    maxPQ.push(30);
    maxPQ.push(20);
    std::cout << "Max PQ Top: " << maxPQ.top() << std::endl; // 30 (Largest first)
    maxPQ.pop();

    // Min Heap Priority Queue
    std::priority_queue<int, std::vector<int>, std::greater<int>> minPQ;
    minPQ.push(10);
    minPQ.push(30);
    minPQ.push(20);
    std::cout << "Min PQ Top: " << minPQ.top() << std::endl; // 10 (Smallest first)

    return 0;
}`,
            explanation: 'Usage details for FIFO queue endpoints and min/max heap configuration template arguments in priority queues.'
          }
        ],
        complexityTable: [
          { operation: 'Stack Push', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Guaranteed constant time' },
          { operation: 'Stack Pop', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Removes top reference' },
          { operation: 'Queue Push (Rear)', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Inserts at back index' },
          { operation: 'Queue Pop (Front)', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Dequeues at front index' },
          { operation: 'Priority Queue Push', best: 'O(log N)', average: 'O(log N)', worst: 'O(log N)', space: 'O(1)', notes: 'Requires heapify-up swap checks' }
        ]
      }
    },
    {
      id: 'quiz',
      title: 'Quiz & Practice Problems',
      icon: '✏️',
      estimatedTime: '15 min',
      layoutType: 'interview-prep',
      content: {
        quiz: [
          {
            id: 'q1',
            question: 'What happens to the elements of a queue if you pop all of them and push them onto a stack, then pop all stack elements back into the queue?',
            options: [
              { id: 'a', text: 'The queue remains in its original order' },
              { id: 'b', text: 'The queue is completely reversed' },
              { id: 'c', text: 'The queue elements are sorted' },
              { id: 'd', text: 'The elements become corrupted' }
            ],
            correctId: 'b',
            explanation: 'Popping from queue (FIFO) and pushing to stack reverses the sequence. Popping from stack (LIFO) back into queue preserves this reversed order.'
          },
          {
            id: 'q2',
            question: 'Which underlying C++ STL container is NOT suitable to adapt into std::stack?',
            options: [
              { id: 'a', text: 'std::vector' },
              { id: 'b', text: 'std::list' },
              { id: 'c', text: 'std::deque' },
              { id: 'd', text: 'std::forward_list' }
            ],
            correctId: 'd',
            explanation: 'std::stack requires pop_back() or pop_front() operations. std::forward_list is a singly linked list and does not support efficient back modification, making it unusable.'
          }
        ],
        practice: [
          {
            title: 'Valid Parentheses',
            difficulty: 'Easy',
            description: 'Given a string containing just characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
            hint: 'Use a stack. If you encounter an open bracket, push it. If close, match with top and pop.',
            approach: 'Iterate characters. Push open brackets. For closed brackets, return false if stack is empty or mismatch, otherwise pop. Return true if stack is empty at end.',
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(N)'
          },
          {
            title: 'Implement Queue using Stacks',
            difficulty: 'Easy',
            description: 'Implement a first-in first-out (FIFO) queue using only two stacks.',
            hint: 'Use one stack for enqueue (push) and another stack for dequeue (pop). Transfer elements from push to pop stack when pop stack is empty.',
            approach: 'Push items to stack1. For peek or pop, if stack2 is empty, pop all elements from stack1 and push to stack2. Pop from stack2.',
            timeComplexity: 'O(1) amortized',
            spaceComplexity: 'O(N)'
          }
        ]
      }
    }
  ]
};
