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
  Search,
  LogIn,
  UserPlus,
  LogOut,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRepoIntel } from '../context/RepoIntelContext';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { health, addNotification } = useRepoIntel();
  const { user, isAuthenticated, signOut, openAuthModal } = useAuth();
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

  const handleSignOut = () => {
    signOut();
    setDropdownOpen(false);
    addNotification('You have been signed out.', 'info');
  };

  const getProviderLabel = (provider?: string) => {
    switch (provider) {
      case 'google':
        return 'Google Account';
      case 'github':
        return 'GitHub SSO';
      case 'gitlab':
        return 'GitLab SSO';
      default:
        return 'Email Verified';
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 1).toUpperCase();
  };

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

        {/* Right Top Corner: Sign In / Sign Up OR User Profile */}
        {isAuthenticated && user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#1b2a4a] text-blue-300 flex items-center justify-center font-semibold text-sm ring-1 ring-blue-400/30">
                {getInitials(user.name)}
              </div>
              <span className="hidden sm:inline-block text-sm font-medium text-slate-700 dark:text-slate-200">
                {user.name}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 text-sm z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
                      {getProviderLabel(user.provider)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                  {user.role && (
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{user.role}</p>
                  )}
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { navigate('/repositories'); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    Your Repositories
                  </button>
                  <button
                    onClick={() => { navigate('/docs'); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-slate-400" />
                    API Documentation
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      openAuthModal('signin');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-400" />
                    Switch / Sign in with another account
                  </button>
                  <a
                    href="https://github.com/AyushhVatsal/RepoIntel-AI"
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
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
                      Active Theme: {theme === 'dark' ? 'Dark' : 'Bright'}
                    </span>
                    <Check className="w-3.5 h-3.5 text-blue-500" />
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-1 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Sign In & Sign Up buttons at top-right corner when signed out */
          <div className="flex items-center gap-2">
            <button
              onClick={() => openAuthModal('signin')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/25 transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};


