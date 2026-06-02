import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { NeonNav } from '@/components/ui/NeonNav';
import { FadeIn } from '@/components/ui/FadeIn';
import { BentoCard } from '@/components/ui/BentoCard';
import { RoadmapVisualizer } from '@/components/learning/RoadmapVisualizer';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { BookOpen, PlayCircle, Code2, ArrowRight, Activity, BrainCircuit, Layout } from 'lucide-react';
import Link from 'next/link';

export default async function TopicOverview({ params }: { params: Promise<{ topicId: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const { topicId } = await params;
  
  // Convert hyphens to title case for display
  const title = topicId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const lessons = [
    { id: 1, title: `Introduction to ${title}`, type: 'theory', duration: '15 min', locked: false, completed: true },
    { id: 2, title: `Visualizing ${title}`, type: 'interactive', duration: '20 min', locked: false, completed: false },
    { id: 3, title: `Classic Problems & Patterns`, type: 'code', duration: '45 min', locked: false, completed: false },
    { id: 4, title: `Advanced Techniques`, type: 'code', duration: '30 min', locked: true, completed: false },
  ];

  const practiceProblems = [
    { id: '1', title: `Basic ${title} Implementation`, difficulty: 'Easy', time: '15m' },
    { id: '2', title: `Optimized ${title} Search`, difficulty: 'Medium', time: '30m' },
    { id: '3', title: `Hard ${title} Challenge`, difficulty: 'Hard', time: '45m' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-obsidian)] text-white font-sans selection:bg-[var(--color-accent-indigo)]/30 pb-24 relative">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[var(--color-accent-violet)] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      {/* Top Navigation */}
      <div className="sticky top-0 z-50 flex justify-center py-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-7xl px-6">
          <NeonNav />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 w-full mt-4 relative z-10">
        
        {/* Breadcrumb & Title */}
        <FadeIn delay={0.1} className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-semibold uppercase tracking-wider">
            <Link href="/learning" className="hover:text-[var(--color-accent-violet)] transition-colors">Library</Link>
            <ChevronRight size={14} />
            <span className="text-gray-300">{title}</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-extralight tracking-tight mb-4 text-white">
                Master <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)]">{title}</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl">
                Learn the core concepts, visualize the algorithms in action, and solve real-world interview problems using {title}.
              </p>
            </div>
            <Link href={`/learning/${topicId}/lesson/1`}>
              <PremiumButton className="px-8 py-3 flex items-center gap-2">
                Continue Lesson 2 <ArrowRight size={18} />
              </PremiumButton>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Lessons & Practice */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-2 mb-4">
                <Layout className="text-[var(--color-accent-violet)]" />
                <h2 className="text-2xl font-bold tracking-tight">Curriculum</h2>
              </div>
              <BentoCard className="p-0 overflow-hidden bg-[var(--color-surface-elevated)]/40 border border-[var(--color-border-glass)]">
                <div className="divide-y divide-[var(--color-border-glass)]">
                  {lessons.map((lesson) => (
                    <Link key={lesson.id} href={lesson.locked ? '#' : `/learning/${topicId}/lesson/${lesson.id}`} className={`flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          lesson.completed ? 'bg-green-500/20 border-green-500 text-green-400' :
                          lesson.locked ? 'bg-gray-800 border-gray-700 text-gray-500' : 'border-[var(--color-accent-violet)] text-[var(--color-accent-violet)]'
                        }`}>
                          {lesson.completed ? <Check size={18} /> : 
                           lesson.type === 'theory' ? <BookOpen size={18} /> :
                           lesson.type === 'interactive' ? <PlayCircle size={18} /> :
                           <Code2 size={18} />}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${lesson.completed ? 'text-gray-300' : 'text-white'} group-hover:text-[var(--color-accent-cyan)] transition-colors`}>
                            {lesson.id}. {lesson.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-1">
                            <span className="uppercase tracking-wider">{lesson.type}</span>
                            <span>•</span>
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                      {!lesson.locked && !lesson.completed && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="text-[var(--color-accent-cyan)]" />
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </BentoCard>
            </FadeIn>

            {/* Interactive Visualizer Preview */}
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="text-[var(--color-accent-cyan)]" />
                <h2 className="text-2xl font-bold tracking-tight">Visual Learning</h2>
              </div>
              <BentoCard className="h-64 flex flex-col items-center justify-center border border-[var(--color-accent-cyan)]/30 bg-gradient-to-tr from-[var(--color-surface-obsidian)] to-[var(--color-accent-cyan)]/10 group cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center">
                  <PremiumButton>Launch Interactive Visualizer</PremiumButton>
                </div>
                {/* Mock animation preview */}
                <div className="flex gap-4">
                  {[4, 2, 8, 5, 1, 9].map((val, idx) => (
                    <div key={idx} className="w-12 h-12 bg-[var(--color-surface-elevated)] border border-[var(--color-border-glass)] rounded flex items-center justify-center font-mono font-bold text-lg animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }}>
                      {val}
                    </div>
                  ))}
                </div>
              </BentoCard>
            </FadeIn>

          </div>

          {/* Right Column: AI Tutor & Practice */}
          <div className="col-span-1 space-y-8">
            
            <FadeIn delay={0.4}>
              <BentoCard className="p-6 bg-gradient-to-br from-[var(--color-accent-violet)]/20 to-[var(--color-surface-obsidian)] border-[var(--color-accent-violet)]/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[var(--color-accent-violet)] text-white">
                    <BrainCircuit size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-white">AI Topic Tutor</h3>
                </div>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  Stuck on a concept? Ask the AI tutor to explain {title} in simple terms, generate custom examples, or quiz you.
                </p>
                <div className="w-full bg-[#050816] rounded-xl p-3 border border-[var(--color-border-glass)] text-sm text-gray-400 flex items-center justify-between cursor-text hover:border-[var(--color-accent-violet)] transition-colors">
                  <span>Ask a question...</span>
                  <div className="px-2 py-0.5 rounded bg-white/10 text-xs font-mono text-gray-300">⌘K</div>
                </div>
              </BentoCard>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="text-[var(--color-accent-emerald)]" />
                <h2 className="text-2xl font-bold tracking-tight">Practice Arena</h2>
              </div>
              <BentoCard className="p-0 overflow-hidden">
                <div className="divide-y divide-[var(--color-border-glass)]">
                  {practiceProblems.map((problem) => (
                    <div key={problem.id} className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
                      <div>
                        <h4 className="font-semibold text-sm text-white group-hover:text-[var(--color-accent-emerald)] transition-colors">{problem.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${
                            problem.difficulty === 'Easy' ? 'text-green-400' :
                            problem.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {problem.difficulty}
                          </span>
                          <span className="text-gray-600 text-xs">•</span>
                          <span className="text-gray-400 text-xs">{problem.time} avg</span>
                        </div>
                      </div>
                      <Link href={`/problems/${problem.id}`}>
                        <button className="w-8 h-8 rounded-full border border-[var(--color-border-glass)] flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                          <PlayCircle size={14} />
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </FadeIn>

          </div>
        </div>
        
        {/* Bottom Roadmap Visualization */}
        <FadeIn delay={0.6} className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <Layout className="text-white" />
            <h2 className="text-2xl font-bold tracking-tight">Your Progress Roadmap</h2>
          </div>
          <RoadmapVisualizer />
        </FadeIn>

      </main>
    </div>
  );
}

// Needed icon for breadcrumbs
import { ChevronRight, Check } from 'lucide-react';
