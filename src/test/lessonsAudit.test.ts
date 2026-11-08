import { describe, it, expect } from 'vitest';
import { ALL_LESSONS } from '../data/lessons';
import { resolveOutputChar } from '../core/keyboard/layerResolver';

describe('Comprehensive Lessons and Keystroke Audit', () => {
  it('verifies that every lesson has non-empty valid steps with no Unknown keycodes', () => {
    for (const lesson of ALL_LESSONS) {
      expect(lesson.steps.length, `Lesson ${lesson.id} has no steps`).toBeGreaterThan(0);

      for (let i = 0; i < lesson.steps.length; i++) {
        const step = lesson.steps[i];
        expect(
          step.keyCode,
          `Lesson ${lesson.id} at step ${i} ('${step.expectedOutput}') produced Unknown keyCode`
        ).not.toBe('Unknown');
      }
    }
  });

  it('verifies that each expectedOutput matches the character resolved by its keyCode and modifiers', () => {
    for (const lesson of ALL_LESSONS) {
      for (let i = 0; i < lesson.steps.length; i++) {
        const step = lesson.steps[i];
        const isShift = step.modifiers?.includes('Shift') ?? false;
        const isAltGr = step.modifiers?.includes('AltGr') ?? false;

        const resolved = resolveOutputChar(step.keyCode, lesson.language, {
          shift: isShift,
          capsLock: false,
          altGr: isAltGr,
          ctrl: false,
          meta: false,
        });

        expect(
          resolved,
          `Lesson ${lesson.id} step ${i}: keyCode ${step.keyCode} with mods ${step.modifiers?.join('+')} resolved to '${resolved}', expected '${step.expectedOutput}'`
        ).toBe(step.expectedOutput);
      }
    }
  });
});
