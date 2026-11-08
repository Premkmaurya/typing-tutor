import { describe, it, expect } from 'vitest';
import { ENGLISH_KEYBOARD_ROWS } from '../core/keyboard/layouts/english';
import {
  getKeyMappingByCode,
  resolveOutputChar,
  findKeyForChar,
} from '../core/keyboard/layerResolver';
import { ModifierState } from '../types/keyboard.types';

const defaultMods: ModifierState = {
  shift: false,
  capsLock: false,
  altGr: false,
  ctrl: false,
  meta: false,
};

describe('Keyboard Layout and Layer Resolver Tests', () => {
  it('should find all standard physical keys in the layout', () => {
    expect(getKeyMappingByCode('KeyQ')).toBeDefined();
    expect(getKeyMappingByCode('KeyA')).toBeDefined();
    expect(getKeyMappingByCode('KeyZ')).toBeDefined();
    expect(getKeyMappingByCode('Space')).toBeDefined();
    expect(getKeyMappingByCode('Backspace')).toBeDefined();
    expect(getKeyMappingByCode('Enter')).toBeDefined();
  });

  describe('English QWERTY Layout', () => {
    it('resolves normal lower-case letters without shift', () => {
      expect(resolveOutputChar('KeyQ', 'en', defaultMods)).toBe('q');
      expect(resolveOutputChar('KeyA', 'en', defaultMods)).toBe('a');
      expect(resolveOutputChar('KeyM', 'en', defaultMods)).toBe('m');
    });

    it('resolves shifted upper-case letters with Shift', () => {
      const shiftMods = { ...defaultMods, shift: true };
      expect(resolveOutputChar('KeyQ', 'en', shiftMods)).toBe('Q');
      expect(resolveOutputChar('KeyA', 'en', shiftMods)).toBe('A');
    });

    it('resolves shifted punctuation and digits with Shift', () => {
      const shiftMods = { ...defaultMods, shift: true };
      expect(resolveOutputChar('Digit1', 'en', shiftMods)).toBe('!');
      expect(resolveOutputChar('Digit2', 'en', shiftMods)).toBe('@');
      expect(resolveOutputChar('Digit4', 'en', shiftMods)).toBe('$');
      expect(resolveOutputChar('Minus', 'en', shiftMods)).toBe('_');
    });

    it('handles Caps Lock correctly, inverting shift state for letters', () => {
      const capsMods = { ...defaultMods, capsLock: true };
      expect(resolveOutputChar('KeyA', 'en', capsMods)).toBe('A');

      const capsAndShiftMods = { ...defaultMods, capsLock: true, shift: true };
      expect(resolveOutputChar('KeyA', 'en', capsAndShiftMods)).toBe('a');
    });
  });

  describe('Hindi Devanagari InScript Layout', () => {
    it('resolves base InScript consonants correctly', () => {
      expect(resolveOutputChar('KeyK', 'hi', defaultMods)).toBe('क');
      expect(resolveOutputChar('KeyL', 'hi', defaultMods)).toBe('त');
      expect(resolveOutputChar('KeyH', 'hi', defaultMods)).toBe('प');
      expect(resolveOutputChar('KeyJ', 'hi', defaultMods)).toBe('र');
      expect(resolveOutputChar('Semicolon', 'hi', defaultMods)).toBe('च');
      expect(resolveOutputChar('KeyY', 'hi', defaultMods)).toBe('ब');
      expect(resolveOutputChar('KeyU', 'hi', defaultMods)).toBe('ह');
      expect(resolveOutputChar('KeyI', 'hi', defaultMods)).toBe('ग');
      expect(resolveOutputChar('KeyO', 'hi', defaultMods)).toBe('द');
      expect(resolveOutputChar('KeyP', 'hi', defaultMods)).toBe('ज');
      expect(resolveOutputChar('KeyC', 'hi', defaultMods)).toBe('म');
      expect(resolveOutputChar('KeyV', 'hi', defaultMods)).toBe('न');
      expect(resolveOutputChar('KeyM', 'hi', defaultMods)).toBe('स');
      expect(resolveOutputChar('Slash', 'hi', defaultMods)).toBe('य');
    });

    it('resolves base InScript vowel matras and halant correctly', () => {
      expect(resolveOutputChar('KeyD', 'hi', defaultMods)).toBe('्'); // Halant
      expect(resolveOutputChar('KeyE', 'hi', defaultMods)).toBe('ा'); // Aa Matra
      expect(resolveOutputChar('KeyF', 'hi', defaultMods)).toBe('ि'); // Short I Matra
      expect(resolveOutputChar('KeyR', 'hi', defaultMods)).toBe('ी'); // Long Ii Matra
      expect(resolveOutputChar('KeyG', 'hi', defaultMods)).toBe('ु'); // Short U Matra
      expect(resolveOutputChar('KeyT', 'hi', defaultMods)).toBe('ू'); // Long Uu Matra
      expect(resolveOutputChar('KeyS', 'hi', defaultMods)).toBe('े'); // E Matra
      expect(resolveOutputChar('KeyW', 'hi', defaultMods)).toBe('ै'); // Ai Matra
      expect(resolveOutputChar('KeyA', 'hi', defaultMods)).toBe('ो'); // O Matra
      expect(resolveOutputChar('KeyQ', 'hi', defaultMods)).toBe('ौ'); // Au Matra
    });

    it('resolves Shift-layer aspirated consonants and independent vowels', () => {
      const shiftMods = { ...defaultMods, shift: true };
      expect(resolveOutputChar('KeyK', 'hi', shiftMods)).toBe('ख');
      expect(resolveOutputChar('KeyL', 'hi', shiftMods)).toBe('थ');
      expect(resolveOutputChar('KeyH', 'hi', shiftMods)).toBe('फ');
      expect(resolveOutputChar('KeyI', 'hi', shiftMods)).toBe('घ');
      expect(resolveOutputChar('KeyO', 'hi', shiftMods)).toBe('ध');
      expect(resolveOutputChar('KeyP', 'hi', shiftMods)).toBe('झ');
      expect(resolveOutputChar('KeyD', 'hi', shiftMods)).toBe('अ'); // Full vowel A
      expect(resolveOutputChar('KeyE', 'hi', shiftMods)).toBe('आ'); // Full vowel Aa
      expect(resolveOutputChar('KeyF', 'hi', shiftMods)).toBe('इ'); // Full vowel I
      expect(resolveOutputChar('KeyR', 'hi', shiftMods)).toBe('ई'); // Full vowel Ii
      expect(resolveOutputChar('KeyG', 'hi', shiftMods)).toBe('उ'); // Full vowel U
      expect(resolveOutputChar('KeyT', 'hi', shiftMods)).toBe('ऊ'); // Full vowel Uu
      expect(resolveOutputChar('KeyS', 'hi', shiftMods)).toBe('ए'); // Full vowel E
      expect(resolveOutputChar('KeyW', 'hi', shiftMods)).toBe('ऐ'); // Full vowel Ai
      expect(resolveOutputChar('KeyA', 'hi', shiftMods)).toBe('ओ'); // Full vowel O
      expect(resolveOutputChar('KeyQ', 'hi', shiftMods)).toBe('औ'); // Full vowel Au
    });

    it('resolves InScript Purna Viram (Danda) on Shift + Period', () => {
      const shiftMods = { ...defaultMods, shift: true };
      expect(resolveOutputChar('Period', 'hi', shiftMods)).toBe('।');
    });

    it('resolves InScript AltGr numerals and symbols', () => {
      const altGrMods = { ...defaultMods, altGr: true };
      expect(resolveOutputChar('Digit1', 'hi', altGrMods)).toBe('१');
      expect(resolveOutputChar('Digit2', 'hi', altGrMods)).toBe('२');
      expect(resolveOutputChar('Digit3', 'hi', altGrMods)).toBe('३');
      expect(resolveOutputChar('Digit4', 'hi', altGrMods)).toBe('₹'); // Rupee symbol
    });
  });

  describe('Reverse Key Lookup (findKeyForChar)', () => {
    it('finds correct key and modifier for English letters', () => {
      expect(findKeyForChar('a', 'en')).toEqual({
        code: 'KeyA',
        modifiers: [],
        displayChar: 'a',
      });
      expect(findKeyForChar('A', 'en')).toEqual({
        code: 'KeyA',
        modifiers: ['Shift'],
        displayChar: 'A',
      });
      expect(findKeyForChar(' ', 'en')).toEqual({
        code: 'Space',
        modifiers: [],
        displayChar: 'Space',
      });
    });

    it('finds correct key and modifier for Hindi InScript characters', () => {
      expect(findKeyForChar('क', 'hi')).toEqual({
        code: 'KeyK',
        modifiers: [],
        displayChar: 'क',
      });
      expect(findKeyForChar('ख', 'hi')).toEqual({
        code: 'KeyK',
        modifiers: ['Shift'],
        displayChar: 'ख',
      });
      expect(findKeyForChar('ा', 'hi')).toEqual({
        code: 'KeyE',
        modifiers: [],
        displayChar: 'ा',
      });
      expect(findKeyForChar('आ', 'hi')).toEqual({
        code: 'KeyE',
        modifiers: ['Shift'],
        displayChar: 'आ',
      });
      expect(findKeyForChar('।', 'hi')).toEqual({
        code: 'Period',
        modifiers: ['Shift'],
        displayChar: '।',
      });
    });
  });
});
