import { describe, it, expect, beforeEach } from 'vitest';
import { computeCharacterResults } from '../core/typing/characterStatus';
import { useSessionStore } from '../store/sessionStore';
import { textToLessonSteps } from '../core/typing/composer';
import { ALL_LESSONS } from '../data/lessons';
import { TypingLesson } from '../types/lesson.types';

describe('Character Status and Real-time Mistake Feedback', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const sampleSteps = [
    { keyCode: 'KeyA', expectedOutput: 'a' },
    { keyCode: 'KeyS', expectedOutput: 's' },
    { keyCode: 'KeyD', expectedOutput: 'd' },
    { keyCode: 'KeyF', expectedOutput: 'f' },
  ];

  it('computes pending, active, and correct statuses as typing advances', () => {
    // Initial state: cursor at 0, no errors
    const initial = computeCharacterResults(sampleSteps, 0, null, []);
    expect(initial[0].status).toBe('active');
    expect(initial[0].expected).toBe('a');
    expect(initial[1].status).toBe('pending');
    expect(initial[2].status).toBe('pending');
    expect(initial[3].status).toBe('pending');

    // Typed step 0 correctly: cursor at 1
    const afterOne = computeCharacterResults(sampleSteps, 1, null, [
      { char: 'a', expected: 'a', isCorrect: true, timestamp: 1000 },
    ]);
    expect(afterOne[0].status).toBe('correct');
    expect(afterOne[0].actual).toBe('a');
    expect(afterOne[1].status).toBe('active');
    expect(afterOne[1].expected).toBe('s');
    expect(afterOne[2].status).toBe('pending');
  });

  it('marks active position as incorrect with actual erroneous char on mistake', () => {
    // Step 0 expected 'a', but user typed 'z'
    const withError = computeCharacterResults(sampleSteps, 0, 'z', []);
    expect(withError[0].status).toBe('incorrect');
    expect(withError[0].expected).toBe('a');
    expect(withError[0].actual).toBe('z');
    // Subsequent characters remain pending
    expect(withError[1].status).toBe('pending');
    expect(withError[2].status).toBe('pending');
  });

  it('reverts to active state when error is cleared (e.g. via backspace)', () => {
    const cleared = computeCharacterResults(sampleSteps, 0, null, []);
    expect(cleared[0].status).toBe('active');
    expect(cleared[0].expected).toBe('a');
    expect(cleared[0].actual).toBeUndefined();
  });

  it('turns character green when corrected and advances cursor', () => {
    // After step 0 was mistyped then corrected
    const corrected = computeCharacterResults(sampleSteps, 1, null, [
      { char: 'a', expected: 'a', isCorrect: true, timestamp: 2000 },
    ]);
    expect(corrected[0].status).toBe('correct');
    expect(corrected[0].actual).toBe('a');
    expect(corrected[1].status).toBe('active');
  });

  it('correctly handles Devanagari Hindi text and conjuncts in InScript', () => {
    const hindiText = 'परिश्रम सफलता';
    const hindiSteps = textToLessonSteps(hindiText, 'hi');
    expect(hindiSteps.length).toBeGreaterThan(0);

    // Initial state: first character is 'प'
    const res0 = computeCharacterResults(hindiSteps, 0, null, []);
    expect(res0[0].status).toBe('active');
    expect(res0[0].expected).toBe('प');

    // User types incorrect Hindi char 'क' instead of 'प'
    const resError = computeCharacterResults(hindiSteps, 0, 'क', []);
    expect(resError[0].status).toBe('incorrect');
    expect(resError[0].actual).toBe('क');
    expect(resError[0].expected).toBe('प');

    // User types correct 'प'
    const resCorrect = computeCharacterResults(hindiSteps, 1, null, [
      { char: 'प', expected: 'प', isCorrect: true, timestamp: 3000 },
    ]);
    expect(resCorrect[0].status).toBe('correct');
    expect(resCorrect[0].actual).toBe('प');
    expect(resCorrect[1].status).toBe('active');
    expect(resCorrect[1].expected).toBe('र');
  });
});

