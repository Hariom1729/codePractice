"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Search,
  ArrowUpDown,
  RotateCcw,
  Zap,
} from "lucide-react";

type CellState = "idle" | "active" | "found" | "comparing" | "swapping" | "deleted" | "new" | "shifting";

interface Cell {
  id: number;
  value: number;
  state: CellState;
}

type Operation = "none" | "insert" | "delete" | "search" | "sort";

const CELL_COLORS: Record<CellState, { bg: string; border: string; text: string; glow: string }> = {
  idle:      { bg: "bg-[#1a1a2e]",    border: "border-violet-800/40",   text: "text-gray-200",         glow: "" },
  active:    { bg: "bg-violet-600/20", border: "border-violet-500",      text: "text-violet-200",        glow: "shadow-[0_0_14px_rgba(139,92,246,0.5)]" },
  found:     { bg: "bg-emerald-600/20",border: "border-emerald-500",     text: "text-emerald-200",       glow: "shadow-[0_0_14px_rgba(16,185,129,0.5)]" },
  comparing: { bg: "bg-cyan-600/20",   border: "border-cyan-400",        text: "text-cyan-200",          glow: "shadow-[0_0_14px_rgba(6,182,212,0.4)]" },
  swapping:  { bg: "bg-orange-500/20", border: "border-orange-400",      text: "text-orange-200",        glow: "shadow-[0_0_14px_rgba(249,115,22,0.5)]" },
  deleted:   { bg: "bg-red-900/20",    border: "border-red-500/50",      text: "text-red-400 line-through opacity-50", glow: "" },
  new:       { bg: "bg-emerald-600/20",border: "border-emerald-400",     text: "text-emerald-200",       glow: "shadow-[0_0_20px_rgba(16,185,129,0.6)]" },
  shifting:  { bg: "bg-yellow-600/20", border: "border-yellow-400",      text: "text-yellow-200",        glow: "shadow-[0_0_12px_rgba(234,179,8,0.4)]" },
};

const INITIAL_VALUES = [12, 34, 7, 56, 23, 89, 45];
let idCounter = 100;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function ArrayVisualizer() {
  const [cells, setCells] = useState<Cell[]>(
    INITIAL_VALUES.map((v, i) => ({ id: i, value: v, state: "idle" }))
  );
  const [log, setLog] = useState<string[]>(["⚡ Array ready. Try an operation!"]);
  const [running, setRunning] = useState(false);
  const [activeOp, setActiveOp] = useState<Operation>("none");
  const [inputVal, setInputVal] = useState("");
  const [insertIdx, setInsertIdx] = useState("");
  const [speed] = useState(500);

  const addLog = (msg: string) => setLog((l) => [msg, ...l.slice(0, 5)]);

  const resetStates = useCallback((arr: Cell[]) =>
    arr.map((c) => ({ ...c, state: "idle" as CellState })), []);

  /* ─── ACCESS ─── */
  const handleAccess = useCallback(async () => {
    const idx = parseInt(inputVal);
    if (isNaN(idx) || idx < 0 || idx >= cells.length) {
      addLog(`❌ Index ${idx} out of bounds (0–${cells.length - 1})`);
      return;
    }
    setRunning(true);
    addLog(`🔍 Accessing index ${idx}...`);
    // Highlight path
    for (let i = 0; i <= idx; i++) {
      await sleep(speed * 0.4);
      setCells((prev) => prev.map((c, j) => ({
        ...c, state: j < i ? "idle" : j === i ? (i === idx ? "found" : "comparing") : "idle",
      })));
    }
    await sleep(speed);
    addLog(`✅ arr[${idx}] = ${cells[idx].value}  (O(1) — direct address jump)`);
    await sleep(speed * 1.5);
    setCells((prev) => resetStates(prev));
    setRunning(false);
  }, [cells, inputVal, speed, resetStates]);

  /* ─── LINEAR SEARCH ─── */
  const handleSearch = useCallback(async () => {
    const target = parseInt(inputVal);
    if (isNaN(target)) { addLog("❌ Enter a number to search"); return; }
    setRunning(true);
    setActiveOp("search");
    addLog(`🔍 Searching for ${target}...`);
    let found = -1;
    for (let i = 0; i < cells.length; i++) {
      setCells((prev) =>
        prev.map((c, j) => ({
          ...c,
          state: j < i ? "idle" : j === i ? "comparing" : "idle",
        }))
      );
      addLog(`  Checking index ${i}: arr[${i}] = ${cells[i].value}`);
      await sleep(speed);
      if (cells[i].value === target) {
        found = i;
        setCells((prev) =>
          prev.map((c, j) => ({ ...c, state: j === i ? "found" : "idle" }))
        );
        break;
      }
    }
    if (found === -1) {
      addLog(`❌ ${target} not found — checked all ${cells.length} elements (O(n))`);
      setCells((prev) => resetStates(prev));
    } else {
      addLog(`✅ Found ${target} at index ${found}! (O(n) worst case)`);
    }
    await sleep(speed * 2);
    setCells((prev) => resetStates(prev));
    setRunning(false);
    setActiveOp("none");
  }, [cells, inputVal, speed, resetStates]);

  /* ─── INSERT AT END ─── */
  const handleInsertEnd = useCallback(async () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { addLog("❌ Enter a value to insert"); return; }
    if (cells.length >= 12) { addLog("❌ Array is full (demo limit: 12)"); return; }
    setRunning(true);
    setActiveOp("insert");
    addLog(`➕ Inserting ${val} at end (O(1))...`);
    const newCell: Cell = { id: ++idCounter, value: val, state: "new" };
    setCells((prev) => [...prev, newCell]);
    await sleep(speed * 2);
    setCells((prev) => resetStates(prev));
    addLog(`✅ ${val} appended at index ${cells.length}. Instant — no shifting needed!`);
    setRunning(false);
    setActiveOp("none");
  }, [cells, inputVal, speed, resetStates]);

  /* ─── INSERT AT INDEX ─── */
  const handleInsertAt = useCallback(async () => {
    const val = parseInt(inputVal);
    const idx = parseInt(insertIdx);
    if (isNaN(val) || isNaN(idx)) { addLog("❌ Fill both Value and Index fields"); return; }
    if (idx < 0 || idx > cells.length) { addLog(`❌ Index must be 0–${cells.length}`); return; }
    if (cells.length >= 12) { addLog("❌ Array is full"); return; }
    setRunning(true);
    setActiveOp("insert");
    addLog(`➕ Inserting ${val} at index ${idx} — shifting ${cells.length - idx} elements right...`);

    // Animate shift right
    for (let i = cells.length - 1; i >= idx; i--) {
      setCells((prev) =>
        prev.map((c, j) => ({ ...c, state: j >= idx && j <= i ? "shifting" : "idle" }))
      );
      await sleep(speed * 0.5);
    }

    const newCells = [...cells];
    const newCell: Cell = { id: ++idCounter, value: val, state: "new" };
    newCells.splice(idx, 0, newCell);
    setCells(newCells);
    await sleep(speed * 1.5);
    setCells((prev) => resetStates(prev));
    addLog(`✅ ${val} inserted at ${idx}. Shifted ${cells.length - idx} elements (O(n)).`);
    setRunning(false);
    setActiveOp("none");
  }, [cells, inputVal, insertIdx, speed, resetStates]);

  /* ─── DELETE LAST ─── */
  const handleDeleteEnd = useCallback(async () => {
    if (cells.length === 0) { addLog("❌ Array is empty"); return; }
    setRunning(true);
    setActiveOp("delete");
    const last = cells[cells.length - 1];
    setCells((prev) =>
      prev.map((c, i) => ({ ...c, state: i === prev.length - 1 ? "deleted" : "idle" }))
    );
    addLog(`🗑 Marking arr[${cells.length - 1}] = ${last.value} for deletion (O(1))...`);
    await sleep(speed * 1.5);
    setCells((prev) => resetStates(prev.slice(0, -1)));
    addLog(`✅ Deleted ${last.value} from end. No shifting needed!`);
    setRunning(false);
    setActiveOp("none");
  }, [cells, speed, resetStates]);

  /* ─── BUBBLE SORT ─── */
  const handleBubbleSort = useCallback(async () => {
    setRunning(true);
    setActiveOp("sort");
    addLog("🔀 Starting Bubble Sort (O(n²))...");
    const arr = [...cells];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight comparing pair
        setCells(arr.map((c, idx) => ({
          ...c,
          state: idx === j || idx === j + 1 ? "comparing" : idx >= n - i ? "found" : "idle",
        })));
        await sleep(speed * 0.7);

        if (arr[j].value > arr[j + 1].value) {
          // Swap
          setCells(arr.map((c, idx) => ({
            ...c,
            state: idx === j || idx === j + 1 ? "swapping" : idx >= n - i ? "found" : "idle",
          })));
          await sleep(speed * 0.7);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setCells([...arr].map((c, idx) => ({
            ...c,
            state: idx === j || idx === j + 1 ? "swapping" : idx >= n - i ? "found" : "idle",
          })));
          await sleep(speed * 0.4);
        }
      }
      arr[n - 1 - i] = { ...arr[n - 1 - i], state: "found" };
    }
    setCells(arr.map((c) => ({ ...c, state: "found" })));
    addLog("✅ Array sorted! Each pass bubbled the largest to the right.");
    await sleep(speed * 2);
    setCells(arr.map((c) => ({ ...c, state: "idle" })));
    setRunning(false);
    setActiveOp("none");
  }, [cells, speed, resetStates]);

  /* ─── SELECTION SORT ─── */
  const handleSelectionSort = useCallback(async () => {
    setRunning(true);
    setActiveOp("sort");
    addLog("🔀 Starting Selection Sort (O(n²))...");
    const arr = [...cells];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      arr[i] = { ...arr[i], state: "comparing" };
      setCells([...arr]);

      for (let j = i + 1; j < n; j++) {
        arr[j] = { ...arr[j], state: "comparing" };
        setCells([...arr]);
        await sleep(speed * 0.7);

        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) arr[minIdx] = { ...arr[minIdx], state: "idle" };
          minIdx = j;
          arr[minIdx] = { ...arr[minIdx], state: "swapping" };
        } else {
          arr[j] = { ...arr[j], state: "idle" };
        }
        setCells([...arr]);
      }

      if (minIdx !== i) {
        arr[i] = { ...arr[i], state: "swapping" };
        setCells([...arr]);
        await sleep(speed * 0.7);
        
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setCells([...arr]);
        await sleep(speed * 0.4);
      }
      
      arr[i] = { ...arr[i], state: "found" };
      if (minIdx !== i) arr[minIdx] = { ...arr[minIdx], state: "idle" };
      setCells([...arr]);
    }
    
    arr[n - 1] = { ...arr[n - 1], state: "found" };
    setCells(arr.map((c) => ({ ...c, state: "found" })));
    addLog("✅ Selection Sort complete! Each pass found the minimum remaining element.");
    await sleep(speed * 2);
    setCells(arr.map((c) => ({ ...c, state: "idle" })));
    setRunning(false);
    setActiveOp("none");
  }, [cells, speed, resetStates]);

  /* ─── INSERTION SORT ─── */
  const handleInsertionSort = useCallback(async () => {
    setRunning(true);
    setActiveOp("sort");
    addLog("🔀 Starting Insertion Sort (O(n²))...");
    const arr = [...cells];
    const n = arr.length;

    arr[0] = { ...arr[0], state: "found" };
    setCells([...arr]);

    for (let i = 1; i < n; i++) {
      let key = arr[i].value;
      let j = i - 1;
      
      arr[i] = { ...arr[i], state: "active" };
      setCells([...arr]);
      await sleep(speed * 0.7);

      while (j >= 0 && arr[j].value > key) {
        arr[j] = { ...arr[j], state: "comparing" };
        setCells([...arr]);
        await sleep(speed * 0.7);
        
        arr[j + 1].value = arr[j].value;
        arr[j + 1] = { ...arr[j + 1], state: "shifting" };
        arr[j] = { ...arr[j], state: "idle" }; // Will be overwritten or filled
        setCells([...arr]);
        await sleep(speed * 0.4);
        
        arr[j + 1] = { ...arr[j + 1], state: "found" };
        j = j - 1;
      }
      
      // We need to preserve the ID of the cell we overwrite so framer motion layout doesn't break entirely,
      // but modifying value is fine.
      arr[j + 1].value = key;
      arr[j + 1] = { ...arr[j + 1], state: "new" };
      setCells([...arr]);
      await sleep(speed * 0.7);
      
      for(let k = 0; k <= i; k++) {
         arr[k] = { ...arr[k], state: "found" };
      }
      setCells([...arr]);
    }

    addLog("✅ Insertion Sort complete! Elements were shifted to make room for the current item.");
    await sleep(speed * 2);
    setCells(arr.map((c) => ({ ...c, state: "idle" })));
    setRunning(false);
    setActiveOp("none");
  }, [cells, speed, resetStates]);

  /* ─── RESET ─── */
  const handleReset = () => {
    setCells(INITIAL_VALUES.map((v, i) => ({ id: i, value: v, state: "idle" })));
    setLog(["🔄 Array reset to original state."]);
    setInputVal("");
    setInsertIdx("");
    setRunning(false);
    setActiveOp("none");
  };

  const BtnBase = "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="my-6 rounded-2xl border border-violet-800/30 bg-[#0e0e16] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[#12121e]">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-violet-400" />
          <span className="text-sm font-bold text-white">Interactive Array Visualizer</span>
        </div>
        <button
          onClick={handleReset}
          disabled={running}
          className={`${BtnBase} text-gray-400 hover:text-white hover:bg-white/[0.06]`}
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Array display */}
      <div className="px-5 py-6 overflow-x-auto">
        <div className="flex items-end gap-2 min-w-max">
          <AnimatePresence mode="popLayout">
            {cells.map((cell, idx) => {
              const style = CELL_COLORS[cell.state];
              return (
                <motion.div
                  key={cell.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="flex flex-col items-center gap-1"
                >
                  {/* Cell box */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 font-bold font-mono text-sm transition-all duration-300 ${style.bg} ${style.border} ${style.text} ${style.glow}`}
                  >
                    {cell.value}
                  </div>
                  {/* Index label */}
                  <span className="text-[10px] font-mono text-cyan-500/70">[{idx}]</span>
                  {/* Address label */}
                  <span className="text-[8px] font-mono text-gray-600">
                    {(1000 + idx * 4).toString(16).toUpperCase()}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty slots indicator */}
          {cells.length < 12 && (
            <div className="flex items-center gap-1 ml-1">
              {Array.from({ length: Math.min(2, 12 - cells.length) }).map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-xl border-2 border-dashed border-white/[0.08] flex items-center justify-center"
                >
                  <span className="text-gray-700 text-xs">·</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          {[
            { state: "comparing", label: "Comparing" },
            { state: "swapping",  label: "Swapping" },
            { state: "found",     label: "Found / Sorted" },
            { state: "shifting",  label: "Shifting" },
            { state: "new",       label: "Inserted" },
          ].map(({ state, label }) => {
            const s = CELL_COLORS[state as CellState];
            return (
              <div key={state} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm border ${s.border} ${s.bg}`} />
                <span className="text-[10px] text-gray-500">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 pb-5 space-y-3">
        {/* Input row */}
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="number"
            placeholder="Value / Index to find"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={running}
            className="w-44 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-violet-500/60 disabled:opacity-40"
          />
          <input
            type="number"
            placeholder="Insert at index (optional)"
            value={insertIdx}
            onChange={(e) => setInsertIdx(e.target.value)}
            disabled={running}
            className="w-52 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-violet-500/60 disabled:opacity-40"
          />
        </div>

        {/* Operation buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleSearch}
            disabled={running}
            className={`${BtnBase} bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/30`}
          >
            <Search size={12} /> Linear Search
          </button>
          <button
            onClick={handleAccess}
            disabled={running}
            className={`${BtnBase} bg-violet-600/20 border border-violet-500/40 text-violet-300 hover:bg-violet-600/30`}
          >
            <Zap size={12} /> Access [i]
          </button>
          <button
            onClick={handleInsertEnd}
            disabled={running}
            className={`${BtnBase} bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30`}
          >
            <Plus size={12} /> Insert End
          </button>
          <button
            onClick={handleInsertAt}
            disabled={running || !insertIdx}
            className={`${BtnBase} bg-yellow-600/20 border border-yellow-500/40 text-yellow-300 hover:bg-yellow-600/30`}
          >
            <Plus size={12} /> Insert at Index
          </button>
          <button
            onClick={handleDeleteEnd}
            disabled={running || cells.length === 0}
            className={`${BtnBase} bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/30`}
          >
            <Trash2 size={12} /> Delete End
          </button>
          <button
            onClick={handleBubbleSort}
            disabled={running}
            className={`${BtnBase} bg-orange-600/20 border border-orange-500/40 text-orange-300 hover:bg-orange-600/30`}
          >
            <ArrowUpDown size={12} /> Bubble
          </button>
          <button
            onClick={handleSelectionSort}
            disabled={running}
            className={`${BtnBase} bg-orange-600/20 border border-orange-500/40 text-orange-300 hover:bg-orange-600/30`}
          >
            <ArrowUpDown size={12} /> Selection
          </button>
          <button
            onClick={handleInsertionSort}
            disabled={running}
            className={`${BtnBase} bg-orange-600/20 border border-orange-500/40 text-orange-300 hover:bg-orange-600/30`}
          >
            <ArrowUpDown size={12} /> Insertion
          </button>
        </div>
      </div>

      {/* Log panel */}
      <div className="border-t border-white/[0.05] bg-[#0a0a12] px-5 py-3 font-mono">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Operation Log</p>
        <AnimatePresence>
          {log.map((entry, i) => (
            <motion.p
              key={entry + i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1 - i * 0.18, x: 0 }}
              className="text-xs leading-relaxed"
              style={{ color: i === 0 ? "#c4b5fd" : "#4b5563" }}
            >
              {entry}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
