import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { NeonNav } from '@/components/ui/NeonNav';
import { FadeIn } from '@/components/ui/FadeIn';
import { LearningHero } from '@/components/learning/LearningHero';
import { TopicCard } from '@/components/learning/TopicCard';
import { 
  Database, Type, List, Layers, ArrowRightLeft, Hash, Network, Binary, 
  ChevronUpSquare, Share2, Repeat, Undo2, Coins, Activity, Maximize2, 
  GitCommit, Search, TextSelect, Boxes, Link2, Route, Spline, Blocks, Target
} from 'lucide-react';

export default async function LearningHub() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // 23 Topic Categories mapped out
  const topics = [
    // Beginner
    { id: 'time-complexity', title: 'Time Complexity', icon: Activity, difficulty: 'Beginner', time: '2 hours', lessons: 5, progress: 0, color: '--color-accent-emerald' },
    { id: 'space-complexity', title: 'Space Complexity', icon: Database, difficulty: 'Beginner', time: '1 hour', lessons: 3, progress: 0, color: '--color-accent-emerald' },
    { id: 'arrays', title: 'Arrays', icon: Database, difficulty: 'Beginner', time: '4 hours', lessons: 12, progress: 100, color: '--color-accent-emerald' },
    { id: 'strings', title: 'Strings', icon: Type, difficulty: 'Beginner', time: '3 hours', lessons: 10, progress: 100, color: '--color-accent-emerald' },
    { id: 'math', title: 'Mathematics', icon: Hash, difficulty: 'Beginner', time: '3 hours', lessons: 8, progress: 0, color: '--color-accent-emerald' },
    { id: 'linked-lists', title: 'Linked Lists', icon: List, difficulty: 'Beginner', time: '5 hours', lessons: 15, progress: 100, color: '--color-accent-emerald' },
    { id: 'stacks', title: 'Stacks', icon: Layers, difficulty: 'Beginner', time: '3 hours', lessons: 8, progress: 100, color: '--color-accent-emerald' },
    { id: 'queues', title: 'Queues', icon: ArrowRightLeft, difficulty: 'Beginner', time: '2 hours', lessons: 6, progress: 60, color: '--color-accent-emerald' },
    { id: 'hash-tables', title: 'Hash Tables', icon: Hash, difficulty: 'Beginner', time: '4 hours', lessons: 14, progress: 0, color: '--color-accent-emerald' },
    
    // Intermediate
    { id: 'binary-search', title: 'Binary Search', icon: Search, difficulty: 'Intermediate', time: '4 hours', lessons: 10, progress: 0, color: '--color-accent-blue' },
    { id: 'two-pointers', title: 'Two Pointers', icon: GitCommit, difficulty: 'Intermediate', time: '5 hours', lessons: 12, progress: 0, color: '--color-accent-blue' },
    { id: 'prefix-sum', title: 'Prefix Sum', icon: Spline, difficulty: 'Intermediate', time: '3 hours', lessons: 8, progress: 0, color: '--color-accent-blue' },
    { id: 'sliding-window', title: 'Sliding Window', icon: Maximize2, difficulty: 'Intermediate', time: '5 hours', lessons: 12, progress: 0, color: '--color-accent-cyan' },
    { id: 'recursion', title: 'Recursion', icon: Repeat, difficulty: 'Intermediate', time: '6 hours', lessons: 16, progress: 0, color: '--color-accent-cyan' },
    { id: 'trees', title: 'Trees', icon: Network, difficulty: 'Intermediate', time: '8 hours', lessons: 20, progress: 0, color: '--color-accent-cyan' },
    { id: 'bst', title: 'Binary Search Trees', icon: Binary, difficulty: 'Intermediate', time: '4 hours', lessons: 10, progress: 0, color: '--color-accent-cyan' },
    { id: 'heaps', title: 'Heaps / Priority Queue', icon: ChevronUpSquare, difficulty: 'Intermediate', time: '5 hours', lessons: 12, progress: 0, color: '--color-accent-cyan' },
    { id: 'graphs', title: 'Graphs', icon: Share2, difficulty: 'Intermediate', time: '10 hours', lessons: 25, progress: 0, color: '--color-accent-cyan' },
    { id: 'greedy', title: 'Greedy Algorithms', icon: Coins, difficulty: 'Intermediate', time: '6 hours', lessons: 14, progress: 0, color: '--color-accent-cyan' },
    { id: 'backtracking', title: 'Backtracking', icon: Undo2, difficulty: 'Intermediate', time: '7 hours', lessons: 18, progress: 0, color: '--color-accent-cyan' },
    
    // Advanced
    { id: 'dynamic-programming', title: 'Dynamic Programming', icon: Activity, difficulty: 'Advanced', time: '15 hours', lessons: 30, progress: 0, color: '--color-accent-violet' },
    { id: 'tries', title: 'Tries', icon: TextSelect, difficulty: 'Advanced', time: '4 hours', lessons: 8, progress: 0, color: '--color-accent-violet' },
    { id: 'union-find', title: 'Union Find (DSU)', icon: Link2, difficulty: 'Advanced', time: '5 hours', lessons: 10, progress: 0, color: '--color-accent-violet' },
    { id: 'shortest-path', title: 'Shortest Path Algos', icon: Route, difficulty: 'Advanced', time: '8 hours', lessons: 15, progress: 0, color: '--color-accent-violet' },
    { id: 'mst', title: 'Minimum Spanning Tree', icon: Spline, difficulty: 'Advanced', time: '6 hours', lessons: 12, progress: 0, color: '--color-accent-violet' },
    { id: 'fenwick-trees', title: 'Fenwick Trees', icon: Boxes, difficulty: 'Advanced', time: '8 hours', lessons: 10, progress: 0, color: '--color-accent-violet' },
    { id: 'segment-trees', title: 'Segment Trees', icon: Boxes, difficulty: 'Advanced', time: '10 hours', lessons: 14, progress: 0, color: '--color-accent-violet' },
    { id: 'advanced-graphs', title: 'Advanced Graphs', icon: Blocks, difficulty: 'Advanced', time: '12 hours', lessons: 20, progress: 0, color: '--color-accent-violet' },
    { id: 'topological-sort', title: 'Topological Sort', icon: Route, difficulty: 'Advanced', time: '4 hours', lessons: 8, progress: 0, color: '--color-accent-violet' },
    { id: 'network-flow', title: 'Network Flow', icon: Share2, difficulty: 'Advanced', time: '8 hours', lessons: 10, progress: 0, color: '--color-accent-violet' },

    // Expert
    { id: 'advanced-dp', title: 'Advanced DP Patterns', icon: Activity, difficulty: 'Expert', time: '20 hours', lessons: 35, progress: 0, color: 'text-fuchsia-500' },
    { id: 'bit-manipulation', title: 'Bit Manipulation', icon: Binary, difficulty: 'Expert', time: '6 hours', lessons: 12, progress: 0, color: 'text-fuchsia-500' },
    { id: 'game-theory', title: 'Game Theory', icon: Layers, difficulty: 'Expert', time: '8 hours', lessons: 14, progress: 0, color: 'text-fuchsia-500' },
    { id: 'string-algos', title: 'String Algorithms', icon: Type, difficulty: 'Expert', time: '10 hours', lessons: 18, progress: 0, color: 'text-fuchsia-500' },
    { id: 'comp-geometry', title: 'Computational Geometry', icon: Hash, difficulty: 'Expert', time: '12 hours', lessons: 15, progress: 0, color: 'text-fuchsia-500' },
    { id: 'cp-techniques', title: 'CP Techniques', icon: Target, difficulty: 'Expert', time: '15 hours', lessons: 25, progress: 0, color: 'text-fuchsia-500' },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--color-bg-obsidian)] text-white font-sans selection:bg-[var(--color-accent-indigo)]/30 pb-24 relative">
      
      {/* Background Particles/Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0" />

      {/* Top Navigation */}
      <div className="sticky top-0 z-50 flex justify-center py-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-7xl px-6">
          <NeonNav />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 w-full mt-4 relative z-10">
        
        {/* Animated Hero Section */}
        <LearningHero />

        {/* Categories Header */}
        <FadeIn delay={0.5} className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Algorithm Roadmap</h2>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-emerald)]"></div> Beginner</span>
            <span className="flex items-center gap-1.5 ml-3"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-cyan)]"></div> Intermediate</span>
            <span className="flex items-center gap-1.5 ml-3"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-violet)]"></div> Advanced</span>
            <span className="flex items-center gap-1.5 ml-3"><div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div> Expert</span>
          </div>
        </FadeIn>

        {/* 23 Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic, i) => (
            <FadeIn key={topic.id} delay={0.5 + (i * 0.05)}>
              <TopicCard
                id={topic.id}
                title={topic.title}
                icon={topic.icon}
                difficulty={topic.difficulty}
                estimatedTime={topic.time}
                lessonsCount={topic.lessons}
                progress={topic.progress}
                color={topic.color}
              />
            </FadeIn>
          ))}
        </div>
      </main>
    </div>
  );
}
