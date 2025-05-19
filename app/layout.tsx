import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="icon" href="/web-app-manifest-512x512.png" type="image/png" />
        <link rel="apple-touch-icon" href="/web-app-manifest-512x512.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.variable} ${spaceMono.variable} font-sans`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
        >
          
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <div className="scanline" />
          <div className="crt-effect" />
        </ThemeProvider>
      </body>
    </html>
  );
}