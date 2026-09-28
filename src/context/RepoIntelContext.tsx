import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Repository, BackendHealth, SearchQueryRequest, SearchQueryResponse } from '../types';
import { apiService } from '../services/api';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface RepoIntelContextType {
  repositories: Repository[];
  health: BackendHealth | null;
  loading: boolean;
  activeSearch: SearchQueryResponse | null;
  isSearching: boolean;
  notifications: Notification[];
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  refreshRepositories: () => Promise<void>;
  addRepository: (params: { name: string; url: string; branch?: string; language?: Repository['language']; description?: string }) => Promise<Repository>;
  deleteRepository: (id: string) => Promise<void>;
  triggerReindex: (id: string) => Promise<void>;
  performSearch: (params: SearchQueryRequest) => Promise<SearchQueryResponse>;
  addNotification: (message: string, type?: Notification['type']) => void;
  removeNotification: (id: string) => void;
  resetDemoData: () => void;
}

const RepoIntelContext = createContext<RepoIntelContextType | undefined>(undefined);

export const RepoIntelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [health, setHealth] = useState<BackendHealth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSearch, setActiveSearch] = useState<SearchQueryResponse | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const addNotification = useCallback((message: string, type: Notification['type'] = 'info') => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4500);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const refreshRepositories = useCallback(async () => {
    try {
      const repos = await apiService.getRepositories();
      setRepositories(repos);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [repos, h] = await Promise.all([
          apiService.getRepositories(),
          apiService.getHealth(),
        ]);
        setRepositories(repos);
        setHealth(h);
      } catch (err) {
        console.error('Failed to load initial repo data', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const addRepository = async (params: {
    name: string;
    url: string;
    branch?: string;
    language?: Repository['language'];
    description?: string;
  }) => {
    try {
      const created = await apiService.addRepository(params);
      await refreshRepositories();
      addNotification(`Repository "${created.name}" connected and indexed successfully!`, 'success');
      return created;
    } catch (err) {
      addNotification(`Failed to connect repository: ${String(err)}`, 'error');
      throw err;
    }
  };

  const deleteRepository = async (id: string) => {
    try {
      const repo = repositories.find(r => r.id === id);
      await apiService.deleteRepository(id);
      await refreshRepositories();
      addNotification(`Repository "${repo?.name || id}" removed`, 'info');
    } catch (err) {
      addNotification(`Failed to delete repository`, 'error');
    }
  };

  const triggerReindex = async (id: string) => {
    try {
      const repo = repositories.find(r => r.id === id);
      addNotification(`Triggered AST re-indexing for ${repo?.name}...`, 'info');
      // Set temporary indexing status
      setRepositories(prev => prev.map(r => r.id === id ? { ...r, status: 'indexing' } : r));
      await apiService.triggerIndexing(id);
      await refreshRepositories();
      addNotification(`Indexing completed for ${repo?.name}! AST and pgvector vectors updated.`, 'success');
    } catch (err) {
      addNotification(`Reindexing failed`, 'error');
    }
  };

  const performSearch = async (req: SearchQueryRequest): Promise<SearchQueryResponse> => {
    setIsSearching(true);
    try {
      const result = await apiService.searchSemantic(req);
      setActiveSearch(result);
      return result;
    } finally {
      setIsSearching(false);
    }
  };

  const resetDemoData = () => {
    apiService.resetDemoData();
    refreshRepositories();
    addNotification('Restored initial sample repositories', 'info');
  };

  return (
    <RepoIntelContext.Provider
      value={{
        repositories,
        health,
        loading,
        activeSearch,
        isSearching,
        notifications,
        isAddModalOpen,
        setIsAddModalOpen,
        refreshRepositories,
        addRepository,
        deleteRepository,
        triggerReindex,
        performSearch,
        addNotification,
        removeNotification,
        resetDemoData,
      }}
    >
      {children}
    </RepoIntelContext.Provider>
  );
};

export const useRepoIntel = () => {
  const context = useContext(RepoIntelContext);
  if (!context) throw new Error('useRepoIntel must be used within a RepoIntelProvider');
  return context;
};
