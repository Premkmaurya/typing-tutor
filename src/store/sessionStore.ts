import { create } from 'zustand';
import { Language, ModifierState } from '../types/keyboard.types';
import { TypingLesson } from '../types/lesson.types';
import { SessionResult } from '../types/stats.types';
import { SessionStatus, TypedCharacter, TypingInput, CharacterResult, WordResult } from '../types/typing.types';
import { evaluateKeypress } from '../core/typing/matcher';
import { calculateTypingMetrics } from '../core/typing/metrics';
import { computeCharacterResults } from '../core/typing/characterStatus';
import {
  extractWordsFromText,
  areWordsEqual,
  computeWordErrors,
  initializeWordResults,
} from '../core/typing/wordValidator';
import { resolveOutputChar } from '../core/keyboard/layerResolver';
import { StorageService } from '../services/storage.service';

interface SessionState {
  status: SessionStatus;
  lesson: TypingLesson | null;
  language: Language;
  durationMinutes: number; // 0 = unlimited

  // Word-level state
  words: string[];
  currentWordIndex: number;
  currentWordBuffer: string;
  wordResults: WordResult[];
  totalWordsAttempted: number;
  correctWords: number;
  incorrectWords: number;
  wordAccuracy: number;

  currentStepIndex: number;
  currentStepError: string | null;
  typedChars: TypedCharacter[];
  activeModifiers: ModifierState;

  // Keystroke metrics
  totalKeypresses: number;
  correctKeypresses: number;
  incorrectKeypresses: number;
  backspaceCount: number;
  correctedErrors: number;
  firstAttemptErrors: Set<number>;
  weakKeysMap: Record<string, { display: string; count: number }>;

  // Timers
  startTime: number | null;
  elapsedSeconds: number;
  remainingSeconds: number;

  // Visual key states
  lastPressedCode: string | null;
  lastPressStatus: 'correct' | 'incorrect' | null;

  // Live computed metrics
  liveWpm: number;
  liveCpm: number;
  liveAccuracy: number;

  // Last finished session result
  lastResult: SessionResult | null;

  // Actions
  startLesson: (lesson: TypingLesson, durationMinutes?: number) => void;
  processInput: (input: TypingInput) => void;
  processKey: (code: string, modifiers?: Partial<ModifierState>) => void;
  setModifiers: (modifiers: Partial<ModifierState>) => void;
  tickTimer: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  restartSession: () => void;
  finishSession: () => SessionResult | null;
  getCharacterResults: () => CharacterResult[];
  getWordResults: () => WordResult[];
}

const defaultModifiers: ModifierState = {
  shift: false,
  capsLock: false,
  altGr: false,
  ctrl: false,
  meta: false,
};

export const useSessionStore = create<SessionState>((set, get) => ({
  status: 'idle',
  lesson: null,
  language: 'hi',
  durationMinutes: 0,

  words: [],
  currentWordIndex: 0,
  currentWordBuffer: '',
  wordResults: [],
  totalWordsAttempted: 0,
  correctWords: 0,
  incorrectWords: 0,
  wordAccuracy: 100,

  currentStepIndex: 0,
  currentStepError: null,
  typedChars: [],
  activeModifiers: { ...defaultModifiers },

  totalKeypresses: 0,
  correctKeypresses: 0,
  incorrectKeypresses: 0,
  backspaceCount: 0,
  correctedErrors: 0,
  firstAttemptErrors: new Set<number>(),
  weakKeysMap: {},

  startTime: null,
  elapsedSeconds: 0,
  remainingSeconds: 0,

  lastPressedCode: null,
  lastPressStatus: null,

  liveWpm: 0,
  liveCpm: 0,
  liveAccuracy: 100,

  lastResult: null,

  startLesson: (lesson, durationMinutes = 0) => {
    const totalSeconds = durationMinutes > 0 ? durationMinutes * 60 : 0;
    const extracted = extractWordsFromText(lesson.targetText || '');
    const words = extracted.length > 0
      ? extracted
      : (lesson.steps?.map((s) => s.expectedOutput).join('').trim().split(/\s+/).filter(Boolean) || ['']);
    const wordResults = initializeWordResults(words);

    set({
      status: 'running',
      lesson,
      language: lesson.language,
      durationMinutes,
      words,
      currentWordIndex: 0,
      currentWordBuffer: '',
      wordResults,
      totalWordsAttempted: 0,
      correctWords: 0,
      incorrectWords: 0,
      wordAccuracy: 100,
      currentStepIndex: 0,
      currentStepError: null,
      typedChars: [],
      activeModifiers: { ...defaultModifiers },
      totalKeypresses: 0,
      correctKeypresses: 0,
      incorrectKeypresses: 0,
      backspaceCount: 0,
      correctedErrors: 0,
      firstAttemptErrors: new Set<number>(),
      weakKeysMap: {},
      startTime: Date.now(),
      elapsedSeconds: 0,
      remainingSeconds: totalSeconds,
      lastPressedCode: null,
      lastPressStatus: null,
      liveWpm: 0,
      liveCpm: 0,
      liveAccuracy: 100,
    });
  },

  setModifiers: (modifiers) => {
    set((state) => ({
      activeModifiers: { ...state.activeModifiers, ...modifiers },
    }));
  },

  processInput: (input) => {
    const state = get();
    if (state.status !== 'running' || !state.lesson || state.words.length === 0) return;

    if (state.currentWordIndex >= state.words.length) {
      get().finishSession();
      return;
    }

    const effectiveModifiers: ModifierState = {
      shift: Boolean(input.modifiers.shift),
      capsLock: Boolean(input.modifiers.capsLock),
      altGr: Boolean(input.modifiers.altGraph),
      ctrl: Boolean(input.modifiers.ctrl),
      meta: Boolean(input.modifiers.meta),
    };

    // Ignore standalone modifier keypresses
    if (
      input.code === 'ShiftLeft' ||
      input.code === 'ShiftRight' ||
      input.code === 'ControlLeft' ||
      input.code === 'ControlRight' ||
      input.code === 'AltLeft' ||
      input.code === 'AltRight' ||
      input.code === 'MetaLeft' ||
      input.code === 'MetaRight' ||
      input.code === 'CapsLock'
    ) {
      set({
        lastPressedCode: input.code,
        activeModifiers: effectiveModifiers,
      });
      return;
    }

    // 1. Handle Backspace: remove last character from currentWordBuffer
    if (input.code === 'Backspace') {
      if (state.currentWordBuffer.length > 0) {
        const chars = Array.from(state.currentWordBuffer);
        chars.pop();
        const newBuffer = chars.join('');
        const updatedWordResults = [...state.wordResults];
        if (updatedWordResults[state.currentWordIndex]) {
          updatedWordResults[state.currentWordIndex] = {
            ...updatedWordResults[state.currentWordIndex],
            actual: newBuffer,
          };
        }
        set({
          currentWordBuffer: newBuffer,
          wordResults: updatedWordResults,
          backspaceCount: state.backspaceCount + 1,
          totalKeypresses: state.totalKeypresses + 1,
          lastPressedCode: input.code,
          lastPressStatus: null,
        });
      }
      return;
    }

    // 2. Handle Space (or Enter): Finalize current word
    const isSpace = input.code === 'Space' || input.key === ' ';
    const isEnter = input.code === 'Enter' || input.key === 'Enter';

    if (isSpace || isEnter) {
      // Ignore accidental double space when buffer is empty to avoid skipping words
      if (state.currentWordBuffer.length === 0) {
        set({
          lastPressedCode: input.code,
          lastPressStatus: null,
        });
        return;
      }

      // Finalize current word
      const currentExpected = state.words[state.currentWordIndex];
      const isCorrect = areWordsEqual(state.currentWordBuffer, currentExpected, state.language);
      const wordErrors = isCorrect ? 0 : Math.max(1, computeWordErrors(state.currentWordBuffer, currentExpected));

      const updatedWordResults = [...state.wordResults];
      updatedWordResults[state.currentWordIndex] = {
        expected: currentExpected,
        actual: state.currentWordBuffer,
        status: isCorrect ? 'correct' : 'incorrect',
        errors: wordErrors,
      };

      const newAttemptedWords = state.totalWordsAttempted + 1;
      const newCorrectWords = isCorrect ? state.correctWords + 1 : state.correctWords;
      const newIncorrectWords = !isCorrect ? state.incorrectWords + 1 : state.incorrectWords;
      const newWordAccuracy = Math.round((newCorrectWords / newAttemptedWords) * 100);

      const newTotalKeypresses = state.totalKeypresses + 1;
      const newCorrectKeypresses = isCorrect ? state.correctKeypresses + state.currentWordBuffer.length : state.correctKeypresses;
      const newIncorrectKeypresses = !isCorrect ? state.incorrectKeypresses + wordErrors : state.incorrectKeypresses;

      const newWeakKeys = { ...state.weakKeysMap };
      if (!isCorrect) {
        const existing = newWeakKeys[currentExpected] || { display: currentExpected, count: 0 };
        newWeakKeys[currentExpected] = { display: currentExpected, count: existing.count + 1 };
      }

      const nextWordIndex = state.currentWordIndex + 1;
      if (nextWordIndex < state.words.length) {
        updatedWordResults[nextWordIndex] = {
          ...updatedWordResults[nextWordIndex],
          status: 'active',
        };
      }

      const effectiveMinutes = Math.max(state.elapsedSeconds / 60, 0.0167);
      const netChars = updatedWordResults
        .filter((w) => w.status === 'correct')
        .reduce((sum, w) => sum + w.expected.length + 1, 0);
      const liveCpm = Math.round(netChars / effectiveMinutes);
      const liveWpm = state.language === 'hi' ? Math.round(liveCpm / 5) : Math.round((netChars / 5) / effectiveMinutes);

      set({
        currentWordIndex: nextWordIndex,
        currentWordBuffer: '',
        wordResults: updatedWordResults,
        totalWordsAttempted: newAttemptedWords,
        correctWords: newCorrectWords,
        incorrectWords: newIncorrectWords,
        wordAccuracy: newWordAccuracy,
        totalKeypresses: newTotalKeypresses,
        correctKeypresses: newCorrectKeypresses,
        incorrectKeypresses: newIncorrectKeypresses,
        weakKeysMap: newWeakKeys,
        lastPressedCode: input.code,
        lastPressStatus: isCorrect ? 'correct' : 'incorrect',
        liveWpm,
        liveCpm,
        liveAccuracy: newWordAccuracy,
      });

      if (nextWordIndex >= state.words.length) {
        get().finishSession();
      }
      return;
    }

    // 3. Regular character typing
    const producedChar = resolveOutputChar(input.code, state.language, effectiveModifiers);
    if (!producedChar) return;

    const newBuffer = state.currentWordBuffer + producedChar;
    const currentExpected = state.words[state.currentWordIndex];
    const updatedWordResults = [...state.wordResults];

    // Check if on the last word and exact match is reached
    if (
      state.currentWordIndex === state.words.length - 1 &&
      areWordsEqual(newBuffer, currentExpected, state.language)
    ) {
      updatedWordResults[state.currentWordIndex] = {
        expected: currentExpected,
        actual: newBuffer,
        status: 'correct',
        errors: 0,
      };

      const newAttemptedWords = state.totalWordsAttempted + 1;
      const newCorrectWords = state.correctWords + 1;
      const newWordAccuracy = Math.round((newCorrectWords / newAttemptedWords) * 100);
      const newTotalKeypresses = state.totalKeypresses + 1;
      const newCorrectKeypresses = state.correctKeypresses + newBuffer.length;

      const effectiveMinutes = Math.max(state.elapsedSeconds / 60, 0.0167);
      const netChars = updatedWordResults
        .filter((w) => w.status === 'correct')
        .reduce((sum, w) => sum + w.expected.length + 1, 0);
      const liveCpm = Math.round(netChars / effectiveMinutes);
      const liveWpm = state.language === 'hi' ? Math.round(liveCpm / 5) : Math.round((netChars / 5) / effectiveMinutes);

      set({
        currentWordIndex: state.words.length,
        currentWordBuffer: '',
        wordResults: updatedWordResults,
        totalWordsAttempted: newAttemptedWords,
        correctWords: newCorrectWords,
        wordAccuracy: newWordAccuracy,
        totalKeypresses: newTotalKeypresses,
        correctKeypresses: newCorrectKeypresses,
        lastPressedCode: input.code,
        lastPressStatus: 'correct',
        liveWpm,
        liveCpm,
        liveAccuracy: newWordAccuracy,
      });

      get().finishSession();
      return;
    }

    if (updatedWordResults[state.currentWordIndex]) {
      updatedWordResults[state.currentWordIndex] = {
        ...updatedWordResults[state.currentWordIndex],
        actual: newBuffer,
      };
    }

    set({
      currentWordBuffer: newBuffer,
      wordResults: updatedWordResults,
      totalKeypresses: state.totalKeypresses + 1,
      lastPressedCode: input.code,
      lastPressStatus: null,
    });
  },

  processKey: (code, customModifiers) => {
    const state = get();
    const effectiveModifiers = {
      ...state.activeModifiers,
      ...customModifiers,
    };
    const input: TypingInput = {
      code,
      key: '',
      modifiers: {
        shift: Boolean(effectiveModifiers.shift),
        ctrl: Boolean(effectiveModifiers.ctrl),
        alt: false,
        meta: Boolean(effectiveModifiers.meta),
        altGraph: Boolean(effectiveModifiers.altGr),
        capsLock: Boolean(effectiveModifiers.capsLock),
      },
      source: 'virtual',
    };
    get().processInput(input);
  },

  tickTimer: () => {
    const state = get();
    if (state.status !== 'running' || !state.lesson) return;

    const newElapsed = state.elapsedSeconds + 1;
    let newRemaining = state.remainingSeconds;

    if (state.durationMinutes > 0) {
      newRemaining = Math.max(0, state.remainingSeconds - 1);
      if (newRemaining <= 0) {
        set({ elapsedSeconds: newElapsed, remainingSeconds: 0 });
        get().finishSession();
        return;
      }
    }

    const effectiveMinutes = Math.max(newElapsed / 60, 0.0167);
    const netChars = state.wordResults
      .filter((w) => w.status === 'correct')
      .reduce((sum, w) => sum + w.expected.length + 1, 0);
    const liveCpm = Math.round(netChars / effectiveMinutes);
    const liveWpm = state.language === 'hi' ? Math.round(liveCpm / 5) : Math.round((netChars / 5) / effectiveMinutes);

    set({
      elapsedSeconds: newElapsed,
      remainingSeconds: newRemaining,
      liveWpm,
      liveCpm,
      liveAccuracy: state.wordAccuracy,
    });
  },

  pauseSession: () => {
    if (get().status === 'running') {
      set({ status: 'paused' });
    }
  },

  resumeSession: () => {
    if (get().status === 'paused') {
      set({ status: 'running' });
    }
  },

  restartSession: () => {
    const { lesson, durationMinutes } = get();
    if (lesson) {
      get().startLesson(lesson, durationMinutes);
    }
  },

  finishSession: () => {
    const state = get();
    if (state.status === 'completed' || !state.lesson) {
      return state.lastResult;
    }

    const durationSeconds = Math.max(1, state.elapsedSeconds);

    // If there is an in-progress word when the session ends
    let finalWordResults = [...state.wordResults];
    let finalAttemptedWords = state.totalWordsAttempted;
    let finalCorrectWords = state.correctWords;
    let finalIncorrectWords = state.incorrectWords;

    if (
      state.currentWordIndex < state.words.length &&
      state.currentWordBuffer.length > 0
    ) {
      const currentExpected = state.words[state.currentWordIndex];
      const isCorrect = areWordsEqual(state.currentWordBuffer, currentExpected, state.language);
      const errors = isCorrect ? 0 : Math.max(1, computeWordErrors(state.currentWordBuffer, currentExpected));

      finalWordResults[state.currentWordIndex] = {
        expected: currentExpected,
        actual: state.currentWordBuffer,
        status: isCorrect ? 'correct' : 'incorrect',
        errors,
      };

      finalAttemptedWords += 1;
      if (isCorrect) {
        finalCorrectWords += 1;
      } else {
        finalIncorrectWords += 1;
      }
    }

    const finalWordAccuracy = finalAttemptedWords > 0
      ? Math.round((finalCorrectWords / finalAttemptedWords) * 100)
      : 100;

    const effectiveMinutes = Math.max(durationSeconds / 60, 0.0167);
    const netChars = finalWordResults
      .filter((w) => w.status === 'correct')
      .reduce((sum, w) => sum + w.expected.length + 1, 0);
    const cpm = Math.round(netChars / effectiveMinutes);
    const wpm = state.language === 'hi' ? Math.round(cpm / 5) : Math.round((netChars / 5) / effectiveMinutes);

    const weakKeysList = Object.entries(state.weakKeysMap).map(([key, data]) => ({
      key,
      display: data.display,
      count: data.count,
    }));
    weakKeysList.sort((a, b) => b.count - a.count);

    const result: SessionResult = {
      id: `session-${Date.now()}`,
      lessonId: state.lesson.id,
      lessonTitle: state.lesson.title,
      language: state.language,
      difficulty: state.lesson.difficulty,
      practiceType: state.lesson.practiceType,
      timestamp: Date.now(),
      durationSeconds,
      wpm,
      cpm,
      accuracy: finalWordAccuracy,
      firstAttemptAccuracy: finalWordAccuracy,
      totalKeypresses: state.totalKeypresses,
      correctKeypresses: state.correctKeypresses,
      incorrectKeypresses: state.incorrectKeypresses,
      backspaceCount: state.backspaceCount,
      correctedErrors: state.correctedErrors,
      totalWordsAttempted: finalAttemptedWords,
      correctWords: finalCorrectWords,
      incorrectWords: finalIncorrectWords,
      wordAccuracy: finalWordAccuracy,
      weakKeys: weakKeysList,
    };

    // Save result to LocalStorage via StorageService
    StorageService.saveSession(result);

    set({
      status: 'completed',
      lastResult: result,
      wordResults: finalWordResults,
      totalWordsAttempted: finalAttemptedWords,
      correctWords: finalCorrectWords,
      incorrectWords: finalIncorrectWords,
      wordAccuracy: finalWordAccuracy,
      liveWpm: wpm,
      liveCpm: cpm,
      liveAccuracy: finalWordAccuracy,
    });

    return result;
  },

  getCharacterResults: () => {
    const state = get();
    if (!state.lesson) return [];
    return computeCharacterResults(
      state.lesson.steps,
      state.currentStepIndex,
      state.currentStepError,
      state.typedChars
    );
  },

  getWordResults: () => {
    return get().wordResults;
  },
}));
