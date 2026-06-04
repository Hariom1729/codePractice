import type { TopicContent, Section } from './types';

export const linkedListsContent: TopicContent = {
  id: 'linked-lists',
  title: 'Linked Lists',
  subtitle: 'Pointer-Based Linear Data Structures',
  description: 'Master Linked Lists from basic node structures to advanced interview patterns. Learn Singly, Doubly, and Circular Linked Lists, pointer rewiring, Floyd\'s cycle detection, reversal techniques, and solve classic interview problems.',
  totalTime: '10–12 Hours',
  difficulty: 'Beginner',
  prerequisites: ['Basic Programming', 'Variables & Loops', 'Memory Basics'],
  sections: [
// ─────────────────────────────────────────────────────────────────────────
  // 1. INTRODUCTION TO LINKED LISTS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'intro',
    title: 'Introduction to Linked Lists',
    icon: '🔗',
    estimatedTime: '10 min',
    content: {
      hook: {
        question: 'How does your browser remember every page you visited so you can hit Back and Forward instantly?',
        answer: 'It uses a doubly linked list — each page points to the previous and next page, allowing instant navigation in both directions without shifting any data.',
        concept: 'Non-contiguous linked data storage',
        icon: '🌐'
      },

      keyIdea: {
        title: 'Dynamic Chain of Nodes',
        description: 'A Linked List is a linear data structure where each element (node) stores its data and a reference (pointer) to the next node. Unlike arrays, nodes are scattered across memory and connected through pointers, enabling efficient insertions and deletions without shifting elements.'
      },

      prose: [
        'A Linked List is one of the most fundamental and versatile data structures in computer science. At its core, it is a collection of elements called nodes, where each node holds two things: the actual data you want to store, and a pointer (or reference) that tells the computer where to find the next node in the sequence. Unlike arrays, which store elements in a contiguous block of memory, linked list nodes can live anywhere in the heap — scattered across random memory addresses — and are stitched together solely through these pointers.',

        'The concept of linked lists dates back to 1955–1956, when Allen Newell, Cliff Shaw, and Herbert A. Simon developed the Information Processing Language (IPL) at the RAND Corporation. They needed a way to represent complex, dynamic data for their Logic Theory Machine — one of the first AI programs — and arrays were too rigid because their size had to be fixed at creation time. Linked lists solved this by allowing data to grow and shrink dynamically at runtime, allocating memory only when needed and freeing it when done.',

        'Arrays have a critical limitation: inserting or deleting an element in the middle requires shifting all subsequent elements, which takes O(n) time. Imagine you have a sorted list of 10 million records and need to insert a new record at position 500 — the array must physically move 9,999,500 elements one position to the right just to make room. Linked lists eliminate this problem entirely. To insert a node, you simply adjust two pointers, which is an O(1) operation regardless of the list size. This makes linked lists ideal for applications with frequent insertions and deletions.',

        'Linked lists appear everywhere in real-world software, often hidden beneath higher-level abstractions. Your browser\'s back-forward history is a doubly linked list where each page points to the previous and next pages. Music playlists in Spotify use a linked list so you can skip forward, go back, and insert songs in the middle without re-indexing the entire playlist. The Undo/Redo system in text editors like VS Code maintains a linked list of editing states. Operating system memory allocators use free lists (linked lists of available memory blocks) to manage heap allocation. Even the blockchain — the foundation of Bitcoin and Ethereum — is fundamentally a singly linked list where each block points to the hash of the previous block.',

        'Understanding when to choose a linked list over an array is a key interview skill. If your application primarily needs random access by index (accessing the 500th element directly), arrays win hands-down with O(1) access. But if your application primarily involves frequent insertions and deletions at arbitrary positions, or if you don\'t know the maximum number of elements in advance, linked lists are the superior choice. Many real-world systems, such as LRU caches, symbol tables in compilers, and adjacency lists for graphs, use linked lists as their underlying data structure precisely because of this dynamic flexibility.'
      ],

      whyItMatters: [
        {
          title: 'Dynamic Size',
          description: 'No need to declare size upfront — grows and shrinks at runtime by allocating/freeing individual nodes on the heap.',
          icon: '📐'
        },
        {
          title: 'O(1) Insert/Delete',
          description: 'Insert or remove any node by adjusting pointers — no shifting of elements like arrays require.',
          icon: '⚡'
        },
        {
          title: 'Memory Efficiency',
          description: 'Uses exactly as much memory as needed — no wasted pre-allocated slots like static arrays.',
          icon: '💾'
        },
        {
          title: 'Foundation for Advanced DS',
          description: 'Stacks, Queues, Graphs (adjacency lists), Hash Tables (chaining), and LRU Caches all build on linked lists.',
          icon: '🏗️'
        }
      ],

      analogy: {
        title: 'The Treasure Hunt Model',
        description: 'A linked list is like a treasure hunt where each clue (node) has two things: a prize (data) and directions to the next clue (pointer). You start at the first clue (head) and follow directions clue-by-clue until you reach a clue that says "THE END" (null). You can\'t jump directly to clue #7 — you must follow the chain from the start.',
        mapping: [
          { realWorld: 'First Clue Location', csConcept: 'Head Pointer — entry point to the list' },
          { realWorld: 'Prize at Each Clue', csConcept: 'Data Field — the value stored in the node' },
          { realWorld: 'Directions to Next Clue', csConcept: 'Next Pointer — address of the next node' },
          { realWorld: '"THE END" Sign', csConcept: 'Null Pointer — marks the last node' },
          { realWorld: 'Adding a New Clue Between Two', csConcept: 'Insertion — update pointers of neighboring nodes' },
          { realWorld: 'Removing a Clue from the Hunt', csConcept: 'Deletion — bypass the node by relinking pointers' }
        ]
      },

      mistakes: [
        {
          title: 'Confusing Linked Lists with Arrays',
          description: 'Beginners often assume linked lists support O(1) index access like arrays. They do NOT — accessing the nth element requires traversing n nodes from the head, making random access O(n). Always use arrays if you need frequent index-based lookups.'
        },
        {
          title: 'Forgetting to Handle the Head Pointer',
          description: 'When inserting at the beginning or deleting the first node, you must update the head pointer. Forgetting this causes the entire list to become inaccessible (memory leak) or makes the head point to a deleted/invalid node.'
        },
        {
          title: 'Not Checking for Null Before Accessing next',
          description: 'Traversing past the last node without a null check causes a NullPointerException (Java), segmentation fault (C/C++), or TypeError (JavaScript). Always check if the current node is null before accessing its data or next pointer.'
        },
        {
          title: 'Losing Reference to the Rest of the List',
          description: 'When inserting or deleting nodes, if you modify pointers in the wrong order, you can lose the reference to the remaining nodes. Always save a reference to the next node BEFORE modifying any pointers during insertion or deletion.'
        }
      ],

      callouts: [
        {
          type: 'important',
          title: 'Arrays vs Linked Lists — The Core Trade-off',
          body: 'Arrays give you O(1) random access but O(n) insertion/deletion. Linked Lists give you O(1) insertion/deletion (at known position) but O(n) random access. Most interview problems test whether you understand WHEN to choose which. Neither is universally better — it depends on the access pattern.'
        },
        {
          type: 'note',
          title: 'Types of Linked Lists',
          body: 'There are three main types: Singly Linked List (each node points to the next), Doubly Linked List (each node points to both next and previous), and Circular Linked List (the last node points back to the first). This course covers all three, starting with singly linked lists.'
        },
        {
          type: 'tip',
          title: 'Real Interview Insight',
          body: 'In FAANG interviews, linked list problems test pointer manipulation skills and edge-case handling more than algorithmic complexity. The most common mistakes candidates make are: forgetting to handle the empty list, losing track of pointers during reversal, and not updating the head when the first node changes.'
        }
      ],

      takeaways: [
        'A linked list is a chain of nodes connected by pointers, stored non-contiguously in memory',
        'Each node contains a data field and a pointer to the next node (and optionally the previous node)',
        'Insertion and deletion at a known position are O(1) — no element shifting required',
        'Random access is O(n) — you must traverse from the head to reach any specific node',
        'Linked lists are the building blocks for stacks, queues, graphs, hash tables, and LRU caches',
        'The head pointer is the entry point — losing it means losing the entire list',
        'The last node\'s next pointer is null, signaling the end of the list',
        'Choose linked lists over arrays when you need frequent insertions/deletions and don\'t need index-based access'
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. THEORY & CORE CONCEPTS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'theory',
    title: 'Theory & Core Concepts',
    icon: '🧠',
    estimatedTime: '15 min',
    content: {
      analogy: {
        title: 'The Train Cars Model',
        description: 'A linked list is exactly like a train. Each train car (node) carries cargo (data) and has a coupling mechanism (pointer) that connects it to the next car. The engine car at the front is the head. You can detach any car and reattach it elsewhere by unhooking and rehooking couplings — without moving any other cars on the track. A new car can be added anywhere by simply connecting its couplings to its neighbors.',
        mapping: [
          { realWorld: 'The Entire Train', csConcept: 'The Linked List — a sequence of connected nodes' },
          { realWorld: 'A Single Train Car', csConcept: 'A Node — the fundamental unit of a linked list' },
          { realWorld: 'Cargo Inside a Car', csConcept: 'Data Field — the value (int, string, object) stored in the node' },
          { realWorld: 'Coupling to Next Car', csConcept: 'Next Pointer — stores the memory address of the next node' },
          { realWorld: 'Engine Car (Front)', csConcept: 'Head — the first node, entry point to the list' },
          { realWorld: 'Caboose (Last Car)', csConcept: 'Tail — the last node, its next pointer is null' },
          { realWorld: 'End of Train Marker', csConcept: 'Null — indicates no more nodes follow' },
          { realWorld: 'Detaching and Reattaching a Car', csConcept: 'Insertion/Deletion — pointer manipulation without shifting data' }
        ]
      },

      keyIdea: {
        title: 'The Five Pillars of Linked Lists',
        description: 'Every linked list is built from five core concepts: the Node (the building block), the Data field (what you store), the Next pointer (the link to the next node), the Head (entry point), and the Tail (the last node). Master these five, and every linked list operation becomes intuitive.'
      },

      prose: [
        'The Node is the atomic unit of a linked list — every linked list is composed entirely of nodes. A node is a small object or struct that bundles together exactly two pieces of information: the data it holds (an integer, a string, a complex object — anything) and a pointer/reference to the next node in the sequence. In memory, each node is independently allocated on the heap using operators like new (C++/Java), malloc (C), or object creation (JavaScript/Python). This independent allocation is what gives linked lists their dynamic sizing superpower — you create nodes only when you need them.',

        'The Data Field is the payload — the actual value that the node stores. It can be any data type: a primitive like an integer or character, or a complex type like an object, a struct, or even another data structure. In strongly-typed languages (C++, Java), you define the data type when creating the node class. In dynamically-typed languages (Python, JavaScript), a single linked list can technically hold mixed types, though this is rarely done in practice. The data field is what gives the linked list its purpose — without data, the list is just a chain of empty pointers.',

        'The Next Pointer (or Next Reference) is what makes a linked list a linked list. It stores the memory address of the next node in the sequence. When you traverse the list, you start at the head and repeatedly follow next pointers until you reach null. In C/C++, this is a raw pointer (Node*). In Java, it\'s an object reference. In Python and JavaScript, it\'s simply an attribute pointing to another object. The critical thing to understand is that the next pointer does NOT store the next node itself — it stores the ADDRESS where the next node lives in memory. This indirection is what allows nodes to be scattered anywhere in the heap.',

        'The Head is the most important pointer in the entire linked list — it\'s the entry point, the gateway to the entire data structure. The head is NOT a node itself; it\'s a pointer that holds the address of the first node. If the list is empty, the head is null. Every operation on a linked list begins by accessing the head: traversal starts from the head, searching starts from the head, and insertion at the beginning modifies the head. Losing the head pointer means losing access to the entire list and all its nodes — this is one of the most common bugs in linked list programming and causes memory leaks in languages without garbage collection.',

        'The Tail is the last node in the linked list — the node whose next pointer is null. In a basic singly linked list, you don\'t always maintain a separate tail pointer, so reaching the tail requires traversing the entire list from head to end, which is O(n). However, many practical implementations do maintain an explicit tail pointer for efficiency. Having a tail pointer turns "insert at the end" from O(n) (traverse to find the last node) into O(1) (directly access the tail and append). The trade-off is a small amount of extra bookkeeping — you must update the tail pointer whenever you insert at the end or delete the last node.'
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `// Node definition in C++
struct Node {
    int data;       // Data field: stores the value
    Node* next;     // Pointer field: address of the next node

    // Constructor for easy node creation
    Node(int val) : data(val), next(nullptr) {}
};

// Creating nodes and linking them manually
int main() {
    // Step 1: Create individual nodes on the heap
    Node* head = new Node(10);    // First node (head)
    Node* second = new Node(20);  // Second node
    Node* third = new Node(30);   // Third node

    // Step 2: Link nodes together using pointers
    head->next = second;     // 10 -> 20
    second->next = third;    // 20 -> 30
    // third->next remains nullptr (end of list)

    // Step 3: Traverse and print the list
    Node* current = head;
    while (current != nullptr) {
        std::cout << current->data << " -> ";
        current = current->next;  // Move to next node
    }
    std::cout << "NULL" << std::endl;
    // Output: 10 -> 20 -> 30 -> NULL

    // Step 4: Clean up memory (no garbage collector in C++)
    delete head;
    delete second;
    delete third;

    return 0;
}`,
          explanation: 'C++ uses raw pointers (Node*) and manual memory management. The struct defines two fields: an int for data and a Node* for the next pointer. The constructor initializes data and sets next to nullptr. Each node is heap-allocated with new and must be manually freed with delete to prevent memory leaks.'
        },
        {
          language: 'java',
          code: `// Node definition in Java
class Node {
    int data;       // Data field: stores the value
    Node next;      // Reference field: points to next node (null by default)

    // Constructor
    Node(int data) {
        this.data = data;
        this.next = null;  // Explicitly set to null (optional, default)
    }
}

public class LinkedListDemo {
    public static void main(String[] args) {
        // Step 1: Create individual nodes on the heap
        Node head = new Node(10);     // First node (head)
        Node second = new Node(20);   // Second node
        Node third = new Node(30);    // Third node

        // Step 2: Link nodes together using references
        head.next = second;     // 10 -> 20
        second.next = third;    // 20 -> 30
        // third.next remains null (end of list)

        // Step 3: Traverse and print the list
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;  // Move to next node
        }
        System.out.println("NULL");
        // Output: 10 -> 20 -> 30 -> NULL

        // No manual memory cleanup needed — Java has garbage collection
    }
}`,
          explanation: 'Java uses object references instead of raw pointers. The Node class has two fields: int data and Node next. References default to null. Java\'s garbage collector automatically frees unreferenced nodes, so there\'s no need for manual delete calls. The traversal pattern is identical to C++ but uses dot notation instead of arrow notation.'
        },
        {
          language: 'python',
          code: `# Node definition in Python
class Node:
    def __init__(self, data):
        self.data = data    # Data field: stores the value
        self.next = None    # Reference field: points to next node

    def __repr__(self):
        return f"Node({self.data})"


# Step 1: Create individual nodes
head = Node(10)       # First node (head)
second = Node(20)     # Second node
third = Node(30)      # Third node

# Step 2: Link nodes together
head.next = second       # 10 -> 20
second.next = third      # 20 -> 30
# third.next remains None (end of list)

# Step 3: Traverse and print the list
current = head
result = []
while current is not None:
    result.append(str(current.data))
    current = current.next    # Move to next node
print(" -> ".join(result) + " -> NULL")
# Output: 10 -> 20 -> 30 -> NULL

# Python uses garbage collection — no manual cleanup needed
# When head goes out of scope or is reassigned, all unreferenced nodes are freed`,
          explanation: 'Python uses dynamic typing, so the Node class doesn\'t declare types for fields. self.data can hold any Python object (int, str, list, dict, etc.). self.next is set to None (Python\'s equivalent of null). Python\'s garbage collector (reference counting + cyclic GC) handles memory automatically. The traversal uses "is not None" for clarity — never use "!= None" in Python.'
        },
        {
          language: 'javascript',
          code: `// Node definition in JavaScript (ES6 Class)
class Node {
    constructor(data) {
        this.data = data;     // Data field: stores the value
        this.next = null;     // Reference field: points to next node
    }
}

// Step 1: Create individual nodes
const head = new Node(10);       // First node (head)
const second = new Node(20);     // Second node
const third = new Node(30);      // Third node

// Step 2: Link nodes together
head.next = second;       // 10 -> 20
second.next = third;      // 20 -> 30
// third.next remains null (end of list)

// Step 3: Traverse and print the list
let current = head;
const parts = [];
while (current !== null) {
    parts.push(current.data);
    current = current.next;    // Move to next node
}
console.log(parts.join(' -> ') + ' -> NULL');
// Output: 10 -> 20 -> 30 -> NULL

// JavaScript has garbage collection — unreferenced nodes are auto-freed
// Alternative: Function-based node creation (no class)
function createNode(data, next = null) {
    return { data, next };
}
const n1 = createNode(10, createNode(20, createNode(30)));`,
          explanation: 'JavaScript uses ES6 classes or plain objects for nodes. There are no explicit pointer types — object references serve as pointers. The traversal uses strict equality (!== null) to check for the end. JavaScript\'s garbage collector automatically cleans up unreferenced nodes. The alternative function-based approach shows that nodes are just plain objects with data and next properties.'
        }
      ],

      interviewPerspective: {
        title: 'What Interviewers Expect You to Know',
        checklist: [
          'Define a Node class/struct from scratch in your preferred language without any hesitation',
          'Explain the difference between a node\'s data field and its pointer/reference field',
          'Clarify that the head is a pointer TO the first node, not the first node itself',
          'Know that traversal is O(n) because you must visit nodes sequentially — no index-based jumping',
          'Understand why maintaining a tail pointer makes insertion at the end O(1) instead of O(n)',
          'Explain the difference between null (end of list) and undefined/uninitialized pointers',
          'Articulate why linked lists use more memory than arrays per element (extra pointer storage)',
          'Be able to hand-trace pointer assignments on a whiteboard — interviewers test this constantly'
        ]
      },

      mistakes: [
        {
          title: 'Confusing Head Pointer with Head Node',
          description: 'The head is a POINTER that holds the address of the first node — it is NOT the first node itself. When the list is empty, head is null. When you say "head.data", you are dereferencing the head pointer to access the first node\'s data field. This distinction matters when you need to update what the head points to during insertion at the beginning.'
        },
        {
          title: 'Not Setting next to null in the Constructor',
          description: 'In C/C++, uninitialized pointers contain garbage values — random memory addresses that will cause crashes when dereferenced. Always explicitly initialize next to nullptr/null/None in your Node constructor. In Java and Python, references default to null/None, but explicit initialization is still good practice for clarity.'
        },
        {
          title: 'Assuming You Can Access Nodes by Index',
          description: 'Unlike arrays, linked lists have no index operator ([]). To reach the 5th element, you must start at head and follow next pointers 4 times. Writing list[4] will not work (unless you implement a custom operator, which defeats the purpose). This O(n) access cost is the primary trade-off of linked lists.'
        },
        {
          title: 'Ignoring Memory Overhead of Pointers',
          description: 'Each node stores an extra pointer (8 bytes on 64-bit systems) in addition to the data. For a list of 1 million integers (4 bytes each), the array uses 4 MB, but the linked list uses 12 MB (4 bytes data + 8 bytes pointer per node). This 3x overhead matters for large datasets and is a common interview discussion point.'
        }
      ],

      takeaways: [
        'A Node is the building block — it bundles data + a next pointer into one unit',
        'The Data field holds the actual value (int, string, object, etc.)',
        'The Next pointer stores the memory address of the next node, NOT the node itself',
        'Head is a pointer to the first node — the single entry point to the entire list',
        'Tail is the last node whose next pointer is null — maintaining it separately enables O(1) append',
        'Traversal means following next pointers from head to null — it is always O(n)',
        'Each node is independently heap-allocated, giving linked lists dynamic sizing',
        'Every node adds pointer overhead (4–8 bytes), making linked lists use more memory than arrays per element'
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. MEMORY REPRESENTATION
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'memory',
    title: 'Memory Representation',
    icon: '🧩',
    estimatedTime: '12 min',
    content: {
      keyIdea: {
        title: 'Non-Contiguous Memory Allocation',
        description: 'Unlike arrays where elements sit side-by-side in memory, linked list nodes are scattered across random heap addresses. Each node stores the address of the next node, creating a logical sequence out of physically disjoint memory locations. There is no formula to compute a node\'s address — you must follow the pointer chain.'
      },

      memoryDiagram: {
        elements: ['Node(10)@0x1A00', 'Node(20)@0x2F48', 'Node(30)@0x0C10', 'Node(40)@0x3D20'],
        startAddress: 0x1A00,
        elementSize: 12,
        label: 'Singly Linked List: 10 → 20 → 30 → 40 → NULL (nodes at random heap addresses)'
      },

      prose: [
        'When you create a linked list node, the operating system\'s memory allocator (malloc in C, new in C++/Java, object allocator in Python/JS) finds a free block on the heap and places the node there. The critical difference from arrays is that consecutive nodes are NOT placed in consecutive memory addresses. Node 1 might live at address 0x1A00, Node 2 at 0x2F48 (2,888 bytes away), and Node 3 at 0x0C10 (which is actually at a LOWER address than Node 1). The nodes form a logical sequence only because each one stores the address of the next one in its pointer field.',

        'In a 64-bit system, each node in a singly linked list occupies (data size + 8 bytes for the pointer). For a node storing a 4-byte integer, that\'s 12 bytes per node (4 data + 8 pointer), but due to memory alignment requirements, the allocator may pad this to 16 bytes. A doubly linked list node adds another 8-byte pointer (for prev), bringing the total to 20 bytes per node (often padded to 24). This overhead is significant: an array of 1 million ints uses 4 MB, while a singly linked list of 1 million ints uses roughly 16 MB (4x more) after alignment padding.',

        'The heap allocation pattern of linked lists has profound implications for CPU cache performance. Modern CPUs load data in cache lines (typically 64 bytes). When traversing an array, the CPU prefetches entire cache lines, so accessing elements 0–15 of an int array loads all 16 elements into L1 cache in a single memory fetch. With linked lists, each node might be on a completely different cache line — even a different memory page — causing a cache miss on nearly every node access. This is why array traversal can be 10–100x faster than linked list traversal in practice, even though both are theoretically O(n).',

        'Despite the cache disadvantage, non-contiguous allocation gives linked lists two crucial benefits. First, there is no reallocation cost. When an array runs out of capacity, the system must allocate a new, larger block and copy all elements over — an O(n) operation that can cause latency spikes. Linked lists never need this; each new node is independently allocated. Second, linked lists eliminate memory fragmentation problems. An array needs a single contiguous block large enough for all elements. If the heap is fragmented (many small free blocks but no large one), array allocation fails even if total free memory is sufficient. Linked lists only need small individual blocks for each node, so they work even in heavily fragmented memory.',

        'Understanding the memory model also explains why certain operations differ in cost. Accessing element i in an array is O(1) because you compute: address = base + i × element_size. This formula works ONLY because elements are contiguous with a known stride. In a linked list, there is no such formula — the address of node i is stored inside node i-1, which is stored inside node i-2, and so on back to the head. To find node i, you must physically follow i pointers, making random access O(n). This is the fundamental trade-off etched into the memory architecture itself.'
      ],

      tableData: [
        {
          headers: ['Feature', 'Array', 'Linked List'],
          rows: [
            ['Memory Layout', 'Contiguous — all elements sit side by side', 'Non-contiguous — nodes scattered across heap'],
            ['Address Calculation', 'O(1) formula: base + i × size', 'Not possible — must traverse from head'],
            ['Allocation', 'One large block allocated upfront', 'Each node allocated independently on demand'],
            ['Resizing', 'Expensive — allocate new block, copy all elements O(n)', 'Free — just allocate/free individual nodes O(1)'],
            ['Memory Overhead', 'Minimal — only data is stored', 'Significant — each node stores an extra pointer (8 bytes on 64-bit)'],
            ['Cache Performance', 'Excellent — sequential access loads full cache lines', 'Poor — random addresses cause frequent cache misses'],
            ['Fragmentation', 'Needs one large contiguous block — fails in fragmented heap', 'Works in fragmented heap — only needs small individual blocks'],
            ['Wasted Space', 'May waste space if capacity > actual size', 'No wasted space — exact memory for exact number of nodes'],
            ['Insertion at Middle', 'O(n) — must shift elements right', 'O(1) — just re-link two pointers (if position is known)'],
            ['Deletion at Middle', 'O(n) — must shift elements left', 'O(1) — just bypass the node (if reference is known)'],
            ['Random Access', 'O(1) — direct index computation', 'O(n) — must traverse from head'],
            ['Memory Deallocation', 'Free one block', 'Must free each node individually (or rely on GC)']
          ]
        }
      ],

      whyItMatters: [
        {
          title: 'No Reallocation Spikes',
          description: 'Arrays double in size when full, causing O(n) copy operations. Linked lists grow one node at a time — zero latency spikes.',
          icon: '📈'
        },
        {
          title: 'Works in Fragmented Memory',
          description: 'A 100 MB array needs 100 MB of contiguous free space. A linked list of the same data works with scattered small blocks.',
          icon: '🧱'
        },
        {
          title: 'Predictable Insertion Cost',
          description: 'Every insertion/deletion costs exactly O(1) pointer operations — no amortized analysis needed, no worst-case surprises.',
          icon: '🎯'
        }
      ],

      mistakes: [
        {
          title: 'Assuming Linked Lists Are Always Better for Insertions',
          description: 'Insertion is O(1) only if you already have a reference to the node at the insertion point. If you need to FIND the position first (e.g., "insert after the 5th node"), that search is O(n), making the total operation O(n). The O(1) insertion benefit only applies when you already hold a pointer to the relevant node.'
        },
        {
          title: 'Ignoring Cache Performance in Benchmarks',
          description: 'On paper, traversing an array and a linked list are both O(n). In practice, array traversal is 10–100x faster because of CPU cache prefetching. Cache lines load 64 bytes at once, so arrays get 16 ints per cache fetch. Linked lists cause a cache miss on almost every node, each costing ~100 CPU cycles. Never ignore constant factors in real systems.'
        },
        {
          title: 'Forgetting Pointer Size Overhead',
          description: 'On a 64-bit system, each pointer is 8 bytes. A singly linked list node storing a 4-byte int uses 12+ bytes (often padded to 16). A doubly linked list node uses 20+ bytes (often padded to 24). For small data types, the pointers can use MORE memory than the data itself. This is a critical consideration for large datasets.'
        },
        {
          title: 'Not Understanding Heap vs Stack Allocation',
          description: 'Linked list nodes MUST be heap-allocated (using new/malloc) because they need to persist beyond the scope of the function that creates them. If you create a node as a local stack variable and return its address, the pointer becomes dangling (the stack frame is destroyed). This is a classic C/C++ bug that causes undefined behavior.'
        }
      ],

      callouts: [
        {
          type: 'warning',
          title: 'Memory Leak Danger in C/C++',
          body: 'In languages without garbage collection (C, C++), every node allocated with new/malloc MUST be explicitly freed with delete/free. If you lose the head pointer or break the chain during deletion, orphaned nodes leak memory. Always traverse and free all nodes before discarding a linked list, or use smart pointers (std::unique_ptr) in modern C++.'
        },
        {
          type: 'tip',
          title: 'Visualizing Memory Layout',
          body: 'Draw each node as a box with two compartments: [DATA | NEXT →]. Write the actual hex address above each box. Draw arrows from the NEXT field to the next box. This visual representation is how interviewers expect you to trace linked list operations on a whiteboard. Practice this drawing technique — it makes pointer manipulation intuitive.'
        },
        {
          type: 'note',
          title: 'Why "Non-Contiguous" Is the Key Concept',
          body: 'The entire behavioral difference between arrays and linked lists stems from one architectural choice: contiguous vs non-contiguous storage. Contiguous → address formula → O(1) access → but rigid sizing. Non-contiguous → pointer chains → O(n) access → but dynamic sizing. Every other property (cache behavior, overhead, insertion cost) is a direct consequence of this single design decision.'
        }
      ],

      takeaways: [
        'Linked list nodes are scattered across random heap addresses — NOT stored contiguously',
        'Each node stores the address of the next node, creating a logical chain from physical disorder',
        'There is no address formula for linked lists — you MUST traverse from head to reach any node',
        'Pointer overhead is 8 bytes per pointer on 64-bit systems (singly: +8B, doubly: +16B per node)',
        'Cache performance is poor — each node access likely causes a CPU cache miss (~100 cycle penalty)',
        'No reallocation is ever needed — nodes are allocated/freed independently',
        'Linked lists work in fragmented memory where arrays would fail to find a large enough contiguous block',
        'Heap allocation (new/malloc) is mandatory — stack-allocated nodes become dangling pointers when the function returns'
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. NODE STRUCTURE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'node-structure',
    title: 'Node Structure in Detail',
    icon: '🧬',
    estimatedTime: '12 min',
    content: {
      keyIdea: {
        title: 'Anatomy of a Node',
        description: 'A node is a self-contained container with exactly two responsibilities: hold the data and point to the next node. In typed languages (C++, Java), these are explicit typed fields in a struct or class. In dynamic languages (Python, JS), they are object attributes. The node is the single most important building block — every linked list operation is just node creation and pointer manipulation.'
      },

      prose: [
        'The Data Field is the raison d\'être of the node — it holds the actual value that the linked list stores. In C++, this is a typed member variable (int data, std::string data, or a template parameter T data for generic nodes). In Java, it can be a primitive type (int) or an Object reference for generics. In Python and JavaScript, the data field can hold any type due to dynamic typing. For interview purposes, most problems use integer data, but real-world linked lists store complex objects: a browser history node stores a URL string, a music playlist node stores a Song object, and an LRU cache node stores a key-value pair.',

        'The Pointer Field (next) is the mechanism that creates the "linked" aspect of a linked list. In C++, this is a raw pointer of type Node* — it stores the raw memory address (a 64-bit unsigned integer on modern systems) of the next node. In Java, this is an object reference of type Node — internally, it\'s a pointer managed by the JVM, but Java abstracts away the raw address. In Python and JavaScript, it\'s simply an attribute that holds a reference to another Node object or None/null. The pointer field occupies 4 bytes on 32-bit systems and 8 bytes on 64-bit systems, regardless of the data type stored in the node.',

        'Memory layout and alignment play a crucial role in node design, especially in performance-critical systems programming. Consider a C++ node with an int (4 bytes) and a Node* pointer (8 bytes). The total should be 12 bytes, but due to alignment requirements (the pointer must be aligned to an 8-byte boundary), the compiler inserts 4 bytes of padding after the int, making the actual node size 16 bytes. This padding can be reduced by reordering fields or using compiler-specific attributes like __attribute__((packed)), but packed structs can hurt performance on architectures that penalize unaligned access.',

        'For doubly linked lists, the node gains an additional pointer field: prev, which points to the previous node. This extra pointer enables O(1) backward traversal and simplifies deletion (you don\'t need a reference to the previous node — the node carries it). The trade-off is increased memory usage (24 bytes per node instead of 16 for int data with alignment). For circular linked lists, the node structure is identical to singly or doubly linked lists — the "circular" property is achieved by setting the last node\'s next pointer to head instead of null, not by changing the node structure itself.',

        'Generic or template-based node design is essential for reusable linked list implementations. In C++, you use templates: template<typename T> struct Node { T data; Node<T>* next; }. In Java, you use generics: class Node<T> { T data; Node<T> next; }. In TypeScript, you use generics similarly: class Node<T> { data: T; next: Node<T> | null; }. This allows the same linked list class to store integers, strings, or complex objects without code duplication. Interviewers appreciate seeing generic implementations because it demonstrates software engineering maturity beyond just solving the algorithm.'
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `// ===== Basic Node Structure =====
struct Node {
    int data;           // 4 bytes on most systems
    Node* next;         // 8 bytes on 64-bit systems
    // Total: 16 bytes (with 4 bytes padding for alignment)

    Node(int val) : data(val), next(nullptr) {}
};

// ===== Generic (Template) Node =====
template<typename T>
struct GenericNode {
    T data;
    GenericNode<T>* next;

    GenericNode(T val) : data(val), next(nullptr) {}
};

// ===== Doubly Linked List Node =====
struct DLLNode {
    int data;
    DLLNode* prev;      // Pointer to previous node
    DLLNode* next;      // Pointer to next node

    DLLNode(int val) : data(val), prev(nullptr), next(nullptr) {}
};

// ===== Usage Examples =====
int main() {
    // Singly linked node
    Node* a = new Node(42);
    std::cout << "Data: " << a->data << std::endl;      // 42
    std::cout << "Next: " << a->next << std::endl;       // 0x0 (nullptr)
    std::cout << "Size: " << sizeof(Node) << std::endl;  // 16 (with padding)

    // Generic node with string
    GenericNode<std::string>* s = new GenericNode<std::string>("hello");
    std::cout << "Data: " << s->data << std::endl;  // hello

    // Doubly linked node
    DLLNode* d1 = new DLLNode(10);
    DLLNode* d2 = new DLLNode(20);
    d1->next = d2;
    d2->prev = d1;

    // Clean up
    delete a;
    delete s;
    delete d1;
    delete d2;

    return 0;
}`,
          explanation: 'C++ provides three levels of node design: basic struct with int data, template-based generic node, and doubly linked node with prev pointer. sizeof(Node) reveals the actual memory footprint including alignment padding. Use -> (arrow operator) to access fields through pointers, and . (dot operator) for direct struct access.'
        },
        {
          language: 'java',
          code: `// ===== Basic Node Structure =====
class Node {
    int data;           // 4 bytes
    Node next;          // 4-8 bytes (compressed/uncompressed reference)

    Node(int data) {
        this.data = data;
        this.next = null;
    }

    @Override
    public String toString() {
        return "Node(" + data + ")";
    }
}

// ===== Generic Node Structure =====
class GenericNode<T> {
    T data;
    GenericNode<T> next;

    GenericNode(T data) {
        this.data = data;
        this.next = null;
    }
}

// ===== Doubly Linked List Node =====
class DLLNode {
    int data;
    DLLNode prev;       // Reference to previous node
    DLLNode next;       // Reference to next node

    DLLNode(int data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

// ===== Usage Examples =====
public class NodeDemo {
    public static void main(String[] args) {
        // Singly linked node
        Node a = new Node(42);
        System.out.println("Data: " + a.data);     // 42
        System.out.println("Next: " + a.next);      // null

        // Generic node with String
        GenericNode<String> s = new GenericNode<>("hello");
        System.out.println("Data: " + s.data);      // hello

        // Doubly linked nodes
        DLLNode d1 = new DLLNode(10);
        DLLNode d2 = new DLLNode(20);
        d1.next = d2;
        d2.prev = d1;
        System.out.println(d2.prev.data);           // 10

        // No manual cleanup needed — GC handles it
    }
}`,
          explanation: 'Java uses object references instead of raw pointers — the JVM manages addresses internally. Generic nodes use Java generics (<T>) for type-safe reusability. Note: Java doesn\'t have structs — everything is a class. Object header overhead (12-16 bytes) is added by the JVM to each node, making actual memory usage higher than the sum of fields.'
        },
        {
          language: 'python',
          code: `# ===== Basic Node Structure =====
class Node:
    """Singly Linked List Node"""
    __slots__ = ['data', 'next']  # Memory optimization: prevents __dict__ creation

    def __init__(self, data):
        self.data = data        # Can hold any Python object
        self.next = None        # Reference to next Node or None

    def __repr__(self):
        return f"Node({self.data})"


# ===== Doubly Linked List Node =====
class DLLNode:
    """Doubly Linked List Node"""
    __slots__ = ['data', 'prev', 'next']

    def __init__(self, data):
        self.data = data
        self.prev = None        # Reference to previous node
        self.next = None        # Reference to next node

    def __repr__(self):
        return f"DLLNode({self.data})"


# ===== Usage Examples =====
# Singly linked node
a = Node(42)
print(f"Data: {a.data}")        # 42
print(f"Next: {a.next}")        # None
print(f"Repr: {a}")             # Node(42)

# Nodes can hold ANY data type (dynamic typing)
str_node = Node("hello")
list_node = Node([1, 2, 3])
dict_node = Node({"key": "value"})

# Linking nodes
n1 = Node(10)
n2 = Node(20)
n3 = Node(30)
n1.next = n2
n2.next = n3

# Traversal
current = n1
while current:
    print(current.data, end=" -> ")
    current = current.next
print("None")
# Output: 10 -> 20 -> 30 -> None

# Doubly linked nodes
d1 = DLLNode(10)
d2 = DLLNode(20)
d1.next = d2
d2.prev = d1
print(f"d2.prev.data = {d2.prev.data}")  # 10`,
          explanation: 'Python uses __slots__ to optimize memory by preventing the creation of __dict__ for each node instance — this can save 50+ bytes per node. Without __slots__, each Python object carries a dictionary overhead of ~100 bytes. The __repr__ method provides readable output for debugging. Python\'s dynamic typing allows a single Node class to hold any data type.'
        },
        {
          language: 'javascript',
          code: `// ===== Basic Node Structure (ES6 Class) =====
class Node {
    constructor(data) {
        this.data = data;       // Can hold any JS value
        this.next = null;       // Reference to next node or null
    }

    toString() {
        return \`Node(\${this.data})\`;
    }
}

// ===== Doubly Linked List Node =====
class DLLNode {
    constructor(data) {
        this.data = data;
        this.prev = null;       // Reference to previous node
        this.next = null;       // Reference to next node
    }
}

// ===== Factory Function Alternative (Lightweight) =====
function createNode(data, next = null) {
    return { data, next };
}

// ===== TypeScript Generic Node (Type-safe) =====
// class TSNode<T> {
//     data: T;
//     next: TSNode<T> | null;
//     constructor(data: T) {
//         this.data = data;
//         this.next = null;
//     }
// }

// ===== Usage Examples =====
// Class-based node
const a = new Node(42);
console.log(\`Data: \${a.data}\`);         // 42
console.log(\`Next: \${a.next}\`);         // null

// Factory function node (no 'new' keyword needed)
const b = createNode(100);
console.log(\`Data: \${b.data}\`);         // 100

// Linking nodes
const n1 = new Node(10);
const n2 = new Node(20);
const n3 = new Node(30);
n1.next = n2;
n2.next = n3;

// Traversal
let current = n1;
const parts = [];
while (current !== null) {
    parts.push(current.data);
    current = current.next;
}
console.log(parts.join(' -> ') + ' -> null');
// Output: 10 -> 20 -> 30 -> null

// Doubly linked nodes
const d1 = new DLLNode(10);
const d2 = new DLLNode(20);
d1.next = d2;
d2.prev = d1;
console.log(\`d2.prev.data = \${d2.prev.data}\`);  // 10`,
          explanation: 'JavaScript offers two approaches: ES6 classes for OOP-style nodes and factory functions for lightweight functional-style nodes. Both work identically — classes are syntactic sugar over prototypal inheritance. The TypeScript example (commented) shows how generics add type safety. Use === null (strict equality) instead of == null to avoid coercion bugs in traversal conditions.'
        }
      ],

      interviewPerspective: {
        title: 'Node Structure Interview Expectations',
        checklist: [
          'Write a complete Node class from memory in under 30 seconds — interviewers expect this to be automatic',
          'Know the memory size of a node: data size + pointer size + alignment padding',
          'Explain why __slots__ matters in Python (prevents __dict__, saves ~100 bytes per node)',
          'Know the difference between struct (C++) and class (Java) for node definitions — struct has public fields by default',
          'Be ready to extend a singly linked node to a doubly linked node by adding a prev pointer',
          'Understand that in Java/Python/JS, all object variables are references (pointers) — there\'s no separate pointer syntax',
          'When asked about generics, show template/generic node design for type-safe reusability',
          'Explain why circular linked lists use the SAME node structure but different pointer assignments (last.next = head)'
        ]
      },

      mistakes: [
        {
          title: 'Using a Regular Object Instead of a Class',
          description: 'While plain objects ({ data: 10, next: null }) technically work in JS/Python, interviewers expect a proper class/constructor pattern. It shows you understand encapsulation and can extend the node with methods like toString(). Use classes for interviews and plain objects only for quick prototyping.'
        },
        {
          title: 'Forgetting __slots__ in Python',
          description: 'Without __slots__, each Python node creates an internal __dict__ dictionary, adding ~100 bytes of overhead per node. For a linked list with 1 million nodes, that\'s 100 MB of wasted memory. Always use __slots__ = [\'data\', \'next\'] in competitive programming and interviews to show you understand Python memory optimization.'
        },
        {
          title: 'Not Handling the Empty Node Case',
          description: 'What happens when you create Node(null) or Node(undefined)? Your code should handle nodes with null/undefined data gracefully. In interviews, always consider: can data be null? Can next point to an invalid node? What if someone passes no arguments to the constructor?'
        },
        {
          title: 'Mixing Up -> and . in C++',
          description: 'In C++, use -> to access members through a pointer (node->data) and . to access members of a direct struct/object (node.data). Using the wrong operator is a compile error and a red flag in interviews. Remember: pointer → arrow, object → dot.'
        }
      ],

      callouts: [
        {
          type: 'tip',
          title: 'The 30-Second Node Class Challenge',
          body: 'Practice writing a complete Node class in your preferred language in under 30 seconds. Include: constructor with data parameter, next initialized to null, and a toString/repr method. Time yourself. In a 45-minute interview, every second spent on boilerplate is a second NOT spent on the actual algorithm.'
        },
        {
          type: 'important',
          title: 'Singly vs Doubly — When to Use Which',
          body: 'Use a singly linked list when you only need forward traversal (stacks, simple queues, hash table chaining). Use a doubly linked list when you need backward traversal OR O(1) deletion of a node when you have a direct reference to it (LRU cache, browser history, text editor undo/redo). The extra prev pointer costs 8 bytes per node but can eliminate O(n) scans for the predecessor.'
        },
        {
          type: 'note',
          title: 'Node Structure Is Language-Agnostic',
          body: 'The CONCEPT of a node (data + next pointer) is identical across all languages. Only the syntax differs. If you deeply understand the concept, you can implement it in any language in seconds. Focus on understanding the concept, not memorizing syntax.'
        }
      ],

      takeaways: [
        'A node has exactly two fields: data (the value) and next (pointer to the next node)',
        'Doubly linked nodes add a third field: prev (pointer to the previous node)',
        'In C++, sizeof(Node) includes alignment padding — a 4-byte int + 8-byte pointer = 16 bytes (not 12)',
        'Python\'s __slots__ reduces per-node memory overhead by ~100 bytes — always use it for linked list nodes',
        'Generic/template nodes allow the same class to store any data type without code duplication',
        'The node class should be simple: constructor, field initialization, and optionally toString — nothing more',
        'Circular linked lists use the same node structure — only the pointer assignment (last.next = head) differs',
        'Practice writing your Node class from memory until it takes less than 30 seconds'
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. LINKED LIST OPERATIONS OVERVIEW
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'operations',
    title: 'Linked List Operations Overview',
    icon: '🔧',
    estimatedTime: '15 min',
    content: {
      keyIdea: {
        title: 'Five Fundamental Operations',
        description: 'Every linked list problem reduces to five core operations: Traversal (visiting all nodes), Searching (finding a node by value), Insertion (adding a new node), Deletion (removing a node), and Updating (changing a node\'s data). Master these five, and you can solve any linked list problem by combining them.'
      },

      prose: [
        'Traversal is the most fundamental linked list operation — it means visiting every node from head to tail by following next pointers. You start with a pointer (usually called current or temp) set to head, process the current node, then move to current.next, repeating until current becomes null. Traversal is O(n) in time and O(1) in space because you visit each of the n nodes exactly once using only a single pointer variable. Almost every other operation — searching, printing, counting, computing sum — is built on top of traversal. The key insight is that traversal is the ONLY way to navigate a linked list because there are no indices.',

        'Searching means finding a node that contains a specific value. It is essentially a traversal with an early exit condition: at each node, you compare the node\'s data with the target value, and if they match, you return the node (or its position). If you reach null without finding a match, the value doesn\'t exist in the list. Linear search on a linked list is O(n) in the worst case (value at the end or not present) and O(1) in the best case (value at the head). Unlike arrays, binary search is NOT possible on linked lists because there is no O(1) random access to the middle element — you cannot jump to the midpoint without traversing half the list first.',

        'Insertion adds a new node to the list. There are three primary cases: (1) Insert at the beginning (prepend) — create a new node, set its next to the current head, then update head to the new node. This is always O(1). (2) Insert at the end (append) — traverse to the last node and set its next to the new node. This is O(n) without a tail pointer, or O(1) with one. (3) Insert at a specific position — traverse to the node BEFORE the desired position, set newNode.next to the next node, then set the previous node\'s next to newNode. This is O(n) for the traversal. The critical rule for all insertions: always set the new node\'s next pointer BEFORE modifying any existing pointers. If you modify existing pointers first, you lose the reference to the rest of the list.',

        'Deletion removes a node from the list. Like insertion, there are three cases: (1) Delete the first node — save head.next, free the old head (in C/C++), then set head to the saved next node. O(1). (2) Delete the last node — traverse to the second-to-last node, set its next to null, free the old last node. O(n). (3) Delete a node at a specific position — traverse to the node BEFORE the one to delete, set prev.next = target.next to bypass the target node, then free the target. O(n) for the traversal. The critical rule: you need a reference to the node BEFORE the one you want to delete (in singly linked lists), because you need to modify its next pointer. This is why doubly linked lists make deletion easier — each node already has a prev pointer.',

        'Updating means changing the data stored in a node. It is the simplest operation: traverse to the target node (by position or by value), then modify its data field. The traversal is O(n), but the actual update is O(1). In interviews, updating is rarely asked as a standalone question — it usually appears as part of a larger problem (e.g., "find the node with value X and change it to Y"). However, understanding that you can modify a node\'s data in place (without creating a new node) is important. One subtle point: if your linked list is sorted and you update a value, the list may no longer be sorted — you might need to delete the node and re-insert it at the correct position.'
      ],

      complexityTable: [
        { operation: 'Traversal (visit all nodes)', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Must visit every node — no shortcut exists' },
        { operation: 'Search (by value)', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Best: target at head. Worst: target at tail or absent' },
        { operation: 'Insert at Beginning', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Just create node and update head — no traversal needed' },
        { operation: 'Insert at End (no tail ptr)', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Must traverse entire list to find the last node' },
        { operation: 'Insert at End (with tail ptr)', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Tail pointer gives direct access to the last node' },
        { operation: 'Insert at Position k', best: 'O(k)', average: 'O(k)', worst: 'O(n)', space: 'O(1)', notes: 'Traverse k nodes to reach the insertion point' },
        { operation: 'Delete First Node', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)', notes: 'Update head to head.next and free old head' },
        { operation: 'Delete Last Node', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Must find second-to-last node to update its next pointer' },
        { operation: 'Delete at Position k', best: 'O(k)', average: 'O(k)', worst: 'O(n)', space: 'O(1)', notes: 'Traverse k-1 nodes to reach the node before the target' },
        { operation: 'Delete by Value', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', notes: 'Best: value at head. Must search + delete' },
        { operation: 'Update at Position k', best: 'O(k)', average: 'O(k)', worst: 'O(n)', space: 'O(1)', notes: 'Traverse to position k, then modify data in O(1)' },
        { operation: 'Access at Position k', best: 'O(k)', average: 'O(k)', worst: 'O(n)', space: 'O(1)', notes: 'No index formula — must traverse k nodes from head' }
      ],

      codeExamples: [
        {
          language: 'cpp',
          code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// ===== TRAVERSAL: Visit and print every node =====
void traverse(Node* head) {
    Node* current = head;       // Start at the head
    while (current != nullptr) {
        cout << current->data << " -> ";
        current = current->next;  // Move to next node
    }
    cout << "NULL" << endl;
}

// ===== SEARCH: Find a node by value =====
Node* search(Node* head, int target) {
    Node* current = head;
    int position = 0;
    while (current != nullptr) {
        if (current->data == target) {
            cout << "Found " << target << " at position " << position << endl;
            return current;     // Return the node if found
        }
        current = current->next;
        position++;
    }
    cout << target << " not found in the list" << endl;
    return nullptr;             // Return null if not found
}

// ===== INSERT AT BEGINNING: O(1) =====
void insertAtBeginning(Node*& head, int val) {
    Node* newNode = new Node(val);
    newNode->next = head;       // New node points to current head
    head = newNode;             // Update head to new node
}

// ===== INSERT AT END: O(n) without tail pointer =====
void insertAtEnd(Node*& head, int val) {
    Node* newNode = new Node(val);
    if (head == nullptr) {      // Empty list case
        head = newNode;
        return;
    }
    Node* current = head;
    while (current->next != nullptr) {  // Traverse to last node
        current = current->next;
    }
    current->next = newNode;    // Last node now points to new node
}

// ===== DELETE FIRST NODE: O(1) =====
void deleteFirst(Node*& head) {
    if (head == nullptr) return;    // Empty list — nothing to delete
    Node* temp = head;              // Save current head
    head = head->next;              // Move head to second node
    delete temp;                    // Free old head's memory
}

// ===== DEMO =====
int main() {
    Node* head = nullptr;

    // Build list: 10 -> 20 -> 30 -> 40
    insertAtEnd(head, 10);
    insertAtEnd(head, 20);
    insertAtEnd(head, 30);
    insertAtEnd(head, 40);

    cout << "List: ";
    traverse(head);             // 10 -> 20 -> 30 -> 40 -> NULL

    // Insert 5 at beginning
    insertAtBeginning(head, 5);
    cout << "After insert at beginning: ";
    traverse(head);             // 5 -> 10 -> 20 -> 30 -> 40 -> NULL

    // Search for 30
    search(head, 30);           // Found 30 at position 3

    // Delete first node
    deleteFirst(head);
    cout << "After delete first: ";
    traverse(head);             // 10 -> 20 -> 30 -> 40 -> NULL

    // Clean up all remaining nodes
    while (head != nullptr) {
        deleteFirst(head);
    }

    return 0;
}`,
          explanation: 'C++ implementation showing all five operations. Note the use of Node*& (reference to pointer) in insert/delete functions — this allows the function to modify the caller\'s head pointer directly. Without the reference (&), head modifications inside the function would be lost. The traversal uses a separate current pointer to avoid modifying head. Memory is manually managed with new/delete.'
        },
        {
          language: 'javascript',
          code: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // ===== TRAVERSAL: Visit and print every node =====
    traverse() {
        const result = [];
        let current = this.head;    // Start at the head
        while (current !== null) {
            result.push(current.data);
            current = current.next;   // Move to next node
        }
        console.log(result.join(' -> ') + ' -> NULL');
        return result;
    }

    // ===== SEARCH: Find a node by value =====
    search(target) {
        let current = this.head;
        let position = 0;
        while (current !== null) {
            if (current.data === target) {
                console.log(\`Found \${target} at position \${position}\`);
                return { node: current, position };
            }
            current = current.next;
            position++;
        }
        console.log(\`\${target} not found in the list\`);
        return null;
    }

    // ===== INSERT AT BEGINNING: O(1) =====
    insertAtBeginning(val) {
        const newNode = new Node(val);
        newNode.next = this.head;   // New node points to current head
        this.head = newNode;         // Update head to new node
        this.size++;
    }

    // ===== INSERT AT END: O(n) =====
    insertAtEnd(val) {
        const newNode = new Node(val);
        this.size++;

        if (this.head === null) {    // Empty list
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next !== null) {   // Traverse to last node
            current = current.next;
        }
        current.next = newNode;      // Last node points to new node
    }

    // ===== INSERT AT POSITION: O(k) =====
    insertAt(val, position) {
        if (position < 0 || position > this.size) {
            console.log('Invalid position');
            return;
        }
        if (position === 0) {
            this.insertAtBeginning(val);
            return;
        }

        const newNode = new Node(val);
        let current = this.head;
        for (let i = 0; i < position - 1; i++) {  // Traverse to node before position
            current = current.next;
        }
        newNode.next = current.next;   // New node points to next node
        current.next = newNode;         // Previous node points to new node
        this.size++;
    }

    // ===== DELETE FIRST NODE: O(1) =====
    deleteFirst() {
        if (this.head === null) return null;

        const removedData = this.head.data;
        this.head = this.head.next;    // Move head to second node
        this.size--;
        // Old head is automatically garbage collected
        return removedData;
    }

    // ===== DELETE BY VALUE: O(n) =====
    deleteByValue(target) {
        if (this.head === null) return false;

        // Special case: target is the head node
        if (this.head.data === target) {
            this.head = this.head.next;
            this.size--;
            return true;
        }

        let current = this.head;
        while (current.next !== null) {
            if (current.next.data === target) {
                current.next = current.next.next;  // Bypass the target node
                this.size--;
                return true;
            }
            current = current.next;
        }
        return false;  // Target not found
    }

    // ===== UPDATE BY POSITION: O(k) =====
    updateAt(position, newValue) {
        if (position < 0 || position >= this.size) {
            console.log('Invalid position');
            return false;
        }
        let current = this.head;
        for (let i = 0; i < position; i++) {
            current = current.next;
        }
        current.data = newValue;
        return true;
    }
}

// ===== DEMO =====
const list = new LinkedList();
list.insertAtEnd(10);
list.insertAtEnd(20);
list.insertAtEnd(30);
list.insertAtEnd(40);

list.traverse();                  // 10 -> 20 -> 30 -> 40 -> NULL

list.insertAtBeginning(5);
list.traverse();                  // 5 -> 10 -> 20 -> 30 -> 40 -> NULL

list.insertAt(25, 3);
list.traverse();                  // 5 -> 10 -> 20 -> 25 -> 30 -> 40 -> NULL

list.search(25);                  // Found 25 at position 3

list.deleteByValue(25);
list.traverse();                  // 5 -> 10 -> 20 -> 30 -> 40 -> NULL

list.updateAt(2, 99);
list.traverse();                  // 5 -> 10 -> 99 -> 30 -> 40 -> NULL

console.log('Size:', list.size);  // 5`,
          explanation: 'JavaScript implementation using a LinkedList class that wraps the head pointer and tracks size. This class-based approach encapsulates all operations and is the pattern interviewers expect. Key points: insertAt shows O(k) position-based insertion, deleteByValue handles the head-deletion special case separately, and updateAt demonstrates in-place modification. JavaScript\'s garbage collector automatically frees removed nodes.'
        }
      ],

      interviewPerspective: {
        title: 'Operations Interview Expectations',
        checklist: [
          'Implement all five operations (traverse, search, insert, delete, update) from scratch without any hesitation',
          'Handle ALL edge cases: empty list, single-node list, operation at head, operation at tail',
          'Know the exact time complexity of each operation variant — interviewers will ask "why is this O(n)?"',
          'Explain why insertion at the beginning is O(1) but insertion at the end is O(n) without a tail pointer',
          'Understand the pointer update ORDER during insertion: always set new node\'s next BEFORE modifying existing pointers',
          'Know that deletion in a singly linked list requires a reference to the PREVIOUS node (not the node itself)',
          'Be prepared to explain why binary search doesn\'t work on linked lists (no O(1) random access)',
          'When asked "how would you make append O(1)?", answer: maintain a tail pointer',
          'Always check for null before dereferencing — this is the #1 source of linked list bugs',
          'In C++, always free deleted nodes with delete to prevent memory leaks — mention this even if not asked'
        ]
      },

      mistakes: [
        {
          title: 'Modifying Pointers in the Wrong Order During Insertion',
          description: 'When inserting node B between A and C: if you first set A.next = B (breaking the link to C), then try to set B.next = C — but C is now unreachable because A no longer points to it! Always set B.next = C FIRST, then set A.next = B. The rule is: connect the new node to the chain before breaking any existing links.'
        },
        {
          title: 'Not Handling the Empty List Case',
          description: 'Many operations (insertAtEnd, delete, search) break on an empty list (head === null). If you try to access head.next when head is null, you get a NullPointerException/TypeError. Always start every operation with: if (head === null) { handle empty case }. This is the edge case interviewers test first.'
        },
        {
          title: 'Moving the Head Pointer During Traversal',
          description: 'If you write "head = head.next" inside your traversal loop, you permanently lose access to the beginning of the list. Always use a separate variable: "let current = head" and iterate with "current = current.next". The head pointer must remain untouched unless you\'re explicitly inserting or deleting at the beginning.'
        },
        {
          title: 'Off-by-One Errors in Position-Based Operations',
          description: 'To insert at position k, you need to traverse to position k-1 (the node BEFORE the target position). To delete at position k, you also need the node at position k-1. A common bug is traversing to position k instead of k-1, which inserts/deletes at the wrong position. Draw out the pointers on paper to verify your loop bounds.'
        },
        {
          title: 'Forgetting to Update Size Counter',
          description: 'If your LinkedList class maintains a size property, every insert must increment it and every delete must decrement it. Forgetting to update size leads to subtle bugs where size() returns wrong values, breaking position-based operations that rely on size for bounds checking.'
        }
      ],

      takeaways: [
        'Traversal is the foundation — every other operation (search, insert, delete, update) builds on it',
        'Always use a separate current pointer for traversal — never modify head directly',
        'Insert at beginning is O(1), insert at end is O(n) without tail pointer or O(1) with tail pointer',
        'Delete requires access to the PREVIOUS node in singly linked lists — this is why doubly linked lists exist',
        'Binary search is impossible on linked lists — there\'s no O(1) access to the middle element',
        'The golden rule of insertion: set new node\'s next pointer BEFORE modifying any existing pointers',
        'Always handle edge cases: empty list (head is null), single node, and operations at head/tail',
        'Time complexity depends on WHERE the operation occurs: O(1) at head, O(n) at tail or by value',
        'In C/C++, always free deleted nodes to prevent memory leaks — GC handles this in Java/Python/JS',
        'Maintaining a tail pointer trades a small amount of bookkeeping for O(1) append performance'
      ]
    }
  },
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
  ]
};
