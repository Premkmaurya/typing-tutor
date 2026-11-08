import { TypingLesson } from '../../types/lesson.types';
import { textToLessonSteps } from '../../core/typing/composer';

const createEnglishLesson = (
  id: string,
  title: string,
  text: string,
  order: number,
  description?: string
): TypingLesson => ({
  id,
  language: 'en',
  title,
  difficulty: 'beginner',
  practiceType: 'keys',
  targetText: text,
  steps: textToLessonSteps(text, 'en'),
  description,
  order,
});

export const ENGLISH_BEGINNER_LESSONS: TypingLesson[] = [
  createEnglishLesson(
    'en-beg-1',
    'Home Row Keys (ASDF JKL;)',
    'asdf jkl; asdf jkl; asdf jkl;',
    1,
    'Master the home row foundation keys with left and right hands.'
  ),
  createEnglishLesson(
    'en-beg-2',
    'Home Row Words',
    'ask fad fall flask lad salad glad',
    2,
    'Combine home row keys into real common English words.'
  ),
  createEnglishLesson(
    'en-beg-3',
    'Top Row Keys (QWERTY UIOP)',
    'quit write tree root power type',
    3,
    'Practice reaching up to the top row keys smoothly.'
  ),
  createEnglishLesson(
    'en-beg-4',
    'Bottom Row Keys (ZXCVBNM)',
    'zinc cab view back name mix camp',
    4,
    'Practice the bottom row reach and index finger curls.'
  ),
  createEnglishLesson(
    'en-beg-5',
    'All Alphabet Keys Combined',
    'the quick brown fox jumps over the lazy dog',
    5,
    'The classic pangram covering every letter from A to Z.'
  ),
];
