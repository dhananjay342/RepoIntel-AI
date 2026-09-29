import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AddRepoModal } from './AddRepoModal';
import { AuthModal } from './AuthModal';
import { NotificationToast } from './NotificationToast';

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] dark:bg-[#070d1e] text-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 sm:py-9">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Modals & Toasts */}
      <AddRepoModal />
      <AuthModal />
      <NotificationToast />
    </div>
  );
};

