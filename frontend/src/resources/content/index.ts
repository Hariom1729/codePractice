// ============================================================
// DSA Learning Platform — Content Registry
// ============================================================
// Import topic content files here and register them below.
// All TypeScript interfaces live in ./types.ts (no circular deps).
// ============================================================

import { arraysContent } from './arrays';
import { stringsContent } from './strings';
import { linkedListsContent } from './linkedLists';
import { sortingContent } from './sorting';
import { stacksQueuesContent } from './stacksQueues';

// Re-export all types so consumers can import from one place
export type {
  SectionType,
  CodeExample,
  ComplexityRow,
  QuizQuestion,
  PracticeItem,
  PatternTemplate,
  Callout,
  MethodEntry,
  MemoryDiagram,
  TableData,
  SectionContent,
  Section,
  TopicContent,
  HookBlock,
  KeyIdeaBlock,
  AnalogyBlock,
  FeatureCard,
  MistakeBlock,
  InterviewPerspectiveBlock,
} from './types';

// Re-export content for direct imports
export { arraysContent } from './arrays';
export { stringsContent } from './strings';
export { linkedListsContent } from './linkedLists';
export { sortingContent } from './sorting';
export { stacksQueuesContent } from './stacksQueues';

/**
 * Returns the full TopicContent for a given topicId.
 * Returns null if the topic has not been built yet.
 *
 * @param topicId - The slug identifier of the topic (e.g. 'arrays', 'linked-lists')
 */
export function getTopicContent(topicId: string) {
  const registry: Record<string, import('./types').TopicContent> = {
    arrays: arraysContent,
    strings: stringsContent,
    'linked-lists': linkedListsContent,
    sorting: sortingContent,
    'stacks-queues': stacksQueuesContent,
  };

  return registry[topicId] ?? null;
}

