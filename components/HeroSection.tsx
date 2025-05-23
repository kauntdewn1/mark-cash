'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BrutalistCountdown } from './BrutalistCountdown';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useWeb3 } from '@/hooks/useWeb3';

const CONTRACT_ADDRESS = "0x58edcf4b0ae4591b873664734fd6731ae1aae962";
const TOKEN_DECIMALS = 18;
const abi = [
  "function totalSupply() view returns (uint256)"
];

const endDate = new Date(Date.now() + 1000 * 60 * 60 * 72); // 72 horas

export default function HeroSection() {
  const { address, login, isConnected } = useWeb3();

  const handleWhitelist = async () => {
    if (!isConnected) {
      await login();
      return;
    }

    try {
      // Registrar na whitelist
      await addDoc(collection(db, 'whitelist'), {
        wallet: address,
        phase: 'Phase I',
        timestamp: serverTimestamp(),
        status: 'whitelisted',
      });

      window.open(
        'https://app.uniswap.org/#/swap?outputCurrency=0x58edcf4b0ae4591b873664734fd6731ae1aae962',
        '_blank'
      );
    } catch (err) {
      console.error(err);
      alert('Erro ao registrar whitelist. Verifique se sua wallet está conectada corretamente.');
    }
  };

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
        {/* Overlay gradiente mais denso */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
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
  className="text-xl md:text-2xl gradient-text max-w-2xl mx-auto mb-12"
>
  A moeda oficial do marketing de guerrilha digital.
</motion.p>

<motion.h1
  className="tw-text-display-2lg font-bold tw-bg-gradient-mono-purple tw-bg-clip-text tw-text-common-transparent font-mono"
  animate={{
    textShadow: [
      "0 0 5px rgb(170, 20, 77)",
      "0 0 10px rgb(223, 15, 95)",
      "0 0 15px rgb(223, 15, 95)"
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


          {/* Logos dos parceiros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto px-3"
          >
            <div className="overflow-hidden w-full py-4 relative">
              <div className="flex gap-10 w-max items-center">
                {/* Primeira sequência */}
                <div className="animate-marquee flex gap-10 w-max items-center">
                  {[
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747288216/solana_cub0gz.png', alt: 'Solana' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747287753/metamask_mo2yj1.png', alt: 'MetaMask' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747287743/blockchain_kcfrm5.png', alt: 'Blockchain' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747287744/arwave_remvko.png', alt: 'Arwave' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747278790/logo_flowoff_lrcv04.png', alt: 'Flowoff' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747287743/ethereum_d374wq.png', alt: 'Ethereum' }
                  ].map((logo, i) => (
                    <div key={`first-${i}`} className="hover:scale-110 transition-transform duration-300">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-contain opacity-60 hover:opacity-100 filter brightness-0 invert hover:drop-shadow-[0_0_6px_#c72262]"
                      />
                    </div>
                  ))}
                </div>
                {/* Segunda sequência (duplicada) */}
                <div className="animate-marquee flex gap-10 w-max items-center">
                  {[
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747288216/solana_cub0gz.png', alt: 'Solana' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747287753/metamask_mo2yj1.png', alt: 'MetaMask' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747287743/blockchain_kcfrm5.png', alt: 'Blockchain' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747287744/arwave_remvko.png', alt: 'Arwave' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747278790/logo_flowoff_lrcv04.png', alt: 'Flowoff' },
                    { src: 'https://res.cloudinary.com/dgyocpguk/image/upload/v1747287743/ethereum_d374wq.png', alt: 'Ethereum' }
                  ].map((logo, i) => (
                    <div key={`second-${i}`} className="hover:scale-110 transition-transform duration-300">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-contain opacity-60 hover:opacity-100 filter brightness-0 invert hover:drop-shadow-[0_0_6px_#c72262]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1 }}
  className="bg-black border-2 border-pink-600 text-white p-6 rounded-xl text-center shadow-xl mt-10 relative overflow-hidden"
>
  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-700/10 to-black/20 blur-xl -z-10" />
  
  <div className="relative z-10 space-y-4">
    <h2 className="text-2xl font-bold uppercase tracking-wide text-pink-500">
      Fase I — A Oferta dos Escolhidos
    </h2>

    <p className="text-sm text-zinc-300">
      🚨 Acesso prioritário garantido para carteiras conectadas <br />
      💎 Você faz parte da whitelist inicial dos holders MKS
    </p>

    <div className="text-center text-lg text-yellow-400 font-mono bg-zinc-800 px-4 py-2 rounded-md inline-block">
      7.214.000 MKS restantes nesta fase
    </div>

    <div className="text-sm text-zinc-400">
      Recompensa ativa: <span className="text-green-400 font-bold">+14% ao mês stakeado</span>
    </div>

    <BrutalistCountdown date={endDate} />

    <button
      onClick={handleWhitelist}
      className="mt-4 inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
    >
      🔥 Comprar agora e validar acesso
    </button>

    <p className="text-xs text-zinc-500 mt-2 italic">
      *Ao comprar, sua carteira é registrada como participante da Fase I - $MKS.
    </p>
  </div>
</motion.aside>

        </motion.div>
      </div>
    </section>
  );
} 