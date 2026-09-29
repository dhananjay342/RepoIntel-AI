import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RepoIntelProvider } from './context/RepoIntelContext';
import { AuthProvider } from './context/AuthContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { SemanticSearchPage } from './pages/SemanticSearchPage';
import { SwaggerPage } from './pages/SwaggerPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthPage } from './pages/AuthPage';

export default function App() {
  return (
    <ThemeProvider>
      <RepoIntelProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Standalone Authentication Pages */}
              <Route path="/signin" element={<AuthPage initialMode="signin" />} />
              <Route path="/signup" element={<AuthPage initialMode="signup" />} />

              {/* Main Dashboard Layout and Pages */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="repositories" element={<RepositoriesPage />} />
                <Route path="search" element={<SemanticSearchPage />} />
                <Route path="docs" element={<SwaggerPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </RepoIntelProvider>
    </ThemeProvider>
  );
}


