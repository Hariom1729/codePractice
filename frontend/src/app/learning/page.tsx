import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { NeonNav } from '@/components/ui/NeonNav';
import { FadeIn } from '@/components/ui/FadeIn';
import { BentoCard } from '@/components/ui/BentoCard';
import { BookOpen, Map, FileText, Bookmark, PlayCircle, Lock } from 'lucide-react';
import Link from 'next/link';

export default async function LearningHub() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const roadmaps = [
    { title: 'Data Structures Crash Course', duration: '2 weeks', progress: 100, locked: false, color: 'text-[var(--color-accent-emerald)]' },
    { title: 'Dynamic Programming Mastery', duration: '4 weeks', progress: 35, locked: false, color: 'text-[var(--color-accent-violet)]' },
    { title: 'Advanced Graph Algorithms', duration: '3 weeks', progress: 0, locked: true, color: 'text-gray-500' },
    { title: 'System Design Fundamentals', duration: '6 weeks', progress: 0, locked: true, color: 'text-gray-500' }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-obsidian)] text-white font-sans selection:bg-[var(--color-accent-indigo)]/30 pb-20">
      
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 flex justify-center py-6 pointer-events-none">
        <div className="pointer-events-auto">
          <NeonNav />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full mt-4">
        <FadeIn delay={0.1}>
          <header className="mb-10">
            <h1 className="text-4xl font-extralight tracking-tight mb-2">
              Learning <span className="font-bold">Hub</span>
            </h1>
            <p className="text-gray-400 font-medium tracking-wide text-sm">Curated roadmaps, saved problems, and personalized study plans.</p>
          </header>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Roadmaps Section */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-2 mb-4">
                <Map className="text-[var(--color-accent-blue)]" />
                <h2 className="text-2xl font-bold tracking-tight">Structured Roadmaps</h2>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {roadmaps.map((map, i) => (
                <FadeIn delay={0.3 + (i * 0.1)} key={map.title}>
                  <BentoCard className={`h-48 flex flex-col justify-between ${map.locked ? 'opacity-60 grayscale' : 'hover:border-[var(--color-accent-blue)]/50'} transition-colors cursor-pointer group`}>
                    <div className="flex justify-between items-start">
                      <div className={`p-2 rounded-lg ${map.locked ? 'bg-gray-800' : 'bg-white/5'} group-hover:bg-white/10 transition-colors`}>
                        {map.locked ? <Lock size={20} className={map.color} /> : <BookOpen size={20} className={map.color} />}
                      </div>
                      <span className="text-xs font-semibold text-gray-500">{map.duration}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3">{map.title}</h3>
                      {map.locked ? (
                        <div className="text-sm text-gray-500 font-medium">Unlocks at Level 50</div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>Progress</span>
                            <span>{map.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] h-full rounded-full" 
                              style={{ width: `${map.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </BentoCard>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Side Panel: Quick Access */}
          <div className="col-span-1 space-y-6">
            <FadeIn delay={0.6}>
              <div className="flex items-center gap-2 mb-4">
                <Bookmark className="text-[var(--color-accent-violet)]" />
                <h2 className="text-2xl font-bold tracking-tight">Quick Access</h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              <BentoCard className="p-0 overflow-hidden">
                <div className="divide-y divide-[var(--color-border-glass)]">
                  <Link href="/dashboard" className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group">
                    <div className="p-2 bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)] rounded-lg group-hover:scale-110 transition-transform">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">Interview Cheat Sheets</h4>
                      <p className="text-xs text-gray-400">Quick syntax and pattern guides</p>
                    </div>
                  </Link>
                  <Link href="/dashboard" className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group">
                    <div className="p-2 bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] rounded-lg group-hover:scale-110 transition-transform">
                      <PlayCircle size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">Video Editorials</h4>
                      <p className="text-xs text-gray-400">Step-by-step visual explanations</p>
                    </div>
                  </Link>
                  <Link href="/dashboard" className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group">
                    <div className="p-2 bg-[var(--color-accent-violet)]/10 text-[var(--color-accent-violet)] rounded-lg group-hover:scale-110 transition-transform">
                      <Bookmark size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">Review List</h4>
                      <p className="text-xs text-gray-400">Problems to solve again</p>
                    </div>
                  </Link>
                </div>
              </BentoCard>
            </FadeIn>
          </div>

        </div>
      </div>
    </div>
  );
}
