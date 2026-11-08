import { TypingLesson } from '../../types/lesson.types';
import { textToLessonSteps } from '../../core/typing/composer';

const createEnglishLesson = (
  id: string,
  title: string,
  practiceType: 'paragraphs' | 'timed',
  text: string,
  order: number,
  description?: string
): TypingLesson => ({
  id,
  language: 'en',
  title,
  difficulty: 'advanced',
  practiceType,
  targetText: text,
  steps: textToLessonSteps(text, 'en'),
  description,
  order,
});

export const ENGLISH_ADVANCED_LESSONS: TypingLesson[] = [
  createEnglishLesson(
    'en-adv-1',
    'Flow and Endurance Paragraph',
    'paragraphs',
    'Consistent touch typing transforms how you interact with computers. By eliminating the friction between thought and keystroke, writing becomes an effortless extension of your mind. Maintain a steady tempo and keep your hands relaxed.',
    1,
    'Sustained continuous typing over multiple sentences without looking at the keyboard.'
  ),
  createEnglishLesson(
    'en-adv-2',
    'Technical and Numerical Passage',
    'paragraphs',
    'System metrics: CPU load 42.8%, RAM allocated 16GB (DDR5-6000), transfer rate 850 MB/s. Status: OK. All 12 services responded within 15ms latency thresholds on node-04.',
    2,
    'Complex technical writing containing mixed case, percentages, punctuation, and numerals.'
  ),
  createEnglishLesson(
    'en-adv-3',
    'High Speed 60-Second Timed Sprint',
    'timed',
    'Speed comes naturally once accuracy is second nature. Never rush ahead of your fingers. Breathe evenly, strike each key lightly from the center of the keycap, and maintain a calm focus throughout the exercise.',
    3,
    'Test your maximum burst speed and consistency in a timed sprint.'
  ),
];
