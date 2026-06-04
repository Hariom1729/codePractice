import type { TopicContent } from './types';

export const linkedListsContent: TopicContent = {
  id: 'linked-lists',
  title: 'Linked Lists',
  subtitle: 'Visual, Animated & Interactive',
  description: 'Master Linked Lists through an immersive visual-first experience. Interact with nodes, watch memory allocations, and simulate pointer rewiring without dense theory.',
  totalTime: '3-4 Hours',
  difficulty: 'Beginner',
  prerequisites: ['Basic Programming'],
  sections: [
    {
      id: 'intro',
      title: 'What is a Linked List',
      icon: '🔗',
      estimatedTime: '5 min',
      content: {
        visualDemo: {
          type: 'linked-list-vs-array',
          title: 'Array vs Linked List',
          description: 'Arrays are locked in a rigid block. Linked Lists are dynamic chains scattered across memory.'
        },
        stepAnimation: {
          steps: [
            { title: 'Array Constraint', description: 'Requires contiguous memory.', state: 'array' },
            { title: 'Linked Freedom', description: 'Nodes can live anywhere, connected by pointers.', state: 'linked' }
          ]
        },
        keyIdea: {
          title: 'Dynamic Connections',
          description: 'Nodes connect sequentially using pointers instead of physical memory proximity.'
        }
      }
    },
    {
      id: 'node-structure',
      title: 'Node Visualizer',
      icon: '🧱',
      estimatedTime: '10 min',
      content: {
        interactiveSimulation: {
          type: 'node-editor',
          title: 'Interactive Node Sandbox'
        },
        callouts: [
          {
            type: 'note',
            title: 'Node Anatomy',
            body: 'A node holds Data (the value) and a Next pointer (the address of the next node).'
          }
        ]
      }
    },
    {
      id: 'memory',
      title: 'Memory Visualization',
      icon: '🧠',
      estimatedTime: '5 min',
      content: {
        visualDemo: {
          type: 'memory-scatter',
          title: 'Heap Allocation Scatter',
          description: 'Nodes are scattered randomly in memory and linked explicitly via addresses.'
        },
        memoryDiagram: {
          elements: ['10', '2500', '8900', '1200'],
          startAddress: 1000,
          elementSize: 4,
          label: 'Scattered Heap Memory'
        }
      }
    },
    {
      id: 'traversal',
      title: 'Traversal Animation',
      icon: '🏃',
      estimatedTime: '10 min',
      content: {
        interactiveSimulation: {
          type: 'traversal',
          title: 'Pointer Walk'
        },
        stepAnimation: {
          steps: [
            { title: 'Start at Head', description: 'Point current to the first node.', state: 'head' },
            { title: 'Move Next', description: 'current = current.next', state: 'moving' },
            { title: 'Reach End', description: 'current becomes null.', state: 'null' }
          ]
        }
      }
    },
    {
      id: 'insertion',
      title: 'Insertion Visualizer',
      icon: '➕',
      estimatedTime: '15 min',
      content: {
        interactiveSimulation: {
          type: 'insertion',
          title: 'Interactive Insertion (O(1))'
        },
        keyIdea: {
          title: 'Zero Shifting',
          description: 'Insertion only requires changing two pointers. No other elements are moved.'
        }
      }
    },
    {
      id: 'deletion',
      title: 'Deletion Visualizer',
      icon: '🗑️',
      estimatedTime: '15 min',
      content: {
        interactiveSimulation: {
          type: 'deletion',
          title: 'Interactive Deletion (O(1))'
        },
        keyIdea: {
          title: 'Bypass to Delete',
          description: 'Point the previous node directly to the next node. The deleted node is bypassed.'
        }
      }
    },
    {
      id: 'search-visualizer',
      title: 'Search Visualizer',
      icon: '🔍',
      estimatedTime: '10 min',
      content: {
        interactiveSimulation: {
          type: 'search',
          title: 'Linear Search (O(n))'
        },
        callouts: [
          {
            type: 'warning',
            title: 'No Random Access',
            body: 'You cannot jump to index 5. You must start at Head and follow 5 pointers.'
          }
        ]
      }
    },
    {
      id: 'singly-linked',
      title: 'Singly Linked List',
      icon: '➡️',
      estimatedTime: '10 min',
      content: {
        visualDemo: {
          type: 'singly-list',
          title: 'One-Way Street',
          description: 'Traversal is strictly forward. You can never go back without restarting from Head.'
        }
      }
    },
    {
      id: 'doubly-linked',
      title: 'Doubly Linked List',
      icon: '↔️',
      estimatedTime: '15 min',
      content: {
        visualDemo: {
          type: 'doubly-list',
          title: 'Two-Way Street',
          description: 'Every node has a Prev and Next pointer. Traversal is bidirectional.'
        },
        keyIdea: {
          title: 'Trade-off',
          description: 'Faster backwards traversal at the cost of double the pointer memory.'
        }
      }
    },
    {
      id: 'circular-linked',
      title: 'Circular Linked List',
      icon: '🔄',
      estimatedTime: '10 min',
      content: {
        visualDemo: {
          type: 'circular-list',
          title: 'Infinite Loop',
          description: 'The Tail pointer connects back to the Head. There is no null terminator.'
        }
      }
    },
    {
      id: 'reversal',
      title: 'Reverse Linked List',
      icon: '🔀',
      estimatedTime: '20 min',
      content: {
        interactiveSimulation: {
          type: 'reversal',
          title: 'Pointer Reversal Simulator'
        },
        stepAnimation: {
          steps: [
            { title: 'Save Next', description: 'next = curr.next', state: 'save' },
            { title: 'Reverse Link', description: 'curr.next = prev', state: 'reverse' },
            { title: 'Advance Prev', description: 'prev = curr', state: 'adv-prev' },
            { title: 'Advance Curr', description: 'curr = next', state: 'adv-curr' }
          ]
        }
      }
    },
    {
      id: 'two-pointers',
      title: 'Fast & Slow Pointer',
      icon: '🐇',
      estimatedTime: '15 min',
      content: {
        visualDemo: {
          type: 'fast-slow-pointers',
          title: 'Hare and Tortoise',
          description: 'Fast moves 2 steps, Slow moves 1 step. Perfect for finding the middle node.'
        }
      }
    },
    {
      id: 'cycle-detection',
      title: 'Cycle Detection',
      icon: '🌪️',
      estimatedTime: '20 min',
      content: {
        visualDemo: {
          type: 'cycle-detection',
          title: 'Floyd\'s Algorithm',
          description: 'If there is a cycle, the Fast pointer will eventually lap the Slow pointer.'
        },
        stepAnimation: {
          steps: [
            { title: 'Start', description: 'Both pointers at Head.', state: 'start' },
            { title: 'Move', description: 'Fast(2x), Slow(1x).', state: 'move' },
            { title: 'Collision', description: 'Pointers meet inside the loop.', state: 'collide' }
          ]
        }
      }
    },
    {
      id: 'merge-lists',
      title: 'Merge Two Lists',
      icon: '🧬',
      estimatedTime: '15 min',
      content: {
        visualDemo: {
          type: 'merge-lists',
          title: 'Zipper Merge',
          description: 'Compare heads of two sorted lists and weave their pointers together.'
        }
      }
    },
    {
      id: 'interview-patterns',
      title: 'Interview Pattern Visualizer',
      icon: '🧩',
      estimatedTime: '20 min',
      content: {
        interactiveSimulation: {
          type: 'interview-visualizer',
          title: 'Pattern Playground'
        },
        patterns: [
          {
            name: 'Reverse In-Place',
            description: 'Flip pointers iteratively.',
            whenToUse: 'When space is strictly O(1)',
            template: [],
            dryRun: 'Watch visualizer.',
            problems: ['Reverse Linked List']
          }
        ]
      }
    },
    {
      id: 'realworld',
      title: 'Real World Applications',
      icon: '🌍',
      estimatedTime: '5 min',
      content: {
        analogy: {
          title: 'Linked Lists in the Wild',
          description: 'Data structures mapped to everyday technology.',
          mapping: [
            { realWorld: 'Browser History', csConcept: 'Doubly Linked List' },
            { realWorld: 'Spotify Playlist', csConcept: 'Circular Doubly Linked List' },
            { realWorld: 'Undo / Redo', csConcept: 'Singly Linked List Stack' },
            { realWorld: 'OS Memory Management', csConcept: 'Free List (SLL)' }
          ]
        }
      }
    },
    {
      id: 'interview-hub',
      title: 'Revision Dashboard',
      icon: '⚡',
      estimatedTime: '5 min',
      content: {
        revisionHub: {
          topicSummary: {
            definition: ['Dynamic chain of nodes', 'Pointers connect scattered memory', 'O(1) insertion/deletion at endpoints'],
            whyImportant: ['Foundation for Trees/Graphs', 'Heavy presence in FAANG interviews']
          },
          keyConcepts: [
            { title: 'Node', description: 'Data + Pointer' },
            { title: 'Head', description: 'Start of the list' },
            { title: 'Tail', description: 'End of the list (next = null)' }
          ],
          operationsTable: [
            { operation: 'Prepend (Insert Head)', complexity: 'O(1)' },
            { operation: 'Append (Insert Tail)', complexity: 'O(n)' },
            { operation: 'Delete Node', complexity: 'O(1)' },
            { operation: 'Search', complexity: 'O(n)' }
          ],
          methodsCheatSheet: [],
          patternSummary: [],
          commonQuestions: [],
          commonMistakes: [
            { title: 'Losing the Head', description: 'Never move the original head pointer directly.' },
            { title: 'Null Reference', description: 'Always check if node is null before accessing node.next.' }
          ],
          interviewCrashNotes: [],
          finalQuiz: []
        }
      }
    }
  ]
};
