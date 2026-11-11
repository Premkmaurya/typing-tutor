import { Language } from '../types/keyboard.types';
import { Difficulty, LessonCategory, TypingLesson } from '../types/lesson.types';
import { textToLessonSteps } from '../core/typing/composer';

export function createLesson(
  id: string,
  title: string,
  language: Language,
  category: LessonCategory,
  difficulty: Difficulty,
  description: string,
  passages: string[],
  order: number,
  tags: string[] = []
): TypingLesson {
  const content = passages.map((p) => p.trim()).filter((p) => p.length > 0);
  const targetText = content[0] || '';
  return {
    id,
    language,
    title,
    category,
    practiceType: category,
    difficulty,
    description,
    content,
    targetText,
    steps: textToLessonSteps(targetText, language),
    estimatedDuration: Math.max(60, Math.ceil(targetText.length / 5) * 2),
    tags: tags.length > 0 ? tags : [category, difficulty, language],
    order,
  };
}
