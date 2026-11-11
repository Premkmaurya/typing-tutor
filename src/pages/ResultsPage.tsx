import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSessionStore } from '../store/sessionStore';
import { StorageService } from '../services/storage.service';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Trophy,
  Gauge,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const lastResult = useSessionStore((state) => state.lastResult);
  const restartSession = useSessionStore((state) => state.restartSession);

  // If user navigated directly here without a session, get most recent from history
  const history = StorageService.getHistory();
  const session = lastResult || history[0];
  const previousSession = history.length > 1 ? history[1] : null;

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <Trophy size={48} className="text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          No Results Found
        </h2>
        <p className="text-sm text-slate-500">
          Complete a practice session to view detailed speed and accuracy analytics.
        </p>
        <Link to="/setup">
          <Button>Start Practice</Button>
        </Link>
      </div>
    );
  }

  const isHindi = session.language === 'hi';
  const durationSeconds = Math.round(session.durationSeconds);
  const mins = Math.floor(durationSeconds / 60);
  const secs = durationSeconds % 60;
  const timeFormatted = `${mins}:${secs.toString().padStart(2, '0')}`;

  // Speed comparison with previous session
  let speedDiff = 0;
  if (previousSession && previousSession.language === session.language) {
    const prevSpeed = isHindi ? previousSession.cpm : previousSession.wpm;
    const currSpeed = isHindi ? session.cpm : session.wpm;
    speedDiff = currSpeed - prevSpeed;
  }

  const handleRestart = () => {
    restartSession();
    navigate('/practice');
  };

  const passagesCount = session.passagesCompleted || (session.passages ? session.passages.length : 1);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Celebration Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
          <Trophy size={32} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Session Complete!
        </h1>
        <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
          <span className="text-sm text-slate-500 font-medium">{session.lessonTitle}</span>
          <Badge variant={isHindi ? 'purple' : 'blue'}>
            {isHindi ? 'Hindi InScript' : 'English QWERTY'}
          </Badge>
          <Badge variant="amber">{session.difficulty}</Badge>
          <Badge variant="green">
            {passagesCount} {passagesCount === 1 ? 'Passage Completed' : 'Passages Completed'}
          </Badge>
        </div>
      </div>

      {/* Primary KPI Hero Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Speed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Gauge size={16} />
            {isHindi ? 'CPM (Speed)' : 'WPM (Speed)'}
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
            {isHindi ? session.cpm : session.wpm}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isHindi ? `~${session.wpm} words/min` : 'words per minute'}
          </p>

          {speedDiff !== 0 && (
            <div
              className={`inline-flex items-center gap-1 text-[11px] font-semibold mt-2.5 px-2 py-0.5 rounded-full ${
                speedDiff > 0
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
              }`}
            >
              {speedDiff > 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {Math.abs(speedDiff)} {isHindi ? 'CPM' : 'WPM'} {speedDiff > 0 ? 'faster' : 'slower'}
            </div>
          )}
        </div>

        {/* Word Accuracy */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <CheckCircle2 size={16} />
            Word Accuracy
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {session.wordAccuracy ?? session.accuracy}%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {session.correctWords ?? 0} / {session.totalWordsAttempted ?? 0} words
          </p>
        </div>

        {/* Character Accuracy */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <CheckCircle2 size={16} />
            Char Accuracy
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            {session.characterAccuracy ?? session.accuracy}%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {session.correctKeypresses} / {session.totalKeypresses} keys
          </p>
        </div>

        {/* Practice Time */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-xs">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Clock size={16} />
            Practice Duration
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
            {timeFormatted}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {session.selectedDurationMinutes && session.selectedDurationMinutes > 0
              ? `${session.selectedDurationMinutes} min scheduled session`
              : 'Unlimited mode'}
          </p>
        </div>
      </div>

      {/* Completed Passages Breakdown Table if multi-passage */}
      {session.passages && session.passages.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-600" />
              Completed Passages in this Timed Session ({session.passages.length})
            </h3>
            <span className="text-xs text-slate-400">Continuous practice queue</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Passage</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Words</th>
                  <th className="py-2.5 px-3">Speed</th>
                  <th className="py-2.5 px-3">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {session.passages.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300 font-sans">
                      Passage #{p.passageIndex}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">
                      {Math.floor(p.durationSeconds / 60)}:{(p.durationSeconds % 60).toString().padStart(2, '0')}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                      {p.correctWords}/{p.totalWords}
                    </td>
                    <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400 font-bold">
                      {isHindi ? `${p.cpm} CPM` : `${p.wpm} WPM`}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      {p.accuracy}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Keystrokes Breakdown & Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keystroke Summary */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Performance Breakdown
          </h3>
          <div className="space-y-3 text-sm">
            {session.totalWordsAttempted !== undefined && (
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Words Completed</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {session.totalWordsAttempted} ({session.correctWords ?? 0} correct, {session.incorrectWords ?? 0} incorrect)
                </span>
              </div>
            )}
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Total Keypresses</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                {session.totalKeypresses}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Correct Keypresses
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {session.correctKeypresses}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 flex items-center gap-1.5">
                <AlertCircle size={15} className="text-rose-500" />
                Incorrect Keypresses
              </span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                {session.incorrectKeypresses}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Backspace Corrections</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                {session.backspaceCount}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Errors Corrected</span>
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                {session.correctedErrors}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-500">Total Mistakes Recorded</span>
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                {session.totalMistakes ?? (session.incorrectKeypresses + (session.incorrectWords ?? 0))}
              </span>
            </div>
          </div>
        </div>

        {/* Session Weak Keys */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Most Frequently Mistyped Keys
          </h3>
          {!session.weakKeys || session.weakKeys.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Flawless precision!
              </p>
              <p className="text-xs text-slate-500">You didn't mistype any keys in this session.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {session.weakKeys.slice(0, 6).map((item) => (
                <div
                  key={item.key}
                  className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-rose-300 dark:border-rose-800 flex items-center justify-center text-base font-bold font-hindi text-rose-700 dark:text-rose-300">
                      {item.display === ' ' ? '␣' : item.display}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {item.key === ' ' ? 'Space' : item.key}
                      </p>
                      <p className="text-[11px] text-rose-600 dark:text-rose-400">
                        {item.count} {item.count === 1 ? 'error' : 'errors'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link to="/">
          <Button variant="outline" size="lg" icon={<LayoutDashboard size={18} />}>
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleRestart}
            icon={<RotateCcw size={18} />}
          >
            Restart Lesson
          </Button>
          <Link to="/setup">
            <Button size="lg" variant="primary" icon={<ArrowRight size={18} />}>
              Next Lesson
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
