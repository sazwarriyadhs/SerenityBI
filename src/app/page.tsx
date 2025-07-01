"use client";

import DashboardHeader from '@/components/dashboard/dashboard-header';
import KpiCard from '@/components/dashboard/kpi-card';
import SalesOverTimeChart from '@/components/dashboard/sales-over-time-chart';
import SalesByProductChart from '@/components/dashboard/sales-by-product-chart';
import GeospatialView from '@/components/dashboard/geospatial-view';
import AiTrendSummary from '@/components/dashboard/ai-trend-summary';
import ProductHighlights from '@/components/dashboard/product-highlights';
import { useClient } from '@/contexts/client-context';

export default function DashboardPage() {
  const { activeClient } = useClient();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main id="dashboard-main-content" className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {activeClient.kpis.map((kpi, index) => (
            <KpiCard
              key={index}
              title={kpi.title}
              amount={kpi.amount}
              change={kpi.change}
              icon={kpi.icon}
              iconColor={kpi.iconColor}
              formatAsCurrency={kpi.formatAsCurrency}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <SalesOverTimeChart />
          </div>
          <SalesByProductChart />
        </div>

        <ProductHighlights />

        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-1">
          <GeospatialView />
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-1">
          <AiTrendSummary />
        </div>
      </main>
    </div>
  );
}
