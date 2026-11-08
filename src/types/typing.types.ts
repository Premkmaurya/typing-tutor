import { Language } from './keyboard.types';
import { Difficulty, PracticeType, TypingLesson } from './lesson.types';

export type SessionStatus = 'idle' | 'running' | 'paused' | 'completed';

export type WordStatus = 'pending' | 'active' | 'correct' | 'incorrect';

export interface WordResult {
  expected: string;
  actual: string;
  status: WordStatus;
  errors: number;
}

export type CharacterStatus = 'correct' | 'incorrect' | 'pending' | 'active';

export interface CharacterResult {
  expected: string;
  actual?: string;
  status: CharacterStatus;
}

export interface TypedCharacter {
  char: string;
  expected: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface TypingInput {
  code: string;
  key: string;
  modifiers: {
    shift: boolean;
    ctrl: boolean;
    alt: boolean;
    meta: boolean;
    altGraph: boolean;
    capsLock: boolean;
  };
  source: 'physical' | 'virtual';
}

export interface TypingSessionConfig {
  language: Language;
  difficulty: Difficulty;
  practiceType: PracticeType;
  durationMinutes: number; // 0 = unlimited, 1, 3, 5, 10
  lesson?: TypingLesson;
}
