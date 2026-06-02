"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, ShieldAlert } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
  icon: 'trophy' | 'star' | 'shield';
}

export function AchievementPopup() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // For demo purposes, we will trigger an achievement shortly after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAchievements(prev => [...prev, {
        id: 'first_lesson',
        title: 'First Lesson Started',
        description: 'You took the first step in your DSA journey.',
        xp: 50,
        icon: 'star'
      }]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const removeAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            onAnimationComplete={() => {
              setTimeout(() => removeAchievement(achievement.id), 4000);
            }}
            className="pointer-events-auto bg-[#0a0f1c] border border-[var(--color-accent-emerald)]/30 rounded-xl p-4 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex items-center gap-4 w-80 relative overflow-hidden group cursor-pointer"
            onClick={() => removeAchievement(achievement.id)}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
            
            {/* Animated background glow */}
            <div className="absolute -left-1/2 top-1/2 -translate-y-1/2 w-full h-full bg-[var(--color-accent-emerald)]/20 blur-2xl rounded-full" />

            <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--color-accent-emerald)]/20 border border-[var(--color-accent-emerald)]/50 flex items-center justify-center text-[var(--color-accent-emerald)] shrink-0">
              {achievement.icon === 'trophy' ? <Trophy size={20} /> :
               achievement.icon === 'star' ? <Star size={20} className="fill-[var(--color-accent-emerald)]" /> :
               <ShieldAlert size={20} />}
            </div>

            <div className="relative z-10 flex-grow">
              <h4 className="text-white font-bold text-sm tracking-tight">{achievement.title}</h4>
              <p className="text-gray-400 text-xs mt-0.5 leading-tight">{achievement.description}</p>
            </div>

            <div className="relative z-10 text-right shrink-0">
              <div className="text-[var(--color-accent-emerald)] font-black text-sm">+{achievement.xp}</div>
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">XP</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
