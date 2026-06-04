// ============================================================
// DSA Learning Platform — Shared Types
// All TypeScript interfaces for the content layer live here.
// This file has NO imports from other content files.
// ============================================================

export type SectionType =
  | 'intro'
  | 'theory'
  | 'internal'
  | 'memory'
  | 'operations'
  | 'methods'
  | 'stl'
  | 'complexity'
  | 'visual'
  | 'realworld'
  | 'interview'
  | 'mistakes'
  | 'patterns'
  | 'advanced'
  | 'cheatsheet'
  | 'quiz'
  | 'practice'
  | 'two-pointers'
  | 'sliding-window'
  | 'string-hashing'
  | 'pattern-matching'
  | 'node-structure'
  | 'insertion'
  | 'deletion'
  | 'traversal'
  | 'singly-linked'
  | 'doubly-linked'
  | 'circular-linked'
  | 'reversal'
  | 'interview-patterns'
  | 'interview-hub'
  | 'search-visualizer'
  | 'cycle-detection'
  | 'merge-lists';

export interface CodeExample {
  language: 'javascript' | 'python' | 'cpp' | 'java';
  code: string;
  explanation?: string;
}

export interface ComplexityRow {
  operation: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  notes: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation: string;
}

export interface PracticeItem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  description: string;
  hint: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface PatternTemplate {
  name: string;
  description: string;
  whenToUse: string;
  template: CodeExample[];
  dryRun: string;
  problems: string[];
}

export interface HookBlock {
  question: string;
  answer: string;
  concept: string;
  icon?: string;
}

export interface KeyIdeaBlock {
  title: string;
  description: string; // Max 2 lines
}

export interface AnalogyBlock {
  title: string;
  description: string;
  mapping: { realWorld: string; csConcept: string }[];
}

export interface FeatureCard {
  title: string;
  description: string; // Max 2 lines
  icon: string;
}

export interface MistakeBlock {
  title: string;
  description: string;
}

export interface InterviewPerspectiveBlock {
  title: string;
  checklist: string[];
}


export interface Callout {
  type: 'tip' | 'warning' | 'note' | 'important';
  title: string;
  body: string;
}

export interface MethodEntry {
  name: string;
  syntax: string;
  description: string;
  params: string;
  returns: string;
  complexity: string;
  example: string;
  note: string;
}

export interface MemoryDiagram {
  elements: string[];
  startAddress: number;
  elementSize: number;
  label: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface RevisionHubData {
  topicSummary: { definition: string[]; whyImportant: string[] };
  keyConcepts: { title: string; description: string; icon?: string }[];
  operationsTable: { operation: string; complexity: string; note?: string }[];
  methodsCheatSheet: { category: string; methods: { method: string; purpose: string; complexity: string; example: string }[] }[];
  patternSummary: { category: string; patterns: { name: string; whenToUse: string; explanation: string; difficulty: string }[] }[];
  commonQuestions: { title: string; difficulty: string; patternUsed: string; frequency: 'High' | 'Medium' | 'Low' }[];
  commonMistakes: { title: string; description: string }[];
  interviewCrashNotes: { category: string; notes: string[] }[];
  finalQuiz: QuizQuestion[];
}

export interface VisualDemoBlock {
  type: string;
  title: string;
  description: string;
}

export interface InteractiveSimulationBlock {
  type: string;
  title: string;
}

export interface StepAnimationBlock {
  steps: { title: string; description: string; state: any }[];
}

export interface ConceptBlock {
  type: 'concept';
  text: string;
  visual: {
    type: string;
    data?: any;
  };
}

export interface InternalWorkingBlock {
  type: 'internal-working';
  text: string;
  steps: { title: string; description: string; state?: any }[];
}

export interface ComplexityBlock {
  type: 'complexity';
  text: string;
  operation: string;
  time: string;
  space: string;
  reason: string;
}

export interface RealWorldBlock {
  type: 'real-world';
  text: string;
  visual: {
    type: string;
    title: string;
    data?: any;
  };
}

export interface InterviewInsightBlock {
  type: 'interview-insight';
  text: string;
  checklist: string[];
}

export interface MiniPracticeBlock {
  type: 'mini-practice';
  question: string;
  current: string;
  expected: string;
  interactiveDemoType: string;
}

export type LessonBlock =
  | ConceptBlock
  | InternalWorkingBlock
  | ComplexityBlock
  | RealWorldBlock
  | InterviewInsightBlock
  | MiniPracticeBlock;

export interface SectionContent {
  prose?: string[];
  hook?: HookBlock;
  keyIdea?: KeyIdeaBlock;
  analogy?: AnalogyBlock;
  whyItMatters?: FeatureCard[];
  mistakes?: MistakeBlock[];
  interviewPerspective?: InterviewPerspectiveBlock;
  takeaways?: string[];
  
  codeExamples?: CodeExample[];
  complexityTable?: ComplexityRow[];
  memoryDiagram?: MemoryDiagram;
  patterns?: PatternTemplate[];
  quiz?: QuizQuestion[];
  practice?: PracticeItem[];
  callouts?: Callout[];
  methods?: MethodEntry[];
  keyPoints?: string[]; // Deprecated, use takeaways
  tableData?: TableData[];
  interactiveVisualizer?: 'array' | 'linked-list';
  revisionHub?: RevisionHubData;
  visualDemo?: VisualDemoBlock;
  interactiveSimulation?: InteractiveSimulationBlock;
  stepAnimation?: StepAnimationBlock;
  blocks?: LessonBlock[];
}

export type SectionLayoutType = 
  | 'introduction' 
  | 'memory-map' 
  | 'operation-visualizer' 
  | 'complexity-analysis' 
  | 'algorithm-simulation' 
  | 'pattern-matching' 
  | 'interview-prep';

export interface Section {
  id: SectionType;
  title: string;
  icon: string;
  estimatedTime: string;
  layoutType?: SectionLayoutType;
  content: SectionContent;
}

export interface TopicContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  totalTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  prerequisites: string[];
  sections: Section[];
}
