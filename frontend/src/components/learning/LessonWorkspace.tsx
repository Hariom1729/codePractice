"use client";

import { useState } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import MonacoCodeEditor from '@/components/MonacoCodeEditor';
import { Play, Terminal, Bot, BookOpen, ChevronRight, CheckCircle2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrayVisualizer } from '@/components/visualizers/ArrayVisualizer';
import { GraphVisualizer } from '@/components/visualizers/GraphVisualizer';
import { SortingVisualizer } from '@/components/visualizers/SortingVisualizer';
import { AITutor } from '@/components/learning/AITutor';
import { InteractiveQuiz } from '@/components/learning/InteractiveQuiz';
import { ComplexityVisualizer } from '@/components/learning/ComplexityVisualizer';
import { RevisionSheet } from '@/components/learning/RevisionSheet';

interface LessonWorkspaceProps {
  topicId: string;
  lessonId: string;
}

export function LessonWorkspace({ topicId, lessonId }: LessonWorkspaceProps) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your implementation here\n\nfunction solve() {\n  \n}');
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'theory' | 'visualizer' | 'quiz' | 'cheatsheet'>('theory');

  const renderVisualizer = () => {
    if (topicId === 'arrays' || topicId === 'binary-search') return <ArrayVisualizer />;
    if (topicId === 'graphs' || topicId === 'trees') return <GraphVisualizer />;
    return <SortingVisualizer />; // Default
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-[var(--color-bg-obsidian)] text-white">
      <PanelGroup orientation="horizontal">
        
        {/* LEFT PANE: Theory & Visuals */}
        <Panel defaultSize={45} minSize={30} className="flex flex-col bg-[var(--color-surface-obsidian)] m-2 rounded-xl border border-[var(--color-border-glass)] overflow-hidden relative">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 p-2 border-b border-[var(--color-border-glass)] bg-white/[0.02] overflow-x-auto custom-scrollbar whitespace-nowrap">
            <button onClick={() => setActiveTab('theory')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 ${activeTab === 'theory' ? 'bg-[var(--color-surface-elevated)] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
              <BookOpen size={16} /> Theory & Complexity
            </button>
            <button onClick={() => setActiveTab('visualizer')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 ${activeTab === 'visualizer' ? 'bg-[var(--color-surface-elevated)] text-[var(--color-accent-cyan)] shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
              <Play size={16} /> Visualizer
            </button>
            <button onClick={() => setActiveTab('quiz')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 ${activeTab === 'quiz' ? 'bg-[var(--color-surface-elevated)] text-[var(--color-accent-emerald)] shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
              <CheckCircle2 size={16} /> Quiz
            </button>
            <button onClick={() => setActiveTab('cheatsheet')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 ${activeTab === 'cheatsheet' ? 'bg-[var(--color-surface-elevated)] text-orange-400 shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
              <FileText size={16} /> Cheat Sheet
            </button>
          </div>

          <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
            {activeTab === 'theory' && (
              <div className="max-w-none space-y-8">
                <div className="prose prose-invert">
                  <h1>Understanding Arrays</h1>
                  <p className="text-lg text-gray-300">An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.</p>
                  <p>This makes it easier to calculate the position of each element by simply adding an offset to a base value, i.e., the memory location of the first element of the array.</p>
                </div>
                <ComplexityVisualizer 
                  timeComplexity="1" 
                  spaceComplexity="n" 
                  explanation="Accessing an element is O(1) because elements are stored contiguously in memory. We just calculate the memory address: base_address + (index * size_of_element). However, space is O(n) where n is the number of elements." 
                />
              </div>
            )}
            {activeTab === 'visualizer' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                {renderVisualizer()}
              </div>
            )}
            {activeTab === 'quiz' && (
              <div className="w-full h-full flex flex-col pt-8">
                <InteractiveQuiz 
                  question="What is the time complexity of accessing an element in an array by its index?"
                  options={[
                    { id: 'a', text: 'O(1)' },
                    { id: 'b', text: 'O(log n)' },
                    { id: 'c', text: 'O(n)' },
                    { id: 'd', text: 'O(n^2)' }
                  ]}
                  correctAnswerId="a"
                  explanation="Arrays store elements contiguously in memory, which allows for O(1) direct access by calculating the memory address."
                />
              </div>
            )}
            {activeTab === 'cheatsheet' && (
              <div className="w-full h-full flex flex-col">
                <RevisionSheet 
                  topic="Arrays"
                  definitions={[
                    { term: "Contiguous Memory", definition: "Memory blocks placed consecutively side-by-side." },
                    { term: "Index", definition: "The numerical position of an element in the array." }
                  ]}
                  complexities={[
                    { operation: "Access", time: "1", space: "1" },
                    { operation: "Search", time: "n", space: "1" },
                    { operation: "Insertion", time: "n", space: "1" }
                  ]}
                  patterns={["Two Pointers", "Sliding Window", "Prefix Sum"]}
                  tips={[
                    "Always check for out of bounds errors.",
                    "Many array problems can be solved by sorting first.",
                    "If a problem requires O(n) time and O(1) space, consider Two Pointers."
                  ]}
                />
              </div>
            )}
          </div>
        </Panel>

        <PanelResizeHandle className="w-1.5 hover:bg-[var(--color-accent-indigo)] transition-colors cursor-col-resize rounded-full my-4" />

        {/* MIDDLE PANE: Code Playground */}
        <Panel minSize={30} className="flex flex-col m-2 rounded-xl overflow-hidden shadow-2xl">
          <PanelGroup orientation="vertical">
            <Panel defaultSize={70} minSize={30} className="flex flex-col relative border border-[var(--color-border-glass)] rounded-t-xl bg-[var(--color-surface-obsidian)]">
              <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--color-border-glass)] bg-white/[0.02]">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-[var(--color-surface-elevated)] text-gray-300 border border-[var(--color-border-glass)] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[var(--color-accent-blue)]"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
                <button className="px-6 py-1.5 flex items-center gap-2 bg-[var(--color-accent-emerald)]/20 text-[var(--color-accent-emerald)] border border-[var(--color-accent-emerald)]/50 rounded font-semibold hover:bg-[var(--color-accent-emerald)]/30 transition-colors">
                  <Play size={14} /> Run Code
                </button>
              </div>
              <div className="flex-grow relative">
                <MonacoCodeEditor code={code} setCode={setCode} language={language} />
              </div>
            </Panel>

            <PanelResizeHandle className="h-1.5 hover:bg-[var(--color-accent-blue)] transition-colors cursor-row-resize rounded-full mx-2" />

            <Panel defaultSize={30} minSize={15} className="flex flex-col border border-[var(--color-border-glass)] rounded-b-xl bg-[#080b13]">
              <div className="px-4 py-2 border-b border-[var(--color-border-glass)] bg-white/[0.02] text-gray-400 text-sm font-semibold flex items-center gap-2">
                <Terminal size={14} /> Output
              </div>
              <div className="p-4 overflow-y-auto custom-scrollbar flex-grow text-gray-300 text-sm whitespace-pre-wrap font-mono">
                <span className="text-gray-600">Execute code to see output...</span>
              </div>
            </Panel>
          </PanelGroup>
        </Panel>

        {aiPanelOpen ? <PanelResizeHandle className="w-1.5 hover:bg-[var(--color-accent-violet)] transition-colors cursor-col-resize rounded-full my-4" /> : null}

        {/* RIGHT PANE: AI Tutor */}
        <AnimatePresence initial={false}>
          {aiPanelOpen && (
            <Panel defaultSize={25} minSize={20} maxSize={35} className="flex flex-col bg-[var(--color-surface-obsidian)] m-2 rounded-xl border border-[var(--color-border-glass)] overflow-hidden relative">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col"
              >
                <div className="p-4 border-b border-[var(--color-border-glass)] flex justify-between items-center bg-gradient-to-r from-[var(--color-accent-violet)]/10 to-transparent">
                  <div className="flex items-center gap-2 text-[var(--color-accent-violet)]">
                    <Bot size={20} />
                    <h3 className="font-bold">AI Tutor</h3>
                  </div>
                  <button onClick={() => setAiPanelOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
                
                <div className="flex-grow p-0 overflow-y-auto custom-scrollbar flex flex-col">
                  <AITutor contextTopic={topicId} />
                </div>
              </motion.div>
            </Panel>
          )}
        </AnimatePresence>
      </PanelGroup>

      {!aiPanelOpen && (
        <button 
          onClick={() => setAiPanelOpen(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[var(--color-surface-obsidian)] border border-r-0 border-[var(--color-border-glass)] p-2 rounded-l-xl text-[var(--color-accent-violet)] hover:text-white hover:bg-[var(--color-accent-violet)] transition-colors z-10 shadow-lg"
        >
          <Bot size={20} />
        </button>
      )}
    </div>
  );
}
