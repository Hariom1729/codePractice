"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface LevelRingProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  size?: number;
}

export function LevelRing({ level, xp, nextLevelXp, size = 120 }: LevelRingProps) {
  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(xp / nextLevelXp, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-800"
        />
        {/* Progress ring */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          className="text-fuchsia-500"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">Level</span>
        <span className="text-white font-black leading-none flex items-center gap-1" style={{ fontSize: size * 0.25 }}>
          {level}
        </span>
        <div className="flex items-center gap-0.5 mt-1 text-fuchsia-400">
          <Zap size={size * 0.12} className="fill-current" />
          <span className="font-mono font-bold leading-none" style={{ fontSize: size * 0.1 }}>
            {xp} / {nextLevelXp}
          </span>
        </div>
      </div>
    </div>
  );
}
