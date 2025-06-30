import DashboardHeader from '@/components/dashboard/dashboard-header';
import KpiCard from '@/components/dashboard/kpi-card';
import SalesOverTimeChart from '@/components/dashboard/sales-over-time-chart';
import SalesByProductChart from '@/components/dashboard/sales-by-product-chart';
import GeospatialView from '@/components/dashboard/geospatial-view';
import AiTrendSummary from '@/components/dashboard/ai-trend-summary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { recentSales } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <KpiCard
            title={{ en: 'Total Revenue', id: 'Total Pendapatan' }}
            amount="45231.89"
            change="+20.1%"
            icon="DollarSign"
            iconColor="text-green-500"
          />
          <KpiCard
            title={{ en: 'Total Sales', id: 'Total Penjualan' }}
            amount="2350"
            change="+180.1%"
            icon="ShoppingCart"
            iconColor="text-blue-500"
          />
          <KpiCard
            title={{ en: 'Products', id: 'Produk' }}
            amount="1245"
            change="+19%"
            icon="Package"
            iconColor="text-purple-500"
          />
          <KpiCard
            title={{ en: 'Vendors', id: 'Vendor' }}
            amount="34"
            change="+2"
            icon="Users"
            iconColor="text-orange-500"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <SalesOverTimeChart />
          </div>
          <SalesByProductChart />
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <AiTrendSummary />
          <GeospatialView />
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>
                        <div className="font-medium">{sale.product}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {sale.vendor}
                        </div>
                      </TableCell>
                      <TableCell>{sale.region}</TableCell>
                      <TableCell className="text-right">{sale.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
