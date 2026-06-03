"use client";

import { Download, FileText, CheckCircle2 } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";

interface RevisionSheetProps {
  topic: string;
  definitions: { term: string; definition: string }[];
  complexities: { operation: string; time: string; space: string }[];
  patterns: string[];
  tips: string[];
}

export function RevisionSheet({ topic, definitions, complexities, patterns, tips }: RevisionSheetProps) {
  
  const handleDownload = () => {
    // In a real implementation, this could trigger a PDF download or print window
    window.print();
  };

  return (
    <BentoCard className="bg-[var(--color-surface-obsidian)] border border-[var(--color-border-glass)] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 z-10">
        <button 
          onClick={handleDownload}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Download size={16} /> <span className="hidden sm:inline">Export PDF</span>
        </button>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[var(--color-accent-indigo)]/20 rounded-xl border border-[var(--color-accent-indigo)]/30">
          <FileText size={24} className="text-[var(--color-accent-indigo)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">{topic} Revision Sheet</h2>
          <p className="text-gray-400 text-sm">One-page summary for quick interview prep</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Concepts */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-accent-cyan)] uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
            Core Concepts
          </h3>
          <ul className="space-y-3">
            {definitions.map((def, i) => (
              <li key={i} className="text-sm">
                <strong className="text-gray-200">{def.term}:</strong> <span className="text-gray-400">{def.definition}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Complexity Matrix */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-accent-indigo)] uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
            Complexity Matrix
          </h3>
          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121214] border-b border-gray-800 text-gray-400">
                <tr>
                  <th className="p-2 font-medium">Operation</th>
                  <th className="p-2 font-medium">Time</th>
                  <th className="p-2 font-medium">Space</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {complexities.map((comp, i) => (
                  <tr key={i} className="text-gray-300">
                    <td className="p-2">{comp.operation}</td>
                    <td className="p-2 font-mono text-xs">O({comp.time})</td>
                    <td className="p-2 font-mono text-xs">O({comp.space})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Patterns */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-accent-emerald)] uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
            Key Patterns
          </h3>
          <div className="flex flex-wrap gap-2">
            {patterns.map((pattern, i) => (
              <span key={i} className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-xs font-medium">
                {pattern}
              </span>
            ))}
          </div>
        </div>

        {/* Interview Tips */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
            Interview Tips
          </h3>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-orange-400 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BentoCard>
  );
}
