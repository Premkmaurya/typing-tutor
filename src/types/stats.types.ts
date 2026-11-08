import { Language } from './keyboard.types';
import { Difficulty, PracticeType } from './lesson.types';

export interface WeakKeyRecord {
  key: string;       // Character or physical code
  display: string;   // Visual character
  language: Language;
  missCount: number;
  totalAttempts: number;
}

export interface SessionResult {
  id: string;
  lessonId: string;
  lessonTitle: string;
  language: Language;
  difficulty: Difficulty;
  practiceType: PracticeType;
  timestamp: number; // Date.now()
  durationSeconds: number;
  
  wpm: number;
  cpm: number;
  accuracy: number;           // Final percentage
  firstAttemptAccuracy: number;

  totalKeypresses: number;
  correctKeypresses: number;
  incorrectKeypresses: number;
  backspaceCount: number;
  correctedErrors: number;

  totalWordsAttempted?: number;
  correctWords?: number;
  incorrectWords?: number;
  wordAccuracy?: number;
  
  weakKeys: { key: string; display: string; count: number }[];
  historyPoints?: { time: number; wpm: number; cpm: number; accuracy: number }[];
}

export interface LanguageProgress {
  totalSessions: number;
  totalPracticeTimeSeconds: number;
  bestWpm: number;
  bestCpm: number;
  averageAccuracy: number;
  averageWpm: number;
  averageCpm: number;
  weakKeys: Record<string, { display: string; missCount: number; attempts: number }>;
}

export interface UserStats {
  english: LanguageProgress;
  hindi: LanguageProgress;
  recentSessions: SessionResult[];
  dailyStreak: number;
  lastPracticeDate: string; // YYYY-MM-DD
  dailyPracticeTime: Record<string, number>; // date -> seconds
}
