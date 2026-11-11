import { TypingLesson } from '../../types/lesson.types';
import { HINDI_KEY_LESSONS } from './keys';
import { HINDI_MATRA_LESSONS } from './matras';
import { HINDI_WORD_LESSONS } from './words';
import { HINDI_SENTENCE_LESSONS } from './sentences';
import { HINDI_PARAGRAPH_LESSONS } from './paragraphs';
import { HINDI_STORY_LESSONS } from './stories';
import { createLesson } from '../lessonBuilder';

// Full typing test evaluations for Hindi InScript
export const HINDI_TEST_LESSONS: TypingLesson[] = [
  createLesson(
    'hi-test-1',
    'हिंदी इनस्क्रिप्ट मानक दक्षता परीक्षा',
    'hi',
    'tests',
    'intermediate',
    'मानक ५ मिनट की हिंदी टाइपिंग दक्षता परीक्षा जिसमें सभी मात्राओं, संयुक्त अक्षरों और अंकों का समावेश है।',
    [
      'हिंदी इनस्क्रिप्ट कीबोर्ड पर गति और शुद्धता का संतुलन ही वास्तविक टाइपिंग प्रवीणता की पहचान है।',
      'नियमित रूप से प्रतिदिन पंद्रह मिनट अभ्यास करने से उंगलियों का स्वतः समन्वय विकसित हो जाता है।',
      'वर्ष २०२६ में डिजिटल भारत के निर्माण में भारतीय भाषाओं की टाइपिंग दक्षता का अभूतपूर्व योगदान है।',
    ],
    70,
    ['test', 'inscript-test', 'evaluation']
  ),
  createLesson(
    'hi-test-2',
    'उच्च गति हिंदी इनस्क्रिप्ट स्प्रिंट परीक्षा',
    'hi',
    'tests',
    'advanced',
    'तीव्र गति अभ्यास जिसमें कठिन संयुक्त अक्षरों, हलंत और रेफ रकार का सघन मूल्यांकन होता है।',
    [
      'कठिन परिश्रम और अटूट एकाग्रता से ही मनुष्य अपनी आंतरिक क्षमताओं का पूर्ण विकास कर पाता है।',
      'ज्ञान की कोई सीमा नहीं होती और निरंतर सीखते रहने की जिज्ञासा ही मनुष्य को महान बनाती है।',
      'सत्य और निष्ठा के मार्ग पर चलकर प्राप्त की गई सफलता ही चिरस्थायी आनंद और मान सम्मान देती है।',
    ],
    71,
    ['test', 'speed-test', 'advanced']
  ),
];

export const ALL_HINDI_LESSONS: TypingLesson[] = [
  ...HINDI_KEY_LESSONS,
  ...HINDI_MATRA_LESSONS,
  ...HINDI_WORD_LESSONS,
  ...HINDI_SENTENCE_LESSONS,
  ...HINDI_PARAGRAPH_LESSONS,
  ...HINDI_STORY_LESSONS,
  ...HINDI_TEST_LESSONS,
];
