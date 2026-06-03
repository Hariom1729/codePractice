"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Hash, Lightbulb, List } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

interface PatternTemplate {
  name: string;
  description: string;
  whenToUse: string;
  template: { language: string; code: string; explanation?: string }[];
  dryRun: string;
  problems: string[];
}

interface PatternCardProps {
  pattern: PatternTemplate;
  index: number;
}

export function PatternCard({ pattern, index }: PatternCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLang, setActiveLang] = useState(0);

  return (
    <div
      className={`
        rounded-xl border transition-all duration-300 overflow-hidden
        border-l-[3px]
        border-l-[var(--color-accent-violet)]
        border-[var(--color-border-glass)]
        bg-[var(--color-surface-obsidian)]/60
        shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.08)]
      `}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setIsExpanded((p) => !p)}
        className="w-full flex items-start gap-4 p-5 text-left group hover:bg-white/[0.02] transition-colors"
        aria-expanded={isExpanded}
      >
        {/* Index badge */}
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[var(--color-accent-violet)]/10 border border-[var(--color-accent-violet)]/20 flex items-center justify-center">
          <Hash size={14} className="text-[var(--color-accent-violet)]" />
          <span className="text-[10px] font-bold text-[var(--color-accent-violet)]">
            {index + 1}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-base font-bold text-white group-hover:text-[var(--color-accent-violet)] transition-colors">
              {pattern.name}
            </h3>
            {/* Problem count badge */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)] border border-[var(--color-accent-emerald)]/20">
              <List size={10} />
              {pattern.problems.length} problems
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5 line-clamp-1">
            {pattern.description}
          </p>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 mt-1 text-gray-500 group-hover:text-[var(--color-accent-violet)] transition-colors"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5 border-t border-[var(--color-border-glass)]">
              
              {/* When to use callout */}
              <div className="mt-4 flex items-start gap-3 p-4 rounded-lg bg-[var(--color-accent-emerald)]/5 border border-[var(--color-accent-emerald)]/20">
                <Lightbulb
                  size={16}
                  className="text-[var(--color-accent-emerald)] mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-emerald)] mb-1">
                    When to Use
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {pattern.whenToUse}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {pattern.description}
                </p>
              </div>

              {/* Code template with language tabs */}
              {pattern.template.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Template
                  </p>

                  {/* Language tabs */}
                  {pattern.template.length > 1 && (
                    <div className="flex items-center gap-1 mb-0 border-b border-[var(--color-border-glass)]">
                      {pattern.template.map((t, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveLang(i)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors ${
                            activeLang === i
                              ? "text-[var(--color-accent-violet)] bg-[var(--color-surface-elevated)] border border-b-0 border-[var(--color-border-glass)]"
                              : "text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          {t.language}
                        </button>
                      ))}
                    </div>
                  )}

                  <CodeBlock
                    code={pattern.template[activeLang]?.code ?? ""}
                    language={pattern.template[activeLang]?.language ?? "python"}
                    showLineNumbers={true}
                    explanation={pattern.template[activeLang]?.explanation}
                  />
                </div>
              )}

              {/* Dry run */}
              {pattern.dryRun && (
                <div className="relative pl-4 border-l-2 border-[var(--color-accent-cyan)]/40">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-cyan)] mb-1">
                    Dry Run
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {pattern.dryRun}
                  </p>
                </div>
              )}

              {/* Problems list */}
              {pattern.problems.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Practice Problems
                  </p>
                  <ul className="space-y-1.5">
                    {pattern.problems.map((prob, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-violet)]/60 flex-shrink-0" />
                        {prob}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
