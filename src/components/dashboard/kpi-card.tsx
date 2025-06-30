"use client";

import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePreferences } from '@/contexts/preferences-context';

const iconMap = {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
};

type KpiCardProps = {
  title: { en: string; id: string };
  amount: string;
  change: string;
  icon: keyof typeof iconMap;
  iconColor?: string;
};

export default function KpiCard({ title, amount, change, icon, iconColor }: KpiCardProps) {
  const { currency, language } = usePreferences();

  const formattedAmount = new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: currency,
  }).format(parseFloat(amount));

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
