"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoCard";
import { Activity, Code2, Sparkles, Terminal } from "lucide-react";

export function HeroMockup() {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-20">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-accent-indigo)]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[var(--color-accent-cyan)]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main mockup window */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative z-10 w-full rounded-2xl border border-[var(--color-border-glass)] bg-[#0B1020]/80 backdrop-blur-xl shadow-2xl overflow-hidden"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(79, 70, 229, 0.1)",
        }}
      >
        {/* Fake Mac Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border-glass)] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="mx-auto flex items-center gap-2 text-xs text-gray-500 font-mono">
            <Terminal size={12} />
            <span>codepractice.ai / workspace</span>
          </div>
        </div>

        {/* Mockup Body */}
        <div className="p-6 grid grid-cols-3 gap-6 opacity-60">
          <div className="col-span-1 space-y-4">
            <div className="h-4 w-1/3 bg-gray-800 rounded" />
            <div className="h-32 w-full bg-gray-800/50 rounded-lg" />
            <div className="h-4 w-1/2 bg-gray-800 rounded" />
            <div className="h-20 w-full bg-[var(--color-accent-indigo)]/10 border border-[var(--color-accent-indigo)]/20 rounded-lg flex items-center justify-center">
              <Sparkles className="text-[var(--color-accent-indigo)]" size={24} />
            </div>
          </div>
          <div className="col-span-2 space-y-4">
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-24 bg-gray-800 rounded-full" />
              <div className="h-6 w-24 bg-gray-800 rounded-full" />
            </div>
            <div className="h-64 w-full bg-[#050816] rounded-lg border border-gray-800 p-4 font-mono text-sm text-gray-400">
              <p><span className="text-purple-400">function</span> <span className="text-blue-400">twoSum</span>(nums, target) {'{'}</p>
              <p className="ml-4"><span className="text-purple-400">const</span> map = <span className="text-purple-400">new</span> Map();</p>
              <p className="ml-4"><span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> i = <span className="text-orange-400">0</span>; i &lt; nums.length; i++) {'{'}</p>
              <p className="ml-8"><span className="text-purple-400">const</span> diff = target - nums[i];</p>
              <p className="ml-8"><span className="text-purple-400">if</span> (map.has(diff)) {'{'}</p>
              <p className="ml-12"><span className="text-purple-400">return</span> [map.get(diff), i];</p>
              <p className="ml-8">{'}'}</p>
              <p className="ml-8">map.set(nums[i], i);</p>
              <p className="ml-4">{'}'}</p>
              <p>{'}'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-12 top-20 z-20"
      >
        <BentoCard className="p-4 flex items-center gap-4 bg-[#0B1020]/90">
          <div className="p-2 bg-green-500/20 text-green-400 rounded-full">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Current Streak</p>
            <p className="text-xl font-bold text-white">14 Days</p>
          </div>
        </BentoCard>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-8 bottom-20 z-20"
      >
        <BentoCard className="p-4 flex items-center gap-4 bg-[#0B1020]/90 border-[var(--color-accent-cyan)]/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div className="p-2 bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] rounded-full">
            <Code2 size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Problems Solved</p>
            <p className="text-xl font-bold text-white">342</p>
          </div>
        </BentoCard>
      </motion.div>
    </div>
  );
}
