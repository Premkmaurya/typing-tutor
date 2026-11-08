import { describe, it, expect, beforeEach } from 'vitest';
import {
  extractWordsFromText,
  areWordsEqual,
  computeWordErrors,
  initializeWordResults,
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
    // When word is complete, next expected key is Space
    expect(getNextExpectedKeyForWord('quick', 'quick', 'en')).toEqual({
      code: 'Space',
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

  const hindiLesson: TypingLesson = {
    id: 'test-hi-words',
    language: 'hi',
    title: 'Hindi Word Practice',
    difficulty: 'beginner',
    practiceType: 'words',
    targetText: 'मेरा भारत सुंदर है',
    steps: [],
    order: 2,
  };

  it('validates the complete English example: the quik brown fox', () => {
    useSessionStore.getState().startLesson(englishLesson, 0);

    const store = useSessionStore.getState;
    expect(store().words).toEqual(['the', 'quick', 'brown', 'fox']);
    expect(store().currentWordIndex).toBe(0);

    // 1. Type "the" + Space
    useSessionStore.getState().processKey('KeyT');
    useSessionStore.getState().processKey('KeyH');
    useSessionStore.getState().processKey('KeyE');
    expect(store().currentWordBuffer).toBe('the');
    useSessionStore.getState().processKey('Space');

    // "the" must be GREEN (correct), cursor advances to word 1
    expect(store().currentWordIndex).toBe(1);
    expect(store().wordResults[0].status).toBe('correct');
    expect(store().wordResults[0].expected).toBe('the');
    expect(store().wordResults[0].actual).toBe('the');
    expect(store().correctWords).toBe(1);
    expect(store().incorrectWords).toBe(0);

    // 2. Type "quik" + Space (incorrect attempt)
    useSessionStore.getState().processKey('KeyQ');
    useSessionStore.getState().processKey('KeyU');
    useSessionStore.getState().processKey('KeyI');
    useSessionStore.getState().processKey('KeyK');
    expect(store().currentWordBuffer).toBe('quik');
    useSessionStore.getState().processKey('Space');

    // "quick" must be RED (incorrect), cursor automatically advances to word 2 without blocking
    expect(store().currentWordIndex).toBe(2);
    expect(store().wordResults[1].status).toBe('incorrect');
    expect(store().wordResults[1].expected).toBe('quick');
    expect(store().wordResults[1].actual).toBe('quik');
    expect(store().correctWords).toBe(1);
    expect(store().incorrectWords).toBe(1);
    expect(store().wordAccuracy).toBe(50); // 1 of 2

    // 3. Type "brown" + Space
    useSessionStore.getState().processKey('KeyB');
    useSessionStore.getState().processKey('KeyR');
    useSessionStore.getState().processKey('KeyO');
    useSessionStore.getState().processKey('KeyW');
    useSessionStore.getState().processKey('KeyN');
    useSessionStore.getState().processKey('Space');

    // "brown" must be GREEN (correct), cursor advances to word 3
    expect(store().currentWordIndex).toBe(3);
    expect(store().wordResults[2].status).toBe('correct');
    expect(store().correctWords).toBe(2);
    expect(store().incorrectWords).toBe(1);

    // 4. Type "fox" (last word)
    useSessionStore.getState().processKey('KeyF');
    useSessionStore.getState().processKey('KeyO');
    useSessionStore.getState().processKey('KeyX');

    // Auto-completes when final word is typed
    expect(store().wordResults[3].status).toBe('correct');
    expect(store().correctWords).toBe(3);
    expect(store().incorrectWords).toBe(1);
    expect(store().wordAccuracy).toBe(75); // 3 of 4 words = 75%
    expect(store().status).toBe('completed');
  });

  it('validates the complete Hindi InScript example: मेरा भारट सुंदर है', () => {
    useSessionStore.getState().startLesson(hindiLesson, 0);
    const store = useSessionStore.getState;
    expect(store().words).toEqual(['मेरा', 'भारत', 'सुंदर', 'है']);

    // 1. Type "मेरा": म (KeyC) + े (KeyS) + र (KeyJ) + ा (KeyE) + Space
    useSessionStore.getState().processKey('KeyC');
    useSessionStore.getState().processKey('KeyS');
    useSessionStore.getState().processKey('KeyJ');
    useSessionStore.getState().processKey('KeyE');
    expect(store().currentWordBuffer).toBe('मेरा');
    useSessionStore.getState().processKey('Space');

    expect(store().wordResults[0].status).toBe('correct');
    expect(store().wordResults[0].expected).toBe('मेरा');
    expect(store().currentWordIndex).toBe(1);

    // 2. Type "भारट": भ (Shift+KeyY) + ा (KeyE) + र (KeyJ) + ट (Quote) + Space
    useSessionStore.getState().processKey('KeyY', { shift: true });
    useSessionStore.getState().processKey('KeyE');
    useSessionStore.getState().processKey('KeyJ');
    useSessionStore.getState().processKey('Quote');
    expect(store().currentWordBuffer).toBe('भारट');
    useSessionStore.getState().processKey('Space');

    // Entire word "भारत" must turn RED, cursor automatically moves to word 2
    expect(store().wordResults[1].status).toBe('incorrect');
    expect(store().wordResults[1].expected).toBe('भारत');
    expect(store().wordResults[1].actual).toBe('भारट');
    expect(store().currentWordIndex).toBe(2);

    // 3. Type "सुंदर": स (KeyM) + ु (KeyG) + ं (KeyX) + द (KeyO) + र (KeyJ) + Space
    useSessionStore.getState().processKey('KeyM');
    useSessionStore.getState().processKey('KeyG');
    useSessionStore.getState().processKey('KeyX');
    useSessionStore.getState().processKey('KeyO');
    useSessionStore.getState().processKey('KeyJ');
    useSessionStore.getState().processKey('Space');

    expect(store().wordResults[2].status).toBe('correct');
    expect(store().wordResults[2].expected).toBe('सुंदर');
    expect(store().currentWordIndex).toBe(3);

    // 4. Type "है": ह (KeyU) + ै (KeyW)
    useSessionStore.getState().processKey('KeyU');
    useSessionStore.getState().processKey('KeyW');

    // Final word auto-validates
    expect(store().wordResults[3].status).toBe('correct');
    expect(store().wordResults[3].expected).toBe('है');
    expect(store().correctWords).toBe(3);
    expect(store().incorrectWords).toBe(1);
    expect(store().wordAccuracy).toBe(75);
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
