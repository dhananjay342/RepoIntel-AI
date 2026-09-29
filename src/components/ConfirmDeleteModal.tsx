import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useRepoIntel } from '../context/RepoIntelContext';

export const ConfirmDeleteModal: React.FC = () => {
  const { repoToDelete, cancelDeleteRepository, confirmDelete } = useRepoIntel();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && repoToDelete) {
        cancelDeleteRepository();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [repoToDelete, cancelDeleteRepository]);

  if (!repoToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        {/* Red Accent Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h3
              id="delete-dialog-title"
              className="text-base font-bold text-slate-900 dark:text-slate-100"
            >
              Delete Repository
            </h3>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Are you sure you want to delete{' '}
              <strong className="text-slate-900 dark:text-slate-100 font-semibold font-mono">
                {repoToDelete.name}
              </strong>
              ?
            </p>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed">
              This action cannot be undone. All AST syntax trees, extracted symbols, and pgvector embeddings will be permanently purged from the database.
            </p>
          </div>

          <button
            type="button"
            onClick={cancelDeleteRepository}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={cancelDeleteRepository}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-sm shadow-rose-600/25 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
