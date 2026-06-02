import Link from 'next/link';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { FadeIn } from '@/components/ui/FadeIn';
import { HeroMockup } from '@/components/ui/HeroMockup';
import { ChevronRight, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-obsidian)] text-white font-sans selection:bg-[var(--color-accent-indigo)]/30 overflow-hidden relative">
      
      {/* Dynamic Background Particles / Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0" />
      
      {/* Top Navigation */}
      <nav className="absolute top-0 w-full p-6 z-50 flex items-center justify-between max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <Terminal className="text-[var(--color-accent-indigo)]" />
          <span>CODE<span className="text-gray-400 font-light">PRACTICE</span></span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link href="/register">
            <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-accent-indigo)]/30 bg-[var(--color-accent-indigo)]/10 text-[var(--color-accent-indigo)] text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-indigo)] animate-pulse" />
            Platform v2.0 Now Live
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter mb-6">
            Master Coding. <br />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-cyan)]">
              Crack Interviews.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            An AI-powered coding platform that helps developers solve problems, build consistency, analyze performance, and become interview-ready.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/learning">
              <PremiumButton className="text-base px-8 py-4 flex items-center gap-2">
                DSA Library <ChevronRight size={18} />
              </PremiumButton>
            </Link>
            <Link href="/problems">
              <button className="text-base px-8 py-4 rounded-lg bg-transparent border border-gray-700 text-white font-semibold hover:border-gray-400 transition-colors flex items-center gap-2">
                Start Solving
              </button>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} className="w-full">
          <HeroMockup />
        </FadeIn>

      </main>
    </div>
  );
}
