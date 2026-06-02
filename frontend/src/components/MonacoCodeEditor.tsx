"use client";

import React from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

interface MonacoCodeEditorProps {
  code: string;
  setCode: (val: string) => void;
  language?: string;
  height?: string;
}

export default function MonacoCodeEditor({ code, setCode, language = 'javascript', height = '100%' }: MonacoCodeEditorProps) {
  const monaco = useMonaco();

  React.useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('cinematic-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: '8b5cf6' }, // accent-violet
          { token: 'string', foreground: '10b981' }, // accent-emerald
          { token: 'number', foreground: '06b6d4' }, // accent-cyan
          { token: 'comment', foreground: '64748b', fontStyle: 'italic' }, 
          { token: 'type', foreground: '3b82f6' }, // accent-blue
        ],
        colors: {
          'editor.background': '#0B1020', // surface-obsidian
          'editor.foreground': '#f8fafc',
          'editor.lineHighlightBackground': '#10182750', // surface-elevated
          'editorLineNumber.foreground': '#475569',
          'editorIndentGuide.background': '#1e293b',
          'editorIndentGuide.activeBackground': '#334155',
          'scrollbarSlider.background': '#1e293b80',
          'scrollbarSlider.hoverBackground': '#33415580',
          'scrollbarSlider.activeBackground': '#47556980',
        }
      });
      monaco.editor.setTheme('cinematic-dark');
    }
  }, [monaco]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[var(--color-surface-obsidian)] rounded-b-xl border-t border-[var(--color-border-glass)]">
      <Editor
        height={height}
        language={language}
        value={code}
        onChange={(val) => setCode(val || '')}
        theme="cinematic-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          fontFamily: 'var(--font-geist-mono), monospace',
          fontLigatures: true,
          lineHeight: 24,
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          formatOnPaste: true,
          scrollBeyondLastLine: false,
          renderLineHighlight: 'all',
        }}
        loading={<div className="flex h-full items-center justify-center text-gray-500">Initializing Workspace...</div>}
      />
    </div>
  );
}
