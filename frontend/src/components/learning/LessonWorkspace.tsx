"use client";

import { useState } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import MonacoCodeEditor from '@/components/MonacoCodeEditor';
import { Play, Terminal, Bot, BookOpen, ChevronRight, CheckCircle2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrayVisualizer } from '@/components/visualizers/ArrayVisualizer';
import { GraphVisualizer } from '@/components/visualizers/GraphVisualizer';
import { SortingVisualizer } from '@/components/visualizers/SortingVisualizer';

interface LessonWorkspaceProps {
  topicId: string;
  lessonId: string;
}

export function LessonWorkspace({ topicId, lessonId }: LessonWorkspaceProps) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your implementation here\n\nfunction solve() {\n  \n}');
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'theory' | 'visualizer' | 'notes'>('visualizer');

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
          <div className="flex items-center gap-1 p-2 border-b border-[var(--color-border-glass)] bg-white/[0.02]">
            <button onClick={() => setActiveTab('theory')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'theory' ? 'bg-[var(--color-surface-elevated)] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
              <BookOpen size={16} /> Theory
            </button>
            <button onClick={() => setActiveTab('visualizer')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'visualizer' ? 'bg-[var(--color-surface-elevated)] text-[var(--color-accent-cyan)] shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
              <Play size={16} /> Interactive Visualizer
            </button>
            <button onClick={() => setActiveTab('notes')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'notes' ? 'bg-[var(--color-surface-elevated)] text-[var(--color-accent-emerald)] shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
              <FileText size={16} /> My Notes
            </button>
          </div>

          <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
            {activeTab === 'theory' && (
              <div className="prose prose-invert max-w-none">
                <h1>Understanding the Algorithm</h1>
                <p>This is a placeholder for the rich markdown content explaining the theory behind the algorithm. Real implementation would fetch this from a database or markdown file based on the topicId and lessonId.</p>
                <h3>Time Complexity</h3>
                <ul>
                  <li><strong>Best Case:</strong> O(1)</li>
                  <li><strong>Average Case:</strong> O(log N)</li>
                  <li><strong>Worst Case:</strong> O(N)</li>
                </ul>
              </div>
            )}
            {activeTab === 'visualizer' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                {renderVisualizer()}
              </div>
            )}
            {activeTab === 'notes' && (
              <div className="w-full h-full flex flex-col">
                <textarea 
                  className="flex-grow w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border-glass)] rounded-xl p-4 text-gray-300 resize-none focus:outline-none focus:border-[var(--color-accent-emerald)] font-mono text-sm" 
                  placeholder="Take your markdown notes here... They will be saved to your profile."
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
                
                <div className="flex-grow p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                  <div className="bg-[var(--color-surface-elevated)] p-3 rounded-lg rounded-tl-none self-start max-w-[85%] text-sm text-gray-300">
                    Hello! I'm your personal AI Tutor. I can help explain the current topic, simplify concepts, or generate a quick quiz. What would you like to know?
                  </div>
                </div>
                
                <div className="p-4 border-t border-[var(--color-border-glass)]">
                  <input 
                    type="text" 
                    placeholder="Ask 'Explain like I'm 10'..." 
                    className="w-full bg-[#101827] border border-[var(--color-border-glass)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent-violet)] text-white"
                  />
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
