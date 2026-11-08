import { Language } from '../../types/keyboard.types';

export interface RawMetricsInput {
  language: Language;
  totalKeypresses: number;
  correctKeypresses: number;
  incorrectKeypresses: number;
  backspaceCount: number;
  correctedErrors: number;
  firstAttemptCorrect: number;
  totalTargetChars: number;
  elapsedSeconds: number;
  attemptedChars?: number;
  netChars?: number;
}

export interface CalculatedMetrics {
  wpm: number;
  cpm: number;
  accuracy: number;
  firstAttemptAccuracy: number;
  netWpm: number;
}

/**
 * Calculate standard typing statistics based on language and keystroke performance.
 */
export function calculateTypingMetrics(input: RawMetricsInput): CalculatedMetrics {
  const {
    language,
    totalKeypresses,
    correctKeypresses,
    firstAttemptCorrect,
    totalTargetChars,
    elapsedSeconds,
    attemptedChars,
    netChars,
  } = input;

  // Protect against zero or negligible elapsed time
  const effectiveMinutes = Math.max(elapsedSeconds / 60, 0.0167); // minimum 1 second

  // Raw accuracy (correct presses / total presses)
  const accuracy = totalKeypresses > 0 
    ? Math.min(100, Math.round((correctKeypresses / totalKeypresses) * 100))
    : 100;

  // First-attempt accuracy (evaluated against attempted chars or total target chars)
  const attemptedCount = attemptedChars !== undefined ? attemptedChars : totalTargetChars;
  const firstAttemptAccuracy = attemptedCount > 0
    ? Math.min(100, Math.round((firstAttemptCorrect / attemptedCount) * 100))
    : 100;

  // Effective net correct characters (avoids inflation from backspacing repeat typing)
  const effectiveCorrect = netChars !== undefined ? netChars : correctKeypresses;

  // CPM = correct characters / elapsed minutes
  const cpm = Math.round(effectiveCorrect / effectiveMinutes);

  // WPM for English standard: 5 characters per word
  const wpm = Math.round((effectiveCorrect / 5) / effectiveMinutes);

  // Net WPM
  const netWpm = Math.max(0, wpm);

  return {
    wpm: language === 'hi' ? Math.round(cpm / 5) : wpm,
    cpm,
    accuracy,
    firstAttemptAccuracy,
    netWpm,
  };
}
