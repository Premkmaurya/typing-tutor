import React from 'react';
import { Language, ModifierState } from '../../types/keyboard.types';
import { ENGLISH_KEYBOARD_ROWS } from '../../core/keyboard/layouts/english';
import { KeyboardRow } from './KeyboardRow';
import { useSettingsStore } from '../../store/settingsStore';

interface KeyboardProps {
  language: Language;
  modifiers: ModifierState;
  nextExpectedCode: string | null;
  nextExpectedModifiers: string[];
  lastPressedCode: string | null;
  lastPressStatus: 'correct' | 'incorrect' | null;
  onKeyClick: (code: string) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  language,
  modifiers,
  nextExpectedCode,
  nextExpectedModifiers,
  lastPressedCode,
  lastPressStatus,
  onKeyClick,
}) => {
  const { highlightHands } = useSettingsStore();

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-lg p-1.5 sm:p-2 shadow-xs backdrop-blur-sm">
      {/* Keyboard Header Controls & Layout Indicator */}
      <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-200 dark:border-slate-800 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {language === 'hi' ? 'Devanagari InScript' : 'English US QWERTY'}
          </span>
          <span className="hidden sm:inline-block px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-[9px]">
            {language === 'hi' ? 'BIS IS 13194 / CLDR' : 'ANSI Standard'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {modifiers.shift && (
            <span className="px-1 py-0.2 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-mono font-medium text-[9px]">
              SHIFT
            </span>
          )}
          {modifiers.altGr && (
            <span className="px-1 py-0.2 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300 font-mono font-medium text-[9px]">
              ALTGR
            </span>
          )}
          {modifiers.capsLock && (
            <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 font-mono font-medium text-[9px]">
              CAPS
            </span>
          )}
        </div>
      </div>

      {/* Responsive Fluid Keyboard Container */}
      <div className="w-full overflow-hidden pb-0.5">
        <div className="w-full flex flex-col gap-[2px] sm:gap-1">
          {ENGLISH_KEYBOARD_ROWS.map((row, idx) => (
            <KeyboardRow
              key={idx}
              row={row}
              rowIndex={idx}
              language={language}
              modifiers={modifiers}
              nextExpectedCode={nextExpectedCode}
              nextExpectedModifiers={nextExpectedModifiers}
              lastPressedCode={lastPressedCode}
              lastPressStatus={lastPressStatus}
              onKeyClick={onKeyClick}
              fingerGuideEnabled={highlightHands}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
