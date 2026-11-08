import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { StorageService } from '../services/storage.service';
import { Language } from '../types/keyboard.types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { WeakKeys } from '../components/dashboard/WeakKeys';
import {
  BarChart3,
  Calendar,
  Trophy,
  Trash2,
  Clock,
  Zap,
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const [stats, setStats] = useState(() => StorageService.getStats());
  const [history, setHistory] = useState(() => StorageService.getHistory());
  const [filterLang, setFilterLang] = useState<Language | 'all'>('all');
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Filter history
  const filteredHistory = history.filter((item) => {
    if (filterLang !== 'all' && item.language !== filterLang) return false;
    return true;
  });

  // Calculate speed timeline chart data from history (oldest to newest)
  const timelineData = [...filteredHistory].reverse().map((item, idx) => ({
    session: `#${idx + 1}`,
    speed: item.language === 'hi' ? item.cpm : item.wpm,
    wpm: item.wpm,
    accuracy: item.accuracy,
    title: item.lessonTitle,
    lang: item.language,
  }));

  const totalTimeSeconds =
    stats.english.totalPracticeTimeSeconds + stats.hindi.totalPracticeTimeSeconds;
  const totalMins = Math.round(totalTimeSeconds / 60);

  const handleClearData = () => {
    StorageService.clearAllData();
    setStats(StorageService.getStats());
    setHistory([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Performance Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your typing speed progression, accuracy milestones, and historical trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Filter */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFilterLang('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                filterLang === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterLang('hi')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                filterLang === 'hi'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Hindi
            </button>
            <button
              onClick={() => setFilterLang('en')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                filterLang === 'en'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>

          {/* Reset Data Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsClearModalOpen(true)}
            icon={<Trash2 size={14} className="text-rose-500" />}
          >
            Clear Data
          </Button>
        </div>
      </div>

      {/* High Level KPI summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <Clock size={16} /> Total Practice
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {totalMins} mins
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {stats.english.totalSessions + stats.hindi.totalSessions} completed sessions
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Trophy size={16} /> Top Hindi Speed
          </div>
          <p className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
            {stats.hindi.bestCpm} CPM
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Avg: {stats.hindi.averageCpm} CPM
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Zap size={16} /> Top English Speed
          </div>
          <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
            {stats.english.bestWpm} WPM
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Avg: {stats.english.averageWpm} WPM
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <BarChart3 size={16} /> Accuracy Average
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {stats.hindi.totalSessions + stats.english.totalSessions > 0
              ? Math.round(
                  (stats.hindi.averageAccuracy * stats.hindi.totalSessions +
                    stats.english.averageAccuracy * stats.english.totalSessions) /
                    (stats.hindi.totalSessions + stats.english.totalSessions)
                )
              : 100}
            %
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Overall precision rate</p>
        </div>
      </div>

      {/* Progress Charts (Speed & Accuracy Over Time) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Speed Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
            Speed History
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {filterLang === 'hi' ? 'CPM' : filterLang === 'en' ? 'WPM' : 'Speed'} across recent sessions
          </p>

          {timelineData.length < 2 ? (
            <div className="h-56 flex flex-col items-center justify-center text-center text-slate-400">
              <p className="text-sm">Complete at least 2 sessions to see trend line.</p>
            </div>
          ) : (
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="session" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`${val} ${filterLang === 'hi' ? 'CPM' : 'Speed'}`, 'Speed']}
                  />
                  <Line
                    type="monotone"
                    dataKey="speed"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Accuracy Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
            Accuracy History
          </h3>
          <p className="text-xs text-slate-500 mb-4">Percentage of correct keypresses</p>

          {timelineData.length < 2 ? (
            <div className="h-56 flex flex-col items-center justify-center text-center text-slate-400">
              <p className="text-sm">Complete at least 2 sessions to see trend line.</p>
            </div>
          ) : (
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="session" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`${val}%`, 'Accuracy']}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Weak Keys Section */}
      <WeakKeys
        weakKeysMap={
          filterLang === 'hi'
            ? stats.hindi.weakKeys
            : filterLang === 'en'
            ? stats.english.weakKeys
            : { ...stats.hindi.weakKeys, ...stats.english.weakKeys }
        }
      />

      {/* Detailed Full History Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
          All Practice Sessions ({filteredHistory.length})
        </h3>

        {filteredHistory.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <p className="text-sm">No sessions found matching this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500">
                  <th className="pb-3 font-medium">Lesson</th>
                  <th className="pb-3 font-medium">Language</th>
                  <th className="pb-3 font-medium">Difficulty</th>
                  <th className="pb-3 font-medium">Speed</th>
                  <th className="pb-3 font-medium">Accuracy</th>
                  <th className="pb-3 font-medium">1st-Attempt</th>
                  <th className="pb-3 font-medium">Mistakes</th>
                  <th className="pb-3 font-medium">Duration</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {filteredHistory.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 font-medium text-slate-900 dark:text-slate-100 max-w-[180px] truncate">
                      {s.lessonTitle}
                    </td>
                    <td className="py-3">
                      <Badge variant={s.language === 'hi' ? 'purple' : 'blue'}>
                        {s.language === 'hi' ? 'Hindi' : 'English'}
                      </Badge>
                    </td>
                    <td className="py-3 capitalize text-slate-500">{s.difficulty}</td>
                    <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">
                      {s.language === 'hi' ? `${s.cpm} CPM` : `${s.wpm} WPM`}
                    </td>
                    <td className="py-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {s.accuracy}%
                    </td>
                    <td className="py-3 font-mono text-slate-500">
                      {s.firstAttemptAccuracy}%
                    </td>
                    <td className="py-3 font-mono text-rose-500 font-medium">
                      {s.incorrectKeypresses}
                    </td>
                    <td className="py-3 text-slate-500">{Math.round(s.durationSeconds)}s</td>
                    <td className="py-3 text-slate-400 flex items-center gap-1">
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

      {/* Confirmation Modal to Clear Data */}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="Clear All Practice History?"
        description="This action cannot be undone."
        confirmLabel="Yes, Clear All Data"
        onConfirm={handleClearData}
        isDanger
      >
        <p>
          Are you sure you want to permanently delete all your saved typing history, speeds, accuracy records, and weak key statistics?
        </p>
      </Modal>
    </div>
  );
};
