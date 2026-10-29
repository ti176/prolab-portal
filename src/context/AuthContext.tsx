import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DEFAULT_USERS } from '../data/users';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (username: string, pass: string, remember: boolean) => { success: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
  isVendor: boolean;
  rememberMe: boolean;
  savedUser: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('prolab_users');
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [savedUser, setSavedUser] = useState(() => localStorage.getItem('plx_login_user') || '');
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('plx_login_user'));

  const [user, setUser] = useState<User | null>(() => {
    try {
      const sess = localStorage.getItem('prolab_auth');
      return sess ? JSON.parse(sess) : null;
    } catch {
      return null;
    }
  });

  const login = (username: string, pass: string, remember: boolean) => {
    const cleanUser = (username || '').trim().toLowerCase();
    const found = users.find(u => u.user.toLowerCase() === cleanUser && u.pass === pass);
    if (!found) {
      return { success: false, error: 'Usuário ou senha incorretos.' };
    }

    setUser(found);
    localStorage.setItem('prolab_auth', JSON.stringify(found));

    if (remember) {
      localStorage.setItem('plx_login_user', cleanUser);
      setSavedUser(cleanUser);
      setRememberMe(true);
    } else {
      localStorage.removeItem('plx_login_user');
      setSavedUser('');
      setRememberMe(false);
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prolab_auth');
  };

  const isAdmin = user?.role === 'admin';
  const isVendor = user?.role === 'vendedor';

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        isAdmin,
        isVendor,
        rememberMe,
        savedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
