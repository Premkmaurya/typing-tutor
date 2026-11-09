import { describe, it, expect, beforeEach } from 'vitest';
import {
  extractWordsFromText,
  areWordsEqual,
  computeWordErrors,
  getNextExpectedKeyForWord,
} from '../core/typing/wordValidator';
import { useSessionStore } from '../store/sessionStore';
import { TypingLesson } from '../types/lesson.types';

describe('Word Validation Engine Unit Tests', () => {
  it('extracts words cleanly handling multiple, leading, and trailing spaces', () => {
    expect(extractWordsFromText('the quick brown fox')).toEqual([
      'the',
      'quick',
      'brown',
      'fox',
    ]);

    expect(extractWordsFromText('   the   quick   brown   fox   ')).toEqual([
      'the',
      'quick',
      'brown',
      'fox',
    ]);

    expect(extractWordsFromText('मेरा भारत सुंदर है।')).toEqual([
      'मेरा',
      'भारत',
      'सुंदर',
      'है।',
    ]);
  });

  it('correctly compares English and Hindi Unicode words with NFC normalization', () => {
    expect(areWordsEqual('quick', 'quick', 'en')).toBe(true);
    expect(areWordsEqual('quik', 'quick', 'en')).toBe(false);

    expect(areWordsEqual('मेरा', 'मेरा', 'hi')).toBe(true);
    expect(areWordsEqual('भारट', 'भारत', 'hi')).toBe(false);

    // Devanagari decomposed vs precomposed normalizes identically
    const decomposed = 'क\u093C'; // क + nukta
    const precomposed = 'क़';
    expect(areWordsEqual(decomposed, precomposed, 'hi')).toBe(true);
  });

  it('calculates Levenshtein edit distance for character error tracking', () => {
    expect(computeWordErrors('quick', 'quick')).toBe(0);
    expect(computeWordErrors('quik', 'quick')).toBe(1); // 1 deletion
    expect(computeWordErrors('भारट', 'भारत')).toBe(1); // 1 substitution
    expect(computeWordErrors('', 'fox')).toBe(3);
  });

  it('computes next expected key for virtual keyboard guidance', () => {
    // English 'quick'
    expect(getNextExpectedKeyForWord('quick', '', 'en')).toEqual({
      code: 'KeyQ',
      modifiers: [],
    });
    expect(getNextExpectedKeyForWord('quick', 'qu', 'en')).toEqual({
      code: 'KeyI',
      modifiers: [],
    });
    // When non-last word is complete, next expected key is Space
    expect(getNextExpectedKeyForWord('quick', 'quick', 'en', false)).toEqual({
      code: 'Space',
      modifiers: [],
    });
    // When last word is complete, next expected key is null (done)
    expect(getNextExpectedKeyForWord('quick', 'quick', 'en', true)).toEqual({
      code: null,
      modifiers: [],
    });

    // Hindi InScript 'मेरा'
    expect(getNextExpectedKeyForWord('मेरा', '', 'hi')).toEqual({
      code: 'KeyC', // म
      modifiers: [],
    });
    expect(getNextExpectedKeyForWord('मेरा', 'म', 'hi')).toEqual({
      code: 'KeyS', // े
      modifiers: [],
    });
    expect(getNextExpectedKeyForWord('मेरा', 'मेरा', 'hi')).toEqual({
      code: 'Space',
      modifiers: [],
    });
  });
});

describe('Word-Level Typing Session Workflow & Edge Cases', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const englishLesson: TypingLesson = {
    id: 'test-en-words',
    language: 'en',
    title: 'English Word Practice',
    difficulty: 'beginner',
    practiceType: 'words',
    targetText: 'the quick brown fox',
    steps: [],
    order: 1,
  };

  const vocabularyLesson: TypingLesson = {
    id: 'test-en-vocab',
    language: 'en',
    title: 'Vocabulary Passage',
    difficulty: 'intermediate',
    practiceType: 'words',
    targetText: 'focus energy practice rhythm motion',
    steps: [],
    order: 1,
  };

  const hindiPremLesson: TypingLesson = {
    id: 'test-hi-prem',
    language: 'hi',
    title: 'Hindi Sentence Practice',
    difficulty: 'beginner',
    practiceType: 'words',
    targetText: 'मेरा नाम प्रेम है',
    steps: [],
    order: 2,
  };

  it('validates the complete Section 9 required test: focus energx practice rhythm motion', () => {
    useSessionStore.getState().startLesson(vocabularyLesson, 0);
    const store = useSessionStore.getState;

    expect(store().words).toEqual(['focus', 'energy', 'practice', 'rhythm', 'motion']);
    expect(store().currentWordIndex).toBe(0);
    expect(store().wordResults[0].status).toBe('active');
    expect(store().wordResults[1].status).toBe('pending');

    // 1. Type "focus" + Space
    useSessionStore.getState().processKey('KeyF');
    useSessionStore.getState().processKey('KeyO');
    useSessionStore.getState().processKey('KeyC');
    useSessionStore.getState().processKey('KeyU');
    useSessionStore.getState().processKey('KeyS');
    expect(store().currentWordBuffer).toBe('focus');
    useSessionStore.getState().processKey('Space');

    // Immediately validate ONLY "focus" -> GREEN
    expect(store().wordResults[0].status).toBe('correct');
    expect(store().wordResults[0].expected).toBe('focus');
    expect(store().wordResults[0].actual).toBe('focus');
    expect(store().correctWords).toBe(1);
    expect(store().incorrectWords).toBe(0);
    expect(store().totalWordsAttempted).toBe(1);
    expect(store().wordAccuracy).toBe(100);

    // Automatically move active cursor to "energy" (index 1)
    expect(store().currentWordIndex).toBe(1);
    expect(store().wordResults[1].status).toBe('active');
    expect(store().currentWordBuffer).toBe('');

    // 2. Type "energx" + Space
    useSessionStore.getState().processKey('KeyE');
    useSessionStore.getState().processKey('KeyN');
    useSessionStore.getState().processKey('KeyE');
    useSessionStore.getState().processKey('KeyR');
    useSessionStore.getState().processKey('KeyG');
    useSessionStore.getState().processKey('KeyX');
    expect(store().currentWordBuffer).toBe('energx');
    useSessionStore.getState().processKey('Space');

    // Immediately validate ONLY "energy" -> RED (status 'incorrect')
    expect(store().wordResults[0].status).toBe('correct'); // preserved GREEN!
    expect(store().wordResults[1].status).toBe('incorrect'); // RED!
    expect(store().wordResults[1].expected).toBe('energy');
    expect(store().wordResults[1].actual).toBe('energx');
    expect(store().correctWords).toBe(1);
    expect(store().incorrectWords).toBe(1);
    expect(store().totalWordsAttempted).toBe(2);
    expect(store().wordAccuracy).toBe(50); // 1 of 2 = 50%

    // Progression is NEVER blocked! Cursor automatically moves to "practice" (index 2)
    expect(store().currentWordIndex).toBe(2);
    expect(store().wordResults[2].status).toBe('active');
    expect(store().currentWordBuffer).toBe('');

    // 3. Type "practice" + Space
    useSessionStore.getState().processKey('KeyP');
    useSessionStore.getState().processKey('KeyR');
    useSessionStore.getState().processKey('KeyA');
    useSessionStore.getState().processKey('KeyC');
    useSessionStore.getState().processKey('KeyT');
    useSessionStore.getState().processKey('KeyI');
    useSessionStore.getState().processKey('KeyC');
    useSessionStore.getState().processKey('KeyE');
    expect(store().currentWordBuffer).toBe('practice');
    useSessionStore.getState().processKey('Space');

    // Word 2 turns GREEN
    expect(store().wordResults[0].status).toBe('correct');
    expect(store().wordResults[1].status).toBe('incorrect');
    expect(store().wordResults[2].status).toBe('correct');
    expect(store().correctWords).toBe(2);
    expect(store().incorrectWords).toBe(1);
    expect(store().totalWordsAttempted).toBe(3);
    expect(store().wordAccuracy).toBe(67); // 2 of 3 = 67%

    // Automatically moves to "rhythm" (index 3)
    expect(store().currentWordIndex).toBe(3);
    expect(store().wordResults[3].status).toBe('active');

    // 4. Type "rhythm" + Space
    useSessionStore.getState().processKey('KeyR');
    useSessionStore.getState().processKey('KeyH');
    useSessionStore.getState().processKey('KeyY');
    useSessionStore.getState().processKey('KeyT');
    useSessionStore.getState().processKey('KeyH');
    useSessionStore.getState().processKey('KeyM');
    expect(store().currentWordBuffer).toBe('rhythm');
    useSessionStore.getState().processKey('Space');

    // Word 3 turns GREEN
    expect(store().wordResults[3].status).toBe('correct');
    expect(store().correctWords).toBe(3);
    expect(store().incorrectWords).toBe(1);
    expect(store().totalWordsAttempted).toBe(4);
    expect(store().wordAccuracy).toBe(75); // 3 of 4 = 75%

    // Automatically moves to "motion" (index 4)
    expect(store().currentWordIndex).toBe(4);
    expect(store().wordResults[4].status).toBe('active');

    // 5. Type "motion" (final word) - completes without requiring additional trailing space
    useSessionStore.getState().processKey('KeyM');
    useSessionStore.getState().processKey('KeyO');
    useSessionStore.getState().processKey('KeyT');
    useSessionStore.getState().processKey('KeyI');
    useSessionStore.getState().processKey('KeyO');
    useSessionStore.getState().processKey('KeyN');

    expect(store().wordResults[4].status).toBe('correct');
    expect(store().correctWords).toBe(4);
    expect(store().incorrectWords).toBe(1);
    expect(store().totalWordsAttempted).toBe(5);
    expect(store().wordAccuracy).toBe(80); // 4 of 5 = 80%
    expect(store().status).toBe('completed');
  });

  it('validates Hindi InScript with Unicode conjuncts and matras: मेरा नाम प्रेम है', () => {
    useSessionStore.getState().startLesson(hindiPremLesson, 0);
    const store = useSessionStore.getState;
    expect(store().words).toEqual(['मेरा', 'नाम', 'प्रेम', 'है']);

    // 1. Type "मेरा": म (KeyC) + े (KeyS) + र (KeyJ) + ा (KeyE) + Space
    useSessionStore.getState().processKey('KeyC');
    useSessionStore.getState().processKey('KeyS');
    useSessionStore.getState().processKey('KeyJ');
    useSessionStore.getState().processKey('KeyE');
    expect(store().currentWordBuffer).toBe('मेरा');
    useSessionStore.getState().processKey('Space');

    expect(store().wordResults[0].status).toBe('correct');
    expect(store().currentWordIndex).toBe(1);

    // 2. Type "नाप" (mistake for "नाम"): न (KeyV) + ा (KeyE) + प (KeyH) + Space
    useSessionStore.getState().processKey('KeyV');
    useSessionStore.getState().processKey('KeyE');
    useSessionStore.getState().processKey('KeyH');
    expect(store().currentWordBuffer).toBe('नाप');
    useSessionStore.getState().processKey('Space');

    // Word 1 turns RED, cursor moves to word 2
    expect(store().wordResults[1].status).toBe('incorrect');
    expect(store().wordResults[1].expected).toBe('नाम');
    expect(store().wordResults[1].actual).toBe('नाप');
    expect(store().currentWordIndex).toBe(2);

    // 3. Type "प्रेम": प (KeyH) + ् (KeyD) + र (KeyJ) + े (KeyS) + म (KeyC) + Space
    useSessionStore.getState().processKey('KeyH');
    useSessionStore.getState().processKey('KeyD');
    useSessionStore.getState().processKey('KeyJ');
    useSessionStore.getState().processKey('KeyS');
    useSessionStore.getState().processKey('KeyC');
    expect(store().currentWordBuffer).toBe('प्रेम');
    useSessionStore.getState().processKey('Space');

    expect(store().wordResults[2].status).toBe('correct');
    expect(store().currentWordIndex).toBe(3);

    // 4. Type "है": ह (KeyU) + ै (KeyW)
    useSessionStore.getState().processKey('KeyU');
    useSessionStore.getState().processKey('KeyW');

    // Completes automatically without trailing space
    expect(store().wordResults[3].status).toBe('correct');
    expect(store().correctWords).toBe(3);
    expect(store().incorrectWords).toBe(1);
    expect(store().wordAccuracy).toBe(75); // 3 of 4 = 75%
    expect(store().status).toBe('completed');
  });

  it('handles edge case: does not skip words on accidental double Space presses', () => {
    useSessionStore.getState().startLesson(englishLesson, 0);
    const store = useSessionStore.getState;

    // Type "the" + Space
    useSessionStore.getState().processKey('KeyT');
    useSessionStore.getState().processKey('KeyH');
    useSessionStore.getState().processKey('KeyE');
    useSessionStore.getState().processKey('Space');
    expect(store().currentWordIndex).toBe(1);

    // Now press Space again while buffer is empty
    useSessionStore.getState().processKey('Space');
    useSessionStore.getState().processKey('Space');

    // Must NOT advance or skip word 1 ("quick")!
    expect(store().currentWordIndex).toBe(1);
    expect(store().wordResults[1].status).toBe('active');
    expect(store().totalWordsAttempted).toBe(1);
  });

  it('handles edge case: backspace removes last character from current word buffer', () => {
    useSessionStore.getState().startLesson(englishLesson, 0);
    const store = useSessionStore.getState;

    // Type "thx"
    useSessionStore.getState().processKey('KeyT');
    useSessionStore.getState().processKey('KeyH');
    useSessionStore.getState().processKey('KeyX');
    expect(store().currentWordBuffer).toBe('thx');

    // Backspace
    useSessionStore.getState().processKey('Backspace');
    expect(store().currentWordBuffer).toBe('th');

    // Type "e" + Space
    useSessionStore.getState().processKey('KeyE');
    expect(store().currentWordBuffer).toBe('the');
    useSessionStore.getState().processKey('Space');

    expect(store().wordResults[0].status).toBe('correct');
    expect(store().currentWordIndex).toBe(1);
  });
});
