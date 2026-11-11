import { create } from 'zustand';
import { Language, ModifierState } from '../types/keyboard.types';
import { TypingLesson } from '../types/lesson.types';
import { PassageResult, SessionResult } from '../types/stats.types';
import { SessionStatus, TypedCharacter, TypingInput, CharacterResult, WordResult } from '../types/typing.types';
import {
  extractWordsFromText,
  areWordsEqual,
  computeWordErrors,
  initializeWordResults,
} from '../core/typing/wordValidator';
import { resolveOutputChar } from '../core/keyboard/layerResolver';
import { textToLessonSteps } from '../core/typing/composer';
import { StorageService } from '../services/storage.service';
import { ALL_LESSONS } from '../data/lessons';

interface SessionState {
  status: SessionStatus;
  lesson: TypingLesson | null;
  language: Language;
  durationMinutes: number; // 0 = unlimited, 1, 3, 5, 10

  // Multi-Passage Queue Architecture
  passageQueue: string[];
  currentPassageIndex: number;
  completedPassages: PassageResult[];
  passageStartTime: number | null;
  passageAccumulatedMs: number;

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

  // Timestamp-based reliable timers
  sessionStartTime: number | null;
  lastResumeTimestamp: number | null;
  accumulatedActiveMs: number;
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
  syncTimers: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  restartSession: () => void;
  advancePassage: () => void;
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

  passageQueue: [],
  currentPassageIndex: 0,
  completedPassages: [],
  passageStartTime: null,
  passageAccumulatedMs: 0,

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

  sessionStartTime: null,
  lastResumeTimestamp: null,
  accumulatedActiveMs: 0,
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

    let passageQueue: string[] = [];
    if (lesson.content && lesson.content.length > 0) {
      if (lesson.targetText && !lesson.content.includes(lesson.targetText)) {
        passageQueue = [lesson.targetText, ...lesson.content];
      } else {
        passageQueue = [...lesson.content];
      }
    } else if (lesson.targetText) {
      passageQueue = [lesson.targetText];
    }
    passageQueue = passageQueue.filter((p) => p.trim().length > 0);
    const initialPassage = passageQueue[0] || lesson.targetText || '';

    const extracted = extractWordsFromText(initialPassage);
    const words =
      extracted.length > 0
        ? extracted
        : lesson.steps?.map((s) => s.expectedOutput).join('').trim().split(/\s+/).filter(Boolean) || [''];
    const wordResults = initializeWordResults(words, lesson.language);
    const now = Date.now();

    const preparedLesson: TypingLesson = {
      ...lesson,
      targetText: initialPassage,
      steps: textToLessonSteps(initialPassage, lesson.language),
    };

    set({
      status: 'running',
      lesson: preparedLesson,
      language: lesson.language,
      durationMinutes,
      passageQueue,
      currentPassageIndex: 0,
      completedPassages: [],
      passageStartTime: now,
      passageAccumulatedMs: 0,
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
      sessionStartTime: now,
      lastResumeTimestamp: now,
      accumulatedActiveMs: 0,
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

    // Check if session time has expired
    if (state.durationMinutes > 0 && state.remainingSeconds <= 0) {
      get().finishSession();
      return;
    }

    // If passage already consumed, advance to next passage or finish
    if (state.currentWordIndex >= state.words.length) {
      if (state.durationMinutes > 0 || state.passageQueue.length > 1) {
        get().advancePassage();
      } else {
        get().finishSession();
      }
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
        const currentWord = state.wordResults[state.currentWordIndex];
        const characters = currentWord.characters.map((character) => ({ ...character }));
        const lastTypedIndex = characters.findLastIndex(
          (character) => character.status === 'correct' || character.status === 'incorrect'
        );
        if (lastTypedIndex < 0) return;
        const removedCharacter = characters[lastTypedIndex];
        characters[lastTypedIndex] = {
          ...removedCharacter,
          actual: '',
          status: lastTypedIndex === 0 ? 'active' : 'pending',
        };
        const nextStepIndex = characters.findIndex(
          (character) => character.status === 'pending' || character.status === 'active'
        );
        if (nextStepIndex >= 0) {
          characters[nextStepIndex] = { ...characters[nextStepIndex], status: 'active' };
        }
        const newBuffer = characters
          .filter((character) => character.status === 'correct' || character.status === 'incorrect')
          .map((character) => character.actual)
          .join('');
        const updatedWordResults = [...state.wordResults];
        if (updatedWordResults[state.currentWordIndex]) {
          updatedWordResults[state.currentWordIndex] = {
            ...updatedWordResults[state.currentWordIndex],
            actual: newBuffer,
            errors: characters.filter((character) => character.status === 'incorrect').length,
            characters,
          };
        }
        set({
          currentWordBuffer: newBuffer,
          wordResults: updatedWordResults,
          currentStepIndex: nextStepIndex < 0 ? characters.length : nextStepIndex,
          currentStepError: null,
          backspaceCount: state.backspaceCount + 1,
          correctedErrors:
            state.correctedErrors + (removedCharacter.status === 'incorrect' ? 1 : 0),
          totalKeypresses: state.totalKeypresses + 1,
          lastPressedCode: input.code,
          lastPressStatus: null,
        });
      }
      return;
    }

    // 2. Handle Space: Finalize current word
    const isSpace = input.code === 'Space' || input.key === ' ';

    if (isSpace) {
      // Ignore accidental double space when buffer is empty to avoid skipping words
      if (state.currentWordBuffer.trim().length === 0) {
        set({
          lastPressedCode: input.code,
          lastPressStatus: null,
        });
        return;
      }

      // Finalize current word
      const currentExpected = state.words[state.currentWordIndex];
      const isCorrect = areWordsEqual(state.currentWordBuffer, currentExpected, state.language);
      const wordErrors = isCorrect
        ? 0
        : Math.max(1, computeWordErrors(state.currentWordBuffer, currentExpected));

      const updatedWordResults = [...state.wordResults];
      updatedWordResults[state.currentWordIndex] = {
        expected: currentExpected,
        actual: state.currentWordBuffer,
        status: isCorrect ? 'correct' : 'incorrect',
        errors: wordErrors,
        characters: updatedWordResults[state.currentWordIndex].characters,
      };

      const newAttemptedWords = state.totalWordsAttempted + 1;
      const newCorrectWords = isCorrect ? state.correctWords + 1 : state.correctWords;
      const newIncorrectWords = !isCorrect ? state.incorrectWords + 1 : state.incorrectWords;
      const newWordAccuracy = Math.round((newCorrectWords / newAttemptedWords) * 100);

      const newTotalKeypresses = state.totalKeypresses + 1;
      const newCorrectKeypresses = state.correctKeypresses;
      const newIncorrectKeypresses = state.incorrectKeypresses;

      const newWeakKeys = { ...state.weakKeysMap };
      if (!isCorrect) {
        const existing = newWeakKeys[currentExpected] || { display: currentExpected, count: 0 };
        newWeakKeys[currentExpected] = { display: currentExpected, count: existing.count + 1 };
      }

      const nextWordIndex = state.currentWordIndex + 1;
      if (nextWordIndex < state.words.length) {
        const nextWord = updatedWordResults[nextWordIndex];
        updatedWordResults[nextWordIndex] = {
          ...nextWord,
          status: 'active',
          characters: nextWord.characters.map((character, characterIndex) => ({
            ...character,
            status: characterIndex === 0 ? 'active' : 'pending',
          })),
        };
      }

      const effectiveMinutes = Math.max(state.elapsedSeconds / 60, 0.0167);
      const netChars = updatedWordResults
        .filter((w) => w.status === 'correct')
        .reduce((sum, w) => sum + w.expected.length + 1, 0);
      const liveCpm = Math.round(netChars / effectiveMinutes);
      const liveWpm =
        state.language === 'hi' ? Math.round(liveCpm / 5) : Math.round(netChars / 5 / effectiveMinutes);

      set({
        currentWordIndex: nextWordIndex,
        currentWordBuffer: '',
        wordResults: updatedWordResults,
        currentStepIndex: 0,
        currentStepError: null,
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

      // If finished last word of the passage:
      if (nextWordIndex >= state.words.length) {
        if (state.durationMinutes > 0 || state.passageQueue.length > 1) {
          get().advancePassage();
        } else {
          get().finishSession();
        }
      }
      return;
    }

    // 3. Regular character typing
    const producedChar = resolveOutputChar(input.code, state.language, effectiveModifiers);
    if (!producedChar) return;

    const newBuffer = state.currentWordBuffer + producedChar;
    const currentExpected = state.words[state.currentWordIndex];
    const updatedWordResults = [...state.wordResults];
    const currentWordResult = updatedWordResults[state.currentWordIndex];
    const typedStepIndex = currentWordResult.characters.findIndex(
      (character) => character.status === 'pending' || character.status === 'active'
    );
    const expectedCharacter = currentWordResult.characters[typedStepIndex];
    const isCharacterCorrect = Boolean(
      expectedCharacter && expectedCharacter.expected.normalize('NFC') === producedChar.normalize('NFC')
    );
    const characters = currentWordResult.characters.map((character) => ({ ...character }));
    if (expectedCharacter) {
      characters[typedStepIndex] = {
        ...expectedCharacter,
        actual: producedChar,
        status: isCharacterCorrect ? 'correct' : 'incorrect',
      };
      const nextStepIndex = characters.findIndex((character) => character.status === 'pending');
      if (nextStepIndex >= 0) {
        characters[nextStepIndex] = { ...characters[nextStepIndex], status: 'active' };
      }
    } else {
      characters.push({
        expected: '',
        actual: producedChar,
        status: 'incorrect',
      });
    }
    const nextStepIndex = characters.findIndex(
      (character) => character.status === 'pending' || character.status === 'active'
    );
    updatedWordResults[state.currentWordIndex] = {
      ...currentWordResult,
      actual: newBuffer,
      errors: characters.filter((character) => character.status === 'incorrect').length,
      characters,
    };

    // Check if on the last word and exact match is reached (no trailing space required)
    if (
      state.currentWordIndex === state.words.length - 1 &&
      areWordsEqual(newBuffer, currentExpected, state.language)
    ) {
      updatedWordResults[state.currentWordIndex] = {
        expected: currentExpected,
        actual: newBuffer,
        status: 'correct',
        errors: 0,
        characters: characters.map((character) => ({
          ...character,
          status: character.status === 'active' ? 'pending' : character.status,
        })),
      };

      const newAttemptedWords = state.totalWordsAttempted + 1;
      const newCorrectWords = state.correctWords + 1;
      const newWordAccuracy = Math.round((newCorrectWords / newAttemptedWords) * 100);
      const newTotalKeypresses = state.totalKeypresses + 1;
      const newCorrectKeypresses = state.correctKeypresses + (isCharacterCorrect ? 1 : 0);

      const effectiveMinutes = Math.max(state.elapsedSeconds / 60, 0.0167);
      const netChars = updatedWordResults
        .filter((w) => w.status === 'correct')
        .reduce((sum, w) => sum + w.expected.length + 1, 0);
      const liveCpm = Math.round(netChars / effectiveMinutes);
      const liveWpm =
        state.language === 'hi' ? Math.round(liveCpm / 5) : Math.round(netChars / 5 / effectiveMinutes);

      set({
        currentWordIndex: state.words.length,
        currentWordBuffer: '',
        wordResults: updatedWordResults,
        currentStepIndex: characters.length,
        currentStepError: null,
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

      // Advance to next passage if timed or multiple passages exist; else finish single-passage
      if (state.durationMinutes > 0 || state.passageQueue.length > 1) {
        get().advancePassage();
      } else {
        get().finishSession();
      }
      return;
    }

    set({
      currentWordBuffer: newBuffer,
      wordResults: updatedWordResults,
      currentStepIndex: nextStepIndex < 0 ? characters.length : nextStepIndex,
      currentStepError: isCharacterCorrect ? null : producedChar,
      totalKeypresses: state.totalKeypresses + 1,
      correctKeypresses: state.correctKeypresses + (isCharacterCorrect ? 1 : 0),
      incorrectKeypresses: state.incorrectKeypresses + (isCharacterCorrect ? 0 : 1),
      lastPressedCode: input.code,
      lastPressStatus: isCharacterCorrect ? 'correct' : 'incorrect',
    });
  },

  advancePassage: () => {
    const state = get();
    if (state.status !== 'running' || !state.lesson) return;

    // 1. Calculate and save passage-level statistics
    const now = Date.now();
    const activePassageMs =
      state.passageAccumulatedMs +
      (state.status === 'running' && state.lastResumeTimestamp
        ? Math.max(0, now - state.lastResumeTimestamp)
        : 0);
    const passageDurationSec = Math.max(1, Math.round(activePassageMs / 1000));

    const passageWords = state.wordResults;
    const passageAttempted = passageWords.filter(
      (w) => w.status === 'correct' || w.status === 'incorrect'
    ).length;
    const passageCorrect = passageWords.filter((w) => w.status === 'correct').length;
    const passageIncorrect = passageWords.filter((w) => w.status === 'incorrect').length;
    const passageAccuracy =
      passageAttempted > 0 ? Math.round((passageCorrect / passageAttempted) * 100) : 100;

    const passageMins = Math.max(passageDurationSec / 60, 0.0167);
    const passageNetChars = passageWords
      .filter((w) => w.status === 'correct')
      .reduce((sum, w) => sum + w.expected.length + 1, 0);
    const passageCpm = Math.round(passageNetChars / passageMins);
    const passageWpm =
      state.language === 'hi'
        ? Math.round(passageCpm / 5)
        : Math.round(passageNetChars / 5 / passageMins);

    const completedRecord: PassageResult = {
      passageIndex: state.completedPassages.length + 1,
      text: state.words.join(' '),
      durationSeconds: passageDurationSec,
      totalWords: passageAttempted,
      correctWords: passageCorrect,
      incorrectWords: passageIncorrect,
      wpm: passageWpm,
      cpm: passageCpm,
      accuracy: passageAccuracy,
    };

    const newCompleted = [...state.completedPassages, completedRecord];

    // If duration expired, finish session now
    if (state.durationMinutes > 0 && state.remainingSeconds <= 0) {
      set({ completedPassages: newCompleted });
      get().finishSession();
      return;
    }

    // 2. Determine Next Passage
    const nextPassageIndex = state.currentPassageIndex + 1;
    let nextPassageText = '';

    if (nextPassageIndex < state.passageQueue.length) {
      nextPassageText = state.passageQueue[nextPassageIndex];
    } else {
      // Content queue exhausted: replenish dynamically from lesson or sibling lessons of same language
      const siblingLessons = ALL_LESSONS.filter(
        (l) => l.language === state.language && l.category === state.lesson?.category
      );
      const candidates = siblingLessons.flatMap((l) => (l.content ? l.content : [l.targetText]));
      const unused = candidates.filter((p) => p && !state.passageQueue.includes(p));

      if (unused.length > 0) {
        nextPassageText = unused[0];
      } else {
        // Cycle back to beginning of queue
        nextPassageText = state.passageQueue[nextPassageIndex % state.passageQueue.length];
      }
      set((s) => ({ passageQueue: [...s.passageQueue, nextPassageText] }));
    }

    // 3. Reset passage cursor and load next words
    const nextWords = extractWordsFromText(nextPassageText);
    const nextWordResults = initializeWordResults(nextWords, state.language);
    const nextSteps = textToLessonSteps(nextPassageText, state.language);

    set({
      completedPassages: newCompleted,
      currentPassageIndex: nextPassageIndex,
      passageStartTime: now,
      passageAccumulatedMs: 0,
      words: nextWords,
      wordResults: nextWordResults,
      currentWordIndex: 0,
      currentWordBuffer: '',
      currentStepIndex: 0,
      currentStepError: null,
      lesson: {
        ...state.lesson,
        targetText: nextPassageText,
        steps: nextSteps,
      },
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

  syncTimers: () => {
    const state = get();
    if (state.status !== 'running' || !state.sessionStartTime) return;

    const now = Date.now();
    const activeMs =
      state.accumulatedActiveMs +
      (state.lastResumeTimestamp ? Math.max(0, now - state.lastResumeTimestamp) : 0);
    const newElapsed = Math.floor(activeMs / 1000);

    let newRemaining = state.remainingSeconds;
    if (state.durationMinutes > 0) {
      const totalSeconds = state.durationMinutes * 60;
      newRemaining = Math.max(0, totalSeconds - newElapsed);

      if (newRemaining <= 0) {
        set({
          elapsedSeconds: totalSeconds,
          remainingSeconds: 0,
        });
        get().finishSession();
        return;
      }
    }

    const effectiveMinutes = Math.max(newElapsed / 60, 0.0167);
    const netChars = state.wordResults
      .filter((w) => w.status === 'correct')
      .reduce((sum, w) => sum + w.expected.length + 1, 0);
    const liveCpm = Math.round(netChars / effectiveMinutes);
    const liveWpm =
      state.language === 'hi' ? Math.round(liveCpm / 5) : Math.round(netChars / 5 / effectiveMinutes);

    set({
      elapsedSeconds: newElapsed,
      remainingSeconds: newRemaining,
      liveWpm,
      liveCpm,
      liveAccuracy: state.wordAccuracy,
    });
  },

  tickTimer: () => {
    get().syncTimers();
  },

  pauseSession: () => {
    const state = get();
    if (state.status === 'running') {
      const now = Date.now();
      const currentDelta = state.lastResumeTimestamp ? Math.max(0, now - state.lastResumeTimestamp) : 0;
      set({
        status: 'paused',
        accumulatedActiveMs: state.accumulatedActiveMs + currentDelta,
        passageAccumulatedMs: state.passageAccumulatedMs + currentDelta,
        lastResumeTimestamp: null,
      });
    }
  },

  resumeSession: () => {
    const state = get();
    if (state.status === 'paused') {
      const now = Date.now();
      set({
        status: 'running',
        lastResumeTimestamp: now,
      });
      get().syncTimers();
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

    const now = Date.now();
    const finalActiveMs =
      state.accumulatedActiveMs +
      (state.lastResumeTimestamp ? Math.max(0, now - state.lastResumeTimestamp) : 0);
    const durationSeconds = Math.max(1, Math.round(finalActiveMs / 1000));

    // Handle any incomplete word when session finishes:
    // If time expires while a word is incomplete, mark it as unfinished rather than counting as correct
    let finalWordResults = [...state.wordResults];
    let finalAttemptedWords = state.totalWordsAttempted;
    let finalCorrectWords = state.correctWords;
    let finalIncorrectWords = state.incorrectWords;

    if (state.currentWordIndex < state.words.length && state.currentWordBuffer.length > 0) {
      const currentExpected = state.words[state.currentWordIndex];
      const errors = Math.max(1, computeWordErrors(state.currentWordBuffer, currentExpected));

      finalWordResults[state.currentWordIndex] = {
        expected: currentExpected,
        actual: state.currentWordBuffer,
        status: 'incorrect',
        errors,
        characters: finalWordResults[state.currentWordIndex].characters,
      };

      finalAttemptedWords += 1;
      finalIncorrectWords += 1;
    }

    const finalWordAccuracy =
      finalAttemptedWords > 0
        ? Math.round((finalCorrectWords / finalAttemptedWords) * 100)
        : 100;

    const charTotal = state.correctKeypresses + state.incorrectKeypresses;
    const finalCharAccuracy =
      charTotal > 0 ? Math.round((state.correctKeypresses / charTotal) * 100) : 100;

    const effectiveMinutes = Math.max(durationSeconds / 60, 0.0167);
    const netChars = finalWordResults
      .filter((w) => w.status === 'correct')
      .reduce((sum, w) => sum + w.expected.length + 1, 0);
    const cpm = Math.round(netChars / effectiveMinutes);
    const wpm =
      state.language === 'hi' ? Math.round(cpm / 5) : Math.round(netChars / 5 / effectiveMinutes);

    const weakKeysList = Object.entries(state.weakKeysMap).map(([key, data]) => ({
      key,
      display: data.display,
      count: data.count,
    }));
    weakKeysList.sort((a, b) => b.count - a.count);

    const passagesCompletedCount = Math.max(
      state.completedPassages.length,
      finalAttemptedWords >= state.words.length ? 1 : state.completedPassages.length
    );

    const result: SessionResult = {
      id: `session-${Date.now()}`,
      lessonId: state.lesson.id,
      lessonTitle: state.lesson.title,
      language: state.language,
      difficulty: state.lesson.difficulty,
      practiceType: state.lesson.category || state.lesson.practiceType || 'keys',
      category: state.lesson.category || 'keys',
      timestamp: Date.now(),
      durationSeconds,
      selectedDurationMinutes: state.durationMinutes,
      passagesCompleted: passagesCompletedCount,
      passages: state.completedPassages,
      wpm,
      cpm,
      accuracy: finalWordAccuracy,
      characterAccuracy: finalCharAccuracy,
      firstAttemptAccuracy: finalWordAccuracy,
      totalKeypresses: state.totalKeypresses,
      correctKeypresses: state.correctKeypresses,
      incorrectKeypresses: state.incorrectKeypresses,
      backspaceCount: state.backspaceCount,
      correctedErrors: state.correctedErrors,
      totalMistakes: state.incorrectKeypresses + state.incorrectWords,
      totalWordsAttempted: finalAttemptedWords,
      correctWords: finalCorrectWords,
      incorrectWords: finalIncorrectWords,
      wordAccuracy: finalWordAccuracy,
      weakKeys: weakKeysList,
      wordResults: finalWordResults,
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
      lastResumeTimestamp: null,
    });

    return result;
  },

  getCharacterResults: () => {
    const state = get();
    const wordIndex = Math.min(state.currentWordIndex, state.wordResults.length - 1);
    return state.wordResults[wordIndex]?.characters ?? [];
  },

  getWordResults: () => {
    return get().wordResults;
  },
}));
