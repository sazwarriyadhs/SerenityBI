"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo } from 'react';

type FilterContextType = {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedProduct, setSelectedProduct] = useState('All Products');

  const value = useMemo(() => ({
    selectedRegion,
    setSelectedRegion,
    selectedProduct,
    setSelectedProduct,
  }), [selectedRegion, selectedProduct]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
