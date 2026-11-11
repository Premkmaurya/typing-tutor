import { TypingLesson } from '../../types/lesson.types';
import { createLesson } from '../lessonBuilder';

export const ENGLISH_PARAGRAPH_LESSONS: TypingLesson[] = [
  // Paragraph Lesson 1: Daily Routine & Morning Discipline
  createLesson(
    'en-para-1',
    'Morning Routines and Daily Focus',
    'en',
    'paragraphs',
    'intermediate',
    'Reflective passage on starting the morning with clarity and intention.',
    [
      'A calm morning routine sets the tone for a productive day. Waking up early provides a quiet window of uninterrupted time to reflect, organize tasks, and prepare the mind before the bustle of daily life begins. When we cultivate steady morning habits, difficult decisions become easier and energy remains balanced throughout the afternoon.',
      'Physical activity and a wholesome breakfast awaken both body and mind. Stepping outdoors for a brisk walk introduces fresh air, gentle sunlight, and a grounded perspective. Taking ten minutes to write down core priorities helps avoid reactive distractions and keeps attention focused on meaningful accomplishments.',
      'Evening reflections complete the daily cycle with gratitude. Taking a moment before sleeping to review what went well builds resilience and satisfaction. With each passing day, deliberate daily habits transform into long-term personal growth and lasting peace of mind.',
    ],
    40,
    ['routine', 'focus', 'discipline']
  ),

  // Paragraph Lesson 2: The Transformative Power of Education
  createLesson(
    'en-para-2',
    'The Transformative Power of Education',
    'en',
    'paragraphs',
    'intermediate',
    'A thought-provoking paragraph on learning, inquiry, and human development.',
    [
      'Education is not merely the accumulation of facts; it is the ignition of an inquisitive mind. True learning teaches students how to think critically, evaluate evidence objectively, and question unverified assumptions. In an era of rapid technological disruption, the ability to learn, unlearn, and relearn is the most valuable skill a person can possess.',
      'Great educators inspire curiosity rather than demanding blind obedience. By fostering an environment of respectful debate and creative problem-solving, classrooms become laboratories of discovery. When young people realize that their questions matter, they gain the courage to tackle real-world challenges.',
      'Ultimately, educated citizens contribute constructively to their communities. They recognize that empathy and knowledge must walk hand in hand. A society that prioritizes universal education builds the foundation for equitable progress, scientific innovation, and enduring democratic values.',
    ],
    41,
    ['education', 'learning', 'growth']
  ),

  // Paragraph Lesson 3: Technology and Human Connection
  createLesson(
    'en-para-3',
    'Technology and Human Connection',
    'en',
    'paragraphs',
    'intermediate',
    'Examining how modern communication networks reshape society.',
    [
      'Digital technology has connected the furthest corners of our planet in real time. We can exchange ideas, collaborate across time zones, and access human knowledge with a single keystroke. Yet, genuine connection requires more than high-speed bandwidth; it demands genuine presence, active listening, and heartfelt empathy.',
      'While social networks provide unprecedented access to information, they also present subtle challenges to our attention span and mental equilibrium. Spending hours scrolling through curated feeds can quietly replace deep conversations and contemplative solitude. Striking a conscious balance between digital utility and offline mindfulness is essential.',
      'When used purposefully, digital tools empower artists, researchers, and community builders to solve complex global problems. The true measure of technological advancement lies not in the complexity of our gadgets, but in how effectively they enhance human dignity and cooperative progress.',
    ],
    42,
    ['technology', 'society', 'communication']
  ),

  // Paragraph Lesson 4: Nature, Forests and Environmental Harmony
  createLesson(
    'en-para-4',
    'Nature, Forests and Environmental Harmony',
    'en',
    'paragraphs',
    'intermediate',
    'Appreciating ecological balance and preserving the natural world.',
    [
      'Forests are the living lungs of our planet, sustaining biodiversity and regulating global climate systems. Beneath the canopy of ancient trees lies an interconnected web of life where roots, fungi, and micro-organisms share essential nutrients and signals. Walking beneath tall pine trees evokes a timeless stillness that restores mental clarity.',
      'Rivers and oceans sustain millions of species while nourishing the agricultural valleys that feed humanity. Every drop of rain and every gentle mountain stream plays a role in the water cycle that makes civilization possible. Protecting freshwater reserves is not merely an environmental slogan; it is an urgent requirement for survival.',
      'Responsible stewardship of natural resources requires collective action and sustainable choices. By conserving energy, reducing waste, and restoring native ecosystems, we ensure that coming generations inherit a flourishing, green, and vibrant world.',
    ],
    43,
    ['nature', 'environment', 'ecology']
  ),

  // Paragraph Lesson 5: The Science of Habit and Personal Mastery
  createLesson(
    'en-para-5',
    'The Science of Habit and Personal Mastery',
    'en',
    'paragraphs',
    'advanced',
    'How small incremental improvements compound into remarkable achievements.',
    [
      'Significant life changes rarely occur in dramatic bursts; they are the compounded result of small, consistent daily actions. Typing practice exemplifies this principle perfectly: typing just fifteen minutes every morning refines muscle memory, boosts neuromuscular coordination, and steadily elevates speed and confidence over time.',
      'Neuroscientists refer to the brain\'s capacity to adapt and rewire itself as neuroplasticity. Every time you consciously strike the correct key without looking down at the keyboard, your neural pathways reinforce the physical map of the layout. Mistakes provide vital feedback, guiding fingers toward greater accuracy and smoother transitions.',
      'Patience is the cornerstone of mastery in any craft. When frustration arises, mindful typists pause, breathe deeply, and resume with relaxed shoulders and calm cadence. By celebrating steady progress over immediate perfection, lifelong competence is forged.',
    ],
    44,
    ['habits', 'mastery', 'science']
  ),

  // Paragraph Lesson 6: History and the Evolution of Written Language
  createLesson(
    'en-para-6',
    'History and the Evolution of Written Language',
    'en',
    'paragraphs',
    'advanced',
    'Tracing the path from ancient clay tablets to modern digital keyboards.',
    [
      'The invention of writing stands among humanity\'s most momentous achievements. From Mesopotamian cuneiform pressed into wet clay to Egyptian hieroglyphs carved in limestone, early scripts allowed ideas to outlive individual human lives and bridge ancient generations across centuries of silence.',
      'The movable type printing press in the fifteenth century democratized knowledge, fueling scientific revolutions and spreading literacy to millions. Centuries later, mechanical typewriters standardized keyboard arrangements, introducing the QWERTY layout that still anchors our modern laptops, phones, and typing tutors today.',
      'Today, digital text flows effortlessly through fiber optic cables and satellite links across continents. While the physical mediums have evolved dramatically, the fundamental purpose of writing remains unchanged: to articulate human thought, preserve cultural truth, and inspire future generations.',
    ],
    45,
    ['history', 'writing', 'culture']
  ),
];
