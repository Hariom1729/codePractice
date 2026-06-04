import type { Section } from './types';

export const linkedListSectionsPart1: Section[] = [
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
  }
];
