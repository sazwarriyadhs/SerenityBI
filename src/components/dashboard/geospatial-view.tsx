"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePreferences } from '@/contexts/preferences-context';

export default function GeospatialView() {
  const { language } = usePreferences();

  const content = {
    en: {
      title: "QGIS Geospatial Analysis",
      description: "Interactive map of food distribution and sales hotspots.",
    },
    id: {
      title: "Analisis Geospasial QGIS",
      description: "Peta interaktif distribusi pangan dan hotspot penjualan.",
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content[language].title}</CardTitle>
        <CardDescription>{content[language].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg border">
          <iframe
            src="https://qgiscloud.com/s160718026/Indonesia/?l=provinsi&bl=mapnik&t=Indonesia&e=8361576%2C-9019196%2C17886576%2C8469763&st=Indonesia%20"
            className="h-full w-full"
            title={content[language].title}
          />
        </div>
      </CardContent>
    </Card>
  );
}
