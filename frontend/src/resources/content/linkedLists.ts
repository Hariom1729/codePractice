import type { TopicContent } from './types';

export const linkedListsContent: TopicContent = {
  id: 'linked-lists',
  title: 'Linked Lists',
  subtitle: 'Visual, Handcrafted & Deep',
  description: 'Master Linked Lists through dynamic, section-specific visual layouts tailored to the nature of each topic.',
  totalTime: '6-8 Hours',
  difficulty: 'Beginner',
  prerequisites: ['Basic Programming', 'Variables & Loops'],
  sections: [
    {
      id: 'intro',
      title: 'What is a Linked List',
      icon: '🔗',
      estimatedTime: '8 min',
      layoutType: 'introduction',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Imagine you want to store a list of names. With an array, you must ask the computer for a single, continuous block of memory that can fit all names side-by-side. If the memory is fragmented, the computer will fail to find a large enough continuous block, even if there is plenty of total free space scattered around.',
              'A Linked List solves this problem entirely. Instead of demanding a single contiguous block, it allows you to store elements anywhere in memory. Each element (called a "Node") holds the actual data and a "Pointer" (an address card) that tells the computer where to find the next element in the list.',
              'This creates a dynamic chain. You do not need to know the size of the list in advance. You can grow it indefinitely as long as there is free space anywhere in the computer\'s RAM, making it incredibly flexible.'
            ],
            visual: { type: 'array-vs-linked' }
          },
          {
            type: 'internal-working',
            text: [
              'Internally, a linked list is represented solely by a reference to the first node, which we call the "Head". If you lose the address of the Head, you lose access to the entire list because you no longer know where the chain starts.',
              'To find any element, you start at the Head and follow the pointer addresses. Each node contains a value (like an integer or string) and a "next" reference. The very last node in the chain points to a special null value, which signals to the computer that the list has ended.'
            ],
            steps: [
              { title: 'Head Pointer', description: 'Points to the very first node in the list. This is the entry point.' },
              { title: 'Node Data', description: 'Stores the actual value of the element (e.g., a username or database ID).' },
              { title: 'Next Reference', description: 'Points to the memory address of the next node.' },
              { title: 'Null Terminator', description: 'Specifies that the chain has ended and no further nodes exist.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Unlike arrays, where inserting at the beginning forces you to shift all other elements over to make room (taking O(N) time), linked list insertions at the head are incredibly fast. We simply create a new node and point its "next" pointer to the old head.',
              'This operation does not care how many elements are currently in the list. Whether there are 5 elements or 5 million elements, prepending takes exactly the same amount of time. It is a true constant-time operation.'
            ],
            operation: 'Prepend (Insert Head)',
            time: 'O(1)',
            space: 'O(1)',
            reason: 'Updating the head pointer takes constant time without shifting any elements.'
          },
          {
            type: 'real-world',
            text: [
              'Think of browser navigation. Each page you visit is a node. The back and forward buttons simply traverse the next and previous pointers in the chain.',
              'Another great analogy is a Spotify music queue. Each song in your queue points to the next song. When you insert a new song in the middle, Spotify does not re-arrange the memory of the entire playlist; it just rewires the pointer from the current song to the new song.'
            ],
            visual: { type: 'browser', title: 'Browser Page History Flow' }
          },
          {
            type: 'interview-insight',
            text: [
              'Interviewers love linked lists because they test your pointer logic. It is easy to make mistakes like creating circular loops or losing references to nodes, causing memory leaks.',
              'In interviews, you will often be asked to reverse a list, detect cycles, or merge sorted lists. Mastering pointer assignments is key to clearing these technical screens.'
            ],
            checklist: [
              'Understand node references clearly',
              'Master the Floyd Cycle Detection',
              'Understand iterative vs recursive reversal'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Reconnect the Head pointer to point to the new Node [15] instead of [10].',
            current: 'Head -> [10] -> [20]',
            expected: 'Head -> [15] -> [10] -> [20]',
            interactiveDemoType: 'reconnect-head'
          }
        ]
      }
    },
    {
      id: 'node-structure',
      title: 'Node Visualizer',
      icon: '🧱',
      estimatedTime: '10 min',
      layoutType: 'operation-visualizer',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'The fundamental building block of a linked list is the "Node". A node is a simple object containing two variables: the value you want to store (data) and a link to the next node (next).',
              'In memory, a node takes up a small block of space. The data field holds the value, while the pointer field holds the exact hex memory address of the next node. If there is no next node, the pointer field is set to null.'
            ],
            visual: { type: 'node-anatomy' }
          },
          {
            type: 'internal-working',
            text: [
              'When you define a Node in code, you write a class. The constructor accepts a value and initializes the `next` pointer to null.',
              'In low-level languages like C++, a node is a struct containing a data variable and a pointer of type Node*. In garbage-collected languages like JavaScript, the next pointer is simply a reference to another Node object.'
            ],
            steps: [
              { title: 'Data Field', description: 'Holds your integer, string, or object.' },
              { title: 'Pointer Field', description: 'Holds a hexadecimal memory reference to the next node.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Accessing or updating the data inside a single node is direct and takes constant time, as we have a direct reference to it.',
              'However, finding the node in the first place requires traversal, which takes linear time.'
            ],
            operation: 'Update Node Value',
            time: 'O(1)',
            space: 'O(1)',
            reason: 'Direct field modification.'
          },
          {
            type: 'real-world',
            text: [
              'A train car is a great analogy. Each car holds cargo (data) and is physically hooked (pointer) to the car behind it.',
              'Without the couplers (pointers), the train falls apart and becomes isolated carriages scattered on the track.'
            ],
            visual: { type: 'train', title: 'Train Coupling' }
          },
          {
            type: 'interview-insight',
            text: [
              'Interviewers will ask you to write a Node class from scratch in C++, Java, or JS. Be prepared to define the constructors correctly.',
              'Make sure you understand the difference between value types (like integers) and reference types (like pointers).'
            ],
            checklist: [
              'Initialize next to null in the constructor',
              'Be ready to explain pointer size vs data size in C++'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Change the next pointer of Node [30] to point to Node [40].',
            current: '[30] -> Null, [40] -> Null',
            expected: '[30] -> [40] -> Null',
            interactiveDemoType: 'link-nodes'
          }
        ]
      }
    },
    {
      id: 'memory',
      title: 'Memory Visualization',
      icon: '🧠',
      estimatedTime: '8 min',
      layoutType: 'memory-map',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Unlike arrays, which demand a single continuous block of memory, linked lists allow nodes to be scattered randomly throughout the heap.',
              'Each node is allocated individually. It does not matter if Node A is at address 1000 and Node B is at address 9000; as long as Node A holds the address 9000, the chain remains intact.'
            ],
            visual: { type: 'memory-scatter' }
          },
          {
            type: 'internal-working',
            text: [
              'When a new node is created, the Operating System allocates a free memory block from the heap. The previous node stores this new block\'s address in its next pointer.',
              'This scatter-allocation avoids the need for contiguous blocks, meaning we never have to resize or copy the entire structure when it grows.'
            ],
            steps: [
              { title: 'Array Contiguous', description: 'Address 1000, 1004, 1008...' },
              { title: 'Linked List Scattered', description: 'Address 1000 -> 2500 -> 8900...' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Because nodes are scattered, we lose O(1) random access. To find the Nth element, we must traverse the list node-by-node.',
              'This is a major trade-off compared to arrays, which can locate any element instantly using offset arithmetic.'
            ],
            operation: 'Random Access',
            time: 'O(n)',
            space: 'O(1)',
            reason: 'Must follow pointers sequentially from Head.'
          },
          {
            type: 'real-world',
            text: [
              'Think of a scavenger hunt. Each clue you find is at a different location (heap address) and points you to the next clue\'s address.',
              'You cannot jump to the final clue without following the chain of addresses from the start.'
            ],
            visual: { type: 'scavenger-hunt', title: 'Scavenger Hunt Address Mapping' }
          },
          {
            type: 'interview-insight',
            text: [
              'Interviewers often ask how arrays and linked lists interact with the CPU cache. Arrays are cache-friendly due to contiguous layouts; linked lists suffer from frequent cache misses.',
              'Cache misses occur because fetching scattered addresses forces the CPU to query main memory instead of relying on its super-fast cache line.'
            ],
            checklist: [
              'Explain temporal and spatial locality',
              'Explain heap allocation overhead in low-level languages'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Follow the memory pointers from Head (Address 1000) to find the node containing 30.',
            current: '1000 (Val 10) -> 2500 (Val 20) -> 8900 (Val 30)',
            expected: 'Traversed 1000 -> 2500 -> 8900',
            interactiveDemoType: 'follow-pointers'
          }
        ]
      }
    },
    {
      id: 'traversal',
      title: 'Traversal Animation',
      icon: '🏃',
      estimatedTime: '10 min',
      layoutType: 'operation-visualizer',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Traversal is the process of visiting every node in the linked list sequentially, starting from the Head and moving pointer-by-pointer until we hit null.',
              'We use a temporary pointer variable, often called `curr`, to keep track of our position. We update `curr = curr.next` in a loop to advance through the list.'
            ],
            visual: { type: 'traversal' }
          },
          {
            type: 'internal-working',
            text: [
              'The loop starts by checking if `curr` is null. If it isn\'t, we execute our logic on the current node, then assign `curr = curr.next`.',
              'This assignment updates `curr` with the memory address of the next node. Once `curr` becomes null, the loop terminates.'
            ],
            steps: [
              { title: 'curr = Head', description: 'Pointer points to first node.' },
              { title: 'curr = curr.next', description: 'Advance to next address.' },
              { title: 'curr == null', description: 'Loop exits when list ends.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'To visit every node in a list of size N, we must execute the loop exactly N times, requiring linear time complexity.',
              'This is the basic foundation of all search and print operations in linked lists.'
            ],
            operation: 'Traversal & Search',
            time: 'O(n)',
            space: 'O(1)',
            reason: 'Requires visiting all N nodes.'
          },
          {
            type: 'real-world',
            text: [
              'Like reading a physical book page-by-page. You cannot jump directly to page 5 without flipping through pages 1 to 4 first.',
              'Each page must be read to discover where the story goes next.'
            ],
            visual: { type: 'book-reading', title: 'Page Traversal' }
          },
          {
            type: 'interview-insight',
            text: [
              'Always check if the list is empty (`head == null`) before traversal. Forgetting this edge case is the leading cause of NullPointerException in interviews.',
              'Also, make sure you don\'t modify the original `head` pointer during traversal, otherwise you lose the entry point to the list.'
            ],
            checklist: [
              'Write defensive checks for empty lists',
              'Keep the original Head intact; always use a temp variable'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Run the traversal step-by-step to count all nodes in the list.',
            current: '10 -> 20 -> 30 -> 40 -> Null',
            expected: 'Count: 4',
            interactiveDemoType: 'traverse-counter'
          }
        ]
      }
    },
    {
      id: 'insertion',
      title: 'Insertion Visualizer',
      icon: '➕',
      estimatedTime: '15 min',
      layoutType: 'operation-visualizer',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Insertion inserts a new node at a given position. We only update two pointers to splice the node into the chain. No shifting is required.',
              'Whether we insert at the beginning, middle, or end, the core logic remains the same: we update pointers to weave the new node into the list.'
            ],
            visual: { type: 'insertion' }
          },
          {
            type: 'internal-working',
            text: [
              'To insert after a node, create the new node, point the new node\'s next to target.next, and update target.next to point to the new node.',
              'Updating these pointers in the wrong order will break the list, causing us to lose references to all subsequent nodes.'
            ],
            steps: [
              { title: 'Create Node', description: 'Instantiate Node [25].' },
              { title: 'Link to Next', description: 'New Node points to target\'s next.' },
              { title: 'Rewire Target', description: 'Target node points to New Node.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'If we already have a pointer to the insertion position, updating the pointers takes constant time.',
              'However, if we must search for the position first, the search takes linear time.'
            ],
            operation: 'Insertion (Reference Given)',
            time: 'O(1)',
            space: 'O(1)',
            reason: 'Two pointer re-assignments.'
          },
          {
            type: 'real-world',
            text: [
              'A Spotify playlist. You can insert a new song in the middle without moving other songs, just by updating the next song references.',
              'This is much faster than inserting into an array, which requires copying and shifting elements.'
            ],
            visual: { type: 'spotify', title: 'Weaving Playlist Nodes' }
          },
          {
            type: 'interview-insight',
            text: [
              'Always update pointers in the correct order! If you set target.next = new_node first, you lose the reference to the rest of the list.',
              'Draw a diagram if you get confused during an interview; pointer visualization helps prevent bugs.'
            ],
            checklist: [
              'Set new_node.next first',
              'Then update the predecessor\'s next'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Insert node [25] between [20] and [30].',
            current: '20 -> 30, [25]',
            expected: '20 -> 25 -> 30',
            interactiveDemoType: 'insert-between'
          }
        ]
      }
    },
    {
      id: 'deletion',
      title: 'Deletion Visualizer',
      icon: '🗑️',
      estimatedTime: '15 min',
      layoutType: 'operation-visualizer',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Deletion removes a node from the list by updating pointers to bypass it. The bypassed node is then garbage-collected or manually freed.',
              'To delete a node, we connect its predecessor directly to its successor, bypassing the target node completely.'
            ],
            visual: { type: 'deletion' }
          },
          {
            type: 'internal-working',
            text: [
              'To delete a target node, point its predecessor\'s next pointer directly to the target\'s next node, bypassing the target entirely.',
              'Once the reference is removed, the bypassed node\'s memory is reclaimed.'
            ],
            steps: [
              { title: 'Locate Predecessor', description: 'Find the node right before the target.' },
              { title: 'Bypass Target', description: 'Set predecessor.next = target.next' },
              { title: 'Free Memory', description: 'The bypassed target node is collected.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'If we have a reference to the predecessor, bypassing the target node is a direct pointer update.',
              'If we must search for the target node first, the deletion takes O(N) time.'
            ],
            operation: 'Deletion (Reference Given)',
            time: 'O(1)',
            space: 'O(1)',
            reason: 'Requires only one pointer change.'
          },
          {
            type: 'real-world',
            text: [
              'Removing a link from a metal chain. You unhook the link and connect the two neighboring links directly together.',
              'The unhooked link is removed from the active chain.'
            ],
            visual: { type: 'chain-unhook', title: 'Chain Bypass' }
          },
          {
            type: 'interview-insight',
            text: [
              'Edge cases are critical! Always handle deleting the head node (updates Head to Head.next) and deleting the tail node.',
              'In C++, remember to delete the bypassed node using `delete` or `free` to prevent memory leaks.'
            ],
            checklist: [
              'Check if the target node is null or Head',
              'Properly free memory in C++ to avoid memory leaks'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Delete Node [20] from the list.',
            current: '10 -> 20 -> 30',
            expected: '10 -> 30',
            interactiveDemoType: 'delete-node'
          }
        ]
      }
    },
    {
      id: 'search-visualizer',
      title: 'Search Visualizer',
      icon: '🔍',
      estimatedTime: '10 min',
      layoutType: 'operation-visualizer',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Searching a linked list means visiting nodes sequentially from Head, comparing each node\'s data to our query until we find a match.',
              'Because nodes are not indexed, we cannot perform a binary search. We are forced to use linear search.'
            ],
            visual: { type: 'search' }
          },
          {
            type: 'internal-working',
            text: [
              'Initialize a pointer to Head. Loop while the pointer is not null, checking if data matches. If yes, return true. Else, advance to the next node.',
              'If the loop finishes and the pointer becomes null, the target value is not present in the list.'
            ],
            steps: [
              { title: 'Check Head', description: 'Does Head match target value?' },
              { title: 'Advance Pointer', description: 'Advance node-by-node.' },
              { title: 'Return Match', description: 'Return true when found, or false if null.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Because we cannot jump directly to an index, searching always requires scanning the list from the beginning.',
              'The worst-case scenario requires visiting all N nodes.'
            ],
            operation: 'Linear Search',
            time: 'O(n)',
            space: 'O(1)',
            reason: 'Requires traversing up to N nodes.'
          },
          {
            type: 'real-world',
            text: [
              'Finding a specific train carriage on a platform by walking from the locomotive all the way to the back carriage-by-carriage.',
              'Each carriage must be checked in sequence.'
            ],
            visual: { type: 'train-search', title: 'Train Search' }
          },
          {
            type: 'interview-insight',
            text: [
              'Searching can be optimized in circular lists or using hash index tables, but the raw traversal search remains O(n).',
              'Be prepared to talk about memory caching and why array binary search is so much faster in real systems.'
            ],
            checklist: [
              'Verify match conditions properly',
              'Handle case where item is not present'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Search for value 30 and output the number of pointer jumps needed.',
            current: '10 -> 20 -> 30 -> 40',
            expected: 'Jumps: 2',
            interactiveDemoType: 'search-jumps'
          }
        ]
      }
    },
    {
      id: 'singly-linked',
      title: 'Singly Linked List',
      icon: '➡️',
      estimatedTime: '10 min',
      layoutType: 'introduction',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'A Singly Linked List is the simplest form. Every node has exactly one pointer, which points to the next node. You can only move forward.',
              'This layout minimizes the memory footprint of each node, making it highly memory-efficient compared to other list types.'
            ],
            visual: { type: 'singly-list' }
          },
          {
            type: 'internal-working',
            text: [
              'Each node structure holds: 1) data, and 2) the next pointer. Traversal goes only in one direction. There is no backward pointer.',
              'When reversing, we must keep track of previous nodes explicitly since we cannot back-reference.'
            ],
            steps: [
              { title: 'Forward Only', description: 'No prev reference exists.' },
              { title: 'Tail to Null', description: 'End of list terminates in null.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Accessing the predecessor of a node takes linear time because we must walk from the Head.',
              'This is one of the main limitations of singly linked lists.'
            ],
            operation: 'Find Predecessor',
            time: 'O(n)',
            space: 'O(1)',
            reason: 'Must walk from Head to find the parent node.'
          },
          {
            type: 'real-world',
            text: [
              'A simple slide presentation. You can advance to the next slide easily, but there\'s no direct reference to go backwards without a stack.',
              'It\'s a strictly unidirectional sequence.'
            ],
            visual: { type: 'slideshow', title: 'One-Way Slides' }
          },
          {
            type: 'interview-insight',
            text: [
              'Singly Linked Lists are highly favored in interviews for simple reversal, cycle detection, and merging problems.',
              'Ensure you are comfortable managing pointer re-assignments without causing cycles.'
            ],
            checklist: [
              'Master basic pointer manipulation',
              'Understand SLL limitations compared to DLL'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Complete the Singly Linked List chain to point to Null.',
            current: '10 -> 20 -> 30',
            expected: '10 -> 20 -> 30 -> Null',
            interactiveDemoType: 'null-terminate'
          }
        ]
      }
    },
    {
      id: 'doubly-linked',
      title: 'Doubly Linked List',
      icon: '↔️',
      estimatedTime: '12 min',
      layoutType: 'introduction',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'A Doubly Linked List adds a prev pointer to each node, pointing to the predecessor. This allows full bidirectional traversal.',
              'This prev pointer makes deletions and backward navigations O(1), but at the cost of additional memory per node.'
            ],
            visual: { type: 'doubly-list' }
          },
          {
            type: 'internal-working',
            text: [
              'Each node holds three elements: 1) data, 2) next pointer, and 3) prev pointer. Head.prev points to null, and Tail.next points to null.',
              'When inserting or deleting nodes, we must update twice as many pointer references.'
            ],
            steps: [
              { title: 'Bidirectional Links', description: 'Prev and Next pointers on every node.' },
              { title: 'Head & Tail prev/next', description: 'Both ends point to null.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'We can delete any given node in O(1) time without traversing, because the node itself knows its predecessor.',
              'This is a major optimization over Singly Linked Lists.'
            ],
            operation: 'Delete Given Node',
            time: 'O(1)',
            space: 'O(1)',
            reason: 'node.prev and node.next can be linked directly.'
          },
          {
            type: 'real-world',
            text: [
              'Undo and Redo stacks. Each state points back to the previous edit (Undo) and forward to the next edit (Redo).',
              'Browser tab history behaves exactly like a Doubly Linked List.'
            ],
            visual: { type: 'undo-redo', title: 'State History' }
          },
          {
            type: 'interview-insight',
            text: [
              'When modifying DLL pointers, you must update FOUR references instead of two. Forgetting to link the prev pointer is a very common bug.',
              'Practice node insertions on a whiteboard so you don\'t miss any pointers.'
            ],
            checklist: [
              'Verify next.prev link is updated',
              'Verify prev.next link is updated'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Link Node [20]\'s prev pointer back to Node [10].',
            current: '10 -> 20, but 20.prev is Null',
            expected: '10 <-> 20',
            interactiveDemoType: 'link-prev'
          }
        ]
      }
    },
    {
      id: 'circular-linked',
      title: 'Circular Linked List',
      icon: '🔄',
      estimatedTime: '10 min',
      layoutType: 'introduction',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'In a Circular Linked List, the tail node\'s next pointer connects back to the head node instead of null, forming a closed loop.',
              'This circular structure is ideal for applications that require repeating traversals over a collection of items.'
            ],
            visual: { type: 'circular-list' }
          },
          {
            type: 'internal-working',
            text: [
              'Since there is no null, traditional while loops will run forever. We must stop when our pointer traverses back to the Head.',
              'This means tracking the head reference and exiting the loop once our traversal pointer returns to it.'
            ],
            steps: [
              { title: 'Tail points to Head', description: 'tail.next = head' },
              { title: 'Do-While Traversal', description: 'Visit node, then check if curr == head.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Traversing the entire circular list takes linear time, similar to standard linear linked lists.',
              'There is no change in asymptotic complexity.'
            ],
            operation: 'Circular Traversal',
            time: 'O(n)',
            space: 'O(1)',
            reason: 'Requires traversing all N elements back to the start.'
          },
          {
            type: 'real-world',
            text: [
              'A circular buffer or round-robin process scheduler in operating systems, where every process gets a small slot of CPU time in a repeating loop.',
              'Multiplayer board games also cycle through players in a circular sequence.'
            ],
            visual: { type: 'scheduler', title: 'Round Robin Schedule' }
          },
          {
            type: 'interview-insight',
            text: [
              'Circular lists are prime targets for cycle detection questions. Be prepared to explain how to break the cycle by setting tail.next = null.',
              'Make sure you understand the difference between intentional circular lists and loop pointer bugs.'
            ],
            checklist: [
              'Use a tracker to detect if head is visited twice',
              'Understand the difference between circular and cycle-infected lists'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Point the tail node [30]\'s next pointer back to Head [10] to create a circular list.',
            current: '10 -> 20 -> 30 -> Null',
            expected: '10 -> 20 -> 30 -> 10',
            interactiveDemoType: 'make-circular'
          }
        ]
      }
    },
    {
      id: 'reversal',
      title: 'Reverse Linked List',
      icon: '🔀',
      estimatedTime: '15 min',
      layoutType: 'algorithm-simulation',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Reversing a list changes the direction of all pointer links. The original Head becomes the Tail pointing to null, and the original Tail becomes the new Head.',
              'This is the classic pointer challenge. We must reverse the arrows without losing access to the rest of the list.'
            ],
            visual: { type: 'reversal' }
          },
          {
            type: 'internal-working',
            text: [
              'We use three pointers: prev (null), curr (head), and next (null). In each step, we save next, flip the curr link to prev, and advance both.',
              'This three-pointer technique is highly efficient and executes in a single pass.'
            ],
            steps: [
              { title: 'Save Next', description: 'next = curr.next' },
              { title: 'Reverse Link', description: 'curr.next = prev' },
              { title: 'Advance', description: 'prev = curr; curr = next' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'We visit each node exactly once and update its next pointer in O(1) operations, resulting in a linear runtime.',
              'We reuse existing allocations, achieving constant space.'
            ],
            operation: 'Iterative Reversal',
            time: 'O(n)',
            space: 'O(1)',
            reason: 'Only three pointer tracking variables are allocated.'
          },
          {
            type: 'real-world',
            text: [
              'Undoing a chain of events. Flipping a dynamic list backwards to traverse records from the newest entry to the oldest.',
              'Reverse history state traversals behave like this.'
            ],
            visual: { type: 'undo-chain', title: 'Reverse Stack' }
          },
          {
            type: 'interview-insight',
            text: [
              'Reversing a list is one of the most common core questions. Be absolutely confident writing the three-pointer loop.',
              'Be ready to explain the O(N) space complexity of the recursive approach due to call stack frames.'
            ],
            checklist: [
              'Master the iterative approach first',
              'Understand recursive stack usage (O(n) space)'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Flipping pointers: Set curr.next to point to prev.',
            current: 'prev <- 10, curr -> 20',
            expected: '10 <- 20',
            interactiveDemoType: 'reverse-step'
          }
        ]
      }
    },
    {
      id: 'two-pointers',
      title: 'Fast & Slow Pointer',
      icon: '🐇',
      estimatedTime: '15 min',
      layoutType: 'algorithm-simulation',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'The Fast & Slow pointer pattern uses two pointers moving at different speeds. The fast pointer moves two nodes per step, while the slow pointer moves one.',
              'This difference in speed is a very powerful technique for solving cycle detection and midpoint discovery.'
            ],
            visual: { type: 'fast-slow-pointers' }
          },
          {
            type: 'internal-working',
            text: [
              'When the fast pointer reaches the end of the list (null), the slow pointer will be positioned exactly at the middle node.',
              'This allows us to find the middle node without executing a count traversal first.'
            ],
            steps: [
              { title: 'Slow Pointer', description: 'slow = slow.next' },
              { title: 'Fast Pointer', description: 'fast = fast.next.next' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Because the fast pointer travels twice as fast, traversal finishes in half the time, but remains linear complexity.',
              'It is a highly optimized single-pass algorithm.'
            ],
            operation: 'Find Middle Node',
            time: 'O(n)',
            space: 'O(1)',
            reason: 'Traverses the list in a single pass using constant auxiliary space.'
          },
          {
            type: 'real-world',
            text: [
              'Two runners on a track. One runs twice as fast. When the fast runner crosses the finish line, the slow runner is at the halfway mark.',
              'This illustrates the mathematical ratio of their progress.'
            ],
            visual: { type: 'runners', title: 'Race track division' }
          },
          {
            type: 'interview-insight',
            text: [
              'This is the standard approach to find the middle of a list without measuring or tracking count variables. Very clean.',
              'Be careful with null checks for both `fast.next` and `fast.next.next` to avoid crash exceptions.'
            ],
            checklist: [
              'Check fast.next and fast.next.next for null',
              'Works for both odd and even list lengths'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Move both pointers. Slow by 1 step, Fast by 2 steps.',
            current: 'Slow: [10], Fast: [10]',
            expected: 'Slow: [20], Fast: [30]',
            interactiveDemoType: 'move-runners'
          }
        ]
      }
    },
    {
      id: 'cycle-detection',
      title: 'Cycle Detection',
      icon: '🌪️',
      estimatedTime: '15 min',
      layoutType: 'algorithm-simulation',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Cycle detection determines if a list contains a loop. If a loop exists, traversals will loop infinitely. Floyd\'s algorithm detects loops using fast/slow pointers.',
              'The slow and fast pointers start at the head node. If a cycle exists, they will eventually meet.'
            ],
            visual: { type: 'cycle-detection' }
          },
          {
            type: 'internal-working',
            text: [
              'Run fast and slow pointers. If they ever collide (point to the same node), a loop exists. If fast reaches null, no loop exists.',
              'The collision occurs because the fast pointer relative speed is 1 step per cycle compared to the slow pointer, meaning it will eventually catch up.'
            ],
            steps: [
              { title: 'Start', description: 'Both pointers at Head.' },
              { title: 'Loop', description: 'Slow moves 1 step, Fast moves 2 steps.' },
              { title: 'Collision', description: 'If slow == fast, cycle detected!' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'If there is a cycle, the fast pointer will meet the slow pointer in at most N steps inside the loop.',
              'This is much more space-efficient than storing visited nodes in a hash-set.'
            ],
            operation: 'Cycle Detection (Floyd\'s)',
            time: 'O(n)',
            space: 'O(1)',
            reason: 'No additional memory is allocated, unlike hash-set methods.'
          },
          {
            type: 'real-world',
            text: [
              'Two race cars on a circular track. The faster car will eventually lap the slower car and meet it on the track.',
              'They collide because of the loop geometry.'
            ],
            visual: { type: 'race-lap', title: 'Lapping collision' }
          },
          {
            type: 'interview-insight',
            text: [
              'Also be prepared to find the starting node of the cycle. Reset slow to head, move both at 1x speed, and they will meet at the cycle start.',
              'Interviewers often ask you to prove why the collision is mathematically guaranteed.'
            ],
            checklist: [
              'Explain the mathematical proof of collision',
              'Identify loop start using mathematical equivalence'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Run pointers to see if they collide.',
            current: 'Loop contains [30] -> [40] -> [20]',
            expected: 'Pointers meet at [40]',
            interactiveDemoType: 'detect-collision'
          }
        ]
      }
    },
    {
      id: 'merge-lists',
      title: 'Merge Two Lists',
      icon: '🧬',
      estimatedTime: '12 min',
      layoutType: 'algorithm-simulation',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Merging two sorted linked lists joins them into a single sorted list. We compare node values and update pointers to weave the lists.',
              'We build the merged list in-place, reusing the existing nodes from both input lists.'
            ],
            visual: { type: 'merge-lists' }
          },
          {
            type: 'internal-working',
            text: [
              'Create a dummy node. Compare list1 and list2 heads, point dummy.next to the smaller node, and advance that list\'s pointer.',
              'We repeat this comparison step until one of the lists runs out of nodes.'
            ],
            steps: [
              { title: 'Compare Heads', description: 'Compare L1.val and L2.val.' },
              { title: 'Link Smaller', description: 'Point current node to smaller value.' },
              { title: 'Advance Pointer', description: 'Move forward in list containing smaller node.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'We examine each node in both lists exactly once to place it in the merged output list.',
              'No new nodes are cloned, keeping memory consumption constant.'
            ],
            operation: 'Merge Sorted Lists',
            time: 'O(n + m)',
            space: 'O(1)',
            reason: 'We reuse existing node allocations, only updating their pointers.'
          },
          {
            type: 'real-world',
            text: [
              'Zipping a jacket. The teeth from both sides weave together in sorted order into a single track.',
              'Each side is aligned sequentially.'
            ],
            visual: { type: 'zipper', title: 'Weaving Tracks' }
          },
          {
            type: 'interview-insight',
            text: [
              'Using a dummy node simplifies edge cases like deciding the initial Head node of the merged list. Always use this pattern.',
              'Remember to connect the remainder of the non-empty list directly to the tail of your merged list.'
            ],
            checklist: [
              'Use a dummy start node',
              'Handle remaining elements when one list runs empty'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Weave the smaller node next.',
            current: 'L1: 10 -> 30, L2: 15 -> 25',
            expected: '10 -> 15 -> 25 -> 30',
            interactiveDemoType: 'weave-merge'
          }
        ]
      }
    },
    {
      id: 'interview-patterns',
      title: 'Interview Pattern Visualizer',
      icon: '🧩',
      estimatedTime: '15 min',
      layoutType: 'pattern-matching',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'Interview patterns represent recurring subroutines. Recognizing these patterns instantly unlocks 90% of linked list problems.',
              'Mastering patterns helps you solve complex, multi-part whiteboard questions easily.'
            ],
            visual: { type: 'patterns' }
          },
          {
            type: 'internal-working',
            text: [
              'Most problems reduce to: cycle detection, reversal, or finding the middle. Combining these three patterns solves complex issues.',
              'For instance, checking if a list is a palindrome relies on midpoint discovery and pointer reversal.'
            ],
            steps: [
              { title: 'Find Midpoint', description: 'Fast/Slow pointer walk.' },
              { title: 'Reverse Half', description: 'Iterative flip.' },
              { title: 'Compare', description: 'Palindrome verify.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Combining these patterns preserves O(n) runtime and O(1) space, satisfying optimal requirements in FAANG interviews.',
              'It avoids copying list nodes.'
            ],
            operation: 'Optimal Combined Patterns',
            time: 'O(n)',
            space: 'O(1)',
            reason: 'Re-uses node links directly without cloning.'
          },
          {
            type: 'real-world',
            text: [
              'Like combining standard tools (hammer, screwdriver, saw) to build custom furniture.',
              'Each pattern acts as a helper tool.'
            ],
            visual: { type: 'toolset', title: 'Toolbox' }
          },
          {
            type: 'interview-insight',
            text: [
              'Be prepared to combine multiple patterns. Palindrome Linked List is the ultimate test of finding middle, reversing, and comparing.',
              'Master the core algorithms so you can compose them dynamically during the live interview.'
            ],
            checklist: [
              'Master standard patterns like subroutines',
              'Learn to identify intersections and copy operations'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Pick the right pattern for finding a cycle start node.',
            current: 'Options: Slow/Fast pointers vs Reversal',
            expected: 'Slow/Fast pointers',
            interactiveDemoType: 'pick-pattern'
          }
        ]
      }
    },
    {
      id: 'realworld',
      title: 'Real World Applications',
      icon: '🌍',
      estimatedTime: '8 min',
      layoutType: 'introduction',
      content: {
        blocks: [
          {
            type: 'concept',
            text: [
              'In production systems, linked lists are used where rapid insertion and deletion are prioritized over random access.',
              'They form the backbones of memory managers and file system clusters.'
            ],
            visual: { type: 'real-world-map' }
          },
          {
            type: 'internal-working',
            text: [
              'Databases use free lists to track deleted blocks, music applications build playlists, and memory allocators track free heap blocks.',
              'This layout allows allocation states to be updated dynamically without array resizing overhead.'
            ],
            steps: [
              { title: 'Spotify Playlist', description: 'Circular DLL loops songs.' },
              { title: 'Undo / Redo', description: 'SLL tracks state steps.' }
            ]
          },
          {
            type: 'complexity',
            text: [
              'Using linked lists here keeps insertion and deletion operations running in guaranteed constant time.',
              'This is highly predictable and ideal for real-time systems.'
            ],
            operation: 'Insert/Delete in Free Lists',
            time: 'O(1)',
            space: 'O(1)',
            reason: 'No memory shifting required.'
          },
          {
            type: 'real-world',
            text: [
              'A train station dispatcher swapping train carriages in and out of active tracks without affecting cars further down the line.',
              'Swapping carriages is a simple link modification.'
            ],
            visual: { type: 'station', title: 'Train Carriage Swap' }
          },
          {
            type: 'interview-insight',
            text: [
              'Be prepared to explain how LRU cache utilizes a Doubly Linked List paired with a Hash Map to achieve O(1) operations.',
              'The Hash Map provides fast node lookup, while the DLL allows constant-time insertion and tail eviction.'
            ],
            checklist: [
              'Hash Map provides O(1) node lookup',
              'DLL provides O(1) node reordering'
            ]
          },
          {
            type: 'mini-practice',
            question: 'Map Spotify Playlist to the correct data structure.',
            current: 'Options: Singly vs Circular Doubly',
            expected: 'Circular Doubly Linked List',
            interactiveDemoType: 'match-app'
          }
        ]
      }
    },
    {
      id: 'interview-hub',
      title: 'Revision Dashboard',
      icon: '⚡',
      estimatedTime: '5 min',
      layoutType: 'interview-prep',
      content: {
        revisionHub: {
          topicSummary: {
            definition: [
              'Scatter-allocated dynamic node sequence.',
              'Requires pointers to maintain relationships.',
              'Fast inserts/deletes at pointer references.'
            ],
            whyImportant: [
              'Highly tested in technical coding loops.',
              'Core foundation of stacks, queues, trees, and graphs.'
            ]
          },
          keyConcepts: [
            { title: 'Singly Linked', description: 'One next pointer per node.' },
            { title: 'Doubly Linked', description: 'prev and next pointers per node.' },
            { title: 'Circular Linked', description: 'tail.next connects back to head.' }
          ],
          operationsTable: [
            { operation: 'Access / Search', complexity: 'O(n)', note: 'Must walk sequentially' },
            { operation: 'Insert / Delete Head', complexity: 'O(1)', note: 'Direct pointer change' },
            { operation: 'Insert / Delete Middle', complexity: 'O(1) with pointer', note: 'O(n) if pointer search is required' }
          ],
          methodsCheatSheet: [],
          patternSummary: [],
          commonQuestions: [],
          commonMistakes: [
            { title: 'Null Reference Errors', description: 'Accessing next on a null pointer.' },
            { title: 'Broken Chain', description: 'Losing pointer reference during insertion.' }
          ],
          interviewCrashNotes: [],
          finalQuiz: []
        }
      }
    }
  ]
};
