"use client";

import { Check, Clock } from "lucide-react";

interface SectionNavItem {
  id: string;
  title: string;
  icon: string;
  estimatedTime: string;
}

interface SectionNavProps {
  sections: SectionNavItem[];
  activeSection: string;
  completedSections: string[];
  onSectionChange: (id: string) => void;
}

export function SectionNav({
  sections,
  activeSection,
  completedSections,
  onSectionChange,
}: SectionNavProps) {
  const completedCount = completedSections.length;
  const total = sections.length;
  const progressPct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const allDone = completedCount === total && total > 0;

  return (
    <aside
      className="flex flex-col w-[260px] h-full bg-[var(--color-surface-obsidian)] border-r border-[var(--color-border-glass)] flex-shrink-0"
      aria-label="Section navigation"
    >
      {/* Topic header */}
      <div className="px-4 pt-5 pb-4 border-b border-[var(--color-border-glass)]">
        <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 font-semibold mb-2">
          Progress
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-1">
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-indigo)] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[var(--color-accent-violet)] min-w-[32px] text-right">
            {progressPct}%
          </span>
        </div>

        <p className="text-xs text-gray-500">
          {completedCount} of {total} sections complete
        </p>
      </div>

      {/* Section list */}
      <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        <ul className="space-y-0.5 px-2">
          {sections.map((section) => {
            const isActive = section.id === activeSection;
            const isCompleted = completedSections.includes(section.id);

            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`
                    w-full flex items-start gap-3 px-3 py-2.5 rounded-lg
                    text-left transition-all duration-200 group relative
                    ${isActive
                      ? "bg-[var(--color-accent-violet)]/10 border-l-2 border-l-[var(--color-accent-violet)] -ml-0.5 pl-3.5"
                      : "hover:bg-white/[0.04] border-l-2 border-l-transparent"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Icon */}
                  <span
                    className={`text-base flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    }`}
                    aria-hidden="true"
                  >
                    {section.icon}
                  </span>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium leading-snug truncate ${
                        isActive
                          ? "text-[var(--color-accent-violet)]"
                          : isCompleted
                          ? "text-gray-400"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {section.title}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={9} className="text-gray-600 flex-shrink-0" />
                      <span className="text-[10px] text-gray-600">
                        {section.estimatedTime}
                      </span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  {isCompleted && (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-accent-emerald)]/15 border border-[var(--color-accent-emerald)]/30 flex items-center justify-center mt-0.5">
                      <Check
                        size={11}
                        className="text-[var(--color-accent-emerald)]"
                        strokeWidth={2.5}
                      />
                    </div>
                  )}

                  {/* Active dot */}
                  {isActive && !isCompleted && (
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-accent-violet)] animate-pulse mt-1.5" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* All done celebration */}
      {allDone && (
        <div className="px-4 py-3 m-3 rounded-xl bg-gradient-to-br from-[var(--color-accent-emerald)]/10 to-[var(--color-accent-cyan)]/5 border border-[var(--color-accent-emerald)]/20 text-center">
          <p className="text-lg mb-0.5">🎉</p>
          <p className="text-xs font-bold text-[var(--color-accent-emerald)]">
            All Sections Complete!
          </p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            Amazing work — you&apos;ve mastered this topic!
          </p>
        </div>
      )}
    </aside>
  );
}
