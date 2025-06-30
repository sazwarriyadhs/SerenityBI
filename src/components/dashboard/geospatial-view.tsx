"use client";

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function GeospatialView() {
  const { language, currency } = usePreferences();

  const content = {
    en: {
      title: "Geospatial Sales Data",
      description: "Sales data by city, displayed alongside recent transactions.",
      transactions: "Recent Transactions",
    },
    id: {
      title: "Data Penjualan Geospasial",
      description: "Data penjualan berdasarkan kota, ditampilkan bersama transaksi terkini.",
      transactions: "Transaksi Terkini",
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
            <h3 className="text-lg font-semibold mb-2 flex-shrink-0">{content[language].transactions}</h3>
            <div className="flex-grow min-h-0">
                <ScrollArea className="h-full pr-4">
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product & City</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSales.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell>
                            <div className="font-medium">{sale.product}</div>
                            <div className="text-sm text-muted-foreground">
                              {sale.region}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{sale.amount.toLocaleString(language === 'id' ? 'id-ID' : 'en-US', { style: 'currency', currency: currency })}</TableCell>
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
