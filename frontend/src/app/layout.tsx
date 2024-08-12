import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';

import '@/config/global';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(fontSans.variable, 'min-h-screen bg-background font-sans antialiased flex flex-col items-center justify-start')}>
        <Header />
        {children}
        {process.env.NEXT_PUBLIC_BACKEND_URL}
        <Toaster />
      </body>
    </html>
  );
}
