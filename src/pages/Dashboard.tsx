import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  FolderPlus,
  Search,
  Code2,
  Zap,
  Github,
  ArrowRight,
  MoreVertical,
  RefreshCw,
  Trash2,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { useRepoIntel } from '../context/RepoIntelContext';
import { AstDetailsModal } from '../components/AstDetailsModal';

export const Dashboard: React.FC = () => {
  const { repositories, setIsAddModalOpen, deleteRepository, triggerReindex } = useRepoIntel();
  const navigate = useNavigate();
  const [isAstModalOpen, setIsAstModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleSearchRepo = (repoName: string) => {
    navigate(`/search?repo=${encodeURIComponent(repoName)}`);
  };

  const getLanguageBadge = (lang: string) => {
    switch (lang) {
      case 'JavaScript':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-100/80 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40">
            JavaScript
          </span>
        );
      case 'Python':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-sky-100/80 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/60 dark:border-sky-900/40">
            Python
          </span>
        );
      case 'TypeScript':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100/80 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40">
            TypeScript
          </span>
        );
      case 'Go':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-cyan-100/80 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-900/40">
            Go
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
            {lang}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <span>Welcome to</span>
          <span className="text-blue-600 dark:text-blue-500">RepoIntel-AI</span>
        </h1>
        <p className="mt-1.5 text-base text-slate-600 dark:text-slate-400 font-normal">
          Understand your codebase. Find relevant code. Build faster.
        </p>
      </div>

      {/* 4 Quick Action Feature Cards Grid (exact match to image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Add Repository */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.15 }}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <FolderPlus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Add Repository
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[38px]">
              Connect your Git repository and let RepoIntel-AI index your code.
            </p>
          </div>
          <div className="mt-5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>+ Add Repository</span>
            </button>
          </div>
        </motion.div>

        {/* Card 2: Semantic Search */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.15 }}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Semantic Search
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[38px]">
              Ask natural language questions and get relevant code snippets.
            </p>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigate('/search')}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Try Search</span>
            </button>
          </div>
        </motion.div>

        {/* Card 3: Code Understanding */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.15 }}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Code Understanding
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[38px]">
              Powered by AST parsing, symbol extraction and embeddings.
            </p>
          </div>
          <div className="mt-5">
            <button
              onClick={() => setIsAstModalOpen(true)}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Learn More</span>
            </button>
          </div>
        </motion.div>

        {/* Card 4: Fast & Accurate */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.15 }}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Fast & Accurate
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[38px]">
              Uses PostgreSQL + pgvector with HNSW indexing for high performance.
            </p>
          </div>
          <div className="mt-5">
            <button
              onClick={() => navigate('/docs')}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Docs</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Your Repositories Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        {/* Section Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Your Repositories
          </h2>
          <button
            onClick={() => navigate('/repositories')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Repositories Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/50 dark:bg-slate-800/30">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Language</th>
                <th className="py-3 px-6">Files</th>
                <th className="py-3 px-6">Indexed</th>
                <th className="py-3 px-6">Last Updated</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {repositories.map((repo) => (
                <tr
                  key={repo.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Name with Github Icon */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                          {repo.name}
                        </span>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2">
                          <span>{repo.branch}</span>
                          {repo.astStats && (
                            <>
                              <span>·</span>
                              <span className="tabular-nums font-mono">{repo.astStats.functionsCount} symbols</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Language Badge */}
                  <td className="py-4 px-6">
                    {getLanguageBadge(repo.language)}
                  </td>

                  {/* Files Count */}
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300 tabular-nums font-mono text-xs">
                    {repo.files}
                  </td>

                  {/* Indexed Count */}
                  <td className="py-4 px-6 tabular-nums font-mono text-xs">
                    <span className="text-slate-900 dark:text-slate-100 font-medium">
                      {repo.indexed}
                    </span>
                    {repo.status === 'indexing' && (
                      <span className="ml-2 text-[10px] text-blue-500 font-sans animate-pulse">
                        Indexing...
                      </span>
                    )}
                  </td>

                  {/* Last Updated */}
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400 tabular-nums">
                    {repo.lastUpdated}
                  </td>

                  {/* Actions (Search button & ⋮ menu) */}
                  <td className="py-4 px-6 text-right">
                    <div className="relative inline-flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleSearchRepo(repo.name)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-900/40 transition-colors cursor-pointer"
                      >
                        <Search className="w-3 h-3" />
                        <span>Search</span>
                      </button>

                      {/* Three-dots Menu */}
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === repo.id ? null : repo.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown menu */}
                      {activeMenuId === repo.id && (
                        <div
                          className="absolute right-0 top-8 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-1.5 z-40 text-xs text-left animate-in fade-in zoom-in-95 duration-100"
                          onMouseLeave={() => setActiveMenuId(null)}
                        >
                          <button
                            onClick={() => {
                              triggerReindex(repo.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
                            <span>Re-index with AST</span>
                          </button>
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full px-3 py-1.5 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                            <span>View on GitHub</span>
                          </a>
                          <button
                            onClick={() => {
                              deleteRepository(repo.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Repository</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Understanding AST Modal */}
      <AstDetailsModal
        isOpen={isAstModalOpen}
        onClose={() => setIsAstModalOpen(false)}
      />
    </div>
  );
};
