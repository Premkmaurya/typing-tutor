import React, { useState } from 'react';
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
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { Button } from './Button';

export const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isPractice = location.pathname.startsWith('/practice');

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: <BarChart3 size={16} /> },
    { to: '/setup', label: 'Practice Setup', icon: <Play size={16} /> },
    { to: '/progress', label: 'Analytics', icon: <RotateCcw size={16} /> },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-[52px] sm:h-[56px] flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white group shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 dark:bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Keyboard size={16} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="leading-tight flex items-center gap-1">
                <span className="text-blue-600 dark:text-blue-400 font-extrabold">अक्षर</span>
                <span className="font-semibold">Typing</span>
              </span>
              <span className="text-[9px] font-normal text-slate-500 dark:text-slate-400 tracking-wider uppercase hidden xs:inline truncate">
                Hindi InScript & English
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher Pill (Compact on small screens, full on desktop) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                language === 'hi'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Switch to Hindi InScript"
            >
              <span className="sm:hidden">हिन्दी</span>
              <span className="hidden sm:inline">हिन्दी (InScript)</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Switch to English QWERTY"
            >
              <span className="sm:hidden">EN</span>
              <span className="hidden sm:inline">English</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            title={soundEnabled ? 'Sound enabled' : 'Sound muted'}
            className="p-1.5 sm:p-2 h-8 w-8 sm:h-9 sm:w-9 text-slate-600 dark:text-slate-300"
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
            className="p-1.5 sm:p-2 h-8 w-8 sm:h-9 sm:w-9 text-slate-600 dark:text-slate-300"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </Button>

          {/* Quick Practice button (Desktop only, hidden when already on /practice) */}
          {!isPractice && (
            <Link to="/setup" className="hidden lg:inline-block">
              <Button size="sm" variant="primary">
                Start Practice
              </Button>
            </Link>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {link.icon}
                    {link.label}
                  </span>
                  <ArrowRight size={14} className="opacity-50" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link to="/setup" onClick={closeMobileMenu} className="block w-full">
              <Button variant="primary" size="md" className="w-full">
                Start Practice Session
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
