"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu, X, PanelRight } from "lucide-react";
import { SectionNav } from "./SectionNav";
import { ContentRenderer } from "./ContentRenderer";
import { PracticePanel } from "./PracticePanel";

interface LessonReaderProps {
  topicId: string;
  topicContent: any; // TopicContent from content/index.ts
}

export function LessonReader({ topicId, topicContent }: LessonReaderProps) {
  const sections: any[] = topicContent?.sections ?? [];
  const topicTitle: string = topicContent?.title ?? topicId;

  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id ?? ""
  );
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Mobile panel toggles
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Scroll main content to top on section change
  const mainRef = useRef<HTMLDivElement>(null);

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const currentSection = sections[currentIndex] ?? null;

  const goToSection = useCallback(
    (id: string) => {
      setActiveSection(id);
      setSidebarOpen(false);
      // Scroll to top
      setTimeout(() => {
        mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    },
    []
  );

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    goToSection(sections[currentIndex - 1].id);
  };

  const handleNext = () => {
    if (currentIndex >= sections.length - 1) return;
    // Mark current as completed
    if (!completedSections.includes(activeSection)) {
      setCompletedSections((prev) => [...prev, activeSection]);
    }
    goToSection(sections[currentIndex + 1].id);
  };

  // Build section nav data
  const navSections = sections.map((s) => ({
    id: s.id,
    title: s.title,
    icon: s.icon ?? "📄",
    estimatedTime: s.estimatedTime ?? "10 min",
  }));

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < sections.length - 1;

  return (
    <div className="flex h-screen w-full bg-[var(--color-bg-obsidian)] text-white overflow-hidden">
      {/* ── MOBILE: Sidebar overlay ────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key="sidebar-drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 bottom-0 z-40 lg:hidden"
            >
              <SectionNav
                sections={navSections}
                activeSection={activeSection}
                completedSections={completedSections}
                onSectionChange={goToSection}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MOBILE: Right panel overlay ─────────────────── */}
      <AnimatePresence>
        {rightPanelOpen && (
          <>
            <motion.div
              key="right-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
              onClick={() => setRightPanelOpen(false)}
            />
            <motion.div
              key="right-drawer"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-40 lg:hidden"
            >
              <PracticePanel
                topicId={topicId}
                totalSections={sections.length}
                completedCount={completedSections.length}
                topicTitle={topicTitle}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── DESKTOP: Left sidebar ──────────────────────── */}
      <div className="hidden lg:flex flex-shrink-0">
        <SectionNav
          sections={navSections}
          activeSection={activeSection}
          completedSections={completedSections}
          onSectionChange={goToSection}
        />
      </div>

      {/* ── MAIN content area ─────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (mobile only) */}
        <div className="flex lg:hidden items-center justify-between px-4 py-3 border-b border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)]/90 backdrop-blur-md flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/[0.05] text-gray-400 hover:text-white transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-white truncate mx-3">
            {currentSection?.title ?? topicTitle}
          </span>
          <button
            onClick={() => setRightPanelOpen(true)}
            className="p-2 rounded-lg hover:bg-white/[0.05] text-gray-400 hover:text-white transition-colors"
            aria-label="Open practice panel"
          >
            <PanelRight size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div
          ref={mainRef}
          className="flex-1 overflow-y-auto custom-scrollbar"
        >
          <div className="px-6 py-8 pb-4">
            <AnimatePresence mode="wait">
              <ContentRenderer
                key={activeSection}
                section={currentSection}
                topicId={topicId}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom navigation bar */}
        <div className="flex-shrink-0 border-t border-[var(--color-border-glass)] bg-[var(--color-surface-obsidian)]/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Previous */}
            <motion.button
              whileHover={hasPrev ? { scale: 1.05 } : {}}
              whileTap={hasPrev ? { scale: 0.95 } : {}}
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                hasPrev
                  ? "text-gray-300 hover:text-white hover:bg-white/[0.06] border border-[var(--color-border-glass)] hover:border-white/10"
                  : "text-gray-700 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Previous Section</span>
              <span className="sm:hidden">Prev</span>
            </motion.button>

            {/* Progress counter */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-semibold text-gray-400">
                Section {currentIndex + 1} of {sections.length}
              </span>
              {/* Mini progress bar */}
              <div className="w-24 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-cyan)] transition-all duration-500"
                  style={{
                    width: sections.length > 0
                      ? `${((currentIndex + 1) / sections.length) * 100}%`
                      : "0%",
                  }}
                />
              </div>
            </div>

            {/* Next */}
            <motion.button
              whileHover={hasNext ? { scale: 1.05 } : {}}
              whileTap={hasNext ? { scale: 0.95 } : {}}
              onClick={handleNext}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                hasNext
                  ? "text-white bg-[var(--color-accent-violet)] hover:bg-[var(--color-accent-violet)]/80 shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                  : "text-gray-700 cursor-not-allowed bg-transparent border border-[var(--color-border-glass)]"
              }`}
            >
              <span className="hidden sm:inline">Next Section</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </main>

      {/* ── DESKTOP: Right panel ─────────────────────── */}
      <div className="hidden lg:flex flex-shrink-0">
        <PracticePanel
          topicId={topicId}
          totalSections={sections.length}
          completedCount={completedSections.length}
          topicTitle={topicTitle}
        />
      </div>
    </div>
  );
}
