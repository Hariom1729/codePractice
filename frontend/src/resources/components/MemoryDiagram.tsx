"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MemoryDiagramProps {
  elements: string[];
  startAddress: number;
  elementSize: number;
  label: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const boxVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

export function MemoryDiagram({
  elements,
  startAddress,
  elementSize,
  label,
}: MemoryDiagramProps) {
  const baseHex = startAddress.toString(16).toUpperCase().padStart(4, "0");

  return (
    <div className="my-6 p-5 rounded-xl border border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)]/50">
      {/* Label */}
      <p
        className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5"
        style={{ fontVariant: "small-caps" }}
      >
        {label}
      </p>

      {/* Diagram scroll container */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-start gap-0 min-w-max">
          {/* Base address arrow */}
          <div className="flex flex-col items-center justify-center mr-2 mt-1">
            <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap mb-1">
              <span>Base</span>
            </div>
            <ArrowRight
              size={18}
              className="text-[var(--color-accent-violet)] flex-shrink-0"
            />
          </div>

          {/* Boxes */}
          <motion.div
            className="flex items-start gap-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {elements.map((el, i) => {
              const addr = startAddress + i * elementSize;
              const addrHex = `0x${addr.toString(16).toUpperCase().padStart(4, "0")}`;

              return (
                <motion.div
                  key={i}
                  variants={boxVariants}
                  className="group flex flex-col items-center"
                >
                  {/* The box */}
                  <div
                    className={`
                      relative w-16 h-14 flex items-center justify-center
                      border border-[var(--color-accent-violet)]/30
                      bg-[var(--color-surface-elevated)]
                      text-white text-base font-bold font-mono
                      transition-all duration-200 cursor-default
                      group-hover:border-[var(--color-accent-violet)]/80
                      group-hover:bg-[var(--color-accent-violet)]/10
                      group-hover:shadow-[0_0_18px_rgba(139,92,246,0.25)]
                      ${i === 0 ? "rounded-l-lg" : ""}
                      ${i === elements.length - 1 ? "rounded-r-lg" : ""}
                      ${i > 0 ? "-ml-px" : ""}
                    `}
                  >
                    {el}
                  </div>

                  {/* Index */}
                  <span className="mt-1.5 text-[10px] font-mono font-semibold text-[var(--color-accent-cyan)]">
                    [{i}]
                  </span>

                  {/* Address */}
                  <span className="mt-0.5 text-[9px] font-mono text-gray-500 whitespace-nowrap">
                    {addrHex}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Formula callout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: elements.length * 0.08 + 0.2 }}
        className="mt-5 flex items-start gap-3 p-4 rounded-lg bg-[var(--color-surface-elevated)]/60 border border-[var(--color-accent-indigo)]/20"
      >
        <div className="w-1 h-full min-h-[2rem] rounded-full bg-[var(--color-accent-indigo)] flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">
            Address Formula
          </p>
          <code className="text-sm font-mono text-white">
            address(i) = 0x{baseHex} + i × {elementSize}
          </code>
          <p className="text-xs text-gray-500 mt-1">
            Each element occupies {elementSize} byte{elementSize !== 1 ? "s" : ""} of contiguous memory
          </p>
        </div>
      </motion.div>
    </div>
  );
}
