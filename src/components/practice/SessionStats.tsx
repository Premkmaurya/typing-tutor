import React from 'react';
import { Language } from '../../types/keyboard.types';
import { Gauge, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface SessionStatsProps {
  language: Language;
  wpm: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  isTimed: boolean;
}

export const SessionStats: React.FC<SessionStatsProps> = ({
  language,
  wpm,
  cpm,
  accuracy,
  mistakes,
  elapsedSeconds,
  remainingSeconds,
  isTimed,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 w-full">
      {/* Speed Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 sm:py-1.5 flex items-center gap-2 shadow-xs h-[48px] sm:h-[52px]">
        <div className="p-1 sm:p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
          <Gauge size={15} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate leading-tight">
            {language === 'hi' ? 'CPM / Speed' : 'WPM / Speed'}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono leading-none">
              {language === 'hi' ? cpm : wpm}
            </span>
            <span className="text-[9px] text-slate-400">
              {language === 'hi' ? `cpm (${wpm} wpm)` : 'wpm'}
            </span>
          </div>
        </div>
      </div>

      {/* Accuracy Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 sm:py-1.5 flex items-center gap-2 shadow-xs h-[48px] sm:h-[52px]">
        <div className="p-1 sm:p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
          <CheckCircle2 size={15} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate leading-tight">Accuracy</p>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono leading-none">
              {accuracy}%
            </span>
          </div>
        </div>
      </div>

      {/* Mistakes Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 sm:py-1.5 flex items-center gap-2 shadow-xs h-[48px] sm:h-[52px]">
        <div className="p-1 sm:p-1.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shrink-0">
          <AlertCircle size={15} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate leading-tight">Mistakes</p>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono leading-none">
              {mistakes}
            </span>
          </div>
        </div>
      </div>

      {/* Timer Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 sm:py-1.5 flex items-center gap-2 shadow-xs h-[48px] sm:h-[52px]">
        <div className="p-1 sm:p-1.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
          <Clock size={15} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate leading-tight">
            {isTimed ? 'Remaining' : 'Elapsed'}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono leading-none">
              {formatTime(isTimed ? remainingSeconds : elapsedSeconds)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
