
import type { SVGProps } from 'react';

export type Kpi = {
  title: { en: string; id: string };
  amount: string;
  change: string;
  icon: 'DollarSign' | 'ShoppingCart' | 'Package' | 'Users' | 'TrendingUp' | 'Building';
  iconColor?: string;
  formatAsCurrency?: boolean;
};

export type Sale = {
  id: number;
  product: string;
  vendor: string;
  region: string;
  amount: number;
};

export type ChartData = {
  [key: string]: string | number;
};

export type ClientTheme = {
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
  'chart-1': string;
  'chart-2': string;
  'chart-3': string;
  'chart-4': string;
  'chart-5': string;
};


export type ClientConfig = {
  id: string;
  name: string;
  description: string;
  Logo: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  theme: ClientTheme;
  defaultPreferences: {
    language: 'en' | 'id';
    currency: 'USD' | 'IDR';
  };
  kpis: Kpi[];
  products: string[];
  regions: string[];
  vendors: string[];
  recentSales: Sale[];
  salesOverTimeData: ChartData[];
  salesByProductData: ChartData[];
  geospatial: {
    url: string;
    title: { en: string; id: string };
    description: { en: string; id: string };
  };
};
