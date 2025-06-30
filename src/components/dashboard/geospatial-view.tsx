"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function GeospatialView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>QGIS Geospatial Analysis</CardTitle>
        <CardDescription>
          In-depth analysis of food distribution and sales hotspots using QGIS.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src="https://placehold.co/600x400.png"
            alt="QGIS analysis map of Indonesia showing food distribution"
            fill
            className="object-cover"
            data-ai-hint="geospatial analysis"
          />
        </div>
      </CardContent>
    </Card>
  );
}
