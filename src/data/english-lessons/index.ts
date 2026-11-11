import { TypingLesson } from '../../types/lesson.types';
import { ENGLISH_KEY_LESSONS } from './keys';
import { ENGLISH_WORD_LESSONS } from './words';
import { ENGLISH_SENTENCE_LESSONS } from './sentences';
import { ENGLISH_PARAGRAPH_LESSONS } from './paragraphs';
import { ENGLISH_STORY_LESSONS } from './stories';
import { createLesson } from '../lessonBuilder';

// Full typing test evaluations for English QWERTY
export const ENGLISH_TEST_LESSONS: TypingLesson[] = [
  createLesson(
    'en-test-1',
    'Full Typing Test: Standard General Assessment',
    'en',
    'tests',
    'intermediate',
    'Standard 5-minute typing test evaluation covering mixed vocabulary, punctuation, and numerals.',
    [
      'A complete typing evaluation measures both typing velocity and sustained character precision across varied text passages.',
      'Professional typists balance rhythm and finger posture to minimize physical fatigue while consistently achieving over 60 WPM.',
      'Regular practice with diverse text structures, numbers like 1984 or 2026, and symbols such as $50 and 100% builds true mastery.',
    ],
    70,
    ['test', 'evaluation', 'qwerty']
  ),
  createLesson(
    'en-test-2',
    'Full Typing Test: High-Speed Sprint Challenge',
    'en',
    'tests',
    'advanced',
    'Demanding endurance test designed for advanced typists aiming for 70+ WPM precision.',
    [
      'Mastery of touch typing transforms the keyboard into an intuitive extension of human thought and creative expression.',
      'Accuracy must always precede speed; correct motor habits established early prevent chronic errors and repetitive strain.',
      'Sustain concentration through every word, maintain steady breathing, and celebrate incremental improvements each day.',
    ],
    71,
    ['test', 'speed-test', 'advanced']
  ),
  createLesson(
    'en-test-3',
    "Full Typing Test: Lincoln's Family Life",
    'en',
    'tests',
    'advanced',
    "A historical passage about Abraham Lincoln's romantic relationships, marriage, and family. Adapted from Wikipedia's Abraham Lincoln article (CC BY-SA).",
    [
      'Some historians, such as Michael Burlingame, identify Lincoln\'s first romantic interest as Ann Rutledge, a young woman also from Kentucky whom he met when he moved to New Salem, Illinois. Lewis Gannett disputes that the evidence supports a romantic relationship between the two. David Herbert Donald states that "How that friendship between Lincoln and Rutledge developed into a romance cannot be reconstructed from the record." Rutledge died on August 25, 1835, of typhoid fever. Lincoln took her death very hard, sinking into a serious depression and contemplating suicide.',
      'In the early 1830s, Lincoln met Mary Owens from Kentucky. Late in 1836, Lincoln agreed to marry Owens if she returned to New Salem. Owens arrived that November and he courted her, but they both had second thoughts. On August 16, 1837, he wrote Owens a letter saying he would not blame her if she ended the relationship, and she declined to marry him.',
      'In 1839, Lincoln met Mary Todd in Springfield, Illinois, and the following year they became engaged. She was a daughter of Robert Smith Todd, a wealthy lawyer and businessman in Lexington, Kentucky. Lincoln initially broke off the engagement in early 1841, but the two were reconciled and married on November 4, 1842. In 1844, the couple bought a house in Springfield near his law office. The marriage was turbulent; Mary was verbally abusive and at times physically violent towards her husband.',
      'They had four sons. The eldest, Robert Todd Lincoln, was born in 1843 and was the only child to live to adulthood. Edward Baker "Eddie" Lincoln, born in 1846, died February 1, 1850, probably of tuberculosis. Lincoln\'s third son, William Wallace "Willie" Lincoln, was born on December 21, 1850, and died of a fever at the White House on February 20, 1862. The youngest, Thomas "Tad" Lincoln, was born on April 4, 1853, and died of edema at age 18 on July 16, 1871.',
      'Lincoln loved children, and the Lincolns were not considered to be strict with their own. The deaths of Eddie and Willie had profound effects on both parents. Lincoln suffered from "melancholy," a condition now thought to be clinical depression.',
    ],
    72,
    ['test', 'history', 'abraham-lincoln']
  ),
];

export const ALL_ENGLISH_LESSONS: TypingLesson[] = [
  ...ENGLISH_KEY_LESSONS,
  ...ENGLISH_WORD_LESSONS,
  ...ENGLISH_SENTENCE_LESSONS,
  ...ENGLISH_PARAGRAPH_LESSONS,
  ...ENGLISH_STORY_LESSONS,
  ...ENGLISH_TEST_LESSONS,
];
