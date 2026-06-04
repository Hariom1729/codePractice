import type { Section } from './types';

export const llPart2Sections: Section[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 6. INSERTION OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'insertion',
    title: 'Insertion Operations',
    icon: '➕',
    estimatedTime: '40 min',
    content: {
      keyIdea: {
        title: 'Pointer Rewiring, Not Shifting',
        description: 'Unlike arrays where insertion requires shifting elements, linked list insertion only involves creating a new node and rewiring 1-2 pointers. This makes insertion O(1) at known positions — the fundamental advantage of linked lists over arrays.',
      },

      prose: [
        'Insertion is the most important operation to master in linked lists. Every other operation — deletion, reversal, merging — builds on your ability to correctly rewire pointers when adding nodes. There are five distinct insertion scenarios, each with different pointer mechanics and edge cases. Understanding all five gives you the complete toolkit for any linked list interview problem.',

        '**Insert at Beginning (prepend):** This is the simplest and most common insertion. You create a new node, point its `next` to the current head, then update `head` to point to the new node. The order of operations is critical — if you update `head` first, you lose access to the rest of the list. This operation is always O(1) because you never traverse the list. It works even on an empty list: the new node\'s `next` will be `null`, and `head` will point to the new node.',

        'Visually, inserting at the beginning looks like this: Suppose your list is [10 → 20 → 30]. You want to insert 5. Step 1: Create node with data=5. Step 2: Set newNode.next = head (newNode now points to 10). Step 3: Set head = newNode. The list is now [5 → 10 → 20 → 30]. Notice that no existing node was modified except the head pointer itself. This is why prepend is blazing fast.',

        '**Insert at End (append):** Appending requires traversing the entire list to find the last node (the one whose `next` is `null`), then setting that last node\'s `next` to the new node. This is O(n) without a tail pointer. If you maintain a `tail` pointer, append becomes O(1) — you simply set `tail.next = newNode` and update `tail = newNode`. Most production linked list implementations maintain a tail pointer for this reason.',

        'The edge case for append is an empty list. When `head` is `null`, there is no "last node" to attach to — the new node becomes both the head and the tail. Always check for this case first. A common interview bug is attempting to traverse from `head` when `head` is `null`, causing a null pointer dereference.',

        '**Insert at Position (index-based):** To insert at position `k`, you must walk `k-1` steps from the head to find the node just BEFORE the target position. Then you rewire: `newNode.next = current.next` and `current.next = newNode`. Position 0 is equivalent to insert at beginning. Position equal to the list length is equivalent to insert at end. Any position beyond the list length should be treated as an error or clamped.',

        '**Insert After a Given Node:** When you already have a reference to a node, inserting after it is O(1). Set `newNode.next = givenNode.next`, then `givenNode.next = newNode`. This is the simplest rewiring pattern because you don\'t need to find a predecessor. This pattern appears constantly in interview problems where you are given a pointer to a specific node and asked to insert after it.',

        '**Insert Before a Given Node:** This is the trickiest insertion in a singly linked list because you need the predecessor, but singly linked nodes don\'t have a `prev` pointer. You must traverse from the head to find the node whose `next` points to the given node. This makes it O(n). There is a clever O(1) trick: copy the given node\'s data into the new node, insert the new node AFTER the given node, then overwrite the given node\'s data with the value you want to insert. This effectively "inserts before" without traversal.',

        'The pointer rewiring order matters enormously. The golden rule is: always connect the new node to the rest of the list BEFORE disconnecting any existing connections. If you break an existing link first, you lose the reference to the rest of the list. Think of it like a relay race — the new runner must grab the baton before the current runner lets go.',

        'A subtle but critical point: in languages without garbage collection (C, C++), every call to `new` must eventually have a matching `delete`. In languages with GC (JavaScript, Java, Python), the garbage collector handles deallocation, but you should still understand that unreferenced nodes will be collected. In interviews, always mention memory management awareness — it signals senior-level thinking.',
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// ── Insert at Beginning ──
void insertAtBeginning(Node*& head, int val) {
    Node* newNode = new Node(val);
    newNode->next = head;  // Point new node to current head
    head = newNode;        // Update head to new node
}
// Time: O(1) | Space: O(1)
// Works even if head is nullptr (empty list)`,
          explanation: 'Insert at beginning in C++. Note the reference to pointer (Node*&) so the caller\'s head is updated. newNode->next is set BEFORE head is reassigned — this order is critical.',
        },
        {
          language: 'javascript',
          code: `class Node {
  constructor(val) {
    this.data = val;
    this.next = null;
  }
}

// ── Insert at Beginning ──
function insertAtBeginning(head, val) {
  const newNode = new Node(val);
  newNode.next = head;  // Link new node to current head
  return newNode;       // New node IS the new head
}

// Usage:
// let head = null;
// head = insertAtBeginning(head, 10); // [10]
// head = insertAtBeginning(head, 20); // [20 → 10]
// head = insertAtBeginning(head, 30); // [30 → 20 → 10]`,
          explanation: 'In JavaScript, we return the new head since JS doesn\'t have pass-by-reference for primitives. The caller must reassign: head = insertAtBeginning(head, val).',
        },
        {
          language: 'cpp',
          code: `// ── Insert at End (without tail pointer) ──
void insertAtEnd(Node*& head, int val) {
    Node* newNode = new Node(val);
    if (head == nullptr) {     // Empty list
        head = newNode;
        return;
    }
    Node* current = head;
    while (current->next != nullptr) {  // Walk to last node
        current = current->next;
    }
    current->next = newNode;  // Attach new node at end
}
// Time: O(n) — must traverse entire list
// Space: O(1)

// ── Insert at End (WITH tail pointer — O(1)) ──
void insertAtEndWithTail(Node*& head, Node*& tail, int val) {
    Node* newNode = new Node(val);
    if (head == nullptr) {
        head = tail = newNode;
        return;
    }
    tail->next = newNode;  // Attach after current tail
    tail = newNode;        // Update tail pointer
}
// Time: O(1) | Space: O(1)`,
          explanation: 'Two versions of append: O(n) without tail pointer (traverse to find last node) and O(1) with tail pointer. The tail pointer version is what production code uses.',
        },
        {
          language: 'javascript',
          code: `// ── Insert at End ──
function insertAtEnd(head, val) {
  const newNode = new Node(val);
  if (head === null) return newNode;  // Empty list

  let current = head;
  while (current.next !== null) {  // Walk to last node
    current = current.next;
  }
  current.next = newNode;  // Attach at end
  return head;  // Head unchanged
}

// ── Insert at Position (0-indexed) ──
function insertAtPosition(head, val, position) {
  const newNode = new Node(val);

  if (position === 0) {           // Insert at beginning
    newNode.next = head;
    return newNode;
  }

  let current = head;
  for (let i = 0; i < position - 1; i++) {  // Walk to node BEFORE position
    if (current === null) throw new Error('Position out of bounds');
    current = current.next;
  }
  if (current === null) throw new Error('Position out of bounds');

  newNode.next = current.next;   // New node points to next node
  current.next = newNode;        // Previous node points to new node
  return head;
}

// Usage:
// head = insertAtPosition(head, 99, 2);
// Inserts 99 at index 2`,
          explanation: 'Insert at end traverses to the last node. Insert at position walks (position - 1) steps to find the predecessor, then rewires. Both handle the empty list edge case.',
        },
        {
          language: 'cpp',
          code: `// ── Insert at Position (0-indexed) ──
void insertAtPosition(Node*& head, int val, int position) {
    if (position == 0) {
        insertAtBeginning(head, val);
        return;
    }

    Node* newNode = new Node(val);
    Node* current = head;

    // Walk to the node just BEFORE the target position
    for (int i = 0; i < position - 1 && current != nullptr; i++) {
        current = current->next;
    }

    if (current == nullptr) {
        delete newNode;  // Clean up — position out of bounds
        throw std::out_of_range("Position exceeds list length");
    }

    // Rewire: newNode slides in between current and current->next
    newNode->next = current->next;
    current->next = newNode;
}
// Time: O(k) where k = position | Space: O(1)

// ── Insert After a Given Node ──
void insertAfter(Node* givenNode, int val) {
    if (givenNode == nullptr) return;
    Node* newNode = new Node(val);
    newNode->next = givenNode->next;  // New node inherits successor
    givenNode->next = newNode;        // Given node points to new node
}
// Time: O(1) | Space: O(1)`,
          explanation: 'Insert at position delegates to insertAtBeginning for position 0. For other positions, it walks to the predecessor and rewires. Insert after is the simplest — just two pointer assignments.',
        },
        {
          language: 'cpp',
          code: `// ── Insert Before a Given Node (O(n) — find predecessor) ──
void insertBefore(Node*& head, Node* givenNode, int val) {
    if (head == nullptr || givenNode == nullptr) return;

    // Special case: inserting before head
    if (head == givenNode) {
        insertAtBeginning(head, val);
        return;
    }

    Node* current = head;
    while (current->next != nullptr && current->next != givenNode) {
        current = current->next;
    }

    if (current->next == nullptr) return;  // givenNode not found

    Node* newNode = new Node(val);
    newNode->next = givenNode;
    current->next = newNode;
}
// Time: O(n) | Space: O(1)

// ── Insert Before — O(1) Trick (swap data) ──
void insertBeforeO1(Node* givenNode, int val) {
    if (givenNode == nullptr) return;
    Node* newNode = new Node(givenNode->data);  // Copy given node's data
    newNode->next = givenNode->next;            // New node takes given's successor
    givenNode->next = newNode;                  // Given node points to new node
    givenNode->data = val;                      // Overwrite given node with new value
}
// Time: O(1) | Space: O(1)
// Trick: the "given node" effectively becomes the new node`,
          explanation: 'Two approaches for insert before. The standard O(n) approach finds the predecessor by traversal. The clever O(1) trick copies data and inserts after, effectively simulating insert-before without traversal. Interviewers love the O(1) trick.',
        },
        {
          language: 'javascript',
          code: `// ── Insert After a Given Node ──
function insertAfter(givenNode, val) {
  if (givenNode === null) return;
  const newNode = new Node(val);
  newNode.next = givenNode.next;
  givenNode.next = newNode;
}
// Time: O(1) | Space: O(1)

// ── Insert Before a Given Node ──
function insertBefore(head, givenNode, val) {
  if (!head || !givenNode) return head;

  // Special case: insert before head
  if (head === givenNode) {
    const newNode = new Node(val);
    newNode.next = head;
    return newNode;
  }

  let current = head;
  while (current.next && current.next !== givenNode) {
    current = current.next;
  }
  if (!current.next) return head;  // givenNode not found

  const newNode = new Node(val);
  newNode.next = givenNode;
  current.next = newNode;
  return head;
}

// ── O(1) Insert Before Trick ──
function insertBeforeO1(givenNode, val) {
  if (!givenNode) return;
  const newNode = new Node(givenNode.data);
  newNode.next = givenNode.next;
  givenNode.next = newNode;
  givenNode.data = val;  // Swap data to simulate "before"
}`,
          explanation: 'JavaScript versions of insert after and insert before. The O(1) trick works by copying the existing node\'s data into a new node placed after it, then overwriting the original with the desired value.',
        },
      ],

      complexityTable: [
        { operation: 'Insert at Beginning', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Just rewire head pointer' },
        { operation: 'Insert at End (no tail)', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Must traverse entire list' },
        { operation: 'Insert at End (with tail)', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Direct access via tail pointer' },
        { operation: 'Insert at Position k', best: 'O(1)', average: 'O(k)', worst: 'O(n)', space: 'O(1)', notes: 'Walk k-1 steps to predecessor' },
        { operation: 'Insert After Given Node', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Direct pointer rewiring' },
        { operation: 'Insert Before Given Node', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'O(1) possible with data swap trick' },
      ],

      callouts: [
        {
          type: 'tip',
          title: 'Dry Run Every Insertion',
          body: 'Before writing code, draw 3 boxes on paper: an empty list, a single-node list, and a 3-node list. Walk through your insertion logic on all three. If it works on all three cases, it will work on any list. This is the fastest way to catch edge case bugs.',
        },
        {
          type: 'warning',
          title: 'Pointer Order Matters!',
          body: 'Always connect the new node to the rest of the list BEFORE breaking any existing link. Wrong order: current.next = newNode (now you lost everything after current!). Right order: newNode.next = current.next, THEN current.next = newNode.',
        },
        {
          type: 'note',
          title: 'The Dummy Node Pattern',
          body: 'Many interview solutions use a "dummy" or "sentinel" node before the head to eliminate edge cases for insertion at the beginning. Create dummy with dummy.next = head, perform operations, then return dummy.next as the new head. This avoids special-casing position 0.',
        },
      ],

      interviewPerspective: {
        title: 'What Interviewers Look For in Insertion Problems',
        checklist: [
          'Handle the empty list case (head === null) before doing anything else',
          'Know the O(1) insert-before trick using data swap — it shows creative problem solving',
          'Always mention maintaining a tail pointer for O(1) append when discussing design',
          'Explain why you set newNode.next BEFORE updating the previous node\'s next',
          'Mention the dummy node technique for simplifying edge cases',
          'In C++, discuss memory allocation (new) and ownership (who calls delete?)',
          'Be aware that insert at position 0 is a special case that changes the head',
          'Know that insert after is O(1) but insert before is O(n) in singly linked lists',
        ],
      },

      mistakes: [
        { title: 'Breaking the chain before linking', description: 'Setting current.next = newNode before setting newNode.next = current.next. This disconnects everything after current, causing data loss. Always link forward first.' },
        { title: 'Not handling empty list', description: 'Attempting to traverse from head when head is null. For insert at end, check if head is null first and make the new node the head.' },
        { title: 'Off-by-one in position insertion', description: 'Walking to position instead of position-1. You need the node BEFORE the target position to rewire its next pointer. Walking one step too many means you can\'t insert at the correct spot.' },
        { title: 'Forgetting to update head', description: 'When inserting at position 0, the head must change. If your function doesn\'t return the new head (JS) or use a reference (C++), the caller\'s head still points to the old first node.' },
        { title: 'Memory leak in C++', description: 'Creating a new node but not deleting it if insertion fails (e.g., position out of bounds). Always clean up allocated memory on error paths.' },
      ],

      takeaways: [
        'Insert at beginning is O(1) — create node, point to head, update head',
        'Insert at end is O(n) without tail, O(1) with tail pointer',
        'Insert at position k requires walking k-1 steps to the predecessor',
        'Insert after a node is O(1) — the simplest rewiring pattern',
        'Insert before a node is O(n) in SLL, but O(1) with the data-swap trick',
        'Always link the new node forward before breaking existing links',
        'Empty list and single-node list are the most common edge cases',
        'The dummy node pattern eliminates head-change edge cases in interviews',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. DELETION OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'deletion',
    title: 'Deletion Operations',
    icon: '🗑️',
    estimatedTime: '35 min',
    content: {
      keyIdea: {
        title: 'Bypass and Deallocate',
        description: 'Deleting a node from a linked list means making its predecessor point directly to its successor, effectively "bypassing" the deleted node. In languages without garbage collection, you must also free the memory. The node is gone, but the chain remains intact.',
      },

      prose: [
        'Deletion in linked lists is the inverse of insertion — instead of adding a node and rewiring pointers, you remove a node by rewiring its neighbors to skip over it. There are five deletion scenarios: delete head, delete tail, delete by value, delete by position, and delete the entire list. Each has distinct pointer mechanics and edge cases that interviewers love to test.',

        '**Delete Head:** This is the simplest deletion. Save a reference to the current head, update `head` to `head.next`, then free the old head (in C++). If the list has only one node, head becomes `null` and the list is empty. If the list is already empty, do nothing. The time complexity is always O(1) because no traversal is needed. This operation is equivalent to "dequeue" in a queue implemented with a linked list.',

        '**Delete Tail (last node):** This is trickier than it appears. You must traverse to the second-to-last node (the one whose `next.next` is `null`) and set its `next` to `null`. This requires O(n) traversal. The edge case is a single-node list: deleting the only node means setting `head` to `null`. Another edge case is a two-node list where the head directly points to the tail — make sure your traversal logic handles this correctly.',

        '**Delete by Value:** Traverse the list to find the node containing the target value, then bypass it. You need to track the predecessor node so you can set `predecessor.next = targetNode.next`. If the target is in the head node, update head instead. If the value appears multiple times, decide upfront whether to delete the first occurrence or all occurrences — interviewers may ask for either variant.',

        '**Delete by Position (0-indexed):** This mirrors insert at position. Walk to the node at position `k-1` (the predecessor of the node to delete), then set `predecessor.next = predecessor.next.next`. Position 0 is the delete-head case. Position beyond the list length is an error. The key gotcha is handling the case where the position equals the last index — you are effectively deleting the tail.',

        '**Delete Entire List (C++ specific):** In C++, you must manually free every node. Traverse the list and `delete` each node one by one. The pattern is: save `head.next` in a temp variable, delete `head`, then move `head` to temp. Repeat until `head` is `null`. In garbage-collected languages (JS, Java, Python), simply setting `head = null` is sufficient — the GC will reclaim all nodes that become unreachable.',

        'The most common deletion bug is losing the reference to the node after the one being deleted. Before you unlink a node, always save a pointer to `node.next`. Another frequent bug is not handling the case where the node to delete is the head — this requires updating the head pointer, not just rewiring a predecessor. In interviews, always enumerate your edge cases aloud: empty list, single node, deleting head, deleting tail, node not found.',

        'A powerful technique for simplifying deletion code is the **dummy head pattern**. Create a dummy node whose `next` points to the real head. Now every real node (including the original head) has a predecessor, eliminating the special case for deleting the head. After the operation, return `dummy.next` as the new head. This pattern is used extensively in LeetCode solutions and production code.',

        'In the context of memory management, deletion in linked lists highlights the difference between logical deletion and physical deletion. Logical deletion means bypassing the node (it is unreachable but still in memory). Physical deletion means actually freeing the memory. In C/C++, failing to physically delete causes memory leaks. In interview discussions, mentioning this distinction demonstrates systems-level understanding.',
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `// ── Delete Head ──
void deleteHead(Node*& head) {
    if (head == nullptr) return;  // Empty list
    Node* temp = head;
    head = head->next;  // Move head forward
    delete temp;        // Free old head
}
// Time: O(1) | Space: O(1)

// ── Delete Tail ──
void deleteTail(Node*& head) {
    if (head == nullptr) return;          // Empty list
    if (head->next == nullptr) {          // Single node
        delete head;
        head = nullptr;
        return;
    }
    Node* current = head;
    while (current->next->next != nullptr) {  // Stop at second-to-last
        current = current->next;
    }
    delete current->next;   // Free the last node
    current->next = nullptr; // Second-to-last becomes new tail
}
// Time: O(n) | Space: O(1)`,
          explanation: 'Delete head is O(1) — just move the head pointer and free the old node. Delete tail is O(n) — you must traverse to the second-to-last node. Note the careful handling of empty and single-node lists.',
        },
        {
          language: 'javascript',
          code: `// ── Delete Head ──
function deleteHead(head) {
  if (head === null) return null;
  const newHead = head.next;  // Save reference to second node
  head.next = null;           // Optional: clean disconnect
  return newHead;             // Return new head
}
// Time: O(1) | Space: O(1)

// ── Delete Tail ──
function deleteTail(head) {
  if (head === null) return null;        // Empty list
  if (head.next === null) return null;   // Single node → empty

  let current = head;
  while (current.next.next !== null) {   // Stop at second-to-last
    current = current.next;
  }
  current.next = null;  // Remove last node
  return head;
}
// Time: O(n) | Space: O(1)`,
          explanation: 'JavaScript versions return the new head. For delete tail, setting current.next = null makes the last node unreachable — the garbage collector will reclaim it.',
        },
        {
          language: 'cpp',
          code: `// ── Delete by Value (first occurrence) ──
void deleteByValue(Node*& head, int target) {
    if (head == nullptr) return;

    // Special case: target is in the head node
    if (head->data == target) {
        Node* temp = head;
        head = head->next;
        delete temp;
        return;
    }

    Node* current = head;
    while (current->next != nullptr && current->next->data != target) {
        current = current->next;
    }

    if (current->next == nullptr) return;  // Value not found

    Node* temp = current->next;        // Node to delete
    current->next = temp->next;        // Bypass the node
    delete temp;                       // Free memory
}
// Time: O(n) | Space: O(1)

// ── Delete ALL occurrences of a value ──
void deleteAllByValue(Node*& head, int target) {
    // Use dummy node to simplify head deletion
    Node dummy(0);
    dummy.next = head;

    Node* current = &dummy;
    while (current->next != nullptr) {
        if (current->next->data == target) {
            Node* temp = current->next;
            current->next = temp->next;
            delete temp;
            // Do NOT advance current — next node might also match
        } else {
            current = current->next;
        }
    }
    head = dummy.next;
}`,
          explanation: 'Delete by value has two variants: first occurrence and all occurrences. The all-occurrences version uses the dummy node pattern to avoid special-casing the head. Note: when deleting, do NOT advance current — the new next node might also match.',
        },
        {
          language: 'javascript',
          code: `// ── Delete by Value (first occurrence) ──
function deleteByValue(head, target) {
  if (head === null) return null;

  // Target is the head node
  if (head.data === target) return head.next;

  let current = head;
  while (current.next !== null && current.next.data !== target) {
    current = current.next;
  }

  if (current.next !== null) {
    current.next = current.next.next;  // Bypass the node
  }
  return head;
}

// ── Delete by Position (0-indexed) ──
function deleteByPosition(head, position) {
  if (head === null) return null;

  if (position === 0) return head.next;  // Delete head

  let current = head;
  for (let i = 0; i < position - 1; i++) {
    if (current.next === null) return head;  // Position out of bounds
    current = current.next;
  }

  if (current.next === null) return head;  // Position out of bounds
  current.next = current.next.next;        // Bypass node at position
  return head;
}`,
          explanation: 'Delete by value searches for the target and bypasses it. Delete by position walks to the predecessor (position - 1 steps) and bypasses. Both handle the head-deletion case separately.',
        },
        {
          language: 'cpp',
          code: `// ── Delete by Position (0-indexed) ──
void deleteByPosition(Node*& head, int position) {
    if (head == nullptr) return;

    if (position == 0) {
        deleteHead(head);
        return;
    }

    Node* current = head;
    for (int i = 0; i < position - 1 && current->next != nullptr; i++) {
        current = current->next;
    }

    if (current->next == nullptr) return;  // Position out of bounds

    Node* temp = current->next;
    current->next = temp->next;
    delete temp;
}
// Time: O(k) where k = position | Space: O(1)

// ── Delete Entire List (free all memory) ──
void deleteEntireList(Node*& head) {
    while (head != nullptr) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }
    // head is now nullptr
}
// Time: O(n) | Space: O(1)`,
          explanation: 'Delete by position reuses deleteHead for position 0. Delete entire list iterates through every node, saving the next pointer before freeing the current node. This prevents use-after-free bugs.',
        },
      ],

      complexityTable: [
        { operation: 'Delete Head', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Direct pointer update' },
        { operation: 'Delete Tail', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Traverse to second-to-last node' },
        { operation: 'Delete by Value', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Best: value is in head node' },
        { operation: 'Delete by Position k', best: 'O(1)', average: 'O(k)', worst: 'O(n)', space: 'O(1)', notes: 'Walk k-1 steps to predecessor' },
        { operation: 'Delete Entire List', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Must visit and free every node' },
      ],

      callouts: [
        {
          type: 'tip',
          title: 'Dry Run Deletion on Paper',
          body: 'Draw a 4-node list: [A → B → C → D]. Practice deleting each node (A=head, D=tail, B=middle) and trace pointer changes step by step. Verify your logic handles: empty list, single node, two nodes, and the target being head or tail.',
        },
        {
          type: 'warning',
          title: 'Use-After-Free in C++',
          body: 'After calling delete on a node, that node\'s memory is freed. Accessing the deleted node\'s data or next pointer is undefined behavior and can cause crashes. Always save node->next BEFORE deleting node.',
        },
        {
          type: 'important',
          title: 'The Dummy Node Pattern for Deletion',
          body: 'Create a dummy node with dummy.next = head. Now every node (including head) has a predecessor. This eliminates the special case for deleting the head node. After the operation, return dummy.next as the real head. This pattern simplifies code significantly in interview solutions.',
        },
      ],

      interviewPerspective: {
        title: 'What Interviewers Test in Deletion Problems',
        checklist: [
          'Handle all edge cases: empty list, single node, node not found',
          'Know that deleting the head requires updating the head pointer — not just unlinking',
          'Use the dummy node pattern to avoid separate head-deletion logic',
          'In C++, always save node->next before calling delete to prevent use-after-free',
          'For "delete all occurrences," don\'t advance the pointer after deletion — the new next node might also match',
          'Discuss memory management: who owns the deleted node\'s memory? Is there a leak?',
          'Know that delete tail is O(n) in SLL — this is a motivating reason for doubly linked lists',
          'Mention that LRU cache deletion is O(1) using a doubly linked list + hash map',
        ],
      },

      mistakes: [
        { title: 'Not saving next before delete', description: 'In C++, calling delete on a node then accessing node->next is undefined behavior. Always do: Node* nextNode = node->next; delete node; node = nextNode.' },
        { title: 'Forgetting the head case', description: 'When deleting by value or position, the target might be the head node. If you only search from head->next, you\'ll never find it. Always check the head first or use a dummy node.' },
        { title: 'Off-by-one in position deletion', description: 'Walking to position instead of position-1. You need the predecessor to rewire. If you walk to the node itself, you can\'t update the previous node\'s next pointer in a singly linked list.' },
        { title: 'Advancing pointer after deletion', description: 'When deleting all occurrences, moving current = current.next after deleting skips the node that took the deleted node\'s place. Only advance when you DON\'T delete.' },
        { title: 'Not handling single-node list', description: 'For delete tail, if head.next is null, head IS the tail. Deleting it should set head to null. Missing this case leaves a dangling pointer.' },
      ],

      takeaways: [
        'Delete head is O(1) — save reference, move head forward, free old node',
        'Delete tail is O(n) in singly linked list — must find second-to-last node',
        'Delete by value requires tracking the predecessor node for rewiring',
        'Delete by position k takes O(k) — walk k-1 steps to predecessor',
        'The dummy node pattern eliminates head-deletion edge cases',
        'In C++, always save next pointer before calling delete',
        'When deleting all occurrences, do NOT advance after a deletion',
        'Setting head = null in GC languages frees the entire list automatically',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. TRAVERSAL & SEARCHING
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'traversal',
    title: 'Traversal & Searching',
    icon: '🔍',
    estimatedTime: '30 min',
    content: {
      keyIdea: {
        title: 'Sequential Access Only',
        description: 'Linked lists do not support random access — you cannot jump to the 5th element directly. Every operation that needs to locate a node must start at the head and walk through the chain one node at a time. This sequential nature defines both the power and the limitation of linked lists.',
      },

      prose: [
        '**Linear Traversal** is the most fundamental linked list operation. Starting from the head, you visit each node by following its `next` pointer until you reach `null`. This is how you print a list, compute its length, sum its values, or perform any aggregate operation. The pattern is always the same: `let current = head; while (current !== null) { process(current); current = current.next; }`. This loop runs exactly n times for a list of n nodes, giving O(n) time complexity.',

        '**Search for an Element:** To find whether a value exists in the list, traverse from head and compare each node\'s data to the target. If found, return the node (or its position). If you reach `null` without finding it, the value is not in the list. Unlike arrays, you cannot use binary search on a linked list even if the data is sorted, because you cannot jump to the middle element in O(1). This means search in a linked list is always O(n), which is one of its key disadvantages compared to sorted arrays.',

        '**Count Nodes:** Counting the number of nodes is a simple traversal with a counter. Initialize `count = 0`, walk through the list incrementing `count` at each node. This is often used as a helper function in other operations — for example, to validate that a position is within bounds before insertion or deletion. Some implementations maintain a separate `size` variable that is updated on every insert/delete, making count O(1) at the cost of extra bookkeeping.',

        '**Find Middle Node (Slow & Fast Pointers):** The classic two-pointer technique uses a `slow` pointer that moves one step at a time and a `fast` pointer that moves two steps. When `fast` reaches the end, `slow` is at the middle. This works because `fast` covers twice the distance of `slow` in the same number of iterations. For even-length lists, this gives you the second middle node (e.g., in [1,2,3,4], slow lands on 3). To get the first middle node, check `fast.next.next` instead of `fast.next`. This technique is foundational — it appears in cycle detection (Floyd\'s algorithm), finding the start of a cycle, palindrome checking, and merge sort on linked lists.',

        '**Find Nth Node from the End:** Use the two-pointer gap technique. Place both `first` and `second` at the head. Advance `first` by n steps so there is a gap of n nodes between them. Then advance both pointers simultaneously until `first` reaches `null`. At that point, `second` is at the nth node from the end. Why does this work? When `first` is at the end (position length), `second` is at position (length - n), which is exactly the nth node from the end. This is an O(n) single-pass solution, whereas the naive approach (count length, then walk length-n steps) requires two passes.',

        'These traversal patterns form the foundation for nearly every linked list algorithm. Cycle detection uses slow/fast pointers. Merge sort uses find-middle. Palindrome checking uses find-middle + reversal. The "nth from end" technique generalizes to "kth from end" and is used in problems like "remove nth node from end" (LeetCode 19). Master these five patterns and you can solve 80% of linked list interview problems.',

        'An important implementation detail: always use `current !== null` as your loop condition, not `current.next !== null`. The latter stops one node early, which means you never process the last node. The exception is when you specifically need to stop before the last node (e.g., finding the second-to-last node for tail deletion). Being precise about your loop termination condition prevents off-by-one bugs, which are the #1 source of errors in linked list code.',
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `// ── Linear Traversal (Print List) ──
void printList(Node* head) {
    Node* current = head;
    while (current != nullptr) {
        cout << current->data;
        if (current->next != nullptr) cout << " → ";
        current = current->next;
    }
    cout << " → NULL" << endl;
}
// Output: 10 → 20 → 30 → NULL

// ── Search for Element ──
Node* search(Node* head, int target) {
    Node* current = head;
    int index = 0;
    while (current != nullptr) {
        if (current->data == target) {
            cout << "Found " << target << " at index " << index << endl;
            return current;
        }
        current = current->next;
        index++;
    }
    cout << target << " not found in list" << endl;
    return nullptr;
}
// Time: O(n) | Space: O(1)

// ── Count Nodes ──
int countNodes(Node* head) {
    int count = 0;
    Node* current = head;
    while (current != nullptr) {
        count++;
        current = current->next;
    }
    return count;
}
// Time: O(n) | Space: O(1)`,
          explanation: 'Three fundamental traversal operations. All follow the same pattern: start at head, walk with current = current->next, stop at nullptr. Search returns the node pointer (or nullptr). Count returns the total number of nodes.',
        },
        {
          language: 'javascript',
          code: `// ── Linear Traversal (Print / Collect) ──
function printList(head) {
  const values = [];
  let current = head;
  while (current !== null) {
    values.push(current.data);
    current = current.next;
  }
  console.log(values.join(' → ') + ' → NULL');
}

// ── Search for Element ──
function search(head, target) {
  let current = head;
  let index = 0;
  while (current !== null) {
    if (current.data === target) return { node: current, index };
    current = current.next;
    index++;
  }
  return null;  // Not found
}

// ── Count Nodes ──
function countNodes(head) {
  let count = 0;
  let current = head;
  while (current !== null) {
    count++;
    current = current.next;
  }
  return count;
}

// ── Recursive Traversal ──
function printRecursive(node) {
  if (node === null) {
    console.log('NULL');
    return;
  }
  process.stdout.write(node.data + ' → ');
  printRecursive(node.next);
}`,
          explanation: 'JavaScript traversal variants. The iterative versions are preferred in interviews (O(1) space). The recursive version uses O(n) stack space and risks stack overflow on very long lists, but is elegant for educational purposes.',
        },
        {
          language: 'cpp',
          code: `// ── Find Middle Node (Slow & Fast Pointers) ──
Node* findMiddle(Node* head) {
    if (head == nullptr) return nullptr;

    Node* slow = head;
    Node* fast = head;

    // fast moves 2 steps, slow moves 1 step
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;  // slow is now at the middle
}
// For [1, 2, 3, 4, 5]: returns 3 (exact middle)
// For [1, 2, 3, 4]:    returns 3 (second middle)
// Time: O(n) | Space: O(1)

// ── Find Nth Node from End (Two-Pointer Gap) ──
Node* findNthFromEnd(Node* head, int n) {
    Node* first = head;
    Node* second = head;

    // Advance first by n steps
    for (int i = 0; i < n; i++) {
        if (first == nullptr) return nullptr;  // n > list length
        first = first->next;
    }

    // Move both until first reaches end
    while (first != nullptr) {
        first = first->next;
        second = second->next;
    }

    return second;  // second is now at nth from end
}
// For [10, 20, 30, 40, 50], n=2: returns node with 40
// Time: O(n) | Space: O(1)`,
          explanation: 'The slow/fast pointer technique finds the middle in one pass. The gap technique finds nth from end in one pass. Both avoid computing the list length first, which would require two passes.',
        },
        {
          language: 'javascript',
          code: `// ── Find Middle Node ──
function findMiddle(head) {
  if (head === null) return null;

  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

// ── Find Nth Node from End ──
function findNthFromEnd(head, n) {
  let first = head;
  let second = head;

  // Create gap of n nodes
  for (let i = 0; i < n; i++) {
    if (first === null) return null;  // n exceeds list length
    first = first.next;
  }

  // Advance both pointers together
  while (first !== null) {
    first = first.next;
    second = second.next;
  }
  return second;
}

// ── Check if value exists (boolean) ──
function contains(head, target) {
  let current = head;
  while (current !== null) {
    if (current.data === target) return true;
    current = current.next;
  }
  return false;
}

// ── Get node at index (0-based) ──
function getNodeAt(head, index) {
  let current = head;
  for (let i = 0; i < index; i++) {
    if (current === null) return null;
    current = current.next;
  }
  return current;
}`,
          explanation: 'JavaScript implementations of middle-finding and nth-from-end. Also includes utility functions contains() and getNodeAt() that are commonly needed as helpers in larger problems.',
        },
      ],

      complexityTable: [
        { operation: 'Linear Traversal', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Must visit every node' },
        { operation: 'Search Element', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Best: found at head' },
        { operation: 'Count Nodes', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Visit every node and count' },
        { operation: 'Find Middle (slow/fast)', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Single pass, n/2 iterations for slow' },
        { operation: 'Find Nth from End', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Single pass using pointer gap' },
        { operation: 'Binary Search', best: 'N/A', average: 'N/A', worst: 'N/A', space: 'N/A', notes: 'NOT possible — no random access' },
      ],

      callouts: [
        {
          type: 'tip',
          title: 'The Slow/Fast Pointer is Everywhere',
          body: 'The slow and fast pointer pattern (also called the tortoise and hare) is the single most important linked list technique. It solves: find middle, detect cycle, find cycle start, check palindrome, and split list for merge sort. Master this one pattern and you unlock five categories of problems.',
        },
        {
          type: 'warning',
          title: 'Loop Condition Matters',
          body: 'while (current !== null) visits ALL nodes including the last one. while (current.next !== null) stops one node BEFORE the end. Using the wrong condition is the #1 source of off-by-one bugs. For traversal and search, you almost always want current !== null.',
        },
        {
          type: 'note',
          title: 'Why Not Binary Search?',
          body: 'Even if a linked list is sorted, binary search is impractical because finding the middle element takes O(n) traversal. This makes each "halving step" O(n) instead of O(1), resulting in O(n log n) total — worse than linear search! This is why sorted data should use arrays, not linked lists.',
        },
      ],

      interviewPerspective: {
        title: 'Traversal Patterns Interviewers Expect You to Know',
        checklist: [
          'Implement the slow/fast pointer technique from memory — it appears in 30%+ of LL problems',
          'Know the nth-from-end gap technique and explain why it works in one pass',
          'Explain why binary search does not work on linked lists (no O(1) random access)',
          'Be able to find the middle for both odd and even length lists — know which middle you get',
          'Use recursive traversal only when specifically asked — iterative is preferred for O(1) space',
          'When asked to "return the kth node," clarify: from the beginning or from the end?',
          'Mention that maintaining a size variable avoids O(n) count operations',
        ],
      },

      mistakes: [
        { title: 'Wrong loop condition', description: 'Using while (current.next !== null) instead of while (current !== null). This skips the last node and crashes on empty lists (null.next is an error).' },
        { title: 'Not checking fast.next before fast.next.next', description: 'In the slow/fast pattern, the condition must be (fast !== null && fast.next !== null). Checking only fast !== null causes a crash when fast.next.next is accessed on the last node.' },
        { title: 'Off-by-one in nth from end', description: 'If n equals the list length, the answer is the head node. If your gap-advance loop doesn\'t handle this case, you\'ll miss it. Always verify with n = length of list.' },
        { title: 'Modifying the list during traversal', description: 'Changing next pointers while traversing can create infinite loops or skip nodes. If you need to modify, save next before changing pointers: let nextNode = current.next.' },
      ],

      takeaways: [
        'All linked list access is sequential — O(n) to reach any arbitrary node',
        'The standard traversal pattern: current = head, loop while current !== null, advance current = current.next',
        'Search is always O(n) — binary search is not applicable to linked lists',
        'Slow/fast pointer finds the middle in one pass with O(1) space',
        'The pointer gap technique finds the nth node from end in a single pass',
        'Always use current !== null as loop condition unless you specifically need to stop early',
        'Recursive traversal is elegant but uses O(n) stack space — prefer iterative for interviews',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. SINGLY LINKED LIST — COMPLETE GUIDE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'singly-linked',
    title: 'Singly Linked List — Complete Guide',
    icon: '🔗',
    estimatedTime: '45 min',
    content: {
      keyIdea: {
        title: 'One-Way Chain of Nodes',
        description: 'A singly linked list (SLL) is a linear data structure where each node stores data and a pointer to the next node. Traversal is strictly forward — you can only move from head to tail, never backward. This simplicity makes SLL the foundation for understanding all other linked list variants.',
      },

      analogy: {
        title: 'The Treasure Hunt Analogy',
        description: 'A singly linked list is like a treasure hunt where each clue leads you to the next location, but you can never go back to a previous clue without starting over from the beginning.',
        mapping: [
          { realWorld: 'First clue (starting location)', csConcept: 'Head pointer — entry point to the list' },
          { realWorld: 'Each clue paper', csConcept: 'Node — stores data and a pointer' },
          { realWorld: 'Direction to next clue', csConcept: 'next pointer — link to successor node' },
          { realWorld: 'Final clue says "THE END"', csConcept: 'Last node\'s next is null — end of list' },
          { realWorld: 'Can\'t go back to previous clue', csConcept: 'No prev pointer — forward-only traversal' },
          { realWorld: 'Adding a new clue between two others', csConcept: 'Insertion — rewire pointers, O(1) at known position' },
        ],
      },

      prose: [
        'The singly linked list is the simplest linked list variant and the one you will encounter most frequently in interviews and computer science courses. It consists of a sequence of nodes where each node contains two fields: a data field (storing the actual value) and a next pointer (storing the address of the following node). The last node\'s next pointer is `null`, signaling the end of the list. A special pointer called `head` always points to the first node.',

        '**Node Structure:** Each node is an independent object allocated somewhere in heap memory. Unlike arrays, nodes are NOT stored in contiguous memory — they can be scattered across the heap. The `next` pointer is what connects them into a logical sequence. In C++, a node is typically a `struct` with an `int data` and a `Node* next`. In JavaScript, it is a class with `this.data` and `this.next` properties. The node structure is deceptively simple but understanding it deeply is crucial.',

        '**How SLL Works Internally:** When you create a linked list, you start with `head = null` (empty list). Adding the first node means creating a node and pointing `head` to it. Adding more nodes means either prepending (updating head) or appending (traversing to the end and linking). The list grows dynamically — there is no fixed capacity, no resizing, and no wasted space. Each node is allocated individually on the heap, which gives linked lists their dynamic sizing advantage but also their cache-unfriendliness.',

        '**Memory Layout:** Arrays store elements in contiguous memory (address, address+4, address+8...). Linked list nodes can be at arbitrary addresses (0x1000, 0x2048, 0x1500...). Each node occupies `sizeof(data) + sizeof(pointer)` bytes. On a 64-bit system, a node with an `int` data field takes 4 (int) + 8 (pointer) = 12 bytes, but alignment may round this up to 16 bytes. Compare this to an array where each `int` takes exactly 4 bytes — linked lists use 3-4x more memory per element due to pointer overhead.',

        '**Advantages of Singly Linked Lists:** (1) Dynamic size — grows and shrinks as needed with no wasted capacity. (2) O(1) insertion/deletion at the head — no shifting required. (3) O(1) insertion/deletion at any known position — just pointer rewiring. (4) No memory reallocation — unlike dynamic arrays that must copy all elements when resizing. (5) Efficient for frequent insertions/deletions in the middle of the data structure.',

        '**Disadvantages of Singly Linked Lists:** (1) No random access — accessing the kth element requires O(k) traversal. (2) Extra memory per element for the next pointer (8 bytes on 64-bit systems). (3) Poor cache performance — nodes are scattered in memory, causing frequent cache misses. (4) No backward traversal — can only move forward, making operations like "delete previous node" or "reverse" more complex. (5) Binary search is not efficient even on sorted linked lists.',

        '**When to Use SLL vs Arrays:** Use a singly linked list when: you need frequent insertions/deletions at the front, the size is unpredictable and changes frequently, or you\'re implementing data structures like stacks, queues, or hash table chaining. Use an array when: you need random access by index, cache performance matters, the size is known in advance, or you need binary search on sorted data. In practice, arrays (and dynamic arrays like `std::vector` or JavaScript arrays) are used far more often because cache performance dominates real-world speed.',

        '**Complete Implementation:** A full singly linked list class encapsulates the head pointer and provides methods for all operations: insertAtBeginning, insertAtEnd, insertAtPosition, deleteHead, deleteTail, deleteByValue, search, display, getSize, isEmpty, and reverse. The class manages the head pointer internally so callers don\'t need to track it. Below are complete implementations in both C++ and JavaScript that you can use as reference for interviews and projects.',
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `#include <iostream>
#include <stdexcept>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class SinglyLinkedList {
private:
    Node* head;
    int size;

public:
    SinglyLinkedList() : head(nullptr), size(0) {}

    // ── Destructor: free all nodes ──
    ~SinglyLinkedList() {
        Node* current = head;
        while (current != nullptr) {
            Node* temp = current;
            current = current->next;
            delete temp;
        }
    }

    // ── Insert at Beginning — O(1) ──
    void insertAtBeginning(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
        size++;
    }

    // ── Insert at End — O(n) ──
    void insertAtEnd(int val) {
        Node* newNode = new Node(val);
        if (head == nullptr) {
            head = newNode;
        } else {
            Node* current = head;
            while (current->next != nullptr) {
                current = current->next;
            }
            current->next = newNode;
        }
        size++;
    }

    // ── Insert at Position (0-indexed) — O(k) ──
    void insertAtPosition(int val, int position) {
        if (position < 0 || position > size) {
            throw out_of_range("Position out of bounds");
        }
        if (position == 0) {
            insertAtBeginning(val);
            return;
        }
        Node* newNode = new Node(val);
        Node* current = head;
        for (int i = 0; i < position - 1; i++) {
            current = current->next;
        }
        newNode->next = current->next;
        current->next = newNode;
        size++;
    }

    // ── Delete Head — O(1) ──
    void deleteHead() {
        if (head == nullptr) throw runtime_error("List is empty");
        Node* temp = head;
        head = head->next;
        delete temp;
        size--;
    }

    // ── Delete Tail — O(n) ──
    void deleteTail() {
        if (head == nullptr) throw runtime_error("List is empty");
        if (head->next == nullptr) {
            delete head;
            head = nullptr;
        } else {
            Node* current = head;
            while (current->next->next != nullptr) {
                current = current->next;
            }
            delete current->next;
            current->next = nullptr;
        }
        size--;
    }

    // ── Delete by Value (first occurrence) — O(n) ──
    bool deleteByValue(int val) {
        if (head == nullptr) return false;
        if (head->data == val) {
            deleteHead();
            return true;
        }
        Node* current = head;
        while (current->next != nullptr && current->next->data != val) {
            current = current->next;
        }
        if (current->next == nullptr) return false;
        Node* temp = current->next;
        current->next = temp->next;
        delete temp;
        size--;
        return true;
    }

    // ── Search — O(n) ──
    int search(int val) const {
        Node* current = head;
        int index = 0;
        while (current != nullptr) {
            if (current->data == val) return index;
            current = current->next;
            index++;
        }
        return -1;  // Not found
    }

    // ── Find Middle (slow/fast) — O(n) ──
    int findMiddle() const {
        if (head == nullptr) throw runtime_error("List is empty");
        Node* slow = head;
        Node* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow->data;
    }

    // ── Reverse — O(n) ──
    void reverse() {
        Node* prev = nullptr;
        Node* current = head;
        while (current != nullptr) {
            Node* nextNode = current->next;
            current->next = prev;
            prev = current;
            current = nextNode;
        }
        head = prev;
    }

    // ── Display ──
    void display() const {
        Node* current = head;
        while (current != nullptr) {
            cout << current->data;
            if (current->next) cout << " -> ";
            current = current->next;
        }
        cout << " -> NULL" << endl;
    }

    // ── Getters ──
    int getSize() const { return size; }
    bool isEmpty() const { return head == nullptr; }
};

// ── Usage ──
// SinglyLinkedList list;
// list.insertAtEnd(10);       // [10]
// list.insertAtEnd(20);       // [10 -> 20]
// list.insertAtBeginning(5);  // [5 -> 10 -> 20]
// list.insertAtPosition(15, 2); // [5 -> 10 -> 15 -> 20]
// list.display();             // 5 -> 10 -> 15 -> 20 -> NULL
// list.deleteByValue(10);     // [5 -> 15 -> 20]
// cout << list.search(15);    // 1
// cout << list.findMiddle();  // 15
// list.reverse();             // [20 -> 15 -> 5]`,
          explanation: 'Complete SLL implementation in C++ with proper memory management (destructor frees all nodes). Includes all CRUD operations, search, find middle, reverse, and utility methods. The size variable is maintained for O(1) length queries.',
        },
        {
          language: 'javascript',
          code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // ── Insert at Beginning — O(1) ──
  insertAtBeginning(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // ── Insert at End — O(n) ──
  insertAtEnd(val) {
    const newNode = new Node(val);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // ── Insert at Position (0-indexed) — O(k) ──
  insertAtPosition(val, position) {
    if (position < 0 || position > this.size) {
      throw new Error('Position out of bounds');
    }
    if (position === 0) {
      this.insertAtBeginning(val);
      return;
    }
    const newNode = new Node(val);
    let current = this.head;
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  // ── Delete Head — O(1) ──
  deleteHead() {
    if (this.head === null) throw new Error('List is empty');
    const removedData = this.head.data;
    this.head = this.head.next;
    this.size--;
    return removedData;
  }

  // ── Delete Tail — O(n) ──
  deleteTail() {
    if (this.head === null) throw new Error('List is empty');
    if (this.head.next === null) {
      const data = this.head.data;
      this.head = null;
      this.size--;
      return data;
    }
    let current = this.head;
    while (current.next.next !== null) {
      current = current.next;
    }
    const data = current.next.data;
    current.next = null;
    this.size--;
    return data;
  }

  // ── Delete by Value — O(n) ──
  deleteByValue(val) {
    if (this.head === null) return false;
    if (this.head.data === val) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    let current = this.head;
    while (current.next !== null && current.next.data !== val) {
      current = current.next;
    }
    if (current.next === null) return false;
    current.next = current.next.next;
    this.size--;
    return true;
  }

  // ── Search — O(n) ──
  search(val) {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (current.data === val) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  // ── Find Middle — O(n) ──
  findMiddle() {
    if (this.head === null) return null;
    let slow = this.head;
    let fast = this.head;
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow.data;
  }

  // ── Reverse — O(n) ──
  reverse() {
    let prev = null;
    let current = this.head;
    while (current !== null) {
      const nextNode = current.next;
      current.next = prev;
      prev = current;
      current = nextNode;
    }
    this.head = prev;
  }

  // ── Convert to Array (utility) ──
  toArray() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // ── Display ──
  display() {
    console.log(this.toArray().join(' → ') + ' → NULL');
  }

  // ── Getters ──
  getSize() { return this.size; }
  isEmpty() { return this.head === null; }
}

// ── Usage ──
const list = new SinglyLinkedList();
list.insertAtEnd(10);          // [10]
list.insertAtEnd(20);          // [10 → 20]
list.insertAtEnd(30);          // [10 → 20 → 30]
list.insertAtBeginning(5);     // [5 → 10 → 20 → 30]
list.insertAtPosition(15, 2);  // [5 → 10 → 15 → 20 → 30]
list.display();                // 5 → 10 → 15 → 20 → 30 → NULL
console.log(list.search(15));  // 2
console.log(list.findMiddle());// 15
list.deleteByValue(10);        // [5 → 15 → 20 → 30]
list.reverse();                // [30 → 20 → 15 → 5]
list.display();                // 30 → 20 → 15 → 5 → NULL`,
          explanation: 'Complete SLL implementation in JavaScript. The class encapsulates the head pointer and size counter. All operations match the C++ version. Includes toArray() utility for easy testing and debugging.',
        },
      ],

      tableData: [
        {
          headers: ['Feature', 'Singly Linked List', 'Array (Static)', 'Dynamic Array (Vector/JS Array)'],
          rows: [
            ['Access by index', 'O(n) — must traverse', 'O(1) — direct computation', 'O(1) — direct computation'],
            ['Insert at beginning', 'O(1) — rewire head', 'O(n) — shift all elements', 'O(n) — shift all elements'],
            ['Insert at end', 'O(n) without tail, O(1) with tail', 'N/A — fixed size', 'O(1) amortized'],
            ['Insert at middle', 'O(n) to find + O(1) to insert', 'O(n) — shift elements', 'O(n) — shift elements'],
            ['Delete from beginning', 'O(1) — rewire head', 'O(n) — shift all elements', 'O(n) — shift all elements'],
            ['Delete from end', 'O(n) — find second-to-last', 'O(1)', 'O(1)'],
            ['Delete from middle', 'O(n) to find + O(1) to delete', 'O(n) — shift elements', 'O(n) — shift elements'],
            ['Search (unsorted)', 'O(n)', 'O(n)', 'O(n)'],
            ['Search (sorted)', 'O(n) — no binary search', 'O(log n) — binary search', 'O(log n) — binary search'],
            ['Memory per element', 'data + pointer (12-16 bytes)', 'data only (4 bytes for int)', 'data only + capacity overhead'],
            ['Memory allocation', 'Per-node (heap)', 'One block (stack/heap)', 'One block + reallocation'],
            ['Cache performance', 'Poor — scattered nodes', 'Excellent — contiguous', 'Excellent — contiguous'],
            ['Dynamic resizing', 'Automatic — no realloc', 'Not possible — fixed', 'Automatic — amortized O(1)'],
            ['Backward traversal', 'Not possible', 'O(1) — index arithmetic', 'O(1) — index arithmetic'],
          ],
        },
      ],

      interviewPerspective: {
        title: 'SLL Interview Expectations',
        checklist: [
          'Implement a complete SLL class from scratch in under 15 minutes — this is a basic competency check',
          'Know the time complexity of every operation and explain WHY (not just memorize)',
          'Explain why SLL uses more memory per element than arrays (pointer overhead)',
          'Discuss cache performance: arrays win because CPU prefetching works on contiguous memory',
          'Know when to choose SLL over array: frequent head insertions/deletions, unknown size, no random access needed',
          'Be prepared to implement reverse() iteratively — this is asked in 40%+ of LL interviews',
          'Understand that delete tail is O(n) in SLL — motivates doubly linked lists',
          'Mention that SLL is used for: stack implementation, hash table chaining, adjacency lists in graphs',
          'If asked about thread safety, mention that concurrent access to shared nodes requires synchronization',
        ],
      },

      mistakes: [
        { title: 'Implementing SLL without size tracking', description: 'Not maintaining a size variable forces O(n) getSize() calls. Maintaining size adds negligible overhead to insert/delete but makes length queries O(1). Always track size.' },
        { title: 'Missing destructor in C++', description: 'Forgetting to write a destructor that frees all nodes causes memory leaks. Every new must have a matching delete. The destructor should traverse the entire list and delete each node.' },
        { title: 'Not handling empty list in every method', description: 'Methods like deleteTail, findMiddle, and search must check if head is null before accessing head.next. Missing this check causes null pointer crashes.' },
        { title: 'Using SLL when array would be better', description: 'If you need random access, sorted searching, or cache-friendly iteration, use an array. SLL is only better when you have frequent insertions/deletions at the front or unknown size.' },
        { title: 'Confusing node address with node value', description: 'In debugging, printing the node object prints its memory address (C++) or object reference (JS), not its data. Always print node->data or node.data explicitly.' },
      ],

      practice: [
        {
          title: 'Implement SLL with All Operations',
          difficulty: 'Easy',
          description: 'Build a complete SinglyLinkedList class with: insertAtBeginning, insertAtEnd, insertAtPosition, deleteHead, deleteTail, deleteByValue, search, display, getSize, and isEmpty. Test every method including edge cases (empty list, single node).',
          hint: 'Start with the Node class, then build the SLL class one method at a time. Test each method immediately after writing it.',
          approach: 'Implement in order: constructor → insertAtBeginning → display → insertAtEnd → insertAtPosition → deleteHead → deleteTail → deleteByValue → search → getSize/isEmpty. This order lets you test each new method using the previously built ones.',
          timeComplexity: 'Varies by operation: O(1) for head operations, O(n) for tail/search',
          spaceComplexity: 'O(n) for n nodes total, O(1) per operation',
        },
        {
          title: 'Reverse a Singly Linked List',
          difficulty: 'Easy',
          description: 'Given the head of a singly linked list, reverse the list in-place and return the new head. Do it iteratively with O(1) extra space. Then implement it recursively. (LeetCode 206)',
          hint: 'Use three pointers: prev, current, next. In each step, save current.next, point current.next to prev, then advance prev and current.',
          approach: 'Iterative: Initialize prev=null, current=head. Loop: save next=current.next, reverse link current.next=prev, advance prev=current, current=next. Return prev. Recursive: Base case: if head is null or head.next is null, return head. Recurse on head.next, set head.next.next = head, head.next = null.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1) iterative, O(n) recursive (call stack)',
        },
        {
          title: 'Detect Cycle in Linked List',
          difficulty: 'Medium',
          description: 'Given the head of a linked list, determine if the list has a cycle. A cycle exists if a node\'s next pointer eventually points back to a previously visited node. Solve in O(1) space. (LeetCode 141)',
          hint: 'Use Floyd\'s cycle detection: slow moves 1 step, fast moves 2 steps. If they ever meet, there is a cycle. If fast reaches null, no cycle.',
          approach: 'Initialize slow=head, fast=head. While fast and fast.next are not null: slow=slow.next, fast=fast.next.next. If slow===fast, return true (cycle found). If loop ends, return false. The fast pointer will always catch the slow pointer within the cycle because the gap decreases by 1 each step.',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
        },
      ],

      takeaways: [
        'SLL is a linear chain of nodes — each node has data and a next pointer',
        'Head pointer is the only entry point; last node\'s next is null',
        'O(1) insert/delete at head; O(n) for tail and search operations',
        'Uses more memory than arrays (pointer overhead per node)',
        'Poor cache performance due to non-contiguous memory allocation',
        'Cannot do random access or binary search — sequential access only',
        'Best for: frequent head operations, unknown size, stack/queue implementations',
        'Worst for: random access, sorted searching, cache-sensitive workloads',
        'Always maintain a size variable for O(1) length queries',
        'Foundation for understanding doubly linked lists, circular lists, and advanced patterns',
      ],
    },
  },
];
