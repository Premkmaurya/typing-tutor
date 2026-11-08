import React from 'react';
import { KeyMapping, KeyState, Language, ModifierState } from '../../types/keyboard.types';

interface KeycapProps {
  mapping: KeyMapping;
  rowIndex?: number;
  language: Language;
  modifiers: ModifierState;
  state: KeyState;
  onClick: (code: string) => void;
  fingerGuideEnabled?: boolean;
}

export const Keycap: React.FC<KeycapProps> = ({
  mapping,
  rowIndex = 1,
  language,
  modifiers,
  state,
  onClick,
  fingerGuideEnabled = false,
}) => {
  const { code, displayLabel, english, hindi, widthMultiplier = 1, finger } = mapping;

  // Determine what characters to show based on active modifier layers
  const isShift = modifiers.shift;
  const isAltGr = modifiers.altGr;

  // Primary and secondary glyphs
  let primaryChar = '';
  let secondaryChar = '';
  let shiftedSubChar = '';

  if (language === 'hi') {
    // In Hindi InScript Mode
    if (isAltGr && isShift && hindi.altGrShift) {
      primaryChar = hindi.altGrShift;
    } else if (isAltGr && hindi.altGr) {
      primaryChar = hindi.altGr;
    } else if (isShift) {
      primaryChar = hindi.shifted || hindi.normal;
    } else {
      primaryChar = hindi.normal;
    }

    // Show unshifted/shifted pair if meaningful
    shiftedSubChar = hindi.shifted !== hindi.normal ? hindi.shifted : '';
    // Show physical English key as reference label
    secondaryChar = english.normal.toUpperCase();
  } else {
    // In English QWERTY Mode
    if (isShift) {
      primaryChar = english.shifted;
      secondaryChar = english.normal;
    } else {
      primaryChar = english.normal;
      secondaryChar = english.shifted !== english.normal ? english.shifted : '';
    }
    shiftedSubChar = hindi.normal;
  }

  // Override for special display labels like Backspace, Enter, Tab, CapsLock, Space
  const isSpecialKey = Boolean(displayLabel);

  // Responsive height based on row type
  let heightClass = 'h-[35px] sm:h-[37px]'; // standard rows 1, 2, 3
  if (rowIndex === 0) {
    heightClass = 'h-[33px] sm:h-[35px]'; // number row
  } else if (rowIndex === 4) {
    heightClass = 'h-[36px] sm:h-[38px]'; // spacebar row
  }

  // Width flex calculation
  const flexStyle = {
    flex: `${widthMultiplier} ${widthMultiplier} 0%`,
    minWidth: `${Math.round(widthMultiplier * 28)}px`,
  };

  // Finger guide color accents
  const fingerBorderColors: Record<string, string> = {
    'left-pinky': 'border-b-pink-400 dark:border-b-pink-500',
    'left-ring': 'border-b-purple-400 dark:border-b-purple-500',
    'left-middle': 'border-b-blue-400 dark:border-b-blue-500',
    'left-index': 'border-b-teal-400 dark:border-b-teal-500',
    'thumb': 'border-b-emerald-400 dark:border-b-emerald-500',
    'right-index': 'border-b-amber-400 dark:border-b-amber-500',
    'right-middle': 'border-b-orange-400 dark:border-b-orange-500',
    'right-ring': 'border-b-rose-400 dark:border-b-rose-500',
    'right-pinky': 'border-b-red-400 dark:border-b-red-500',
  };

  const fingerBorder = fingerGuideEnabled && finger ? fingerBorderColors[finger] : '';

  // State styling
  let stateClasses =
    'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-2xs';

  if (state === 'next') {
    stateClasses =
      'bg-blue-500 text-white border-blue-600 shadow-sm ring-2 ring-blue-400/50 z-10 font-bold';
  } else if (state === 'correct') {
    stateClasses =
      'bg-emerald-500 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-400/40 z-10';
  } else if (state === 'incorrect') {
    stateClasses =
      'bg-red-500 text-white border-red-600 shadow-sm ring-2 ring-red-400/50 z-10 animate-bounce';
  } else if (state === 'pressed') {
    stateClasses =
      'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-400 translate-y-0.5 shadow-none';
  } else if (state === 'modifier-active') {
    stateClasses =
      'bg-indigo-600 text-white border-indigo-700 shadow-sm ring-1 ring-indigo-400/40';
  }

  return (
    <button
      type="button"
      onClick={() => onClick(code)}
      style={flexStyle}
      className={`relative ${heightClass} m-[1px] sm:m-[1.5px] rounded border flex flex-col justify-between px-1 py-0.5 select-none transition-all duration-75 cursor-pointer text-left focus:outline-none ${fingerBorder ? `border-b-[2px] ${fingerBorder}` : ''} ${stateClasses}`}
      aria-label={`${displayLabel || code}: ${primaryChar || code}`}
      title={`${code} (${language === 'hi' ? `Hindi: ${primaryChar}` : `English: ${primaryChar}`})`}
    >
      {isSpecialKey ? (
        <div className="w-full h-full flex items-center justify-center font-medium text-[9.5px] sm:text-[10.5px] text-center leading-tight">
          {displayLabel}
        </div>
      ) : (
        <>
          {/* Top Row: secondary character & shifted preview */}
          <div className="flex items-center justify-between w-full text-[8px] sm:text-[9px] leading-none opacity-60 font-mono">
            <span>{secondaryChar}</span>
            {language === 'en' && hindi.normal && (
              <span className="font-hindi text-[8.5px] sm:text-[9.5px] font-normal opacity-75">
                {hindi.normal}
              </span>
            )}
            {language === 'hi' && shiftedSubChar && !isShift && (
              <span className="font-hindi text-[8.5px] sm:text-[9.5px] font-normal opacity-75">
                {shiftedSubChar}
              </span>
            )}
          </div>

          {/* Main Primary Character */}
          <div className="w-full flex items-center justify-center grow">
            <span
              className={`leading-none ${
                language === 'hi'
                  ? 'font-hindi text-[13px] sm:text-[14px] font-semibold'
                  : 'font-sans text-xs sm:text-[13px] font-bold'
              }`}
            >
              {primaryChar}
            </span>
          </div>
        </>
      )}
    </button>
  );
};
