import { TypingLesson } from '../../types/lesson.types';
import { textToLessonSteps } from '../../core/typing/composer';

const createHindiLesson = (
  id: string,
  title: string,
  text: string,
  order: number,
  description?: string
): TypingLesson => ({
  id,
  language: 'hi',
  title,
  difficulty: 'beginner',
  practiceType: 'keys',
  targetText: text,
  steps: textToLessonSteps(text, 'hi'),
  description,
  order,
});

export const HINDI_BEGINNER_LESSONS: TypingLesson[] = [
  createHindiLesson(
    'hi-beg-1',
    'गृह पंक्ति व्यंजन (Home Row Consonants)',
    'प र क त च प र क त च प र क त च',
    1,
    'दाएं हाथ की गृह पंक्ति कुंजियां: प (H), र (J), क (K), त (L), च (;)।'
  ),
  createHindiLesson(
    'hi-beg-2',
    'सरल दो-वर्ण शब्द (Simple 2-Letter Words)',
    'कम पर तब सच कल जल पल मत रस कर',
    2,
    'बिना मात्रा वाले आम हिंदी शब्द - बुनियादी उंगलियों का समन्वय।'
  ),
  createHindiLesson(
    'hi-beg-3',
    'ऊपरी पंक्ति व्यंजन (Top Row Consonants)',
    'ब ह ग द ज ड ब ह ग द ज ड',
    3,
    'ऊपरी पंक्ति कुंजियां: ब (Y), ह (U), ग (I), द (O), ज (P), ड ([)।'
  ),
  createHindiLesson(
    'hi-beg-4',
    'निचली पंक्ति व्यंजन (Bottom Row Consonants)',
    'म न व ल स म न व ल स म न व ल स',
    4,
    'निचली पंक्ति कुंजियां: म (C), न (V), व (B), ल (N), स (M)।'
  ),
  createHindiLesson(
    'hi-beg-5',
    'तीन-वर्ण सरल शब्द (3-Letter Base Words)',
    'कमल पवन नमन चरण मगन जगत समय',
    5,
    'तीनों पंक्तियों के व्यंजनों को मिलाकर बने सरल सार्थक शब्द।'
  ),
];
