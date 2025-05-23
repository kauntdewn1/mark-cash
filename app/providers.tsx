'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MarqueeBar } from '@/components/MarqueeBar';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Web3Provider } from '@/lib/Web3Provider';
import { config } from '@/lib/wagmi';

const queryClient = typeof window !== 'undefined'
  ? (window as any).__REACT_QUERY_CLIENT__ || ((window as any).__REACT_QUERY_CLIENT__ = new QueryClient())
  : new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Web3Provider>
            <Header />
            <MarqueeBar />
            {children}
            <Footer />
            <Toaster />
          </Web3Provider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
} 