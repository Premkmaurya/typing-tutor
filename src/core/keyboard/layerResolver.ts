import { KeyMapping, Language, ModifierState } from '../../types/keyboard.types';
import { ENGLISH_KEYBOARD_ROWS } from './layouts/english';

// Fast lookup map by key code
const KEY_CODE_MAP = new Map<string, KeyMapping>();

for (const row of ENGLISH_KEYBOARD_ROWS) {
  for (const key of row) {
    KEY_CODE_MAP.set(key.code, key);
  }
}

/**
 * Get key mapping by KeyboardEvent.code
 */
export function getKeyMappingByCode(code: string): KeyMapping | undefined {
  return KEY_CODE_MAP.get(code);
}

/**
 * Resolve the Unicode character produced by a physical key code and modifier states
 */
export function resolveOutputChar(
  code: string,
  language: Language,
  modifiers: ModifierState
): string {
  const key = KEY_CODE_MAP.get(code);
  if (!key) return '';

  if (language === 'en') {
    const isLetter = code.startsWith('Key');
    const isShifted = modifiers.shift;
    const isCapsLock = modifiers.capsLock;

    if (isLetter) {
      // Caps lock inverts letter casing
      const effectiveUpper = isCapsLock ? !isShifted : isShifted;
      return effectiveUpper ? key.english.shifted : key.english.normal;
    }

    return isShifted ? key.english.shifted : key.english.normal;
  }

  // Hindi InScript Resolution
  if (modifiers.altGr && modifiers.shift && key.hindi.altGrShift) {
    return key.hindi.altGrShift;
  }

  if (modifiers.altGr && key.hindi.altGr) {
    return key.hindi.altGr;
  }

  if (modifiers.shift) {
    return key.hindi.shifted;
  }

  return key.hindi.normal;
}

export interface KeyRequirement {
  code: string;
  modifiers: ('Shift' | 'AltGr')[];
  displayChar: string;
}

/**
 * Reverse lookup: Find which physical key and modifier layer are required
 * to type the given character in the specified language.
 */
export function findKeyForChar(
  char: string,
  language: Language
): KeyRequirement | null {
  if (!char) return null;

  // Space special handling
  if (char === ' ') {
    return { code: 'Space', modifiers: [], displayChar: 'Space' };
  }
  if (char === '\n') {
    return { code: 'Enter', modifiers: [], displayChar: 'Enter' };
  }
  if (char === '\t') {
    return { code: 'Tab', modifiers: [], displayChar: 'Tab' };
  }

  for (const row of ENGLISH_KEYBOARD_ROWS) {
    for (const key of row) {
      if (language === 'en') {
        if (key.english.normal === char) {
          return { code: key.code, modifiers: [], displayChar: char };
        }
        if (key.english.shifted === char) {
          return { code: key.code, modifiers: ['Shift'], displayChar: char };
        }
      } else {
        // Hindi InScript
        if (key.hindi.normal === char) {
          return { code: key.code, modifiers: [], displayChar: char };
        }
        if (key.hindi.shifted === char) {
          return { code: key.code, modifiers: ['Shift'], displayChar: char };
        }
        if (key.hindi.altGr === char) {
          return { code: key.code, modifiers: ['AltGr'], displayChar: char };
        }
        if (key.hindi.altGrShift === char) {
          return { code: key.code, modifiers: ['Shift', 'AltGr'], displayChar: char };
        }
      }
    }
  }

  return null;
}
