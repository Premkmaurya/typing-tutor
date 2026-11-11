import { TypingLesson } from '../../types/lesson.types';
import { createLesson } from '../lessonBuilder';

export const ENGLISH_WORD_LESSONS: TypingLesson[] = [
  // Lesson 1: Essential Two-Letter Words
  createLesson(
    'en-words-1',
    'Essential Two-Letter Words',
    'en',
    'words',
    'beginner',
    'Common two-letter connecting words and prepositions for typing velocity.',
    [
      'am an as at be by do go he if in is it me my no of on or so to up us we',
      'be on to at by in of it as or up no do so my we if he me us go am an',
      'if it is to be it is up to me to go on as we do no so by',
      'an as at be by do go he if in is it me my no of on or so to up us we',
    ],
    20,
    ['two-letter', 'speed', 'flow']
  ),

  // Lesson 2: Fundamental Three-Letter Words
  createLesson(
    'en-words-2',
    'Fundamental Three-Letter Words',
    'en',
    'words',
    'beginner',
    'High-frequency three-letter nouns, verbs, and pronouns.',
    [
      'the and for you say but his not her can one out day get has him his how man new now old see two way who boy cat dog run sun top box cup pen',
      'ask cut fat hit joy key law let map net pan red sat tin van win yet act bag ear fly gem map row van wax',
      'big bad hot red fly dry cry spy fry shy sky fit sit lit wit bit hit pit tip zip rip dip lip sip nip',
      'the man saw the boy run for the bus and get one cup now',
    ],
    21,
    ['three-letter', 'vocabulary']
  ),

  // Lesson 3: Core Four-Letter Words
  createLesson(
    'en-words-3',
    'Core Four-Letter Words',
    'en',
    'words',
    'intermediate',
    'Crucial 4-letter vocabulary establishing finger coordination and rhythm.',
    [
      'time year work over back think after look well help talk turn move want need make know take come feel seem tell show give find must keep like good just even most also only some such than then look down side been high long very',
      'blue gold slow fast wind fire tree bird park boat road city farm milk bread card door leaf rock star lake rain',
      'hand head foot mind eye soul voice sound shape color light mark power space front step past line song word',
      'good work will make time move fast when you feel like help is near',
    ],
    22,
    ['four-letter', 'high-frequency']
  ),

  // Lesson 4: Five-Letter Everyday Vocabulary
  createLesson(
    'en-words-4',
    'Five-Letter Everyday Vocabulary',
    'en',
    'words',
    'intermediate',
    'Versatile 5-letter words with common prefixes and suffixes.',
    [
      'about after again along begin below black bring build clean clear close cover drive early earth every first great green happy heart heavy horse house learn leave light might money music never order place plant point power right river round',
      'sound space stand start state still table there thing think water where which world write young',
      'apple beach chair clock dance dream glass grape ocean piano train storm sweet bread clock flour',
      'every great start begins early when clear minds think about green earth',
    ],
    23,
    ['five-letter', 'vocabulary']
  ),

  // Lesson 5: Six-to-Eight Letter Word Practice
  createLesson(
    'en-words-5',
    'Six-to-Eight Letter Word Practice',
    'en',
    'words',
    'intermediate',
    'Longer words that develop sustained typing consistency.',
    [
      'action animal answer belong change danger dinner doctor energy family farmer garden growth honest island journey market member morning nature office person pocket public relation school season shadow sister street summer talent travel winter worker',
      'absolute balanced complete document electric friction galactic heritage innocent judgment keyboard listener mechanic notebook ordinary peaceful quietness register spectrum terminal universe vertical witness',
      'character condition direction discovery education framework happiness knowledge language principle processor structure technique vibration workspace',
      'honest people build balanced relations through patient education and peaceful communication',
    ],
    24,
    ['medium-words', 'stamina']
  ),

  // Lesson 6: Difficult Spelling and Double Letters
  createLesson(
    'en-words-6',
    'Difficult Spelling & Double Letters',
    'en',
    'words',
    'advanced',
    'Tackle awkward spelling patterns, silent letters, and doubled consonants.',
    [
      'accommodate achievement beautiful committee conscious discipline embarrass exaggerate grateful guidance guarantee hierarchy immediate jewelry leisure necessary neighbor occasion parallel privilege queue rhythm separate schedule vacuum weather',
      'success address afford assist collect connect correct difficult effect effort happen letter little middle million pattern possess pressure puppy sudden yellow',
      'acquire receipt foreign height freight subtle doubt through knight rhythm column autumn scissors knight debt',
      'discipline and rhythm guarantee success through necessary patience and persistent effort',
    ],
    25,
    ['difficult-spelling', 'double-letters']
  ),

  // Lesson 7: Advanced Polysyllabic & Technical Vocabulary
  createLesson(
    'en-words-7',
    'Advanced Polysyllabic Vocabulary',
    'en',
    'words',
    'advanced',
    'Master long technical and professional vocabulary with precision keystrokes.',
    [
      'architecture algorithm configuration development demonstration environmental infrastructure implementation representation transformation computational documentation communication qualification revolutionary characteristic extraordinary circumstantial distinguished vulnerability',
      'synchronization accountability authentication specification methodology prioritization initialization interoperability visualization responsiveness internationalization troubleshooting categorization optimization reliability',
      'comprehensive cryptographic decentralized deterministic encapsulated heterogeneous instrumental navigational operational quintessential quantitative reconstructive statistical symptomatic technological unpredictable verification',
      'architectural configuration requires comprehensive documentation and reliable synchronization',
    ],
    26,
    ['polysyllabic', 'technical']
  ),
];
