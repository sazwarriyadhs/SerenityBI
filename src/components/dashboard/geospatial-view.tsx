"use client";

import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePreferences } from '@/contexts/preferences-context';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useClient } from '@/contexts/client-context';

export default function GeospatialView() {
  const { language, currency } = usePreferences();
  const { activeClient } = useClient();
  const { geospatial, recentSales, regions } = activeClient;

  const content = {
    en: {
      title: "Sales by Region",
      topProduct: "Top Product",
      region: "Region",
      totalSales: "Total Sales",
    },
    id: {
      title: "Penjualan per Wilayah",
      topProduct: "Produk Unggulan",
      region: "Wilayah",
      totalSales: "Total Penjualan",
    }
  };

  const salesByRegion = useMemo(() => {
    return regions.map(region => {
      const regionSales = recentSales.filter(sale => sale.region === region);
      const totalSales = regionSales.reduce((total, sale) => total + sale.amount, 0);

      const productSales = new Map<string, number>();
      regionSales.forEach(sale => {
        productSales.set(sale.product, (productSales.get(sale.product) || 0) + sale.amount);
      });

      let topProduct = 'N/A';
      let maxSales = 0;
      for (const [product, sales] of productSales.entries()) {
        if (sales > maxSales) {
          maxSales = sales;
          topProduct = product;
        }
      }

      return {
        region,
        totalSales,
        topProduct,
      };
    }).sort((a,b) => b.totalSales - a.totalSales);
  }, [recentSales, regions]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>{geospatial.title[language]}</CardTitle>
        <CardDescription>{geospatial.description[language]}</CardDescription>
      </CardHeader>
      <CardContent className="h-[450px] p-0 sm:p-6 sm:pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
          <div className="w-full h-full overflow-hidden rounded-lg border">
            <iframe
              src={geospatial.url}
              className="h-full w-full"
              title={geospatial.title[language]}
            />
          </div>
          <div className="flex flex-col h-full p-6 pt-0 sm:p-0">
            <h3 className="text-lg font-semibold mb-2 flex-shrink-0">{content[language].title}</h3>
            <div className="flex-grow min-h-0">
                <ScrollArea className="h-full pr-4">
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{content[language].region}</TableHead>
                        <TableHead className="text-right">{content[language].totalSales}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesByRegion.map((data) => (
                        <TableRow key={data.region}>
                          <TableCell>
                            <div className="font-medium">{data.region}</div>
                            <div className="text-sm text-muted-foreground">
                              {content[language].topProduct}: {data.topProduct}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                              {data.totalSales.toLocaleString(language === 'id' ? 'id-ID' : 'en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
