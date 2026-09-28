import React, { useState } from 'react';
import { X, GitBranch, Github, CheckCircle2, Loader2, Sparkles, FolderGit2 } from 'lucide-react';
import { useRepoIntel } from '../context/RepoIntelContext';
import { Repository } from '../types';

export const AddRepoModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, addRepository } = useRepoIntel();

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [language, setLanguage] = useState<Repository['language']>('TypeScript');
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  if (!isAddModalOpen) return null;

  const steps = [
    'Connecting to remote Git repository...',
    'Running AST tree-sitter parser & symbol extractor...',
    'Chunking code tokens and generating vector embeddings...',
    'Building PostgreSQL pgvector HNSW index...',
  ];

  const handleSelectPreset = (presetName: string, presetUrl: string, presetLang: Repository['language'], presetDesc: string) => {
    setName(presetName);
    setUrl(presetUrl);
    setLanguage(presetLang);
    setDescription(presetDesc);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    setIsProcessing(true);
    setCurrentStep(0);

    // Simulate pipeline steps
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      await addRepository({
        name: name.trim(),
        url: url.trim(),
        branch: branch.trim() || 'main',
        language,
        description: description.trim() || undefined,
      });

      // Reset form
      setName('');
      setUrl('');
      setBranch('main');
      setDescription('');
      setIsAddModalOpen(false);
    } catch {
      // handled in context
    } finally {
      setIsProcessing(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Connect Git Repository
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Index source code with AST parsing and pgvector embeddings
              </p>
            </div>
          </div>
          <button
            onClick={() => !isProcessing && setIsAddModalOpen(false)}
            disabled={isProcessing}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="my-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Quick Test Presets
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSelectPreset('wander-lust', 'https://github.com/shahdhananjay342/wander-lust', 'JavaScript', 'Travel itinerary planner with routing')}
              className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              wander-lust (JS)
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('RepoIntel-AI', 'https://github.com/AyushhVatsal/RepoIntel-AI', 'Python', 'AI semantic code search with AST parsing & pgvector')}
              className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              RepoIntel-AI (Python)
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('fastapi-microservice', 'https://github.com/fastapi/fastapi-template', 'Python', 'High performance async Python REST API')}
              className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              fastapi-template
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Repository URL
            </label>
            <div className="relative">
              <Github className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                disabled={isProcessing}
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (!name) {
                    const parts = e.target.value.split('/');
                    const last = parts[parts.length - 1];
                    if (last) setName(last.replace('.git', ''));
                  }
                }}
                placeholder="https://github.com/owner/repository"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Repository Name
              </label>
              <input
                type="text"
                required
                disabled={isProcessing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. wander-lust"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Default Branch
              </label>
              <div className="relative">
                <GitBranch className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  disabled={isProcessing}
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="main"
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Primary Language
              </label>
              <select
                disabled={isProcessing}
                value={language}
                onChange={(e) => setLanguage(e.target.value as Repository['language'])}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Go">Go</option>
                <option value="Rust">Rust</option>
                <option value="Java">Java</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Index Strategy
              </label>
              <div className="px-3 py-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300">
                HNSW (m=16, ef=64)
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Description (Optional)
            </label>
            <input
              type="text"
              disabled={isProcessing}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this codebase"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Indexing Progress Indicator */}
          {isProcessing && (
            <div className="p-3.5 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 rounded-xl space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs font-medium text-blue-700 dark:text-blue-300">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {steps[currentStep]}
                </span>
                <span className="font-mono">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || !name.trim() || !url.trim()}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/30 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Indexing...
                </>
              ) : (
                '+ Add Repository'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
