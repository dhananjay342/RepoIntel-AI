import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

export const DEFAULT_USER: User = {
  id: 'usr-alex-morgan',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  provider: 'google',
  role: 'Software Architect',
  createdAt: '2026-09-20',
};

interface AuthContextType extends AuthState {
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  signInWithProvider: (provider: 'google' | 'github' | 'gitlab') => Promise<User>;
  signInWithEmail: (email: string, password?: string) => Promise<User>;
  signUp: (name: string, email: string, password?: string) => Promise<User>;
  signOut: () => void;
  switchUser: (user: User) => void;
}

const STORAGE_KEY = 'repointel_auth_user_v2';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email && !parsed.email.includes('shahdhananjay') && !parsed.email.includes('ayush')) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    // Default to clean dummy engineer profile
    return DEFAULT_USER;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth user to localStorage', e);
    }
  }, [user]);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithProvider = async (provider: 'google' | 'github' | 'gitlab'): Promise<User> => {
    setIsLoading(true);
    // Simulate real OAuth latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    let dummyUser: User;
    if (provider === 'google') {
      dummyUser = {
        id: `usr-google-${Date.now()}`,
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        provider: 'google',
        role: 'Staff Architect',
        createdAt: new Date().toISOString(),
      };
    } else if (provider === 'github') {
      dummyUser = {
        id: `usr-github-${Date.now()}`,
        name: 'Sam Jordan',
        email: 'sam.jordan@example.com',
        provider: 'github',
        role: 'Maintainer & AI Lead',
        createdAt: new Date().toISOString(),
      };
    } else {
      dummyUser = {
        id: `usr-gitlab-${Date.now()}`,
        name: 'Taylor Reed',
        email: 'taylor.reed@example.com',
        provider: 'gitlab',
        role: 'DevOps Architect',
        createdAt: new Date().toISOString(),
      };
    }

    setUser(dummyUser);
    setIsLoading(false);
    setIsAuthModalOpen(false);
    return dummyUser;
  };

  const signInWithEmail = async (email: string): Promise<User> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const nameFromEmail = email.split('@')[0].replace(/[._-]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    const dummyUser: User = {
      id: `usr-email-${Date.now()}`,
      name: nameFromEmail || 'Developer User',
      email: email.trim(),
      provider: 'email',
      role: 'Core Contributor',
      createdAt: new Date().toISOString(),
    };

    setUser(dummyUser);
    setIsLoading(false);
    setIsAuthModalOpen(false);
    return dummyUser;
  };

  const signUp = async (name: string, email: string): Promise<User> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const dummyUser: User = {
      id: `usr-new-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      provider: 'email',
      role: 'Member',
      createdAt: new Date().toISOString(),
    };

    setUser(dummyUser);
    setIsLoading(false);
    setIsAuthModalOpen(false);
    return dummyUser;
  };

  const signOut = () => {
    setUser(null);
  };

  const switchUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signInWithProvider,
        signInWithEmail,
        signUp,
        signOut,
        switchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
