"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight, Lightbulb, UserCheck, Target, AlertTriangle, Zap, CheckCircle2 } from "lucide-react";
import type { 
  HookBlock, 
  KeyIdeaBlock, 
  AnalogyBlock, 
  FeatureCard, 
  MistakeBlock, 
  InterviewPerspectiveBlock 
} from "../content/types";

export function StoryCard({ data }: { data: HookBlock }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-violet-900/40 via-[#12121e] to-[#0e0e16] border border-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.1)] mb-8 text-center"
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-violet-500/20 flex items-center justify-center border border-violet-500/40">
        <span className="text-2xl">{data.icon || '🤔'}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 leading-snug">
        {data.question}
      </h3>
      <p className="text-violet-400 font-bold text-lg mb-6">
        {data.answer}
      </p>
      <div className="inline-block px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-sm text-gray-400">
        Today's Concept: <span className="font-bold text-white">{data.concept}</span>
      </div>
    </motion.div>
  );
}

export function GlowCard({ data }: { data: KeyIdeaBlock }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-2xl bg-[#09090b] border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] mb-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <Lightbulb className="text-emerald-400" size={24} />
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-1">
            Key Idea
          </h4>
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">
            {data.title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function AnalogyView({ data }: { data: AnalogyBlock }) {
  return (
    <div className="mb-8 p-6 rounded-2xl bg-[#12121e] border border-white/[0.08]">
      <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
        <span className="text-cyan-400">🌎</span> {data.title}
      </h4>
      <p className="text-sm text-gray-400 mb-6">{data.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.mapping.map((map, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <div className="flex-1 text-right text-sm font-medium text-gray-300">
              {map.realWorld}
            </div>
            <div className="flex-shrink-0 text-cyan-500">
              <ArrowRight size={16} />
            </div>
            <div className="flex-1 text-left text-sm font-bold text-cyan-400">
              {map.csConcept}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeatureGrid({ features }: { features: FeatureCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {features.map((f, i) => (
        <div key={i} className="p-5 rounded-2xl bg-[#12121a] border border-white/[0.06] hover:border-violet-500/40 hover:bg-[#151522] transition-colors group">
          <div className="text-2xl mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">
            {f.icon}
          </div>
          <h4 className="text-sm font-bold text-white mb-1.5">{f.title}</h4>
          <p className="text-xs text-gray-400 leading-relaxed">{f.description}</p>
        </div>
      ))}
    </div>
  );
}

export function MistakeCards({ mistakes }: { mistakes: MistakeBlock[] }) {
  return (
    <div className="space-y-3 mb-8">
      {mistakes.map((m, i) => (
        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-red-950/20 border border-red-900/50">
          <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
            <X size={14} strokeWidth={3} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-200 mb-1">{m.title}</h4>
            <p className="text-xs text-red-300/80">{m.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecruiterCard({ data }: { data: InterviewPerspectiveBlock }) {
  return (
    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border border-white/[0.1] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="flex items-center gap-3 mb-4">
        <UserCheck className="text-blue-400" size={24} />
        <h4 className="text-base font-bold text-white">{data.title}</h4>
      </div>
      <ul className="space-y-3">
        {data.checklist.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Target className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
            <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Takeaways({ items }: { items: string[] }) {
  return (
    <div className="mb-8 p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
      <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-500 mb-3 flex items-center gap-2">
        <CheckCircle2 size={16} /> Key Takeaways
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="text-emerald-400 flex-shrink-0 mt-0.5" size={16} />
            <span className="text-sm text-emerald-100/80">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
