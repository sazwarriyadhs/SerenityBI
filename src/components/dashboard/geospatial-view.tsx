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
import { recentSales } from '@/lib/data';

export default function GeospatialView() {
  const { language, currency } = usePreferences();

  const regionData = useMemo(() => {
    const salesByRegion = recentSales.reduce((acc, sale) => {
      if (!acc[sale.region]) {
        acc[sale.region] = 0;
      }
      acc[sale.region] += sale.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(salesByRegion)
      .map(([region, totalSales]) => ({ region, totalSales }))
      .sort((a, b) => b.totalSales - a.totalSales);
  }, []);

  const content = {
    en: {
      title: "Geospatial Sales Distribution",
      description: "Sales data by region, visualized on an interactive map.",
      regions: "Regions by Sales",
    },
    id: {
      title: "Distribusi Penjualan Geospasial",
      description: "Data penjualan berdasarkan wilayah, divisualisasikan pada peta interaktif.",
      regions: "Wilayah berdasarkan Penjualan",
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content[language].title}</CardTitle>
        <CardDescription>{content[language].description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[450px] p-0 sm:p-6 sm:pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
          <div className="w-full h-full overflow-hidden rounded-lg border">
            <iframe
              src="https://qgiscloud.com/s160718026/Indonesia/?l=provinsi&bl=mapnik&t=Indonesia&e=8361576%2C-9019196%2C17886576%2C8469763&st=Indonesia%20"
              className="h-full w-full"
              title={content[language].title}
            />
          </div>
          <div className="flex flex-col h-full p-6 pt-0 sm:p-0">
            <h3 className="text-lg font-semibold mb-2 flex-shrink-0">{content[language].regions}</h3>
            <div className="flex-grow min-h-0">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-2">
                    {regionData.map(({ region, totalSales }) => (
                      <div key={region} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50">
                        <span className="font-medium text-sm">{region}</span>
                        <span className="text-sm font-semibold">
                           {new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
                              style: 'currency',
                              currency: currency,
                              notation: 'compact',
                              compactDisplay: 'short',
                            }).format(totalSales)}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
