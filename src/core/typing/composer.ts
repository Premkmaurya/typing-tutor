import { Language } from '../../types/keyboard.types';
import { LessonStep } from '../../types/lesson.types';
import { findKeyForChar } from '../keyboard/layerResolver';

/**
 * Normalizes decomposed or precomposed Devanagari variants to match standard InScript typing order.
 */
export function prepareTextForInScript(text: string): string {
  // Normalize to NFD first then recombine standard sequences if needed
  return text.normalize('NFC');
}

/**
 * Converts target text into a sequence of expected physical keystrokes.
 */
export function textToLessonSteps(text: string, language: Language): LessonStep[] {
  const steps: LessonStep[] = [];
  const normalized = prepareTextForInScript(text);

  // Iterate by code points
  for (const char of normalized) {
    const keyReq = findKeyForChar(char, language);

    if (keyReq) {
      steps.push({
        keyCode: keyReq.code,
        modifiers: keyReq.modifiers,
        expectedOutput: char,
      });
    } else {
      // If a decomposed or multi-codepoint character doesn't have a single key
      // e.g. Precomposed Nukta consonants (क़, ख़, ग़, ज़, ड़, ढ़, फ़)
      const decomposed = char.normalize('NFD');
      let allFound = true;
      const subSteps: LessonStep[] = [];

      for (const subChar of decomposed) {
        const subReq = findKeyForChar(subChar, language);
        if (subReq) {
          subSteps.push({
            keyCode: subReq.code,
            modifiers: subReq.modifiers,
            expectedOutput: subChar,
          });
        } else {
          allFound = false;
          break;
        }
      }

      if (allFound && subSteps.length > 0) {
        steps.push(...subSteps);
      } else {
        // Fallback: create step with unknown keyCode so UI displays character
        steps.push({
          keyCode: 'Unknown',
          modifiers: [],
          expectedOutput: char,
        });
      }
    }
  }

  return steps;
}
