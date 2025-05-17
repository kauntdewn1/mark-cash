'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="relative w-60 h-60 md:w-80 md:h-80 mx-auto mb-2">
            {/* Brilho rosa */}
            <div className="absolute inset-0 bg-[#d02668] rounded-full blur-3xl opacity-3 animate-pulse-slow" />
            
            {/* Logo */}
            <Image
              src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747195425/LOGO_Sfundo1_yn3irt.png"
              alt="$MKS Logo"
              fill
              className="relative z-40 object-contain"
              priority
              unoptimized
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            $MKS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto"
          >
            Token utilitário multi-chain para marketing digital descentralizado
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
} 