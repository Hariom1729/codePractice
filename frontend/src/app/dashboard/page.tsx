import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import Link from 'next/link';
import { Award, Bell, CheckCircle2, TrendingUp, Zap, Clock, Target, Shield } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { NeonNav } from '@/components/ui/NeonNav';
import { FadeIn } from '@/components/ui/FadeIn';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { CodingHeatmap } from '@/components/ui/CodingHeatmap';
import { AnalyticsChart } from '@/components/ui/AnalyticsChart';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  await dbConnect();

  const user = await User.findById((session.user as any).id).populate('bookmarkedProblems');
  const bookmarkedProblems = user?.bookmarkedProblems || [];

  // Mock data for the elite dashboard showcase
  const metrics = [
    { label: "Total Solved", value: "342", change: "+12 this week", icon: CheckCircle2, color: "text-[var(--color-accent-cyan)]" },
    { label: "Current Streak", value: "14 Days", change: "Personal best: 32", icon: Zap, color: "text-[var(--color-accent-emerald)]" },
    { label: "Global Rank", value: "#4,291", change: "Top 5%", icon: TrendingUp, color: "text-[var(--color-accent-blue)]" },
    { label: "Acceptance Rate", value: "68.4%", change: "+2.1% growth", icon: Target, color: "text-[var(--color-accent-indigo)]" },
  ];

  const dailyProblem = {
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    id: 'mock-id-76',
    topic: 'Sliding Window'
  };

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
          <header className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extralight tracking-tight mb-2">
                Welcome back, <span className="font-bold">{((session.user as any)?.name || 'Hacker').split(' ')[0]}</span>
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 rounded bg-[var(--color-accent-violet)]/20 text-[var(--color-accent-violet)] text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Shield size={14} /> Algorithm Master
                </span>
                <p className="text-gray-400 font-medium tracking-wide text-sm">Level 42 • 8,450 XP</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full border border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)] flex items-center justify-center hover:bg-white/5 transition-colors relative">
                <span className="absolute top-0 right-0 w-3 h-3 bg-[var(--color-accent-emerald)] rounded-full border-2 border-[var(--color-bg-obsidian)]" />
                <Bell size={18} className="text-gray-400" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)] p-[2px]">
                <div className="w-full h-full rounded-full bg-[var(--color-surface-obsidian)] border border-black/50" />
              </div>
            </div>
          </header>
        </FadeIn>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Top Metric Cards */}
          {metrics.map((metric, i) => (
            <FadeIn delay={0.2 + (i * 0.1)} key={metric.label} className="col-span-1">
              <BentoCard className="flex flex-col justify-between h-32 bg-[var(--color-surface-elevated)]/40 border-[var(--color-border-glass)] hover:border-[var(--color-border-glass)] transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-400">{metric.label}</span>
                  <metric.icon size={18} className={metric.color} />
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold tracking-tight">{metric.value}</span>
                  <span className="text-xs font-medium text-gray-500 mb-1">{metric.change}</span>
                </div>
              </BentoCard>
            </FadeIn>
          ))}

          {/* Activity Heatmap */}
          <FadeIn delay={0.6} className="col-span-1 md:col-span-4">
            <CodingHeatmap />
          </FadeIn>

          {/* Analytics Chart */}
          <FadeIn delay={0.7} className="col-span-1 md:col-span-2 lg:col-span-3">
            <AnalyticsChart />
          </FadeIn>

          {/* Achievements Panel */}
          <FadeIn delay={0.8} className="col-span-1 md:col-span-2 lg:col-span-1">
            <BentoCard className="h-[350px] flex flex-col p-6">
              <div className="flex items-center gap-2 mb-6">
                <Award size={20} className="text-[var(--color-accent-violet)]" />
                <h3 className="text-lg font-semibold tracking-tight text-white">Recent Badges</h3>
              </div>
              <div className="space-y-4 flex-grow overflow-y-auto custom-scrollbar pr-2">
                {[
                  { title: "7 Day Streak", desc: "Consistency is key.", color: "bg-orange-500/20 text-orange-400" },
                  { title: "DP Master", desc: "Solved 50 DP problems.", color: "bg-[var(--color-accent-violet)]/20 text-[var(--color-accent-violet)]" },
                  { title: "First Hard", desc: "Cracked your first hard.", color: "bg-red-500/20 text-red-400" }
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className={`p-3 rounded-lg ${badge.color}`}>
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{badge.title}</h4>
                      <p className="text-xs text-gray-400">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </FadeIn>

          {/* Main Stage: Daily Problem */}
          <FadeIn delay={0.9} className="col-span-1 md:col-span-4">
            <BentoCard className="flex flex-col md:flex-row relative overflow-hidden group p-8 bg-[var(--color-surface-elevated)]/20">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-accent-blue)] rounded-full blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
              
              <div className="relative z-10 flex-grow pr-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[var(--color-accent-blue)]/20 rounded-lg">
                    <Zap size={20} className="text-[var(--color-accent-blue)]" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Daily Challenge</h2>
                  <div className="ml-auto flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                      {dailyProblem.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/20">
                      {dailyProblem.topic}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-4 leading-tight">{dailyProblem.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed max-w-2xl">
                  Optimize your algorithm to run in O(n) time using the sliding window technique. This is a classic interview question from top tech companies.
                </p>
                <Link href={`/problems/${dailyProblem.id}`}>
                  <PremiumButton>Initialize Workspace</PremiumButton>
                </Link>
              </div>
            </BentoCard>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
