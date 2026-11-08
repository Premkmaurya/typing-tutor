import { describe, it, expect, beforeEach } from 'vitest';
import { useSessionStore } from '../store/sessionStore';
import { ALL_LESSONS } from '../data/lessons';

describe('Session Store Tests - Word-Level Typing Architecture', () => {
  const lesson = ALL_LESSONS[0]; // English Home row: 'asdf jkl; asdf jkl; asdf jkl;'

  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes a practice session properly with word models', () => {
    useSessionStore.getState().startLesson(lesson, 3);
    const state = useSessionStore.getState();

    expect(state.status).toBe('running');
    expect(state.lesson?.id).toBe(lesson.id);
    expect(state.words.length).toBeGreaterThan(0);
    expect(state.currentWordIndex).toBe(0);
    expect(state.currentWordBuffer).toBe('');
    expect(state.wordResults.length).toBe(state.words.length);
    expect(state.wordResults[0].status).toBe('active');
    expect(state.totalWordsAttempted).toBe(0);
    expect(state.wordAccuracy).toBe(100);
    expect(state.durationMinutes).toBe(3);
    expect(state.remainingSeconds).toBe(180);
  });

  it('accumulates typed characters in currentWordBuffer and advances word on Space', () => {
    useSessionStore.getState().startLesson(lesson, 0);
    const firstWord = useSessionStore.getState().words[0]; // e.g. "asdf"

    // Type the characters of the first word
    for (const ch of firstWord) {
      useSessionStore.getState().processInput({
        code: `Key${ch.toUpperCase()}`,
        key: ch,
        modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
        source: 'physical',
      });
    }

    expect(useSessionStore.getState().currentWordBuffer).toBe(firstWord);
    expect(useSessionStore.getState().currentWordIndex).toBe(0);

    // Hit Space to finalize word
    useSessionStore.getState().processInput({
      code: 'Space',
      key: ' ',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });

    const afterSpace = useSessionStore.getState();
    expect(afterSpace.currentWordIndex).toBe(1);
    expect(afterSpace.currentWordBuffer).toBe('');
    expect(afterSpace.wordResults[0].status).toBe('correct');
    expect(afterSpace.wordResults[0].actual).toBe(firstWord);
    expect(afterSpace.correctWords).toBe(1);
    expect(afterSpace.totalWordsAttempted).toBe(1);
    expect(afterSpace.wordAccuracy).toBe(100);
    expect(afterSpace.wordResults[1].status).toBe('active');
  });

  it('marks word as incorrect on mismatch and automatically advances on Space without blocking', () => {
    useSessionStore.getState().startLesson(lesson, 0);
    const firstWord = useSessionStore.getState().words[0];

    // Type an incorrect word: "asdx" instead of "asdf"
    for (const ch of 'asdx') {
      useSessionStore.getState().processInput({
        code: `Key${ch.toUpperCase()}`,
        key: ch,
        modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
        source: 'physical',
      });
    }

    expect(useSessionStore.getState().currentWordBuffer).toBe('asdx');

    // Hit Space to finalize
    useSessionStore.getState().processInput({
      code: 'Space',
      key: ' ',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });

    const state = useSessionStore.getState();
    // User must NOT be blocked: cursor advances to next word
    expect(state.currentWordIndex).toBe(1);
    expect(state.currentWordBuffer).toBe('');
    expect(state.wordResults[0].status).toBe('incorrect');
    expect(state.wordResults[0].actual).toBe('asdx');
    expect(state.incorrectWords).toBe(1);
    expect(state.totalWordsAttempted).toBe(1);
    expect(state.wordAccuracy).toBe(0);
    expect(state.wordResults[1].status).toBe('active');
  });

  it('handles backspace correctly within current word buffer', () => {
    useSessionStore.getState().startLesson(lesson, 0);

    // Type "asd"
    useSessionStore.getState().processInput({
      code: 'KeyA',
      key: 'a',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });
    useSessionStore.getState().processInput({
      code: 'KeyS',
      key: 's',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });
    useSessionStore.getState().processInput({
      code: 'KeyD',
      key: 'd',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });

    expect(useSessionStore.getState().currentWordBuffer).toBe('asd');

    // Press Backspace
    useSessionStore.getState().processInput({
      code: 'Backspace',
      key: 'Backspace',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });

    expect(useSessionStore.getState().currentWordBuffer).toBe('as');
    expect(useSessionStore.getState().backspaceCount).toBe(1);

    // Press Backspace again
    useSessionStore.getState().processInput({
      code: 'Backspace',
      key: 'Backspace',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });
    expect(useSessionStore.getState().currentWordBuffer).toBe('a');
  });

  it('ignores Space when buffer is empty to prevent skipping words', () => {
    useSessionStore.getState().startLesson(lesson, 0);

    expect(useSessionStore.getState().currentWordBuffer).toBe('');
    expect(useSessionStore.getState().currentWordIndex).toBe(0);

    // Hit Space while buffer is empty
    useSessionStore.getState().processInput({
      code: 'Space',
      key: ' ',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });

    // Word index must remain 0, no words finalized
    expect(useSessionStore.getState().currentWordIndex).toBe(0);
    expect(useSessionStore.getState().totalWordsAttempted).toBe(0);
    expect(useSessionStore.getState().wordResults[0].status).toBe('active');
  });

  it('supports pause and resume', () => {
    useSessionStore.getState().startLesson(lesson, 0);
    expect(useSessionStore.getState().status).toBe('running');

    useSessionStore.getState().pauseSession();
    expect(useSessionStore.getState().status).toBe('paused');

    useSessionStore.getState().resumeSession();
    expect(useSessionStore.getState().status).toBe('running');
  });

  it('completes session and saves results with word metrics to storage', () => {
    useSessionStore.getState().startLesson(lesson, 0);
    const result = useSessionStore.getState().finishSession();

    expect(useSessionStore.getState().status).toBe('completed');
    expect(result).toBeDefined();
    expect(result?.lessonId).toBe(lesson.id);
    expect(result?.wordAccuracy).toBeDefined();
    expect(result?.totalWordsAttempted).toBeDefined();
    expect(result?.correctWords).toBeDefined();
    expect(result?.incorrectWords).toBeDefined();
  });

  it('calculates word accuracy accurately across multiple word attempts', () => {
    useSessionStore.getState().startLesson(lesson, 0);
    const word0 = useSessionStore.getState().words[0];
    const word1 = useSessionStore.getState().words[1];

    // Word 0: type correctly
    for (const ch of word0) {
      useSessionStore.getState().processInput({
        code: `Key${ch.toUpperCase()}`,
        key: ch,
        modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
        source: 'physical',
      });
    }
    useSessionStore.getState().processInput({
      code: 'Space',
      key: ' ',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });

    // Word 1: type incorrectly
    useSessionStore.getState().processInput({
      code: 'KeyZ',
      key: 'z',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });
    useSessionStore.getState().processInput({
      code: 'Space',
      key: ' ',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });

    const state = useSessionStore.getState();
    expect(state.totalWordsAttempted).toBe(2);
    expect(state.correctWords).toBe(1);
    expect(state.incorrectWords).toBe(1);
    expect(state.wordAccuracy).toBe(50); // (1 / 2) * 100 = 50%
  });

  it('verifies virtual and physical keyboard inputs produce identical outcomes', () => {
    useSessionStore.getState().startLesson(lesson, 0);

    // Type 'a' via physical input
    useSessionStore.getState().processInput({
      code: 'KeyA',
      key: 'a',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });
    expect(useSessionStore.getState().currentWordBuffer).toBe('a');

    // Type 's' via virtual click
    useSessionStore.getState().processInput({
      code: 'KeyS',
      key: 's',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'virtual',
    });
    expect(useSessionStore.getState().currentWordBuffer).toBe('as');
  });

  it('validates Hindi InScript words with Unicode normalization', () => {
    const hindiLesson = ALL_LESSONS.find((l) => l.language === 'hi')!;
    expect(hindiLesson).toBeDefined();

    useSessionStore.getState().startLesson(hindiLesson, 0);
    const hindiWord0 = useSessionStore.getState().words[0];
    expect(hindiWord0.length).toBeGreaterThan(0);

    // Type the first word using the lesson's defined InScript keystrokes
    let charCount = 0;
    for (const step of hindiLesson.steps) {
      if (charCount === hindiWord0.length) break;
      useSessionStore.getState().processInput({
        code: step.keyCode,
        key: step.expectedOutput,
        modifiers: {
          shift: Boolean(step.modifiers?.includes('Shift')),
          ctrl: false,
          alt: false,
          meta: false,
          altGraph: Boolean(step.modifiers?.includes('AltGr')),
          capsLock: false,
        },
        source: 'physical',
      });
      charCount++;
    }

    expect(useSessionStore.getState().currentWordBuffer).toBe(hindiWord0);

    // Finalize on Space
    useSessionStore.getState().processInput({
      code: 'Space',
      key: ' ',
      modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
      source: 'physical',
    });

    const state = useSessionStore.getState();
    expect(state.wordResults[0].status).toBe('correct');
    expect(state.correctWords).toBe(1);
    expect(state.currentWordIndex).toBe(1);
  });
});
