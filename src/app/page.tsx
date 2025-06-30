"use client";

import DashboardHeader from '@/components/dashboard/dashboard-header';
import KpiCard from '@/components/dashboard/kpi-card';
import SalesOverTimeChart from '@/components/dashboard/sales-over-time-chart';
import SalesByProductChart from '@/components/dashboard/sales-by-product-chart';
import GeospatialView from '@/components/dashboard/geospatial-view';
import AiTrendSummary from '@/components/dashboard/ai-trend-summary';
import { usePreferences } from '@/contexts/preferences-context';

export default function DashboardPage() {
  const { currency, language } = usePreferences();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main id="dashboard-main-content" className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <KpiCard
            title={{ en: 'Total Revenue', id: 'Total Pendapatan' }}
            amount="12523109800"
            change="+12.5%"
            icon="DollarSign"
            iconColor="text-green-500"
          />
          <KpiCard
            title={{ en: 'Units Sold', id: 'Unit Terjual' }}
            amount="18540302"
            change="+8.2%"
            icon="ShoppingCart"
            iconColor="text-blue-500"
            formatAsCurrency={false}
          />
          <KpiCard
            title={{ en: 'Active SKUs', id: 'SKU Aktif' }}
            amount="1480"
            change="+54"
            icon="Package"
            iconColor="text-purple-500"
            formatAsCurrency={false}
          />
          <KpiCard
            title={{ en: 'Retail Partners', id: 'Mitra Ritel' }}
            amount="85"
            change="+3"
            icon="Users"
            iconColor="text-orange-500"
            formatAsCurrency={false}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <SalesOverTimeChart />
          </div>
          <SalesByProductChart />
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
            <GeospatialView />
            <AiTrendSummary />
        </div>
      </main>
    </div>
  );
}
