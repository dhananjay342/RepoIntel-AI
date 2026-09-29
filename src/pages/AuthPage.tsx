import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User as UserIcon,
  Github,
  Loader2,
  Sparkles,
  ArrowRight,
  Database,
  Code2,
  Zap,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRepoIntel } from '../context/RepoIntelContext';

// Google SVG Icon
const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25A11.968 11.968 0 0 0 0 12c0 1.92.45 3.74 1.25 5.42l4.03-3.15Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
    />
  </svg>
);

// GitLab SVG Icon
const GitLabIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#E24329">
    <path d="M23.6 9.63 22.25 5.4a.8.8 0 0 0-1.52 0l-1.35 4.23H4.62L3.27 5.4a.8.8 0 0 0-1.52 0L.4 9.63a1.6 1.6 0 0 0 .58 1.78l10.42 7.57a1 1 0 0 0 1.2 0l10.42-7.57a1.6 1.6 0 0 0 .58-1.78Z" />
  </svg>
);

interface AuthPageProps {
  initialMode: 'signin' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode }) => {
  const navigate = useNavigate();
  const { signInWithProvider, signInWithEmail, signUp, isLoading } = useAuth();
  const { addNotification } = useRepoIntel();

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleProviderLogin = async (provider: 'google' | 'github' | 'gitlab') => {
    setActiveProvider(provider);
    try {
      const u = await signInWithProvider(provider);
      addNotification(`Signed in with ${provider.toUpperCase()} as ${u.name}!`, 'success');
      navigate('/');
    } catch {
      addNotification('Sign-in failed. Please try again.', 'error');
    } finally {
      setActiveProvider(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (password.length < 8) {
      addNotification('Password must be at least 8 characters long.', 'warning');
      return;
    }

    try {
      if (mode === 'signup') {
        const u = await signUp(name || 'Developer User', email, password);
        addNotification(`Welcome aboard, ${u.name}! Account registered.`, 'success');
      } else {
        const u = await signInWithEmail(email, password);
        addNotification(`Welcome back, ${u.name}!`, 'success');
      }
      navigate('/');
    } catch {
      addNotification('Authentication failed', 'error');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-[#070d1e] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Left Column: Visual branding and value prop (visible on lg screens) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-[#0a1128] text-white border-r border-slate-800 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <span className="font-mono font-bold text-lg">&lt;/&gt;</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                RepoIntel-AI
              </span>
              <span className="text-xs text-slate-400">
                Find the right code. Faster.
              </span>
            </div>
          </Link>
        </div>

        {/* Feature showcase */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-900/60 text-blue-300 border border-blue-700/50 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              AST Parsing & Vector Embeddings
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Instant codebase intelligence for engineering teams.
            </h1>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Connect your Git repositories, parse full syntax trees, and ask natural language questions to find exact code snippets in milliseconds.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-blue-900/60 text-blue-400 flex items-center justify-center shrink-0">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <span>Tree-sitter AST symbol extraction across JavaScript, Python, TypeScript & Go</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-indigo-900/60 text-indigo-400 flex items-center justify-center shrink-0">
                <Database className="w-3.5 h-3.5" />
              </div>
              <span>PostgreSQL + pgvector with accelerated HNSW index retrieval</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-cyan-900/60 text-cyan-400 flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span>Sub-15ms semantic matching against complex code chunks</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-slate-500">
          © 2026 RepoIntel-AI. Fully documented with OpenAPI / Swagger.
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-6">
          {/* Back to dashboard button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {mode === 'signin' ? 'Sign in to your account' : 'Get started with RepoIntel-AI'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mode === 'signin'
                ? 'Welcome back! Choose your preferred login method below.'
                : 'Create an account to index codebases and explore semantic search.'}
            </p>
          </div>

          {/* Social login buttons */}
          <div className="space-y-2.5">
            {/* Google / Gmail button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleProviderLogin('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-xl transition-all shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer disabled:opacity-50"
            >
              {activeProvider === 'google' ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              ) : (
                <GoogleIcon className="w-4 h-4 shrink-0" />
              )}
              <span>Continue with Google / Gmail</span>
            </button>

            {/* GitHub button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleProviderLogin('github')}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-xl transition-all shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer disabled:opacity-50"
            >
              {activeProvider === 'github' ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-800 dark:text-slate-200" />
              ) : (
                <Github className="w-4 h-4 shrink-0" />
              )}
              <span>Continue with GitHub</span>
            </button>

            {/* GitLab button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleProviderLogin('gitlab')}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-xl transition-all shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer disabled:opacity-50"
            >
              {activeProvider === 'gitlab' ? (
                <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
              ) : (
                <GitLabIcon className="w-4 h-4 shrink-0" />
              )}
              <span>Continue with GitLab</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-slate-50 dark:bg-[#070d1e] px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider shrink-0">
              or continue with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. David Shah"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => addNotification('Password reset link sent to your email (demo).', 'info')}
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-9 pr-10 py-2 text-xs bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono tracking-tight"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Minimum 8 character helper indicator */}
              <div className="flex items-center justify-between mt-1 px-0.5 text-[11px]">
                <span
                  className={`flex items-center gap-1 transition-colors ${
                    password.length >= 8
                      ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                      : password.length > 0
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3 h-3 ${
                      password.length >= 8
                        ? 'text-emerald-500'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  />
                  Must be at least 8 characters
                </span>
                {password.length > 0 && (
                  <span
                    className={`font-mono text-[10px] tabular-nums ${
                      password.length >= 8
                        ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {password.length}/8
                  </span>
                )}
              </div>
            </div>

            {/* Quick Demo Pre-fill */}
            <div className="p-2.5 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Quick fill:
              </span>
              <button
                type="button"
                onClick={() => {
                  setName('David Shah');
                  setEmail('shahdhananjay342@gmail.com');
                  setPassword('repointel2026');
                }}
                className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                David Shah (Default)
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : mode === 'signin' ? (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            {mode === 'signin' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer ml-1"
                >
                  Sign up free
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer ml-1"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
