import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../store/sessionStore';
import { useSettingsStore } from '../store/settingsStore';
import { TypingArea } from '../components/practice/TypingArea';
import { SessionStats } from '../components/practice/SessionStats';
import { PracticeControls } from '../components/practice/PracticeControls';
import { Keyboard } from '../components/keyboard/Keyboard';
import { Badge } from '../components/common/Badge';
import { playKeySound } from '../utils/sound';
import { ALL_LESSONS } from '../data/lessons';
import { normalizePhysicalEvent, normalizeVirtualEvent } from '../core/typing/inputResolver';
import { getNextExpectedKeyForWord } from '../core/typing/wordValidator';

export const PracticePage: React.FC = () => {
  const navigate = useNavigate();

  const {
    status,
    lesson,
    language,
    durationMinutes,
    words,
    currentWordIndex,
    currentWordBuffer,
    wordResults,
    incorrectWords,
    activeModifiers,
    incorrectKeypresses,
    elapsedSeconds,
    remainingSeconds,
    lastPressedCode,
    lastPressStatus,
    liveWpm,
    liveCpm,
    liveAccuracy,
    startLesson,
    processInput,
    setModifiers,
    tickTimer,
    pauseSession,
    resumeSession,
    restartSession,
  } = useSessionStore();

  const { soundEnabled, virtualKeyboardVisible } = useSettingsStore();

  // If no lesson is currently loaded, initialize with default beginner lesson
  useEffect(() => {
    if (!lesson) {
      const defaultLesson =
        ALL_LESSONS.find((l) => l.language === language) || ALL_LESSONS[0];
      startLesson(defaultLesson, 0);
    }
  }, [lesson, language, startLesson]);

  // Navigate to results when completed (brief pause so user sees final word status)
  useEffect(() => {
    if (status === 'completed') {
      const timer = setTimeout(() => {
        navigate('/results');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  // Run timer tick every 1000ms while running
  useEffect(() => {
    if (status !== 'running') return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [status, tickTimer]);

  // Handle Physical Keyboard Events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent | React.KeyboardEvent) => {
      // If paused, allow pressing any non-modifier key to resume
      if (status === 'paused') {
        if (
          e.key !== 'Shift' &&
          e.key !== 'Control' &&
          e.key !== 'Alt' &&
          e.key !== 'Meta' &&
          e.key !== 'CapsLock'
        ) {
          useSessionStore.getState().resumeSession();
        }
        return;
      }

      if (status !== 'running' || !lesson) return;
      if ('repeat' in e && e.repeat) return;
      if ('isComposing' in e && e.isComposing) return;

      // Allow browser shortcuts (Cmd/Ctrl combos, Alt combos, DevTools, Refresh)
      if (
        e.metaKey ||
        (e.ctrlKey && !e.altKey) ||
        (e.altKey && !e.ctrlKey) ||
        e.key === 'F5' ||
        e.key === 'F12'
      ) {
        return;
      }

      const input = normalizePhysicalEvent(e);

      // Keep active modifiers synced
      setModifiers({
        shift: input.modifiers.shift,
        capsLock: input.modifiers.capsLock,
        altGr: input.modifiers.altGraph,
      });

      // Prevent default scrolling on Space only when not focused on a button
      const target = e.target as HTMLElement;
      if (input.code === 'Space' && target?.tagName !== 'BUTTON') {
        e.preventDefault();
      }

      const prevIncorrect = incorrectKeypresses;
      processInput(input);

      // Trigger audio feedback
      if (soundEnabled) {
        // If incorrect count increased, play mistake sound
        const isError = useSessionStore.getState().incorrectKeypresses > prevIncorrect;
        playKeySound(isError ? 'incorrect' : 'correct');
      }
    },
    [status, lesson, incorrectKeypresses, processInput, setModifiers, soundEnabled]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent | React.KeyboardEvent) => {
      const shift = e.shiftKey;
      const capsLock = e.getModifierState ? e.getModifierState('CapsLock') : false;
      const altGr = e.getModifierState ? e.getModifierState('AltGraph') : false;
      setModifiers({ shift, capsLock, altGr });
    },
    [setModifiers]
  );

  // Global single listener for keyboard events during active practice
  useEffect(() => {
    const onWindowKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or selecting another interactive button
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'BUTTON' ||
        target.isContentEditable ||
        target.getAttribute('role') === 'button'
      ) {
        return;
      }
      handleKeyDown(e);
    };

    const onWindowKeyUp = (e: KeyboardEvent) => {
      handleKeyUp(e);
    };

    window.addEventListener('keydown', onWindowKeyDown);
    window.addEventListener('keyup', onWindowKeyUp);
    return () => {
      window.removeEventListener('keydown', onWindowKeyDown);
      window.removeEventListener('keyup', onWindowKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Handle Virtual Keyboard Key Clicks
  const handleVirtualKeyClick = (code: string) => {
    if (status !== 'running' || !lesson) return;

    // Handle modifier toggles on virtual keyboard
    if (code === 'ShiftLeft' || code === 'ShiftRight') {
      setModifiers({ shift: !activeModifiers.shift });
      return;
    }
    if (code === 'AltRight') {
      setModifiers({ altGr: !activeModifiers.altGr });
      return;
    }
    if (code === 'CapsLock') {
      setModifiers({ capsLock: !activeModifiers.capsLock });
      return;
    }

    const input = normalizeVirtualEvent(code, activeModifiers);
    const prevIncorrect = incorrectKeypresses;
    processInput(input);

    if (soundEnabled) {
      const isError = useSessionStore.getState().incorrectKeypresses > prevIncorrect;
      playKeySound(isError ? 'incorrect' : 'correct');
    }

    // Auto-release shift and altGr after virtual keypress if not caps lock
    if (activeModifiers.shift || activeModifiers.altGr) {
      setModifiers({ shift: false, altGr: false });
    }
  };

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Loading lesson...</p>
      </div>
    );
  }

  const isLastWord = currentWordIndex === words.length - 1;
  const activeExpectedWord = words[currentWordIndex];
  const nextKeyInfo = getNextExpectedKeyForWord(
    activeExpectedWord,
    currentWordBuffer,
    language,
    isLastWord
  );
  const nextExpectedCode = nextKeyInfo.code;
  const nextExpectedModifiers = nextKeyInfo.modifiers;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-4 flex flex-col justify-between gap-3 sm:gap-4 flex-1">
      {/* Lesson Header & Metadata */}
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate">
            {lesson.title}
          </h1>
          <Badge variant={lesson.language === 'hi' ? 'purple' : 'blue'}>
            {lesson.language === 'hi' ? 'Hindi InScript' : 'English QWERTY'}
          </Badge>
          <Badge variant="amber">{lesson.difficulty}</Badge>
        </div>

        {/* Lesson Progress Percentage */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-20 sm:w-32 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-150"
              style={{
                width: `${Math.round(
                  (currentWordIndex / Math.max(1, words.length)) * 100
                )}%`,
              }}
            />
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300">
            {Math.round(
              (currentWordIndex / Math.max(1, words.length)) * 100
            )}
            %
          </span>
        </div>
      </div>

      {/* Live Statistics Cards */}
      <SessionStats
        language={language}
        wpm={liveWpm}
        cpm={liveCpm}
        accuracy={liveAccuracy}
        mistakes={incorrectWords}
        elapsedSeconds={elapsedSeconds}
        remainingSeconds={remainingSeconds}
        isTimed={durationMinutes > 0}
      />

      {/* Main Target Passage & Typing Area */}
      <TypingArea
        lesson={lesson}
        words={words}
        currentWordIndex={currentWordIndex}
        currentWordBuffer={currentWordBuffer}
        wordResults={wordResults}
        status={status}
      />

      {/* Controls: Restart, Pause, Change Lesson, Keyboard Toggle */}
      <PracticeControls
        status={status}
        onPause={pauseSession}
        onResume={resumeSession}
        onRestart={restartSession}
        onChangeLesson={() => navigate('/setup')}
      />

      {/* Interactive Virtual Keyboard */}
      {virtualKeyboardVisible && (
        <Keyboard
          language={language}
          modifiers={activeModifiers}
          nextExpectedCode={nextExpectedCode}
          nextExpectedModifiers={nextExpectedModifiers}
          lastPressedCode={lastPressedCode}
          lastPressStatus={lastPressStatus}
          onKeyClick={handleVirtualKeyClick}
        />
      )}
    </div>
  );
};
