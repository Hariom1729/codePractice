"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Lightbulb,
  AlertTriangle,
  Info,
  Zap,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Code2,
} from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { ComplexityTable } from "./ComplexityTable";
import { MemoryDiagram } from "./MemoryDiagram";
import { PatternCard } from "./PatternCard";
import { ArrayVisualizer } from "./ArrayVisualizer";
import {
  StoryCard,
  GlowCard,
  AnalogyView,
  FeatureGrid,
  MistakeCards,
  RecruiterCard,
  Takeaways,
} from "./VisualBlocks";
import { RevisionHub } from "./RevisionHub";

// --------------- Helper types ---------------

interface CalloutData {
  type: "tip" | "warning" | "note" | "important";
  title: string;
  body: string;
}

interface CodeExampleData {
  language: string;
  code: string;
  title?: string;
  explanation?: string;
}

interface QuizQuestionData {
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation: string;
}

interface PracticeItemData {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  description: string;
  hint?: string;
  approach?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

interface MethodData {
  name: string;
  syntax: string;
  description: string;
  params?: string;
  returns?: string;
  complexity?: string;
  example?: string;
}

interface TableData {
  headers: string[];
  rows: string[][];
}

// --------------- Callout component ---------------

const CALLOUT_STYLES = {
  tip: {
    border: "border-l-[var(--color-accent-emerald)]",
    bg: "bg-[var(--color-accent-emerald)]/5",
    border2: "border-[var(--color-accent-emerald)]/20",
    titleColor: "text-[var(--color-accent-emerald)]",
    Icon: Lightbulb,
  },
  warning: {
    border: "border-l-red-500",
    bg: "bg-red-500/5",
    border2: "border-red-500/20",
    titleColor: "text-red-400",
    Icon: AlertTriangle,
  },
  note: {
    border: "border-l-[var(--color-accent-cyan)]",
    bg: "bg-[var(--color-accent-cyan)]/5",
    border2: "border-[var(--color-accent-cyan)]/20",
    titleColor: "text-[var(--color-accent-cyan)]",
    Icon: Info,
  },
  important: {
    border: "border-l-[var(--color-accent-violet)]",
    bg: "bg-[var(--color-accent-violet)]/5",
    border2: "border-[var(--color-accent-violet)]/20",
    titleColor: "text-[var(--color-accent-violet)]",
    Icon: Zap,
  },
};

function Callout({ data }: { data: CalloutData }) {
  const s = CALLOUT_STYLES[data.type];
  const { Icon } = s;
  return (
    <div
      className={`flex gap-3 p-4 rounded-r-xl border-l-[3px] border ${s.border} ${s.bg} ${s.border2} my-4`}
    >
      <Icon size={16} className={`${s.titleColor} mt-0.5 flex-shrink-0`} />
      <div>
        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${s.titleColor}`}>
          {data.title}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">{data.body}</p>
      </div>
    </div>
  );
}

// --------------- Quiz component ---------------

function QuizSection({ questions }: { questions: QuizQuestionData[] }) {
  const [qIndex, setQIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[qIndex];

  const handleSubmit = () => {
    if (!selectedId) return;
    const correct = selectedId === q.correctId;
    if (correct) setScore((s) => s + 1);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (qIndex + 1 >= questions.length) {
      setDone(true);
    } else {
      setQIndex((i) => i + 1);
      setSelectedId(null);
      setSubmitted(false);
    }
  };

  const handleReset = () => {
    setQIndex(0);
    setSelectedId(null);
    setSubmitted(false);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)]/60 text-center"
      >
        <p className="text-4xl mb-3">{pct >= 70 ? "🎉" : "💪"}</p>
        <h3 className="text-xl font-bold text-white mb-1">
          {score}/{questions.length} Correct
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {pct >= 70 ? "Great job! You understand this topic well." : "Keep practicing — review the material above."}
        </p>
        <div className="w-full h-2 rounded-full bg-white/[0.06] mb-5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              pct >= 70 ? "bg-[var(--color-accent-emerald)]" : "bg-[var(--color-accent-violet)]"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
        >
          <RefreshCw size={14} /> Try Again
        </button>
      </motion.div>
    );
  }

  const isCorrect = selectedId === q.correctId;

  return (
    <div className="my-6 p-5 rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)]/60">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Question {qIndex + 1} of {questions.length}
        </span>
        <span className="text-xs text-[var(--color-accent-emerald)] font-semibold">
          Score: {score}/{qIndex}
        </span>
      </div>

      {/* Question */}
      <p className="text-base font-semibold text-white mb-4 leading-relaxed">{q.question}</p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {q.options.map((opt) => {
          const isSel = selectedId === opt.id;
          let cls =
            "border-gray-800 bg-[#121214]/60 text-gray-300 hover:border-gray-600 hover:bg-white/[0.03]";
          if (isSel && !submitted)
            cls =
              "border-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo)]/10 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]";
          if (submitted && opt.id === q.correctId)
            cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
          if (submitted && isSel && !isCorrect)
            cls = "border-red-500/50 bg-red-500/10 text-red-400";
          if (submitted && !isSel && opt.id !== q.correctId)
            cls = "border-gray-800 bg-transparent text-gray-600 opacity-50";

          return (
            <button
              key={opt.id}
              onClick={() => !submitted && setSelectedId(opt.id)}
              disabled={submitted}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between text-sm ${cls}`}
            >
              <span className="font-medium">{opt.text}</span>
              {submitted && opt.id === q.correctId && (
                <CheckCircle2 size={16} className="text-emerald-400" />
              )}
              {submitted && isSel && !isCorrect && (
                <XCircle size={16} className="text-red-400" />
              )}
              {!submitted && (
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSel ? "border-[var(--color-accent-indigo)]" : "border-gray-600"
                  }`}
                >
                  {isSel && (
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-indigo)]" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`p-4 rounded-xl border mb-4 ${
              isCorrect
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                : "bg-red-500/5 border-red-500/20 text-red-300"
            }`}
          >
            <p className="font-bold text-sm mb-1">
              {isCorrect ? "✓ Correct!" : "✗ Not quite."}
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">{q.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex justify-end">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedId}
            className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold disabled:opacity-40 hover:bg-gray-100 transition-colors"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--color-accent-violet)] text-white text-sm font-bold hover:bg-[var(--color-accent-violet)]/80 transition-colors"
          >
            {qIndex + 1 >= questions.length ? "See Results" : "Next"}{" "}
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// --------------- PracticeItem component ---------------

const DIFF_STYLE: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Hard: "text-red-400 bg-red-500/10 border-red-500/20",
  Expert: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
};

function PracticeItem({ item }: { item: PracticeItemData }) {
  const [showHint, setShowHint] = useState(false);
  const [showApproach, setShowApproach] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)]/50 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
        <span
          className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
            DIFF_STYLE[item.difficulty]
          }`}
        >
          {item.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>

      {/* Complexity badges */}
      {(item.timeComplexity || item.spaceComplexity) && (
        <div className="flex items-center gap-2 flex-wrap">
          {item.timeComplexity && (
            <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/20">
              ⏱ {item.timeComplexity}
            </span>
          )}
          {item.spaceComplexity && (
            <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold bg-[var(--color-accent-violet)]/10 text-[var(--color-accent-violet)] border border-[var(--color-accent-violet)]/20">
              💾 {item.spaceComplexity}
            </span>
          )}
        </div>
      )}

      {/* Toggle buttons */}
      <div className="flex items-center gap-2">
        {item.hint && (
          <button
            onClick={() => setShowHint((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-[var(--color-accent-cyan)] hover:text-white font-semibold transition-colors"
          >
            <Eye size={12} />
            {showHint ? "Hide" : "Show"} Hint
          </button>
        )}
        {item.approach && (
          <button
            onClick={() => setShowApproach((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-[var(--color-accent-violet)] hover:text-white font-semibold transition-colors"
          >
            <Code2 size={12} />
            {showApproach ? "Hide" : "Show"} Approach
          </button>
        )}
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && item.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 rounded-lg bg-[var(--color-accent-cyan)]/5 border border-[var(--color-accent-cyan)]/20 text-sm text-gray-300 leading-relaxed">
              💡 {item.hint}
            </div>
          </motion.div>
        )}
        {showApproach && item.approach && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 rounded-lg bg-[var(--color-accent-violet)]/5 border border-[var(--color-accent-violet)]/20 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
              {item.approach}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --------------- MethodCard component ---------------

function MethodCard({ method }: { method: MethodData }) {
  return (
    <div className="rounded-xl border border-[var(--color-border-glass)] bg-[var(--color-surface-elevated)]/30 p-4">
      {/* Name + complexity */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <code className="text-sm font-mono font-bold text-[var(--color-accent-cyan)]">
          {method.name}
        </code>
        {method.complexity && (
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/20 flex-shrink-0">
            {method.complexity}
          </span>
        )}
      </div>

      {/* Syntax */}
      <div className="mb-2 px-3 py-1.5 rounded-lg bg-[#0d1117] border border-white/[0.04] overflow-x-auto">
        <code className="text-xs font-mono text-[#82aaff] whitespace-nowrap">{method.syntax}</code>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-relaxed mb-2">{method.description}</p>

      {/* Params + Returns */}
      {(method.params || method.returns) && (
        <div className="space-y-1 text-xs text-gray-400">
          {method.params && (
            <div>
              <span className="font-semibold text-gray-500">Params: </span>
              {method.params}
            </div>
          )}
          {method.returns && (
            <div>
              <span className="font-semibold text-gray-500">Returns: </span>
              {method.returns}
            </div>
          )}
        </div>
      )}

      {/* Example */}
      {method.example && (
        <div className="mt-2 px-3 py-1.5 rounded-lg bg-[#0d1117] border border-white/[0.04]">
          <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-0.5">Example</p>
          <code className="text-xs font-mono text-[#c3e88d]">{method.example}</code>
        </div>
      )}
    </div>
  );
}

// --------------- TableData component ---------------

function TableSection({ data }: { data: TableData }) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-[var(--color-border-glass)]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[var(--color-surface-elevated)]/60">
              {data.headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-[var(--color-border-glass)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr
                key={ri}
                className={`border-b border-[var(--color-border-glass)] last:border-0 hover:bg-white/[0.02] transition-colors ${
                  ri % 2 === 0 ? "bg-transparent" : "bg-[var(--color-surface-elevated)]/10"
                }`}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-gray-300 text-sm">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =============== BESPOKE INTERACTIVE VISUALIZERS ===============

function MemoryVisualizer({ type }: { type: string }) {
  const [compareState, setCompareState] = useState<'idle' | 'inserting' | 'done'>('idle');
  const [huntStep, setHuntStep] = useState(0);
  const [scatterActive, setScatterActive] = useState(false);

  if (type === 'array-vs-linked') {
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-6">
        <div>
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span>📦 Sequential Array</span>
            <span className="text-[var(--color-accent-cyan)] font-mono text-[9px]">(Contiguous)</span>
          </h5>
          <div className="flex gap-1.5 justify-center items-center h-12 bg-black/40 rounded-xl p-2 border border-white/[0.02] overflow-x-auto">
            {compareState === 'inserting' && (
              <motion.div initial={{ scale: 0, width: 0 }} animate={{ scale: 1, width: 'auto' }} className="px-3 py-1 rounded-lg bg-[var(--color-accent-violet)] text-white text-xs font-mono font-bold shadow-[0_0_8px_rgba(139,92,246,0.3)]">
                [5]
              </motion.div>
            )}
            <motion.div animate={compareState === 'inserting' ? { x: 8 } : { x: 0 }} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              [10]
            </motion.div>
            <motion.div animate={compareState === 'inserting' ? { x: 8 } : { x: 0 }} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              [20]
            </motion.div>
            <motion.div animate={compareState === 'inserting' ? { x: 8 } : { x: 0 }} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
              [30]
            </motion.div>
          </div>
          <span className="text-[10px] text-gray-500 font-mono mt-1.5 block">
            {compareState === 'inserting' 
              ? '⚠️ O(N) Shift Cost: We had to shift [10], [20], and [30] in memory to fit [5] at the front!' 
              : 'Stored side-by-side. Inserting at head forces all other elements to shift.'}
          </span>
        </div>

        <div>
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span>🔗 Linked List</span>
            <span className="text-[var(--color-accent-violet)] font-mono text-[9px]">(Scatter-Allocated)</span>
          </h5>
          <div className="flex gap-2.5 justify-center items-center h-12 bg-black/40 rounded-xl p-2 border border-white/[0.02] overflow-x-auto">
            {compareState === 'inserting' && (
              <>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-3 py-1 rounded-lg bg-[var(--color-accent-emerald)]/10 border border-[var(--color-accent-emerald)]/40 text-xs font-mono text-[var(--color-accent-emerald)] font-bold">
                  [5]
                </motion.div>
                <span className="text-[var(--color-accent-emerald)] font-bold font-mono">→</span>
              </>
            )}
            <div className="px-3 py-1 rounded-lg bg-[var(--color-accent-violet)]/10 border border-[var(--color-accent-violet)]/30 text-xs font-mono text-gray-300">
              [10]
            </div>
            <span className="text-gray-600 font-mono">→</span>
            <div className="px-3 py-1 rounded-lg bg-[var(--color-accent-violet)]/10 border border-[var(--color-accent-violet)]/30 text-xs font-mono text-gray-300">
              [20]
            </div>
          </div>
          <span className="text-[10px] text-gray-500 font-mono mt-1.5 block">
            {compareState === 'inserting' 
              ? '✅ O(1) Prepend: No shifting needed! We just wove Node [5] and pointed its next pointer to [10].' 
              : 'Pointers link nodes scattered anywhere in memory.'}
          </span>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={() => setCompareState(compareState === 'idle' ? 'inserting' : 'idle')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-white transition-all shadow-md"
          >
            <RefreshCw size={12} className={compareState === 'inserting' ? 'animate-spin' : ''} />
            {compareState === 'inserting' ? 'Reset Visualization' : 'Simulate Prepend Insertion'}
          </button>
        </div>
      </div>
    );
  }

  if (type === 'memory-scatter') {
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <p className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
          <span>🧠 Heap Allocation Map</span>
        </p>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => {
            const addr = 1000 + i * 256;
            const isNode = i === 1 || i === 4 || i === 6;
            const active = scatterActive && isNode;
            return (
              <div
                key={i}
                className={`p-2.5 rounded-xl border font-mono text-[10px] text-center transition-all duration-300 ${
                  active
                    ? 'bg-[var(--color-accent-violet)]/20 border-[var(--color-accent-violet)] text-white shadow-[0_0_12px_rgba(139,92,246,0.35)]'
                    : isNode
                    ? 'bg-[var(--color-accent-violet)]/5 border-[var(--color-accent-violet)]/20 text-[var(--color-accent-violet)]/80'
                    : 'bg-white/[0.01] border-white/[0.03] text-gray-700'
                }`}
              >
                <div className="opacity-60">{addr}</div>
                {isNode && <div className="text-[9px] text-gray-400 font-bold mt-1">{i === 1 ? 'Node A' : i === 4 ? 'Node B' : 'Node C'}</div>}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] text-gray-500 font-mono">
            {scatterActive ? 'A (1256) points to B (2024), which points to C (2536).' : 'Nodes are scattered in heap memory.'}
          </span>
          <button
            onClick={() => setScatterActive(!scatterActive)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-bold text-white transition-colors"
          >
            {scatterActive ? <EyeOff size={10} /> : <Eye size={10} />}
            <span>{scatterActive ? 'Hide Address Links' : 'Trace Heap Pointers'}</span>
          </button>
        </div>
      </div>
    );
  }

  if (type === 'scavenger-hunt') {
    const clues = [
      { addr: '0x01A2', text: 'Head node. Start here. Next clue is hidden at address 0x05F4.', label: 'Head Clue' },
      { addr: '0x05F4', text: 'Bridge node. You follow the chain. Next is at address 0x03B8.', label: 'Bridge Clue' },
      { addr: '0x03B8', text: 'Success! You reached the final treasure chest 🪙', label: 'Treasure Node' },
    ];
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Scavenger Hunt Address Chain</p>
        <div className="flex flex-col gap-3">
          {clues.map((clue, idx) => {
            const visible = huntStep >= idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0.1 }}
                className={`p-3.5 rounded-xl border transition-all ${
                  visible
                    ? idx === 2
                      ? 'bg-[var(--color-accent-emerald)]/10 border-[var(--color-accent-emerald)]/40 text-[var(--color-accent-emerald)] shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                      : 'bg-white/5 border-white/10 text-white'
                    : 'bg-white/[0.01] border-white/[0.03] text-gray-700'
                }`}
              >
                <div className="flex justify-between text-[9px] font-mono text-gray-500 mb-1">
                  <span>RAM Addr: {clue.addr}</span>
                  <span className="font-bold">{clue.label}</span>
                </div>
                <p className="text-xs leading-normal">{visible ? clue.text : '?? Address Unvisited ??'}</p>
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {huntStep < 2 ? (
            <button
              onClick={() => setHuntStep(huntStep + 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/30 hover:bg-[var(--color-accent-cyan)]/30 text-xs font-bold transition-all"
            >
              <span>Follow Address Clue</span>
              <ChevronRight size={12} />
            </button>
          ) : (
            <button
              onClick={() => setHuntStep(0)}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-white transition-all"
            >
              Restart Hunt
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}

function ListDiagramVisualizer({ type }: { type: string }) {
  const [stepIdx, setStepIdx] = useState(0);

  if (type === 'node-anatomy') {
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] flex flex-col items-center justify-center gap-4">
        <div className="flex border-2 border-[var(--color-accent-cyan)] rounded-2xl overflow-hidden font-mono text-sm shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-black/50">
          <div
            onMouseEnter={() => setStepIdx(1)}
            className={`px-6 py-4 transition-colors cursor-help flex flex-col items-center justify-center border-r-2 border-[var(--color-accent-cyan)] ${
              stepIdx === 1 ? 'bg-[var(--color-accent-cyan)]/10 text-white' : 'bg-transparent text-gray-300'
            }`}
          >
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">data</span>
            <span className="text-lg font-black">42</span>
          </div>
          <div
            onMouseEnter={() => setStepIdx(2)}
            className={`px-6 py-4 transition-colors cursor-help flex flex-col items-center justify-center ${
              stepIdx === 2 ? 'bg-[var(--color-accent-violet)]/10 text-white' : 'bg-transparent text-gray-300'
            }`}
          >
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">next pointer</span>
            <span className="text-xs font-semibold text-[var(--color-accent-cyan)]">0x9F40</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 max-w-sm text-center h-10 leading-relaxed font-medium transition-all duration-200">
          {stepIdx === 1
            ? '💡 Data Field: Holds the actual value (e.g. an integer 42, string or object).'
            : stepIdx === 2
            ? '🔗 Next Pointer: Holds the hexadecimal memory address of the next node.'
            : 'Hover over parts of the Node to explore its layout anatomy.'}
        </p>
      </div>
    );
  }

  if (type === 'traversal' || type === 'search' || type === 'singly-list' || type === 'slideshow') {
    const list = [10, 20, 30, 40];
    const isSearch = type === 'search';
    const targetVal = 30;
    const isFound = isSearch && stepIdx >= 2;

    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <div className="flex gap-2 items-center justify-center flex-wrap min-h-16 py-2">
          {list.map((val, idx) => {
            const isCurr = stepIdx === idx;
            const wasVisited = isSearch ? idx < stepIdx : idx <= stepIdx;
            const matches = val === targetVal;
            const matchHighlight = isSearch && matches && isFound;

            return (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`p-3 rounded-xl border-2 font-mono text-center relative transition-all duration-300 ${
                    matchHighlight
                      ? 'bg-[var(--color-accent-emerald)]/20 border-[var(--color-accent-emerald)] text-white font-bold scale-105 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : isCurr
                      ? 'bg-[var(--color-accent-violet)]/20 border-[var(--color-accent-violet)] text-white font-bold scale-105 shadow-[0_0_12px_rgba(139,92,246,0.35)]'
                      : wasVisited
                      ? 'bg-white/5 border-white/20 text-gray-400'
                      : 'bg-white/[0.01] border-white/[0.05] text-gray-600'
                  }`}
                >
                  <span className="text-xs block">{val}</span>
                  {isCurr && (
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[var(--color-accent-violet)] uppercase tracking-wider">
                      curr
                    </span>
                  )}
                </div>
                {idx < list.length - 1 && (
                  <span className={`text-sm font-bold transition-all ${isCurr ? 'text-[var(--color-accent-violet)]' : 'text-gray-700'}`}>
                    →
                  </span>
                )}
              </div>
            );
          })}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-gray-700">→</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-gray-500">NULL</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs pt-2">
          <span className="text-gray-400 font-mono leading-relaxed">
            {isSearch
              ? isFound
                ? `🎯 Found target ${targetVal}! Matching node is highlighted.`
                : stepIdx >= list.length
                ? `❌ Value not found in list.`
                : `Scanning: checking node ${stepIdx + 1} (${list[stepIdx]})...`
              : `curr = head (${list[0]}). Click Next to advance traversal.`}
          </span>
          <button
            onClick={() => setStepIdx((stepIdx + 1) % (list.length + (isSearch ? 1 : 0)))}
            className="px-3.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-bold text-white transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  }

  if (type === 'doubly-list') {
    const list = ['A', 'B', 'C'];
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <div className="flex gap-2 items-center justify-center flex-wrap py-2">
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-gray-500">NULL</span>
          <span className="text-gray-700">←</span>
          {list.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 font-mono text-xs hover:border-[var(--color-accent-cyan)] transition-colors duration-200">
                <span className="text-white font-bold">{val}</span>
              </div>
              {idx < list.length - 1 && (
                <span className="text-gray-500 font-bold px-1">
                  ⇄
                </span>
              )}
            </div>
          ))}
          <span className="text-gray-700">→</span>
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-gray-500">NULL</span>
        </div>
        <p className="text-[10px] text-center text-gray-500 font-mono leading-relaxed">
          ⇄ represents two links: next pointing forward, and prev pointing backward.
        </p>
      </div>
    );
  }

  if (type === 'circular-list') {
    return (
      <div className="p-6 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] flex flex-col items-center justify-center gap-4">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="absolute top-0 w-10 h-10 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-xs font-mono font-bold text-white shadow-md">A</div>
          <div className="absolute right-0 w-10 h-10 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-xs font-mono font-bold text-white shadow-md">B</div>
          <div className="absolute bottom-0 w-10 h-10 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-xs font-mono font-bold text-white shadow-md">C</div>
          <svg className="absolute w-full h-full text-[var(--color-accent-violet)]" viewBox="0 0 100 100">
            <path d="M 50 15 A 35 35 0 0 1 85 50" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 85 50 A 35 35 0 0 1 50 85" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 50 85 A 35 35 0 0 1 50 15" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow)" />
          </svg>
        </div>
        <p className="text-[10px] text-gray-500 font-mono text-center max-w-xs leading-relaxed">
          Notice there is no NULL pointer. The tail node connects back to the head node A.
        </p>
      </div>
    );
  }

  if (type === 'reversal') {
    const list = [10, 20, 30];
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <div className="flex gap-4 items-center justify-center py-2 h-16">
          {list.map((val, idx) => {
            const isReversed = stepIdx > idx;
            return (
              <div key={idx} className="flex items-center gap-2">
                {isReversed && (
                  <span className="text-[var(--color-accent-emerald)] font-bold text-sm">
                    ←
                  </span>
                )}
                <div className="p-3 rounded-xl border border-white/10 bg-black/40 font-mono text-xs">
                  {val}
                </div>
                {!isReversed && idx < list.length - 1 && (
                  <span className="text-gray-600 font-bold text-sm">
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400 font-mono leading-relaxed">
            {stepIdx === 0
              ? 'Original chain: pointers point right.'
              : stepIdx === 1
              ? 'Step 1: Point head pointer to null. 10.next = null.'
              : stepIdx === 2
              ? 'Step 2: Reverse middle node. 20.next = 10.'
              : 'Reversal complete! List is reversed.'}
          </span>
          <button
            onClick={() => setStepIdx((stepIdx + 1) % 4)}
            className="px-3.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-bold text-white transition-all"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function SimulationVisualizer({ type }: { type: string }) {
  const [step, setStep] = useState(0);
  const isCycle = type === 'cycle-detection' || type === 'race-lap';
  const nodes = [10, 20, 30, 40, 50, 60];

  const slowPath = isCycle ? [0, 1, 2, 3, 4, 5, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5];
  const fastPath = isCycle ? [0, 2, 4, 3, 5, 4, 3, 5, 4, 3] : [0, 2, 4, 5, 5, 5];

  const currentSlow = slowPath[Math.min(step, slowPath.length - 1)];
  const currentFast = fastPath[Math.min(step, fastPath.length - 1)];
  const collision = isCycle && currentSlow === currentFast && step > 0;

  return (
    <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
      <p className="text-xs font-bold text-[var(--color-accent-cyan)] uppercase tracking-widest">
        {isCycle ? 'Floyd\'s Cycle Track Loop' : 'Fast & Slow Pointer Simulation'}
      </p>

      <div className="flex gap-2 items-center justify-center flex-wrap h-20 relative pt-2">
        {nodes.map((val, idx) => {
          const hasSlow = currentSlow === idx;
          const hasFast = currentFast === idx;

          return (
            <div key={idx} className="flex items-center gap-2">
              <div
                className={`w-12 h-12 rounded-xl border font-mono text-xs flex flex-col items-center justify-center relative transition-all duration-300 ${
                  hasSlow && hasFast
                    ? 'bg-rose-500/20 border-rose-500 text-white font-bold scale-105 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                    : hasSlow
                    ? 'bg-[var(--color-accent-cyan)]/25 border-[var(--color-accent-cyan)] text-white font-bold scale-105 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : hasFast
                    ? 'bg-[var(--color-accent-violet)]/25 border-[var(--color-accent-violet)] text-white font-bold scale-105 shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                    : 'bg-white/[0.01] border-white/[0.05] text-gray-500'
                }`}
              >
                <span>{val}</span>
                <div className="absolute -bottom-5 flex gap-1 text-[8px] font-bold uppercase tracking-tighter">
                  {hasSlow && <span className="text-[var(--color-accent-cyan)] font-black">🐢 S</span>}
                  {hasFast && <span className="text-[var(--color-accent-violet)] font-black">🐇 F</span>}
                </div>
              </div>
              {idx < nodes.length - 1 && (
                <span className="text-gray-700 font-bold">→</span>
              )}
            </div>
          );
        })}
      </div>

      {isCycle && (
        <div className="h-6 flex items-center justify-center text-[10px] font-mono text-gray-500 pt-2">
          {collision ? (
            <span className="text-rose-400 font-bold flex items-center gap-1">
              💥 Pointers collided at node {nodes[currentSlow]}! Loop detected.
            </span>
          ) : (
            `Slow pointer (🐢) at node ${nodes[currentSlow]}. Fast pointer (🐇) at node ${nodes[currentFast]}.`
          )}
        </div>
      )}

      <div className="flex justify-between items-center text-xs pt-2">
        <span className="text-gray-400 font-mono leading-relaxed">
          {!isCycle && currentFast >= 5
            ? 'Fast reached NULL. Slow is exactly at the middle node [40]!'
            : 'S moves at 1x speed, F moves at 2x speed.'}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setStep(0)}
            className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] text-white"
          >
            Reset
          </button>
          <button
            onClick={() => setStep((step + 1) % (isCycle ? 8 : 4))}
            className="px-3.5 py-1.5 bg-[var(--color-accent-violet)] text-white rounded-xl text-[10px] font-bold transition-all shadow-md"
          >
            Step simulation
          </button>
        </div>
      </div>
    </div>
  );
}

function StepPipelineVisualizer({ type }: { type: string }) {
  const [step, setStep] = useState(0);

  if (type === 'insertion' || type === 'spotify') {
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <div className="flex flex-col items-center justify-center gap-4 h-24 relative">
          {step === 0 && (
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[10]</div>
              <span className="text-gray-600">─────────→</span>
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[30]</div>
            </div>
          )}
          {step === 1 && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 font-mono text-xs opacity-40">
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[10]</div>
                <span className="text-gray-600">──────→</span>
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[30]</div>
              </div>
              <motion.div initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }} className="px-3 py-2 rounded-xl bg-[var(--color-accent-violet)]/20 border border-[var(--color-accent-violet)] text-white text-xs font-mono font-bold shadow-md">
                New Node: [20]
              </motion.div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 font-mono text-xs">
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 opacity-40">[10]</div>
                <span className="text-gray-600 opacity-20">──────→</span>
                <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[30]</div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="px-3 py-2 rounded-xl bg-[var(--color-accent-violet)]/20 border border-[var(--color-accent-violet)] text-white font-bold">[20]</div>
                <span className="text-[var(--color-accent-emerald)] font-bold">──────→</span>
                <span className="text-gray-500">([30])</span>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[10]</div>
              <span className="text-[var(--color-accent-emerald)] font-bold">──→</span>
              <div className="px-3 py-2 rounded-xl bg-[var(--color-accent-violet)]/20 border border-[var(--color-accent-violet)] text-white font-bold">[20]</div>
              <span className="text-[var(--color-accent-emerald)] font-bold">──→</span>
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[30]</div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-xs pt-2 border-t border-white/[0.04]">
          <span className="text-gray-400 font-mono leading-relaxed">
            {step === 0
              ? 'Original list. We want to insert [20] between [10] and [30].'
              : step === 1
              ? 'Step 1: Allocate memory and create the new Node [20].'
              : step === 2
              ? 'Step 2: Connect the new node next pointer. 20.next = 30.'
              : 'Step 3: Point the predecessor next pointer to it. 10.next = 20.'}
          </span>
          <button
            onClick={() => setStep((step + 1) % 4)}
            className="px-3.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-bold text-white transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  }

  if (type === 'deletion' || type === 'chain-unhook') {
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <div className="flex items-center justify-center gap-2 font-mono text-xs h-20">
          {step === 0 && (
            <>
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[10]</div>
              <span className="text-gray-600">──→</span>
              <div className="px-3 py-2 rounded-xl bg-rose-500/20 border border-rose-500 text-rose-300">[20]</div>
              <span className="text-gray-600">──→</span>
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[30]</div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[10]</div>
              <span className="text-[var(--color-accent-emerald)] font-bold">─────────────→</span>
              <div className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300/40 opacity-40">[20]</div>
              <span className="text-gray-600 opacity-20">──→</span>
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[30]</div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[10]</div>
              <span className="text-[var(--color-accent-emerald)] font-bold">─────────────→</span>
              <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">[30]</div>
            </>
          )}
        </div>

        <div className="flex justify-between items-center text-xs pt-2 border-t border-white/[0.04]">
          <span className="text-gray-400 font-mono leading-relaxed">
            {step === 0
              ? 'Original chain. We want to delete node [20].'
              : step === 1
              ? 'Step 1: Bypass the node. 10.next = 20.next (which is 30).'
              : 'Step 2: Memory reclaimed. [20] is garbage-collected!'}
          </span>
          <button
            onClick={() => setStep((step + 1) % 3)}
            className="px-3.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-bold text-white transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  }

  if (type === 'merge-lists') {
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <div className="flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center gap-1">
            <span className="text-gray-500 w-8">L1:</span>
            <div className={`px-2 py-1 rounded border ${step >= 1 ? 'border-white/20 bg-white/5 opacity-55' : 'border-[var(--color-accent-cyan)]/30 bg-[var(--color-accent-cyan)]/5 text-white'}`}>[10]</div>
            <span>→</span>
            <div className={`px-2 py-1 rounded border ${step >= 3 ? 'border-white/20 bg-white/5 opacity-55' : 'border-white/10 text-gray-400'}`}>[30]</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500 w-8">L2:</span>
            <div className={`px-2 py-1 rounded border ${step >= 2 ? 'border-white/20 bg-white/5 opacity-55' : 'border-white/10 text-gray-400'}`}>[20]</div>
            <span>→</span>
            <div className={`px-2 py-1 rounded border ${step >= 4 ? 'border-white/20 bg-white/5 opacity-55' : 'border-white/10 text-gray-400'}`}>[40]</div>
          </div>
          <div className="flex items-center gap-1 mt-2 border-t border-white/[0.05] pt-2">
            <span className="text-[var(--color-accent-violet)] font-bold w-8">Out:</span>
            <div className="px-2 py-1 rounded border border-dashed border-white/10 text-gray-600 bg-white/[0.01]">Dummy</div>
            {step >= 1 && (
              <>
                <span>→</span>
                <div className="px-2 py-1 rounded border border-[var(--color-accent-emerald)] bg-[var(--color-accent-emerald)]/10 text-white">[10]</div>
              </>
            )}
            {step >= 2 && (
              <>
                <span>→</span>
                <div className="px-2 py-1 rounded border border-[var(--color-accent-emerald)] bg-[var(--color-accent-emerald)]/10 text-white">[20]</div>
              </>
            )}
            {step >= 3 && (
              <>
                <span>→</span>
                <div className="px-2 py-1 rounded border border-[var(--color-accent-emerald)] bg-[var(--color-accent-emerald)]/10 text-white">[30]</div>
              </>
            )}
            {step >= 4 && (
              <>
                <span>→</span>
                <div className="px-2 py-1 rounded border border-[var(--color-accent-emerald)] bg-[var(--color-accent-emerald)]/10 text-white">[40]</div>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-xs pt-2">
          <span className="text-gray-400 font-mono leading-relaxed">
            {step === 0
              ? 'Ready to weave L1 and L2 sorted lists.'
              : step === 1
              ? 'Linked 10: dummy points to L1 head (10 < 20).'
              : step === 2
              ? 'Linked 20: 10 points to L2 head (20 < 30).'
              : step === 3
              ? 'Linked 30: 20 points to L1 remainder.'
              : 'Linked 40: Merged complete!'}
          </span>
          <button
            onClick={() => setStep((step + 1) % 5)}
            className="px-3.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-[10px] font-bold text-white transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function ApplicationVisualizer({ type }: { type: string }) {
  const [activeTab, setActiveTab] = useState(2);
  const [history, setHistory] = useState(['google.com', 'spotify.com', 'leetcode.com']);

  if (type === 'browser') {
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/50 border border-white/5">
          <button
            disabled={activeTab === 0}
            onClick={() => setActiveTab(activeTab - 1)}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20 text-white transition-colors"
          >
            ◀
          </button>
          <button
            disabled={activeTab === history.length - 1}
            onClick={() => setActiveTab(activeTab + 1)}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20 text-white transition-colors"
          >
            ▶
          </button>
          <div className="flex-1 px-3 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-gray-300">
            https://www.{history[activeTab]}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] font-mono pt-2">
          {history.map((url, idx) => {
            const isActive = activeTab === idx;
            return (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`px-3 py-1 rounded-lg border transition-all ${
                    isActive
                      ? 'bg-[var(--color-accent-violet)]/20 border-[var(--color-accent-violet)] text-white font-bold shadow-md'
                      : 'border-white/5 bg-white/[0.01] text-gray-500'
                  }`}
                >
                  {url.replace('.com', '')}
                </div>
                {idx < history.length - 1 && <span className="text-gray-700">⇄</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'spotify') {
    const songs = ['Billie Jean', 'Hotel California', 'Blinding Lights'];
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-3">
        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Playlist Queue Links</p>
        <div className="flex flex-col gap-2">
          {songs.map((song, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs hover:border-emerald-500/20 transition-all">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-mono">#{idx+1}</span>
                <span className="text-white font-medium">{song}</span>
              </div>
              <span className="text-[10px] font-mono text-gray-500">
                {idx < songs.length - 1 ? 'next: #' + (idx + 2) : 'next: NULL'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'undo-redo') {
    const states = ['[Init]', '[Typed "Hel"]', '[Typed "Hello"]'];
    return (
      <div className="p-5 rounded-2xl border border-white/[0.04] bg-[#0c0c0e] space-y-4">
        <div className="flex items-center justify-center gap-3">
          <button
            disabled={activeTab === 0}
            onClick={() => setActiveTab(activeTab - 1)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 text-xs font-bold text-white transition-all shadow-md"
          >
            ↩ Undo
          </button>
          <button
            disabled={activeTab === states.length - 1}
            onClick={() => setActiveTab(activeTab + 1)}
            className="px-4 py-2 rounded-xl bg-[var(--color-accent-cyan)]/20 border border-[var(--color-accent-cyan)]/30 hover:bg-[var(--color-accent-cyan)]/30 disabled:opacity-20 text-xs font-bold text-[var(--color-accent-cyan)] transition-all shadow-md"
          >
            Redo ↪
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-mono pt-2">
          {states.map((state, idx) => {
            const isActive = activeTab === idx;
            return (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    isActive
                      ? 'bg-[var(--color-accent-emerald)]/10 border-[var(--color-accent-emerald)] text-white font-bold'
                      : 'border-white/5 bg-white/[0.01] text-gray-600'
                  }`}
                >
                  {state}
                </div>
                {idx < states.length - 1 && <span className="text-gray-700">⇄</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

export function BespokeVisualizer({ type }: { type: string }) {
  if (['array-vs-linked', 'memory-scatter', 'scavenger-hunt'].includes(type)) {
    return <MemoryVisualizer type={type} />;
  }
  if (['node-anatomy', 'traversal', 'search', 'singly-list', 'doubly-list', 'circular-list', 'reversal'].includes(type)) {
    return <ListDiagramVisualizer type={type} />;
  }
  if (['fast-slow-pointers', 'cycle-detection', 'runners', 'race-lap'].includes(type)) {
    return <SimulationVisualizer type={type} />;
  }
  if (['insertion', 'deletion', 'merge-lists', 'zipper', 'train', 'chain-unhook', 'station', 'spotify'].includes(type)) {
    return <StepPipelineVisualizer type={type} />;
  }
  if (['browser', 'undo-redo', 'scheduler', 'patterns', 'toolset', 'real-world-map'].includes(type)) {
    return <ApplicationVisualizer type={type} />;
  }

  if (type === 'array') {
    return <ArrayVisualizer />;
  }

  return (
    <div className="p-4 rounded-xl bg-[#0c0c0e]/60 border border-white/[0.04] flex items-center justify-center font-mono text-xs text-gray-500">
      Interactive Visualization: {type.replace('-', ' ').toUpperCase()}
    </div>
  );
}

// =============== ON-THE-FLY NORMALIZER ENGINE ===============

function normalizeSection(section: any): any {
  if (!section) return null;
  if (section.content.blocks && Array.isArray(section.content.blocks)) {
    return section;
  }

  const content = section.content;
  const blocks: any[] = [];

  // Parse keyIdea or prose into Concept blocks
  if (content.keyIdea) {
    blocks.push({
      type: 'concept',
      text: content.prose || [content.keyIdea.description],
      visual: {
        type: content.memoryDiagram ? 'memory-scatter' : content.interactiveVisualizer === 'array' ? 'array' : 'default',
        title: content.keyIdea.title
      }
    });
  } else if (content.prose && content.prose.length > 0) {
    blocks.push({
      type: 'concept',
      text: content.prose,
      visual: { type: 'default' }
    });
  }

  // Parse methods into step pipelines
  if (content.methods && content.methods.length > 0) {
    blocks.push({
      type: 'internal-working',
      text: ['Review the structural definition and helper methods below.'],
      steps: content.methods.map((m: any) => ({
        title: m.name,
        description: `${m.description} (Syntax: ${m.syntax})`
      }))
    });
  }

  // Parse complexity row
  if (content.complexityTable && content.complexityTable.length > 0) {
    const row = content.complexityTable[0];
    blocks.push({
      type: 'complexity',
      text: ['Performance breakdown for the target operation.'],
      operation: row.operation,
      time: row.average || row.worst || 'O(N)',
      space: row.space || 'O(1)',
      reason: row.notes || 'Shifting elements requires traversal.'
    });
  }

  // Parse analogy or features into real world mappings
  if (content.analogy) {
    blocks.push({
      type: 'real-world',
      text: [content.analogy.description],
      visual: {
        type: 'default',
        title: content.analogy.title
      }
    });
  } else if (content.whyItMatters && content.whyItMatters.length > 0) {
    blocks.push({
      type: 'real-world',
      text: ['Real-world systems prioritizing this structure.'],
      visual: {
        type: 'default',
        title: content.whyItMatters[0].title
      }
    });
  }

  // Parse mistakes and checklists
  if (content.interviewPerspective) {
    blocks.push({
      type: 'interview-insight',
      text: ['Key checkmarks for technical whiteboard interviews.'],
      checklist: content.interviewPerspective.checklist || []
    });
  }

  // Parse practice description
  if (content.practice && content.practice.length > 0) {
    blocks.push({
      type: 'mini-practice',
      question: content.practice[0].description,
      current: 'Target: ' + content.practice[0].title,
      expected: 'Time: ' + content.practice[0].timeComplexity + ', Space: ' + content.practice[0].spaceComplexity,
      interactiveDemoType: 'sandbox'
    });
  }

  return {
    ...section,
    layoutType: section.layoutType || 'introduction',
    content: {
      ...content,
      blocks
    }
  };
}

interface ContentRendererProps {
  section: any; // Section type from content/index.ts
  topicId: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: "easeOut" as const },
  },
};

export function ContentRenderer({ section, topicId }: ContentRendererProps) {
  const [activeLangTab, setActiveLangTab] = useState(0);
  const normalizedSection = normalizeSection(section);

  const renderParagraphs = (
    text: string | string[],
    textClass: string = "text-gray-200 leading-relaxed text-base mb-4 font-normal"
  ) => {
    if (Array.isArray(text)) {
      return text.map((para: string, i: number) => (
        <p key={i} className={textClass}>
          {para}
        </p>
      ));
    }
    return <p className={textClass}>{text}</p>;
  };

  if (!normalizedSection) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No content available for this section.</p>
      </div>
    );
  }

  const content = normalizedSection.content;

  if (content.revisionHub) {
    return (
      <motion.div
        key={normalizedSection.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
      >
        <RevisionHub data={content.revisionHub} />
      </motion.div>
    );
  }

  // Bespoke Handcrafted Layout Switcher
  if (normalizedSection.layoutType) {
    return (
      <motion.article
        key={normalizedSection.id ?? topicId}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto w-full space-y-8 pb-16"
      >
        {/* Customized Header */}
        <header className="flex items-center gap-4 border-b border-[var(--color-border-glass)] pb-6">
          <span className="text-4xl p-3 rounded-2xl bg-[var(--color-surface-elevated)] border border-white/[0.04]">
            {normalizedSection.icon}
          </span>
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">{normalizedSection.title}</h2>
            <div className="flex items-center gap-2 mt-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Clock size={12} />
              <span>{normalizedSection.estimatedTime}</span>
              <span className="text-white/20">•</span>
              <span className="text-[var(--color-accent-cyan)]">{normalizedSection.layoutType.replace('-', ' ')}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Handcrafted Layout Engine - Sequential Blocks */}
        {content.blocks && Array.isArray(content.blocks) && (
          <div className="space-y-8">
            {content.blocks.map((block: any, idx: number) => {
              switch (block.type) {
                case 'concept':
                  return (
                    <div key={idx} className="p-6 rounded-3xl border border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)]/80 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-cyan)]/5 rounded-full blur-3xl" />
                      <span className="text-xs font-bold text-[var(--color-accent-cyan)] uppercase tracking-widest block mb-2">💡 Core Concept</span>
                      <div className="mb-6">{renderParagraphs(block.text, "text-base text-gray-100 font-medium leading-relaxed mb-4")}</div>
                      
                      {/* Handcrafted Visual per LayoutType */}
                      {block.visual && block.visual.type && (
                        <div className="mt-4">
                          <BespokeVisualizer type={block.visual.type} />
                        </div>
                      )}
                    </div>
                  );
                case 'internal-working':
                  return (
                    <div key={idx} className="p-6 rounded-3xl border border-[var(--color-border-glass)] bg-[var(--color-surface-elevated)]/30 space-y-4">
                      <span className="text-xs font-bold text-[var(--color-accent-violet)] uppercase tracking-widest block">⚙️ Internal Step Pipeline</span>
                      <div className="mb-4">{renderParagraphs(block.text, "text-sm text-gray-300 leading-relaxed mb-3")}</div>
                      {block.steps && Array.isArray(block.steps) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {block.steps.map((step: any, sIdx: number) => (
                            <div key={sIdx} className="p-4 rounded-xl border border-white/[0.04] bg-[#0c0c0e] hover:border-white/[0.08] transition-colors">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Step {sIdx + 1}: {step.title}</span>
                              <p className="text-xs text-gray-400 leading-normal">{step.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                case 'complexity':
                  return (
                    <div key={idx} className="p-6 rounded-3xl border border-[var(--color-border-glass)] bg-red-500/[0.01] border-red-500/10 space-y-4">
                      <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">⚡ Performance Profile</span>
                      <div className="mb-4">{renderParagraphs(block.text, "text-sm text-gray-300 leading-relaxed mb-3")}</div>
                      <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/[0.02] flex items-center justify-between gap-4">
                        <div>
                          <span className="text-xs font-bold text-red-400/80 uppercase tracking-wider block mb-1">Time Complexity</span>
                          <code className="text-2xl font-mono font-black text-red-400">{block.time}</code>
                          <span className="text-xs text-gray-400 block mt-2">({block.reason})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-gray-500 block">Operation</span>
                          <span className="text-sm font-bold text-white block mt-0.5">{block.operation}</span>
                          <span className="text-xs text-gray-400 font-mono block mt-2">Space: {block.space}</span>
                        </div>
                      </div>
                    </div>
                  );
                case 'real-world':
                  return (
                    <div key={idx} className="p-6 rounded-3xl border border-[var(--color-border-glass)] bg-[var(--color-surface-elevated)]/20 space-y-4">
                      <span className="text-xs font-bold text-[var(--color-accent-emerald)] uppercase tracking-widest block">🌍 Real-World Mapping</span>
                      <div className="my-2">{renderParagraphs(block.text, "text-gray-300 leading-relaxed mb-3")}</div>
                      {block.visual && block.visual.type && (
                        <div className="mt-2">
                          <BespokeVisualizer type={block.visual.type} />
                        </div>
                      )}
                    </div>
                  );
                case 'interview-insight':
                  return (
                    <div key={idx} className="space-y-4 animate-fadeIn">
                      <div className="mb-2">{renderParagraphs(block.text, "text-gray-300 leading-relaxed")}</div>
                      <RecruiterCard data={{ title: 'Interview Perspective', checklist: block.checklist }} />
                    </div>
                  );
                case 'mini-practice':
                  return (
                    <div key={idx} className="p-6 rounded-3xl border border-[var(--color-accent-violet)]/20 bg-[var(--color-accent-violet)]/[0.01] space-y-4">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl">🎯</span>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">Interactive Sandbox Challenge</h4>
                          <p className="text-gray-300 text-sm">{block.question}</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl border border-[var(--color-accent-violet)]/10 bg-black/50 space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-500">Current: {block.current}</span>
                          <span className="text-[var(--color-accent-emerald)] font-bold">Expected: {block.expected}</span>
                        </div>
                        <div className="h-24 flex items-center justify-center">
                          <button
                            onClick={() => alert("Simulation Running: Swapping nodes and updating pointers in sandbox.")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent-violet)] text-white text-xs font-bold hover:bg-[var(--color-accent-violet)]/80 transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                          >
                            <Zap size={12} /> Run Interactive Sandbox Simulation
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        )}

        {/* Append codeExamples, practice, and quiz if they exist outside blocks */}
        {content.codeExamples && Array.isArray(content.codeExamples) && content.codeExamples.length > 0 && (
          <div className="mt-8 border-t border-[var(--color-border-glass)] pt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
              <Code2 size={16} /> Code Implementation Reference
            </h3>
            {content.codeExamples.length > 1 && (
              <div className="flex items-center gap-1 border-b border-[var(--color-border-glass)] mb-4">
                {content.codeExamples.map((ex: CodeExampleData, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveLangTab(i)}
                    className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
                      activeLangTab === i
                        ? "text-[var(--color-accent-cyan)] bg-[var(--color-surface-elevated)] border border-b-0 border-[var(--color-border-glass)] -mb-px"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {ex.language}
                  </button>
                ))}
              </div>
            )}
            <CodeBlock
              code={content.codeExamples[activeLangTab]?.code ?? ""}
              language={content.codeExamples[activeLangTab]?.language ?? "python"}
              title={content.codeExamples[activeLangTab]?.title}
              explanation={content.codeExamples[activeLangTab]?.explanation}
              showLineNumbers={true}
            />
          </div>
        )}

        {content.practice && Array.isArray(content.practice) && content.practice.length > 0 && (
          <div className="mt-8 border-t border-[var(--color-border-glass)] pt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              Practice Problems
            </h3>
            <div className="space-y-3">
              {content.practice.map((item: PracticeItemData, i: number) => (
                <PracticeItem key={i} item={item} />
              ))}
            </div>
          </div>
        )}

        {content.quiz && Array.isArray(content.quiz) && content.quiz.length > 0 && (
          <div className="mt-8 border-t border-[var(--color-border-glass)] pt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              Knowledge Check
            </h3>
            <QuizSection questions={content.quiz} />
          </div>
        )}
      </motion.article>
    );
  }

  return (
    <motion.article
      key={section.id ?? topicId}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto w-full"
    >
      {/* Section header */}
      <header className="flex items-start gap-4 mb-8">
        {section.icon && (
          <span className="text-4xl flex-shrink-0" aria-hidden="true">
            {section.icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
            {section.title}
          </h2>
          {section.estimatedTime && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock size={12} />
              <span>{section.estimatedTime}</span>
            </div>
          )}
        </div>
      </header>

      {/* Story Hook */}
      {content.hook && (
        <StoryCard data={content.hook} />
      )}

      {/* Block-based curriculum content */}
      {content.blocks && Array.isArray(content.blocks) && (
        <div className="space-y-8 mb-8">
          {content.blocks.map((block: any, idx: number) => {
            switch (block.type) {
              case 'concept':
                return (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl">💡</span>
                      <div className="text-gray-200 leading-relaxed text-base font-medium">
                        {renderParagraphs(block.text, "mb-3")}
                      </div>
                    </div>
                    {/* Visual Asset representation */}
                    <div className="p-6 rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface-elevated)]/30 backdrop-blur-sm relative overflow-hidden group hover:border-[var(--color-accent-violet)]/30 transition-colors">
                      <p className="text-xs uppercase tracking-wider text-[var(--color-accent-cyan)] font-semibold mb-2">
                        🎮 Visual Representation: {block.visual.type.replace('-', ' ')}
                      </p>
                      {/* Premium Visual Demo Sandbox Layout */}
                      <div className="h-32 flex items-center justify-center border border-white/[0.04] rounded-xl bg-black/40">
                        {block.visual.type === 'array-vs-linked' && (
                          <div className="flex flex-col items-center gap-4 text-sm">
                            <div className="flex gap-1">
                              <span className="text-gray-400 font-mono">Array:</span>
                              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-white">[10]</span>
                              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-white">[20]</span>
                              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-white">[30]</span>
                            </div>
                            <div className="flex gap-2 items-center">
                              <span className="text-gray-400 font-mono">Linked:</span>
                              <span className="px-2 py-1 rounded bg-[var(--color-accent-violet)]/10 border border-[var(--color-accent-violet)]/30 font-mono text-white">[10]</span>
                              <span className="text-gray-500">→</span>
                              <span className="px-2 py-1 rounded bg-[var(--color-accent-violet)]/10 border border-[var(--color-accent-violet)]/30 font-mono text-white">[20]</span>
                              <span className="text-gray-500">→</span>
                              <span className="px-2 py-1 rounded bg-[var(--color-accent-violet)]/10 border border-[var(--color-accent-violet)]/30 font-mono text-white">[30]</span>
                            </div>
                          </div>
                        )}
                        {block.visual.type === 'node-anatomy' && (
                          <div className="flex items-center border border-[var(--color-accent-cyan)]/30 rounded-xl bg-[var(--color-accent-cyan)]/5 overflow-hidden font-mono text-sm">
                            <span className="px-4 py-2 bg-white/5 text-white border-r border-[var(--color-accent-cyan)]/30">Data = 10</span>
                            <span className="px-4 py-2 text-[var(--color-accent-cyan)] flex items-center gap-1">Next •──►</span>
                          </div>
                        )}
                        {block.visual.type === 'memory-scatter' && (
                          <div className="flex items-center gap-6 text-xs font-mono">
                            <div className="p-3 rounded border border-white/5 bg-white/[0.02]">
                              <p className="text-gray-500">Addr: 1024</p>
                              <p className="text-white font-bold">Node A (Next: 4096)</p>
                            </div>
                            <div className="p-3 rounded border border-white/5 bg-white/[0.02]">
                              <p className="text-gray-500">Addr: 8092</p>
                              <p className="text-white font-bold">Node C (Next: Null)</p>
                            </div>
                            <div className="p-3 rounded border border-white/5 bg-white/[0.02]">
                              <p className="text-gray-500">Addr: 4096</p>
                              <p className="text-white font-bold">Node B (Next: 8092)</p>
                            </div>
                          </div>
                        )}
                        {/* Fallback visualizer indicator */}
                        {!['array-vs-linked', 'node-anatomy', 'memory-scatter'].includes(block.visual.type) && (
                          <div className="flex items-center gap-2 text-gray-400 font-mono text-xs">
                            <Zap size={14} className="text-[var(--color-accent-violet)] animate-pulse" />
                            Interactive Diagram: {block.visual.type}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              case 'internal-working':
                return (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl">⚙️</span>
                      <div className="text-gray-200 leading-relaxed text-base">
                        {renderParagraphs(block.text, "mb-3")}
                      </div>
                    </div>
                    {/* Stepper Steps UI */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {block.steps.map((step: any, sIdx: number) => (
                        <div key={sIdx} className="p-4 rounded-xl border border-white/[0.04] bg-[#0c0c0e] hover:border-white/[0.08] transition-colors">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Step {sIdx + 1}: {step.title}</span>
                          <p className="text-xs text-gray-400 leading-normal">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              case 'complexity':
                return (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl">⚡</span>
                      <div className="text-gray-200 leading-relaxed text-base">
                        {renderParagraphs(block.text, "mb-3")}
                      </div>
                    </div>
                    {/* Premium Complexity Card */}
                    <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/[0.02] flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-red-400/80 uppercase tracking-wider block mb-1">Time Complexity</span>
                        <code className="text-2xl font-mono font-black text-red-400">{block.time}</code>
                        <span className="text-xs text-gray-400 block mt-2">({block.reason})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-gray-500 block">Operation</span>
                        <span className="text-sm font-bold text-white block mt-0.5">{block.operation}</span>
                        <span className="text-xs text-gray-400 font-mono block mt-2">Space: {block.space}</span>
                      </div>
                    </div>
                  </div>
                );
              case 'real-world':
                return (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl">🌍</span>
                      <div className="text-gray-200 leading-relaxed text-base">
                        {renderParagraphs(block.text, "mb-3")}
                      </div>
                    </div>
                    {/* Real World mapping card */}
                    <div className="p-5 rounded-2xl border border-[var(--color-border-glass)] bg-[var(--color-surface-elevated)]/20">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📍 Real-World Use Case: {block.visual.title}</p>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <span className="p-2 rounded-lg bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)]">✨</span>
                        <p className="text-sm text-gray-300 font-medium">{block.visual.type.replace('-', ' ').toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                );
              case 'interview-insight':
                return (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl">🧠</span>
                      <div className="text-gray-200 leading-relaxed text-base">
                        {renderParagraphs(block.text, "mb-3")}
                      </div>
                    </div>
                    {/* Interview Checklist card */}
                    <RecruiterCard data={{ title: 'Interview Checklist', checklist: block.checklist }} />
                  </div>
                );
              case 'mini-practice':
                return (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl">🎯</span>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Interactive Sandbox Challenge</h4>
                        <p className="text-gray-300 text-sm">{block.question}</p>
                      </div>
                    </div>
                    {/* Simulation block */}
                    <div className="p-6 rounded-2xl border border-[var(--color-accent-violet)]/20 bg-[var(--color-accent-violet)]/[0.02]">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-500">Current: {block.current}</span>
                          <span className="text-[var(--color-accent-emerald)]">Expected: {block.expected}</span>
                        </div>
                        <div className="h-28 flex items-center justify-center border border-white/[0.04] rounded-xl bg-black/50">
                          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent-violet)] text-white text-xs font-bold hover:bg-[var(--color-accent-violet)]/80 transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                            <Zap size={12} /> Run Interactive Sandbox Simulation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      )}

      {/* Key Idea Glow Card */}
      {content.keyIdea && (
        <GlowCard data={content.keyIdea} />
      )}

      {/* Prose (Deprecated, but kept for legacy sections during transition) */}
      {content.prose && Array.isArray(content.prose) && (
        <div className="mb-6 space-y-4">
          {content.prose.map((para: string, i: number) => (
            <p key={i} className="text-gray-200 leading-relaxed text-base">
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Analogy Block */}
      {content.analogy && (
        <AnalogyView data={content.analogy} />
      )}

      {/* Why it Matters Features */}
      {content.whyItMatters && Array.isArray(content.whyItMatters) && (
        <FeatureGrid features={content.whyItMatters} />
      )}

      {/* Interactive Visualizer */}
      {content.interactiveVisualizer === 'array' && (
        <div className="mb-6">
          <ArrayVisualizer />
        </div>
      )}

      {/* Mistakes Block */}
      {content.mistakes && Array.isArray(content.mistakes) && (
        <MistakeCards mistakes={content.mistakes} />
      )}

      {/* Interview Perspective */}
      {content.interviewPerspective && (
        <RecruiterCard data={content.interviewPerspective} />
      )}

      {/* Takeaways (replaces Key Points) */}
      {content.takeaways && Array.isArray(content.takeaways) && (
        <Takeaways items={content.takeaways} />
      )}

      {/* Code examples with language tabs */}
      {content.codeExamples && Array.isArray(content.codeExamples) && content.codeExamples.length > 0 && (
        <div className="mb-6">
          {/* Language tabs */}
          {content.codeExamples.length > 1 && (
            <div className="flex items-center gap-1 border-b border-[var(--color-border-glass)] mb-0">
              {content.codeExamples.map((ex: CodeExampleData, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveLangTab(i)}
                  className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
                    activeLangTab === i
                      ? "text-[var(--color-accent-cyan)] bg-[var(--color-surface-elevated)] border border-b-0 border-[var(--color-border-glass)] -mb-px"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {ex.language}
                </button>
              ))}
            </div>
          )}
          <CodeBlock
            code={content.codeExamples[activeLangTab]?.code ?? ""}
            language={content.codeExamples[activeLangTab]?.language ?? "python"}
            title={content.codeExamples[activeLangTab]?.title}
            explanation={content.codeExamples[activeLangTab]?.explanation}
            showLineNumbers={true}
          />
        </div>
      )}

      {/* Complexity table */}
      {content.complexityTable && Array.isArray(content.complexityTable) && (
        <div className="mb-6">
          <ComplexityTable rows={content.complexityTable} />
        </div>
      )}

      {/* Memory diagram */}
      {content.memoryDiagram && (
        <div className="mb-6">
          <MemoryDiagram
            elements={content.memoryDiagram.elements}
            startAddress={content.memoryDiagram.startAddress ?? 1000}
            elementSize={content.memoryDiagram.elementSize ?? 4}
            label={content.memoryDiagram.label ?? "Memory Layout"}
          />
        </div>
      )}

      {/* Patterns */}
      {content.patterns && Array.isArray(content.patterns) && (
        <div className="mb-6 space-y-4">
          {content.patterns.map((p: any, i: number) => (
            <PatternCard key={i} pattern={p} index={i} />
          ))}
        </div>
      )}

      {/* Methods grid */}
      {content.methods && Array.isArray(content.methods) && (
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
            Method Reference
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.methods.map((m: MethodData, i: number) => (
              <MethodCard key={i} method={m} />
            ))}
          </div>
        </div>
      )}

      {/* Table data — tableData is an array of tables */}
      {content.tableData && Array.isArray(content.tableData) && content.tableData.length > 0 && (
        <div className="mb-6 space-y-4">
          {content.tableData.map((tbl: TableData, i: number) =>
            tbl && tbl.headers && Array.isArray(tbl.headers) ? (
              <TableSection key={i} data={tbl} />
            ) : null
          )}
        </div>
      )}

      {/* Practice items */}
      {content.practice && Array.isArray(content.practice) && (
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
            Practice Problems
          </h3>
          <div className="space-y-3">
            {content.practice.map((item: PracticeItemData, i: number) => (
              <PracticeItem key={i} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Quiz */}
      {content.quiz && Array.isArray(content.quiz) && content.quiz.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
            Knowledge Check
          </h3>
          <QuizSection questions={content.quiz} />
        </div>
      )}
    </motion.article>
  );
}
