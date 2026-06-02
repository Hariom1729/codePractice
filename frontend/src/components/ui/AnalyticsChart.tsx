"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BentoCard } from './BentoCard';
import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'Mon', problems: 4, acceptance: 85 },
  { name: 'Tue', problems: 3, acceptance: 88 },
  { name: 'Wed', problems: 7, acceptance: 82 },
  { name: 'Thu', problems: 5, acceptance: 90 },
  { name: 'Fri', problems: 8, acceptance: 87 },
  { name: 'Sat', problems: 12, acceptance: 92 },
  { name: 'Sun', problems: 10, acceptance: 89 },
];

export function AnalyticsChart() {
  return (
    <BentoCard className="w-full h-[350px] flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp size={20} className="text-[var(--color-accent-blue)]" />
          <h3 className="text-lg font-semibold tracking-tight text-white">Weekly Performance</h3>
        </div>
      </div>
      
      <div className="flex-grow w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Area 
              type="monotone" 
              dataKey="problems" 
              stroke="var(--color-accent-blue)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorProblems)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </BentoCard>
  );
}
