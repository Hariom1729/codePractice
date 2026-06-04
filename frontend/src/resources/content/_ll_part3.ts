import type { Section } from './types';

export const llPart3Sections: Section[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 10. DOUBLY LINKED LIST
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'doubly-linked',
    title: 'Doubly Linked List',
    icon: '🔗',
    estimatedTime: '40 min',
    content: {
      hook: {
        question: 'Your browser\'s Back and Forward buttons need instant access in both directions — which data structure powers them?',
        answer: 'A Doubly Linked List. Each page stores a pointer to the previous page AND the next page, letting you jump backward and forward in O(1).',
        concept: 'Bidirectional Traversal',
        icon: '⏪⏩',
      },

      keyIdea: {
        title: 'Two Pointers Per Node',
        description: 'A doubly linked list extends the singly linked list by adding a "prev" pointer to every node. Each node now knows both its predecessor and successor, enabling traversal in both directions at the cost of one extra pointer per node.',
      },

      analogy: {
        title: 'The Two-Way Street Model',
        description: 'Imagine a two-way street where every house has its address printed on both the front door and the back door. You can walk forward reading front doors, or backward reading back doors — you never need to start over.',
        mapping: [
          { realWorld: 'A house on the street', csConcept: 'A DLL node (stores data + two pointers)' },
          { realWorld: 'Front door sign → next house', csConcept: 'The "next" pointer to the successor node' },
          { realWorld: 'Back door sign → previous house', csConcept: 'The "prev" pointer to the predecessor node' },
          { realWorld: 'First house (no back door sign)', csConcept: 'Head node (prev = null)' },
          { realWorld: 'Last house (no front door sign)', csConcept: 'Tail node (next = null)' },
          { realWorld: 'Walking forward on the street', csConcept: 'Forward traversal using next pointers' },
          { realWorld: 'Walking backward on the street', csConcept: 'Backward traversal using prev pointers' },
        ],
      },

      prose: [
        'A singly linked list only lets you move in one direction — forward. If you overshoot a node, you must restart from the head and traverse all the way back. A doubly linked list (DLL) solves this by giving every node two pointers: "prev" (pointing backward) and "next" (pointing forward). This single addition transforms the list into a bidirectional data structure.',

        'The node structure in a DLL is straightforward: each node holds three fields — the data, a prev pointer, and a next pointer. The head node\'s prev is null, and the tail node\'s next is null. These null sentinels tell you when you\'ve reached the boundary of the list in either direction.',

        'The most significant advantage of a DLL is O(1) deletion when you have a pointer to the node. In a singly linked list, deleting a node requires traversing from the head to find the predecessor — an O(n) operation. In a DLL, the predecessor is immediately available via the prev pointer, so you can unlink any node in constant time.',

        'DLLs also enable O(1) insertion before a given node, which is impossible in a singly linked list without traversal. If you have a pointer to node X and want to insert a new node before X, you simply link the new node\'s next to X, its prev to X.prev, update X.prev.next, and finally update X.prev — all O(1) operations.',

        'The trade-off is memory. Every node now stores two pointers instead of one. On a 64-bit system, each pointer is 8 bytes, so a DLL uses 16 bytes of pointer overhead per node versus 8 bytes in a singly linked list. For a million nodes, that\'s an extra 8 MB of memory just for the prev pointers. This is often acceptable, but worth considering for memory-constrained environments.',

        'DLLs are the backbone of many real-world data structures. The LRU (Least Recently Used) cache — a staple interview problem at Google, Meta, and Amazon — combines a DLL with a hash map. The DLL maintains access order so the least recently used item is always at the tail, while the hash map provides O(1) lookups. Together they achieve O(1) get and put operations.',

        'Browser history, undo/redo stacks in text editors, music player playlists with previous/next track — all of these are natural DLL use cases. Any scenario where you need to navigate forward and backward through a sequence of items maps beautifully to a doubly linked list.',

        'When implementing a DLL, many production codebases use a "sentinel node" (dummy head and/or dummy tail) to eliminate null checks at boundaries. With sentinels, you never have to special-case insertion or deletion at the head or tail — the code for all positions is identical. This technique drastically simplifies implementation and reduces bugs.',

        'During interviews, the most common DLL problems are: (1) Design an LRU Cache, (2) Flatten a multilevel DLL, (3) Convert a binary search tree to a sorted DLL, and (4) Implement a deque using a DLL. Mastering the insert and delete operations is essential because these form the building blocks for all higher-level DLL problems.',
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `// Doubly Linked List Node Structure in C++
struct DLLNode {
    int data;
    DLLNode* prev;
    DLLNode* next;

    DLLNode(int val) : data(val), prev(nullptr), next(nullptr) {}
};

class DoublyLinkedList {
public:
    DLLNode* head;
    DLLNode* tail;

    DoublyLinkedList() : head(nullptr), tail(nullptr) {}

    // Insert at head — O(1)
    void insertAtHead(int val) {
        DLLNode* newNode = new DLLNode(val);
        newNode->next = head;
        if (head != nullptr) {
            head->prev = newNode;
        } else {
            tail = newNode;  // First node, so it's also the tail
        }
        head = newNode;
    }

    // Insert at tail — O(1) since we maintain a tail pointer
    void insertAtTail(int val) {
        DLLNode* newNode = new DLLNode(val);
        newNode->prev = tail;
        if (tail != nullptr) {
            tail->next = newNode;
        } else {
            head = newNode;  // First node, so it's also the head
        }
        tail = newNode;
    }

    // Insert after a given node — O(1) if you have the pointer
    void insertAfter(DLLNode* prevNode, int val) {
        if (prevNode == nullptr) return;
        DLLNode* newNode = new DLLNode(val);
        newNode->next = prevNode->next;
        newNode->prev = prevNode;
        if (prevNode->next != nullptr) {
            prevNode->next->prev = newNode;
        } else {
            tail = newNode;  // prevNode was the tail
        }
        prevNode->next = newNode;
    }

    // Forward traversal: head → tail
    void printForward() {
        DLLNode* curr = head;
        while (curr != nullptr) {
            cout << curr->data << " <-> ";
            curr = curr->next;
        }
        cout << "NULL" << endl;
    }

    // Backward traversal: tail → head
    void printBackward() {
        DLLNode* curr = tail;
        while (curr != nullptr) {
            cout << curr->data << " <-> ";
            curr = curr->prev;
        }
        cout << "NULL" << endl;
    }
};`,
          explanation: 'Complete DLL class with head/tail pointers. insertAtHead and insertAtTail are both O(1). The tail pointer avoids O(n) traversal for tail operations. Note how every insertion updates both prev and next pointers of affected nodes.',
        },
        {
          language: 'cpp',
          code: `// Delete Operations on Doubly Linked List — C++

// Delete a specific node given its pointer — O(1)
void deleteNode(DLLNode* node) {
    if (node == nullptr) return;

    // If node is the head
    if (node->prev != nullptr) {
        node->prev->next = node->next;
    } else {
        head = node->next;  // Deleting head, update head
    }

    // If node is the tail
    if (node->next != nullptr) {
        node->next->prev = node->prev;
    } else {
        tail = node->prev;  // Deleting tail, update tail
    }

    delete node;  // Free memory
}

// Delete from head — O(1)
void deleteFromHead() {
    if (head == nullptr) return;
    DLLNode* temp = head;
    head = head->next;
    if (head != nullptr) {
        head->prev = nullptr;
    } else {
        tail = nullptr;  // List is now empty
    }
    delete temp;
}

// Delete from tail — O(1) (impossible in SLL without traversal!)
void deleteFromTail() {
    if (tail == nullptr) return;
    DLLNode* temp = tail;
    tail = tail->prev;
    if (tail != nullptr) {
        tail->next = nullptr;
    } else {
        head = nullptr;  // List is now empty
    }
    delete temp;
}

// Delete by value — O(n) search + O(1) delete
void deleteByValue(int val) {
    DLLNode* curr = head;
    while (curr != nullptr) {
        if (curr->data == val) {
            deleteNode(curr);
            return;
        }
        curr = curr->next;
    }
}`,
          explanation: 'The key insight: deleting from the tail is O(1) in a DLL because tail->prev gives you the new tail immediately. In a singly linked list, this requires O(n) traversal to find the second-to-last node. deleteNode() handles all edge cases — head, tail, middle, and single-node list.',
        },
        {
          language: 'javascript',
          code: `// Doubly Linked List in JavaScript
class DLLNode {
  constructor(val) {
    this.data = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    // Sentinel (dummy) nodes eliminate all null checks
    this.head = new DLLNode(null);  // Dummy head
    this.tail = new DLLNode(null);  // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  // Insert at front (after dummy head) — O(1)
  insertAtFront(val) {
    const newNode = new DLLNode(val);
    const firstReal = this.head.next;

    newNode.prev = this.head;
    newNode.next = firstReal;
    this.head.next = newNode;
    firstReal.prev = newNode;
    this.size++;
  }

  // Insert at end (before dummy tail) — O(1)
  insertAtEnd(val) {
    const newNode = new DLLNode(val);
    const lastReal = this.tail.prev;

    newNode.next = this.tail;
    newNode.prev = lastReal;
    lastReal.next = newNode;
    this.tail.prev = newNode;
    this.size++;
  }

  // Delete a specific node — O(1)
  removeNode(node) {
    // No need to check for head/tail because sentinels protect us
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }

  // Move a node to front — O(1), used in LRU Cache!
  moveToFront(node) {
    this.removeNode(node);
    // Re-insert after dummy head
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++;
  }

  // Print forward (skip sentinels)
  printForward() {
    const result = [];
    let curr = this.head.next;
    while (curr !== this.tail) {
      result.push(curr.data);
      curr = curr.next;
    }
    console.log(result.join(' <-> '));
  }
}`,
          explanation: 'This sentinel-based implementation is the production-grade approach. Dummy head and tail nodes mean you NEVER check for null — every real node always has a valid prev and next. The moveToFront() method is exactly what LRU Cache uses to mark a node as recently accessed.',
        },
        {
          language: 'javascript',
          code: `// DLL Delete Operations and Search — JavaScript

class DoublyLinkedListOps extends DoublyLinkedList {
  // Delete from front — O(1)
  deleteFromFront() {
    if (this.size === 0) return null;
    const node = this.head.next;
    this.removeNode(node);
    return node.data;
  }

  // Delete from end — O(1) (DLL advantage over SLL!)
  deleteFromEnd() {
    if (this.size === 0) return null;
    const node = this.tail.prev;
    this.removeNode(node);
    return node.data;
  }

  // Search — O(n), returns the node or null
  search(val) {
    let curr = this.head.next;
    while (curr !== this.tail) {
      if (curr.data === val) return curr;
      curr = curr.next;
    }
    return null;
  }

  // Insert at position (0-indexed) — O(n) traverse + O(1) insert
  insertAtPosition(val, pos) {
    if (pos < 0 || pos > this.size) return;

    // Optimize: traverse from closer end
    let target;
    if (pos <= this.size / 2) {
      // Traverse from head
      target = this.head.next;
      for (let i = 0; i < pos; i++) target = target.next;
    } else {
      // Traverse from tail (DLL advantage!)
      target = this.tail;
      for (let i = this.size; i > pos; i--) target = target.prev;
    }

    // Insert before target
    const newNode = new DLLNode(val);
    newNode.next = target;
    newNode.prev = target.prev;
    target.prev.next = newNode;
    target.prev = newNode;
    this.size++;
  }

  // Reverse the DLL — O(n)
  reverse() {
    let curr = this.head.next;
    while (curr !== this.tail) {
      // Swap prev and next
      [curr.prev, curr.next] = [curr.next, curr.prev];
      curr = curr.prev; // Move forward (prev is now next)
    }
    // Swap sentinel connections
    const firstReal = this.head.next;
    const lastReal = this.tail.prev;
    this.head.next = lastReal;
    lastReal.prev = this.head;
    this.tail.prev = firstReal;
    firstReal.next = this.tail;
  }
}

// Usage
const dll = new DoublyLinkedListOps();
dll.insertAtEnd(10);
dll.insertAtEnd(20);
dll.insertAtEnd(30);
dll.insertAtFront(5);
dll.printForward();     // 5 <-> 10 <-> 20 <-> 30
dll.deleteFromEnd();
dll.printForward();     // 5 <-> 10 <-> 20
dll.insertAtPosition(15, 2);
dll.printForward();     // 5 <-> 10 <-> 15 <-> 20`,
          explanation: 'insertAtPosition showcases a DLL-exclusive optimization: if the target position is closer to the tail, we traverse backward from the tail instead of forward from the head. This halves the average traversal time. The reverse() method swaps prev and next for each node.',
        },
      ],

      complexityTable: [
        { operation: 'Insert at Head', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Direct pointer manipulation' },
        { operation: 'Insert at Tail', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Requires tail pointer' },
        { operation: 'Insert at Middle (given pointer)', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'O(1) if you have the node reference' },
        { operation: 'Insert at Position k', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Traverse from closer end: O(min(k, n-k))' },
        { operation: 'Delete from Head', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Update head pointer' },
        { operation: 'Delete from Tail', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'DLL advantage: prev pointer available' },
        { operation: 'Delete Given Node', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'No traversal needed — prev is known' },
        { operation: 'Search by Value', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Linear scan required' },
        { operation: 'Forward Traversal', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Head to tail via next' },
        { operation: 'Backward Traversal', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Tail to head via prev' },
        { operation: 'Reverse', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Swap prev and next for each node' },
      ],

      tableData: [
        {
          headers: ['Feature', 'Singly Linked List', 'Doubly Linked List'],
          rows: [
            ['Pointers per node', '1 (next only)', '2 (prev + next)'],
            ['Memory per node (64-bit)', 'data + 8 bytes', 'data + 16 bytes'],
            ['Traversal direction', 'Forward only', 'Forward and backward'],
            ['Insert at head', 'O(1)', 'O(1)'],
            ['Insert at tail (with tail ptr)', 'O(1)', 'O(1)'],
            ['Delete from head', 'O(1)', 'O(1)'],
            ['Delete from tail', 'O(n) — must find prev', 'O(1) — prev pointer available'],
            ['Delete given node', 'O(n) — must find prev', 'O(1) — prev pointer available'],
            ['Insert before a node', 'O(n) — must find prev', 'O(1) — prev pointer available'],
            ['Reverse traversal', 'Impossible without stack/recursion', 'Native via prev pointers'],
            ['Implementation complexity', 'Simple', 'Moderate (more pointer updates)'],
            ['Cache performance', 'Poor (scattered memory)', 'Worse (more pointer chasing)'],
            ['Use cases', 'Stacks, simple chains', 'LRU cache, browser history, undo/redo'],
          ],
        },
      ],

      interviewPerspective: {
        title: 'DLL Interview Checklist',
        checklist: [
          'Always clarify whether you need a singly or doubly linked list — DLLs are required when O(1) deletion of arbitrary nodes is needed',
          'The LRU Cache (LeetCode #146) is THE most asked DLL problem — know it cold: HashMap<key, DLLNode> + DLL for ordering',
          'Use sentinel nodes (dummy head/tail) in your implementation to eliminate boundary checks and reduce bugs',
          'When asked about trade-offs, mention the 2x pointer overhead and worse cache locality compared to SLL',
          'Know how to convert a BST to sorted DLL (in-order traversal connecting nodes via prev/next)',
          'For problems requiring both forward and backward traversal (like palindrome check on a list), DLL is the natural choice',
          'Practice: Flatten a Multilevel DLL (LeetCode #430) uses DFS/stack with careful prev/next rewiring',
        ],
      },

      mistakes: [
        {
          title: 'Forgetting to update prev when inserting',
          description: 'Every insertion in a DLL requires updating FOUR pointers: newNode.prev, newNode.next, predecessor.next, and successor.prev. Forgetting any one of these creates a broken list that traverses correctly in one direction but breaks in the other.',
        },
        {
          title: 'Not handling the empty list case',
          description: 'When inserting into an empty DLL, the new node becomes both head AND tail. Forgetting to set tail (or head) in this case leads to null pointer dereference when traversing from the other end. Sentinel nodes eliminate this bug entirely.',
        },
        {
          title: 'Dangling prev pointer after deletion',
          description: 'When deleting a node, you must update both the predecessor\'s next AND the successor\'s prev. A common bug is updating only one direction, leaving a dangling pointer that causes corruption when traversing backward.',
        },
        {
          title: 'Assuming tail delete is O(1) in SLL',
          description: 'Students often confuse SLL and DLL capabilities. Deleting from the tail is O(1) ONLY in DLLs. In singly linked lists, you must traverse from head to find the second-to-last node, making it O(n).',
        },
        {
          title: 'Using DLL when SLL suffices',
          description: 'If you only need forward traversal (e.g., implementing a stack), using a DLL wastes memory on unused prev pointers. Always choose the simplest structure that meets your requirements.',
        },
      ],

      practice: [
        {
          title: 'Design LRU Cache',
          difficulty: 'Medium',
          description: 'Design a data structure that follows the Least Recently Used (LRU) cache eviction policy. Implement get(key) and put(key, value) operations, both in O(1) time. When the cache reaches capacity, evict the least recently used item before inserting a new one.',
          hint: 'Combine a HashMap for O(1) key lookups with a DLL to maintain access order. The most recently used item goes to the head; the least recently used stays at the tail.',
          approach: 'Use a HashMap<key, DLLNode> where each DLL node stores {key, value}. On get(): find the node via map, move it to head, return value. On put(): if key exists, update value and move to head. If new, create node at head, add to map. If over capacity, remove tail node and delete its key from the map.',
          timeComplexity: 'O(1) for both get and put',
          spaceComplexity: 'O(capacity) for the cache',
        },
        {
          title: 'Flatten a Multilevel Doubly Linked List',
          difficulty: 'Medium',
          description: 'You are given a doubly linked list where some nodes have a "child" pointer to a separate DLL. Flatten the list so all nodes appear in a single-level DLL. The child list should be inserted between the current node and its next node.',
          hint: 'When you encounter a node with a child, save the current next, process the child list (using DFS or stack), then connect the tail of the child list to the saved next.',
          approach: 'Iterate through the list. When a child is found: (1) Save curr.next as tempNext. (2) Connect curr.next = child, child.prev = curr. (3) Traverse to the end of the child sublist. (4) Connect child tail to tempNext. (5) Set curr.child = null. Continue iteration.',
          timeComplexity: 'O(n) where n is total nodes across all levels',
          spaceComplexity: 'O(1) iterative, O(depth) recursive',
        },
        {
          title: 'Convert Binary Search Tree to Sorted Doubly Linked List',
          difficulty: 'Medium',
          description: 'Convert a BST to a circular sorted doubly linked list in-place. The left pointer of the tree node should become the prev pointer, and the right pointer should become the next pointer. The list should be sorted in ascending order and be circular.',
          hint: 'Use in-order traversal (left → root → right) which visits BST nodes in sorted order. Maintain a "prev" variable to link nodes as you visit them.',
          approach: 'Perform in-order traversal. Maintain a global "prev" and "head" pointer. For each visited node: set node.left = prev and prev.right = node. After traversal, connect head.left = lastNode and lastNode.right = head to make it circular.',
          timeComplexity: 'O(n) — visit every node once',
          spaceComplexity: 'O(h) for recursion stack, where h is tree height',
        },
      ],

      takeaways: [
        'A DLL node has three fields: data, prev pointer, and next pointer',
        'Bidirectional traversal is the defining advantage — move forward via next, backward via prev',
        'O(1) deletion of any node when you have its pointer (vs O(n) in SLL)',
        'O(1) tail deletion because prev pointer gives immediate access to the predecessor',
        'Memory cost: 2 pointers per node instead of 1 (16 bytes vs 8 bytes on 64-bit systems)',
        'Sentinel (dummy) head and tail nodes eliminate all boundary null checks',
        'DLL + HashMap = LRU Cache — the most important DLL interview pattern',
        'Use DLL when you need: bidirectional traversal, O(1) arbitrary deletion, or undo/redo functionality',
        'Prefer SLL when you only need forward traversal to save memory',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. CIRCULAR LINKED LIST
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'circular-linked',
    title: 'Circular Linked List',
    icon: '🔄',
    estimatedTime: '30 min',
    content: {
      hook: {
        question: 'How does your OS fairly share the CPU among 50 running applications without any program starving?',
        answer: 'Round-robin scheduling uses a Circular Linked List. The scheduler cycles through processes endlessly — after the last process, it wraps back to the first, just like a merry-go-round.',
        concept: 'Circular Traversal',
        icon: '🎠',
      },

      keyIdea: {
        title: 'No Beginning, No End',
        description: 'In a circular linked list, the last node points back to the first node instead of null. There is no natural "end" — traversal wraps around infinitely, making it perfect for cyclic patterns like scheduling, buffering, and turn-based games.',
      },

      analogy: {
        title: 'The Merry-Go-Round Model',
        description: 'Picture a merry-go-round at a park. Once it starts spinning, there is no "first" or "last" horse — every horse leads to the next, and the last horse connects back to the first. You can board at any horse and ride forever.',
        mapping: [
          { realWorld: 'Each horse on the merry-go-round', csConcept: 'A node in the circular linked list' },
          { realWorld: 'The pole connecting horses in sequence', csConcept: 'The "next" pointer linking nodes' },
          { realWorld: 'The circle — last horse leads back to first', csConcept: 'Tail\'s next points to head (no null terminator)' },
          { realWorld: 'Spinning continuously', csConcept: 'Traversal loops endlessly without stopping' },
          { realWorld: 'Boarding at any horse', csConcept: 'You can start traversal from any node' },
        ],
      },

      prose: [
        'A circular linked list (CLL) is a variation where the tail node\'s next pointer points back to the head instead of null. This creates a ring structure with no natural termination point. There are two flavors: circular singly linked list (each node has only a next pointer forming a ring) and circular doubly linked list (each node has prev and next, with head.prev = tail and tail.next = head).',

        'The most critical implementation detail is the traversal pattern. In a linear linked list you check "while (curr != null)". In a circular list, there IS no null — you must use a do-while pattern: start at a node, advance, and stop when you return to the starting node. Using a regular while loop with a null check on a circular list causes an infinite loop — the most common bug beginners encounter.',

        'Circular singly linked lists are often maintained with just a tail pointer instead of a head pointer. Why? Because tail.next gives you the head in O(1), so a single tail pointer grants O(1) access to BOTH ends. This is more memory-efficient than storing both head and tail separately. Insertion at head becomes: create newNode, newNode.next = tail.next, tail.next = newNode. Insertion at tail: do the same, then update tail = newNode.',

        'Circular doubly linked lists combine the ring structure with bidirectional traversal. The head\'s prev points to tail, and tail\'s next points to head. This variant is used in Linux kernel\'s linked list implementation (include/linux/list.h) and in many OS process schedulers because it allows efficient insertion and removal from any position while maintaining the circular property.',

        'The classic use case for circular lists is round-robin scheduling. The OS maintains a circular list of processes. The scheduler gives each process a fixed time slice (quantum), then moves to the next. After the last process, it wraps back to the first. No process starves because the cycle guarantees every process gets CPU time. Adding or removing processes is O(1) — just insert or unlink a node from the ring.',

        'Circular buffers (ring buffers) in networking and audio processing are another important application. A fixed-size circular buffer overwrites old data when it fills up, which is perfect for streaming data where you only care about the most recent N items. Producer-consumer queues, UART receive buffers, and audio sample buffers all use this pattern.',

        'Other applications include: multiplayer turn-based games (cycle through players), Josephus problem (elimination in a circle), hot potato or musical chairs simulations, token-ring networking protocols, and representing cyclic mathematical structures like modular arithmetic or clock faces.',

        'The disadvantages are: (1) More complex code — every operation must maintain the circular property, and a bug can cause infinite traversal. (2) No natural termination — you always need a sentinel or count to know when a full cycle is complete. (3) Debugging is harder because printing the list requires careful cycle detection. (4) The Josephus problem variant shows that circular lists can be replaced by arrays with modular arithmetic (i + 1) % n, which has better cache performance.',
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `// Circular Singly Linked List — C++ (tail pointer approach)
struct CNode {
    int data;
    CNode* next;
    CNode(int val) : data(val), next(nullptr) {}
};

class CircularLinkedList {
    CNode* tail;  // Only need tail — tail->next gives head!
    int size;

public:
    CircularLinkedList() : tail(nullptr), size(0) {}

    // Insert at head — O(1)
    void insertAtHead(int val) {
        CNode* newNode = new CNode(val);
        if (tail == nullptr) {
            // First node points to itself
            newNode->next = newNode;
            tail = newNode;
        } else {
            newNode->next = tail->next;  // newNode → old head
            tail->next = newNode;        // tail → newNode (new head)
        }
        size++;
    }

    // Insert at tail — O(1)
    void insertAtTail(int val) {
        insertAtHead(val);   // Same as insertAtHead...
        tail = tail->next;   // ...but then advance tail to the new node
        // Now the new node IS the tail, and tail->next = head
    }

    // Delete from head — O(1)
    void deleteFromHead() {
        if (tail == nullptr) return;
        CNode* head = tail->next;
        if (head == tail) {
            // Only one node
            tail = nullptr;
        } else {
            tail->next = head->next;  // tail → second node (new head)
        }
        delete head;
        size--;
    }

    // Delete from tail — O(n), must find node before tail
    void deleteFromTail() {
        if (tail == nullptr) return;
        CNode* head = tail->next;
        if (head == tail) {
            tail = nullptr;
            delete head;
        } else {
            CNode* prev = head;
            while (prev->next != tail) {
                prev = prev->next;
            }
            prev->next = head;  // prev → head (skip old tail)
            delete tail;
            tail = prev;        // prev is the new tail
        }
        size--;
    }

    // Traversal — do-while to handle the circular property
    void print() {
        if (tail == nullptr) {
            cout << "Empty list" << endl;
            return;
        }
        CNode* curr = tail->next;  // Start at head
        do {
            cout << curr->data << " -> ";
            curr = curr->next;
        } while (curr != tail->next);  // Stop when we return to head
        cout << "(back to head: " << tail->next->data << ")" << endl;
    }

    int getSize() { return size; }
};

// Usage:
// CircularLinkedList cll;
// cll.insertAtTail(10); cll.insertAtTail(20); cll.insertAtTail(30);
// cll.print();  // 10 -> 20 -> 30 -> (back to head: 10)`,
          explanation: 'Key design: only a tail pointer is stored. The head is always tail->next. insertAtTail reuses insertAtHead and advances the tail — an elegant O(1) approach. The do-while traversal pattern is essential to avoid infinite loops.',
        },
        {
          language: 'cpp',
          code: `// Josephus Problem — Classic Circular List Application
// N people in a circle, eliminate every K-th person. Who survives?

int josephus(int n, int k) {
    // Build circular list
    CNode* head = new CNode(1);
    CNode* prev = head;
    for (int i = 2; i <= n; i++) {
        CNode* node = new CNode(i);
        prev->next = node;
        prev = node;
    }
    prev->next = head;  // Make it circular

    // Elimination
    CNode* curr = prev; // Start just before head
    while (curr->next != curr) {  // While more than 1 person
        // Count k-1 steps (to land on the node BEFORE the k-th)
        for (int count = 1; count < k; count++) {
            curr = curr->next;
        }
        // curr->next is the k-th person — eliminate
        CNode* toDelete = curr->next;
        cout << "Eliminated: " << toDelete->data << endl;
        curr->next = toDelete->next;
        delete toDelete;
    }
    int survivor = curr->data;
    delete curr;
    return survivor;
}

// josephus(7, 3) eliminates: 3, 6, 2, 7, 5, 1 → Survivor: 4`,
          explanation: 'The Josephus problem is the classic circular linked list algorithm. Every K-th person is removed until one remains. The circular structure naturally handles wrap-around. The mathematical solution is josephus(n,k) = (josephus(n-1,k) + k) % n, but the linked list simulation is more intuitive.',
        },
        {
          language: 'javascript',
          code: `// Circular Linked List — JavaScript Implementation
class CircularNode {
  constructor(val) {
    this.data = val;
    this.next = null;
  }
}

class CircularSinglyList {
  constructor() {
    this.tail = null;
    this.size = 0;
  }

  // Insert at head — O(1)
  insertAtHead(val) {
    const newNode = new CircularNode(val);
    if (this.tail === null) {
      newNode.next = newNode; // Points to itself
      this.tail = newNode;
    } else {
      newNode.next = this.tail.next; // New node → old head
      this.tail.next = newNode;      // Tail → new node (new head)
    }
    this.size++;
  }

  // Insert at tail — O(1)
  insertAtTail(val) {
    this.insertAtHead(val);
    this.tail = this.tail.next; // Advance tail to new node
    this.size--; // insertAtHead incremented, but we need net +1
    this.size++;
  }

  // Search — O(n), uses do-while
  search(val) {
    if (this.tail === null) return false;
    let curr = this.tail.next; // Start at head
    do {
      if (curr.data === val) return true;
      curr = curr.next;
    } while (curr !== this.tail.next);
    return false;
  }

  // Convert to array (for debugging)
  toArray() {
    if (this.tail === null) return [];
    const result = [];
    let curr = this.tail.next;
    do {
      result.push(curr.data);
      curr = curr.next;
    } while (curr !== this.tail.next);
    return result;
  }

  // Round-robin iterator — yields elements cyclically forever
  *roundRobin() {
    if (this.tail === null) return;
    let curr = this.tail.next;
    while (true) {
      yield curr.data;
      curr = curr.next;
    }
  }
}

// Usage:
const cll = new CircularSinglyList();
cll.insertAtTail(1);
cll.insertAtTail(2);
cll.insertAtTail(3);
console.log(cll.toArray()); // [1, 2, 3]

// Round-robin scheduling simulation
const scheduler = cll.roundRobin();
for (let i = 0; i < 9; i++) {
  console.log('Process:', scheduler.next().value);
}
// Process: 1, 2, 3, 1, 2, 3, 1, 2, 3 — cycles forever!`,
          explanation: 'The JavaScript generator function roundRobin() demonstrates the core power of circular lists: infinite cycling through elements. This is exactly how OS schedulers and load balancers work. The do-while traversal pattern in search() and toArray() prevents infinite loops.',
        },
      ],

      tableData: [
        {
          headers: ['Feature', 'Linear Linked List', 'Circular Linked List'],
          rows: [
            ['Last node\'s next', 'null', 'Points to head'],
            ['Traversal termination', 'Check for null', 'Check if returned to start (do-while)'],
            ['Access to head from tail', 'O(n) traversal or separate head pointer', 'O(1) via tail.next'],
            ['Natural for cyclic problems', 'No — requires modular arithmetic', 'Yes — structure mirrors the problem'],
            ['Infinite loop risk', 'None (null stops traversal)', 'High — must use do-while or counter'],
            ['Round-robin scheduling', 'Awkward (reset to head manually)', 'Natural (just keep advancing)'],
            ['Node deletion (given pointer)', 'Must handle tail→null edge case', 'Must handle single-node ring edge case'],
            ['Implementation complexity', 'Simple', 'Moderate (maintain circular invariant)'],
            ['Debugging ease', 'Easy (print until null)', 'Harder (must detect cycle completion)'],
          ],
        },
      ],

      callouts: [
        {
          type: 'warning',
          title: '⚠️ Infinite Loop Danger',
          body: 'The #1 bug in circular linked lists is using "while (curr != null)" for traversal. In a CLL there is no null — this loop runs FOREVER. Always use the do-while pattern: start at a node, advance, and stop when you return to the starting node. Alternatively, use a counter: loop exactly "size" times.',
        },
        {
          type: 'warning',
          title: '⚠️ Single Node Edge Case',
          body: 'A circular list with one node has that node pointing to itself (node.next = node). Deleting the only node requires setting tail = null, not just unlinking. Forgetting this case causes a use-after-free bug or an infinite loop on the dangling self-pointer.',
        },
        {
          type: 'tip',
          title: 'Tail-Only Pointer Trick',
          body: 'Store only a tail pointer, not a head pointer. Since tail.next = head in a circular list, you get O(1) access to both ends with a single stored pointer. This saves memory and simplifies the API. Most production circular list implementations use this approach.',
        },
        {
          type: 'note',
          title: 'Circular Doubly Linked List',
          body: 'A circular DLL has head.prev = tail AND tail.next = head. The Linux kernel uses this exact structure (struct list_head) for all its internal linked lists — it is perhaps the most widely deployed linked list implementation in history, running on billions of devices.',
        },
      ],

      interviewPerspective: {
        title: 'Circular LL Interview Checklist',
        checklist: [
          'Know the do-while traversal pattern cold — interviewers test for infinite loop bugs',
          'Josephus Problem is the classic CLL question: N people in a circle, every K-th eliminated, find survivor',
          'Understand when CLL is better than modular arithmetic on an array — CLL wins when frequent insert/delete is needed',
          'Be prepared to detect if a given linked list is circular (Floyd\'s Cycle Detection, covered in next section)',
          'Circular DLLs appear in OS questions — explain round-robin scheduling with time quantum',
          'Edge cases to handle: empty list, single node (self-loop), two nodes',
          'Know that circular buffer ≠ circular linked list — circular buffers use arrays with mod arithmetic for better cache performance',
        ],
      },

      mistakes: [
        {
          title: 'Using while(curr != null) for traversal',
          description: 'This is the deadliest circular list bug. There is no null in a circular list. This while condition is always true, creating an infinite loop that hangs your program. Always use do-while and compare against the starting node.',
        },
        {
          title: 'Forgetting the single-node self-loop',
          description: 'When a circular list has exactly one node, that node\'s next points to itself. Deleting it requires setting tail = null. If you try to do "tail.next = node.next" on a single node, you get tail.next = node.next = node = the node you just deleted — a dangling pointer.',
        },
        {
          title: 'Not maintaining the circular invariant after operations',
          description: 'Every insertion and deletion must preserve the property that tail.next = head. Forgetting to update this link after modifying the list breaks the ring, causing either null traversal stops (if the link becomes null) or partial traversal (if it points to a middle node).',
        },
        {
          title: 'Confusing circular linked list with cycle in a linked list',
          description: 'A circular linked list is a valid, intentional data structure where tail→head. A cycle in a linked list is a BUG where some node points back to a previous node, creating an unintended loop. Floyd\'s algorithm detects the latter, not the former.',
        },
      ],

      takeaways: [
        'Circular LL: the last node\'s next pointer connects back to the head node',
        'Two types: Circular Singly LL and Circular Doubly LL',
        'Always use do-while traversal — never while(curr != null)',
        'Store only a tail pointer: tail.next gives O(1) head access',
        'Primary use case: round-robin scheduling, circular buffers, turn-based cycling',
        'Josephus Problem is the canonical circular list algorithm',
        'Single-node edge case: the node points to itself',
        'Circular DLL is used in Linux kernel (struct list_head) — billions of devices run it',
        'When frequent insert/delete isn\'t needed, arrays with (i+1)%n often outperform CLLs due to cache locality',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. ADVANCED LINKED LIST PATTERNS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'advanced',
    title: 'Advanced Linked List Patterns',
    icon: '🐢🐇',
    estimatedTime: '50 min',
    content: {
      hook: {
        question: 'How can you detect if a linked list has a hidden loop — without using any extra memory and in linear time?',
        answer: 'Floyd\'s Tortoise and Hare algorithm. Send two pointers: one moving 1 step at a time (tortoise) and one moving 2 steps (hare). If there\'s a cycle, they MUST collide. If there isn\'t, the hare hits null.',
        concept: 'Fast & Slow Pointer Technique',
        icon: '🐢🐇',
      },

      keyIdea: {
        title: 'Two Pointers at Different Speeds',
        description: 'The fast-slow pointer technique uses two pointers traversing a linked list at different speeds. The speed difference creates a mathematical guarantee: if a cycle exists, the pointers MUST meet. This single idea solves cycle detection, middle-finding, and more.',
      },

      prose: [
        'The fast and slow pointer technique (also called the Tortoise and Hare algorithm, after Aesop\'s fable) is one of the most elegant ideas in computer science. The concept is deceptively simple: move one pointer at speed 1 (one node per step) and another at speed 2 (two nodes per step). Despite this simplicity, it solves a family of linked list problems that seem impossible without extra space.',

        'Cycle Detection — the core application. Consider a linked list where some node\'s next pointer has been corrupted to point back to a previous node, creating a loop. If you naively traverse with a single pointer, you\'ll loop forever. Floyd\'s insight: if you launch a slow pointer (1 step) and a fast pointer (2 steps) from the head, and a cycle exists, they MUST eventually meet inside the cycle. If no cycle exists, the fast pointer reaches null.',

        'Why must they meet? Here\'s the mathematical proof. Let the cycle have length C. Once both pointers are inside the cycle, consider the gap between them. At each step, the slow pointer advances 1 and the fast pointer advances 2, so the gap closes by exactly 1 per step. Starting from any gap G (where 0 < G < C), the gap decreases: G, G-1, G-2, ..., 1, 0. When the gap hits 0, they\'re at the same node. The gap MUST reach 0 because it decreases by exactly 1 each step — they cannot "skip over" each other.',

        'Finding the cycle start node is the next crucial step. After detection (slow and fast meet at some node inside the cycle), reset one pointer to the head and keep the other at the meeting point. Now advance BOTH at speed 1. The node where they meet again is the START of the cycle. This works because of a beautiful mathematical relationship: let the distance from head to cycle start be "a", the distance from cycle start to the meeting point be "b", and the remaining cycle length be "c" (so C = b + c). The fast pointer traveled 2× the distance of slow: 2(a + b) = a + b + n·C. This simplifies to a = n·C - b = (n-1)·C + c. So moving "a" steps from the meeting point lands you at the cycle start — which is the same as moving "a" steps from the head!',

        'Finding the middle node is another classic application. Start both slow and fast at the head. Move slow by 1 and fast by 2. When fast reaches the end (fast == null or fast.next == null), slow is at the middle. Why? Fast travels twice as far as slow. When fast has covered the full length n, slow has covered n/2 — the middle. For even-length lists, this gives the second of the two middle nodes. This is used in merge sort on linked lists to split the list in half.',

        'The Happy Number problem is a surprising application. A "happy" number is defined by repeatedly summing the squares of its digits. If the sequence reaches 1, the number is happy. If it enters a cycle (never reaching 1), it\'s not. You can model this as a linked list where each number points to its digit-square-sum. Floyd\'s algorithm detects whether the sequence cycles or reaches 1, using O(1) space instead of a HashSet.',

        'Linked List Intersection is another problem solved elegantly with two pointers (though not exactly fast-slow). Given two singly linked lists that may merge at some node, find the intersection point. The trick: pointer A traverses list A then switches to list B\'s head. Pointer B traverses list B then switches to list A\'s head. They will meet at the intersection or both reach null simultaneously. This works because both pointers travel the same total distance: len(A) + len(B).',

        'The fast-slow pointer family extends beyond linked lists. You can detect cycles in any sequence defined by a function f(x) — this is the basis of Pollard\'s rho algorithm for integer factorization. The technique also applies to finding duplicate numbers in arrays (LeetCode #287: Find the Duplicate Number) by treating array values as "next" pointers, converting the array into an implicit linked list with a cycle.',

        'When implementing Floyd\'s algorithm, always check both fast != null AND fast.next != null before advancing the fast pointer. Missing the second check causes a null pointer dereference on odd-length lists. This is the most common implementation bug in fast-slow pointer problems.',
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `// Floyd's Cycle Detection Algorithm — C++
// Returns true if the linked list contains a cycle

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool hasCycle(ListNode* head) {
    if (head == nullptr || head->next == nullptr) return false;

    ListNode* slow = head;        // Tortoise — moves 1 step
    ListNode* fast = head;        // Hare — moves 2 steps

    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;          // 1 step
        fast = fast->next->next;    // 2 steps

        if (slow == fast) return true;  // They met — cycle exists!
    }
    return false;  // Fast reached null — no cycle
}

// Find the START of the cycle — O(n) time, O(1) space
ListNode* detectCycleStart(ListNode* head) {
    if (head == nullptr || head->next == nullptr) return nullptr;

    ListNode* slow = head;
    ListNode* fast = head;

    // Phase 1: Detect cycle (find meeting point)
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) break;  // Meeting point found
    }

    // No cycle
    if (fast == nullptr || fast->next == nullptr) return nullptr;

    // Phase 2: Find cycle start
    // Reset one pointer to head, keep other at meeting point
    slow = head;
    while (slow != fast) {
        slow = slow->next;  // Both move at speed 1
        fast = fast->next;
    }
    return slow;  // This is the cycle start node!
}

/*
 * DRY RUN — Cycle Detection:
 * List: 1 → 2 → 3 → 4 → 5 → 3 (cycle back to node 3)
 *
 * Step 0: slow=1, fast=1
 * Step 1: slow=2, fast=3
 * Step 2: slow=3, fast=5
 * Step 3: slow=4, fast=4  ← MEET! Cycle detected.
 *
 * Phase 2 — Find start:
 * Reset slow=1 (head), fast stays at 4
 * Step 1: slow=2, fast=5
 * Step 2: slow=3, fast=3  ← MEET! Cycle starts at node 3. ✓
 */`,
          explanation: 'Phase 1 uses different speeds (1 vs 2) to detect the cycle. Phase 2 uses equal speeds (1 vs 1) from different starting points to find the cycle\'s entry node. The mathematical proof guarantees they meet exactly at the cycle start.',
        },
        {
          language: 'python',
          code: `# Floyd's Cycle Detection — Python with detailed annotations

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head: ListNode) -> bool:
    """Detect if a linked list has a cycle. O(n) time, O(1) space."""
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next          # Tortoise: 1 step
        fast = fast.next.next     # Hare: 2 steps
        if slow is fast:          # Use 'is' for identity check, not ==
            return True
    return False

def find_cycle_start(head: ListNode) -> ListNode:
    """Find the node where the cycle begins. Returns None if no cycle."""
    slow = fast = head
    
    # Phase 1: Detect meeting point
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break
    else:
        return None  # No cycle (the while condition failed)
    
    # Phase 2: Find cycle start
    # Mathematical insight:
    #   Let a = distance from head to cycle start
    #   Let b = distance from cycle start to meeting point
    #   Let C = cycle length
    #   Fast traveled: a + b + n*C  (went around cycle n times)
    #   Slow traveled: a + b
    #   Since fast = 2 * slow:  a + b + n*C = 2(a + b)
    #   Therefore: a = n*C - b = (n-1)*C + (C - b)
    #   So 'a' steps from meeting point = 'a' steps from head
    #   Both land at cycle start!
    
    slow = head
    while slow is not fast:
        slow = slow.next
        fast = fast.next  # Both at speed 1 now
    return slow

def find_cycle_length(head: ListNode) -> int:
    """Find the length of the cycle. Returns 0 if no cycle."""
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            # Count cycle length: keep one fixed, advance the other
            length = 1
            runner = slow.next
            while runner is not slow:
                length += 1
                runner = runner.next
            return length
    return 0`,
          explanation: 'Python\'s "is" operator checks identity (same object in memory), which is correct for node comparison. The else clause on the while loop elegantly handles the no-cycle case. find_cycle_length demonstrates how to measure the cycle after detection.',
        },
        {
          language: 'cpp',
          code: `// Find Middle Node of Linked List — C++
// Uses fast-slow pointer: when fast reaches end, slow is at middle

ListNode* findMiddle(ListNode* head) {
    if (head == nullptr) return nullptr;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    // For even length: returns second middle node
    // E.g., [1,2,3,4] → returns node with value 3
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

// Variant: For even length, return FIRST middle node
// E.g., [1,2,3,4] → returns node with value 2
ListNode* findFirstMiddle(ListNode* head) {
    if (head == nullptr) return nullptr;
    
    ListNode* slow = head;
    ListNode* fast = head;
    
    // Check fast->next AND fast->next->next
    while (fast->next != nullptr && fast->next->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

/*
 * DRY RUN — findMiddle with odd length:
 * List: 1 → 2 → 3 → 4 → 5
 *
 * Step 0: slow=1, fast=1
 * Step 1: slow=2, fast=3
 * Step 2: slow=3, fast=5
 * fast->next = null → STOP. Middle = 3 ✓
 *
 * DRY RUN — findMiddle with even length:
 * List: 1 → 2 → 3 → 4
 *
 * Step 0: slow=1, fast=1
 * Step 1: slow=2, fast=3
 * Step 2: slow=3, fast=null (5 doesn't exist)
 * fast = null → STOP. Middle = 3 (second middle) ✓
 */`,
          explanation: 'Two variants handle even-length lists differently. The standard version (checking fast and fast.next) returns the second middle — used in most LeetCode problems. The variant (checking fast.next and fast.next.next) returns the first middle — used when you need to split a list and want the first half to be shorter or equal.',
        },
        {
          language: 'python',
          code: `# Happy Number — Floyd's Algorithm on an implicit "linked list"
# A number is "happy" if repeatedly summing digit squares reaches 1.
# If it cycles without reaching 1, it's not happy.

def digit_square_sum(n: int) -> int:
    """Compute sum of squares of digits. This is the 'next' function."""
    total = 0
    while n > 0:
        digit = n % 10
        total += digit * digit
        n //= 10
    return total

def is_happy(n: int) -> bool:
    """
    Treat each number as a 'node' and digit_square_sum as the 'next pointer'.
    The sequence either reaches 1 (happy) or cycles (not happy).
    Floyd's algorithm detects which case it is in O(1) space.
    """
    slow = n
    fast = n
    
    while True:
        slow = digit_square_sum(slow)               # 1 step
        fast = digit_square_sum(digit_square_sum(fast))  # 2 steps
        
        if fast == 1:
            return True   # Reached 1 — happy number!
        if slow == fast:
            return False  # Cycle detected — not happy
    
    # Alternatively, check slow == 1 after meeting:
    # return slow == 1

# DRY RUN — is_happy(19):
# 19 → 1² + 9² = 82
# 82 → 8² + 2² = 68
# 68 → 6² + 8² = 100
# 100 → 1² + 0² + 0² = 1  ← HAPPY! ✓
#
# DRY RUN — is_happy(2):
# 2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 ← CYCLE!
# slow and fast will meet somewhere in this cycle. NOT happy.

print(is_happy(19))  # True
print(is_happy(2))   # False
print(is_happy(7))   # True`,
          explanation: 'This demonstrates Floyd\'s algorithm applied to a non-linked-list problem. The sequence of digit-square-sums forms an implicit linked list. Either the sequence reaches 1 (terminates) or it enters a cycle (like a cycle in a linked list). Floyd\'s detects the cycle in O(1) space.',
        },
        {
          language: 'cpp',
          code: `// Linked List Intersection — Find where two lists merge
// Two pointers, each traverses both lists. They meet at intersection.

ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    if (headA == nullptr || headB == nullptr) return nullptr;
    
    ListNode* ptrA = headA;
    ListNode* ptrB = headB;
    
    // Each pointer traverses its own list, then switches to the other.
    // Total distance for both: len(A) + len(B)
    // If they intersect, they meet at the intersection node.
    // If they don't, they both reach null simultaneously.
    while (ptrA != ptrB) {
        ptrA = (ptrA != nullptr) ? ptrA->next : headB;
        ptrB = (ptrB != nullptr) ? ptrB->next : headA;
    }
    return ptrA;  // Either the intersection node or null
}

/*
 * DRY RUN:
 * List A: 1 → 2 → 3 ↘
 *                      7 → 8 → null
 * List B:     4 → 5 ↗
 *
 * len(A) = 5, len(B) = 4
 *
 * ptrA path: 1→2→3→7→8→null→4→5→[7]
 * ptrB path: 4→5→7→8→null→1→2→3→[7]
 *
 * Both arrive at node 7 at the same step! 
 * ptrA traveled: 5 + 2 = 7 steps
 * ptrB traveled: 4 + 3 = 7 steps
 * Total = len(A) + len(B) for both ✓
 */`,
          explanation: 'The two-pointer trick ensures both pointers travel the exact same total distance: len(A) + len(B). If the lists intersect, the extra distance from the longer list is "absorbed" when the pointer switches to the shorter list. They synchronize and meet at the intersection.',
        },
        {
          language: 'python',
          code: `# Find Duplicate Number — Floyd's on an array (LeetCode #287)
# Given array of n+1 integers in range [1, n], find the duplicate.
# Constraint: O(1) space, no modifying the array.

def find_duplicate(nums: list[int]) -> int:
    """
    Treat the array as an implicit linked list:
    - Index i is a 'node'
    - nums[i] is the 'next pointer' (the node it points to)
    - Since values are in [1, n] and there are n+1 entries,
      by pigeonhole principle, a cycle MUST exist.
    - The duplicate number is the entry point of the cycle!
    """
    # Phase 1: Find meeting point (same as Floyd's on linked list)
    slow = nums[0]
    fast = nums[0]
    
    while True:
        slow = nums[slow]              # 1 step
        fast = nums[nums[fast]]        # 2 steps
        if slow == fast:
            break
    
    # Phase 2: Find cycle entrance (the duplicate number)
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]  # Both at speed 1
    
    return slow

# Example:
# nums = [1, 3, 4, 2, 2]
# Implicit linked list: 0→1→3→2→4→2→4→2→... (cycle: 2→4→2)
# The duplicate is 2 — the cycle entrance!
print(find_duplicate([1, 3, 4, 2, 2]))  # 2
print(find_duplicate([3, 1, 3, 4, 2]))  # 3`,
          explanation: 'This is one of the most brilliant applications of Floyd\'s algorithm. By treating array indices as nodes and values as next-pointers, a duplicate value creates a cycle (two indices point to the same "node"). The cycle entrance IS the duplicate number. No extra space, no array modification.',
        },
      ],

      callouts: [
        {
          type: 'important',
          title: 'Floyd\'s Cycle Detection — Step-by-Step Dry Run',
          body: 'List: 1→2→3→4→5→3 (5 points back to 3). Step 0: S=1,F=1. Step 1: S=2,F=3. Step 2: S=3,F=5. Step 3: S=4,F=4. MEET! Phase 2: reset S=1,F=4. Step 1: S=2,F=5. Step 2: S=3,F=3. MEET at 3 — cycle start confirmed!',
        },
        {
          type: 'note',
          title: 'Why Can\'t Fast Skip Over Slow?',
          body: 'Students often worry: what if the fast pointer jumps over the slow pointer? This is impossible. Inside the cycle, the relative distance decreases by exactly 1 each step (fast gains 1 on slow). So the gap goes: ..., 3, 2, 1, 0. The gap MUST hit 0 — they meet. They can never go from gap=1 to gap=-1; gap=0 always happens first.',
        },
        {
          type: 'tip',
          title: 'Middle Node Trick for Merge Sort',
          body: 'Merge sort on linked lists needs to split the list into two halves. Use the fast-slow pointer to find the middle in O(n), then set middle.next = null to split. Recursively sort both halves, then merge. Total: O(n log n) time, O(log n) stack space.',
        },
        {
          type: 'important',
          title: 'The a = (n-1)C + c Proof Visualized',
          body: 'Imagine a "tail" of length a leading into a "cycle" of length C. Slow enters the cycle after a steps. Fast has already looped inside the cycle. They meet at distance b from the cycle start. Since a = (n-1)C + c, starting from the meeting point and walking a steps means walking (n-1) full cycles + c more steps, landing exactly at the cycle start — the same as walking a steps from the head!',
        },
      ],

      interviewPerspective: {
        title: 'Fast-Slow Pointer Interview Checklist',
        checklist: [
          'Floyd\'s Cycle Detection is asked at Google, Meta, Amazon, and Microsoft — know both phases (detection + finding start)',
          'Always check BOTH fast != null AND fast->next != null before advancing — the most common implementation bug',
          'Know the mathematical proof for WHY they must meet (gap decreases by 1) and WHY phase 2 finds the start (a = nC - b)',
          'Find Middle Node appears in merge sort on linked lists — know both variants (first middle vs second middle)',
          'Happy Number is a sneaky Floyd\'s application — recognize when a problem has an implicit linked list structure',
          'Find Duplicate Number (LeetCode #287) is the hardest Floyd\'s application — treats array as implicit linked list',
          'Linked List Intersection uses equal-speed pointers with path-switching, NOT fast-slow',
          'Time complexity for all Floyd\'s variants: O(n). Space: O(1) — this is the whole point over using a HashSet',
        ],
      },

      mistakes: [
        {
          title: 'Not checking fast->next before advancing',
          description: 'Writing "fast = fast->next->next" without first checking that fast->next is not null causes a null pointer crash on odd-length lists. Always guard: while (fast != null && fast->next != null).',
        },
        {
          title: 'Confusing meeting point with cycle start',
          description: 'Phase 1 of Floyd\'s finds where slow and fast MEET, but this is NOT necessarily the start of the cycle. You need Phase 2 (reset one pointer to head, advance both at speed 1) to find the actual cycle entry point.',
        },
        {
          title: 'Using == instead of identity check in Python',
          description: 'In Python, use "is" (identity) not "==" (equality) when comparing nodes. Two different nodes could have the same value (slow.val == fast.val) but be different objects. You need "slow is fast" to check they\'re the same node.',
        },
        {
          title: 'Forgetting that intersection pointer technique requires path-switching',
          description: 'For linked list intersection, both pointers must switch to the OTHER list\'s head when they reach null. Forgetting the switch means both pointers traverse only their own list and never synchronize.',
        },
        {
          title: 'Applying Floyd\'s to circular linked lists incorrectly',
          description: 'A circular linked list (tail→head) is an INTENTIONAL cycle, not a bug. Floyd\'s algorithm is for detecting UNINTENTIONAL cycles. Don\'t confuse the two — circular lists don\'t need cycle detection.',
        },
      ],

      practice: [
        {
          title: 'Linked List Cycle II — Find Cycle Start',
          difficulty: 'Medium',
          description: 'Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null. Do not modify the linked list. Solve in O(n) time and O(1) space.',
          hint: 'Use Floyd\'s two-phase approach: Phase 1 detects the meeting point. Phase 2 resets one pointer to head and advances both at speed 1.',
          approach: 'Phase 1: slow moves 1 step, fast moves 2 steps until they meet (or fast reaches null). Phase 2: Reset slow to head. Advance both slow and fast by 1 step until they meet again. The meeting point is the cycle start. Mathematical basis: a = nC - b.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
        },
        {
          title: 'Find the Duplicate Number',
          difficulty: 'Hard',
          description: 'Given an array nums of n+1 integers where each integer is between 1 and n (inclusive), there is exactly one repeated number. Find it without modifying the array and using only O(1) extra space.',
          hint: 'Treat the array as an implicit linked list where index i points to nums[i]. The duplicate creates a cycle, and the cycle entrance is the duplicate number.',
          approach: 'Phase 1: slow = nums[slow], fast = nums[nums[fast]]. Find meeting point. Phase 2: Reset slow = nums[0]. Advance both by 1 step (slow = nums[slow], fast = nums[fast]). They meet at the duplicate. This works because the duplicate value is pointed to by two different indices — creating a cycle entrance.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
        },
        {
          title: 'Happy Number',
          difficulty: 'Easy',
          description: 'Determine if a number is "happy". A happy number is defined by: starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat. If it reaches 1, it is happy. If it loops endlessly in a cycle that does not include 1, it is not.',
          hint: 'The sequence of digit-square-sums forms an implicit linked list. Either it reaches 1 (no cycle) or it enters a cycle. Use Floyd\'s to detect which.',
          approach: 'Define next(n) = sum of squares of digits of n. Use slow = next(slow), fast = next(next(fast)). If fast reaches 1, return true. If slow == fast and slow != 1, return false (cycle detected).',
          timeComplexity: 'O(log n) — the number of digits decreases rapidly',
          spaceComplexity: 'O(1)',
        },
        {
          title: 'Intersection of Two Linked Lists',
          difficulty: 'Easy',
          description: 'Given the heads of two singly linked lists headA and headB, return the node at which the two lists intersect. If the two lists have no intersection, return null. The lists must retain their original structure after the function returns.',
          hint: 'Two pointers starting at headA and headB. When one reaches null, redirect it to the OTHER list\'s head. They will meet at the intersection (or both reach null).',
          approach: 'ptrA starts at headA, ptrB starts at headB. Advance both by 1. When ptrA reaches null, reset to headB. When ptrB reaches null, reset to headA. They meet at intersection because both travel len(A)+len(B) total distance. If no intersection, they both reach null at the same time.',
          timeComplexity: 'O(m + n) where m and n are list lengths',
          spaceComplexity: 'O(1)',
        },
      ],

      takeaways: [
        'Fast-slow pointer: slow moves 1 step, fast moves 2 steps — the fundamental technique',
        'Cycle detection: if slow and fast meet, a cycle exists. If fast hits null, no cycle',
        'Why they meet: inside the cycle, the gap decreases by exactly 1 per step — guaranteed collision',
        'Cycle start: after detection, reset one to head, advance both at speed 1 — they meet at the cycle entry',
        'Mathematical proof: a = nC - b, so walking "a" from the meeting point equals walking "a" from head',
        'Middle node: when fast reaches the end, slow is at the middle — used in merge sort splits',
        'Happy Number: the digit-square-sum sequence forms an implicit linked list — Floyd\'s detects if it cycles',
        'Find Duplicate Number: treat array indices as nodes, values as next pointers — duplicate = cycle entry',
        'Intersection: both pointers traverse len(A) + len(B) by switching lists at null — they synchronize',
        'All Floyd\'s variants: O(n) time, O(1) space — the key advantage over HashSet approaches',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. LINKED LIST REVERSAL
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'reversal',
    title: 'Linked List Reversal',
    icon: '🔃',
    estimatedTime: '45 min',
    content: {
      hook: {
        question: 'Can you reverse a linked list in-place using only three pointer variables and a single pass?',
        answer: 'Yes! The three-pointer technique uses prev, curr, and next to reverse each link as you traverse. At each step: save next, point curr backward, advance prev and curr. One pass, O(1) space.',
        concept: 'Iterative Reversal',
        icon: '🔃',
      },

      keyIdea: {
        title: 'Reverse the Arrows, Not the Data',
        description: 'Linked list reversal means redirecting every next pointer to point to the previous node instead of the next one. We never move data between nodes — we only change where the pointers aim. The old head becomes the new tail (next = null), and the old tail becomes the new head.',
      },

      prose: [
        'Reversing a linked list is the single most frequently asked linked list interview question. It appears directly or as a subroutine in dozens of other problems: palindrome check, reverse in groups of K, add two numbers represented as lists, and more. There are two fundamental approaches: iterative (three-pointer technique) and recursive (call stack unwinding). You must know both cold.',

        'The iterative approach uses three pointers: prev (initially null), curr (initially head), and next (a temporary variable). At each step: (1) Save curr.next in next (so we don\'t lose the rest of the list). (2) Point curr.next = prev (reverse the link). (3) Advance prev = curr. (4) Advance curr = next. When curr becomes null, prev points to the new head (the old tail). This processes every node exactly once: O(n) time, O(1) space.',

        'Let\'s trace through a detailed dry run. Given list: 1→2→3→4→null. Initial: prev=null, curr=1. Step 1: next=2, 1.next=null, prev=1, curr=2. Now: null←1  2→3→4. Step 2: next=3, 2.next=1, prev=2, curr=3. Now: null←1←2  3→4. Step 3: next=4, 3.next=2, prev=3, curr=4. Now: null←1←2←3  4→null. Step 4: next=null, 4.next=3, prev=4, curr=null. Done! New head = prev = 4. Result: 4→3→2→1→null.',

        'The recursive approach is more elegant but uses O(n) stack space. Base case: if head is null or head.next is null, return head. Recursive step: reverse the rest of the list starting from head.next. After recursion returns, head.next.next = head (make the next node point back to current). Then head.next = null (current node becomes the new tail of its sub-list). Return the new head (which is the recursively returned value, always the last node of the original list).',

        'Recursive dry run for 1→2→3→null: Call reverse(1). Recurse: reverse(2). Recurse: reverse(3). Base case: 3 has no next, return 3. Back in reverse(2): newHead=3. Set 2.next.next = 2 → 3.next=2. Set 2.next=null. Return 3. Now: 3→2→null. Back in reverse(1): newHead=3. Set 1.next.next = 1 → 2.next=1. Set 1.next=null. Return 3. Final: 3→2→1→null. New head = 3.',

        'Reverse in Groups of K is a medium-hard problem that extends basic reversal. Given a linked list and integer k, reverse every group of k nodes. If the remaining nodes are fewer than k, leave them as-is. The approach: iterate through the list in chunks of k. For each chunk, reverse k nodes using the iterative technique, then connect the reversed chunk to the next chunk. Track the tail of the previous group to link groups together.',

        'Reverse Between Positions m and n (LeetCode #92) requires reversing only a sublist. The approach: (1) Traverse to position m-1 to find the node BEFORE the reversal start (call it "pre"). (2) Reverse nodes from position m to n using the iterative technique. (3) Connect: pre.next = new start of reversed section, and old start.next = node after position n. This requires careful pointer tracking but is O(n) time and O(1) space.',

        'A common variant is checking if a linked list is a palindrome. The optimal O(n) time, O(1) space approach: find the middle using fast-slow pointers, reverse the second half, compare the two halves node by node, then optionally reverse the second half again to restore the original list. This combines three techniques: fast-slow pointer, reversal, and comparison.',

        'In interviews, reversal problems test your ability to manipulate pointers without losing references. The most common bug is forgetting to save "next" before overwriting curr.next, which loses the rest of the list. Another common bug is not correctly handling the new tail (the old head must have its next set to null in the iterative approach, or you create a cycle). Practice drawing pointer diagrams for each step — this is how top candidates debug pointer logic in real time.',

        'Reversal is also the basis of advanced techniques: reversing a doubly linked list (swap prev and next for each node), reversing an alternating k-group, and the "reverse and compare" pattern for symmetry checking. Once you master the three-pointer iterative technique and the recursive unwinding approach, all these variants become straightforward extensions.',
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `// Iterative Linked List Reversal — C++ (Three-Pointer Technique)
// The most important linked list algorithm. O(n) time, O(1) space.

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseIterative(ListNode* head) {
    ListNode* prev = nullptr;   // Will become the new head
    ListNode* curr = head;      // Current node being processed
    ListNode* next = nullptr;   // Temporary: saves the next node

    while (curr != nullptr) {
        next = curr->next;    // 1. Save next (don't lose the chain!)
        curr->next = prev;    // 2. Reverse the link
        prev = curr;          // 3. Advance prev
        curr = next;          // 4. Advance curr
    }
    return prev;  // prev is now the new head (old tail)
}

/*
 * DETAILED DRY RUN — 1 → 2 → 3 → 4 → NULL
 *
 * Initial:  prev=NULL, curr=1, next=?
 *
 * Iteration 1:
 *   next = 2            (save 1's next)
 *   1->next = NULL      (reverse: 1 now points backward)
 *   prev = 1            (prev advances to 1)
 *   curr = 2            (curr advances to 2)
 *   State: NULL ← 1   2 → 3 → 4 → NULL
 *          prev       curr
 *
 * Iteration 2:
 *   next = 3            (save 2's next)
 *   2->next = 1         (reverse: 2 now points to 1)
 *   prev = 2            (prev advances to 2)
 *   curr = 3            (curr advances to 3)
 *   State: NULL ← 1 ← 2   3 → 4 → NULL
 *                   prev   curr
 *
 * Iteration 3:
 *   next = 4            (save 3's next)
 *   3->next = 2         (reverse: 3 now points to 2)
 *   prev = 3            (prev advances to 3)
 *   curr = 4            (curr advances to 4)
 *   State: NULL ← 1 ← 2 ← 3   4 → NULL
 *                        prev   curr
 *
 * Iteration 4:
 *   next = NULL          (save 4's next)
 *   4->next = 3          (reverse: 4 now points to 3)
 *   prev = 4             (prev advances to 4)
 *   curr = NULL           (curr advances to NULL)
 *   State: NULL ← 1 ← 2 ← 3 ← 4
 *                              prev   curr=NULL
 *
 * Return prev = 4 (new head)
 * Result: 4 → 3 → 2 → 1 → NULL ✓
 */`,
          explanation: 'The three-pointer technique is the gold standard for iterative reversal. Memorize the four steps: save next, reverse link, advance prev, advance curr. The dry run shows exactly how pointers move at each step — draw this on paper during interviews.',
        },
        {
          language: 'javascript',
          code: `// Iterative Reversal — JavaScript
// Clean implementation with edge case handling

function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next;   // Save next
    curr.next = prev;         // Reverse link
    prev = curr;              // Advance prev
    curr = next;              // Advance curr
  }
  return prev;  // New head
}

// Reverse between positions m and n (1-indexed)
// Example: 1→2→3→4→5, m=2, n=4 → 1→4→3→2→5
function reverseBetween(head, m, n) {
  if (m === n) return head;

  const dummy = { val: 0, next: head };  // Dummy node for edge case m=1
  let pre = dummy;

  // Step 1: Move pre to the node BEFORE position m
  for (let i = 1; i < m; i++) {
    pre = pre.next;
  }

  // Step 2: Reverse from m to n using iterative technique
  let curr = pre.next;        // Node at position m
  let prev = null;

  for (let i = 0; i < n - m + 1; i++) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Step 3: Connect the reversed section
  // pre.next is still pointing to the old m-th node (now the tail of reversed section)
  pre.next.next = curr;   // old m-th node → node after position n
  pre.next = prev;         // pre → new head of reversed section (old n-th node)

  return dummy.next;
}

/*
 * DRY RUN — reverseBetween(1→2→3→4→5, m=2, n=4):
 *
 * After Step 1: pre = node(1)
 * Step 2 reverses nodes 2,3,4:
 *   Before: 2→3→4    After: 4→3→2
 * Step 3 connects:
 *   pre.next.next = node(5)  → 2→5
 *   pre.next = node(4)       → 1→4
 * Result: 1→4→3→2→5 ✓
 */`,
          explanation: 'reverseBetween uses a dummy node to handle the edge case where m=1 (reversing from the head). The three-step approach: traverse to pre, reverse the sublist, reconnect. The dummy node technique is reused across many linked list problems.',
        },
        {
          language: 'python',
          code: `# Recursive Linked List Reversal — Python
# Elegant but uses O(n) stack space

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_recursive(head: ListNode) -> ListNode:
    """
    Recursive reversal: reverse the rest, then fix the current link.
    
    Base case: empty list or single node → return as-is
    Recursive case:
      1. Recursively reverse everything after head
      2. head.next.next = head  (the node after head points BACK to head)
      3. head.next = None       (head becomes the new tail of its sub-problem)
      4. Return newHead (propagated from the base case — always the last node)
    """
    # Base case
    if head is None or head.next is None:
        return head
    
    # Recurse on the rest of the list
    new_head = reverse_recursive(head.next)
    
    # After recursion: the rest is reversed, head.next is the LAST
    # node of the reversed portion (it still points to head.next)
    head.next.next = head   # Make next node point back to current
    head.next = None         # Current node is now a tail
    
    return new_head          # Always the original tail node

"""
CALL STACK UNWINDING — reverse_recursive(1→2→3→null):

Call 1: reverse(1)
  Call 2: reverse(2)
    Call 3: reverse(3)
      Base case: 3.next is None, return 3
    Back in Call 2: new_head = 3
      2.next.next = 2  →  3.next = 2   (3 now points to 2)
      2.next = None     →  2 is now a tail
      State: 3 → 2 → None
      Return 3
  Back in Call 1: new_head = 3
    1.next.next = 1  →  2.next = 1   (2 now points to 1)
    1.next = None     →  1 is now a tail
    State: 3 → 2 → 1 → None
    Return 3

Final result: 3 → 2 → 1 → None, new_head = 3 ✓
"""`,
          explanation: 'Recursion processes the list from tail to head (due to call stack unwinding). The key insight: after the recursive call returns, head.next is the LAST node of the already-reversed sublist. Setting head.next.next = head makes that last node point back to the current node, extending the reversed chain by one.',
        },
        {
          language: 'java',
          code: `// Recursive Reversal + Reverse in K-Groups — Java

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

class Solution {
    // Simple recursive reversal
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }

    // Reverse Nodes in K-Groups (LeetCode #25 — Hard)
    // Given: 1→2→3→4→5, k=3
    // Output: 3→2→1→4→5 (only first group of 3 is reversed)
    public ListNode reverseKGroup(ListNode head, int k) {
        // Step 1: Check if we have k nodes to reverse
        ListNode check = head;
        for (int i = 0; i < k; i++) {
            if (check == null) return head;  // Less than k nodes, don't reverse
            check = check.next;
        }

        // Step 2: Reverse first k nodes (iterative)
        ListNode prev = null;
        ListNode curr = head;
        for (int i = 0; i < k; i++) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        // After reversal: prev = new head of this group
        //                 curr = head of next group (to be processed)
        //                 head = old head = new TAIL of this group

        // Step 3: Recursively reverse next k-group
        // head is now the tail of the reversed group
        head.next = reverseKGroup(curr, k);

        return prev;  // prev is the new head of this group
    }
}

/*
 * DRY RUN — reverseKGroup(1→2→3→4→5, k=3):
 *
 * Call 1: head=1, check passes (3 nodes available)
 *   Reverse 1→2→3: prev=3, curr=4, head=1 (now tail)
 *   head.next = reverseKGroup(4→5, k=3)
 *     Call 2: head=4, check FAILS at 3rd iteration (only 2 nodes)
 *     Return 4 (unchanged: 4→5)
 *   head.next = 4  →  1→4→5
 *   Return prev=3  →  3→2→1→4→5 ✓
 */`,
          explanation: 'reverseKGroup combines iterative reversal of k nodes with recursion to process subsequent groups. The key insight: after reversing k nodes, the original head becomes the tail of the reversed group, so head.next should link to the result of recursively reversing the remaining list. If fewer than k nodes remain, return unchanged.',
        },
        {
          language: 'cpp',
          code: `// Palindrome Linked List Check — Combines reversal + fast-slow pointer
// O(n) time, O(1) space

bool isPalindrome(ListNode* head) {
    if (head == nullptr || head->next == nullptr) return true;

    // Step 1: Find middle using fast-slow pointer
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast->next != nullptr && fast->next->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    // slow is now at the end of the first half
    // For odd length: slow is the exact middle
    // For even length: slow is the last node of the first half

    // Step 2: Reverse the second half
    ListNode* secondHalf = reverseIterative(slow->next);
    slow->next = nullptr;  // Split the list

    // Step 3: Compare first half and reversed second half
    ListNode* p1 = head;
    ListNode* p2 = secondHalf;
    bool result = true;
    while (p2 != nullptr) {
        if (p1->val != p2->val) {
            result = false;
            break;
        }
        p1 = p1->next;
        p2 = p2->next;
    }

    // Step 4 (Optional): Restore the list by reversing second half back
    slow->next = reverseIterative(secondHalf);

    return result;
}

/*
 * DRY RUN — isPalindrome(1→2→3→2→1):
 *
 * Step 1 (Find middle): slow=3, fast=1(last)
 * Step 2 (Reverse second half): 2→1 becomes 1→2
 * Step 3 (Compare):
 *   First half:  1→2→3
 *   Second half: 1→2
 *   Compare: 1==1 ✓, 2==2 ✓, p2=null → STOP
 *   Result: true ✓
 *
 * DRY RUN — isPalindrome(1→2→3→4):
 *   First half:  1→2
 *   Second half (reversed): 4→3
 *   Compare: 1!=4 → false ✓
 */`,
          explanation: 'This problem combines three techniques: fast-slow pointer (find middle), iterative reversal (reverse second half), and two-pointer comparison. Restoring the list in Step 4 is a best practice that shows engineering maturity — interviewers appreciate it even if not explicitly asked.',
        },
      ],

      callouts: [
        {
          type: 'important',
          title: 'Pointer Movement Visualization — Iterative Reversal',
          body: 'At every step, think of it as "picking up" the current node and placing it at the front of the reversed section. Step 1: save the road ahead (next = curr.next). Step 2: turn the car around (curr.next = prev). Step 3-4: drive forward (prev = curr, curr = next). The key insight: you\'re building the reversed list from left to right, one node at a time.',
        },
        {
          type: 'warning',
          title: 'The #1 Reversal Bug: Losing the Chain',
          body: 'If you write "curr.next = prev" BEFORE saving "next = curr.next", you lose the entire rest of the list. The rest of the chain becomes unreachable garbage. ALWAYS save next first. This bug is silent — no crash, just a shortened list that\'s hard to debug.',
        },
        {
          type: 'tip',
          title: 'Dummy Node for reverseBetween',
          body: 'When reversing between positions m and n, use a dummy node before head: dummy.next = head. This handles the edge case where m=1 (reversing from the very first node) without special-case code. Return dummy.next as the new head. This technique applies to ALL linked list problems with head-modification edge cases.',
        },
        {
          type: 'note',
          title: 'Recursive vs Iterative Trade-off',
          body: 'Iterative: O(1) space, slightly more code, explicit pointer management. Recursive: O(n) stack space, cleaner code, implicit pointer management via call stack. In interviews, mention both and explain the space trade-off. For production code, iterative is preferred to avoid stack overflow on large lists.',
        },
      ],

      interviewPerspective: {
        title: 'Reversal Interview Checklist',
        checklist: [
          'Reverse a linked list (iterative) is asked in 70%+ of linked list interviews — write it in under 2 minutes',
          'Know BOTH iterative (O(1) space) and recursive (O(n) space) approaches and their trade-offs',
          'For "reverse in K groups" (LeetCode #25, Hard): check if k nodes exist, reverse them iteratively, recurse on the rest',
          'For "reverse between m and n" (LeetCode #92): use a dummy node, traverse to position m-1, reverse n-m+1 nodes, reconnect',
          'Palindrome check combines fast-slow pointer + reversal — a classic combo problem',
          'Draw pointer diagrams on the whiteboard — this is expected and shows clear thinking',
          'Edge cases: empty list, single node, two nodes, already reversed list',
          'Always restore the list if the problem says "do not modify" — reverse the second half back after checking',
          'Reversal is a subroutine in: Add Two Numbers II, Reorder List, Rotate List, and many more',
        ],
      },

      mistakes: [
        {
          title: 'Not saving next before reversing the link',
          description: 'Writing "curr.next = prev" before "next = curr.next" permanently loses the rest of the list. The remaining nodes become unreachable. This is the most common reversal bug and produces silent incorrect output rather than a crash, making it tricky to debug.',
        },
        {
          title: 'Returning head instead of prev after iterative reversal',
          description: 'After the while loop, "head" still points to the FIRST node of the original list (which is now the tail). The new head is "prev" — the last node processed. Returning head gives you just the tail node with next = null.',
        },
        {
          title: 'Forgetting to set head.next = null in recursive reversal',
          description: 'In the recursive approach, if you skip "head.next = null", the original head still points to the second node. But the second node now points BACK to head (from head.next.next = head). This creates a cycle between the last two nodes, causing infinite loops.',
        },
        {
          title: 'Off-by-one errors in reverse between m and n',
          description: 'Counting positions incorrectly leads to reversing one too many or too few nodes. Use 1-indexed positions consistently and loop exactly (n - m + 1) times for the reversal. Test with m=1 (head reversal) and m=n (no reversal) as edge cases.',
        },
        {
          title: 'Not using a dummy node for reverseBetween with m=1',
          description: 'When m=1, the head itself changes. Without a dummy node, you need special-case code to handle this. A dummy node (dummy.next = head) provides a stable anchor and lets you treat m=1 the same as any other position.',
        },
      ],

      practice: [
        {
          title: 'Reverse Linked List',
          difficulty: 'Easy',
          description: 'Given the head of a singly linked list, reverse the list and return the reversed list. Implement both iterative and recursive solutions.',
          hint: 'Iterative: use prev, curr, next pointers. At each step: save next, reverse link, advance. Recursive: reverse the rest, then fix the current link.',
          approach: 'Iterative: prev=null, curr=head. While curr: save next, curr.next=prev, prev=curr, curr=next. Return prev. Recursive: base case head==null or head.next==null return head. Recurse on head.next. Set head.next.next=head, head.next=null. Return newHead.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1) iterative, O(n) recursive',
        },
        {
          title: 'Reverse Nodes in k-Group',
          difficulty: 'Hard',
          description: 'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer ≤ length of the list. If the number of nodes is not a multiple of k, the remaining nodes at the end should remain as-is. You may not alter the values, only the nodes themselves.',
          hint: 'First check if k nodes are available. If yes, reverse them iteratively. Connect the tail of the reversed group to the result of recursively processing the next group.',
          approach: 'Count k nodes from current position. If fewer than k exist, return head unchanged. Otherwise, reverse k nodes iteratively (standard three-pointer). After reversal, the original head is now the tail of the group. Set head.next = reverseKGroup(remaining, k). Return prev (new head of this group).',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n/k) for recursion stack',
        },
        {
          title: 'Reverse Linked List II (Between Positions m and n)',
          difficulty: 'Medium',
          description: 'Given the head of a singly linked list and two integers m and n where m ≤ n, reverse the nodes of the list from position m to position n, and return the reversed list.',
          hint: 'Use a dummy node. Traverse to the node before position m. Reverse (n-m+1) nodes. Reconnect: the node before m → new start, the old m-th node → the node after n.',
          approach: 'Create dummy node, dummy.next = head. Traverse to node at position m-1 (call it "pre"). Save pre.next as "start" (the m-th node). Reverse (n-m+1) nodes starting from "start" using iterative technique. Connect: start.next = curr (node after n). pre.next = prev (new head of reversed section). Return dummy.next.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
        },
      ],

      takeaways: [
        'Iterative reversal: prev=null, curr=head. Loop: save next, reverse link, advance prev, advance curr. Return prev.',
        'ALWAYS save curr.next before reversing — losing the chain is the #1 reversal bug',
        'Recursive reversal: reverse the rest, then head.next.next = head, head.next = null, return newHead',
        'Iterative is O(1) space; recursive is O(n) space due to the call stack — mention this trade-off in interviews',
        'Reverse K-Group: check k nodes exist → reverse them iteratively → recurse on remaining → connect tail to recursive result',
        'Reverse Between m and n: use a dummy node, traverse to m-1, reverse n-m+1 nodes, reconnect both ends',
        'Palindrome check = find middle (fast-slow) + reverse second half + compare — the ultimate combo problem',
        'Draw pointer diagrams on paper — this is expected during whiteboard interviews',
        'Reversal appears as a subroutine in 20+ other linked list problems — master it and many problems unlock',
      ],
    },
  },
];
