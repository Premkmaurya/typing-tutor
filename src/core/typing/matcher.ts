import { Language, ModifierState } from '../../types/keyboard.types';
import { LessonStep } from '../../types/lesson.types';
import { resolveOutputChar } from '../keyboard/layerResolver';

export interface KeyMatchResult {
  isMatch: boolean;
  isBackspace: boolean;
  isIgnoredModifier: boolean;
  producedChar: string;
  expectedChar: string;
  expectedCode: string;
  expectedModifiers: string[];
}

/**
 * Checks whether an incoming key event matches the expected lesson step.
 */
export function evaluateKeypress(
  code: string,
  modifiers: ModifierState,
  currentStep: LessonStep | undefined,
  language: Language
): KeyMatchResult {
  // If no step or complete
  if (!currentStep) {
    return {
      isMatch: false,
      isBackspace: false,
      isIgnoredModifier: false,
      producedChar: '',
      expectedChar: '',
      expectedCode: '',
      expectedModifiers: [],
    };
  }

  // Handle standalone modifier keypresses (Shift, Control, Alt, Meta)
  if (
    code === 'ShiftLeft' ||
    code === 'ShiftRight' ||
    code === 'ControlLeft' ||
    code === 'ControlRight' ||
    code === 'AltLeft' ||
    code === 'AltRight' ||
    code === 'MetaLeft' ||
    code === 'MetaRight' ||
    code === 'CapsLock'
  ) {
    return {
      isMatch: false,
      isBackspace: false,
      isIgnoredModifier: true,
      producedChar: '',
      expectedChar: currentStep.expectedOutput,
      expectedCode: currentStep.keyCode,
      expectedModifiers: currentStep.modifiers || [],
    };
  }

  // Handle Backspace
  if (code === 'Backspace') {
    return {
      isMatch: false,
      isBackspace: true,
      isIgnoredModifier: false,
      producedChar: '',
      expectedChar: currentStep.expectedOutput,
      expectedCode: currentStep.keyCode,
      expectedModifiers: currentStep.modifiers || [],
    };
  }

  // Resolve the character produced by this physical key press
  const producedChar = resolveOutputChar(code, language, modifiers);
  const isMatch = producedChar === currentStep.expectedOutput;

  return {
    isMatch,
    isBackspace: false,
    isIgnoredModifier: false,
    producedChar,
    expectedChar: currentStep.expectedOutput,
    expectedCode: currentStep.keyCode,
    expectedModifiers: currentStep.modifiers || [],
  };
}
