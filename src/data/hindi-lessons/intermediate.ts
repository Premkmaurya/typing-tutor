import { TypingLesson } from '../../types/lesson.types';
import { textToLessonSteps } from '../../core/typing/composer';

const createHindiLesson = (
  id: string,
  title: string,
  practiceType: 'words' | 'sentences',
  text: string,
  order: number,
  description?: string
): TypingLesson => ({
  id,
  language: 'hi',
  title,
  difficulty: 'intermediate',
  practiceType,
  targetText: text,
  steps: textToLessonSteps(text, 'hi'),
  description,
  order,
});

export const HINDI_INTERMEDIATE_LESSONS: TypingLesson[] = [
  createHindiLesson(
    'hi-int-1',
    'आ और ई की मात्रा (Aa & Ii Matras)',
    'words',
    'पानी राजा रानी खाना काम बात गाना ताला साला माला',
    1,
    'बाएं हाथ से मात्राएं: ा (KeyE) और ी (KeyR) का अभ्यास।'
  ),
  createHindiLesson(
    'hi-int-2',
    'उ, ऊ और ए, ऐ की मात्रा (U, Uu, E, Ai Matras)',
    'words',
    'दूध फूल देश मेला पैसा जैसा सूरज सुंदर खेल रेल',
    2,
    'मात्राएं: ु (KeyG), ू (KeyT), े (KeyS), ै (KeyW) का अभ्यास।'
  ),
  createHindiLesson(
    'hi-int-3',
    'हलंत और संयुक्ताक्षर (Halant & Conjuncts)',
    'words',
    'क्या प्यार स्थान ध्यान त्याग न्याय सत्य नमस्ते',
    3,
    'हलंत ् (KeyD) का उपयोग करके आधे अक्षरों और संयुक्ताक्षरों का अभ्यास।'
  ),
  createHindiLesson(
    'hi-int-4',
    'सरल वाक्य और पूर्णविराम (Sentences with Purna Viram)',
    'sentences',
    'भारत हमारा देश है। ज्ञान ही सबसे बड़ा धन है। समय अमूल्य है।',
    4,
    'पूर्णविराम । (Shift + .) के साथ पूरे हिंदी वाक्यों का टाइपिंग अभ्यास।'
  ),
];
