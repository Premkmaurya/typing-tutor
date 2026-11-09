import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  Trophy,
  Target,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { StorageService } from '../services/storage.service';
import { UserStats } from '../types/stats.types';
import { StatCard } from '../components/dashboard/StatCard';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { WeakKeys } from '../components/dashboard/WeakKeys';
import { RecentSessions } from '../components/dashboard/RecentSessions';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(() => StorageService.getStats());

  useEffect(() => {
    // Refresh stats when component mounts
    setStats(StorageService.getStats());
  }, []);

  const totalSessions =
    stats.english.totalSessions + stats.hindi.totalSessions;
  const isNewUser = totalSessions === 0;

  // Calculate today's practice time in minutes
  const today = new Date().toISOString().split('T')[0];
  const todaySeconds = stats.dailyPracticeTime[today] || 0;
  const todayMinutes = Math.round(todaySeconds / 60);

  // Overall accuracy
  const overallAccuracy =
    totalSessions > 0
      ? Math.round(
          (stats.english.averageAccuracy * stats.english.totalSessions +
            stats.hindi.averageAccuracy * stats.hindi.totalSessions) /
            totalSessions
        )
      : 0;

  // Merge weak keys
  const mergedWeakKeys = {
    ...stats.hindi.weakKeys,
    ...stats.english.weakKeys,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Balanced Technical Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-blue-100 mb-3">
              <Sparkles size={14} />
              Bilingual Typing Mastery
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Master Hindi InScript & English QWERTY
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl">
              Scientifically structured lessons, real-time keyboard feedback, and precise Devanagari Unicode processing.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/setup">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 shadow-md font-semibold"
                  icon={<Play size={18} />}
                >
                  Start Practicing
                </Button>
              </Link>
              <Link to="/progress">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  icon={<ArrowRight size={18} />}
                >
                  View Analytics
                </Button>
              </Link>
            </div>
          </div>

          {/* Technical InScript Architecture Card (Replaces empty space) */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/15">
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-blue-100">
                Input Engine Specs
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/20 text-white">
                BIS IS 13194:1991
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-blue-100">
                <span>Layout Standard</span>
                <span className="font-mono font-semibold text-white">Unicode CLDR 43</span>
              </div>
              <div className="flex justify-between items-center text-blue-100">
                <span>Grapheme Resolution</span>
                <span className="font-mono font-semibold text-white">Extended Cluster</span>
              </div>
              <div className="flex justify-between items-center text-blue-100">
                <span>OS Keyboard Req.</span>
                <span className="font-mono font-semibold text-white">None (Client Virtualized)</span>
              </div>
            </div>

            {/* Live Keycode Mapping Samples */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-blue-100">
              <span className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-white/15 font-bold text-white">H</span>
                <span>→ प</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-white/15 font-bold text-white">J</span>
                <span>→ र</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-white/15 font-bold text-white">K</span>
                <span>→ क</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-white/15 font-bold text-white">L</span>
                <span>→ त</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Daily Streak"
          value={`${stats.dailyStreak} Days`}
          subValue={stats.dailyStreak > 0 ? 'Keep it going!' : 'Start today'}
          icon={<Flame size={22} />}
          color="amber"
        />
        <StatCard
          title="Today's Practice"
          value={`${todayMinutes} mins`}
          subValue={`${totalSessions} total sessions`}
          icon={<Zap size={22} />}
          color="blue"
        />
        <StatCard
          title="Best Hindi Speed"
          value={`${stats.hindi.bestCpm} CPM`}
          subValue={`Best English: ${stats.english.bestWpm} WPM`}
          icon={<Trophy size={22} />}
          color="purple"
        />
        <StatCard
          title="Avg. Accuracy"
          value={`${overallAccuracy}%`}
          subValue="First-attempt precision"
          icon={<Target size={22} />}
          color="green"
        />
      </div>

      {/* Language Comparison Cards (Separate Hindi and English progress) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hindi InScript Progress Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-hindi font-bold flex items-center justify-center text-xl">
                क
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">
                  हिन्दी InScript Progress
                </h3>
                <p className="text-xs text-slate-500">Government Standard Layout (BIS IS 13194)</p>
              </div>
            </div>
            <Badge variant="purple">InScript</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 py-5 text-center">
            <div>
              <p className="text-xs text-slate-500 font-medium">Top CPM</p>
              <p className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                {stats.hindi.bestCpm}
              </p>
              <p className="text-[11px] text-slate-400">
                ~{Math.round(stats.hindi.bestCpm / 5)} WPM
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Accuracy</p>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                {stats.hindi.averageAccuracy}%
              </p>
              <p className="text-[11px] text-slate-400">avg precision</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Sessions</p>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                {stats.hindi.totalSessions}
              </p>
              <p className="text-[11px] text-slate-400">
                {Math.round(stats.hindi.totalPracticeTimeSeconds / 60)} mins
              </p>
            </div>
          </div>

          <Link to="/setup?lang=hi">
            <Button variant="outline" size="sm" className="w-full">
              Practice Hindi InScript
            </Button>
          </Link>
        </div>

        {/* English QWERTY Progress Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-sans font-bold flex items-center justify-center text-xl">
                EN
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">
                  English QWERTY Progress
                </h3>
                <p className="text-xs text-slate-500">Standard US Desktop Layout</p>
              </div>
            </div>
            <Badge variant="blue">QWERTY</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 py-5 text-center">
            <div>
              <p className="text-xs text-slate-500 font-medium">Top WPM</p>
              <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                {stats.english.bestWpm}
              </p>
              <p className="text-[11px] text-slate-400">words / min</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Accuracy</p>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                {stats.english.averageAccuracy}%
              </p>
              <p className="text-[11px] text-slate-400">avg precision</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Sessions</p>
              <p className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">
                {stats.english.totalSessions}
              </p>
              <p className="text-[11px] text-slate-400">
                {Math.round(stats.english.totalPracticeTimeSeconds / 60)} mins
              </p>
            </div>
          </div>

          <Link to="/setup?lang=en">
            <Button variant="outline" size="sm" className="w-full">
              Practice English QWERTY
            </Button>
          </Link>
        </div>
      </div>

      {/* Activity Chart & Weak Keys */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart dailyPracticeTime={stats.dailyPracticeTime} />
        </div>
        <div className="lg:col-span-1">
          <WeakKeys weakKeysMap={mergedWeakKeys} />
        </div>
      </div>

      {/* Recent History or Empty State */}
      {isNewUser ? (
        <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <RotateCcw size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Welcome to Akshar Typing Tutor!
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              You haven't completed any typing sessions yet. Select a Hindi or English practice lesson to unlock your personalized speed statistics and weak-key analytics.
            </p>
          </div>
          <Link to="/setup">
            <Button size="lg" icon={<Play size={16} />}>
              Start Your First Lesson
            </Button>
          </Link>
        </div>
      ) : (
        <RecentSessions sessions={stats.recentSessions} />
      )}
    </div>
  );
};
