import { describe, it, expect } from 'vitest';
import { textToLessonSteps } from '../core/typing/composer';
import { evaluateKeypress } from '../core/typing/matcher';
import { calculateTypingMetrics } from '../core/typing/metrics';
import { splitIntoGraphemes, isDevanagariCombiningMark } from '../core/typing/graphemes';
import { ModifierState } from '../types/keyboard.types';

const defaultMods: ModifierState = {
  shift: false,
  capsLock: false,
  altGr: false,
  ctrl: false,
  meta: false,
};

describe('Typing Engine Tests', () => {
  describe('Grapheme and Unicode Handling', () => {
    it('splits English and Hindi text into correct graphemes', () => {
      const hindiText = 'नमस्ते भारत';
      const graphemes = splitIntoGraphemes(hindiText, 'hi');
      expect(graphemes.length).toBeGreaterThan(0);
      expect(graphemes.join('')).toBe(hindiText);
    });

    it('identifies Devanagari combining marks and matras correctly', () => {
      expect(isDevanagariCombiningMark('ा')).toBe(true);
      expect(isDevanagariCombiningMark('ि')).toBe(true);
      expect(isDevanagariCombiningMark('्')).toBe(true);
      expect(isDevanagariCombiningMark('क')).toBe(false);
      expect(isDevanagariCombiningMark('a')).toBe(false);
    });
  });

  describe('Lesson Keystroke Decomposition (textToLessonSteps)', () => {
    it('decomposes English words into sequential physical key steps', () => {
      const steps = textToLessonSteps('Ask', 'en');
      expect(steps.length).toBe(3);
      expect(steps[0]).toEqual({
        keyCode: 'KeyA',
        modifiers: ['Shift'],
        expectedOutput: 'A',
      });
      expect(steps[1]).toEqual({
        keyCode: 'KeyS',
        modifiers: [],
        expectedOutput: 's',
      });
      expect(steps[2]).toEqual({
        keyCode: 'KeyK',
        modifiers: [],
        expectedOutput: 'k',
      });
    });

    it('decomposes Hindi words with matras into exact InScript keystrokes', () => {
      // 'पानी' -> प (KeyH) + ा (KeyE) + न (KeyV) + ी (KeyR)
      const steps = textToLessonSteps('पानी', 'hi');
      expect(steps.length).toBe(4);
      expect(steps[0].keyCode).toBe('KeyH');
      expect(steps[0].expectedOutput).toBe('प');

      expect(steps[1].keyCode).toBe('KeyE');
      expect(steps[1].expectedOutput).toBe('ा');

      expect(steps[2].keyCode).toBe('KeyV');
      expect(steps[2].expectedOutput).toBe('न');

      expect(steps[3].keyCode).toBe('KeyR');
      expect(steps[3].expectedOutput).toBe('ी');
    });

    it('decomposes Hindi conjuncts with halant correctly', () => {
      // 'क्या' -> क (KeyK) + ् (KeyD) + य (Slash) + ा (KeyE)
      const steps = textToLessonSteps('क्या', 'hi');
      expect(steps.length).toBe(4);
      expect(steps[0].keyCode).toBe('KeyK'); // क
      expect(steps[1].keyCode).toBe('KeyD'); // ् (halant)
      expect(steps[2].keyCode).toBe('Slash'); // य
      expect(steps[3].keyCode).toBe('KeyE'); // ा
    });
  });

  describe('Keystroke Evaluation (evaluateKeypress)', () => {
    const step = {
      keyCode: 'KeyK',
      modifiers: [],
      expectedOutput: 'क',
    };

    it('identifies correct physical key press for Hindi', () => {
      const result = evaluateKeypress('KeyK', defaultMods, step, 'hi');
      expect(result.isMatch).toBe(true);
      expect(result.isBackspace).toBe(false);
      expect(result.producedChar).toBe('क');
    });

    it('identifies incorrect physical key press for Hindi', () => {
      const result = evaluateKeypress('KeyL', defaultMods, step, 'hi');
      expect(result.isMatch).toBe(false);
      expect(result.isBackspace).toBe(false);
      expect(result.producedChar).toBe('त');
    });

    it('identifies Backspace correctly', () => {
      const result = evaluateKeypress('Backspace', defaultMods, step, 'hi');
      expect(result.isBackspace).toBe(true);
      expect(result.isMatch).toBe(false);
    });

    it('ignores standalone modifier key presses', () => {
      const result = evaluateKeypress('ShiftLeft', { ...defaultMods, shift: true }, step, 'hi');
      expect(result.isIgnoredModifier).toBe(true);
      expect(result.isMatch).toBe(false);
    });
  });

  describe('Typing Metrics Calculation', () => {
    it('calculates English WPM correctly', () => {
      // 100 correct chars in 60 seconds = (100 / 5) / 1 = 20 WPM
      const metrics = calculateTypingMetrics({
        language: 'en',
        totalKeypresses: 100,
        correctKeypresses: 100,
        incorrectKeypresses: 0,
        backspaceCount: 0,
        correctedErrors: 0,
        firstAttemptCorrect: 100,
        totalTargetChars: 100,
        elapsedSeconds: 60,
      });

      expect(metrics.wpm).toBe(20);
      expect(metrics.accuracy).toBe(100);
      expect(metrics.firstAttemptAccuracy).toBe(100);
    });

    it('calculates Hindi CPM and equivalent WPM correctly', () => {
      // 150 correct chars in 60 seconds = 150 CPM, ~30 WPM
      const metrics = calculateTypingMetrics({
        language: 'hi',
        totalKeypresses: 160,
        correctKeypresses: 150,
        incorrectKeypresses: 10,
        backspaceCount: 5,
        correctedErrors: 5,
        firstAttemptCorrect: 140,
        totalTargetChars: 150,
        elapsedSeconds: 60,
      });

      expect(metrics.cpm).toBe(150);
      expect(metrics.wpm).toBe(30);
      expect(metrics.accuracy).toBe(94); // (150/160)*100
    });
  });
});
