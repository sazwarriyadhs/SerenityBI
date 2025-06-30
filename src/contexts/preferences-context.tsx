"use client";

import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'id';
type Currency = 'USD' | 'IDR';

type PreferencesContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('IDR');

  return (
    <PreferencesContext.Provider
      value={{ language, setLanguage, currency, setCurrency }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
