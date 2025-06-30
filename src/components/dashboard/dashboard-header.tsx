"use client";

import {
  Calendar as CalendarIcon,
  ChevronDown,
  Share,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Logo } from '@/components/icons';
import { PreferencesSheet } from '@/components/dashboard/preferences-sheet';
import { products, regions } from '@/lib/data';
import { usePreferences } from '@/contexts/preferences-context';

export default function DashboardHeader() {
  const { language } = usePreferences();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Serenity PanganSight Dashboard',
        text: 'Check out this analysis of the Indonesian food market!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  const filterLabels = {
    en: { period: 'Period', region: 'Region', product: 'Product' },
    id: { period: 'Periode', region: 'Wilayah', product: 'Produk' },
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-semibold">Serenity PanganSight</h1>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterLabels[language].period}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Calendar mode="range" numberOfMonths={2} />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filterLabels[language].region}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {regions.map((region) => (
                <DropdownMenuItem key={region}>{region}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filterLabels[language].product}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {products.map((product) => (
                <DropdownMenuItem key={product}>{product}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share className="h-4 w-4" />
          </Button>
          
          <PreferencesSheet>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </PreferencesSheet>
        </div>
      </div>
    </header>
  );
}
