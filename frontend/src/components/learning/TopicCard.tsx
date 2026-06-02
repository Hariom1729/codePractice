import Link from 'next/link';
import { BentoCard } from '@/components/ui/BentoCard';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopicCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  lessonsCount: number;
  progress: number; // 0-100
  color: string;
}

export function TopicCard({ id, title, icon: Icon, difficulty, estimatedTime, lessonsCount, progress, color }: TopicCardProps) {
  return (
    <Link href={`/learning/${id}`}>
      <BentoCard className="h-full flex flex-col group hover:border-[var(--color-accent-indigo)]/50 transition-all duration-300 relative overflow-hidden bg-[var(--color-surface-elevated)]/30 backdrop-blur-md">
        
        {/* Hover Glow Effect */}
        <div className={`absolute -inset-4 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-full`} style={{ backgroundColor: `var(${color})` }} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors border border-white/5`}>
              <Icon size={24} style={{ color: `var(${color})` }} className="drop-shadow-md" />
            </div>
            
            {/* Circular Progress Ring */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-800" />
                <circle 
                  cx="20" cy="20" r="16" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="transparent" 
                  strokeDasharray="100.5" 
                  strokeDashoffset={100.5 - (100.5 * progress) / 100} 
                  className="transition-all duration-1000 ease-out drop-shadow-md"
                  style={{ color: `var(${color})` }}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-gray-300">{progress}%</span>
            </div>
          </div>

          <h3 className="text-xl font-bold tracking-tight mb-2 text-white group-hover:text-white transition-colors">{title}</h3>
          
          <div className="mt-auto pt-4 flex items-center justify-between text-xs font-medium text-gray-400">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-md bg-white/5 border border-white/5 ${
                difficulty === 'Beginner' ? 'text-green-400' :
                difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {difficulty}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>{lessonsCount} Lessons</span>
              <span>•</span>
              <span>{estimatedTime}</span>
            </div>
          </div>
        </div>
      </BentoCard>
    </Link>
  );
}
