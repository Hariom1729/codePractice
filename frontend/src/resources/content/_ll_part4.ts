import type { Section } from './types';

export const llPart4Sections: Section[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 14. COMMON INTERVIEW PATTERNS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'interview-patterns',
    title: 'Common Interview Patterns',
    icon: '🧩',
    estimatedTime: '60 min',
    content: {
      prose: [
        'Linked list interview questions follow a surprisingly small set of recurring patterns. Once you internalize these 7 core patterns, you can solve nearly every linked list problem an interviewer throws at you. Each pattern teaches a fundamental technique — reversal, merging, cycle detection, two-pointer spacing, palindrome verification, intersection finding, and deep copying with random pointers.',
        'The patterns are ordered by difficulty and by how frequently they appear in FAANG-level interviews. Reverse Linked List alone appears in some form in roughly 30% of all linked list interview questions. Merge Two Sorted Lists teaches the merge technique used in merge sort and countless variations. Floyd\'s Cycle Detection is a mathematical gem that interviewers love to probe deeply.',
        'For each pattern below, study the logic explanation to understand WHY the algorithm works, walk through the dry run to see it in action step-by-step, and memorize the complexity analysis. In your interview, always explain your approach before coding — interviewers value clear communication of these patterns as much as correct code.',
        'Pay close attention to pointer manipulation in each template. The most common source of bugs in linked list interviews is losing references to nodes. A golden rule: always save your next pointer BEFORE you overwrite any link. This single habit prevents 80% of linked list bugs.',
      ],
      patterns: [
        // ── Pattern 1: Reverse Linked List ──
        {
          name: 'Reverse Linked List',
          description: 'Reverse the direction of all pointers in a singly linked list so the last node becomes the head and the first node becomes the tail. This is the single most important linked list pattern — it appears directly or as a subroutine in dozens of other problems (reverse in groups, palindrome check, addition of two numbers, etc.).',
          whenToUse: 'When a problem asks you to reverse a list, reverse a portion of a list, or when you need to process nodes in reverse order without extra space. Also used as a subroutine in palindrome checks and reverse-in-groups problems.',
          template: [
            {
              language: 'cpp',
              code: `// Iterative Reversal — O(n) time, O(1) space
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;  // Save next
        curr->next = prev;                // Reverse link
        prev = curr;                      // Advance prev
        curr = nextTemp;                  // Advance curr
    }
    return prev;  // prev is the new head
}

// Recursive Reversal — O(n) time, O(n) space (call stack)
ListNode* reverseListRecursive(ListNode* head) {
    if (head == nullptr || head->next == nullptr)
        return head;
    ListNode* newHead = reverseListRecursive(head->next);
    head->next->next = head;  // Reverse the link
    head->next = nullptr;     // Remove old link
    return newHead;
}`,
              explanation: 'The iterative approach uses three pointers: prev, curr, and nextTemp. At each step, we save curr->next, reverse the link to point backward, then advance both prev and curr. After the loop, prev points to what was the last node — the new head. The recursive approach works by recursing to the end, then on the way back up, each node makes its next node point back to it.',
            },
          ],
          dryRun: 'List: 1 → 2 → 3 → 4 → NULL\n\nStep 0: prev=NULL, curr=1\nStep 1: nextTemp=2, 1→NULL, prev=1, curr=2\n  State: NULL ← 1   2 → 3 → 4 → NULL\nStep 2: nextTemp=3, 2→1, prev=2, curr=3\n  State: NULL ← 1 ← 2   3 → 4 → NULL\nStep 3: nextTemp=4, 3→2, prev=3, curr=4\n  State: NULL ← 1 ← 2 ← 3   4 → NULL\nStep 4: nextTemp=NULL, 4→3, prev=4, curr=NULL\n  State: NULL ← 1 ← 2 ← 3 ← 4\n\nLoop ends. Return prev = 4.\nResult: 4 → 3 → 2 → 1 → NULL ✓',
          problems: [
            'LeetCode 206: Reverse Linked List (Easy)',
            'LeetCode 92: Reverse Linked List II (Medium) — reverse between positions left and right',
            'LeetCode 25: Reverse Nodes in k-Group (Hard) — reverse in groups of k',
            'LeetCode 24: Swap Nodes in Pairs (Medium) — reverse in groups of 2',
          ],
        },
        // ── Pattern 2: Merge Two Sorted Lists ──
        {
          name: 'Merge Two Sorted Lists',
          description: 'Given two sorted linked lists, merge them into a single sorted linked list by splicing together the nodes of the two lists. This pattern is the linked list equivalent of the merge step in merge sort. It teaches the critical "dummy head" technique that simplifies edge case handling in almost every list-building problem.',
          whenToUse: 'When merging two or more sorted sequences, implementing merge sort on linked lists, or any problem where you build a new list node-by-node by choosing from multiple sources. The dummy head trick is also useful for partition, filter, and rearrangement problems.',
          template: [
            {
              language: 'cpp',
              code: `// Merge Two Sorted Lists — O(n + m) time, O(1) space
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);           // Dummy head avoids edge cases
    ListNode* tail = &dummy;     // Tail pointer builds the result

    while (l1 != nullptr && l2 != nullptr) {
        if (l1->val <= l2->val) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }

    // Attach whichever list has remaining nodes
    tail->next = (l1 != nullptr) ? l1 : l2;

    return dummy.next;  // Skip dummy, return actual head
}`,
              explanation: 'We create a dummy node so we never have to special-case an empty result list. A tail pointer always points to the last node in the merged list. At each step, we compare the front nodes of l1 and l2, attach the smaller one to tail->next, advance that list\'s pointer, and advance tail. When one list is exhausted, we attach the remainder of the other list directly — no further iteration needed because it\'s already sorted.',
            },
          ],
          dryRun: 'l1: 1 → 3 → 5 → NULL\nl2: 2 → 4 → 6 → NULL\ndummy → ?\n\nStep 1: 1 <= 2 → attach 1. tail=1, l1=3\n  dummy → 1\nStep 2: 3 > 2 → attach 2. tail=2, l2=4\n  dummy → 1 → 2\nStep 3: 3 <= 4 → attach 3. tail=3, l1=5\n  dummy → 1 → 2 → 3\nStep 4: 5 > 4 → attach 4. tail=4, l2=6\n  dummy → 1 → 2 → 3 → 4\nStep 5: 5 <= 6 → attach 5. tail=5, l1=NULL\n  dummy → 1 → 2 → 3 → 4 → 5\nLoop ends (l1 is NULL). Attach remaining l2.\n  dummy → 1 → 2 → 3 → 4 → 5 → 6 → NULL\n\nReturn dummy.next = 1.\nResult: 1 → 2 → 3 → 4 → 5 → 6 → NULL ✓',
          problems: [
            'LeetCode 21: Merge Two Sorted Lists (Easy)',
            'LeetCode 23: Merge k Sorted Lists (Hard) — use divide-and-conquer or min-heap',
            'LeetCode 148: Sort List (Medium) — merge sort on linked list',
            'LeetCode 86: Partition List (Medium) — split into two lists, then merge',
          ],
        },
        // ── Pattern 3: Detect Cycle (Floyd's Algorithm) ──
        {
          name: 'Detect Cycle (Floyd\'s Tortoise & Hare)',
          description: 'Detect whether a linked list has a cycle (a node whose next pointer points back to a previous node, creating an infinite loop). Floyd\'s algorithm uses two pointers moving at different speeds — if they meet, a cycle exists. The algorithm also finds the exact node where the cycle begins, which is a classic mathematical proof question in interviews.',
          whenToUse: 'When a problem involves detecting cycles in any sequence (linked list, array, functional graph), finding the start of a cycle, or determining the length of a cycle. Also used in the "find duplicate number" problem on arrays and in detecting infinite loops in state machines.',
          template: [
            {
              language: 'cpp',
              code: `// Phase 1: Detect if cycle exists — O(n) time, O(1) space
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;          // Move 1 step
        fast = fast->next->next;    // Move 2 steps
        if (slow == fast) return true;  // They met — cycle!
    }
    return false;  // fast reached NULL — no cycle
}

// Phase 2: Find the node where the cycle begins
ListNode* detectCycleStart(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    // Phase 1: Find meeting point
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) break;
    }

    // No cycle
    if (fast == nullptr || fast->next == nullptr)
        return nullptr;

    // Phase 2: Find cycle start
    // Move one pointer to head, keep other at meeting point
    // Both move at speed 1 — they meet at cycle start
    slow = head;
    while (slow != fast) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow;  // This is the cycle start node
}`,
              explanation: 'Phase 1: If there is a cycle, the fast pointer (2 steps) will eventually lap the slow pointer (1 step) and they will meet inside the cycle. If fast reaches NULL, there is no cycle. Phase 2 (mathematical proof): Let the distance from head to cycle start be "a", and from cycle start to meeting point be "b". The slow pointer traveled a+b steps. The fast pointer traveled a+b+c+b = 2(a+b) steps (where c is the remaining cycle length). This gives us a = c. So if we reset one pointer to head and move both at speed 1, they meet exactly at the cycle start after "a" steps.',
            },
          ],
          dryRun: 'List: 1 → 2 → 3 → 4 → 5 → 3 (cycle back to node 3)\nDistances: a=2 (head to cycle start), cycle length=3\n\nPhase 1 — Detect cycle:\nStep 0: slow=1, fast=1\nStep 1: slow=2, fast=3\nStep 2: slow=3, fast=5\nStep 3: slow=4, fast=4  ← MEET! Cycle detected.\n\nPhase 2 — Find cycle start:\nReset slow to head.\nslow=1, fast=4\nStep 1: slow=2, fast=5\nStep 2: slow=3, fast=3  ← MEET at node 3!\n\nCycle starts at node with value 3 ✓',
          problems: [
            'LeetCode 141: Linked List Cycle (Easy) — detect cycle',
            'LeetCode 142: Linked List Cycle II (Medium) — find cycle start',
            'LeetCode 287: Find the Duplicate Number (Medium) — Floyd\'s on array',
            'LeetCode 202: Happy Number (Easy) — Floyd\'s on number sequence',
          ],
        },
        // ── Pattern 4: Remove Nth Node From End ──
        {
          name: 'Remove Nth Node From End',
          description: 'Remove the nth node from the end of a linked list in a single pass. This pattern uses the "two-pointer gap" technique: advance the first pointer n steps ahead, then move both pointers together until the first reaches the end — the second pointer is now at the target node. This elegant approach avoids the need for two passes (one to count, one to remove).',
          whenToUse: 'When a problem references positions from the end of a list, finding the kth-to-last element, or any scenario where you need a fixed-distance relationship between two positions in a single traversal. The gap technique is also useful for finding the middle element (gap of n/2).',
          template: [
            {
              language: 'cpp',
              code: `// Remove Nth From End — O(n) time, O(1) space, single pass
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* first = &dummy;
    ListNode* second = &dummy;

    // Advance first pointer n+1 steps ahead
    for (int i = 0; i <= n; i++) {
        first = first->next;
    }

    // Move both until first reaches NULL
    while (first != nullptr) {
        first = first->next;
        second = second->next;
    }

    // second->next is the node to remove
    ListNode* toDelete = second->next;
    second->next = second->next->next;
    delete toDelete;  // Free memory in C++

    return dummy.next;
}`,
              explanation: 'We use a dummy node to handle the edge case where the head itself needs to be removed (e.g., a 1-element list, remove 1st from end). We advance "first" by n+1 steps (not n) so that when first reaches NULL, "second" is positioned one node BEFORE the target — this lets us do second->next = second->next->next to skip over the target node. The gap between first and second is always n+1, so when first is at NULL (position length+1), second is at position length-n, which is one before the target.',
            },
          ],
          dryRun: 'List: 1 → 2 → 3 → 4 → 5 → NULL, n=2 (remove 4)\ndummy → 1 → 2 → 3 → 4 → 5 → NULL\n\nAdvance first n+1=3 steps from dummy:\n  first = 3\n\nMove both until first = NULL:\n  first=4, second=1\n  first=5, second=2\n  first=NULL, second=3  ← STOP\n\nsecond->next is node 4 (the node to remove)\nsecond->next = second->next->next\n  3 → 5 (skipping 4)\n\nResult: 1 → 2 → 3 → 5 → NULL ✓\n\nEdge case: List: 1 → NULL, n=1\ndummy → 1 → NULL\nAdvance first 2 steps: first = NULL\nLoop doesn\'t execute. second = dummy.\nsecond->next = second->next->next = NULL\nResult: NULL (empty list) ✓',
          problems: [
            'LeetCode 19: Remove Nth Node From End of List (Medium)',
            'LeetCode 876: Middle of the Linked List (Easy) — similar gap technique',
            'LeetCode 61: Rotate List (Medium) — uses length and position from end',
            'LeetCode 1721: Swapping Nodes in a Linked List (Medium)',
          ],
        },
        // ── Pattern 5: Palindrome Linked List ──
        {
          name: 'Palindrome Linked List',
          description: 'Check whether a singly linked list reads the same forwards and backwards. This pattern combines three techniques: finding the middle (fast/slow pointers), reversing the second half in-place, and comparing the two halves. It demonstrates how combining simple patterns produces elegant solutions to complex problems — a key insight for interviews.',
          whenToUse: 'When checking if a sequence is a palindrome with O(1) space, or any problem that requires comparing the first half of a list with the reversed second half. The technique of reversing half a list is also useful for reorder-list and fold-list problems.',
          template: [
            {
              language: 'cpp',
              code: `// Palindrome Check — O(n) time, O(1) space
bool isPalindrome(ListNode* head) {
    if (head == nullptr || head->next == nullptr)
        return true;

    // Step 1: Find the middle using slow/fast pointers
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast->next != nullptr && fast->next->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    // slow is at the middle (end of first half)

    // Step 2: Reverse the second half
    ListNode* secondHalf = reverseList(slow->next);
    slow->next = nullptr;  // Cut the list in two

    // Step 3: Compare both halves
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

    // Step 4 (Optional): Restore the list
    slow->next = reverseList(secondHalf);

    return result;
}

// Helper: reverseList from Pattern 1
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
              explanation: 'Step 1 finds the middle node using the fast/slow pointer technique. When fast reaches the end, slow is at the midpoint. Step 2 reverses the second half of the list in-place using our reversal pattern. Step 3 compares values from the start of each half — if any differ, it is not a palindrome. Step 4 (optional but good practice) restores the list to its original form by reversing the second half again.',
            },
          ],
          dryRun: 'List: 1 → 2 → 3 → 2 → 1 → NULL\n\nStep 1 — Find middle:\n  slow=1, fast=1\n  slow=2, fast=3\n  slow=3, fast=1 (fast->next is NULL, stop)\n  Middle = node 3\n\nStep 2 — Reverse second half (2 → 1 → NULL):\n  Reversed: 1 → 2 → NULL\n\nStep 3 — Compare:\n  First half:  1 → 2 → 3 → NULL\n  Second half: 1 → 2 → NULL\n  Compare: 1==1 ✓, 2==2 ✓, p2=NULL → done\n  Result: true (palindrome) ✓\n\nNon-palindrome: 1 → 2 → 3 → NULL\n  Middle = 2, second half reversed: 3 → NULL\n  Compare: 1 != 3 → false ✓',
          problems: [
            'LeetCode 234: Palindrome Linked List (Easy)',
            'LeetCode 143: Reorder List (Medium) — uses same find-middle + reverse technique',
            'LeetCode 2130: Maximum Twin Sum of a Linked List (Medium)',
            'LeetCode 2487: Remove Nodes From Linked List (Medium)',
          ],
        },
        // ── Pattern 6: Intersection Point of Two Lists ──
        {
          name: 'Intersection Point of Two Lists',
          description: 'Given two singly linked lists that may merge at some node (forming a Y-shape), find the node where they intersect. The elegant two-pointer solution works by having each pointer traverse both lists — when one reaches the end of its list, it jumps to the head of the other list. They are guaranteed to meet at the intersection point (or both reach NULL simultaneously if no intersection exists).',
          whenToUse: 'When two sequences share a common suffix, finding the point of convergence. Also useful for detecting shared memory in data structures, finding common ancestors in tree paths represented as lists, and verifying if two data structures share nodes.',
          template: [
            {
              language: 'cpp',
              code: `// Intersection of Two Lists — O(n + m) time, O(1) space
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    if (headA == nullptr || headB == nullptr)
        return nullptr;

    ListNode* pA = headA;
    ListNode* pB = headB;

    // Traverse both lists. When one reaches the end,
    // redirect it to the head of the OTHER list.
    // They will meet at the intersection or both reach NULL.
    while (pA != pB) {
        pA = (pA != nullptr) ? pA->next : headB;
        pB = (pB != nullptr) ? pB->next : headA;
    }

    return pA;  // Either intersection node or NULL
}`,
              explanation: 'Why this works: Let list A have length a and list B have length b. The shared suffix (after intersection) has length c. So the unique part of A is (a-c) and of B is (b-c). Pointer pA travels: a + (b-c) steps. Pointer pB travels: b + (a-c) steps. Both equal a+b-c, so they arrive at the intersection node at the same time. If there is no intersection, both pointers reach NULL after a+b steps, so pA == pB == NULL and we return NULL.',
            },
          ],
          dryRun: 'List A: 1 → 2 → 3 ↘\n                      7 → 8 → NULL\nList B:     4 → 5 → 6 ↗\n\nLengths: A=5, B=5, shared=2\nUnique A = 3, Unique B = 3\n\npA path: 1→2→3→7→8→NULL→4→5→6→7  (reaches 7 after 10 steps)\npB path: 4→5→6→7→8→NULL→1→2→3→7  (reaches 7 after 10 steps)\n\nBoth meet at node 7 ✓\n\nDifferent lengths example:\nList A: 1 → 2 ↘\n                5 → NULL\nList B: 3 → 4 → 5 ↗  (wait — 4→5 directly)\n\nActually: A=3 nodes, B=3 nodes, shared=1\npA: 1→2→5→NULL→3→4→5  (meets at 5 after 6 steps)\npB: 3→4→5→NULL→1→2→5  (meets at 5 after 6 steps) ✓',
          problems: [
            'LeetCode 160: Intersection of Two Linked Lists (Easy)',
            'LeetCode 599: Minimum Index Sum of Two Lists (Easy) — conceptually related',
            'LeetCode 1650: Lowest Common Ancestor of Binary Tree III (Medium) — same two-pointer trick on parent pointers',
          ],
        },
        // ── Pattern 7: Copy List with Random Pointer ──
        {
          name: 'Copy List with Random Pointer',
          description: 'Create a deep copy of a linked list where each node has an additional "random" pointer that can point to any node in the list or NULL. The challenge is that when you create copies, the random pointers of the copy must point to the copied nodes, not the original nodes. The O(1) space interleaving approach is a masterpiece of pointer manipulation and a favorite of interviewers at top companies.',
          whenToUse: 'When deep copying complex data structures with arbitrary cross-references, cloning graphs, or any problem where you need to replicate a structure that has non-linear references. The hash map approach generalizes to cloning any graph structure.',
          template: [
            {
              language: 'cpp',
              code: `// Definition for a Node with random pointer
struct Node {
    int val;
    Node* next;
    Node* random;
    Node(int x) : val(x), next(nullptr), random(nullptr) {}
};

// Approach 1: Hash Map — O(n) time, O(n) space
Node* copyRandomList_HashMap(Node* head) {
    if (head == nullptr) return nullptr;

    unordered_map<Node*, Node*> oldToNew;

    // Pass 1: Create all new nodes
    Node* curr = head;
    while (curr != nullptr) {
        oldToNew[curr] = new Node(curr->val);
        curr = curr->next;
    }

    // Pass 2: Set next and random pointers
    curr = head;
    while (curr != nullptr) {
        oldToNew[curr]->next = oldToNew[curr->next];
        oldToNew[curr]->random = oldToNew[curr->random];
        curr = curr->next;
    }

    return oldToNew[head];
}

// Approach 2: Interleaving — O(n) time, O(1) space
Node* copyRandomList(Node* head) {
    if (head == nullptr) return nullptr;

    // Step 1: Interleave — insert copy after each original
    // 1 → 1' → 2 → 2' → 3 → 3' → NULL
    Node* curr = head;
    while (curr != nullptr) {
        Node* copy = new Node(curr->val);
        copy->next = curr->next;
        curr->next = copy;
        curr = copy->next;
    }

    // Step 2: Set random pointers for copies
    curr = head;
    while (curr != nullptr) {
        if (curr->random != nullptr)
            curr->next->random = curr->random->next;
        curr = curr->next->next;
    }

    // Step 3: Separate the two lists
    Node* newHead = head->next;
    curr = head;
    while (curr != nullptr) {
        Node* copy = curr->next;
        curr->next = copy->next;
        if (copy->next != nullptr)
            copy->next = copy->next->next;
        curr = curr->next;
    }

    return newHead;
}`,
              explanation: 'The hash map approach is straightforward: create a mapping from original→copy, then use the map to wire up next and random pointers. The interleaving approach is more clever: (1) Insert each copy node right after its original, creating an interleaved list. (2) For random pointers: if original->random = X, then copy->random = X->next (because X\'s copy is always right after X). (3) Un-interleave to separate the original and copy lists. This avoids the hash map entirely.',
            },
          ],
          dryRun: 'Original: 1(→3) → 2(→1) → 3(→2) → NULL\n(notation: val(random→val))\n\nInterleaving Approach:\nStep 1 — Interleave:\n  1 → 1\' → 2 → 2\' → 3 → 3\' → NULL\n\nStep 2 — Set random for copies:\n  1.random = 3, so 1\'.random = 3.next = 3\'\n  2.random = 1, so 2\'.random = 1.next = 1\'\n  3.random = 2, so 3\'.random = 2.next = 2\'\n\nStep 3 — Separate:\n  Original: 1 → 2 → 3 → NULL\n  Copy:     1\'(→3\') → 2\'(→1\') → 3\'(→2\') → NULL\n\nDeep copy complete ✓ — all random pointers reference copy nodes, not originals.',
          problems: [
            'LeetCode 138: Copy List with Random Pointer (Medium)',
            'LeetCode 133: Clone Graph (Medium) — same hash map technique on graphs',
            'LeetCode 1485: Clone Binary Tree With Random Pointer (Medium)',
          ],
        },
      ],
      interviewPerspective: {
        title: 'What Interviewers Look For in Linked List Problems',
        checklist: [
          'Can you identify which pattern applies within the first 2 minutes of reading the problem?',
          'Do you use a dummy node when building or modifying a list to avoid null-check edge cases?',
          'Do you save the next pointer BEFORE modifying any links — the #1 source of bugs?',
          'Can you explain Floyd\'s cycle detection mathematically, not just mechanically?',
          'Do you handle edge cases: empty list, single node, two nodes, all same values?',
          'Can you code the iterative AND recursive reversal from memory?',
          'Do you analyze time AND space complexity without being prompted?',
          'Can you communicate your approach clearly BEFORE coding?',
          'Do you draw diagrams on the whiteboard to visualize pointer manipulation?',
          'Can you adapt the basic pattern when the interviewer adds a twist (e.g., reverse in groups of k)?',
        ],
      },
      mistakes: [
        {
          title: 'Forgetting to Save next Before Reversing',
          description: 'When reversing links, if you do curr->next = prev without first saving curr->next, you lose access to the rest of the list. Always declare ListNode* nextTemp = curr->next as the FIRST line inside your reversal loop.',
        },
        {
          title: 'Using == Instead of Pointer Comparison for Intersection',
          description: 'In the intersection problem, you must compare node pointers (addresses), not values. Two different nodes can have the same value but be different objects. The question asks for the node where the lists physically merge, not where values match.',
        },
        {
          title: 'Off-by-One in Remove Nth From End',
          description: 'Advancing the first pointer by n steps instead of n+1 makes the second pointer land ON the target node instead of one before it. Since you need second->next to point past the target, you need second positioned one node before. Use a dummy node and advance n+1 steps.',
        },
        {
          title: 'Not Handling Odd vs Even Length in Palindrome',
          description: 'For odd-length lists (1→2→3→2→1), the middle element (3) belongs to the first half. For even-length (1→2→2→1), the split is exact. The slow/fast pointer code handles both correctly, but make sure your comparison loop uses p2 != nullptr (not p1) since the second half may be shorter.',
        },
        {
          title: 'Infinite Loop in Cycle Detection',
          description: 'Checking fast->next before fast (fast->next != nullptr && fast != nullptr) causes a segfault when fast is NULL. Always check fast first: while (fast != nullptr && fast->next != nullptr).',
        },
        {
          title: 'Not Restoring the Original List After Palindrome Check',
          description: 'The palindrome check modifies the list by reversing the second half. In production code or when the interviewer asks you not to modify the input, you must reverse it back. Always mention this consideration even if the problem does not require it.',
        },
      ],
      takeaways: [
        'Reverse Linked List: prev/curr/next trio — the most fundamental linked list operation',
        'Merge Two Sorted: dummy head + tail pointer — the cleanest way to build a new list',
        'Floyd\'s Cycle Detection: slow (1 step) + fast (2 steps) — meets inside the cycle if one exists',
        'Remove Nth From End: two-pointer gap of n+1 — single pass elegance',
        'Palindrome Check: find middle + reverse second half + compare — combines three patterns',
        'Intersection Point: two pointers swapping heads — both travel a+b-c steps',
        'Copy with Random: interleaving trick for O(1) space deep copy — pointer manipulation mastery',
        'Always use a dummy head node when building or modifying lists — it eliminates null edge cases',
        'Always save curr->next before modifying any link — the golden rule of linked list coding',
        'Draw pointer diagrams on the whiteboard — visualization prevents 80% of bugs',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. REAL WORLD APPLICATIONS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'realworld',
    title: 'Real-World Applications',
    icon: '🌍',
    estimatedTime: '25 min',
    content: {
      hook: {
        question: 'You press Ctrl+Z in your code editor 5 times and the last 5 changes vanish. How does the editor remember every single change?',
        answer: 'It uses a doubly linked list of command objects — each node stores one action and its inverse.',
        concept: 'Linked Lists Power Undo/Redo, Browser History, Music Players, and Operating Systems',
        icon: '⏪',
      },
      keyIdea: {
        title: 'Linked Lists Are Everywhere Under the Hood',
        description: 'While arrays dominate visible user-facing data, linked lists power the hidden infrastructure: memory allocators, OS schedulers, hash tables, navigation stacks, and media playlists all rely on linked list properties — O(1) insertion/deletion, dynamic sizing, and natural ordering of connected elements.',
      },
      prose: [
        'Linked lists might seem purely academic at first glance, but they are deeply embedded in the systems you use every day. Unlike arrays which require contiguous memory, linked lists excel in scenarios where elements are frequently inserted and removed, where the total number of elements is unpredictable, or where elements need to form non-linear relationships like cycles and branches.',
        'Browser Navigation (Back/Forward): Every modern web browser maintains your navigation history using a structure analogous to a doubly linked list. When you visit a new page, a new node is appended after your current position. The "Back" button moves your current pointer one node backward, and "Forward" moves it one node forward. When you visit a new page after going back, all forward history is discarded — the new node is inserted after the current position and the old forward chain is severed. This is precisely the behavior of a doubly linked list with a current pointer.',
        'Undo/Redo (Command Pattern): Text editors, image editors like Photoshop, and IDEs like VS Code implement undo/redo using a doubly linked list of "command" objects. Each command stores the action performed and how to reverse it. Pressing Ctrl+Z moves the pointer backward through the list, applying the inverse of each command. Pressing Ctrl+Y (redo) moves forward, re-applying the command. When you make a new edit after undoing, the redo chain is discarded — identical to the browser navigation pattern. Some advanced editors support branching undo trees, which generalize the doubly linked list into a tree structure.',
        'OS Process Scheduling: Operating systems like Linux use circular doubly linked lists to manage process queues. The scheduler maintains a circular list of runnable processes. The currently executing process is at the head. When a time slice expires, the head is moved to the tail (or a priority-appropriate position) and the next node becomes the new running process. The circular structure ensures fair round-robin scheduling. Linux\'s Completely Fair Scheduler (CFS) uses red-black trees internally, but its run queue for each priority level is still a linked list. Task creation (fork) and termination (exit) are O(1) insertions and deletions — exactly what linked lists provide.',
        'Memory Allocation (Free Lists): When your C/C++ program calls malloc() or new, the memory allocator searches a "free list" — a linked list of available memory blocks. Each free block contains a header with its size and a pointer to the next free block. When you allocate memory, the allocator traverses the free list to find a block that fits (first-fit, best-fit, or worst-fit strategy), removes it from the list, and returns it to the caller. When you call free(), the block is inserted back into the free list and adjacent free blocks may be coalesced. This free list is embedded directly in the free memory itself — the pointer to the next block is stored inside the unused memory block, using zero extra space.',
        'Music Playlists: Spotify, Apple Music, and other music apps implement playlists as doubly linked lists. Each song node points to the previous and next song. The "Next" and "Previous" buttons simply advance or retreat the current pointer. Shuffle mode can be implemented by creating a randomized linked list ordering. "Repeat" mode converts the list into a circular linked list — when the last song finishes, the next pointer loops back to the first song. Adding a song to the middle of a playlist is O(1) once you have the insertion point, unlike an array where all subsequent elements would need to shift.',
        'Hash Table Chaining: Hash tables — the backbone of dictionaries, sets, and caches in every programming language — handle collisions using linked lists (separate chaining). When two keys hash to the same bucket index, their key-value pairs are stored as nodes in a linked list hanging off that bucket. Lookup involves hashing the key, going to the bucket, then traversing the chain. Java\'s HashMap uses linked lists (upgrading to red-black trees when a chain exceeds 8 nodes). Python\'s dict uses open addressing instead, but chaining with linked lists remains the most common collision resolution strategy taught and used in practice.',
        'Graph Adjacency Lists: Graphs — used in social networks, GPS navigation, recommendation engines, and network routing — are most commonly represented using adjacency lists. Each vertex stores a linked list of its neighbors. For a graph with V vertices and E edges, the adjacency list representation uses O(V + E) space, compared to O(V²) for an adjacency matrix. Traversal algorithms like BFS and DFS iterate through each vertex\'s neighbor list. This is the standard representation in libraries like Boost Graph Library (C++) and networkx (Python).',
        'LRU Cache: The Least Recently Used (LRU) cache — used by CPUs, databases, web servers, and CDNs — combines a hash map with a doubly linked list. The linked list orders items by recency: the most recently used item is at the head, the least recently used at the tail. When an item is accessed, it is moved to the head in O(1) time. When the cache is full and a new item must be added, the tail node (least recently used) is evicted in O(1) time. The hash map provides O(1) lookup by key. Together, they give O(1) get and O(1) put — the optimal cache implementation.',
      ],
      whyItMatters: [
        {
          title: 'Browser Navigation',
          description: 'Doubly linked list with a current pointer. Back/Forward traverse the list. New visits truncate forward history.',
          icon: '🌐',
        },
        {
          title: 'Undo/Redo System',
          description: 'Doubly linked list of command objects. Ctrl+Z moves backward, Ctrl+Y moves forward. New edits truncate the redo chain.',
          icon: '↩️',
        },
        {
          title: 'OS Process Scheduler',
          description: 'Circular doubly linked list of processes. Round-robin scheduling rotates through the cycle. O(1) process insertion/removal.',
          icon: '⚙️',
        },
        {
          title: 'Memory Allocator (Free List)',
          description: 'Linked list of free memory blocks embedded in the free memory itself. malloc() searches, free() reinserts into the list.',
          icon: '🧠',
        },
        {
          title: 'Music Playlist',
          description: 'Doubly linked list of songs. Next/Previous buttons traverse. Repeat mode creates a circular list. Shuffle reorders the links.',
          icon: '🎵',
        },
        {
          title: 'Hash Table Chaining',
          description: 'Each bucket holds a linked list of colliding key-value pairs. The most common collision resolution strategy in hash table implementations.',
          icon: '🔗',
        },
        {
          title: 'Graph Adjacency List',
          description: 'Each vertex stores a linked list of neighbor vertices. O(V+E) space — the standard graph representation for sparse graphs.',
          icon: '🕸️',
        },
      ],
      codeExamples: [
        {
          language: 'cpp',
          code: `// LRU Cache — Doubly Linked List + Hash Map
// O(1) get, O(1) put — The classic interview question (LeetCode 146)

#include <unordered_map>
using namespace std;

class LRUCache {
    struct DLLNode {
        int key, value;
        DLLNode* prev;
        DLLNode* next;
        DLLNode(int k, int v) : key(k), value(v),
                                 prev(nullptr), next(nullptr) {}
    };

    int capacity;
    unordered_map<int, DLLNode*> cache;  // key → node pointer
    DLLNode* head;  // Dummy head (most recent)
    DLLNode* tail;  // Dummy tail (least recent)

    void addToFront(DLLNode* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

    void removeNode(DLLNode* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void moveToFront(DLLNode* node) {
        removeNode(node);
        addToFront(node);
    }

public:
    LRUCache(int cap) : capacity(cap) {
        head = new DLLNode(0, 0);
        tail = new DLLNode(0, 0);
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;
        DLLNode* node = cache[key];
        moveToFront(node);   // Mark as most recently used
        return node->value;
    }

    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            cache[key]->value = value;
            moveToFront(cache[key]);
            return;
        }
        if ((int)cache.size() == capacity) {
            // Evict LRU (node before tail)
            DLLNode* lru = tail->prev;
            removeNode(lru);
            cache.erase(lru->key);
            delete lru;
        }
        DLLNode* newNode = new DLLNode(key, value);
        addToFront(newNode);
        cache[key] = newNode;
    }
};`,
          explanation: 'The LRU Cache uses a doubly linked list ordered by recency (head=most recent, tail=least recent) combined with a hash map for O(1) key lookup. Every get() moves the accessed node to the front. Every put() adds a new node to the front and evicts the tail node if capacity is exceeded. Dummy head and tail nodes eliminate null-check edge cases — the same technique used in our interview patterns.',
        },
        {
          language: 'cpp',
          code: `// Hash Table with Separate Chaining
// Demonstrates how linked lists handle hash collisions

#include <iostream>
#include <vector>
#include <string>
using namespace std;

class HashTable {
    struct Entry {
        string key;
        int value;
        Entry* next;
        Entry(string k, int v) : key(k), value(v), next(nullptr) {}
    };

    vector<Entry*> buckets;
    int numBuckets;
    int size;

    int hash(const string& key) {
        int h = 0;
        for (char c : key) h = (h * 31 + c) % numBuckets;
        return h;
    }

public:
    HashTable(int n = 16) : numBuckets(n), size(0) {
        buckets.resize(n, nullptr);
    }

    void put(const string& key, int value) {
        int idx = hash(key);
        Entry* curr = buckets[idx];

        // Search chain for existing key
        while (curr != nullptr) {
            if (curr->key == key) {
                curr->value = value;  // Update
                return;
            }
            curr = curr->next;
        }

        // Insert at head of chain (O(1))
        Entry* newEntry = new Entry(key, value);
        newEntry->next = buckets[idx];
        buckets[idx] = newEntry;
        size++;
    }

    int get(const string& key) {
        int idx = hash(key);
        Entry* curr = buckets[idx];
        while (curr != nullptr) {
            if (curr->key == key) return curr->value;
            curr = curr->next;
        }
        return -1;  // Not found
    }
};

// Usage:
// HashTable ht;
// ht.put("apple", 5);
// ht.put("banana", 3);  // May collide with "apple"
// cout << ht.get("apple");  // 5`,
          explanation: 'Each bucket in the hash table is a singly linked list head. When two keys hash to the same index (collision), the new entry is prepended to the chain in O(1). Lookup traverses the chain comparing keys. With a good hash function and proper load factor, chains stay short (average length = n/m where n=entries, m=buckets), giving O(1) average operations.',
        },
      ],
      callouts: [
        {
          type: 'tip',
          title: 'Interview Gold: LRU Cache',
          body: 'LRU Cache (LeetCode 146) is one of the most frequently asked interview questions at Google, Meta, Amazon, and Microsoft. It combines a doubly linked list with a hash map for O(1) get and put. If you only study one real-world linked list application, make it this one.',
        },
        {
          type: 'note',
          title: 'When Arrays Beat Linked Lists',
          body: 'Not every application benefits from linked lists. When you need random access (like a database column), cache-friendly traversal (like image processing), or compact memory usage, arrays are superior. Linked lists shine when insertion/deletion is frequent and positions are already known, or when the data naturally forms a chain or cycle.',
        },
        {
          type: 'important',
          title: 'Why Knowing Applications Matters',
          body: 'Interviewers at senior levels often ask "where would you use a linked list in a real system?" or "how would you design an LRU cache?" Knowing these applications elevates your answer from textbook recitation to engineering depth. It shows you understand trade-offs, not just definitions.',
        },
      ],
      takeaways: [
        'Browser history = doubly linked list with a current pointer — Back/Forward traverse, new visits truncate',
        'Undo/Redo = doubly linked list of commands — Ctrl+Z walks backward, Ctrl+Y walks forward',
        'OS scheduling = circular linked list — round-robin rotates through processes',
        'Memory allocator = free list — a linked list of available memory blocks embedded in free memory',
        'Music playlists = doubly linked list — Next/Previous traverse, Repeat makes it circular',
        'Hash table chaining = singly linked list per bucket — the standard collision resolution technique',
        'Graph adjacency lists = linked list per vertex — O(V+E) space for sparse graphs',
        'LRU Cache = doubly linked list + hash map — O(1) get and put, the most important application to know',
        'Linked lists shine when insertion/deletion is frequent and positions are known — arrays win for random access and cache performance',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. COMMON MISTAKES & DEBUGGING
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'mistakes',
    title: 'Common Mistakes & Debugging',
    icon: '🐛',
    estimatedTime: '20 min',
    content: {
      keyIdea: {
        title: 'Most Linked List Bugs Come From Pointer Mismanagement',
        description: 'Unlike arrays where the structure manages itself, linked lists require you to manually maintain every connection. One missed pointer update causes null dereferences, lost nodes, or infinite loops — and these bugs are notoriously hard to spot in code reviews.',
      },
      prose: [
        'Linked list bugs are among the most frustrating in programming because they are silent — your code compiles fine, may even pass simple tests, but crashes or loops infinitely on edge cases. The root cause is almost always a pointer (or reference) that was not updated correctly. This section catalogs every common mistake, shows you buggy code alongside the fix, and gives you debugging strategies that will save hours of frustration.',
        'Null Pointer Dereferencing is the #1 linked list bug. It happens when you try to access node->next or node->val on a node that is NULL. This occurs most often when you forget to check if the list is empty before processing, when your loop condition allows one extra iteration past the end, or when you forget that an operation like "delete head" might make the list empty. In C/C++ this is a segmentation fault; in Java a NullPointerException; in Python an AttributeError. Always check for NULL before accessing any node member.',
        'Lost References (Memory Leaks & Broken Links) occur when you overwrite a pointer without first saving the node it pointed to. The classic example: you want to delete a node, so you do prev->next = curr->next. If you do not save curr before this line, you lose the reference to curr and can never free its memory (in C/C++) or the garbage collector cannot determine the node is unreachable (in some edge cases). Even worse, if you are rearranging links — like reversing a list — and you set curr->next = prev without saving curr->next first, you permanently lose the rest of the list.',
        'Infinite Loops are the second most common linked list bug. They happen when you accidentally create a cycle in a non-circular list, or when your loop termination condition is wrong. The most insidious case: you are modifying the list during traversal (e.g., moving nodes around) and accidentally create a cycle. Your traversal loop never sees NULL and runs forever. If your program hangs on a linked list operation, suspect an infinite loop — add a counter that breaks after n iterations for debugging.',
        'Incorrect Traversal Direction causes bugs in doubly linked lists when you accidentally traverse using the wrong pointer. For example, trying to reach the tail by following prev pointers from the head, or reversing next/prev during insertion. In circular lists, traversal bugs are even harder to spot because there is no NULL sentinel — you must check if you have returned to the starting node. Forgetting this check causes infinite traversal.',
        'Memory Leaks in C/C++ are specific to manual memory management languages. Every node created with new must eventually be deleted with delete. When you remove a node from the list by adjusting pointers (prev->next = curr->next), you must explicitly delete curr. Forgetting this causes a memory leak that grows linearly with the number of deletions. Use tools like Valgrind or AddressSanitizer to detect leaks. In Java, Python, and JavaScript, the garbage collector handles this — but you should still be aware of the concept for interviews.',
        'Edge Cases That Break Code: Many linked list solutions that work perfectly for lists with 3+ nodes fail on edge cases. The critical edge cases are: (1) Empty list (head is NULL) — every function must check this. (2) Single-node list — operations like "reverse" and "find middle" must handle this. (3) Two-node list — operations like "swap pairs" and "remove nth from end" often fail here. (4) Operation on the head node — deleting or inserting before the head requires updating the head pointer. (5) Operation on the tail node — deleting the tail requires finding the second-to-last node. Always test your solution with these five cases before submitting.',
      ],
      mistakes: [
        {
          title: 'Dereferencing NULL (Segfault / NullPointerException)',
          description: 'Accessing node->next or node->val when node is NULL. This happens when you forget to check for an empty list, when your loop runs one iteration too many, or when a deletion makes the list empty. Fix: always add NULL checks before accessing any member. Use "if (head == nullptr) return;" as the first line of every function.',
        },
        {
          title: 'Losing the Next Pointer During Reversal',
          description: 'Writing curr->next = prev without saving curr->next first. This disconnects the rest of the list permanently. Fix: always declare ListNode* nextTemp = curr->next BEFORE modifying curr->next. This is the golden rule of linked list manipulation.',
        },
        {
          title: 'Forgetting to Update Head After Deletion',
          description: 'When deleting the head node, you must set head = head->next. If you only do prev->next = curr->next and curr happens to be the head (where prev is NULL), you crash. Fix: use a dummy node — dummy.next = head — so the head is never a special case. Return dummy.next as the new head.',
        },
        {
          title: 'Creating an Accidental Cycle',
          description: 'When inserting a node, if you set newNode->next = newNode (accidentally pointing to itself) or set a tail node\'s next to a previous node, you create a cycle. Any future traversal will loop forever. Fix: always set newNode->next to the correct target. After modifications, verify with a slow/fast pointer cycle check during debugging.',
        },
        {
          title: 'Off-by-One in Loop Termination',
          description: 'Using while (curr != nullptr) when you need while (curr->next != nullptr) (or vice versa). The first stops AT the last node; the second stops BEFORE the last node. Confusing them causes you to either miss the last node or overshoot into NULL. Fix: draw out the list and trace your loop manually for a 3-node list.',
        },
        {
          title: 'Not Handling Single-Node Lists',
          description: 'Many solutions assume at least 2 nodes. Operations like "find the second-to-last" or "swap the first two nodes" crash on single-node lists. Fix: add explicit checks for head->next == nullptr early in your function. Consider what the function should return for a single-node input.',
        },
        {
          title: 'Memory Leak After Node Removal (C/C++)',
          description: 'Adjusting pointers to skip a node without calling delete on the removed node. The node still occupies memory but is unreachable. Over time, this leaks gigabytes in long-running applications. Fix: always save a pointer to the node before unlinking it, then delete it after relinking.',
        },
        {
          title: 'Modifying the List While Iterating',
          description: 'Deleting or moving the current node during traversal without saving the next pointer first. This is especially dangerous in problems like "remove all nodes with value X" where multiple consecutive nodes might be deleted. Fix: save curr->next at the start of each loop iteration, or use a two-pointer (prev, curr) pattern where prev handles the unlinking.',
        },
        {
          title: 'Wrong Loop Condition for Doubly Linked Lists',
          description: 'In a DLL, using while (curr != nullptr) for backward traversal starting from tail. This works for forward traversal but can overshoot the head going backward. For circular DLLs, using while (curr != nullptr) causes an infinite loop since there is no NULL. Fix: for circular lists, use do-while and check curr != head after advancing.',
        },
        {
          title: 'Returning the Wrong Head',
          description: 'After modifying a list (e.g., sorting, reversing, merging), returning the old head instead of the new head. The old head is now somewhere in the middle or at the tail. Fix: always track the new head explicitly. Using a dummy node and returning dummy.next is the safest approach.',
        },
      ],
      codeExamples: [
        {
          language: 'cpp',
          code: `// ❌ BUG: Null pointer dereference when deleting from empty list
void deleteFront_BUGGY(ListNode*& head) {
    // CRASH if head is NULL!
    ListNode* temp = head;
    head = head->next;  // Segfault: head is NULL
    delete temp;
}

// ✅ FIX: Check for NULL before accessing members
void deleteFront_FIXED(ListNode*& head) {
    if (head == nullptr) return;  // Guard clause
    ListNode* temp = head;
    head = head->next;
    delete temp;
}`,
          explanation: 'The buggy version crashes when called on an empty list because it dereferences head (which is NULL) on the second line. The fix adds a single NULL check at the top. This pattern should be the first line of EVERY linked list function.',
        },
        {
          language: 'cpp',
          code: `// ❌ BUG: Lost reference during reversal — rest of list is lost
ListNode* reverse_BUGGY(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        curr->next = prev;  // BUG: curr->next is lost forever!
        prev = curr;
        curr = curr->next;  // curr->next was just set to prev!
                             // This goes BACKWARD, not forward.
    }
    return prev;
}

// ✅ FIX: Save next BEFORE overwriting curr->next
ListNode* reverse_FIXED(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;  // SAVE next first!
        curr->next = prev;                // Now safe to overwrite
        prev = curr;
        curr = nextTemp;                  // Use saved pointer
    }
    return prev;
}`,
          explanation: 'In the buggy version, line "curr->next = prev" overwrites the forward link. Then "curr = curr->next" follows the overwritten link back to prev, causing an infinite loop between two nodes. The fix saves curr->next into nextTemp BEFORE modifying it. This is the single most common linked list bug.',
        },
        {
          language: 'cpp',
          code: `// ❌ BUG: Memory leak — deleted node is never freed
void deleteNode_BUGGY(ListNode* head, int target) {
    if (head == nullptr) return;
    if (head->val == target) {
        head = head->next;  // BUG 1: Only changes local copy
        // BUG 2: Original head node is never deleted
        return;
    }
    ListNode* curr = head;
    while (curr->next != nullptr) {
        if (curr->next->val == target) {
            curr->next = curr->next->next;  // BUG 3: Leaked node
            return;
        }
        curr = curr->next;
    }
}

// ✅ FIX: Use reference parameter and free memory
void deleteNode_FIXED(ListNode*& head, int target) {
    if (head == nullptr) return;
    if (head->val == target) {
        ListNode* temp = head;     // Save for deletion
        head = head->next;         // Update via reference
        delete temp;               // Free memory
        return;
    }
    ListNode* curr = head;
    while (curr->next != nullptr) {
        if (curr->next->val == target) {
            ListNode* temp = curr->next;    // Save for deletion
            curr->next = curr->next->next;  // Unlink
            delete temp;                    // Free memory
            return;
        }
        curr = curr->next;
    }
}`,
          explanation: 'The buggy version has three problems: (1) Passing head by value means changes to head do not affect the caller. (2) The old head node is never freed. (3) When deleting from the middle, the unlinked node leaks. The fix uses pass-by-reference (ListNode*&) and explicitly saves and deletes every removed node.',
        },
        {
          language: 'cpp',
          code: `// ❌ BUG: Infinite loop — accidental cycle creation during insertion
void insertAfter_BUGGY(ListNode* node, int val) {
    ListNode* newNode = new ListNode(val);
    newNode->next = newNode;  // BUG: Points to itself! Creates cycle.
    // Should be: newNode->next = node->next;
    node->next = newNode;
    // Now: node → newNode → newNode → newNode → ... (infinite)
}

// ✅ FIX: Point new node to the correct next
void insertAfter_FIXED(ListNode* node, int val) {
    if (node == nullptr) return;  // Guard clause
    ListNode* newNode = new ListNode(val);
    newNode->next = node->next;  // Point to what was after node
    node->next = newNode;        // Insert newNode after node
    // Now: ... → node → newNode → (rest of list)
}`,
          explanation: 'A typo (newNode->next = newNode instead of newNode->next = node->next) creates a self-referencing cycle. Any traversal past this node loops forever. This is surprisingly easy to do when coding quickly under interview pressure. Always double-check which node each pointer should reference.',
        },
      ],
      callouts: [
        {
          type: 'tip',
          title: 'Debugging Strategy: Add a Print Function',
          body: 'Write a helper function that prints the entire list (with a maximum iteration count to avoid infinite loops): void printList(ListNode* head, int maxNodes = 20). Call it after every pointer modification during debugging. Seeing the list state at each step catches bugs instantly.',
        },
        {
          type: 'warning',
          title: 'The Five Critical Edge Cases',
          body: 'Test EVERY linked list function with: (1) Empty list (NULL), (2) Single node, (3) Two nodes, (4) Operation on the head, (5) Operation on the tail. If your solution passes all five, it will almost certainly pass all test cases. If it fails any of these, there is a pointer bug.',
        },
        {
          type: 'tip',
          title: 'Use a Dummy Node to Avoid Head Edge Cases',
          body: 'Create a dummy node with dummy.next = head at the start of your function. Perform all operations relative to dummy. Return dummy.next as the result. This eliminates the need to special-case head modifications — the most common source of linked list bugs in interviews.',
        },
        {
          type: 'important',
          title: 'Valgrind and AddressSanitizer for C/C++',
          body: 'Compile with -fsanitize=address (Clang/GCC) or run through Valgrind to catch memory leaks, use-after-free, and buffer overflows in linked list code. These tools pinpoint the exact line of the bug. In interviews, mentioning these tools shows engineering maturity.',
        },
      ],
      interviewPerspective: {
        title: 'What Interviewers Watch For in Debugging',
        checklist: [
          'Do you add NULL checks proactively, or only after the interviewer points out a crash?',
          'Do you test edge cases (empty list, single node) without being prompted?',
          'Do you use a dummy node to avoid head-modification bugs?',
          'Can you trace through your code on a whiteboard and catch pointer bugs visually?',
          'Do you mention memory management (delete in C++, garbage collection in Java)?',
          'Do you save the next pointer before modifying links — consistently, every time?',
          'Can you identify whether your loop should use curr != NULL or curr->next != NULL?',
          'Do you recognize when your modification might break the list for the caller (pass-by-value vs reference)?',
        ],
      },
      takeaways: [
        'Always check for NULL before accessing any node member — the #1 linked list bug',
        'Save curr->next BEFORE modifying curr->next — the golden rule of pointer manipulation',
        'Use a dummy head node to eliminate head-modification edge cases',
        'Test every function with 5 cases: empty, single node, two nodes, head operation, tail operation',
        'In C/C++, always delete removed nodes to prevent memory leaks',
        'Pass head by reference (ListNode*& in C++) when the function might change the head',
        'Add a printList helper with a max iteration guard to debug infinite loops',
        'Use Valgrind or AddressSanitizer to catch memory bugs automatically in C/C++',
        'When your program hangs, suspect an accidental cycle — use Floyd\'s detection as a diagnostic tool',
        'Draw pointer diagrams before coding — 80% of linked list bugs are preventable with visualization',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 17. INTERVIEW PREPARATION HUB (REVISION HUB)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'interview-hub',
    title: 'Interview Preparation Hub',
    icon: '🎯',
    estimatedTime: '30 min',
    content: {
      revisionHub: {
        topicSummary: {
          definition: [
            'A Linked List is a linear data structure where elements (nodes) are stored in non-contiguous memory locations and connected via pointers. Each node contains data and one or more pointers to other nodes.',
            'Unlike arrays, linked lists do not require contiguous memory, support O(1) insertion and deletion at known positions, and can grow or shrink dynamically without reallocation.',
            'The three main variants are Singly Linked List (each node points to the next), Doubly Linked List (each node points to both next and previous), and Circular Linked List (the tail connects back to the head, forming a cycle).',
          ],
          whyImportant: [
            'Linked lists are the second most tested data structure in technical interviews after arrays — appearing in 15-20% of coding questions at FAANG companies.',
            'They teach fundamental pointer manipulation skills that transfer directly to trees, graphs, and complex data structures.',
            'Real-world systems use linked lists in memory allocators (free lists), OS schedulers (process queues), hash tables (collision chaining), LRU caches, and navigation history stacks.',
            'Mastering linked lists demonstrates your ability to handle manual memory management, edge cases, and low-level data structure operations — skills that distinguish strong candidates.',
            'Many "Medium" and "Hard" interview problems combine linked list patterns (e.g., reverse + merge, find middle + reverse for palindrome), so knowing the building blocks is essential.',
          ],
        },
        keyConcepts: [
          {
            title: 'Node',
            description: 'The fundamental building block of a linked list. Each node contains a data field and one or more pointer fields that connect it to other nodes. In C++: struct Node { int val; Node* next; };',
            icon: '📦',
          },
          {
            title: 'Pointer / Reference',
            description: 'A variable that stores the memory address of another node. Pointers create the "links" in a linked list. NULL (or nullptr) indicates the end of a chain or the absence of a connection.',
            icon: '👉',
          },
          {
            title: 'Head & Tail',
            description: 'Head is the pointer to the first node — the entry point to the entire list. Tail is the pointer to the last node (optional but enables O(1) append). Losing the head pointer means losing the entire list.',
            icon: '🏷️',
          },
          {
            title: 'Singly Linked List (SLL)',
            description: 'Each node has one pointer (next) pointing to the following node. Traversal is forward-only. Simple but limited: you cannot go backward or delete a node in O(1) without the previous pointer.',
            icon: '➡️',
          },
          {
            title: 'Doubly Linked List (DLL)',
            description: 'Each node has two pointers (next and prev). Enables bidirectional traversal and O(1) deletion of any node given its pointer. Used in LRU caches, browser history, and undo/redo systems. Costs extra memory per node.',
            icon: '↔️',
          },
          {
            title: 'Circular Linked List',
            description: 'The tail node\'s next pointer points back to the head, forming a cycle. Can be singly or doubly linked. Used in round-robin scheduling, circular buffers, and music playlist repeat mode. Has no NULL — traversal must check for return to the start node.',
            icon: '🔄',
          },
          {
            title: 'Fast & Slow Pointers (Floyd\'s)',
            description: 'A technique where two pointers traverse at different speeds (slow: 1 step, fast: 2 steps). Used to find the middle element, detect cycles, and determine cycle start points. The foundation of many advanced linked list algorithms.',
            icon: '🐢🐇',
          },
          {
            title: 'Dummy / Sentinel Node',
            description: 'A placeholder node placed before the actual head to simplify edge case handling. dummy.next = head. Operations never need to special-case head modifications. Return dummy.next as the result. Used in merge, partition, and deletion problems.',
            icon: '🛡️',
          },
        ],
        operationsTable: [
          { operation: 'Access by Index', complexity: 'O(n)', note: 'Must traverse from head — no random access' },
          { operation: 'Search by Value', complexity: 'O(n)', note: 'Linear scan from head to tail' },
          { operation: 'Insert at Head', complexity: 'O(1)', note: 'Create node, point to old head, update head' },
          { operation: 'Insert at Tail', complexity: 'O(1) with tail pointer, O(n) without', note: 'Append and update tail pointer' },
          { operation: 'Insert at Position', complexity: 'O(n)', note: 'Traverse to position, then O(1) link adjustment' },
          { operation: 'Delete Head', complexity: 'O(1)', note: 'Update head to head->next, free old head' },
          { operation: 'Delete Tail', complexity: 'O(n) SLL, O(1) DLL', note: 'SLL must find second-to-last; DLL uses tail->prev' },
          { operation: 'Delete by Value', complexity: 'O(n)', note: 'Search + unlink; O(1) unlink with DLL and given node' },
          { operation: 'Delete Given Node (DLL)', complexity: 'O(1)', note: 'Adjust prev and next pointers of neighbors' },
          { operation: 'Reverse (Iterative)', complexity: 'O(n) time, O(1) space', note: 'Three-pointer technique: prev, curr, next' },
          { operation: 'Find Middle', complexity: 'O(n)', note: 'Fast/slow pointer technique, single pass' },
          { operation: 'Detect Cycle', complexity: 'O(n) time, O(1) space', note: 'Floyd\'s tortoise and hare algorithm' },
        ],
        methodsCheatSheet: [
          {
            category: 'Singly Linked List Operations',
            methods: [
              {
                method: 'insertAtHead(val)',
                purpose: 'Add a new node at the beginning of the list',
                complexity: 'O(1)',
                example: 'newNode->next = head; head = newNode;',
              },
              {
                method: 'insertAtTail(val)',
                purpose: 'Add a new node at the end of the list',
                complexity: 'O(n) or O(1) with tail',
                example: 'tail->next = newNode; tail = newNode;',
              },
              {
                method: 'insertAtPosition(pos, val)',
                purpose: 'Insert a node at a specific position (0-indexed)',
                complexity: 'O(n)',
                example: 'Traverse to pos-1, newNode->next = curr->next; curr->next = newNode;',
              },
              {
                method: 'deleteHead()',
                purpose: 'Remove the first node and return its value',
                complexity: 'O(1)',
                example: 'temp = head; head = head->next; delete temp;',
              },
              {
                method: 'deleteTail()',
                purpose: 'Remove the last node',
                complexity: 'O(n)',
                example: 'Traverse to second-to-last, set its next to NULL, delete old tail.',
              },
              {
                method: 'deleteByValue(val)',
                purpose: 'Remove the first node with the given value',
                complexity: 'O(n)',
                example: 'Find node with prev pointer, prev->next = curr->next; delete curr;',
              },
              {
                method: 'search(val)',
                purpose: 'Check if a value exists in the list',
                complexity: 'O(n)',
                example: 'Traverse with curr, return true if curr->val == val.',
              },
              {
                method: 'reverse()',
                purpose: 'Reverse the entire list in-place',
                complexity: 'O(n) time, O(1) space',
                example: 'prev=NULL, curr=head; while(curr) { next=curr->next; curr->next=prev; prev=curr; curr=next; }',
              },
              {
                method: 'getSize()',
                purpose: 'Count the number of nodes',
                complexity: 'O(n) or O(1) with size variable',
                example: 'Traverse and count, or maintain a size member variable.',
              },
            ],
          },
          {
            category: 'Doubly Linked List Operations',
            methods: [
              {
                method: 'insertAtHead(val)',
                purpose: 'Add a new node at the beginning',
                complexity: 'O(1)',
                example: 'newNode->next = head; head->prev = newNode; head = newNode;',
              },
              {
                method: 'insertAtTail(val)',
                purpose: 'Add a new node at the end',
                complexity: 'O(1) with tail pointer',
                example: 'tail->next = newNode; newNode->prev = tail; tail = newNode;',
              },
              {
                method: 'deleteNode(node)',
                purpose: 'Remove a specific node given its pointer',
                complexity: 'O(1)',
                example: 'node->prev->next = node->next; node->next->prev = node->prev; delete node;',
              },
              {
                method: 'moveToFront(node)',
                purpose: 'Move an existing node to the head (used in LRU cache)',
                complexity: 'O(1)',
                example: 'removeNode(node); addToFront(node);',
              },
              {
                method: 'deleteTail()',
                purpose: 'Remove the last node',
                complexity: 'O(1)',
                example: 'temp = tail; tail = tail->prev; tail->next = NULL; delete temp;',
              },
              {
                method: 'traverseBackward()',
                purpose: 'Visit all nodes from tail to head',
                complexity: 'O(n)',
                example: 'curr = tail; while(curr) { process(curr); curr = curr->prev; }',
              },
            ],
          },
        ],
        patternSummary: [
          {
            category: 'Fast & Slow Pointer Patterns',
            patterns: [
              {
                name: 'Find Middle Node',
                whenToUse: 'When you need the middle element in a single pass without counting',
                explanation: 'Slow moves 1 step, fast moves 2 steps. When fast reaches the end, slow is at the middle. For even-length lists, slow stops at the first of the two middle nodes (or second, depending on the loop condition).',
                difficulty: 'Easy',
              },
              {
                name: 'Detect Cycle (Floyd\'s)',
                whenToUse: 'When checking if a linked list has a loop or finding the cycle start',
                explanation: 'If fast and slow meet, a cycle exists. To find the start: reset one pointer to head, move both at speed 1 — they meet at the cycle entry. Mathematical proof: distance from head to cycle start equals distance from meeting point to cycle start going forward.',
                difficulty: 'Medium',
              },
              {
                name: 'Find Nth From End',
                whenToUse: 'When a problem references positions from the tail end of the list',
                explanation: 'Advance one pointer n steps ahead, then move both together. When the lead pointer reaches NULL, the trailing pointer is at the nth node from the end. Use n+1 gap with a dummy node for deletion.',
                difficulty: 'Medium',
              },
            ],
          },
          {
            category: 'Reversal Patterns',
            patterns: [
              {
                name: 'Full List Reversal',
                whenToUse: 'When the entire list needs to be reversed, or as a subroutine in other problems',
                explanation: 'Three-pointer technique: prev (starts NULL), curr (starts head), next (saved each iteration). At each step: save next, reverse link, advance prev and curr. New head is prev after the loop ends.',
                difficulty: 'Easy',
              },
              {
                name: 'Partial Reversal (Between Positions)',
                whenToUse: 'Reverse nodes between positions left and right (LeetCode 92)',
                explanation: 'Traverse to position left-1 (the node before the reversal segment). Reverse the segment using the standard technique. Reconnect the reversed segment to the rest of the list. Track the connection point and the new tail of the reversed segment.',
                difficulty: 'Medium',
              },
              {
                name: 'Reverse in k-Groups',
                whenToUse: 'Reverse every k consecutive nodes (LeetCode 25)',
                explanation: 'Check if k nodes remain. If yes, reverse the next k nodes. Connect the reversed group to the previous group. Recurse or iterate for the remaining list. Track group head and tail for reconnection.',
                difficulty: 'Hard',
              },
            ],
          },
          {
            category: 'Merge & Sort Patterns',
            patterns: [
              {
                name: 'Merge Two Sorted Lists',
                whenToUse: 'Combining two sorted sequences into one sorted result',
                explanation: 'Use a dummy head and tail pointer. Compare front nodes of both lists, attach the smaller one to tail. When one list is exhausted, attach the remainder of the other. Return dummy.next.',
                difficulty: 'Easy',
              },
              {
                name: 'Merge Sort on Linked List',
                whenToUse: 'Sorting a linked list in O(n log n) time',
                explanation: 'Find the middle using fast/slow pointers. Recursively sort left and right halves. Merge the two sorted halves. Unlike array merge sort, linked list merge sort uses O(1) extra space (O(log n) for recursion stack).',
                difficulty: 'Medium',
              },
              {
                name: 'Merge k Sorted Lists',
                whenToUse: 'Merging more than 2 sorted lists efficiently',
                explanation: 'Use a min-heap (priority queue) of size k. Push the head of each list into the heap. Extract the minimum, attach it to the result, and push its next node. Alternatively, use divide-and-conquer to merge pairs of lists recursively.',
                difficulty: 'Hard',
              },
            ],
          },
          {
            category: 'Structural Manipulation Patterns',
            patterns: [
              {
                name: 'Palindrome Check',
                whenToUse: 'Verify if a list reads the same forwards and backwards in O(1) space',
                explanation: 'Find the middle (fast/slow), reverse the second half, compare both halves element by element. Optionally restore the list by reversing the second half again. Combines three basic patterns into one.',
                difficulty: 'Medium',
              },
              {
                name: 'Intersection of Two Lists',
                whenToUse: 'Find the node where two lists converge (Y-shape)',
                explanation: 'Two pointers traverse both lists. When one reaches NULL, it jumps to the other list\'s head. Both pointers travel a+b-c steps and meet at the intersection (or both reach NULL if no intersection).',
                difficulty: 'Easy',
              },
              {
                name: 'Deep Copy with Random Pointer',
                whenToUse: 'Clone a list with arbitrary cross-references',
                explanation: 'Hash map approach: map original→copy, then wire next and random. Interleaving approach: insert copies after originals, set random pointers using orig->random->next, then separate the two lists. O(1) space.',
                difficulty: 'Medium',
              },
            ],
          },
        ],
        commonQuestions: [
          { title: 'Reverse Linked List', difficulty: 'Easy', patternUsed: 'Iterative Reversal (prev/curr/next)', frequency: 'High' },
          { title: 'Merge Two Sorted Lists', difficulty: 'Easy', patternUsed: 'Dummy Head + Two-Pointer Merge', frequency: 'High' },
          { title: 'Linked List Cycle Detection', difficulty: 'Easy', patternUsed: 'Floyd\'s Slow/Fast Pointers', frequency: 'High' },
          { title: 'Middle of the Linked List', difficulty: 'Easy', patternUsed: 'Fast/Slow Pointer', frequency: 'High' },
          { title: 'Remove Nth Node From End', difficulty: 'Medium', patternUsed: 'Two-Pointer Gap Technique', frequency: 'High' },
          { title: 'Palindrome Linked List', difficulty: 'Easy', patternUsed: 'Find Middle + Reverse + Compare', frequency: 'Medium' },
          { title: 'Intersection of Two Linked Lists', difficulty: 'Easy', patternUsed: 'Two-Pointer List Swap', frequency: 'Medium' },
          { title: 'LRU Cache', difficulty: 'Medium', patternUsed: 'Doubly Linked List + Hash Map', frequency: 'High' },
          { title: 'Copy List with Random Pointer', difficulty: 'Medium', patternUsed: 'Interleaving / Hash Map Clone', frequency: 'Medium' },
          { title: 'Sort List (Merge Sort)', difficulty: 'Medium', patternUsed: 'Find Middle + Merge Sort', frequency: 'Medium' },
          { title: 'Reverse Nodes in k-Group', difficulty: 'Hard', patternUsed: 'Group Reversal + Reconnection', frequency: 'Medium' },
          { title: 'Add Two Numbers', difficulty: 'Medium', patternUsed: 'Simultaneous Traversal + Carry', frequency: 'High' },
          { title: 'Flatten a Multilevel DLL', difficulty: 'Medium', patternUsed: 'DFS / Stack-Based Flattening', frequency: 'Low' },
          { title: 'Merge k Sorted Lists', difficulty: 'Hard', patternUsed: 'Min-Heap / Divide and Conquer', frequency: 'Medium' },
        ],
        commonMistakes: [
          {
            title: 'Dereferencing NULL',
            description: 'Accessing node->next or node->val when node is NULL. Always add a NULL check as the first line of every linked list function. Test with empty list input.',
          },
          {
            title: 'Losing the Next Pointer',
            description: 'Overwriting curr->next before saving it. Always save ListNode* next = curr->next BEFORE modifying curr->next. This is the golden rule.',
          },
          {
            title: 'Forgetting to Update Head',
            description: 'After deleting or inserting at the head, not returning or updating the head pointer. Use a dummy node and return dummy.next to avoid this entirely.',
          },
          {
            title: 'Off-by-One in Loop Conditions',
            description: 'Confusing while(curr != NULL) vs while(curr->next != NULL). The first processes all nodes including the last; the second stops at the second-to-last. Trace through manually with a 2-node list to verify.',
          },
          {
            title: 'Memory Leaks in C/C++',
            description: 'Unlinking a node without calling delete. Every new must have a corresponding delete. Use Valgrind or AddressSanitizer to detect leaks in practice.',
          },
          {
            title: 'Not Testing Edge Cases',
            description: 'Code that works for 3+ nodes but fails on empty list, single node, or two nodes. Always test with these three inputs plus head-operation and tail-operation cases.',
          },
          {
            title: 'Creating Accidental Cycles',
            description: 'Setting a node\'s next pointer to itself or to a previous node by mistake. Any future traversal will loop forever. Use a counter-limited print function to debug.',
          },
          {
            title: 'Returning Old Head After Modification',
            description: 'After reversing, sorting, or merging, returning the original head (which is now the tail). Always track the new head explicitly or use a dummy node.',
          },
        ],
        interviewCrashNotes: [
          {
            category: 'Before the Interview',
            notes: [
              'Practice coding reversal, merge, and cycle detection from memory — these are the most common patterns.',
              'Know the time and space complexity of every linked list operation without looking it up.',
              'Be prepared to implement a Node struct/class from scratch in your language of choice.',
              'Practice drawing pointer diagrams on paper or whiteboard — visual communication is critical.',
              'Review the difference between SLL, DLL, and Circular LL — know when each is appropriate.',
              'Prepare to explain LRU Cache design: DLL + HashMap, O(1) get/put, eviction policy.',
            ],
          },
          {
            category: 'During the Interview',
            notes: [
              'Always start by asking: Is the list sorted? Can there be cycles? Singly or doubly linked? Can I modify the list?',
              'Use a dummy node for any problem that builds or modifies a list — it eliminates 90% of edge cases.',
              'Save the next pointer BEFORE modifying any link — say this out loud to show awareness.',
              'Draw the list state before and after each operation on the whiteboard.',
              'Mention edge cases proactively: empty list, single node, two nodes, duplicate values.',
              'State your time and space complexity clearly after coding — do not wait to be asked.',
              'If stuck, start with the brute force approach, then optimize. Interviewers value problem-solving process.',
            ],
          },
          {
            category: 'Common Follow-Up Questions',
            notes: [
              '"Can you do it in-place / O(1) space?" — Use pointer manipulation instead of extra data structures.',
              '"Can you do it in a single pass?" — Use the two-pointer gap technique or fast/slow pointers.',
              '"What if the list is doubly linked?" — Operations become easier with prev pointers; mention O(1) deletion.',
              '"Can you do it recursively?" — Know recursive reversal, recursive merge, and the trade-off (O(n) stack space).',
              '"How would you test this?" — List the 5 edge cases: empty, single, two nodes, head op, tail op.',
              '"What happens in a concurrent/multi-threaded environment?" — Mention locks, CAS, or lock-free linked lists.',
            ],
          },
          {
            category: 'Key Complexity Facts to Memorize',
            notes: [
              'SLL Insert/Delete at head: O(1) — the key advantage over arrays.',
              'SLL Insert/Delete at tail: O(n) without tail pointer, O(1) insert with tail pointer, O(n) delete always (need prev).',
              'DLL Insert/Delete at any known node: O(1) — the advantage of doubly linked.',
              'Search/Access by index: O(n) — the key disadvantage vs arrays.',
              'Merge Sort on linked list: O(n log n) time, O(log n) space (recursion stack only).',
              'Floyd\'s Cycle Detection: O(n) time, O(1) space — faster than hash set approach.',
              'LRU Cache with DLL + HashMap: O(1) get, O(1) put — the gold standard.',
            ],
          },
        ],
        finalQuiz: [
          {
            id: 'hub-q1',
            question: 'In Floyd\'s cycle detection, after the slow and fast pointers meet inside the cycle, how do you find the node where the cycle begins?',
            options: [
              { id: 'a', text: 'Reset both pointers to the head and move at speed 2 until they meet' },
              { id: 'b', text: 'Reset one pointer to the head, keep the other at the meeting point, and move both at speed 1 until they meet' },
              { id: 'c', text: 'Count the cycle length, then use two pointers with that gap from the head' },
              { id: 'd', text: 'Reverse the list from the meeting point and find where it connects to the head' },
            ],
            correctId: 'b',
            explanation: 'After meeting, reset one pointer to the head and keep the other at the meeting point. Move both at speed 1. They will meet at the cycle start. This works because the distance from the head to the cycle start equals the distance from the meeting point to the cycle start (going forward through the cycle). Option C also works but is less elegant and requires an extra pass to count the cycle length.',
          },
          {
            id: 'hub-q2',
            question: 'What is the time and space complexity of checking if a singly linked list is a palindrome using the optimal approach (find middle + reverse second half + compare)?',
            options: [
              { id: 'a', text: 'O(n) time, O(n) space' },
              { id: 'b', text: 'O(n) time, O(1) space' },
              { id: 'c', text: 'O(n²) time, O(1) space' },
              { id: 'd', text: 'O(n log n) time, O(1) space' },
            ],
            correctId: 'b',
            explanation: 'Finding the middle takes O(n) with fast/slow pointers. Reversing the second half takes O(n/2). Comparing takes O(n/2). Total: O(n) time. No extra data structures are used — the reversal is done in-place — so space is O(1). The alternative approach of copying to an array and checking is O(n) time but O(n) space.',
          },
          {
            id: 'hub-q3',
            question: 'Why is a dummy (sentinel) node used when building or modifying a linked list in interview solutions?',
            options: [
              { id: 'a', text: 'It improves the time complexity of operations from O(n) to O(1)' },
              { id: 'b', text: 'It prevents memory leaks by acting as a garbage collection root' },
              { id: 'c', text: 'It eliminates the need to special-case head modifications, making code cleaner and less error-prone' },
              { id: 'd', text: 'It is required by the C++ standard library for all linked list operations' },
            ],
            correctId: 'c',
            explanation: 'A dummy node sits before the actual head, so operations that might change the head (like deleting the first node or inserting before it) do not need special-case code. Without a dummy, you must separately handle head == nullptr and operations on the head node, which is the #1 source of linked list bugs in interviews. The dummy does not change time complexity — it only simplifies the code logic.',
          },
          {
            id: 'hub-q4',
            question: 'In the "Remove Nth Node From End" pattern, why do we advance the first pointer n+1 steps (not n steps) ahead of the second pointer?',
            options: [
              { id: 'a', text: 'To ensure the algorithm works for circular linked lists' },
              { id: 'b', text: 'So that when the first pointer reaches NULL, the second pointer is one node BEFORE the target — enabling deletion via second->next = second->next->next' },
              { id: 'c', text: 'Because linked lists are 1-indexed, so we need an extra step for the offset' },
              { id: 'd', text: 'To avoid an off-by-one error in the loop termination condition' },
            ],
            correctId: 'b',
            explanation: 'To delete a node in a singly linked list, you need a pointer to the node BEFORE the target (so you can do prev->next = target->next). By maintaining a gap of n+1 instead of n, the second pointer ends up exactly one position before the nth-from-end node. This is why we also use a dummy node — it handles the case where the node to delete is the head itself (when second ends up at the dummy).',
          },
        ],
      },
    },
  },
];
