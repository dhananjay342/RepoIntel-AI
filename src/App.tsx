import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RepoIntelProvider } from './context/RepoIntelContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { SemanticSearchPage } from './pages/SemanticSearchPage';
import { SwaggerPage } from './pages/SwaggerPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <ThemeProvider>
      <RepoIntelProvider>
        <BrowserRouter>
          <Routes>
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
      </RepoIntelProvider>
    </ThemeProvider>
  );
}
