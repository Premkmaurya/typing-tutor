import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface WeakKeysProps {
  weakKeysMap: Record<string, { display: string; missCount: number; attempts: number }>;
}

export const WeakKeys: React.FC<WeakKeysProps> = ({ weakKeysMap }) => {
  const weakKeys = Object.entries(weakKeysMap)
    .map(([key, info]) => ({
      key,
      display: info.display || key,
      missCount: info.missCount,
      attempts: info.attempts,
    }))
    .sort((a, b) => b.missCount - a.missCount)
    .slice(0, 8);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
          <AlertTriangle size={18} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Your Weak Keys
          </h3>
          <p className="text-xs text-slate-500">Keys that need more targeted practice</p>
        </div>
      </div>

      {weakKeys.length === 0 ? (
        <div className="py-8 flex flex-col items-center justify-center text-center text-slate-400">
          <CheckCircle size={32} className="text-emerald-500 mb-2 opacity-80" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            No weak keys detected yet!
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete more sessions to analyze your keystroke accuracy.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {weakKeys.map(({ key, display, missCount }) => (
            <div
              key={key}
              className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-rose-300 dark:border-rose-800 flex items-center justify-center text-lg font-bold font-hindi text-rose-700 dark:text-rose-300 shadow-2xs">
                  {display === ' ' ? '␣' : display}
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {key === ' ' ? 'Space' : key}
                  </p>
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {missCount} {missCount === 1 ? 'miss' : 'misses'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
