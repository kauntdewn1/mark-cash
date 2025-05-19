'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { WalletAuth } from '@/components/auth/WalletAuth';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="relative h-8 w-32">
            <Image
              src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747467667/logo_horizontal_iipobr.png"
              alt="MKS Logo"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/sobre" className="text-sm font-medium transition-colors hover:text-primary">
              Sobre
            </Link>
            <Link href="/tokenomics" className="text-sm font-medium transition-colors hover:text-primary">
              Tokenomics
            </Link>
            <Link href="/roadmap" className="text-sm font-medium transition-colors hover:text-primary">
              Roadmap
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <WalletAuth />
        </div>
      </div>
    </header>
  );
} 