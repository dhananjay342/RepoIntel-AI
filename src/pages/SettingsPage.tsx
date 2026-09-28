import React, { useState } from 'react';
import {
  Settings,
  Database,
  Key,
  Cpu,
  Moon,
  Sun,
  RotateCcw,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRepoIntel } from '../context/RepoIntelContext';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const { health, resetDemoData, addNotification } = useRepoIntel();

  const [gitToken, setGitToken] = useState('ghp_••••••••••••••••••••••••••••••••');
  const [vectorDim, setVectorDim] = useState('768');
  const [hnswM, setHnswM] = useState('16');
  const [hnswEf, setHnswEf] = useState('64');
  const [embeddingModel, setEmbeddingModel] = useState('text-embedding-004');
  const [astEngine, setAstEngine] = useState('tree-sitter');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification('Settings and vector index parameters saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings & Infrastructure
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Configure AST parser engines, pgvector HNSW hyper-parameters, and GitHub integration.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Appearance / Theme */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Theme & Visual Appearance</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Toggle between the sleek developer Dark theme and the crisp Bright theme.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-colors cursor-pointer text-left ${
                theme === 'dark'
                  ? 'bg-slate-900 border-blue-500 text-white ring-2 ring-blue-500/20'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Dark Theme</div>
                <div className="text-[11px] text-slate-400">Default deep navy</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-colors cursor-pointer text-left ${
                theme === 'light'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Bright Theme</div>
                <div className="text-[11px] text-slate-500">Crisp high contrast</div>
              </div>
            </button>
          </div>
        </div>

        {/* PostgreSQL + pgvector Indexing Configuration */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-500" />
              <span>PostgreSQL + pgvector (HNSW Indexing)</span>
            </h2>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Connected & Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Vector Dimension
              </label>
              <input
                type="text"
                value={vectorDim}
                onChange={(e) => setVectorDim(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-400">768 for text-embedding-004</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                HNSW m (max edges)
              </label>
              <input
                type="text"
                value={hnswM}
                onChange={(e) => setHnswM(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-400">Recommended: 16 to 32</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                HNSW ef_construction
              </label>
              <input
                type="text"
                value={hnswEf}
                onChange={(e) => setHnswEf(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
              <span className="text-[10px] text-slate-400">Recommended: 64 to 128</span>
            </div>
          </div>
        </div>

        {/* AST Parser & Embeddings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-purple-500" />
            <span>AST Parser Engine & Embedding Model</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                AST Parser Driver
              </label>
              <select
                value={astEngine}
                onChange={(e) => setAstEngine(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <option value="tree-sitter">Tree-sitter (Multi-language C-bindings)</option>
                <option value="babel-python-ast">Babel JS + Python Native AST</option>
                <option value="wasm-tree-sitter">WebAssembly Tree-sitter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Embedding Provider
              </label>
              <select
                value={embeddingModel}
                onChange={(e) => setEmbeddingModel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <option value="text-embedding-004">Google text-embedding-004 (768-dim)</option>
                <option value="text-embedding-3-small">OpenAI text-embedding-3-small (1536-dim)</option>
                <option value="codebert">HuggingFace CodeBERT (768-dim)</option>
              </select>
            </div>
          </div>
        </div>

        {/* GitHub PAT */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
            <Key className="w-4 h-4 text-emerald-500" />
            <span>GitHub Personal Access Token (PAT)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Required for indexing private repositories or higher GitHub API rate limits.
          </p>

          <input
            type="password"
            value={gitToken}
            onChange={(e) => setGitToken(e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={resetDemoData}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Repositories</span>
          </button>

          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/25 transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
