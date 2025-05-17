import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { GlitchLogo } from '@/components/ui/GlitchLogo';
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
  description: 'Token utilitário multi-chain para marketing digital descentralizado',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
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