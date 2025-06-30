
"use client";

import { createContext, useContext, useState, type ReactNode, useEffect, useMemo } from 'react';
import { clients, defaultClient } from '@/lib/clients';
import type { ClientConfig } from '@/lib/clients/types';

type ClientContextType = {
  clients: ClientConfig[];
  activeClient: ClientConfig;
  switchClient: (clientId: string) => void;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [activeClient, setActiveClient] = useState<ClientConfig>(defaultClient);

  useEffect(() => {
    const root = document.documentElement;
    const theme = activeClient.theme;
    
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    const isDark = parseFloat(theme.background.split(' ')[2]) < 50; 
    if (isDark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

  }, [activeClient]);

  const switchClient = (clientId: string) => {
    const newClient = clients.find(c => c.id === clientId);
    if (newClient) {
      setActiveClient(newClient);
    }
  };

  const value = useMemo(() => ({
    clients,
    activeClient,
    switchClient,
  }), [activeClient]);

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
}
