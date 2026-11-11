import { TypingLesson } from '../../types/lesson.types';
import { createLesson } from '../lessonBuilder';

export const ENGLISH_KEY_LESSONS: TypingLesson[] = [
  // Chapter 1: Home Row - Left Hand (A S D F)
  createLesson(
    'en-keys-1',
    'Chapter 1: Home Row - Left Hand (A S D F)',
    'en',
    'keys',
    'beginner',
    'Anchor your left hand on A, S, D, and F. Practice individual finger muscle memory.',
    [
      'asdf asdf asdf asdf aassddff fdsa fdsa fads asdf',
      'fa da sa fa as df fa ad sa da asdf faas daas',
      'fads dafs safd adfs fada sada dasa fasa fasd dasf',
      'asdf fads asdf dafs fasa dasa sada fada asdf fdsa',
    ],
    1,
    ['home-row', 'left-hand', 'asdf']
  ),

  // Chapter 2: Home Row - Right Hand (J K L ;)
  createLesson(
    'en-keys-2',
    'Chapter 2: Home Row - Right Hand (J K L ;)',
    'en',
    'keys',
    'beginner',
    'Anchor your right hand on J, K, L, and Semicolon. Master right-hand finger placements.',
    [
      'jkl; jkl; jkl; jkl; jjkkll;; ;lkj ;lkj kl;j jkl;',
      'ja ka la ;a la ka ja ;l kj l; kj jk kl l; ;l',
      'jkl; ;lkj kjl; l;jk ;jlk lk;j j;kl k;lj ;klj jkl;',
      'jkl; jkl; kl;j ;lkj jk;l lk;j ;jkl j;lk jkl; ;lkj',
    ],
    2,
    ['home-row', 'right-hand', 'jkl;']
  ),

  // Chapter 3: Complete Home Row Coordination
  createLesson(
    'en-keys-3',
    'Chapter 3: Complete Home Row Coordination',
    'en',
    'keys',
    'beginner',
    'Combine both hands on the home row: ASDF and JKL; with coordination patterns.',
    [
      'asdf jkl; asdf jkl; a; s l dk fj fj dk s l a;',
      'ask fad fall flask lad salad glad alas alfalfa salsa',
      'adds dads flak fads lads skalds kafka flask salad',
      'a lad ask a dad; a glad dad asks a lass; salad fall',
    ],
    3,
    ['home-row', 'coordination']
  ),

  // Chapter 4: Top Row - Left Hand (Q W E R T)
  createLesson(
    'en-keys-4',
    'Chapter 4: Top Row - Left Hand (Q W E R T)',
    'en',
    'keys',
    'beginner',
    'Reach upward from home row with left fingers to Q, W, E, R, and T.',
    [
      'qwer trew qwer trew qwert trewq qwert trewq qwer',
      'wet raw war red tree water tear treat wear were',
      'quest tweet write quote trade aware waste reward treat',
      'we were water aware; raw water wet red wheat tree',
    ],
    4,
    ['top-row', 'left-hand', 'qwert']
  ),

  // Chapter 5: Top Row - Right Hand (Y U I O P)
  createLesson(
    'en-keys-5',
    'Chapter 5: Top Row - Right Hand (Y U I O P)',
    'en',
    'keys',
    'beginner',
    'Reach upward from home row with right fingers to Y, U, I, O, and P.',
    [
      'yuio poiuy yuio poiuy yuiop poiuy yuiop poiuy yuio',
      'you pop out put toy pool pipe plum pulp your',
      'polar poppy purity output uplift priority loop puppy plot',
      'you put your pop out; prior pup pop up your loop',
    ],
    5,
    ['top-row', 'right-hand', 'yuiop']
  ),

  // Chapter 6: Complete Top Row
  createLesson(
    'en-keys-6',
    'Chapter 6: Complete Top Row',
    'en',
    'keys',
    'beginner',
    'Full top row integration connecting QWERTY with UIOP across both hands.',
    [
      'qwerty uiop qwerty uiop query route power typist quote',
      'pure power quietly write pretty poetry upon upper tower',
      'twenty quiet puppies peep toward yellow willow trees quietly',
      'proper query output write your report without prior worry',
    ],
    6,
    ['top-row', 'both-hands']
  ),

  // Chapter 7: Bottom Row - Left Hand (Z X C V B)
  createLesson(
    'en-keys-7',
    'Chapter 7: Bottom Row - Left Hand (Z X C V B)',
    'en',
    'keys',
    'beginner',
    'Curl left-hand fingers downward from home row to Z, X, C, V, and B.',
    [
      'zxcv bvcxz zxcv bvcxz zxcvb bvcxz zxcvb bvcxz zxcv',
      'cab vat bad wax base cave verb back zinc box',
      'brave cabin velvet exact zebra civic vibrant baked batch',
      'brave cab brave base; exact velvet box vibrant civic',
    ],
    7,
    ['bottom-row', 'left-hand', 'zxcvb']
  ),

  // Chapter 8: Bottom Row - Right Hand (N M Comma Period Slash)
  createLesson(
    'en-keys-8',
    'Chapter 8: Bottom Row - Right Hand (N M , . /)',
    'en',
    'keys',
    'beginner',
    'Reach downward with right-hand fingers to N, M, comma, period, and slash.',
    [
      'nm,. nm,. nm,. nm,. men man norm moon main name',
      'none, moon, many, name, main, norm, menu, memo.',
      'common human manners mean minimal modern manual manner.',
      'man, woman, human, name. menu, memo, moon, norm.',
    ],
    8,
    ['bottom-row', 'right-hand', 'punctuation']
  ),

  // Chapter 9: Complete Bottom Row
  createLesson(
    'en-keys-9',
    'Chapter 9: Complete Bottom Row',
    'en',
    'keys',
    'beginner',
    'Integrate full bottom row keys from Z through slash across both hands.',
    [
      'zxcvbnm zxcvbnm cab man wax bin map zone calm',
      'brave men made calm moves between vocal zones.',
      'combine vibrant bronze banners above moving modern cabins.',
      'calm minds overcome complex mixed vocal vibrations.',
    ],
    9,
    ['bottom-row', 'full-row']
  ),

  // Chapter 10: Spacebar and Modifier Keys
  createLesson(
    'en-keys-10',
    'Chapter 10: Spacebar and Modifier Keys',
    'en',
    'keys',
    'beginner',
    'Develop consistent thumb cadence on spacebar and smooth rhythm between words.',
    [
      'a s d f j k l ; q w e r t y u i o p z x c v b n m',
      'the quick brown fox jumps over the lazy dog',
      'pack my box with five dozen liquor jugs quickly',
      'how razorback jumping frogs can level six piqued gymnasts',
    ],
    10,
    ['spacebar', 'modifiers', 'pangram']
  ),

  // Chapter 11: Number Row 0-9
  createLesson(
    'en-keys-11',
    'Chapter 11: Number Row 0–9',
    'en',
    'combinations',
    'intermediate',
    'Master upper reaching finger paths to digits 1 2 3 4 5 6 7 8 9 0.',
    [
      '12345 67890 12345 67890 10 29 38 47 56 65 74 83 92 01',
      'room 101 on floor 4 had 25 chairs and 38 tables in 1990.',
      'call 2045 or 3189 between 0800 and 1700 on day 26 of 2024.',
      'flight 747 departs gate 18 at 0930 with 285 passengers.',
    ],
    11,
    ['numbers', 'digits']
  ),

  // Chapter 12: Shifted Number Symbols
  createLesson(
    'en-keys-12',
    'Chapter 12: Shifted Number Symbols (! @ # $ % ^ & * ( ))',
    'en',
    'combinations',
    'intermediate',
    'Practice Shift key combinations with number keys to type standard symbols.',
    [
      '! @ # $ % ^ & * ( ) ! @ # $ % ^ & * ( ) #1 $50 100%',
      'order #452 costs $75 & gets 10% discount (save $7.50)!',
      'email user@domain.com with tag #urgent & score (95%*2)!',
      'symbol practice: (total + tax) * 15% = $120.00 #approved!',
    ],
    12,
    ['shift', 'symbols', 'numbers']
  ),

  // Chapter 13: Common Punctuation
  createLesson(
    'en-keys-13',
    'Chapter 13: Common Punctuation (. , ; : ? ! " \')',
    'en',
    'combinations',
    'intermediate',
    'Build precision typing periods, commas, semicolons, colons, question marks, and quotes.',
    [
      'Yes, really? No; wait: "Stop!" Did you say, \'Yes\'? Exactly.',
      'Note: remember to check, verify; confirm, and submit.',
      'Who is there? "I am," said he: "ready, willing, and able!"',
      'Read Chapter 1: Introduction; Chapter 2: Methods; Chapter 3: Results.',
    ],
    13,
    ['punctuation', 'quotes']
  ),

  // Chapter 14: Special Characters and Brackets
  createLesson(
    'en-keys-14',
    'Chapter 14: Symbols and Brackets ([ ] { } < > / \\ | ~ `)',
    'en',
    'combinations',
    'intermediate',
    'Reach brackets, braces, angle brackets, slashes, and code symbols.',
    [
      '[data] {code} <element> ~/home/path | filter || pipe',
      'array[0] = { id: 1, name: "<item>", valid: true };',
      'cat file.txt | grep "tag" > output.log 2> /dev/null',
      'if (x < y && y > 0) { return items[x]; } // verified',
    ],
    14,
    ['brackets', 'code', 'special']
  ),

  // Chapter 15: Capital Letters and Shift Combinations
  createLesson(
    'en-keys-15',
    'Chapter 15: Capital Letters and Shift Combinations',
    'en',
    'combinations',
    'intermediate',
    'Coordinate left and right Shift keys for alternating capitalized words and acronyms.',
    [
      'London Paris Tokyo New York New Delhi Sydney Cairo Rome',
      'HTML CSS JavaScript TypeScript React Node Python SQL API',
      'Dr. Alice visited Prof. Smith at NASA and UNESCO headquarters.',
      'Monday Tuesday Wednesday Thursday Friday Saturday Sunday.',
    ],
    15,
    ['capitals', 'shift']
  ),

  // Chapter 16: Mixed Keyboard Practice
  createLesson(
    'en-keys-16',
    'Chapter 16: Mixed Keyboard Practice',
    'en',
    'combinations',
    'intermediate',
    'Fluid transition between letters, numbers, punctuation, and symbols.',
    [
      'The 12 items in Box #A-4 costs $18.50 each (total: $222.00)!',
      'Plan-B: update 25% of servers on 11/12/2026; notify admin@net.org.',
      'Speed: 60 WPM with 98% accuracy beats 80 WPM with 85% accuracy!',
      'Check-in at Room #304: keys, badge, and ID verified 100%.',
    ],
    16,
    ['mixed', 'sprint']
  ),
];
