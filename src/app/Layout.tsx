import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/common/Header';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isPractice = location.pathname.startsWith('/practice');

  return (
    <div
      className={`min-h-screen ${
        isPractice ? 'min-h-[100dvh]' : ''
      } flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors`}
    >
      <Header />
      <main className="flex-1 flex flex-col justify-start">
        <Outlet />
      </main>
      {!isPractice && (
        <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              अक्षर Hindi InScript & English Typing Tutor • Verified BIS IS 13194:1991 & Unicode CLDR 43
            </p>
            <p>
              Pure Client-Side Web Application • No OS Keyboard Installation Required
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};
