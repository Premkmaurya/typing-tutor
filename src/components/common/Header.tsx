import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    { to: '/', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { to: '/setup', label: 'Practice Setup', icon: <Play size={18} /> },
    { to: '/progress', label: 'Analytics', icon: <RotateCcw size={18} /> },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Close mobile drawer on Esc key and prevent body scroll while open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer & Backdrop */}
      {mobileMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              className="relative z-50 w-[290px] max-w-[85vw] h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between p-5 overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Keyboard size={15} />
                    </div>
                    <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                      <span className="text-blue-600 dark:text-blue-400">अक्षर</span> Typing
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={closeMobileMenu}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    aria-label="Close navigation menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Navigation Links with accessible touch heights (>=44px) */}
                <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-semibold transition touch-manipulation ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 shadow-2xs'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {link.icon}
                          {link.label}
                        </span>
                        <ArrowRight size={15} className="opacity-50" />
                      </Link>
                    );
                  })}
                </nav>

                {/* Language Switch Section */}
                <div className="pt-2">
                  <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Active Layout
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('hi');
                        closeMobileMenu();
                      }}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg transition min-h-[40px] ${
                        language === 'hi'
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      हिन्दी InScript
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('en');
                        closeMobileMenu();
                      }}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg transition min-h-[40px] ${
                        language === 'en'
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      English US
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Actions and Standards Badge */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Link to="/setup" onClick={closeMobileMenu} className="block w-full">
                  <Button variant="primary" size="md" className="w-full justify-center min-h-[44px]">
                    Start Practice Session
                  </Button>
                </Link>
                <div className="text-[10px] text-center font-mono text-slate-400 dark:text-slate-500">
                  BIS IS 13194:1991 • Unicode CLDR 43
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};
