import { create } from 'zustand';
import { StorageService, UserSettings } from '../services/storage.service';
import { Language } from '../types/keyboard.types';

interface SettingsState extends UserSettings {
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: Language) => void;
  toggleSound: () => void;
  toggleVirtualKeyboard: () => void;
  toggleHighlightHands: () => void;
}

const initialSettings = StorageService.getSettings();

export const useSettingsStore = create<SettingsState>((set) => ({
  ...initialSettings,

  setTheme: (theme) => {
    StorageService.saveSettings({ theme });
    set({ theme });
    applyThemeClass(theme);
  },

  setLanguage: (language) => {
    StorageService.saveSettings({ language });
    set({ language });
  },

  toggleSound: () => {
    set((state) => {
      const soundEnabled = !state.soundEnabled;
      StorageService.saveSettings({ soundEnabled });
      return { soundEnabled };
    });
  },

  toggleVirtualKeyboard: () => {
    set((state) => {
      const virtualKeyboardVisible = !state.virtualKeyboardVisible;
      StorageService.saveSettings({ virtualKeyboardVisible });
      return { virtualKeyboardVisible };
    });
  },

  toggleHighlightHands: () => {
    set((state) => {
      const highlightHands = !state.highlightHands;
      StorageService.saveSettings({ highlightHands });
      return { highlightHands };
    });
  },
}));

function applyThemeClass(theme: 'light' | 'dark' | 'system') {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Initial theme apply
applyThemeClass(initialSettings.theme);
