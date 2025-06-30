import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { PreferencesProvider } from '@/contexts/preferences-context';

export const metadata: Metadata = {
  title: 'Indonesian MarketSight',
  description: 'Interactive dashboard for Indonesian food market analysis.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="font-body antialiased">
        <PreferencesProvider>
          {children}
          <Toaster />
        </PreferencesProvider>
      </body>
    </html>
  );
}
