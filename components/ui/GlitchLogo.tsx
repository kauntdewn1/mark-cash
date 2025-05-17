'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function GlitchLogo() {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 1000000); // 1000 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pointer-events-none">
      <div className={`relative w-32 h-32 transition-opacity duration-200 ${isGlitching ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747400126/LOGO_sem_fundo4_fgamdv.png"
          alt="MKS Logo"
          fill
          className="object-contain"
          priority
          unoptimized
        />
      </div>
    </div>
  );
} 