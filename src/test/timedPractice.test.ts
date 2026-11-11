import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSessionStore } from '../store/sessionStore';
import { ALL_LESSONS } from '../data/lessons';
import { TypingLesson } from '../types/lesson.types';

describe('Timed Practice Engine & Passage Queue Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  const englishLesson: TypingLesson =
    ALL_LESSONS.find((l) => l.language === 'en' && l.content && l.content.length > 2) ||
    ALL_LESSONS[0];

  const hindiLesson: TypingLesson =
    ALL_LESSONS.find((l) => l.language === 'hi' && l.content && l.content.length > 2) ||
    ALL_LESSONS.find((l) => l.language === 'hi')!;

  it('Test A: 1-minute duration does NOT terminate when passage finishes, loads next passage automatically', () => {
    useSessionStore.getState().startLesson(englishLesson, 1);
    const initialWords = [...useSessionStore.getState().words];

    expect(useSessionStore.getState().status).toBe('running');
    expect(useSessionStore.getState().durationMinutes).toBe(1);
    expect(useSessionStore.getState().remainingSeconds).toBe(60);
    expect(useSessionStore.getState().currentPassageIndex).toBe(0);

    // Fast-complete the first passage word-by-word
    for (let i = 0; i < initialWords.length; i++) {
      const w = initialWords[i];
      for (const ch of w) {
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
    }

    const stateAfterFirstPassage = useSessionStore.getState();
    // CRITICAL: Session must STILL be RUNNING! It must NOT finish just because the passage finished!
    expect(stateAfterFirstPassage.status).toBe('running');
    // Passage index must have advanced to 1
    expect(stateAfterFirstPassage.currentPassageIndex).toBe(1);
    // 1 completed passage recorded
    expect(stateAfterFirstPassage.completedPassages.length).toBe(1);
    expect(stateAfterFirstPassage.completedPassages[0].totalWords).toBe(initialWords.length);
    // Cursor reset for next passage
    expect(stateAfterFirstPassage.currentWordIndex).toBe(0);
    expect(stateAfterFirstPassage.currentWordBuffer).toBe('');
    // Overall session stats preserved!
    expect(stateAfterFirstPassage.totalWordsAttempted).toBe(initialWords.length);
    expect(stateAfterFirstPassage.correctWords).toBe(initialWords.length);
  });

  it('Test B: 5-minute timed session with pause, resume, continuous passages, and expiration', () => {
    vi.useFakeTimers();
    useSessionStore.getState().startLesson(englishLesson, 5);

    expect(useSessionStore.getState().durationMinutes).toBe(5);
    expect(useSessionStore.getState().remainingSeconds).toBe(300);

    // Advance 60 seconds of typing
    vi.advanceTimersByTime(60000);
    useSessionStore.getState().syncTimers();
    expect(useSessionStore.getState().elapsedSeconds).toBe(60);
    expect(useSessionStore.getState().remainingSeconds).toBe(240);

    // Pause session for 30 seconds
    useSessionStore.getState().pauseSession();
    expect(useSessionStore.getState().status).toBe('paused');

    vi.advanceTimersByTime(30000);
    useSessionStore.getState().syncTimers();
    // Paused: elapsed practice time must NOT increase!
    expect(useSessionStore.getState().elapsedSeconds).toBe(60);
    expect(useSessionStore.getState().remainingSeconds).toBe(240);

    // Resume session
    useSessionStore.getState().resumeSession();
    expect(useSessionStore.getState().status).toBe('running');

    // Advance another 60 seconds
    vi.advanceTimersByTime(60000);
    useSessionStore.getState().syncTimers();
    expect(useSessionStore.getState().elapsedSeconds).toBe(120);
    expect(useSessionStore.getState().remainingSeconds).toBe(180);

    // Advance until 5 minutes expires (remaining 180 seconds)
    vi.advanceTimersByTime(180000);
    useSessionStore.getState().syncTimers();

    // Now session must be completed!
    expect(useSessionStore.getState().status).toBe('completed');
    expect(useSessionStore.getState().lastResult).toBeDefined();
    expect(useSessionStore.getState().lastResult?.durationSeconds).toBe(300);

    vi.useRealTimers();
  });

  it('Test C: Unlimited mode allows continuous multi-passage practice without countdown termination', () => {
    useSessionStore.getState().startLesson(hindiLesson, 0);

    expect(useSessionStore.getState().durationMinutes).toBe(0);
    expect(useSessionStore.getState().remainingSeconds).toBe(0);
    expect(useSessionStore.getState().status).toBe('running');

    // Complete passage 0
    const passage0Words = [...useSessionStore.getState().words];
    for (let i = 0; i < passage0Words.length; i++) {
      useSessionStore.getState().processInput({
        code: 'Space',
        key: ' ',
        modifiers: { shift: false, ctrl: false, alt: false, meta: false, altGraph: false, capsLock: false },
        source: 'physical',
      });
      useSessionStore.getState().advancePassage();
      break;
    }

    expect(useSessionStore.getState().status).toBe('running');
    expect(useSessionStore.getState().currentPassageIndex).toBeGreaterThanOrEqual(1);

    // Manually finish session in unlimited mode
    const finalResult = useSessionStore.getState().finishSession();
    expect(useSessionStore.getState().status).toBe('completed');
    expect(finalResult).toBeDefined();
    expect(finalResult?.selectedDurationMinutes).toBe(0);
  });

  it('Test D: Incomplete word when time expires is marked as unfinished/incorrect', () => {
    vi.useFakeTimers();
    useSessionStore.getState().startLesson(englishLesson, 1);

    // User types partial word: "as"
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

    expect(useSessionStore.getState().currentWordBuffer).toBe('as');
    expect(useSessionStore.getState().currentWordIndex).toBe(0);

    // Time expires at 60s
    vi.advanceTimersByTime(60000);
    useSessionStore.getState().syncTimers();

    const state = useSessionStore.getState();
    expect(state.status).toBe('completed');
    expect(state.lastResult?.totalWordsAttempted).toBe(1);
    // Incomplete word is NOT counted as correct
    expect(state.lastResult?.correctWords).toBe(0);
    expect(state.lastResult?.incorrectWords).toBe(1);
    expect(state.lastResult?.wordResults?.[0]?.status).toBe('incorrect');

    vi.useRealTimers();
  });
});
