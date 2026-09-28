import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderGit2,
  Search,
  Plus,
  Github,
  RefreshCw,
  Trash2,
  ExternalLink,
  Code2,
  Layers,
  Database,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useRepoIntel } from '../context/RepoIntelContext';

export const RepositoriesPage: React.FC = () => {
  const { repositories, setIsAddModalOpen, deleteRepository, triggerReindex } = useRepoIntel();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [reindexingId, setReindexingId] = useState<string | null>(null);

  const filteredRepos = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          repo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  const handleReindex = async (id: string) => {
    setReindexingId(id);
    await triggerReindex(id);
    setReindexingId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Repositories & Codebases
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage indexed Git repositories, view AST parse telemetry, and monitor pgvector embeddings.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/25 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Repository</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter repositories..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'JavaScript', 'Python', 'TypeScript', 'Go'].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedLanguage === lang
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRepos.map((repo) => {
          const isReindexing = reindexingId === repo.id || repo.status === 'indexing';

          return (
            <div
              key={repo.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                        <span>{repo.name}</span>
                        <span className="text-[11px] font-mono text-slate-400 font-normal">
                          ({repo.branch})
                        </span>
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-medium text-blue-600 dark:text-blue-400">{repo.language}</span>
                        <span>·</span>
                        <span>{repo.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Indexed
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {repo.description}
                </p>

                {/* AST Telemetry Numbers */}
                {repo.astStats && (
                  <div className="mt-4 grid grid-cols-4 gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-sans">Files</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                        {repo.files}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-sans">Functions</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                        {repo.astStats.functionsCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-sans">AST Nodes</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                        {repo.astStats.totalAstNodes.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-sans">Embeddings</div>
                      <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                        {repo.astStats.vectorEmbeddingsCount}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/search?repo=${encodeURIComponent(repo.name)}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Code</span>
                  </button>

                  <button
                    onClick={() => handleReindex(repo.id)}
                    disabled={isReindexing}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isReindexing ? 'animate-spin text-blue-500' : 'text-slate-400'}`} />
                    <span>{isReindexing ? 'Indexing...' : 'Re-index'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Open on GitHub"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => deleteRepository(repo.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Delete Repository"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredRepos.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <FolderGit2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              No repositories match your filter
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Add a new Git repository or change your search filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
