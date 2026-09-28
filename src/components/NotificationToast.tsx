import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useRepoIntel } from '../context/RepoIntelContext';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useRepoIntel();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {notifications.map((notif) => {
        const isSuccess = notif.type === 'success';
        const isError = notif.type === 'error';

        return (
          <div
            key={notif.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all animate-in slide-in-from-bottom-2 duration-200 ${
              isSuccess
                ? 'bg-slate-900/90 text-emerald-300 border-emerald-500/30'
                : isError
                ? 'bg-slate-900/90 text-rose-300 border-rose-500/30'
                : 'bg-slate-900/90 text-slate-200 border-slate-700/60'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            ) : isError ? (
              <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            )}
            <p className="text-xs flex-1 leading-relaxed font-medium">{notif.message}</p>
            <button
              onClick={() => removeNotification(notif.id)}
              className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
