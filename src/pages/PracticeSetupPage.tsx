import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Language } from '../types/keyboard.types';
import { Difficulty, PracticeType } from '../types/lesson.types';
import { getLessonsByLanguageAndDifficulty } from '../data/lessons';
import { useSessionStore } from '../store/sessionStore';
import { useSettingsStore } from '../store/settingsStore';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Play,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const PracticeSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language: defaultLang, setLanguage: saveDefaultLang } = useSettingsStore();
  const startLesson = useSessionStore((state) => state.startLesson);

  const initialLang = (searchParams.get('lang') as Language) || defaultLang || 'hi';
  const [language, setLanguage] = useState<Language>(initialLang);
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [practiceType, setPracticeType] = useState<PracticeType>('keys');
  const [durationMinutes, setDurationMinutes] = useState<number>(0); // 0 = unlimited
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');

  // Keep global setting aligned
  useEffect(() => {
    saveDefaultLang(language);
  }, [language, saveDefaultLang]);

  // Query matching lessons
  const availableLessons = getLessonsByLanguageAndDifficulty(
    language,
    difficulty,
    practiceType
  );

  // If no lessons match the exact combo, fallback to all lessons in difficulty
  const effectiveLessons =
    availableLessons.length > 0
      ? availableLessons
      : getLessonsByLanguageAndDifficulty(language, difficulty);

  // Auto-select first lesson when list changes
  useEffect(() => {
    if (effectiveLessons.length > 0) {
      setSelectedLessonId(effectiveLessons[0].id);
    }
  }, [language, difficulty, practiceType, effectiveLessons]);

  const handleStartPractice = () => {
    const targetLesson =
      effectiveLessons.find((l) => l.id === selectedLessonId) || effectiveLessons[0];
    if (targetLesson) {
      startLesson(targetLesson, durationMinutes);
      navigate('/practice');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Practice Setup
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize your practice session, select language keyboard layout, and choose your lesson level.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* 1. Language & Keyboard Layout Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            1. Select Language & Keyboard
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                language === 'hi'
                  ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/30 ring-2 ring-purple-500/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold font-hindi shrink-0 ${
                  language === 'hi'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                क
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">हिन्दी</h3>
                  <Badge variant="purple">InScript Layout</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Official standard InScript layout with matras, halants, and conjuncts.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                language === 'en'
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                EN
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">English</h3>
                  <Badge variant="blue">QWERTY Layout</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Standard US keyboard layout with full punctuation and number row.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* 2. Difficulty Level */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            2. Difficulty
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`py-3 px-4 rounded-xl border text-center font-medium capitalize text-sm transition-all cursor-pointer ${
                  difficulty === level
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Practice Type */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            3. Practice Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { type: 'keys', label: 'Keys' },
              { type: 'words', label: 'Words' },
              { type: 'sentences', label: 'Sentences' },
              { type: 'paragraphs', label: 'Paragraphs' },
              { type: 'timed', label: 'Timed Sprint' },
            ].map(({ type, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => setPracticeType(type as PracticeType)}
                className={`py-2.5 px-3 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                  practiceType === type
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Session Duration */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            4. Duration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { mins: 0, label: 'Unlimited' },
              { mins: 1, label: '1 Minute' },
              { mins: 3, label: '3 Minutes' },
              { mins: 5, label: '5 Minutes' },
              { mins: 10, label: '10 Minutes' },
            ].map(({ mins, label }) => (
              <button
                key={mins}
                type="button"
                onClick={() => setDurationMinutes(mins)}
                className={`py-2 px-3 rounded-xl border text-center text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  durationMinutes === mins
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Clock size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Lesson Selection List */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            5. Select Lesson Passage
          </label>
          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {effectiveLessons.map((lesson) => {
              const isSelected = lesson.id === selectedLessonId;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-1 ring-blue-500'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {lesson.title}
                      </h4>
                      <Badge variant="slate">{lesson.practiceType}</Badge>
                    </div>
                    {lesson.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {lesson.description}
                      </p>
                    )}
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mt-1 truncate">
                      Sample: {lesson.targetText.slice(0, 40)}...
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">
                      {lesson.steps.length} chars
                    </span>
                    {isSelected && (
                      <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Practice Action */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button
            id="start-practice-btn"
            data-testid="start-practice-btn"
            size="lg"
            variant="primary"
            onClick={handleStartPractice}
            icon={<Play size={18} />}
            className="w-full sm:w-auto px-8"
          >
            Start Practice
          </Button>
        </div>
      </div>
    </div>
  );
};
