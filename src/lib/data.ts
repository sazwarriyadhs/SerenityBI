export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  );
};

export const regions = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bali'];
export const products = ['Rice', 'Cooking Oil', 'Instant Noodles', 'Coffee', 'Tea'];
export const vendors = ['Pangan Makmur', 'Sumber Rejeki', 'Agro Lestari'];

export const salesOverTimeData = [
  { month: 'January', sales: 4000 },
  { month: 'February', sales: 3000 },
  { month: 'March', sales: 5000 },
  { month: 'April', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'June', sales: 5500 },
];

export const salesByProductData = [
  { product: 'Rice', sales: 12500 },
  { product: 'Cooking Oil', sales: 9800 },
  { product: 'Noodles', sales: 7500 },
  { product: 'Coffee', sales: 6200 },
  { product: 'Tea', sales: 4800 },
  { product: 'Sugar', sales: 3500 },
  { product: 'Flour', sales: 2800 },
];

export const recentSales = [
    { id: 1, product: 'Premium Rice', vendor: 'Pangan Makmur', region: 'Jakarta', amount: 450.00 },
    { id: 2, product: 'Instant Noodles Pack', vendor: 'Sumber Rejeki', region: 'Surabaya', amount: 120.50 },
    { id: 3, product: 'Sumatran Coffee Beans', vendor: 'Agro Lestari', region: 'Medan', amount: 850.00 },
    { id: 4, product: 'Palm Cooking Oil', vendor: 'Pangan Makmur', region: 'Bali', amount: 250.75 },
    { id: 5, product: 'Jasmine Tea', vendor: 'Sumber Rejeki', region: 'Bandung', amount: 75.00 },
];
