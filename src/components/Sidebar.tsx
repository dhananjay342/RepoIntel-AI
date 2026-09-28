import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Database, Search, Settings, FileCode2, Terminal, ExternalLink } from 'lucide-react';
import { useRepoIntel } from '../context/RepoIntelContext';

export const Sidebar: React.FC = () => {
  const { health } = useRepoIntel();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/repositories', label: 'Repositories', icon: Database },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/docs', label: 'API Docs (Swagger)', icon: FileCode2 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a1128] text-slate-200 flex flex-col shrink-0 h-screen sticky top-0 border-r border-slate-800/60 select-none z-30 transition-colors duration-200">
      {/* Brand Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <span className="font-mono font-bold text-lg">&lt;/&gt;</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              RepoIntel-AI
            </h1>
            <p className="text-xs text-slate-400 font-normal">
              Find the right code. Faster.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Quick API Explorer Banner */}
      <div className="p-3 mx-3 mb-2 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="flex items-center gap-1 font-medium text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            pgvector + HNSW
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">ACTIVE</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          PostgreSQL vector embeddings indexed for fast similarity retrieval.
        </p>
      </div>

      {/* Backend Status Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-300">
              {health?.status === 'ok' ? 'Backend Online' : 'Backend Connecting'}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            v{health?.version || '1.0.0'}
          </span>
        </div>
      </div>
    </aside>
  );
};
