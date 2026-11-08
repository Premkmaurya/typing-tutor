import { TypingLesson, Difficulty, PracticeType } from '../types/lesson.types';
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

export function getLessonsByLanguageAndDifficulty(
  language: Language,
  difficulty?: Difficulty,
  practiceType?: PracticeType
): TypingLesson[] {
  return ALL_LESSONS.filter((lesson) => {
    if (lesson.language !== language) return false;
    if (difficulty && lesson.difficulty !== difficulty) return false;
    if (practiceType && lesson.practiceType !== practiceType) return false;
    return true;
  });
}
