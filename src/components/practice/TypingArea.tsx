import React, { useRef, useEffect } from 'react';
import { TypingLesson } from '../../types/lesson.types';
import { WordResult } from '../../types/typing.types';
import { extractWordsFromText, initializeWordResults } from '../../core/typing/wordValidator';
import { splitIntoGraphemes } from '../../core/typing/graphemes';
import { textToLessonSteps } from '../../core/typing/composer';

interface TypingAreaProps {
  lesson: TypingLesson;
  words?: string[];
  currentWordIndex: number;
  currentWordBuffer?: string;
  wordResults?: WordResult[];
  status: 'idle' | 'running' | 'paused' | 'completed';
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  lesson,
  words: propWords,
  currentWordIndex,
  currentWordBuffer = '',
  wordResults: propWordResults,
  status,
  onKeyDown,
  onKeyUp,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-focus container when practice starts
  useEffect(() => {
    if (status === 'running' && containerRef.current) {
      containerRef.current.focus();
    }
  }, [status]);

  const { language, targetText } = lesson;
  const isHindi = language === 'hi';

  const words = propWords ?? extractWordsFromText(targetText || '');
  const wordResults: WordResult[] =
    propWordResults ??
    (words.length > 0 ? initializeWordResults(words, language) : []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onClick={() => containerRef.current?.focus()}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      className="relative w-full min-h-[85px] sm:min-h-[92px] p-2.5 sm:p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-text transition-all select-none"
      aria-label="Typing practice input area. Press any key to type."
    >
      {/* Paused Overlay */}
      {status === 'paused' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs rounded-lg">
          <p className="text-base font-bold text-slate-800 dark:text-slate-100">Practice Paused</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Click Resume or press any key to continue</p>
        </div>
      )}

      {/* Target Passage rendered at WORD level */}
      <div
        data-testid="typing-passage"
        className={`leading-relaxed tracking-wide flex flex-wrap gap-x-2 gap-y-1.5 items-baseline select-none ${
          isHindi
            ? 'font-hindi text-lg sm:text-xl'
            : 'font-mono text-base sm:text-lg'
        }`}
      >
        {wordResults.map((wordResult, idx) => {
          const isCurrent = idx === currentWordIndex;

          // Distinct visual states:
          // 1. Correct word: GREEN (#22c55e)
          // 2. Incorrect word: RED (#ef4444)
          // 3. Active word: BLUE (#60a5fa)
          // 4. Pending word: GRAY (#64748b)
          let wordClasses =
            'text-slate-400 dark:text-slate-600 border-b-2 border-transparent px-1.5 py-0.5 rounded';

          if (wordResult.status === 'correct') {
            wordClasses =
              'text-emerald-600 dark:text-emerald-400 font-semibold border-b-2 border-transparent px-1.5 py-0.5 rounded';
          } else if (wordResult.status === 'incorrect') {
            wordClasses =
              'text-red-500 dark:text-red-400 font-bold bg-red-100 dark:bg-red-950/70 border-b-2 border-red-500 rounded px-1.5 py-0.5';
          } else if (wordResult.status === 'active') {
            wordClasses =
              'text-blue-700 dark:text-blue-300 font-bold bg-blue-100 dark:bg-blue-950/80 border-b-2 border-blue-600 rounded px-1.5 py-0.5 shadow-2xs';
          }

          const graphemes = splitIntoGraphemes(wordResult.expected, language);
          let characterOffset = 0;
          const renderedCharacters = graphemes.map((grapheme, characterIndex) => {
            const stepCount = textToLessonSteps(grapheme, language).length;
            const results = wordResult.characters.slice(characterOffset, characterOffset + stepCount);
            characterOffset += stepCount;
            const hasIncorrect = results.some((character) => character.status === 'incorrect');
            const hasCorrect = results.some((character) => character.status === 'correct');
            const hasActive = results.some((character) => character.status === 'active');
            const hasCursor = hasActive && wordResult.status === 'active';
            const characterStatus =
              wordResult.status === 'correct' || wordResult.status === 'incorrect'
                ? wordResult.status
                : hasIncorrect
                  ? 'incorrect'
                  : hasCorrect
                    ? 'correct'
                    : hasActive || (isCurrent && currentWordBuffer.length === 0 && characterIndex === 0)
                      ? 'active'
                      : 'pending';
            const text = results.length > 0
              ? results.map((character) => character.actual || character.expected).join('')
              : grapheme;
            const characterClasses = {
              correct: 'text-emerald-600 dark:text-emerald-400',
              incorrect: 'text-red-500 dark:text-red-400',
              active: 'text-blue-700 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-400',
              pending: 'text-slate-400 dark:text-slate-600',
            }[characterStatus];

            return (
              <span
                key={characterIndex}
                data-testid={`character-${idx}-${characterIndex}`}
                data-status={characterStatus}
                data-cursor={hasCursor}
                className={`${characterClasses} ${
                  hasCursor ? 'border-b-2 border-blue-600 dark:border-blue-400' : ''
                }`}
              >
                {text}
              </span>
            );
          });
          const extraCharacters = wordResult.characters.slice(characterOffset);
          const renderedExtraCharacters = extraCharacters.map((character, extraIndex) => (
            <span
              key={`extra-${extraIndex}`}
              data-testid={`character-${idx}-extra-${extraIndex}`}
              data-status={character.status}
              className={
                character.status === 'incorrect'
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }
            >
              {character.actual}
            </span>
          ));

          return (
            <span
              key={idx}
              data-testid={`word-${idx}`}
              data-status={wordResult.status}
              data-expected={wordResult.expected}
              data-actual={wordResult.actual}
              className={`relative inline-block transition-all duration-150 ${wordClasses}`}
            >
              {/* Blinking cursor indicator on active word */}
              {isCurrent && currentWordBuffer.length === 0 && (
                <span
                  data-testid="word-cursor"
                  className="absolute -top-0.5 left-0 w-0.5 h-5 sm:h-6 bg-blue-600 dark:bg-blue-400 animate-cursor-pulse pointer-events-none"
                />
              )}
              {renderedCharacters}
              {renderedExtraCharacters}
            </span>
          );
        })}
      </div>

      {/* Helper prompt below */}
      <div className="mt-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[10.5px] text-slate-400 dark:text-slate-500">
        <span>Press Space to validate word and continue</span>
        <span>
          Word {Math.min(currentWordIndex + 1, wordResults.length)} of {wordResults.length}
        </span>
      </div>
    </div>
  );
};
