import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Github,
  FileText,
  Check,
  Search
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRepoIntel } from '../context/RepoIntelContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { health } = useRepoIntel();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 px-6 sm:px-8 border-b flex items-center justify-between z-20 transition-colors duration-200 bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      {/* Left side: Prev < / > Forward History Navigation & Search Shortcut */}
      <div className="flex items-center gap-3">
        {/* Prev < / > Forward Navigation Group */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => navigate(-1)}
            title="Previous Page (Back)"
            aria-label="Previous Page"
            className="p-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-3.5 bg-slate-200 dark:bg-slate-700" />
          <button
            type="button"
            onClick={() => navigate(1)}
            title="Forward Page (Next)"
            aria-label="Forward Page"
            className="p-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Search Shortcut */}
        <button
          onClick={() => navigate('/search')}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-blue-500" />
          <span className="hidden sm:inline">Semantic Code Search</span>
          <span className="sm:hidden">Search</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-500 dark:text-slate-300">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Swagger API Docs Link */}
        <button
          onClick={() => navigate('/docs')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-900/40 rounded-lg border border-blue-200/60 dark:border-blue-900/60 transition-colors cursor-pointer"
        >
          <span className="font-mono font-semibold">Swagger UI</span>
        </button>

        {/* Theme Toggle (Dark/Bright theme button with active badge) */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle bright/dark theme"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          title={`Click to switch to ${theme === 'dark' ? 'Bright Theme' : 'Dark Theme'}`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400 transition-transform hover:rotate-45" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600 transition-transform hover:-rotate-12" />
              <span className="hidden sm:inline">Bright</span>
            </>
          )}
        </button>

        {/* User Profile dropdown matching David Shah in the screenshot */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#1b2a4a] text-blue-300 flex items-center justify-center font-semibold text-sm ring-1 ring-blue-400/30">
              D
            </div>
            <span className="hidden sm:inline-block text-sm font-medium text-slate-700 dark:text-slate-200">
              David Shah
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 text-sm z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-slate-100">UserIsDead</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">shah@gmail.com</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { navigate('/repositories'); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  Your Repositories
                </button>
                <button
                  onClick={() => { navigate('/docs'); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  API Documentation
                </button>
                <a
                  href="https://github.com/dhananjay342/wander-lust"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Github className="w-4 h-4 text-slate-400" />
                  Backend Repository
                </a>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => { toggleTheme(); setDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
                    Active Theme: {theme === 'dark' ? 'Dark' : 'Bright'}
                  </span>
                  <Check className="w-3.5 h-3.5 text-blue-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

