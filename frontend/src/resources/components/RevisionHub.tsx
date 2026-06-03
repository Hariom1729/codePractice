"use client";

import { motion } from "framer-motion";
import { Check, Download, Zap, XCircle, FileText, Code2, AlertTriangle, Lightbulb } from "lucide-react";
import { RevisionHubData } from "../content/types";

export function RevisionHub({ data }: { data: RevisionHubData }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="w-full max-w-5xl mx-auto space-y-12 pb-24 print:space-y-6 print:text-black print:pb-0">
      
      {/* HEADER / DOWNLOAD BUTTON */}
      <div className="flex items-center justify-between border-b border-[var(--color-border-glass)] pb-6 print:hidden">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Final Revision Hub
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Review this entire topic in 5 minutes before your interview.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors border border-white/10"
        >
          <Download size={18} />
          <span>Save as PDF</span>
        </button>
      </div>

      <div className="hidden print:block mb-8 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-black">Final Revision Cheat Sheet</h1>
      </div>

      {/* PART 1: TOPIC SUMMARY */}
      <section className="print:break-inside-avoid">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-violet-400 print:text-black">
          <FileText size={20} /> Topic Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--color-surface-elevated)] p-6 rounded-2xl border border-[var(--color-border-glass)] print:bg-white print:border-gray-300">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4 print:text-gray-600">Definition</h3>
            <ul className="space-y-3">
              {data.topicSummary.definition.map((def, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-emerald-400 mt-1 flex-shrink-0 print:text-black" />
                  <span className="text-gray-300 print:text-gray-800">{def}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[var(--color-surface-elevated)] p-6 rounded-2xl border border-[var(--color-border-glass)] print:bg-white print:border-gray-300">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4 print:text-gray-600">Why Important</h3>
            <ul className="space-y-3">
              {data.topicSummary.whyImportant.map((why, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Zap size={16} className="text-amber-400 mt-1 flex-shrink-0 print:text-black" />
                  <span className="text-gray-300 print:text-gray-800">{why}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PART 2: KEY CONCEPTS */}
      <section className="print:break-inside-avoid">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400 print:text-black">
          <Lightbulb size={20} /> Key Concepts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.keyConcepts.map((concept, i) => (
            <div key={i} className="bg-[var(--color-surface-elevated)]/50 p-5 rounded-2xl border border-[var(--color-border-glass)] print:bg-white print:border-gray-300">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2 print:text-black">
                {concept.icon && <span>{concept.icon}</span>} {concept.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed print:text-gray-700">{concept.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PART 3: OPERATIONS TABLE */}
      <section className="print:break-inside-avoid">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-400 print:text-black">
          <Code2 size={20} /> Complexity Matrix
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-glass)] print:border-gray-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-surface-elevated)] print:bg-gray-100">
                <th className="p-4 text-sm font-semibold text-gray-300 print:text-black border-b border-[var(--color-border-glass)] print:border-gray-300">Operation</th>
                <th className="p-4 text-sm font-semibold text-gray-300 print:text-black border-b border-[var(--color-border-glass)] print:border-gray-300">Complexity</th>
                <th className="p-4 text-sm font-semibold text-gray-300 print:text-black border-b border-[var(--color-border-glass)] print:border-gray-300">Note</th>
              </tr>
            </thead>
            <tbody>
              {data.operationsTable.map((op, i) => (
                <tr key={i} className="border-b border-[var(--color-border-glass)]/50 last:border-0 print:border-gray-200">
                  <td className="p-4 text-white font-medium print:text-black">{op.operation}</td>
                  <td className="p-4 font-mono text-emerald-400 print:text-black font-bold">{op.complexity}</td>
                  <td className="p-4 text-sm text-gray-400 print:text-gray-600">{op.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PART 5: PATTERN SUMMARY */}
      <section className="print:break-inside-avoid">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-400 print:text-black">
          <FileText size={20} /> Algorithm Patterns
        </h2>
        <div className="space-y-6">
          {data.patternSummary.map((cat, i) => (
            <div key={i}>
              <h3 className="text-lg font-bold text-gray-300 mb-3 print:text-black">{cat.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.patterns.map((pat, j) => (
                  <div key={j} className="bg-[var(--color-surface-elevated)] p-4 rounded-xl border border-[var(--color-border-glass)] print:bg-white print:border-gray-300">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white print:text-black">{pat.name}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/10 text-gray-300 print:border print:border-gray-300 print:text-black">{pat.difficulty}</span>
                    </div>
                    <p className="text-sm font-semibold text-cyan-400 mb-1 print:text-gray-800">Use when: {pat.whenToUse}</p>
                    <p className="text-xs text-gray-400 print:text-gray-600">{pat.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PART 6: COMMON INTERVIEW QUESTIONS */}
      <section className="print:break-inside-avoid">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400 print:text-black">
          <Code2 size={20} /> Top Interview Questions
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-glass)] print:border-gray-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-surface-elevated)] print:bg-gray-100">
                <th className="p-4 text-sm font-semibold text-gray-300 print:text-black border-b border-[var(--color-border-glass)] print:border-gray-300">Question</th>
                <th className="p-4 text-sm font-semibold text-gray-300 print:text-black border-b border-[var(--color-border-glass)] print:border-gray-300">Pattern Used</th>
                <th className="p-4 text-sm font-semibold text-gray-300 print:text-black border-b border-[var(--color-border-glass)] print:border-gray-300">Frequency</th>
                <th className="p-4 text-sm font-semibold text-gray-300 print:text-black border-b border-[var(--color-border-glass)] print:border-gray-300">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {data.commonQuestions.map((q, i) => (
                <tr key={i} className="border-b border-[var(--color-border-glass)]/50 last:border-0 print:border-gray-200">
                  <td className="p-4 text-white font-medium print:text-black">{q.title}</td>
                  <td className="p-4 text-sm text-cyan-400 print:text-gray-800">{q.patternUsed}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      q.frequency === 'High' ? 'bg-red-500/20 text-red-400' :
                      q.frequency === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    } print:bg-transparent print:border print:border-gray-300 print:text-black`}>
                      {q.frequency}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 print:text-gray-600">{q.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PART 4: METHODS CHEAT SHEET */}
      <section className="print:break-inside-avoid">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-fuchsia-400 print:text-black">
          <Code2 size={20} /> Methods Cheat Sheet
        </h2>
        <div className="space-y-6">
          {data.methodsCheatSheet.map((cat, i) => (
            <div key={i} className="rounded-xl border border-[var(--color-border-glass)] overflow-hidden print:border-gray-300">
              <div className="bg-[var(--color-surface-elevated)] p-3 border-b border-[var(--color-border-glass)] print:bg-gray-100 print:border-gray-300">
                <h3 className="font-bold text-white print:text-black">{cat.category}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {cat.methods.map((m, j) => (
                      <tr key={j} className="border-b border-[var(--color-border-glass)]/50 last:border-0 print:border-gray-200">
                        <td className="p-3 font-mono text-sm text-fuchsia-400 print:text-black whitespace-nowrap">{m.method}</td>
                        <td className="p-3 text-sm text-gray-300 print:text-gray-700">{m.purpose}</td>
                        <td className="p-3 font-mono text-sm text-emerald-400 print:text-black whitespace-nowrap">{m.complexity}</td>
                        <td className="p-3 font-mono text-xs text-gray-500 print:text-gray-600 bg-black/20 print:bg-transparent rounded m-1 inline-block">{m.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PART 7: COMMON MISTAKES */}
      <section className="print:break-inside-avoid">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400 print:text-black">
          <AlertTriangle size={20} /> Common Mistakes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.commonMistakes.map((mistake, i) => (
            <div key={i} className="flex gap-4 bg-red-500/10 border border-red-500/20 p-5 rounded-xl print:bg-white print:border-red-300">
              <XCircle className="text-red-400 flex-shrink-0 mt-0.5 print:text-red-600" size={20} />
              <div>
                <h3 className="font-bold text-red-200 print:text-red-800 mb-1">{mistake.title}</h3>
                <p className="text-sm text-red-200/70 print:text-red-900/80">{mistake.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PART 8: INTERVIEW CRASH NOTES */}
      <section className="print:break-inside-avoid">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400 print:text-black">
          <Zap size={20} /> 60-Second Crash Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.interviewCrashNotes.map((cat, i) => (
            <div key={i} className="bg-[var(--color-surface-elevated)] p-6 rounded-2xl border border-[var(--color-border-glass)] print:bg-white print:border-gray-300">
              <h3 className="text-lg font-bold text-white mb-4 print:text-black">{cat.category}</h3>
              <ul className="space-y-2">
                {cat.notes.map((note, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-yellow-400 mt-1 flex-shrink-0 print:text-black" />
                    <span className="text-gray-300 print:text-gray-800 font-medium">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </motion.div>
  );
}
