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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useClient } from '@/contexts/client-context';

export default function GeospatialView() {
  const { language, currency } = usePreferences();
  const { activeClient } = useClient();
  const { geospatial, recentSales } = activeClient;

  const content = {
    en: {
      transactions: "Recent Transactions",
    },
    id: {
      transactions: "Transaksi Terkini",
    }
  };

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
