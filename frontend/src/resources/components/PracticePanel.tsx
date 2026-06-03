"use client";

import { AITutor } from "@/components/learning/AITutor";
import { BookOpen, Layers, TrendingUp } from "lucide-react";

interface PracticePanelProps {
  topicId: string;
  totalSections: number;
  completedCount: number;
  topicTitle: string;
}

// SVG circular progress ring
function ProgressRing({
  radius,
  stroke,
  progress,
}: {
  radius: number;
  stroke: number;
  progress: number; // 0–100
}) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="-rotate-90">
      {/* Track */}
      <circle
        stroke="rgba(255,255,255,0.06)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Progress */}
      <circle
        stroke="url(#ringGradient)"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          strokeDashoffset,
          transition: "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-accent-violet)" />
          <stop offset="100%" stopColor="var(--color-accent-cyan)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PracticePanel({
  topicId,
  totalSections,
  completedCount,
  topicTitle,
}: PracticePanelProps) {
  const pct =
    totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  // Rough estimate: average 10 min per section
  const totalMinutes = totalSections * 10;
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const timeLabel =
    totalHours > 0
      ? `${totalHours}h ${totalMins}m`
      : `${totalMinutes}m`;

  return (
    <aside
      className="flex flex-col w-[300px] h-full bg-[var(--color-surface-obsidian)] border-l border-[var(--color-border-glass)] overflow-y-auto custom-scrollbar flex-shrink-0"
      aria-label="Practice panel"
    >
      <div className="p-4 space-y-4">
        {/* Progress card */}
        <div className="rounded-xl border border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)] p-4">
          <div className="flex items-center gap-4">
            {/* Ring */}
            <div className="relative flex-shrink-0">
              <ProgressRing radius={44} stroke={6} progress={pct} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{pct}%</span>
              </div>
            </div>

            {/* Topic info */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
                Topic Progress
              </p>
              <p className="text-sm font-bold text-white leading-snug line-clamp-2">
                {topicTitle}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {completedCount}/{totalSections} sections
              </p>
            </div>
          </div>
        </div>

        {/* Stats card */}
        <div className="rounded-xl border border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-border-glass)]">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              Quick Stats
            </p>
          </div>

          <div className="divide-y divide-[var(--color-border-glass)]">
            {/* Total sections */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-blue)]/10 border border-[var(--color-accent-blue)]/20 flex items-center justify-center flex-shrink-0">
                <Layers size={13} className="text-[var(--color-accent-blue)]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Total Sections</p>
              </div>
              <span className="text-sm font-bold text-white">{totalSections}</span>
            </div>

            {/* Estimated time */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-emerald)]/10 border border-[var(--color-accent-emerald)]/20 flex items-center justify-center flex-shrink-0">
                <BookOpen size={13} className="text-[var(--color-accent-emerald)]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Est. Read Time</p>
              </div>
              <span className="text-sm font-bold text-white">{timeLabel}</span>
            </div>

            {/* Your progress */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-violet)]/10 border border-[var(--color-accent-violet)]/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={13} className="text-[var(--color-accent-violet)]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Your Progress</p>
              </div>
              <span className="text-sm font-bold text-white">{completedCount} done</span>
            </div>
          </div>
        </div>

        {/* AI Tutor */}
        <div className="rounded-xl border border-[var(--color-border-glass)] overflow-hidden" style={{ height: "420px" }}>
          <AITutor contextTopic={topicTitle || topicId} />
        </div>
      </div>
    </aside>
  );
}
