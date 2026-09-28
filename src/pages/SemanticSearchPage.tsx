import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Code2,
  FileCode,
  Copy,
  Check,
  Sparkles,
  SlidersHorizontal,
  Clock,
  Database,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useRepoIntel } from '../context/RepoIntelContext';
import { CodeSnippet } from '../types';

export const SemanticSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRepo = searchParams.get('repo') || '';

  const { repositories, performSearch, activeSearch, isSearching } = useRepoIntel();
  const [query, setQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(initialRepo);
  const [selectedLang, setSelectedLang] = useState('');
  const [minSimilarity, setMinSimilarity] = useState(0.60);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleQueries = [
    'Find JWT authentication middleware and token verification',
    'How is pgvector cosine distance search queried in PostgreSQL?',
    'AST tree-sitter visitor extracting symbols and docstrings',
    'Calculate optimized travel route waypoints and distance',
    'Semantic code chunker splitting on AST node boundaries',
  ];

  useEffect(() => {
    // If navigated with initial query or repo, perform an initial search
    if (initialRepo) {
      setSelectedRepo(initialRepo);
      handleSearch('Find core functions and entrypoints', initialRepo);
    } else if (!activeSearch) {
      handleSearch('Find JWT authentication middleware');
    }
  }, [initialRepo]);

  const handleSearch = async (searchQuery: string, repoFilter?: string) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    await performSearch({
      query: searchQuery,
      repositoryId: repoFilter ? repositories.find(r => r.name === repoFilter)?.id : (selectedRepo ? repositories.find(r => r.name === selectedRepo)?.id : undefined),
      language: selectedLang || undefined,
      minSimilarity,
    });
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Semantic Code Search
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Query indexed repositories using natural language questions. Powered by AST chunking and pgvector embeddings.
        </p>
      </div>

      {/* Main Search Input Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="relative flex items-center"
        >
          <Search className="w-5 h-5 absolute left-4 text-blue-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question or describe code functionality (e.g. 'How does user login verification work?')..."
            className="w-full pl-12 pr-28 py-3.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm shadow-blue-500/30 transition-colors cursor-pointer"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Try asking:
          </span>
          {sampleQueries.map((sq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSearch(sq)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/60 dark:border-slate-700/60 transition-colors cursor-pointer truncate max-w-xs"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Repository:</span>
            </div>
            <select
              value={selectedRepo}
              onChange={(e) => {
                setSelectedRepo(e.target.value);
                if (query) handleSearch(query, e.target.value);
              }}
              className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">All Repositories</option>
              {repositories.map(r => (
                <option key={r.id} value={r.name}>{r.name} ({r.language})</option>
              ))}
            </select>

            <select
              value={selectedLang}
              onChange={(e) => {
                setSelectedLang(e.target.value);
                if (query) handleSearch(query);
              }}
              className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">All Languages</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Go">Go</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <span>Min Similarity:</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold tabular-nums">
              {Math.round(minSimilarity * 100)}%
            </span>
            <input
              type="range"
              min="0.4"
              max="0.95"
              step="0.05"
              value={minSimilarity}
              onChange={(e) => setMinSimilarity(parseFloat(e.target.value))}
              className="w-24 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Search Results Summary */}
      {activeSearch && (
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <div className="flex items-center gap-3">
            <span>
              Found <strong className="text-slate-900 dark:text-slate-100 font-semibold">{activeSearch.totalResults}</strong> relevant snippets
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono tabular-nums">{activeSearch.latencyMs}ms</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <Database className="w-3 h-3 text-blue-500" />
            <span>HNSW Index Cosine Retrieval</span>
          </div>
        </div>
      )}

      {/* Snippets List */}
      <div className="space-y-4">
        {activeSearch?.results.map((snip) => (
          <div
            key={snip.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs"
          >
            {/* Snippet Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center gap-2.5">
                <FileCode className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                  {snip.repositoryName}
                </span>
                <span className="text-slate-400">/</span>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-300">
                  {snip.filePath}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  (lines {snip.startLine}–{snip.endLine})
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Match Score Badge */}
                <div className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                  {Math.round(snip.similarityScore * 100)}% match
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopyCode(snip.id, snip.code)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedId === snip.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Semantic Explanation */}
            <div className="px-5 py-2.5 bg-blue-50/40 dark:bg-blue-950/20 border-b border-slate-100 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                AST Symbol [{snip.symbolType} {snip.symbolName}]:
              </span>
              <span>{snip.explanation}</span>
            </div>

            {/* Code Block */}
            <div className="bg-[#0f172a] text-slate-100 p-4 font-mono text-xs overflow-x-auto leading-relaxed">
              <pre>
                <code>{snip.code}</code>
              </pre>
            </div>
          </div>
        ))}

        {activeSearch && activeSearch.results.length === 0 && (
          <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              No matching code snippets found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try relaxing your minimum similarity threshold or using different descriptive terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
