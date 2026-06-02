'use client';

import { useState } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import MonacoCodeEditor from './MonacoCodeEditor';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { Play, Send, Star, Terminal, Bot, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkspaceClient({ problem }: { problem: any }) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(problem.boilerplates?.find((b: any) => b.language === 'javascript')?.signatureCode || '// Write your solution here');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and executing in Sandbox...');
    
    try {
      const res = await fetch('http://localhost:5001/api/execute/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, problemId: problem._id }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setOutput(data.output || 'Execution finished with no output.');
      } else {
        setOutput(`Error: ${data.error || 'Execution failed.'}`);
      }
    } catch (err) {
      setOutput('Failed to connect to the execution environment.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setOutput('Running all hidden test cases...');
    
    try {
      const res = await fetch('http://localhost:5001/api/execute/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, problemId: problem._id }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        if (data.success) {
          setOutput(`🎉 ${data.message}\nTotal Tests Passed: ${data.totalTestCases}`);
        } else {
          setOutput(`❌ ${data.message}\nFailed Case: ${data.failedCase || 'Unknown'}\nExpected: ${data.expected || ''}\nActual: ${data.actual || ''}\n${data.error || ''}`);
        }
      } else {
        setOutput(`Error: ${data.error || 'Execution failed.'}`);
      }
    } catch (err) {
      setOutput('Failed to connect to the execution environment.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex h-full w-full bg-[var(--color-bg-obsidian)] text-white">
      <PanelGroup orientation="horizontal">
        
        {/* LEFT PANE: Problem Statement */}
        <Panel defaultSize={40} minSize={25} className="flex flex-col bg-[var(--color-surface-obsidian)] m-2 rounded-xl border border-[var(--color-border-glass)] overflow-hidden relative">
          <div className="p-4 border-b border-[var(--color-border-glass)] flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{problem.title}</h2>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {problem.difficulty}
              </span>
            </div>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="text-gray-500 hover:text-yellow-400 transition-colors p-2"
            >
              <Star className={isBookmarked ? "text-yellow-400 fill-yellow-400" : ""} size={20} />
            </button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto custom-scrollbar prose prose-invert max-w-none text-gray-300">
            <ReactMarkdown>{problem.descriptionMarkdown || problem.description || ''}</ReactMarkdown>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1.5 hover:bg-[var(--color-accent-indigo)] transition-colors cursor-col-resize rounded-full my-4" />

        {/* MIDDLE PANE: Editor & Terminal */}
        <Panel minSize={30} className="flex flex-col m-2 rounded-xl overflow-hidden shadow-2xl">
          <PanelGroup orientation="vertical">
            
            {/* Top Right: Monaco Editor */}
            <Panel defaultSize={70} minSize={30} className="flex flex-col relative border border-[var(--color-border-glass)] rounded-t-xl bg-[var(--color-surface-obsidian)]">
              <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--color-border-glass)] bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <select 
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      setCode(problem.boilerplates?.find((b: any) => b.language === e.target.value)?.signatureCode || '// Write your solution here');
                    }}
                    className="bg-[var(--color-surface-elevated)] text-gray-300 border border-[var(--color-border-glass)] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[var(--color-accent-blue)]"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python 3</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleRun} disabled={isRunning} className="px-4 py-1.5 text-sm rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border-glass)] hover:bg-white/10 transition-colors flex items-center gap-2">
                    {isRunning ? <span className="animate-pulse">Running...</span> : <><Play size={14} /> Run</>}
                  </button>
                  <PremiumButton onClick={handleSubmit} className="px-6 py-1.5 flex items-center gap-2">
                    <Send size={14} /> Submit
                  </PremiumButton>
                </div>
              </div>
              
              <div className="flex-grow relative">
                <MonacoCodeEditor code={code} setCode={setCode} language={language} />
              </div>
            </Panel>

            <PanelResizeHandle className="h-1.5 hover:bg-[var(--color-accent-blue)] transition-colors cursor-row-resize rounded-full mx-2" />

            {/* Bottom Right: Terminal */}
            <Panel defaultSize={30} minSize={15} className="flex flex-col border border-[var(--color-border-glass)] rounded-b-xl bg-[#080b13]">
              <div className="px-4 py-2 border-b border-[var(--color-border-glass)] bg-white/[0.02] text-gray-400 text-sm font-semibold flex items-center gap-2">
                <Terminal size={14} /> Console Output
              </div>
              <div className="p-4 overflow-y-auto custom-scrollbar flex-grow text-gray-300 text-sm whitespace-pre-wrap font-mono">
                {isRunning && (
                  <div className="flex items-center gap-2 text-[var(--color-accent-cyan)] mb-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent-cyan)] animate-ping" />
                    Executing in sandbox...
                  </div>
                )}
                {output || (
                  <span className="text-gray-600">Run your code to see the test results here.</span>
                )}
              </div>
            </Panel>
          </PanelGroup>
        </Panel>

        {/* RIGHT PANE: Collapsible AI Coach */}
        {aiPanelOpen ? <PanelResizeHandle className="w-1.5 hover:bg-[var(--color-accent-violet)] transition-colors cursor-col-resize rounded-full my-4" /> : null}

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
                    <h3 className="font-bold">AI Coach</h3>
                  </div>
                  <button onClick={() => setAiPanelOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
                
                <div className="flex-grow p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                  <div className="bg-[var(--color-accent-violet)]/10 border border-[var(--color-accent-violet)]/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-300">
                      I'm analyzing your sliding window approach. You're currently using an O(n^2) nested loop. Try using a `left` and `right` pointer to achieve O(n) time complexity.
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-sm text-[var(--color-accent-cyan)] hover:text-white transition-colors p-2 bg-white/5 rounded-lg w-full">
                    <Lightbulb size={14} /> Explain optimal approach
                  </button>
                </div>
                
                <div className="p-4 border-t border-[var(--color-border-glass)]">
                  <input 
                    type="text" 
                    placeholder="Ask AI Coach a question..." 
                    className="w-full bg-[#101827] border border-[var(--color-border-glass)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-accent-violet)] text-white"
                  />
                </div>
              </motion.div>
            </Panel>
          )}
        </AnimatePresence>

      </PanelGroup>

      {/* Toggle Button for AI Coach when closed */}
      {!aiPanelOpen && (
        <button 
          onClick={() => setAiPanelOpen(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[var(--color-surface-obsidian)] border border-r-0 border-[var(--color-border-glass)] p-2 rounded-l-xl text-gray-400 hover:text-[var(--color-accent-violet)] transition-colors z-10"
        >
          <Bot size={20} />
        </button>
      )}
    </div>
  );
}
