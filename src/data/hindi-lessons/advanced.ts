import { TypingLesson } from '../../types/lesson.types';
import { textToLessonSteps } from '../../core/typing/composer';

const createHindiLesson = (
  id: string,
  title: string,
  practiceType: 'paragraphs' | 'timed',
  text: string,
  order: number,
  description?: string
): TypingLesson => ({
  id,
  language: 'hi',
  title,
  difficulty: 'advanced',
  practiceType,
  targetText: text,
  steps: textToLessonSteps(text, 'hi'),
  description,
  order,
});

export const HINDI_ADVANCED_LESSONS: TypingLesson[] = [
  createHindiLesson(
    'hi-adv-1',
    'सफलता और अभ्यास (Success & Practice)',
    'paragraphs',
    'नियमित अभ्यास से ही टाइपिंग में गति और शुद्धता आती है। जब आप बिना कीबोर्ड देखे आत्मविश्वास से टाइप करते हैं, तो आपके विचार सीधे स्क्रीन पर उतरते हैं। हमेशा सही मुद्रा में बैठकर टाइप करें।',
    1,
    'निरंतर और प्रवाहमयी हिंदी टाइपिंग का गद्यांश अभ्यास।'
  ),
  createHindiLesson(
    'hi-adv-2',
    'भारतीय संस्कृति और भाषा (Indian Heritage)',
    'paragraphs',
    'हिंदी भारत की प्रमुख भाषा है और यह देवनागरी लिपि में लिखी जाती है। यह लिपि वैज्ञानिक एवं ध्वन्यात्मक है, जिसमें जैसा बोला जाता है वैसा ही लिखा जाता है। इंस्क्रिप्ट कीबोर्ड इसी वैज्ञानिक पद्धति पर आधारित है।',
    2,
    'संयुक्ताक्षरों, विसर्ग और विशिष्ट मात्राओं से युक्त विस्तृत गद्यांश।'
  ),
  createHindiLesson(
    'hi-adv-3',
    'हिंदी गति परीक्षा (Hindi Speed Sprint)',
    'timed',
    'कर्म ही पूजा है। परिश्रम का कोई विकल्प नहीं होता। जो व्यक्ति समय का सदुपयोग करता है, सफलता अवश्य उसके कदम चूमती है। एकाग्रता से टाइप करें।',
    3,
    '60 सेकंड की समयबद्ध गति एवं शुद्धता परीक्षण।'
  ),
];
