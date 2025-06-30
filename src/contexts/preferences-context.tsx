
"use client";

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { useClient } from './client-context';

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
  const { activeClient } = useClient();
  const [language, setLanguage] = useState<Language>(activeClient.defaultPreferences.language);
  const [currency, setCurrency] = useState<Currency>(activeClient.defaultPreferences.currency);

  useEffect(() => {
    setLanguage(activeClient.defaultPreferences.language);
    setCurrency(activeClient.defaultPreferences.currency);
  }, [activeClient]);

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
