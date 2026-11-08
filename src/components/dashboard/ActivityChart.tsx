import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface ActivityChartProps {
  dailyPracticeTime: Record<string, number>; // YYYY-MM-DD -> seconds
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ dailyPracticeTime }) => {
  // Generate last 7 days
  const data = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const seconds = dailyPracticeTime[dateStr] || 0;
    const minutes = Math.round((seconds / 60) * 10) / 10;

    data.push({
      date: dateStr,
      day: dayLabel,
      minutes,
    });
  }

  const hasActivity = data.some((d) => d.minutes > 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Weekly Practice Activity
          </h3>
          <p className="text-xs text-slate-500">Minutes spent practicing per day</p>
        </div>
      </div>

      {!hasActivity ? (
        <div className="h-48 flex flex-col items-center justify-center text-center text-slate-400">
          <p className="text-sm">No practice recorded for the last 7 days.</p>
          <p className="text-xs mt-1">Start a lesson to track your daily progress!</p>
        </div>
      ) : (
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="day"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                unit="m"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
                formatter={(val) => [`${val ?? 0} mins`, 'Practice Time']}
              />
              <Bar
                dataKey="minutes"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
