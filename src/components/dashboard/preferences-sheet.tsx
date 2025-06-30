"use client";

import type { ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { usePreferences } from '@/contexts/preferences-context';

type PreferencesSheetProps = {
  children: ReactNode;
};

export function PreferencesSheet({ children }: PreferencesSheetProps) {
  const { language, setLanguage, currency, setCurrency } = usePreferences();
  
  const labels = {
    en: {
        title: "Preferences",
        description: "Customize your dashboard experience.",
        language: "Language",
        currency: "Currency",
        english: "English",
        indonesian: "Indonesian",
    },
    id: {
        title: "Preferensi",
        description: "Sesuaikan pengalaman dasbor Anda.",
        language: "Bahasa",
        currency: "Mata Uang",
        english: "Inggris",
        indonesian: "Indonesia",
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{labels[language].title}</SheetTitle>
          <SheetDescription>{labels[language].description}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="language">{labels[language].language}</Label>
            <RadioGroup
              id="language"
              value={language}
              onValueChange={(value: 'en' | 'id') => setLanguage(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="lang-en" />
                <Label htmlFor="lang-en">{labels[language].english}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="id" id="lang-id" />
                <Label htmlFor="lang-id">{labels[language].indonesian}</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="currency">{labels[language].currency}</Label>
            <RadioGroup
              id="currency"
              value={currency}
              onValueChange={(value: 'USD' | 'IDR') => setCurrency(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="USD" id="curr-usd" />
                <Label htmlFor="curr-usd">US Dollar (USD)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="IDR" id="curr-idr" />
                <Label htmlFor="curr-idr">Indonesian Rupiah (IDR)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
