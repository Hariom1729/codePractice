"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export function ArrayVisualizer() {
  const [array, setArray] = useState([10, 24, 45, 12, 8, 33, 19]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock animation step
  const handlePlay = () => {
    setIsPlaying(true);
    let curr = 0;
    const interval = setInterval(() => {
      if (curr >= array.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setActiveIndex(null);
        setTargetIndex(null);
        return;
      }
      setActiveIndex(curr);
      if (array[curr] === 45) {
        setTargetIndex(curr);
      }
      curr++;
    }, 800);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveIndex(null);
    setTargetIndex(null);
  };

  return (
    <div className="flex flex-col bg-[#050816] rounded-xl border border-[var(--color-border-glass)] overflow-hidden w-full">
      {/* Visualizer Header Controls */}
      <div className="flex items-center justify-between p-4 bg-white/[0.02] border-b border-[var(--color-border-glass)]">
        <div className="text-sm font-semibold text-gray-300">Linear Search Animation</div>
        <div className="flex gap-2">
          <button className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <SkipForward size={16} />
          </button>
          <button onClick={isPlaying ? handleReset : handlePlay} className="p-2 rounded bg-[var(--color-accent-blue)]/20 hover:bg-[var(--color-accent-blue)]/30 text-[var(--color-accent-blue)] transition-colors">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={handleReset} className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Animation Canvas */}
      <div className="p-8 md:p-12 h-64 flex items-center justify-center relative bg-gradient-to-br from-[#0B1020] to-transparent">
        <div className="flex gap-4">
          <AnimatePresence>
            {array.map((val, idx) => {
              const isActive = activeIndex === idx;
              const isTarget = targetIndex === idx;
              
              return (
                <motion.div
                  key={`${idx}-${val}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: isActive ? -10 : 0,
                    scale: isTarget ? 1.1 : 1
                  }}
                  className={`w-12 h-12 md:w-16 md:h-16 flex flex-col items-center justify-center rounded-lg border-2 font-mono font-bold text-lg md:text-xl transition-colors duration-300 ${
                    isTarget ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]' :
                    isActive ? 'bg-[var(--color-accent-blue)]/20 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] shadow-[0_0_20px_rgba(59,130,246,0.4)]' :
                    'bg-[var(--color-surface-elevated)] border-gray-700 text-gray-300'
                  }`}
                >
                  {val}
                  <span className="absolute -bottom-6 text-xs text-gray-500 font-mono">{idx}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Logs/Status */}
      <div className="p-4 border-t border-[var(--color-border-glass)] bg-black/40 text-xs font-mono text-gray-400 flex gap-4 overflow-x-auto">
        <span className="text-[var(--color-accent-blue)]">❯ let i = {activeIndex !== null ? activeIndex : 0};</span>
        {activeIndex !== null && (
          <span className={targetIndex !== null ? 'text-green-400' : 'text-gray-400'}>
            array[{activeIndex}] === 45 ? {targetIndex !== null ? 'true (Found!)' : 'false'}
          </span>
        )}
      </div>
    </div>
  );
}
