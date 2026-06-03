"use client";

import { Flame } from "lucide-react";

interface StreakCalendarProps {
  currentStreak: number;
  longestStreak: number;
  activityData: { date: string; count: number }[]; // YYYY-MM-DD
}

export function StreakCalendar({ currentStreak, longestStreak, activityData }: StreakCalendarProps) {
  // Generate a mock grid of 7 rows (days of week) x 16 columns (weeks)
  const weeks = 16;
  const daysPerWeek = 7;
  
  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-gray-800/50 hover:bg-gray-700/50 border-transparent";
    if (count < 3) return "bg-orange-500/20 border-orange-500/30 hover:bg-orange-500/30";
    if (count < 6) return "bg-orange-500/50 border-orange-500/50 hover:bg-orange-500/60";
    return "bg-orange-500 border-orange-400 hover:bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]";
  };

  return (
    <div className="bg-[#121214] border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Flame className="text-orange-500" /> Learning Streak
        </h3>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Current</p>
            <p className="text-xl font-black text-white">{currentStreak} <span className="text-sm font-medium text-gray-400">Days</span></p>
          </div>
          <div className="w-px h-10 bg-gray-800"></div>
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Longest</p>
            <p className="text-xl font-black text-white">{longestStreak} <span className="text-sm font-medium text-gray-400">Days</span></p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-end overflow-x-auto custom-scrollbar pb-2">
        {/* Days of week labels */}
        <div className="flex flex-col gap-1.5 text-[10px] text-gray-500 font-medium uppercase mr-2 justify-between py-1">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Contribution Grid */}
        <div className="flex gap-1.5 flex-1 min-w-max">
          {Array.from({ length: weeks }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1.5">
              {Array.from({ length: daysPerWeek }).map((_, dayIdx) => {
                // Mocking data: random chance of activity, higher chance towards recent weeks
                const isRecent = weekIdx > weeks - 4;
                const chance = isRecent ? 0.7 : 0.3;
                const count = Math.random() < chance ? Math.floor(Math.random() * 8) + 1 : 0;
                
                return (
                  <div 
                    key={dayIdx} 
                    className={`w-3.5 h-3.5 rounded-[3px] border transition-all cursor-crosshair group relative ${getIntensityColor(count)}`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded border border-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity">
                      {count} problems solved
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
