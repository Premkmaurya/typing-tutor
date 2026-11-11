import { TypingLesson, Difficulty, LessonCategory, PracticeType } from '../types/lesson.types';
import { Language } from '../types/keyboard.types';
import { ALL_ENGLISH_LESSONS } from './english-lessons';
import { ALL_HINDI_LESSONS } from './hindi-lessons';

export const ALL_LESSONS: TypingLesson[] = [
  ...ALL_ENGLISH_LESSONS,
  ...ALL_HINDI_LESSONS,
];

export function getLessonById(id: string): TypingLesson | undefined {
  return ALL_LESSONS.find((lesson) => lesson.id === id);
}

export function getLessonsByLanguage(language: Language): TypingLesson[] {
  return ALL_LESSONS.filter((l) => l.language === language);
}

export function getLessonsByLanguageAndDifficulty(
  language: Language,
  difficulty?: Difficulty | 'all',
  categoryOrPracticeType?: LessonCategory | PracticeType | 'all'
): TypingLesson[] {
  return ALL_LESSONS.filter((lesson) => {
    if (lesson.language !== language) return false;
    if (difficulty && difficulty !== 'all' && lesson.difficulty !== difficulty) {
      return false;
    }
    if (categoryOrPracticeType && categoryOrPracticeType !== 'all') {
      const matchesCategory = lesson.category === categoryOrPracticeType;
      const matchesPractice = lesson.practiceType === categoryOrPracticeType;
      if (!matchesCategory && !matchesPractice) return false;
    }
    return true;
  });
}
