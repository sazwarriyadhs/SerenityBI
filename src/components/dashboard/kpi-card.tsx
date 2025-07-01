"use client";

import { DollarSign, Package, ShoppingCart, Users, TrendingUp, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePreferences } from '@/contexts/preferences-context';

const iconMap = {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Building,
};

type KpiCardProps = {
  title: { en: string; id: string };
  amount: string;
  change: string;
  icon: keyof typeof iconMap;
  iconColor?: string;
  formatAsCurrency?: boolean;
};

export default function KpiCard({ title, amount, change, icon, iconColor, formatAsCurrency = true }: KpiCardProps) {
  const { currency, language } = usePreferences();

  const formattedAmount = formatAsCurrency
    ? new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
        style: 'currency',
        currency: currency,
        notation: 'compact',
        compactDisplay: 'short',
      }).format(parseFloat(amount))
    : new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US').format(parseFloat(amount));

  const Icon = iconMap[icon];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title[language]}</CardTitle>
        <Icon className={`h-4 w-4 text-muted-foreground ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedAmount}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}
