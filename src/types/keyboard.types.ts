export type Language = 'en' | 'hi';

export type KeyState = 
  | 'default'
  | 'next'
  | 'correct'
  | 'incorrect'
  | 'pressed'
  | 'disabled'
  | 'modifier-active';

export interface KeyLayers {
  normal: string;
  shifted: string;
  altGr?: string;
  altGrShift?: string;
  capsLock?: string;
}

export interface KeyMapping {
  code: string;            // KeyboardEvent.code, e.g. "KeyQ", "Digit1"
  displayLabel?: string;   // Optional fallback label for special keys like "Tab", "Shift"
  english: {
    normal: string;
    shifted: string;
    capsLock?: string;
  };
  hindi: {
    normal: string;
    shifted: string;
    altGr?: string;
    altGrShift?: string;
    capsLock?: string;
  };
  widthMultiplier?: number; // 1 = standard key, 1.5 = tab/backslash, 1.75 = caps, 2 = backspace/enter, 2.25 = shift, 6 = space
  finger?: 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 'thumb' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky';
}

export interface KeyboardLayout {
  id: string;
  name: string;
  language: Language;
  rows: KeyMapping[][];
}

export interface ModifierState {
  shift: boolean;
  capsLock: boolean;
  altGr: boolean;
  ctrl: boolean;
  meta: boolean;
}
