'use client';

import { useState } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import NeonEditor from './NeonEditor';
import Button from './Button';
import { Play, Send, Star, AlertCircle, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function WorkspaceClient({ problem }: { problem: any }) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(problem.boilerplates?.find((b: any) => b.language === 'javascript')?.signatureCode || '// Write your solution here');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false); // Mock state for now

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
    <div className="flex h-full w-full">
      {/* LEFT PANE: Description */}
      <div className="w-1/2 bg-[#0b1120] border-r border-gray-800 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#0f172a] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white glow-text-cyan">{problem.title}</h2>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
              problem.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400' :
              problem.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
              'bg-red-900/50 text-red-400'
            }`}>
              {problem.difficulty}
            </span>
          </div>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-gray-500 hover:text-[var(--color-neon-purple)] transition-colors p-2"
          >
            <Star className={isBookmarked ? "text-[var(--color-neon-purple)] fill-[var(--color-neon-purple)] glow-purple" : ""} size={20} />
          </button>
        </div>
        <div className="p-6 prose prose-invert max-w-none text-gray-300">
          <ReactMarkdown>{problem.descriptionMarkdown || problem.description || ''}</ReactMarkdown>
        </div>
      </div>

      {/* RIGHT PANE: Code Editor & Terminal */}
      <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
        <PanelGroup orientation="vertical">
          {/* Top Right: Monaco Editor */}
          <Panel defaultSize={70} className="flex flex-col relative">
            <div className="h-12 bg-[#2d2d2d] flex items-center justify-between px-4">
              <select 
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setCode(problem.boilerplates?.find((b: any) => b.language === e.target.value)?.signatureCode || '// Write your solution here');
                }}
                className="bg-[#1e1e1e] text-gray-300 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-[var(--color-neon-cyan)]"
              >
                <option value="javascript">JavaScript (Node.js)</option>
                <option value="python">Python 3</option>
                <option value="cpp">C++</option>
              </select>

              <div className="flex gap-2">
                <Button variant="ghost" className="py-1 px-3 text-sm flex items-center gap-1" onClick={handleRun} disabled={isRunning}>
                  {isRunning ? <span className="animate-pulse">Running...</span> : <><Play size={14} /> Run Code</>}
                </Button>
                <Button variant="primary" className="py-1 px-3 text-sm flex items-center gap-1" disabled={isRunning} onClick={handleSubmit}>
                  <Send size={14} /> Submit
                </Button>
              </div>
            </div>
            
            <div className="flex-grow">
              <NeonEditor
                code={code}
                setCode={setCode}
                height="100%"
              />
            </div>
          </Panel>

          <PanelResizeHandle className="h-1.5 bg-gray-800 hover:bg-[var(--color-neon-purple)] hover:glow-purple transition-colors cursor-row-resize" />

          {/* Bottom Right: Terminal */}
          <Panel defaultSize={30} className="bg-[#0f172a] flex flex-col font-mono">
            <div className="px-4 py-2 border-b border-gray-800 bg-[#0f172a] text-gray-400 text-sm font-semibold flex items-center gap-2">
              <Terminal size={14} /> TEST CASES & TERMINAL
            </div>
            <div className="p-4 overflow-y-auto flex-grow text-gray-300 text-sm whitespace-pre-wrap">
              {isRunning && (
                <div className="flex items-center gap-2 text-[var(--color-neon-cyan)] glow-text-cyan mb-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-neon-cyan)] animate-ping" />
                  Uplink established. Executing logic...
                </div>
              )}
              {output || (
                <span className="text-gray-500">Run your code to see the test results here.</span>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
