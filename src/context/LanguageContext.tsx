"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'english' | 'kannada' | 'hindi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('kariGaarLanguage') as Language) || 'english';
    }
    return 'english';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kariGaarLanguage', language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};