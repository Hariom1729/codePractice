"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export function SortingVisualizer() {
  const initialArray = [40, 20, 60, 10, 50, 30, 80, 70];
  const [array, setArray] = useState(initialArray);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  // Simple mock of Bubble Sort animation
  const handlePlay = () => {
    setIsPlaying(true);
    let tempArray = [...array];
    let i = 0;
    let j = 0;
    
    const interval = setInterval(() => {
      if (i >= tempArray.length - 1) {
        clearInterval(interval);
        setIsPlaying(false);
        setActiveIndices([]);
        setSortedIndices(tempArray.map((_, idx) => idx));
        return;
      }

      setActiveIndices([j, j + 1]);

      if (tempArray[j] > tempArray[j + 1]) {
        // Swap
        let temp = tempArray[j];
        tempArray[j] = tempArray[j + 1];
        tempArray[j + 1] = temp;
        setArray([...tempArray]);
      }

      j++;
      if (j >= tempArray.length - i - 1) {
        setSortedIndices(prev => [...prev, tempArray.length - i - 1]);
        j = 0;
        i++;
      }
    }, 600);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setArray(initialArray);
    setActiveIndices([]);
    setSortedIndices([]);
  };

  return (
    <div className="flex flex-col bg-[#050816] rounded-xl border border-[var(--color-border-glass)] overflow-hidden w-full">
      <div className="flex items-center justify-between p-4 bg-white/[0.02] border-b border-[var(--color-border-glass)]">
        <div className="text-sm font-semibold text-gray-300">Bubble Sort Animation</div>
        <div className="flex gap-2">
          <button className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <SkipForward size={16} />
          </button>
          <button onClick={isPlaying ? handleReset : handlePlay} className="p-2 rounded bg-[var(--color-accent-violet)]/20 hover:bg-[var(--color-accent-violet)]/30 text-[var(--color-accent-violet)] transition-colors">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={handleReset} className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="p-8 h-64 flex items-end justify-center relative bg-gradient-to-br from-[#0B1020] to-transparent gap-2">
        {array.map((val, idx) => {
          const isActive = activeIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);
          
          return (
            <motion.div
              layout
              key={`${idx}-${val}`}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-8 md:w-12 rounded-t-lg border-2 flex items-start justify-center pt-2 font-mono font-bold text-xs md:text-sm ${
                isSorted ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
                isActive ? 'bg-[var(--color-accent-violet)]/20 border-[var(--color-accent-violet)] text-[var(--color-accent-violet)] shadow-[0_0_20px_rgba(139,92,246,0.4)]' :
                'bg-[var(--color-surface-elevated)] border-gray-700 text-gray-300'
              }`}
              style={{ height: `${val}%` }}
            >
              {val}
            </motion.div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-[var(--color-border-glass)] bg-black/40 text-xs font-mono text-gray-400 flex gap-4 overflow-x-auto">
        <span className="text-[var(--color-accent-violet)]">Time Complexity: O(N²)</span>
        <span className="text-gray-500">Space Complexity: O(1)</span>
      </div>
    </div>
  );
}
