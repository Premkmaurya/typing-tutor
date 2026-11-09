import { Language } from '../../types/keyboard.types';
import { WordResult } from '../../types/typing.types';
import { findKeyForChar } from '../keyboard/layerResolver';
import { textToLessonSteps } from './composer';
import { splitIntoGraphemes } from './graphemes';

/**
 * Extracts whitespace-separated word tokens from target text.
 */
export function extractWordsFromText(text: string): string[] {
  if (!text) return [];
  return text.trim().split(/\s+/).filter(Boolean);
}

/**
 * Unicode-aware comparison of typed word and expected word.
 * For Hindi, normalizes to Unicode NFC (canonical composition) to handle InScript matras/conjuncts.
 */
export function areWordsEqual(
  actual: string,
  expected: string,
  language: Language
): boolean {
  if (!actual || !expected) return false;

  const normActual = language === 'hi' ? actual.normalize('NFC').trim() : actual.trim();
  const normExpected = language === 'hi' ? expected.normalize('NFC').trim() : expected.trim();

  return normActual === normExpected;
}

/**
 * Computes Levenshtein edit distance between two words to record character-level errors.
 */
export function computeWordErrors(actual: string, expected: string): number {
  const a = splitIntoGraphemes(actual.trim().normalize('NFC'));
  const b = splitIntoGraphemes(expected.trim().normalize('NFC'));
  if (a.join('') === b.join('')) return 0;

  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

/**
 * Initializes WordResult array for a given list of words.
 */
export function initializeWordResults(words: string[], language: Language = 'en'): WordResult[] {
  return words.map((expected, idx) => ({
    expected,
    actual: '',
    status: idx === 0 ? 'active' : 'pending',
    errors: 0,
    characters: textToLessonSteps(expected, language).map((step, stepIndex) => ({
      expected: step.expectedOutput,
      actual: '',
      status: idx === 0 && stepIndex === 0 ? 'active' : 'pending',
    })),
  }));
}

/**
 * Computes the next physical key to highlight on the virtual keyboard for the active word.
 */
export function getNextExpectedKeyForWord(
  expectedWord: string | undefined,
  currentBuffer: string,
  language: Language,
  isLastWord = false
): { code: string | null; modifiers: ('Shift' | 'AltGr')[] } {
  if (!expectedWord) {
    return { code: null, modifiers: [] };
  }

  const expectedSteps = textToLessonSteps(expectedWord, language);
  const currentStepIndex = Array.from(currentBuffer).length;

  // If user has typed the full expected word or more
  if (currentStepIndex >= expectedSteps.length) {
    if (isLastWord) {
      return { code: null, modifiers: [] };
    }
    return { code: 'Space', modifiers: [] };
  }

  // Next expected character in the active word
  const nextChar = expectedSteps[currentStepIndex]?.expectedOutput;
  const req = findKeyForChar(nextChar, language);

  if (req) {
    return { code: req.code, modifiers: req.modifiers };
  }

  return { code: null, modifiers: [] };
}
