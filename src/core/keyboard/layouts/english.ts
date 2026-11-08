import { KeyMapping } from '../../../types/keyboard.types';

/**
 * Standard US QWERTY Keyboard Layout
 * Reference: ISO/IEC 9995-2 & ANSI-INCITS 154-1988
 */
export const ENGLISH_KEYBOARD_ROWS: KeyMapping[][] = [
  // Row 1 - Number Row
  [
    {
      code: 'Backquote',
      english: { normal: '`', shifted: '~' },
      hindi: { normal: '`', shifted: '~' },
      finger: 'left-pinky',
    },
    {
      code: 'Digit1',
      english: { normal: '1', shifted: '!' },
      hindi: { normal: '1', shifted: 'ऍ', altGr: '१' },
      finger: 'left-pinky',
    },
    {
      code: 'Digit2',
      english: { normal: '2', shifted: '@' },
      hindi: { normal: '2', shifted: 'ॅ', altGr: '२' },
      finger: 'left-ring',
    },
    {
      code: 'Digit3',
      english: { normal: '3', shifted: '#' },
      hindi: { normal: '3', shifted: '्र', altGr: '३' },
      finger: 'left-middle',
    },
    {
      code: 'Digit4',
      english: { normal: '4', shifted: '$' },
      hindi: { normal: '4', shifted: 'र्', altGr: '₹', altGrShift: '४' },
      finger: 'left-index',
    },
    {
      code: 'Digit5',
      english: { normal: '5', shifted: '%' },
      hindi: { normal: '5', shifted: 'ज्ञ', altGr: '५' },
      finger: 'left-index',
    },
    {
      code: 'Digit6',
      english: { normal: '6', shifted: '^' },
      hindi: { normal: '6', shifted: 'त्र', altGr: '६' },
      finger: 'right-index',
    },
    {
      code: 'Digit7',
      english: { normal: '7', shifted: '&' },
      hindi: { normal: '7', shifted: 'क्ष', altGr: '७' },
      finger: 'right-index',
    },
    {
      code: 'Digit8',
      english: { normal: '8', shifted: '*' },
      hindi: { normal: '8', shifted: 'श्र', altGr: '८' },
      finger: 'right-middle',
    },
    {
      code: 'Digit9',
      english: { normal: '9', shifted: '(' },
      hindi: { normal: '9', shifted: '(', altGr: '९' },
      finger: 'right-ring',
    },
    {
      code: 'Digit0',
      english: { normal: '0', shifted: ')' },
      hindi: { normal: '0', shifted: ')', altGr: '०' },
      finger: 'right-pinky',
    },
    {
      code: 'Minus',
      english: { normal: '-', shifted: '_' },
      hindi: { normal: '-', shifted: 'ः', altGr: '_' },
      finger: 'right-pinky',
    },
    {
      code: 'Equal',
      english: { normal: '=', shifted: '+' },
      hindi: { normal: 'ृ', shifted: 'ऋ', altGr: '+' },
      finger: 'right-pinky',
    },
    {
      code: 'Backspace',
      displayLabel: 'Backspace',
      english: { normal: '', shifted: '' },
      hindi: { normal: '', shifted: '' },
      widthMultiplier: 2.0,
      finger: 'right-pinky',
    },
  ],

  // Row 2 - Top Letter Row (QWERTY)
  [
    {
      code: 'Tab',
      displayLabel: 'Tab',
      english: { normal: '\t', shifted: '\t' },
      hindi: { normal: '\t', shifted: '\t' },
      widthMultiplier: 1.5,
      finger: 'left-pinky',
    },
    {
      code: 'KeyQ',
      english: { normal: 'q', shifted: 'Q', capsLock: 'Q' },
      hindi: { normal: 'ौ', shifted: 'औ' },
      finger: 'left-pinky',
    },
    {
      code: 'KeyW',
      english: { normal: 'w', shifted: 'W', capsLock: 'W' },
      hindi: { normal: 'ै', shifted: 'ऐ' },
      finger: 'left-ring',
    },
    {
      code: 'KeyE',
      english: { normal: 'e', shifted: 'E', capsLock: 'E' },
      hindi: { normal: 'ा', shifted: 'आ' },
      finger: 'left-middle',
    },
    {
      code: 'KeyR',
      english: { normal: 'r', shifted: 'R', capsLock: 'R' },
      hindi: { normal: 'ी', shifted: 'ई' },
      finger: 'left-index',
    },
    {
      code: 'KeyT',
      english: { normal: 't', shifted: 'T', capsLock: 'T' },
      hindi: { normal: 'ू', shifted: 'ऊ' },
      finger: 'left-index',
    },
    {
      code: 'KeyY',
      english: { normal: 'y', shifted: 'Y', capsLock: 'Y' },
      hindi: { normal: 'ब', shifted: 'भ' },
      finger: 'right-index',
    },
    {
      code: 'KeyU',
      english: { normal: 'u', shifted: 'U', capsLock: 'U' },
      hindi: { normal: 'ह', shifted: 'ङ' },
      finger: 'right-index',
    },
    {
      code: 'KeyI',
      english: { normal: 'i', shifted: 'I', capsLock: 'I' },
      hindi: { normal: 'ग', shifted: 'घ' },
      finger: 'right-middle',
    },
    {
      code: 'KeyO',
      english: { normal: 'o', shifted: 'O', capsLock: 'O' },
      hindi: { normal: 'द', shifted: 'ध' },
      finger: 'right-ring',
    },
    {
      code: 'KeyP',
      english: { normal: 'p', shifted: 'P', capsLock: 'P' },
      hindi: { normal: 'ज', shifted: 'झ' },
      finger: 'right-pinky',
    },
    {
      code: 'BracketLeft',
      english: { normal: '[', shifted: '{' },
      hindi: { normal: 'ड', shifted: 'ढ' },
      finger: 'right-pinky',
    },
    {
      code: 'BracketRight',
      english: { normal: ']', shifted: '}' },
      hindi: { normal: '़', shifted: 'ञ' },
      finger: 'right-pinky',
    },
    {
      code: 'Backslash',
      english: { normal: '\\', shifted: '|' },
      hindi: { normal: 'ॉ', shifted: 'ऑ' },
      widthMultiplier: 1.5,
      finger: 'right-pinky',
    },
  ],

  // Row 3 - Home Row (ASDF)
  [
    {
      code: 'CapsLock',
      displayLabel: 'Caps Lock',
      english: { normal: '', shifted: '' },
      hindi: { normal: '', shifted: '' },
      widthMultiplier: 1.75,
      finger: 'left-pinky',
    },
    {
      code: 'KeyA',
      english: { normal: 'a', shifted: 'A', capsLock: 'A' },
      hindi: { normal: 'ो', shifted: 'ओ' },
      finger: 'left-pinky',
    },
    {
      code: 'KeyS',
      english: { normal: 's', shifted: 'S', capsLock: 'S' },
      hindi: { normal: 'े', shifted: 'ए' },
      finger: 'left-ring',
    },
    {
      code: 'KeyD',
      english: { normal: 'd', shifted: 'D', capsLock: 'D' },
      hindi: { normal: '्', shifted: 'अ' },
      finger: 'left-middle',
    },
    {
      code: 'KeyF',
      english: { normal: 'f', shifted: 'F', capsLock: 'F' },
      hindi: { normal: 'ि', shifted: 'इ' },
      finger: 'left-index',
    },
    {
      code: 'KeyG',
      english: { normal: 'g', shifted: 'G', capsLock: 'G' },
      hindi: { normal: 'ु', shifted: 'उ' },
      finger: 'left-index',
    },
    {
      code: 'KeyH',
      english: { normal: 'h', shifted: 'H', capsLock: 'H' },
      hindi: { normal: 'प', shifted: 'फ' },
      finger: 'right-index',
    },
    {
      code: 'KeyJ',
      english: { normal: 'j', shifted: 'J', capsLock: 'J' },
      hindi: { normal: 'र', shifted: 'ऱ' },
      finger: 'right-index',
    },
    {
      code: 'KeyK',
      english: { normal: 'k', shifted: 'K', capsLock: 'K' },
      hindi: { normal: 'क', shifted: 'ख' },
      finger: 'right-middle',
    },
    {
      code: 'KeyL',
      english: { normal: 'l', shifted: 'L', capsLock: 'L' },
      hindi: { normal: 'त', shifted: 'थ' },
      finger: 'right-ring',
    },
    {
      code: 'Semicolon',
      english: { normal: ';', shifted: ':' },
      hindi: { normal: 'च', shifted: 'छ' },
      finger: 'right-pinky',
    },
    {
      code: 'Quote',
      english: { normal: "'", shifted: '"' },
      hindi: { normal: 'ट', shifted: 'ठ' },
      finger: 'right-pinky',
    },
    {
      code: 'Enter',
      displayLabel: 'Enter',
      english: { normal: '\n', shifted: '\n' },
      hindi: { normal: '\n', shifted: '\n' },
      widthMultiplier: 2.25,
      finger: 'right-pinky',
    },
  ],

  // Row 4 - Bottom Row (ZXCV)
  [
    {
      code: 'ShiftLeft',
      displayLabel: 'Shift',
      english: { normal: '', shifted: '' },
      hindi: { normal: '', shifted: '' },
      widthMultiplier: 2.25,
      finger: 'left-pinky',
    },
    {
      code: 'KeyZ',
      english: { normal: 'z', shifted: 'Z', capsLock: 'Z' },
      hindi: { normal: 'ॆ', shifted: 'ऎ' },
      finger: 'left-pinky',
    },
    {
      code: 'KeyX',
      english: { normal: 'x', shifted: 'X', capsLock: 'X' },
      hindi: { normal: 'ं', shifted: 'ँ' },
      finger: 'left-ring',
    },
    {
      code: 'KeyC',
      english: { normal: 'c', shifted: 'C', capsLock: 'C' },
      hindi: { normal: 'म', shifted: 'ण' },
      finger: 'left-middle',
    },
    {
      code: 'KeyV',
      english: { normal: 'v', shifted: 'V', capsLock: 'V' },
      hindi: { normal: 'न', shifted: 'ऩ' },
      finger: 'left-index',
    },
    {
      code: 'KeyB',
      english: { normal: 'b', shifted: 'B', capsLock: 'B' },
      hindi: { normal: 'व', shifted: 'ऴ' },
      finger: 'left-index',
    },
    {
      code: 'KeyN',
      english: { normal: 'n', shifted: 'N', capsLock: 'N' },
      hindi: { normal: 'ल', shifted: 'ळ' },
      finger: 'right-index',
    },
    {
      code: 'KeyM',
      english: { normal: 'm', shifted: 'M', capsLock: 'M' },
      hindi: { normal: 'स', shifted: 'श' },
      finger: 'right-index',
    },
    {
      code: 'Comma',
      english: { normal: ',', shifted: '<' },
      hindi: { normal: ',', shifted: 'ष', altGr: '॰' },
      finger: 'right-middle',
    },
    {
      code: 'Period',
      english: { normal: '.', shifted: '>' },
      hindi: { normal: '.', shifted: '।', altGr: '॥', altGrShift: 'ऽ' },
      finger: 'right-ring',
    },
    {
      code: 'Slash',
      english: { normal: '/', shifted: '?' },
      hindi: { normal: 'य', shifted: 'य़' },
      finger: 'right-pinky',
    },
    {
      code: 'ShiftRight',
      displayLabel: 'Shift',
      english: { normal: '', shifted: '' },
      hindi: { normal: '', shifted: '' },
      widthMultiplier: 2.75,
      finger: 'right-pinky',
    },
  ],

  // Row 5 - Modifier & Spacebar Row
  [
    {
      code: 'ControlLeft',
      displayLabel: 'Ctrl',
      english: { normal: '', shifted: '' },
      hindi: { normal: '', shifted: '' },
      widthMultiplier: 1.5,
      finger: 'left-pinky',
    },
    {
      code: 'AltLeft',
      displayLabel: 'Alt',
      english: { normal: '', shifted: '' },
      hindi: { normal: '', shifted: '' },
      widthMultiplier: 1.25,
      finger: 'thumb',
    },
    {
      code: 'Space',
      displayLabel: 'Space',
      english: { normal: ' ', shifted: ' ' },
      hindi: { normal: ' ', shifted: ' ' },
      widthMultiplier: 6.25,
      finger: 'thumb',
    },
    {
      code: 'AltRight',
      displayLabel: 'AltGr',
      english: { normal: '', shifted: '' },
      hindi: { normal: '', shifted: '' },
      widthMultiplier: 1.25,
      finger: 'thumb',
    },
    {
      code: 'ControlRight',
      displayLabel: 'Ctrl',
      english: { normal: '', shifted: '' },
      hindi: { normal: '', shifted: '' },
      widthMultiplier: 1.5,
      finger: 'right-pinky',
    },
  ],
];
