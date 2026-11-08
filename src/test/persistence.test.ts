import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from '../services/storage.service';
import { SessionResult } from '../types/stats.types';

describe('Persistence and StorageService Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default settings when storage is empty', () => {
    const settings = StorageService.getSettings();
    expect(settings).toBeDefined();
    expect(settings.theme).toBe('dark');
    expect(settings.language).toBe('hi');
  });

  it('persists and retrieves updated user settings', () => {
    StorageService.saveSettings({ theme: 'light', language: 'en', soundEnabled: false });
    const settings = StorageService.getSettings();
    expect(settings.theme).toBe('light');
    expect(settings.language).toBe('en');
    expect(settings.soundEnabled).toBe(false);
  });

  it('saves and accumulates session results and updates streaks', () => {
    const sampleResult: SessionResult = {
      id: 'sess-1',
      lessonId: 'hi-beg-1',
      lessonTitle: 'Test Hindi Lesson',
      language: 'hi',
      difficulty: 'beginner',
      practiceType: 'keys',
      timestamp: Date.now(),
      durationSeconds: 60,
      wpm: 25,
      cpm: 125,
      accuracy: 96,
      firstAttemptAccuracy: 94,
      totalKeypresses: 130,
      correctKeypresses: 125,
      incorrectKeypresses: 5,
      backspaceCount: 2,
      correctedErrors: 2,
      weakKeys: [{ key: 'KeyK', display: 'क', count: 3 }],
    };

    const stats = StorageService.saveSession(sampleResult);
    expect(stats.hindi.totalSessions).toBe(1);
    expect(stats.hindi.bestCpm).toBe(125);
    expect(stats.hindi.bestWpm).toBe(25);
    expect(stats.hindi.weakKeys['KeyK'].missCount).toBe(3);
    expect(stats.dailyStreak).toBe(1);

    const history = StorageService.getHistory();
    expect(history.length).toBe(1);
    expect(history[0].id).toBe('sess-1');
  });

  it('handles corrupt LocalStorage data gracefully without throwing', () => {
    localStorage.setItem('typing_tutor_stats_v1', 'INVALID_CORRUPT_JSON{{{');
    const stats = StorageService.getStats();
    expect(stats).toBeDefined();
    expect(stats.english.totalSessions).toBe(0);
    expect(stats.hindi.totalSessions).toBe(0);
  });

  it('clears all data completely when requested', () => {
    StorageService.saveSettings({ language: 'en' });
    StorageService.clearAllData();
    const history = StorageService.getHistory();
    expect(history.length).toBe(0);
  });
});
