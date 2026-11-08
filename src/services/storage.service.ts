import { SessionResult, UserStats } from '../types/stats.types';
import { Language } from '../types/keyboard.types';

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: Language;
  soundEnabled: boolean;
  virtualKeyboardVisible: boolean;
  highlightHands: boolean;
}

const SETTINGS_KEY = 'typing_tutor_settings_v1';
const STATS_KEY = 'typing_tutor_stats_v1';
const HISTORY_KEY = 'typing_tutor_history_v1';

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  language: 'hi',
  soundEnabled: true,
  virtualKeyboardVisible: true,
  highlightHands: true,
};

function createInitialProgress() {
  return {
    totalSessions: 0,
    totalPracticeTimeSeconds: 0,
    bestWpm: 0,
    bestCpm: 0,
    averageAccuracy: 0,
    averageWpm: 0,
    averageCpm: 0,
    weakKeys: {},
  };
}

function createDefaultStats(): UserStats {
  return {
    english: createInitialProgress(),
    hindi: createInitialProgress(),
    recentSessions: [],
    dailyStreak: 0,
    lastPracticeDate: '',
    dailyPracticeTime: {},
  };
}

export class StorageService {
  /**
   * Load user settings with fallback
   */
  static getSettings(): UserSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (!data) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch (err) {
      console.warn('Failed to read settings from LocalStorage, using defaults:', err);
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Save user settings
   */
  static saveSettings(settings: Partial<UserSettings>): void {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  }

  /**
   * Load cumulative user statistics
   */
  static getStats(): UserStats {
    const defaults = createDefaultStats();
    try {
      const data = localStorage.getItem(STATS_KEY);
      if (!data) return defaults;
      const parsed = JSON.parse(data);
      return {
        ...defaults,
        ...parsed,
        english: { ...defaults.english, ...(parsed.english || {}) },
        hindi: { ...defaults.hindi, ...(parsed.hindi || {}) },
      };
    } catch (err) {
      console.warn('Failed to read stats, resetting:', err);
      return defaults;
    }
  }

  /**
   * Load full practice session history
   */
  static getHistory(): SessionResult[] {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (err) {
      console.warn('Failed to read session history:', err);
      return [];
    }
  }

  /**
   * Record a completed session and update aggregate progress, weak keys, and streaks
   */
  static saveSession(result: SessionResult): UserStats {
    try {
      // 1. Append to History
      const history = this.getHistory();
      history.unshift(result);
      // Keep up to 100 recent detailed records
      const trimmedHistory = history.slice(0, 100);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));

      // 2. Update Stats
      const stats = this.getStats();
      const targetLang = result.language === 'en' ? stats.english : stats.hindi;

      // Update counters
      const prevSessions = targetLang.totalSessions;
      const newSessions = prevSessions + 1;
      targetLang.totalSessions = newSessions;
      targetLang.totalPracticeTimeSeconds += result.durationSeconds;

      // Update best records
      if (result.wpm > targetLang.bestWpm) {
        targetLang.bestWpm = result.wpm;
      }
      if (result.cpm > targetLang.bestCpm) {
        targetLang.bestCpm = result.cpm;
      }

      // Update rolling averages
      targetLang.averageAccuracy = Math.round(
        (targetLang.averageAccuracy * prevSessions + result.accuracy) / newSessions
      );
      targetLang.averageWpm = Math.round(
        (targetLang.averageWpm * prevSessions + result.wpm) / newSessions
      );
      targetLang.averageCpm = Math.round(
        (targetLang.averageCpm * prevSessions + result.cpm) / newSessions
      );

      // Accumulate weak keys
      for (const item of result.weakKeys) {
        if (!targetLang.weakKeys[item.key]) {
          targetLang.weakKeys[item.key] = {
            display: item.display,
            missCount: 0,
            attempts: 0,
          };
        }
        targetLang.weakKeys[item.key].missCount += item.count;
        targetLang.weakKeys[item.key].attempts += item.count + 1;
      }

      // Update daily streak and daily practice time
      const today = new Date().toISOString().split('T')[0];
      stats.dailyPracticeTime[today] = (stats.dailyPracticeTime[today] || 0) + result.durationSeconds;

      if (!stats.lastPracticeDate) {
        stats.dailyStreak = 1;
      } else if (stats.lastPracticeDate !== today) {
        const lastDate = new Date(stats.lastPracticeDate);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          stats.dailyStreak += 1;
        } else if (diffDays > 1) {
          stats.dailyStreak = 1;
        }
      }
      stats.lastPracticeDate = today;
      stats.recentSessions = trimmedHistory.slice(0, 10);

      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
      return stats;
    } catch (err) {
      console.error('Failed to save session result:', err);
      return this.getStats();
    }
  }

  /**
   * Reset all stored typing data after user confirmation
   */
  static clearAllData(): void {
    try {
      localStorage.removeItem(STATS_KEY);
      localStorage.removeItem(HISTORY_KEY);
      localStorage.removeItem(SETTINGS_KEY);
    } catch (err) {
      console.error('Failed to clear storage:', err);
    }
  }
}
