'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BrutalistCountdown } from './BrutalistCountdown';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { useWeb3 } from '@/hooks/useWeb3';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const endDate = new Date(Date.now() + 1000 * 60 * 60 * 72); // 72 horas

export default function HeroSection() {
  const { address, login, isConnected } = useWeb3();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [remaining, setRemaining] = useState(7214000);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setRemaining(prev => Math.max(prev - Math.floor(Math.random() * 200 + 50), 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyAndValidate = async () => {
    setIsLoading(true);
    try {
      // 1. Login via Web3Auth
      if (!isConnected) {
        await login();
      }

      // 2. Registrar usuário no Firestore (coleção 'users')
      const userRef = doc(db, 'users', address!);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          walletAddress: address,
          createdAt: serverTimestamp(),
        });
      }

      // 3. Adicionar na whitelist (se necessário)
      await addDoc(collection(db, 'whitelist'), {
        wallet: address,
        phase: 'Phase I',
        timestamp: serverTimestamp(),
        status: 'whitelisted',
      });

      // 4. Feedback visual
      toast({
        title: "Sucesso!",
        description: "Acesso validado e wallet registrada!",
      });

      // 5. Redirecionar para Uniswap
      window.open(
        'https://app.uniswap.org/#/swap?outputCurrency=0x58edcf4b0ae4591b873664734fd6731ae1aae962',
        '_blank'
      );
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao validar acesso. Verifique sua wallet.",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return <div className="min-h-[50vh] flex items-center justify-center">Carregando...</div>;
  }

  return (
    <section className="relative min-h-[140vh] flex items-start justify-center overflow-hidden pt-32">
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
          <div className="relative w-92 md:w-96 mx-auto mb-2" style={{ aspectRatio: 1 }}>
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
  className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-12"
>
  A moeda oficial do marketing de guerrilha digital.
</motion.p>

<motion.h1
  className="tw-text-display-2lg font-bold text-[#ac134c] font-mono"
  animate={{
    textShadow: [
      "0 0 5px rgb(ac134c)",
      "0 0 10px rgb(ac134c)",
      "0 0 15px rgb(223, 15, 95)"
    ]
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  1.000.000.000
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
  className="bg-gradient-to-t from-black via-zinc-900 border-2 border-zinc-900 text-white p-6 rounded-xl text-center shadow-xl mt-10 relative overflow-hidden"
>
  <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900 -z-10" />
  
  <div className="relative z-10 space-y-4">
  <h2 className="text-4xl font-satoshi tracking-tight">
      FASE I : A Revolução Começa Aqui
    </h2>

    <p className="text-sm text-zinc-300">
      Acesso prioritário garantido para carteiras conectadas <br />
      Whitelist ativa para quem acredita no poder do marketing de guerrilha digital
    </p>
    <br />
    <div className="mt-6">
          <motion.p
            className="tw-text-display-2lg font-bold text-[#ac134c] font-mono"
            animate={{
              textShadow: [
                "0 0 5px rgb(172, 19, 76)",
                "0 0 10px rgb(172, 19, 76)",
                "0 0 15px rgb(223, 15, 95)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {remaining.toLocaleString()}
          </motion.p>
      <p className="text-sm text-zinc-400 mt-1 uppercase tracking-wide">
    $MKS disponíveis nesta fase inicial
    </p>
    </div>


    <div className="text-sm text-zinc-400">
      Recompensa ativa: <span className="text-green-400 font-bold">+14% ao mês stakeado</span>
    </div>
    <div className="text-sm text-zinc-400">
    Contagem regressiva para o encerramento da Fase I
    </div> 
    <br />
    <BrutalistCountdown date={endDate} />

    <button
      onClick={handleBuyAndValidate}
      disabled={isLoading}
      className="mt-6 inline-block bg-[#ac134c] hover:bg-[#ac134c] text-white font-medium text-sm md:text-base px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ac134c]/60"
    >
      {isLoading ? "Processando..." : "Acessar Fase I"}
    </button>

    <p className="text-xs text-zinc-500 mt-2 italic">
    Ao adquirir, sua carteira entra oficialmente na Fase I e participa da distribuição inicial de poder do ecossistema MKS.
    </p>
  </div>
</motion.aside>

        </motion.div>
      </div>
    </section>
  );
} 