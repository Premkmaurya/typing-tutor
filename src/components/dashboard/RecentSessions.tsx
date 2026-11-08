import React from 'react';
import { SessionResult } from '../../types/stats.types';
import { Badge } from '../common/Badge';
import { History, Calendar } from 'lucide-react';

interface RecentSessionsProps {
  sessions: SessionResult[];
}

export const RecentSessions: React.FC<RecentSessionsProps> = ({ sessions }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          <History size={18} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Recent Practice History
          </h3>
          <p className="text-xs text-slate-500">Your latest practice performance</p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="py-8 text-center text-slate-400">
          <p className="text-sm">No practice sessions recorded yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500">
                <th className="pb-2.5 font-medium">Lesson</th>
                <th className="pb-2.5 font-medium">Language</th>
                <th className="pb-2.5 font-medium">Speed</th>
                <th className="pb-2.5 font-medium">Accuracy</th>
                <th className="pb-2.5 font-medium">Duration</th>
                <th className="pb-2.5 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {sessions.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 font-medium text-slate-900 dark:text-slate-100 max-w-[200px] truncate">
                    {s.lessonTitle}
                  </td>
                  <td className="py-2.5">
                    <Badge variant={s.language === 'hi' ? 'purple' : 'blue'}>
                      {s.language === 'hi' ? 'Hindi' : 'English'}
                    </Badge>
                  </td>
                  <td className="py-2.5 font-mono font-bold text-slate-900 dark:text-white">
                    {s.language === 'hi' ? `${s.cpm} CPM` : `${s.wpm} WPM`}
                  </td>
                  <td className="py-2.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {s.accuracy}%
                  </td>
                  <td className="py-2.5 text-slate-500">
                    {Math.round(s.durationSeconds)}s
                  </td>
                  <td className="py-2.5 text-slate-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(s.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
