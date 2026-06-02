"use client";

import { ActivityCalendar } from 'react-activity-calendar';
import { BentoCard } from './BentoCard';
import { Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export function CodingHeatmap() {
  const [data, setData] = useState<{ date: string; count: number; level: number }[]>([]);

  useEffect(() => {
    // Generate mock heatmap data for the past 6 months
    const mockData = [];
    const today = new Date();
    for (let i = 180; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const count = Math.random() > 0.6 ? Math.floor(Math.random() * 5) + 1 : 0;
      mockData.push({
        date: date.toISOString().split('T')[0],
        count: count,
        level: count > 3 ? 4 : count > 2 ? 3 : count > 0 ? 2 : 0,
      });
    }
    setData(mockData);
  }, []);

  return (
    <BentoCard className="w-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-[var(--color-accent-emerald)]" />
          <h3 className="text-lg font-semibold tracking-tight text-white">Coding Activity</h3>
        </div>
        <div className="text-sm text-gray-400">
          <span className="font-bold text-white">124</span> contributions in the last 6 months
        </div>
      </div>
      
      <div className="w-full overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-[700px]">
          {data.length > 0 && (
            <ActivityCalendar
              data={data}
              theme={{
                light: ['#1e293b', '#064e3b', '#059669', '#10b981', '#34d399'],
                dark: ['#1e293b', '#064e3b', '#059669', '#10b981', '#34d399']
              }}
              colorScheme="dark"
              labels={{
                legend: {
                  less: 'Less',
                  more: 'More'
                },
                months: [
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
                totalCount: '{{count}} contributions in {{year}}'
              }}
              blockSize={14}
              blockMargin={4}
              fontSize={12}
            />
          )}
        </div>
      </div>
    </BentoCard>
  );
}
