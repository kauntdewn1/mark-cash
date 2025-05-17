'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <Link href="/" className="relative block h-12 w-12">
              <Image
                src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747400126/LOGO_sem_fundo4_fgamdv.png"
                alt="MKS Logo"
                fill
                sizes="(max-width: 768px) 48px, 48px"
                className="object-contain"
                priority
                unoptimized
              />
            </Link>
            <p className="text-sm text-muted-foreground text-center lg:text-left max-w-[250px]">
              $MKS | MARKCASH — O token autônomo do marketing descentralizado.
            </p>
          </div>
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <h3 className="text-sm font-medium">Links Rápidos</h3>
            <ul className="space-y-2 text-center lg:text-left">
              <li>
                <Link href="/sobre" className="text-sm text-muted-foreground hover:text-primary">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/tokenomics" className="text-sm text-muted-foreground hover:text-primary">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-sm text-muted-foreground hover:text-primary">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <h3 className="text-sm font-medium">Social</h3>
            <ul className="space-y-2 text-center lg:text-left">
              <li>
                <a 
                  href="https://twitter.com/mks_token" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/mks_token" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contrato</h3>
              <p className="text-sm text-muted-foreground text-center lg:text-left">
                <a 
                  href="https://etherscan.io/nft/0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401/40958779725811611588550816432875367046036481490366221174848031339785716351663" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary break-all"
                >
                  0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401
                </a>
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contato</h3>
              <a 
                href="mailto:markcash.eth@ethermail.io" 
                className="text-accent font-semibold hover:underline text-center lg:text-left block"
                target="_blank"
                rel="noopener noreferrer"
              >
                markcash.eth@ethermail.io
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} $MKS. Todos os direitos estão registrados na blockchain.
          </p>
        </div>
      </div>
    </footer>
  );
} 