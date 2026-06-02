'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Define the neon theme for CodeMirror
const neonTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent',
    color: '#e2e8f0', // slate-200
    fontSize: '15px',
  },
  '.cm-content': {
    caretColor: '#00ffff',
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: '#00ffff',
    boxShadow: '0 0 8px #00ffff',
    borderLeftWidth: '2px',
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: 'rgba(176, 38, 255, 0.3) !important', // Electric Purple
  },
  '.cm-panels': {
    backgroundColor: '#020617', // slate-950
    color: '#e2e8f0',
  },
  '.cm-panels.cm-panels-top': {
    borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
  },
  '.cm-panels.cm-panels-bottom': {
    borderTop: '1px solid rgba(0, 255, 255, 0.2)',
  },
  '.cm-searchMatch': {
    backgroundColor: 'rgba(57, 255, 20, 0.3)',
    outline: '1px solid #39ff14',
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: 'rgba(0, 255, 255, 0.5)',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  '.cm-selectionMatch': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
  },
  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    outline: '1px solid #00ffff',
  },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    color: '#475569', // slate-600
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'transparent',
    color: '#00ffff',
    textShadow: '0 0 8px rgba(0, 255, 255, 0.8)', // Glowing cyan line number
  },
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 16px 0 8px',
  },
}, { dark: true });

// Define the custom syntax highlighting with glowing text-shadows
const neonHighlighting = HighlightStyle.define([
  {
    tag: [t.keyword, t.modifier, t.operatorKeyword],
    color: '#b026ff', // Electric Purple
    textShadow: '0 0 5px rgba(176, 38, 255, 0.8)',
  },
  {
    tag: [t.propertyName, t.function(t.variableName), t.function(t.propertyName)],
    color: '#00ffff', // Neon Cyan
    textShadow: '0 0 5px rgba(0, 255, 255, 0.8)',
  },
  {
    tag: [t.string, t.special(t.string)],
    color: '#39ff14', // Neon Green
    textShadow: '0 0 5px rgba(57, 255, 20, 0.8)',
  },
  {
    tag: [t.number, t.bool, t.null],
    color: '#fde047', // Neon Yellow (yellow-300)
    textShadow: '0 0 5px rgba(253, 224, 71, 0.8)',
  },
  {
    tag: [t.comment, t.lineComment, t.blockComment],
    color: '#64748b', // Slate-500
    fontStyle: 'italic',
    // No glow for comments as requested
  },
  {
    tag: [t.variableName, t.definition(t.variableName)],
    color: '#e2e8f0', // Default text
  },
  {
    tag: [t.typeName, t.className, t.constant(t.variableName)],
    color: '#f472b6', // Neon Pinkish
    textShadow: '0 0 5px rgba(244, 114, 182, 0.8)',
  }
]);

interface NeonEditorProps {
  code: string;
  setCode: (val: string) => void;
  height?: string;
}

export default function NeonEditor({ code, setCode, height = '400px' }: NeonEditorProps) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden p-[1px] bg-slate-950 shadow-[0_0_20px_rgba(57,255,20,0.3)] group transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]">
      
      {/* Decorative blurred gradients behind the editor for ambient light */}
      <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-[#39ff14] blur-[100px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-32 bg-[#b026ff] blur-[100px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />
      
      {/* Container with a subtle glowing border effect */}
      <div className="relative z-10 w-full h-full bg-[#0b1120] backdrop-blur-xl border border-[rgba(57,255,20,0.3)] rounded-xl overflow-hidden">
        <CodeMirror
          value={code}
          height={height}
          theme="dark"
          extensions={[
            javascript({ jsx: true }),
            neonTheme,
            syntaxHighlighting(neonHighlighting)
          ]}
          onChange={(value) => setCode(value)}
          className="h-full font-mono outline-none"
        />
      </div>
    </div>
  );
}
