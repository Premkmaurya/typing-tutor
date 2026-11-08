import { HINDI_BEGINNER_LESSONS } from './beginner';
import { HINDI_INTERMEDIATE_LESSONS } from './intermediate';
import { HINDI_ADVANCED_LESSONS } from './advanced';
import { TypingLesson } from '../../types/lesson.types';

export const ALL_HINDI_LESSONS: TypingLesson[] = [
  ...HINDI_BEGINNER_LESSONS,
  ...HINDI_INTERMEDIATE_LESSONS,
  ...HINDI_ADVANCED_LESSONS,
];
