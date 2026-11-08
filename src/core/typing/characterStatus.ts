import { CharacterResult, TypedCharacter } from '../../types/typing.types';
import { LessonStep } from '../../types/lesson.types';

/**
 * Computes individual character status and display values for target passage rendering.
 *
 * Rules:
 * 1. idx < currentStepIndex: Completed characters.
 *    - In strict typing mode, advancing requires entering the correct character.
 *    - Once corrected and advanced, character turns GREEN (status 'correct').
 * 2. idx === currentStepIndex: Active position.
 *    - If currentStepError is present (an incorrect key was pressed):
 *      status is 'incorrect' (red), displaying actual erroneous character.
 *    - If no error:
 *      status is 'active' (blue cursor/highlight), expected character is shown.
 * 3. idx > currentStepIndex: Remaining pending characters.
 *    - status is 'pending' (muted gray).
 */
export function computeCharacterResults(
  steps: LessonStep[],
  currentStepIndex: number,
  currentStepError: string | null = null,
  typedChars: TypedCharacter[] = []
): CharacterResult[] {
  return steps.map((step, idx) => {
    if (idx < currentStepIndex) {
      const typed = typedChars[idx];
      return {
        expected: step.expectedOutput,
        actual: typed?.char ?? step.expectedOutput,
        status: 'correct',
      };
    }

    if (idx === currentStepIndex) {
      if (currentStepError !== null) {
        return {
          expected: step.expectedOutput,
          actual: currentStepError,
          status: 'incorrect',
        };
      }
      return {
        expected: step.expectedOutput,
        actual: undefined,
        status: 'active',
      };
    }

    return {
      expected: step.expectedOutput,
      actual: undefined,
      status: 'pending',
    };
  });
}
