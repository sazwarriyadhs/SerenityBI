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
        <CardTitle>Geospatial Analysis</CardTitle>
        <CardDescription>
          Food distribution and sales hotspots across Indonesia.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Map of Indonesia showing food distribution"
            fill
            className="object-cover"
            data-ai-hint="indonesia map"
          />
        </div>
      </CardContent>
    </Card>
  );
}
