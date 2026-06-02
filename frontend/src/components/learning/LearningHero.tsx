"use client";

import { motion } from 'framer-motion';
import { Network, Database, Layers, Flame, Trophy, CheckCircle2, Binary } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

export function LearningHero() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#0B1020] to-[#050816] border border-[var(--color-border-glass)] shadow-2xl mb-16 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent-indigo)] rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-accent-cyan)] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      {/* Left Content */}
      <div className="relative z-10 max-w-2xl">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-accent-cyan)]/30 bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-cyan)] animate-pulse" />
            DSA Library v1.0
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-6xl font-extralight tracking-tight mb-4 text-white">
            Learn DSA <br />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-emerald)]">
              The Modern Way
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
            Master Data Structures and Algorithms through interactive lessons, visualizers, roadmaps, and an AI-powered tutor. Built for engineers who want to deeply understand, not just memorize.
          </p>
        </FadeIn>

        {/* Stats Row */}
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-1">
                <CheckCircle2 size={16} className="text-[var(--color-accent-cyan)]" /> Topics
              </div>
              <span className="text-2xl font-bold text-white">5 / 23</span>
            </div>
            <div className="w-px h-10 bg-[var(--color-border-glass)]" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-1">
                <Trophy size={16} className="text-[var(--color-accent-violet)]" /> Score
              </div>
              <span className="text-2xl font-bold text-white">1,240 XP</span>
            </div>
            <div className="w-px h-10 bg-[var(--color-border-glass)]" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-1">
                <Flame size={16} className="text-orange-500" /> Streak
              </div>
              <span className="text-2xl font-bold text-white">7 Days</span>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Right Content: Floating Interactive Visuals */}
      <div className="relative z-10 w-full md:w-1/2 h-64 md:h-80 hidden md:flex items-center justify-center">
        
        {/* Central Hub */}
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 w-24 h-24 rounded-2xl bg-gradient-to-tr from-[var(--color-accent-indigo)] to-[var(--color-accent-violet)] shadow-[0_0_40px_rgba(79,70,229,0.4)] flex items-center justify-center border border-white/20 backdrop-blur-md"
        >
          <Binary size={40} className="text-white drop-shadow-md" />
        </motion.div>

        {/* Floating Node 1 (Graphs) */}
        <motion.div 
          animate={{ y: [0, 15, 0], x: [0, -5, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute z-10 top-4 right-12 w-16 h-16 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border-glass)] flex items-center justify-center shadow-lg"
        >
          <Network size={24} className="text-[var(--color-accent-blue)]" />
        </motion.div>

        {/* Floating Node 2 (Arrays/Data) */}
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute z-10 bottom-8 left-10 w-16 h-16 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-glass)] flex items-center justify-center shadow-lg"
        >
          <Database size={24} className="text-[var(--color-accent-emerald)]" />
        </motion.div>

        {/* Floating Node 3 (Stack/Layers) */}
        <motion.div 
          animate={{ y: [0, 10, 0], x: [0, 10, 0] }} 
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute z-10 top-1/2 left-0 w-12 h-12 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border-glass)] flex items-center justify-center shadow-lg"
        >
          <Layers size={20} className="text-pink-400" />
        </motion.div>

        {/* Connecting Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M 50% 50% L 80% 25%" 
            stroke="var(--color-accent-indigo)" 
            strokeWidth="2" 
            strokeDasharray="4 4"
            fill="none" 
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            d="M 50% 50% L 20% 80%" 
            stroke="var(--color-accent-cyan)" 
            strokeWidth="2" 
            strokeDasharray="4 4"
            fill="none" 
          />
        </svg>

      </div>
    </div>
  );
}
