"use client";

import { useState, useTransition } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getMarketSummary } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { usePreferences } from '@/contexts/preferences-context';
import { useClient } from '@/contexts/client-context';

export default function AiTrendSummary() {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const [anomalies, setAnomalies] = useState<string | null>(null);
  const { toast } = useToast();
  const { language } = usePreferences();
  const { activeClient } = useClient();
  
  const titles = {
    en: "AI-Powered Trend Analysis",
    id: "Analisis Tren Berbasis AI"
  };

  const descriptions = {
    en: "Get an AI-generated summary of market trends based on the latest data.",
    id: "Dapatkan ringkasan tren pasar dari AI berdasarkan data terbaru."
  };
  
  const buttonLabels = {
    en: "Generate Summary",
    id: "Buat Ringkasan"
  };
  
  const loadingMessages = {
    en: "Generating...",
    id: "Menghasilkan..."
  };

  const anomalyLabels = {
    en: "Anomalies Detected",
    id: "Anomali Terdeteksi"
  };

  const handleClick = () => {
    startTransition(async () => {
      setSummary(null);
      setAnomalies(null);
      
      const datasetDescription = `This dataset contains recent sales transactions for ${activeClient.name}. It includes product name, vendor, region, and transaction amount.`;
      const result = await getMarketSummary(datasetDescription, activeClient.recentSales);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else {
        setSummary(result.summary ?? null);
        setAnomalies(result.anomalies ?? null);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titles[language]}</CardTitle>
        <CardDescription>{descriptions[language]}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPending ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : summary ? (
          <div className="text-sm text-muted-foreground space-y-4">
            <p className="whitespace-pre-wrap">{summary}</p>
            {anomalies && (
                <div>
                    <h4 className="font-semibold text-card-foreground">{anomalyLabels[language]}</h4>
                    <p className="whitespace-pre-wrap">{anomalies}</p>
                </div>
            )}
          </div>
        ) : null}
        <Button onClick={handleClick} disabled={isPending}>
          <Wand2 className="mr-2 h-4 w-4" />
          {isPending ? loadingMessages[language] : buttonLabels[language]}
        </Button>
      </CardContent>
    </Card>
  );
}
