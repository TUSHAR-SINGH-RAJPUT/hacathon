
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check session storage for persisted login state (client-side only)
    if (typeof window !== 'undefined') {
      const storedLoginState = sessionStorage.getItem('kariGaarIsLoggedIn');
      if (storedLoginState === 'true') {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('kariGaarIsLoggedIn', 'true');
    }
    router.push('/platform-home'); // Redirect to platform home after login
  };

  const logout = () => {
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('kariGaarIsLoggedIn');
    }
    router.push('/'); // Redirect to landing page after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
