import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter, Space_Mono } from 'next/font/google';
import { type Viewport } from 'next';
import { Providers } from '@/app/providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://markcash.xyz'),
  title: 'MKS - MarkCash',
  description: 'O $MKS é o token nativo da nova economia do marketing digital.',
  icons: {
    icon: [
      { url: '/web-app-manifest-512x512.png', type: 'image/png' },
    ],
    apple: [
      { url: '/web-app-manifest-512x512.png' },
    ],
  },
  openGraph: {
    title: 'MKS - MarkCash',
    description: 'O $MKS é o token nativo da nova economia do marketing digital.',
    url: 'https://markcash.xyz',
    siteName: 'MarkCash',
    images: [
      {
        url: '/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'MarkCash Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MKS - MarkCash',
    description: 'O $MKS é o token nativo da nova economia do marketing digital.',
    images: ['/web-app-manifest-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const themeColor = '#000000';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`dark ${inter.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="icon" href="/web-app-manifest-512x512.png" type="image/png" />
        <link rel="apple-touch-icon" href="/web-app-manifest-512x512.png" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}