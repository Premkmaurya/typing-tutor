import { TypingLesson } from '../../types/lesson.types';
import { createLesson } from '../lessonBuilder';

export const ENGLISH_SENTENCE_LESSONS: TypingLesson[] = [
  // Lesson 1: Daily Routine & Conversational English
  createLesson(
    'en-sentences-1',
    'Daily Routine & Conversational Sentences',
    'en',
    'sentences',
    'beginner',
    'Natural daily conversational sentences for practical typing fluency.',
    [
      'Good morning, I hope you have a wonderful and productive day ahead.',
      'Please make sure to turn off the lights before leaving the room.',
      'We usually have breakfast together at eight in the morning.',
      'I am going to the grocery store to buy fresh vegetables and milk.',
      'Can you please help me find my notebook on the wooden desk?',
      'She loves drinking a warm cup of tea every evening by the window.',
      'Walking in the neighborhood park always brings peace to the mind.',
      'They decided to take a short break after finishing their chores.',
      'He always keeps his promises and helps friends in times of need.',
      'Let us meet near the city library tomorrow afternoon at three.',
    ],
    30,
    ['daily-routine', 'conversation']
  ),

  // Lesson 2: Education, Learning & School Life
  createLesson(
    'en-sentences-2',
    'Education & School Life Sentences',
    'en',
    'sentences',
    'beginner',
    'Sentences centered around classroom, reading, knowledge, and study habits.',
    [
      'Education opens endless doors to personal growth and wisdom.',
      'The teacher explained the scientific experiment with great clarity.',
      'Students gathered quietly in the central hall for the morning assembly.',
      'Reading books every single day expands your vocabulary and imagination.',
      'Mathematics requires regular practice and clear logical reasoning.',
      'Our school library contains thousands of fascinating reference books.',
      'Hard work and dedication are the true foundation of academic success.',
      'She submitted her history assignment well before the scheduled deadline.',
      'Curiosity encourages students to ask questions and discover new ideas.',
      'Learning a new language improves cognitive agility and memory.',
    ],
    31,
    ['education', 'school']
  ),

  // Lesson 3: Technology, Coding & Modern Computing
  createLesson(
    'en-sentences-3',
    'Technology & Digital Communication',
    'en',
    'sentences',
    'intermediate',
    'Vocabulary and syntax reflecting contemporary software, digital tools, and computing.',
    [
      'Clean code is easy to read, test, debug, and maintain over time.',
      'Web browsers interpret hypertext documents and render interactive interfaces.',
      'Ensure that user input is thoroughly validated before sending requests.',
      'Cloud platforms provide scalable infrastructure for modern applications.',
      'Artificial intelligence systems learn meaningful patterns from vast datasets.',
      'Always commit your changes with descriptive and concise messages.',
      'Responsive design ensures seamless display across mobile and desktop screens.',
      'Data encryption safeguards sensitive communication across public networks.',
      'Continuous integration tests code changes before deploying to production.',
      'Open source software thrives on community collaboration and transparent feedback.',
    ],
    32,
    ['technology', 'coding']
  ),

  // Lesson 4: Professional Communication & Business Writing
  createLesson(
    'en-sentences-4',
    'Professional & Business Communication',
    'en',
    'sentences',
    'intermediate',
    'Professional emails, memos, project updates, and meeting correspondence.',
    [
      'Please find attached the quarterly financial performance summary.',
      'Thank you for your prompt response and constructive recommendations.',
      'We have scheduled our project review meeting for next Tuesday morning.',
      'The executive committee approved the proposed timeline and budget allocation.',
      'Our team is committed to delivering high quality results on schedule.',
      'Please let us know if you require additional documentation or clarification.',
      'Effective collaboration among departments drives consistent organizational success.',
      'We appreciate your continued partnership and look forward to future initiatives.',
      'All team members should review the updated safety and compliance protocols.',
      'Customer satisfaction remains our top priority throughout this initiative.',
    ],
    33,
    ['professional', 'business']
  ),

  // Lesson 5: Punctuation-Rich & Complex Sentences
  createLesson(
    'en-sentences-5',
    'Punctuation-Rich & Complex Sentences',
    'en',
    'sentences',
    'advanced',
    'Sentences featuring semicolons, quotation marks, dashes, and varied punctuation.',
    [
      'To succeed in typing, practice daily; consistency, after all, creates mastery.',
      '"The journey of a thousand miles," wrote Lao Tzu, "begins with one step."',
      'Notice the rhythm: speed matters, yet accuracy remains paramount!',
      'Can you believe that over 75% of participants completed the 10-minute trial?',
      'She remarked: "Hard work beats talent when talent fails to work hard."',
      'Although the weather was stormy; nevertheless, our train arrived on schedule.',
      'Verify three items: first, your credentials; second, your network; third, your data.',
      'Is typing at 60 WPM good? Yes, especially when maintaining 98% accuracy!',
      'Dr. Watson replied, "Elementary, my dear Holmes; the clue was obvious."',
      'Life is 10% what happens to us, and 90% how we react to it.',
    ],
    34,
    ['punctuation', 'complex']
  ),
];
