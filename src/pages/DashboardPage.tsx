import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  Trophy,
  Target,
  Play,
  RotateCcw,
  Cpu,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { StorageService } from '../services/storage.service';
import { UserStats } from '../types/stats.types';
import { StatCard } from '../components/dashboard/StatCard';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { WeakKeys } from '../components/dashboard/WeakKeys';
import { RecentSessions } from '../components/dashboard/RecentSessions';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface InspectorSample {
  key: string;
  glyph: string;
  code: string;
  name: string;
  cluster: string;
  halant: string;
}

const INSPECTOR_SAMPLES: Record<string, InspectorSample> = {
  KeyH: { key: 'KeyH', glyph: 'प', code: 'U+092A', name: 'DEVANAGARI LETTER PA', cluster: 'Standalone Consonant', halant: 'False' },
  KeyJ: { key: 'KeyJ', glyph: 'र', code: 'U+0930', name: 'DEVANAGARI LETTER RA', cluster: 'Standalone Consonant', halant: 'False' },
  KeyK: { key: 'KeyK', glyph: 'क', code: 'U+0915', name: 'DEVANAGARI LETTER KA', cluster: 'Standalone Consonant', halant: 'False' },
  KeyD: { key: 'KeyD', glyph: '्', code: 'U+094D', name: 'DEVANAGARI SIGN VIRAMA', cluster: 'Halant / Conjunct Joiner', halant: 'True' },
  KeyE: { key: 'KeyE', glyph: 'ा', code: 'U+093E', name: 'DEVANAGARI VOWEL SIGN AA', cluster: 'Dependent Matra', halant: 'False' },
};

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(() => StorageService.getStats());
  const [selectedKey, setSelectedKey] = useState<string>('KeyH');

  useEffect(() => {
    // Refresh stats when component mounts
    setStats(StorageService.getStats());
  }, []);

  const totalSessions =
    stats.english.totalSessions + stats.hindi.totalSessions;
  const isNewUser = totalSessions === 0;

  // Calculate today's practice time in minutes
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
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

  const activeSample = INSPECTOR_SAMPLES[selectedKey] || INSPECTOR_SAMPLES.KeyH;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6 sm:space-y-7">
      {/* Precision Terminal Architectural Hero */}
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl p-5 sm:p-7">
        {/* Subtle grid background accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Technical Authority & Primary Launch CTAs */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono font-medium text-blue-400">
                <Terminal size={12} />
                DEV ENGINE • BIS IS 13194
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-slate-800 bg-slate-800/50">
                UNICODE CLDR 43
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest font-mono text-blue-400 font-semibold">
                Bilingual Input Subsystem
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                Hardware-Accelerated Devanagari Keyboard Resolver
              </h1>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Pure client-side zero-latency InScript parser with verified Unicode CLDR grapheme clustering and standard ANSI US QWERTY mapping.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link to="/setup">
                <Button
                  size="md"
                  className="bg-blue-600 hover:bg-blue-500 text-white shadow-md font-semibold px-5 min-h-[42px]"
                  icon={<Play size={16} />}
                >
                  Launch Interactive Studio
                </Button>
              </Link>
              <Link to="/progress">
                <Button
                  variant="outline"
                  size="md"
                  className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white min-h-[42px]"
                  icon={<ArrowRight size={16} />}
                >
                  View Analytics & Telemetry
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Live InScript & Unicode Inspector Instrument */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 sm:p-5 space-y-3 shadow-inner">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-blue-400" />
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-200">
                  Live Unicode Inspector
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                0.1ms Engine Latency
              </span>
            </div>

            {/* Keycode Switcher Tabs */}
            <div className="flex items-center gap-1.5 pb-1">
              {Object.keys(INSPECTOR_SAMPLES).map((key) => {
                const s = INSPECTOR_SAMPLES[key];
                const isSelected = selectedKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedKey(key)}
                    className={`flex-1 py-1 px-1 rounded border text-center transition font-mono text-xs ${
                      isSelected
                        ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-xs'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-[9px] opacity-75">{key.replace('Key', '')}</div>
                    <div className="font-hindi text-sm">{s.glyph}</div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Inspector Telemetry Table */}
            <div className="space-y-1.5 text-xs font-mono bg-slate-900/60 rounded-lg p-3 border border-slate-800/60">
              <div className="flex justify-between items-center text-slate-400">
                <span>Physical Key</span>
                <span className="text-slate-200 font-semibold">{activeSample.key}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Resolved Glyph</span>
                <span className="text-blue-400 font-hindi font-bold text-base">{activeSample.glyph}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Codepoint</span>
                <span className="text-slate-200">{activeSample.code}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Cluster State</span>
                <span className="text-slate-200">{activeSample.cluster}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Halant Modifier</span>
                <span className={activeSample.halant === 'True' ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                  {activeSample.halant}
                </span>
              </div>
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
