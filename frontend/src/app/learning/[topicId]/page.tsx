import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTopicContent } from '@/resources/content/index';
import { NeonNav } from '@/components/ui/NeonNav';
import { FadeIn } from '@/components/ui/FadeIn';
import { BentoCard } from '@/components/ui/BentoCard';
import { RoadmapVisualizer } from '@/components/learning/RoadmapVisualizer';
import { PremiumButton } from '@/components/ui/PremiumButton';
import {
  BookOpen, PlayCircle, Code2, ArrowRight, Activity, BrainCircuit,
  Layout, ChevronRight, Check, Clock, Zap, Target, Lock, FileText,
  BarChart2, Eye, Globe, AlertTriangle, Layers, Cpu, Star, Brain
} from 'lucide-react';
import Link from 'next/link';
import { AITutor } from '@/components/learning/AITutor';

const SECTION_ICONS: Record<string, any> = {
  intro: BookOpen, theory: BrainCircuit, internal: Cpu, memory: Layers,
  operations: Code2, methods: FileText, stl: Code2, complexity: BarChart2,
  visual: Eye, realworld: Globe, interview: Target, mistakes: AlertTriangle,
  patterns: Brain, advanced: Star, cheatsheet: FileText, quiz: Zap, practice: PlayCircle,
};

const SECTION_COLORS: Record<string, string> = {
  intro: 'text-cyan-400', theory: 'text-violet-400', internal: 'text-indigo-400',
  memory: 'text-blue-400', operations: 'text-emerald-400', methods: 'text-teal-400',
  stl: 'text-green-400', complexity: 'text-yellow-400', visual: 'text-orange-400',
  realworld: 'text-pink-400', interview: 'text-red-400', mistakes: 'text-amber-400',
  patterns: 'text-purple-400', advanced: 'text-fuchsia-400', cheatsheet: 'text-sky-400',
  quiz: 'text-lime-400', practice: 'text-rose-400',
};

// Fallback curriculum for topics without content yet
const FALLBACK_LESSONS = [
  { id: 1, title: 'Introduction', type: 'theory', duration: '15 min', locked: false, completed: true },
  { id: 2, title: 'Visualizing the Concept', type: 'interactive', duration: '20 min', locked: false, completed: false },
  { id: 3, title: 'Classic Problems & Patterns', type: 'code', duration: '45 min', locked: false, completed: false },
  { id: 4, title: 'Advanced Techniques', type: 'code', duration: '30 min', locked: true, completed: false },
];

export default async function TopicOverview({ params }: { params: Promise<{ topicId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const { topicId } = await params;
  const topicContent = getTopicContent(topicId);
  const title = topicContent?.title ?? topicId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const hasFullContent = !!topicContent;
  const sections = topicContent?.sections ?? [];

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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {hasFullContent && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    ✓ Full Course Available
                  </span>
                )}
                {topicContent && (
                  <>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-accent-violet)]/15 text-[var(--color-accent-violet)] border border-[var(--color-accent-violet)]/20">
                      {topicContent.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={12} /> {topicContent.totalTime}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-extralight tracking-tight mb-4 text-white">
                Master{' '}
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)]">
                  {title}
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl">
                {topicContent?.description ?? `Learn the core concepts, visualize the algorithms in action, and solve real-world interview problems using ${title}.`}
              </p>
              {topicContent?.prerequisites && topicContent.prerequisites.length > 0 && (
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                  <span className="font-semibold">Prerequisites:</span>
                  {topicContent.prerequisites.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-gray-400">{p}</span>
                  ))}
                </div>
              )}
            </div>
            <Link href={`/learning/${topicId}/lesson/1`}>
              <PremiumButton className="px-8 py-3 flex items-center gap-2 whitespace-nowrap">
                {hasFullContent ? 'Start Full Course' : 'Continue Learning'} <ArrowRight size={18} />
              </PremiumButton>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Curriculum */}
          <div className="col-span-1 lg:col-span-2 space-y-8">

            {/* Section Curriculum */}
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-2 mb-4">
                <Layout className="text-[var(--color-accent-violet)]" />
                <h2 className="text-2xl font-bold tracking-tight">
                  {hasFullContent ? '17-Section Complete Curriculum' : 'Curriculum'}
                </h2>
                {hasFullContent && (
                  <span className="ml-auto text-xs text-gray-500 font-medium">{sections.length} sections</span>
                )}
              </div>
              <BentoCard className="p-0 overflow-hidden bg-[var(--color-surface-elevated)]/40 border border-[var(--color-border-glass)]">
                <div className="divide-y divide-[var(--color-border-glass)]">
                  {hasFullContent ? (
                    sections.map((section, index) => {
                      const Icon = SECTION_ICONS[section.id] ?? BookOpen;
                      const color = SECTION_COLORS[section.id] ?? 'text-gray-400';
                      return (
                        <Link
                          key={section.id}
                          href={`/learning/${topicId}/lesson/1`}
                          className="flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.03] group-hover:bg-white/[0.07] transition-colors border border-white/5`}>
                              <Icon size={16} className={color} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-600 font-mono">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-semibold text-sm text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">
                                  {section.title}
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-0.5">
                                <Clock size={10} />
                                <span>{section.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="text-[var(--color-accent-cyan)]" size={16} />
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    FALLBACK_LESSONS.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={lesson.locked ? '#' : `/learning/${topicId}/lesson/${lesson.id}`}
                        className={`flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                            lesson.completed ? 'bg-green-500/20 border-green-500 text-green-400' :
                            lesson.locked ? 'bg-gray-800 border-gray-700 text-gray-500' :
                            'border-[var(--color-accent-violet)] text-[var(--color-accent-violet)]'
                          }`}>
                            {lesson.completed ? <Check size={18} /> :
                             lesson.locked ? <Lock size={18} /> :
                             lesson.type === 'theory' ? <BookOpen size={18} /> :
                             lesson.type === 'interactive' ? <PlayCircle size={18} /> :
                             <Code2 size={18} />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">
                              {lesson.id}. {lesson.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-1">
                              <span className="uppercase tracking-wider">{lesson.type}</span>
                              <span>•</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </BentoCard>
            </FadeIn>

            {/* Visual Learning Preview */}
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="text-[var(--color-accent-cyan)]" />
                <h2 className="text-2xl font-bold tracking-tight">Visual Learning</h2>
              </div>
              <BentoCard className="h-48 flex flex-col items-center justify-center border border-[var(--color-accent-cyan)]/30 bg-gradient-to-tr from-[var(--color-surface-obsidian)] to-[var(--color-accent-cyan)]/10 group cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center">
                  <Link href={`/learning/${topicId}/lesson/1`}>
                    <PremiumButton>Launch Interactive Visualizer</PremiumButton>
                  </Link>
                </div>
                <div className="flex gap-3 items-end">
                  {[4, 2, 8, 5, 1, 9, 3].map((val, idx) => (
                    <div
                      key={idx}
                      className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-glass)] rounded flex items-center justify-center font-mono font-bold text-lg animate-pulse"
                      style={{ animationDelay: `${idx * 0.15}s`, width: 44, height: 44 }}
                    >
                      {val}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">Interactive algorithm visualizer inside the course</p>
              </BentoCard>
            </FadeIn>

          </div>

          {/* Right Column: AI Tutor + Stats */}
          <div className="col-span-1 space-y-8">

            {/* Stats card for full content topics */}
            {hasFullContent && (
              <FadeIn delay={0.2}>
                <BentoCard className="p-5 space-y-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <BarChart2 size={16} className="text-[var(--color-accent-cyan)]" /> Course Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Sections', value: `${sections.length}`, icon: '📚' },
                      { label: 'Duration', value: topicContent.totalTime, icon: '⏱️' },
                      { label: 'Difficulty', value: topicContent.difficulty, icon: '🎯' },
                      { label: 'Quiz Qs', value: '10', icon: '🧠' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/[0.03] rounded-xl p-3 border border-white/5 text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="font-bold text-white text-sm">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </BentoCard>
              </FadeIn>
            )}

            <FadeIn delay={0.4}>
              <div className="h-[380px]">
                <AITutor contextTopic={title} />
              </div>
            </FadeIn>

          </div>
        </div>

        {/* Bottom Roadmap */}
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
