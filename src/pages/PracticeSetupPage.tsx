import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Language } from '../types/keyboard.types';
import { Difficulty, LessonCategory } from '../types/lesson.types';
import { ALL_LESSONS } from '../data/lessons';
import { useSessionStore } from '../store/sessionStore';
import { useSettingsStore } from '../store/settingsStore';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Play,
  Clock,
  CheckCircle2,
  Search,
  BookOpen,
  Filter,
} from 'lucide-react';

type FilterCategory = 'all' | LessonCategory;
type FilterDifficulty = 'all' | Difficulty;

export const PracticeSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language: defaultLang, setLanguage: saveDefaultLang } = useSettingsStore();
  const startLesson = useSessionStore((state) => state.startLesson);

  const initialLang = (searchParams.get('lang') as Language) || defaultLang || 'hi';
  const [language, setLanguage] = useState<Language>(initialLang);
  const [category, setCategory] = useState<FilterCategory>('all');
  const [difficulty, setDifficulty] = useState<FilterDifficulty>('all');
  const [durationMinutes, setDurationMinutes] = useState<number>(0); // 0 = unlimited
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');

  // Keep global setting aligned
  useEffect(() => {
    saveDefaultLang(language);
  }, [language, saveDefaultLang]);

  // Compute filtered lessons
  const filteredLessons = useMemo(() => {
    return ALL_LESSONS.filter((lesson) => {
      if (lesson.language !== language) return false;
      if (difficulty !== 'all' && lesson.difficulty !== difficulty) return false;
      if (category !== 'all' && lesson.category !== category && lesson.practiceType !== category) {
        return false;
      }
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = lesson.title.toLowerCase().includes(q);
        const matchDesc = (lesson.description || '').toLowerCase().includes(q);
        const matchTags = (lesson.tags || []).some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTags) return false;
      }
      return true;
    });
  }, [language, category, difficulty, searchQuery]);

  // Maintain selected lesson stably without unsolicited resets
  useEffect(() => {
    if (filteredLessons.length > 0) {
      const isSelectedStillValid = filteredLessons.some((l) => l.id === selectedLessonId);
      if (!isSelectedStillValid) {
        setSelectedLessonId(filteredLessons[0].id);
      }
    }
  }, [filteredLessons, selectedLessonId]);

  const handleStartPractice = () => {
    const targetLesson =
      filteredLessons.find((l) => l.id === selectedLessonId) ||
      ALL_LESSONS.find((l) => l.id === selectedLessonId) ||
      filteredLessons[0];

    if (targetLesson) {
      startLesson(targetLesson, durationMinutes);
      navigate('/practice');
    }
  };

  const englishCategories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Chapters' },
    { id: 'keys', label: 'Keys' },
    { id: 'combinations', label: 'Combinations' },
    { id: 'words', label: 'Words' },
    { id: 'sentences', label: 'Sentences' },
    { id: 'paragraphs', label: 'Paragraphs' },
    { id: 'stories', label: 'Stories' },
    { id: 'tests', label: 'Full Tests' },
  ];

  const hindiCategories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'सभी अध्याय' },
    { id: 'keys', label: 'स्वर व व्यंजन' },
    { id: 'combinations', label: 'मात्राएं व संयुक्त' },
    { id: 'words', label: 'शब्द अभ्यास' },
    { id: 'sentences', label: 'वाक्य अभ्यास' },
    { id: 'paragraphs', label: 'अनुच्छेद' },
    { id: 'stories', label: 'कहानियां' },
    { id: 'tests', label: 'दक्षता परीक्षा' },
  ];

  const categories = language === 'hi' ? hindiCategories : englishCategories;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Practice Setup & Curriculum
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Select language, target curriculum category, difficulty, practice duration, and choose any chapter.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* 1. Language & Keyboard Layout Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            1. Language & Keyboard Layout
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setLanguage('hi');
                setCategory('all');
              }}
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
                  Official Devanagari InScript layout covering all swar, vyanjan, matras, halants, and conjuncts.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setLanguage('en');
                setCategory('all');
              }}
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
                  Standard US QWERTY keyboard curriculum spanning home row, numbers, words, and long stories.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* 2. Practice Duration Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            2. Practice Duration (Session will continue seamlessly through multiple passages)
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
                className={`py-2.5 px-3 rounded-xl border text-center text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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

        {/* 3. Curriculum Category Filter */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            3. Curriculum Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  category === id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Difficulty Level & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              4. Difficulty Filter
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['all', 'beginner', 'intermediate', 'advanced'] as FilterDifficulty[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`py-2 px-2.5 rounded-xl border text-center font-medium capitalize text-xs transition-all cursor-pointer ${
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Search Lessons
            </label>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by chapter title, topic or keyword..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 5. Lesson Selection List */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              5. Select Chapter ({filteredLessons.length} available)
            </label>
            <span className="text-xs text-slate-400 font-medium">
              Click any chapter card to select
            </span>
          </div>

          {filteredLessons.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
              <Filter size={32} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching lessons found
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting "All Chapters" or clearing your search filter.
              </p>
            </div>
          ) : (
            <div
              data-testid="lesson-list-container"
              className="space-y-2.5 max-h-80 overflow-y-auto pr-1.5 focus:outline-none"
            >
              {filteredLessons.map((lesson) => {
                const isSelected = lesson.id === selectedLessonId;
                const passagesCount = lesson.content ? lesson.content.length : 1;
                const totalWords = (lesson.targetText || '').split(/\s+/).filter(Boolean).length;

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    role="button"
                    aria-pressed={isSelected}
                    data-testid={`lesson-card-${lesson.id}`}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 ring-2 ring-blue-500/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60'
                    }`}
                  >
                    <div className="min-w-0 pr-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4
                          className={`text-sm font-semibold truncate ${
                            isSelected
                              ? 'text-blue-900 dark:text-blue-100 font-bold'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {lesson.title}
                        </h4>
                        <Badge variant={lesson.difficulty === 'beginner' ? 'green' : lesson.difficulty === 'intermediate' ? 'amber' : 'purple'}>
                          {lesson.difficulty}
                        </Badge>
                        <Badge variant="slate">{lesson.category}</Badge>
                      </div>

                      {lesson.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                          {lesson.description}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 font-mono">
                        <span>{passagesCount} {passagesCount === 1 ? 'passage' : 'passages'}</span>
                        <span>•</span>
                        <span>~{totalWords} words/passage</span>
                        <span>•</span>
                        <span>Sample: {lesson.targetText.slice(0, 35)}...</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2.5 pl-2">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 font-mono block">
                          ~{Math.round((lesson.estimatedDuration || 60) / 60)}m
                        </span>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 size={20} className="text-blue-600 dark:text-blue-400 shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Lesson Summary & Start Action */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <BookOpen size={16} className="text-slate-400 shrink-0" />
            <span>
              Ready to practice:{' '}
              <strong className="text-slate-800 dark:text-slate-200">
                {filteredLessons.find((l) => l.id === selectedLessonId)?.title ||
                  ALL_LESSONS.find((l) => l.id === selectedLessonId)?.title ||
                  'No lesson selected'}
              </strong>
            </span>
          </div>

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
