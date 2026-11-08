import { ENGLISH_BEGINNER_LESSONS } from './beginner';
import { ENGLISH_INTERMEDIATE_LESSONS } from './intermediate';
import { ENGLISH_ADVANCED_LESSONS } from './advanced';
import { TypingLesson } from '../../types/lesson.types';

export const ALL_ENGLISH_LESSONS: TypingLesson[] = [
  ...ENGLISH_BEGINNER_LESSONS,
  ...ENGLISH_INTERMEDIATE_LESSONS,
  ...ENGLISH_ADVANCED_LESSONS,
];
