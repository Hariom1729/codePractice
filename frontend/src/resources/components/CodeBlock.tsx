"use client";

import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  explanation?: string;
}

// Language badge color map
const LANG_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  python:     { bg: "bg-blue-500/10",   text: "text-blue-400",   dot: "bg-blue-400" },
  javascript: { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-400" },
  typescript: { bg: "bg-cyan-500/10",   text: "text-cyan-400",   dot: "bg-cyan-400" },
  java:       { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  cpp:        { bg: "bg-violet-500/10", text: "text-violet-400", dot: "bg-violet-400" },
  "c++":      { bg: "bg-violet-500/10", text: "text-violet-400", dot: "bg-violet-400" },
  c:          { bg: "bg-indigo-500/10", text: "text-indigo-400", dot: "bg-indigo-400" },
  go:         { bg: "bg-cyan-500/10",   text: "text-cyan-400",   dot: "bg-cyan-400" },
  rust:       { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  default:    { bg: "bg-gray-500/10",   text: "text-gray-400",   dot: "bg-gray-400" },
};

// Token types for syntax highlighting
type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "function"
  | "operator"
  | "plain";

interface Token {
  type: TokenType;
  value: string;
}

const KEYWORDS: Record<string, string[]> = {
  python: [
    "def","class","return","if","elif","else","for","while","in","not","and","or",
    "import","from","as","with","try","except","finally","raise","pass","break",
    "continue","lambda","yield","None","True","False","self","is","del","global",
    "nonlocal","assert","async","await",
  ],
  javascript: [
    "const","let","var","function","return","if","else","for","while","do","in",
    "of","new","this","class","extends","import","export","default","from","async",
    "await","try","catch","finally","throw","typeof","instanceof","null","undefined",
    "true","false","switch","case","break","continue","delete","void","yield",
  ],
  typescript: [
    "const","let","var","function","return","if","else","for","while","do","in",
    "of","new","this","class","extends","import","export","default","from","async",
    "await","try","catch","finally","throw","typeof","instanceof","null","undefined",
    "true","false","switch","case","break","continue","delete","void","yield",
    "interface","type","enum","implements","abstract","private","public","protected",
    "readonly","namespace","declare","as","is","keyof","typeof","infer",
  ],
  java: [
    "public","private","protected","static","void","class","interface","extends",
    "implements","new","return","if","else","for","while","do","switch","case",
    "break","continue","try","catch","finally","throw","throws","import","package",
    "this","super","null","true","false","final","abstract","synchronized","volatile",
    "instanceof","enum","default","int","long","double","float","boolean","char",
    "byte","short","String",
  ],
  cpp: [
    "int","long","double","float","char","bool","void","short","unsigned","signed",
    "const","static","class","struct","return","if","else","for","while","do",
    "switch","case","break","continue","new","delete","namespace","using","template",
    "typename","public","private","protected","virtual","override","true","false",
    "nullptr","auto","try","catch","throw","include","define","vector","string",
  ],
  default: [
    "return","if","else","for","while","class","function","import","export",
    "const","let","var","new","this","null","true","false","undefined",
  ],
};

function tokenizeLine(line: string, lang: string): Token[] {
  const keywords = KEYWORDS[lang] ?? KEYWORDS.default;
  const tokens: Token[] = [];

  // Single-pass tokenizer using regex
  const pattern = new RegExp(
    [
      // Comments
      `(//.*?$)`,
      `(#.*?$)`,
      // Strings
      `("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)`,
      // Numbers
      `(\\b\\d+(\\.\\d+)?\\b)`,
      // Words (keywords + identifiers)
      `([a-zA-Z_][a-zA-Z0-9_]*)`,
      // Operators
      `([+\\-*/%=<>!&|^~?:;,.(){}[\\]])`,
      // Whitespace / anything else
      `(\\s+|.)`,
    ].join("|"),
    "gm"
  );

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(line)) !== null) {
    const [full, comment1, comment2, str, num, , word, , operator, space] = match;

    if (comment1 || comment2) {
      tokens.push({ type: "comment", value: full });
    } else if (str) {
      tokens.push({ type: "string", value: full });
    } else if (num) {
      tokens.push({ type: "number", value: full });
    } else if (word) {
      // Check if function call (followed by `(` after possible spaces)
      const remaining = line.slice((match.index ?? 0) + full.length).trimStart();
      if (remaining.startsWith("(")) {
        tokens.push({ type: "function", value: full });
      } else if (keywords.includes(full)) {
        tokens.push({ type: "keyword", value: full });
      } else {
        tokens.push({ type: "plain", value: full });
      }
    } else if (operator) {
      tokens.push({ type: "operator", value: full });
    } else {
      tokens.push({ type: "plain", value: full });
    }
  }

  return tokens;
}

const TOKEN_CLASSES: Record<TokenType, string> = {
  keyword:  "text-[#c792ea]",  // violet
  string:   "text-[#c3e88d]",  // emerald
  comment:  "text-[#546e7a] italic",  // gray italic
  number:   "text-[#89ddff]",  // cyan
  function: "text-[#82aaff]",  // blue
  operator: "text-[#89ddff]",
  plain:    "text-[#cdd3de]",
};

function HighlightedLine({ line, lang }: { line: string; lang: string }) {
  const tokens = useMemo(() => tokenizeLine(line, lang), [line, lang]);
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} className={TOKEN_CLASSES[tok.type]}>
          {tok.value}
        </span>
      ))}
    </>
  );
}

export function CodeBlock({
  code,
  language,
  title,
  showLineNumbers = true,
  explanation,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const langKey = language.toLowerCase();
  const langStyle = LANG_COLORS[langKey] ?? LANG_COLORS.default;
  const lines = code.split("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.06] shadow-2xl my-4">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>

          {/* Language badge */}
          <span
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${langStyle.bg} ${langStyle.text} border border-current/20`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${langStyle.dot}`} />
            {language}
          </span>

          {/* Optional title */}
          {title && (
            <span className="text-xs text-gray-400 font-medium truncate max-w-[200px]">
              {title}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <div className="bg-[#0d1117] overflow-x-auto">
        <table className="w-full border-collapse text-sm font-mono">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                {showLineNumbers && (
                  <td
                    className="select-none text-right pr-4 pl-4 py-0.5 text-gray-600 text-xs w-10 align-top group-hover:text-gray-400 transition-colors"
                    style={{ userSelect: "none" }}
                  >
                    {idx + 1}
                  </td>
                )}
                <td className="pr-6 pl-2 py-0.5 whitespace-pre align-top leading-6">
                  {line === "" ? (
                    <span className="text-transparent">{"·"}</span>
                  ) : (
                    <HighlightedLine line={line} lang={langKey} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="px-5 py-3 bg-[#161b22] border-t border-white/[0.06]">
          <p className="text-sm text-gray-400 italic leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
}
