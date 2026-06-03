"use client";

interface ComplexityRow {
  operation: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  notes: string;
}

interface ComplexityTableProps {
  rows: ComplexityRow[];
  title?: string;
}

type ComplexityClass =
  | "O(1)"
  | "O(log n)"
  | "O(n)"
  | "O(n log n)"
  | "O(n²)"
  | "O(2^n)"
  | "O(n!)"
  | string;

const complexityStyle = (
  val: ComplexityClass
): { badge: string; text: string; bg: string } => {
  const v = val.trim();
  if (v === "O(1)")
    return {
      badge: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25",
      text: "text-emerald-300",
      bg: "bg-emerald-500/5",
    };
  if (v === "O(log n)" || v === "O(log n)" || v.includes("log"))
    return {
      badge: "text-cyan-300 bg-cyan-500/15 border-cyan-500/25",
      text: "text-cyan-300",
      bg: "bg-cyan-500/5",
    };
  if (v === "O(n)")
    return {
      badge: "text-yellow-300 bg-yellow-500/15 border-yellow-500/25",
      text: "text-yellow-300",
      bg: "bg-yellow-500/5",
    };
  if (v === "O(n log n)" || (v.includes("n") && v.includes("log")))
    return {
      badge: "text-orange-300 bg-orange-500/15 border-orange-500/25",
      text: "text-orange-300",
      bg: "bg-orange-500/5",
    };
  if (v === "O(n²)" || v === "O(n^2)" || v.includes("²"))
    return {
      badge: "text-red-300 bg-red-500/15 border-red-500/25",
      text: "text-red-300",
      bg: "bg-red-500/5",
    };
  if (v.includes("2^n") || v.includes("n!"))
    return {
      badge: "text-rose-300 bg-rose-500/15 border-rose-500/25",
      text: "text-rose-300",
      bg: "bg-rose-500/5",
    };
  return {
    badge: "text-gray-300 bg-gray-500/15 border-gray-500/25",
    text: "text-gray-300",
    bg: "bg-gray-500/5",
  };
};

function ComplexityBadge({ value }: { value: string }) {
  const style = complexityStyle(value);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold font-mono border ${style.badge}`}
    >
      {value}
    </span>
  );
}

const HEADERS = ["Operation", "Best", "Average", "Worst", "Space", "Notes"];

export function ComplexityTable({ rows, title }: ComplexityTableProps) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-[var(--color-border-glass)] shadow-2xl">
      {title && (
        <div className="px-5 py-3 bg-gradient-to-r from-[var(--color-surface-elevated)] to-[var(--color-surface-obsidian)] border-b border-[var(--color-border-glass)] flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-[var(--color-accent-violet)]" />
          <h3 className="text-sm font-bold text-white tracking-wide">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          {/* Header */}
          <thead>
            <tr className="bg-gradient-to-r from-[var(--color-surface-elevated)]/80 to-[var(--color-surface-obsidian)]/80">
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-[var(--color-border-glass)] whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={`
                  border-b border-[var(--color-border-glass)] last:border-0 
                  transition-colors duration-150 group
                  ${idx % 2 === 0
                    ? "bg-[var(--color-surface-obsidian)]/30"
                    : "bg-[var(--color-surface-elevated)]/10"
                  }
                  hover:bg-[var(--color-accent-violet)]/5
                `}
              >
                {/* Operation */}
                <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                  {row.operation}
                </td>

                {/* Best */}
                <td className="px-4 py-3">
                  <ComplexityBadge value={row.best} />
                </td>

                {/* Average */}
                <td className="px-4 py-3">
                  <ComplexityBadge value={row.average} />
                </td>

                {/* Worst */}
                <td className="px-4 py-3">
                  <ComplexityBadge value={row.worst} />
                </td>

                {/* Space */}
                <td className="px-4 py-3">
                  <ComplexityBadge value={row.space} />
                </td>

                {/* Notes */}
                <td className="px-4 py-3 text-gray-400 italic text-xs leading-relaxed max-w-[200px]">
                  {row.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
