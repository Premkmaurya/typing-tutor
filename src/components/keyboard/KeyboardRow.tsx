import React from 'react';
import { KeyMapping, KeyState, Language, ModifierState } from '../../types/keyboard.types';
import { Keycap } from './Keycap';

interface KeyboardRowProps {
  row: KeyMapping[];
  rowIndex?: number;
  language: Language;
  modifiers: ModifierState;
  nextExpectedCode: string | null;
  nextExpectedModifiers: string[];
  lastPressedCode: string | null;
  lastPressStatus: 'correct' | 'incorrect' | null;
  onKeyClick: (code: string) => void;
  fingerGuideEnabled?: boolean;
}

export const KeyboardRow: React.FC<KeyboardRowProps> = ({
  row,
  rowIndex = 1,
  language,
  modifiers,
  nextExpectedCode,
  nextExpectedModifiers,
  lastPressedCode,
  lastPressStatus,
  onKeyClick,
  fingerGuideEnabled,
}) => {
  return (
    <div className="flex w-full justify-center">
      {row.map((mapping) => {
        const { code } = mapping;
        let state: KeyState = 'default';

        // Check if this is the next key or required modifier
        const isNextKey = code === nextExpectedCode;
        const isRequiredShift =
          nextExpectedModifiers.includes('Shift') &&
          (code === 'ShiftLeft' || code === 'ShiftRight');
        const isRequiredAltGr =
          nextExpectedModifiers.includes('AltGr') && code === 'AltRight';

        if (isNextKey || isRequiredShift || isRequiredAltGr) {
          state = 'next';
        }

        // Active pressed state
        if (code === lastPressedCode) {
          if (lastPressStatus === 'correct') {
            state = 'correct';
          } else if (lastPressStatus === 'incorrect') {
            state = 'incorrect';
          } else {
            state = 'pressed';
          }
        }

        // Active modifier highlights
        if (
          (modifiers.shift && (code === 'ShiftLeft' || code === 'ShiftRight')) ||
          (modifiers.altGr && code === 'AltRight') ||
          (modifiers.capsLock && code === 'CapsLock')
        ) {
          if (state !== 'correct' && state !== 'incorrect') {
            state = 'modifier-active';
          }
        }

        return (
          <Keycap
            key={code}
            mapping={mapping}
            rowIndex={rowIndex}
            language={language}
            modifiers={modifiers}
            state={state}
            onClick={onKeyClick}
            fingerGuideEnabled={fingerGuideEnabled}
          />
        );
      })}
    </div>
  );
};
