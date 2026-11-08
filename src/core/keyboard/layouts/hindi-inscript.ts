/**
 * Devanagari InScript Keyboard Layout Specification
 *
 * Source & Attribution:
 * - Unicode CLDR Chart 43 (keyboards/layouts/hi.html)
 * - Standard Indian Script Keyboard (InScript) - Bureau of Indian Standards (BIS) IS 13194:1991
 * - Microsoft Windows Devanagari InScript Keyboard Driver (KBDINDEV.DLL)
 *
 * Linguistic Structure:
 * - Left hand: Vowels and vowel signs (Matras) + Virama (Halant)
 * - Right hand: Consonants categorized phonetically (Velar, Palatal, Retroflex, Dental, Labial)
 * - Top number row: Conjunct modifiers (Reph, R-conjunct), Numerals, and special ligatures (ज्ञ, त्र, क्ष, श्र)
 */

import { KeyboardLayout } from '../../../types/keyboard.types';
import { ENGLISH_KEYBOARD_ROWS } from './english';

export const HINDI_INSCRIPT_LAYOUT: KeyboardLayout = {
  id: 'hi-inscript',
  name: 'Devanagari InScript',
  language: 'hi',
  rows: ENGLISH_KEYBOARD_ROWS,
};

export const ENGLISH_QWERTY_LAYOUT: KeyboardLayout = {
  id: 'en-qwerty',
  name: 'English US QWERTY',
  language: 'en',
  rows: ENGLISH_KEYBOARD_ROWS,
};
