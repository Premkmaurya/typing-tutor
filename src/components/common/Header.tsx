import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Keyboard,
  BarChart3,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { Button } from './Button';

export const Header: React.FC = () => {
  const location = useLocation();
  const {
    theme,
    language,
    soundEnabled,
    setTheme,
    setLanguage,
    toggleSound,
  } = useSettingsStore();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: <BarChart3 size={16} /> },
    { to: '/setup', label: 'Practice Setup', icon: <Play size={16} /> },
    { to: '/progress', label: 'Analytics', icon: <RotateCcw size={16} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-[50px] sm:h-[54px] flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xs shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Keyboard size={16} />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight flex items-center gap-1">
                <span className="text-blue-600 dark:text-blue-400 font-extrabold">अक्षर</span>
                <span>Typing</span>
              </span>
              <span className="text-[9px] font-normal text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                Hindi InScript & English
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Controls & Preferences */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                language === 'hi'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Switch to Hindi InScript"
            >
              हिन्दी (InScript)
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Switch to English QWERTY"
            >
              English
            </button>
          </div>

          {/* Sound Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            title={soundEnabled ? 'Sound enabled' : 'Sound muted'}
            className="p-2 h-9 w-9 text-slate-600 dark:text-slate-300"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </Button>

          {/* Dark / Light Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="p-2 h-9 w-9 text-slate-600 dark:text-slate-300"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </Button>

          {/* Quick Practice button */}
          <Link to="/setup" className="hidden sm:inline-block">
            <Button size="sm" variant="primary">
              Start Practice
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
