"use client";

import { motion } from "framer-motion";
import { Clock, HardDrive } from "lucide-react";

interface ComplexityVisualizerProps {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

export function ComplexityVisualizer({ timeComplexity, spaceComplexity, explanation }: ComplexityVisualizerProps) {
  
  const getComplexityColor = (complexity: string) => {
    if (complexity.includes("1") || complexity.includes("log")) return "text-green-400 bg-green-500/10 border-green-500/30";
    if (complexity.includes("n") && !complexity.includes("^2")) return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
    return "text-red-400 bg-red-500/10 border-red-500/30";
  };

  const getWidth = (complexity: string) => {
    if (complexity.includes("1")) return "w-[10%]";
    if (complexity.includes("log n")) return "w-[30%]";
    if (complexity.includes("n log n")) return "w-[60%]";
    if (complexity.includes("n")) return "w-[50%]";
    if (complexity.includes("n^2") || complexity.includes("n²")) return "w-[90%]";
    if (complexity.includes("2^n")) return "w-[100%]";
    return "w-[50%]";
  };

  return (
    <div className="bg-[#121214] border border-gray-800 rounded-2xl p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-indigo)] rounded-full blur-[100px] opacity-[0.03] pointer-events-none" />
      
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        Complexity Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Time Complexity */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <Clock size={16} /> Time Complexity
          </div>
          <div className={`px-4 py-3 rounded-xl border font-mono text-lg font-bold flex items-center justify-between ${getComplexityColor(timeComplexity)}`}>
            <span>O({timeComplexity})</span>
            <div className="w-1/2 h-1.5 bg-black/40 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: getWidth(timeComplexity).replace('w-[', '').replace(']', '') }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${timeComplexity.includes("1") || timeComplexity.includes("log") ? "bg-green-400" : timeComplexity.includes("n") && !timeComplexity.includes("^2") ? "bg-yellow-400" : "bg-red-400"}`}
              />
            </div>
          </div>
        </div>

        {/* Space Complexity */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <HardDrive size={16} /> Space Complexity
          </div>
          <div className={`px-4 py-3 rounded-xl border font-mono text-lg font-bold flex items-center justify-between ${getComplexityColor(spaceComplexity)}`}>
            <span>O({spaceComplexity})</span>
            <div className="w-1/2 h-1.5 bg-black/40 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: getWidth(spaceComplexity).replace('w-[', '').replace(']', '') }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${spaceComplexity.includes("1") || spaceComplexity.includes("log") ? "bg-green-400" : spaceComplexity.includes("n") && !spaceComplexity.includes("^2") ? "bg-yellow-400" : "bg-red-400"}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-300 text-sm leading-relaxed">
        <p><strong className="text-white">Why?</strong> {explanation}</p>
      </div>
    </div>
  );
}
