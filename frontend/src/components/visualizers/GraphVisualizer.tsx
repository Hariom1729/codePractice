"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export function GraphVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [queue, setQueue] = useState<number[]>([]);

  // Nodes for the graph
  const nodes = [
    { id: 0, x: 50, y: 15 },
    { id: 1, x: 30, y: 40 },
    { id: 2, x: 70, y: 40 },
    { id: 3, x: 15, y: 70 },
    { id: 4, x: 45, y: 70 },
    { id: 5, x: 85, y: 70 },
  ];

  // Adjacency list
  const edges = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 5]
  ];

  const handlePlay = () => {
    setIsPlaying(true);
    let q = [0];
    let visited: number[] = [];
    
    setQueue([...q]);
    
    const interval = setInterval(() => {
      if (q.length === 0) {
        clearInterval(interval);
        setIsPlaying(false);
        setActiveNode(null);
        return;
      }

      const curr = q.shift()!;
      setActiveNode(curr);
      visited.push(curr);
      setVisitedNodes([...visited]);

      // Find neighbors
      const neighbors = edges
        .filter(e => e[0] === curr || e[1] === curr)
        .map(e => e[0] === curr ? e[1] : e[0]);

      for (let n of neighbors) {
        if (!visited.includes(n) && !q.includes(n)) {
          q.push(n);
        }
      }
      
      setQueue([...q]);
    }, 1000);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveNode(null);
    setVisitedNodes([]);
    setQueue([]);
  };

  return (
    <div className="flex flex-col bg-[#050816] rounded-xl border border-[var(--color-border-glass)] overflow-hidden w-full">
      <div className="flex items-center justify-between p-4 bg-white/[0.02] border-b border-[var(--color-border-glass)]">
        <div className="text-sm font-semibold text-gray-300">BFS Traversal Animation</div>
        <div className="flex gap-2">
          <button className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <SkipForward size={16} />
          </button>
          <button onClick={isPlaying ? handleReset : handlePlay} className="p-2 rounded bg-[var(--color-accent-cyan)]/20 hover:bg-[var(--color-accent-cyan)]/30 text-[var(--color-accent-cyan)] transition-colors">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={handleReset} className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="p-8 h-80 relative bg-gradient-to-br from-[#0B1020] to-transparent">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((e, idx) => {
            const n1 = nodes[e[0]];
            const n2 = nodes[e[1]];
            const isVisitedEdge = visitedNodes.includes(e[0]) && visitedNodes.includes(e[1]);
            return (
              <motion.line
                key={idx}
                x1={`${n1.x}%`} y1={`${n1.y}%`}
                x2={`${n2.x}%`} y2={`${n2.y}%`}
                stroke={isVisitedEdge ? "var(--color-accent-cyan)" : "#374151"}
                strokeWidth={isVisitedEdge ? 3 : 2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const isVisited = visitedNodes.includes(node.id);
          const isActive = activeNode === node.id;
          const isQueued = queue.includes(node.id);

          return (
            <motion.div
              key={node.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                isActive ? 'bg-[var(--color-accent-cyan)]/20 border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110 z-20' :
                isVisited ? 'bg-green-500/20 border-green-500 text-green-400 z-10' :
                isQueued ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400 z-10' :
                'bg-[var(--color-surface-elevated)] border-gray-700 text-gray-300 z-10'
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {node.id}
              {isActive && (
                <div className="absolute inset-0 rounded-full border border-[var(--color-accent-cyan)] animate-ping opacity-50" />
              )}
            </motion.div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-[var(--color-border-glass)] bg-black/40 text-xs font-mono flex flex-col gap-2 overflow-x-auto">
        <div className="text-gray-400 flex gap-2">
          <span className="text-[var(--color-accent-cyan)]">Queue:</span> 
          <span>[{queue.join(', ')}]</span>
        </div>
        <div className="text-gray-400 flex gap-2">
          <span className="text-green-400">Visited:</span> 
          <span>[{visitedNodes.join(', ')}]</span>
        </div>
      </div>
    </div>
  );
}
