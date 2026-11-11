import { Language } from './keyboard.types';
import { Difficulty, LessonCategory, PracticeType } from './lesson.types';

export interface WeakKeyRecord {
  key: string; // Character or physical code
  display: string; // Visual character
  language: Language;
  missCount: number;
  totalAttempts: number;
}

export interface PassageResult {
  passageIndex: number;
  text: string;
  durationSeconds: number;
  totalWords: number;
  correctWords: number;
  incorrectWords: number;
  wpm: number;
  cpm: number;
  accuracy: number;
}

export interface SessionResult {
  id: string;
  lessonId: string;
  lessonTitle: string;
  language: Language;
  difficulty: Difficulty;
  practiceType: PracticeType;
  category?: LessonCategory;
  timestamp: number; // Date.now()
  durationSeconds: number;
  selectedDurationMinutes?: number; // 0 (unlimited), 1, 3, 5, 10
  passagesCompleted?: number;
  passages?: PassageResult[];

  wpm: number;
  cpm: number;
  accuracy: number; // Final percentage
  characterAccuracy?: number;
  firstAttemptAccuracy: number;

  totalKeypresses: number;
  correctKeypresses: number;
  incorrectKeypresses: number;
  backspaceCount: number;
  correctedErrors: number;
  totalMistakes?: number;

  totalWordsAttempted?: number;
  correctWords?: number;
  incorrectWords?: number;
  wordAccuracy?: number;
  wordResults?: any[];

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
