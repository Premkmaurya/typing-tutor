import { TypingLesson } from '../../types/lesson.types';
import { textToLessonSteps } from '../../core/typing/composer';

const createEnglishLesson = (
  id: string,
  title: string,
  practiceType: 'words' | 'sentences',
  text: string,
  order: number,
  description?: string
): TypingLesson => ({
  id,
  language: 'en',
  title,
  difficulty: 'intermediate',
  practiceType,
  targetText: text,
  steps: textToLessonSteps(text, 'en'),
  description,
  order,
});

export const ENGLISH_INTERMEDIATE_LESSONS: TypingLesson[] = [
  createEnglishLesson(
    'en-int-1',
    'Common Daily Vocabulary',
    'words',
    'focus energy practice rhythm motion balance timing posture',
    1,
    'Build finger muscle memory with frequent high-efficiency English words.'
  ),
  createEnglishLesson(
    'en-int-2',
    'Capital Letters and Shift Key',
    'sentences',
    'Practice Makes Perfect. Quality Leads To Mastery And Speed.',
    2,
    'Synchronize the left and right Shift keys with uppercase letters.'
  ),
  createEnglishLesson(
    'en-int-3',
    'Punctuation and Flow',
    'sentences',
    'Typing is not just about speed; accuracy, calmness, and rhythm matter most.',
    3,
    'Integrate commas, semicolons, and periods into normal sentence rhythm.'
  ),
  createEnglishLesson(
    'en-int-4',
    'Numbers and Symbols',
    'sentences',
    'In 2026, over 75% of developers type at 60+ WPM with 98% accuracy.',
    4,
    'Master top-row numerals and common symbol combinations.'
  ),
];
