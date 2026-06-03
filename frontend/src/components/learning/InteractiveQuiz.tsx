"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, RefreshCw } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
  explanation: string;
  onComplete?: (passed: boolean) => void;
}

export function InteractiveQuiz({ question, options, correctAnswerId, explanation, onComplete }: QuizProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = selectedId === correctAnswerId;

  const handleSubmit = () => {
    if (!selectedId) return;
    setIsSubmitted(true);
    if (onComplete) {
      onComplete(selectedId === correctAnswerId);
    }
  };

  const handleReset = () => {
    setSelectedId(null);
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[var(--color-surface-obsidian)] border border-[var(--color-border-glass)] rounded-2xl p-6 shadow-xl w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
          Knowledge Check
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
        {question}
      </h3>

      <div className="space-y-3 mb-8">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          let buttonClass = "border-gray-800 bg-[#121214] text-gray-300 hover:bg-gray-800 hover:border-gray-600";
          
          if (isSelected && !isSubmitted) {
            buttonClass = "border-[var(--color-accent-indigo)] bg-[var(--color-accent-indigo)]/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]";
          } else if (isSubmitted) {
            if (opt.id === correctAnswerId) {
              buttonClass = "border-green-500/50 bg-green-500/10 text-green-400";
            } else if (isSelected && !isCorrect) {
              buttonClass = "border-red-500/50 bg-red-500/10 text-red-400";
            } else {
              buttonClass = "border-gray-800 bg-[#121214] text-gray-600 opacity-50";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => !isSubmitted && setSelectedId(opt.id)}
              disabled={isSubmitted}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${buttonClass}`}
            >
              <span className="font-medium">{opt.text}</span>
              {isSubmitted && opt.id === correctAnswerId && <CheckCircle2 className="text-green-400" size={20} />}
              {isSubmitted && isSelected && !isCorrect && <XCircle className="text-red-400" size={20} />}
              {!isSubmitted && (
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected ? 'border-[var(--color-accent-indigo)]' : 'border-gray-600 group-hover:border-gray-400'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-indigo)]" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            className={`p-5 rounded-xl border ${
              isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
            }`}
          >
            <h4 className={`font-bold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : 'Not quite right.'}
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {explanation}
            </p>
            
            {!isCorrect && (
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
              >
                <RefreshCw size={14} /> Try Again
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end mt-6">
        <button
          onClick={isSubmitted ? () => onComplete?.(isCorrect) : handleSubmit}
          disabled={!selectedId && !isSubmitted}
          className="px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitted ? 'Continue' : 'Check Answer'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
