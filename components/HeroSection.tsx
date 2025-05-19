'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const CONTRACT_ADDRESS = "0x58edcf4b0ae4591b873664734fd6731ae1aae962";
const TOKEN_DECIMALS = 18;
const abi = [
  "function totalSupply() view returns (uint256)"
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-start justify-center overflow-hidden pt-10">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747527384/hero2_axxkou.png"
          alt="Background"
          fill 
          className="object-cover object-center"
          priority
          unoptimized
        />
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="relative w-60 h-60 md:w-80 md:h-80 mx-auto mb-2">
            {/* Container do brilho */}
            <div className="absolute inset[-10%]">
              {/* Logo com brilho */}
              <Image
                src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747195425/LOGO_Sfundo1_yn3irt.png"
                alt="$MKS Logo"
                fill
                className="absolute z-30 object-contain filter blur-[20px] opacity-20 mix-blend-screen"
                style={{ filter: 'blur(20px) brightness(1.2)', backgroundColor: '#d02668' }}
                priority
                unoptimized
              />
            </div>
            
                   
            {/* Logo principal */}
            <Image
              src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747195425/LOGO_Sfundo1_yn3irt.png"
              alt="$MKS Logo"
              fill
              className="relative z-40 object-contain transform scale-125"
              priority
              unoptimized
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-green-500 max-w-2xl mx-auto mb-12"
          >
          </motion.p>

          {/* Número animado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <motion.h1
              className="text-[#c72262] font-bold text-4xl md:text-5xl mb-2 font-mono"
              animate={{
                textShadow: [
                  "0 0 7px #c72262",
                  "0 0 10px #c72262",
                  "0 0 21px #c72262",
                  "0 0 10px #c72262",
                  "0 0 7px #c72262"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              1,000,000,000
            </motion.h1>
            <motion.p
              className="text-gray-400 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Tokens em circulação
            </motion.p>
            <div className="mt-4 text-xs md:text-sm text-gray-500 space-y-1">
              <div><b>Nome:</b> MARKCASH</div>
              <div><b>Símbolo:</b> MKS</div>
              <div><b>Decimais:</b> 18</div>
              <div><b>Total supply:</b> 1.000.000.000</div>
              <div><b>Contrato:</b> <a href="https://sepolia.etherscan.io/address/0x58edcf4b0ae4591b873664734fd6731ae1aae962" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-400">0x58edcf4b0ae4591b873664734fd6731ae1aae962</a></div>
            </div>
          </motion.div>

          {/* Logos dos parceiros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center md:grid md:grid-cols-6 md:gap-8 max-w-3xl mx-auto px-3"
          >
            {/* Solana */}
            <div className="w-1/2 p-1 md:p-0">
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747288216/solana_cub0gz.png"
                  alt="Solana"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* MetaMask */}
            <div className="w-1/2 p-1 md:p-0">
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747287753/metamask_mo2yj1.png"
                  alt="MetaMask"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Blockchain */}
            <div className="w-1/2 p-1 md:p-0">
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747287743/blockchain_kcfrm5.png"
                  alt="Blockchain"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Arwave */}
            <div className="w-1/2 p-1 md:p-0">
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747287744/arwave_remvko.png"
                  alt="Arwave"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Flowoff */}
            <div className="w-1/2 p-1 md:p-0">
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747278790/logo_flowoff_lrcv04.png"
                  alt="Flowoff"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Ethereum */}
            <div className="w-1/2 p-1 md:p-0">
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dgyocpguk/image/upload/v1747287743/ethereum_d374wq.png"
                  alt="Ethereum"
                  width={112}
                  height={112}
                  className="w-28 h-28 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 