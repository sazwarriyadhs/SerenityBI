"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useClient } from '@/contexts/client-context';
import { useFilters } from '@/contexts/filter-context';
import { usePreferences } from '@/contexts/preferences-context';
import { Trophy } from 'lucide-react';

export default function ProductHighlights() {
    const { clients, activeClient } = useClient();
    const { selectedRegion } = useFilters();
    const { language, currency } = usePreferences();

    const content = {
        en: {
            topProducts: "Top Products",
            description: "Highlights for the selected client and filters.",
            crossClientTitle: "Cross-Client Regional Spotlight",
            crossClientDescription: `Top product in ${selectedRegion} for each client.`,
        },
        id: {
            topProducts: "Produk Unggulan",
            description: "Sorotan untuk klien dan filter yang dipilih.",
            crossClientTitle: "Sorotan Lintas Klien Regional",
            crossClientDescription: `Produk teratas di ${selectedRegion} untuk setiap klien.`,
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    }

    const filteredSales = useMemo(() => {
        if (selectedRegion === 'All Regions') {
            return activeClient.recentSales;
        }
        return activeClient.recentSales.filter(sale => sale.region === selectedRegion);
    }, [activeClient.recentSales, selectedRegion]);

    const topProducts = useMemo(() => {
        const productSales = new Map<string, number>();
        filteredSales.forEach(sale => {
            productSales.set(sale.product, (productSales.get(sale.product) || 0) + sale.amount);
        });

        return Array.from(productSales.entries())
            .map(([product, totalSales]) => ({ product, totalSales }))
            .sort((a, b) => b.totalSales - a.totalSales)
            .slice(0, 3);
    }, [filteredSales]);

    const crossClientHighlights = useMemo(() => {
        if (selectedRegion === 'All Regions') {
            return [];
        }

        return clients.map(client => {
            const productSales = new Map<string, number>();
            client.recentSales
                .filter(sale => sale.region === selectedRegion)
                .forEach(sale => {
                    productSales.set(sale.product, (productSales.get(sale.product) || 0) + sale.amount);
                });

            if (productSales.size === 0) {
                return { clientName: client.name, Logo: client.Logo, topProduct: null };
            }

            const topProduct = Array.from(productSales.entries())
                .reduce((a, b) => (a[1] > b[1] ? a : b));

            return {
                clientName: client.name,
                Logo: client.Logo,
                topProduct: {
                    name: topProduct[0],
                    sales: topProduct[1],
                }
            };
        })
        .filter(item => item.topProduct !== null)
        .sort((a, b) => (b.topProduct?.sales ?? 0) - (a.topProduct?.sales ?? 0));

    }, [clients, selectedRegion]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{content[language].topProducts}</CardTitle>
                <CardDescription>{content[language].description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                     {topProducts.length > 0 ? topProducts.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Trophy className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-card-foreground">{item.product}</p>
                                <p className="text-sm text-muted-foreground">{formatCurrency(item.totalSales)}</p>
                            </div>
                        </div>
                    )) : <p className="text-sm text-muted-foreground">No sales data for the selected filters.</p>}
                </div>
                 {selectedRegion !== 'All Regions' && crossClientHighlights.length > 0 && (
                     <div>
                        <h3 className="text-lg font-semibold mb-2">{content[language].crossClientTitle}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{content[language].crossClientDescription}</p>
                        <div className="flex flex-col gap-4">
                            {crossClientHighlights.map((highlight, index) => (
                               highlight.topProduct && (
                                 <div key={index} className="flex items-center gap-4 p-2 rounded-lg bg-secondary/50">
                                    <highlight.Logo className="h-8 w-auto flex-shrink-0" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-card-foreground">{highlight.topProduct.name}</p>
                                        <p className="text-xs text-muted-foreground">{formatCurrency(highlight.topProduct.sales)}</p>
                                    </div>
                                </div>
                               )
                            ))}
                        </div>
                     </div>
                 )}
            </CardContent>
        </Card>
    );
}
