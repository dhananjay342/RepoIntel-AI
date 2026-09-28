import React, { useState } from 'react';
import { X, Code2, Network, Cpu, Database, CheckCircle, ChevronRight, Layers } from 'lucide-react';
import { useRepoIntel } from '../context/RepoIntelContext';

interface AstDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AstDetailsModal: React.FC<AstDetailsModalProps> = ({ isOpen, onClose }) => {
  const { repositories } = useRepoIntel();
  const [selectedRepoId, setSelectedRepoId] = useState<string>(repositories[0]?.id || 'repo-1');

  if (!isOpen) return null;

  const currentRepo = repositories.find(r => r.id === selectedRepoId) || repositories[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Code Understanding Architecture
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AST parsing, symbol extraction, and PostgreSQL pgvector embeddings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5">
          {/* Architecture Pipeline Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs mb-1">
                <Network className="w-4 h-4" />
                <span>1. AST Parser</span>
              </div>
              <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Source files are parsed via Tree-sitter grammar engines into concrete syntax trees.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs mb-1">
                <Layers className="w-4 h-4" />
                <span>2. Symbol Extraction</span>
              </div>
              <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Functions, classes, types, and route handlers are extracted with scope boundaries.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs mb-1">
                <Database className="w-4 h-4" />
                <span>3. pgvector + HNSW</span>
              </div>
              <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                768-dim embeddings indexed with HNSW for sub-10ms nearest neighbor queries.
              </p>
            </div>
          </div>

          {/* Repository Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Repository to Inspect AST Metrics
            </label>
            <div className="flex flex-wrap gap-2">
              {repositories.map(repo => (
                <button
                  key={repo.id}
                  onClick={() => setSelectedRepoId(repo.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    repo.id === currentRepo?.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {repo.name} ({repo.language})
                </button>
              ))}
            </div>
          </div>

          {/* Current Repo AST Inspection */}
          {currentRepo && (
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Repository AST Summary</span>
                <span className="text-blue-400">{currentRepo.name}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Functions</div>
                  <div className="text-base font-bold text-white tabular-nums">
                    {currentRepo.astStats?.functionsCount || 142}
                  </div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Classes</div>
                  <div className="text-base font-bold text-white tabular-nums">
                    {currentRepo.astStats?.classesCount || 24}
                  </div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Total AST Nodes</div>
                  <div className="text-base font-bold text-white tabular-nums">
                    {currentRepo.astStats?.totalAstNodes.toLocaleString() || '12,400'}
                  </div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Vector Chunks</div>
                  <div className="text-base font-bold text-emerald-400 tabular-nums">
                    {currentRepo.astStats?.vectorEmbeddingsCount || 340}
                  </div>
                </div>
              </div>

              {/* Sample AST Node tree visualization */}
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-[11px] leading-relaxed">
                <div className="text-slate-400 mb-1 font-sans font-semibold">Tree-sitter AST Syntax Hierarchy:</div>
                <pre className="text-slate-300 overflow-x-auto">
{`Program (root)
├── import_statement: ["express", "jwt", "dotenv"]
├── class_definition: "RepositoryController"
│   ├── method_declaration: "indexRepository" (lines 14-48)
│   └── method_declaration: "queryHnswVectorIndex" (lines 50-84)
└── function_declaration: "cosineSimilarity(vecA, vecB)" -> float`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
