"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { usePreferences } from '@/contexts/preferences-context';

export default function GeospatialView() {
  const { language } = usePreferences();

  const content = {
    en: {
      title: 'QGIS Geospatial Analysis',
      description: 'In-depth analysis of food distribution and sales hotspots using QGIS.',
      alt: 'QGIS analysis map of Indonesia showing food distribution',
    },
    id: {
      title: 'Analisis Geospasial QGIS',
      description: 'Analisis mendalam tentang distribusi pangan dan titik panas penjualan menggunakan QGIS.',
      alt: 'Peta analisis QGIS Indonesia yang menunjukkan distribusi pangan',
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content[language].title}</CardTitle>
        <CardDescription>
          {content[language].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src="https://placehold.co/600x400.png"
            alt={content[language].alt}
            fill
            className="object-cover"
            data-ai-hint="geospatial analysis"
          />
        </div>
      </CardContent>
    </Card>
  );
}
