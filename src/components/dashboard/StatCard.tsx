import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'rose';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  icon,
  color = 'blue',
}) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
    green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center gap-4 transition hover:border-slate-300 dark:hover:border-slate-700">
      <div className={`p-3 rounded-xl shrink-0 ${colorMap[color]}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate uppercase tracking-wider">
          {title}
        </p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono">
            {value}
          </span>
          {subValue && (
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {subValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
