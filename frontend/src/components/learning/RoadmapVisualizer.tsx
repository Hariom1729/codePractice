"use client";

import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import Link from "next/link";

interface TopicNode {
  id: string;
  title: string;
  status: "completed" | "current" | "locked";
  x: number;
  y: number;
}

const beginnerRoadmap: TopicNode[] = [
  { id: "arrays", title: "Arrays", status: "completed", x: 50, y: 10 },
  { id: "strings", title: "Strings", status: "completed", x: 50, y: 30 },
  { id: "linked-lists", title: "Linked Lists", status: "completed", x: 50, y: 50 },
  { id: "stacks", title: "Stacks", status: "current", x: 30, y: 70 },
  { id: "queues", title: "Queues", status: "locked", x: 70, y: 70 },
];

export function RoadmapVisualizer() {
  return (
    <div className="relative w-full h-[600px] bg-[var(--color-surface-obsidian)] rounded-2xl border border-[var(--color-border-glass)] overflow-hidden p-6 flex flex-col">
      <div className="flex justify-between items-center z-10 relative">
        <h3 className="text-xl font-bold tracking-tight text-white">Beginner Fundamentals</h3>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Completed</span>
          <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-blue)]"></div> In Progress</span>
          <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div> Locked</span>
        </div>
      </div>

      <div className="flex-grow relative w-full h-full mt-4">
        {/* Draw connections first so they sit behind nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Example connections (hardcoded for this specific map) */}
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0 }} d="M 50% 10% L 50% 30%" stroke="#22c55e" strokeWidth="2" fill="none" />
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} d="M 50% 30% L 50% 50%" stroke="#22c55e" strokeWidth="2" fill="none" />
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} d="M 50% 50% L 30% 70%" stroke="var(--color-accent-blue)" strokeWidth="2" fill="none" />
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} d="M 50% 50% L 70% 70%" stroke="#4b5563" strokeWidth="2" fill="none" strokeDasharray="5 5" />
        </svg>

        {/* Draw Nodes */}
        {beginnerRoadmap.map((node, i) => {
          const isCompleted = node.status === "completed";
          const isCurrent = node.status === "current";
          const isLocked = node.status === "locked";

          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <Link href={isLocked ? '#' : `/learning/${node.id}`}>
                <div 
                  className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                    isCompleted ? "bg-green-500/20 border-green-500 text-green-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]" :
                    isCurrent ? "bg-[var(--color-accent-blue)]/20 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]" :
                    "bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed"
                  } backdrop-blur-md z-10 relative`}
                >
                  {isCompleted && <Check size={24} />}
                  {isCurrent && <div className="w-3 h-3 rounded-full bg-[var(--color-accent-blue)] animate-pulse" />}
                  {isLocked && <Lock size={20} />}
                  
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-xl border border-[var(--color-accent-blue)] animate-ping opacity-50 pointer-events-none" />
                  )}
                </div>
              </Link>
              <span className={`text-sm font-bold tracking-tight ${isLocked ? 'text-gray-500' : 'text-white'}`}>
                {node.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
