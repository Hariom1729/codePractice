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

// --------------- ContentRenderer ---------------

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

  if (!section) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No content available for this section.</p>
      </div>
    );
  }

  const content = section.content;

  if (content.revisionHub) {
    return (
      <motion.div
        key={section.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
      >
        <RevisionHub data={content.revisionHub} />
      </motion.div>
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
                      <p className="text-gray-200 leading-relaxed text-base font-medium">
                        {block.text}
                      </p>
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
                      <p className="text-gray-200 leading-relaxed text-base">
                        {block.text}
                      </p>
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
                      <p className="text-gray-200 leading-relaxed text-base">
                        {block.text}
                      </p>
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
                      <p className="text-gray-200 leading-relaxed text-base">
                        {block.text}
                      </p>
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
                      <p className="text-gray-200 leading-relaxed text-base">
                        {block.text}
                      </p>
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
