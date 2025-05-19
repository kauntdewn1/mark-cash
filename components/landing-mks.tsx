"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, ChevronsUp, Webhook, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { auth } from "@/firebase/firebase-config";
import dynamic from 'next/dynamic';

// Importação dinâmica dos componentes
const HeroSection = dynamic(() => import('./HeroSection'), { ssr: false });
const PriceDisplay = dynamic(() => import('./PriceDisplay'), { ssr: false });

// Funções de staking (mock - implementar com sua lógica real)
const checkStakeStatus = async (wallet: string) => {
  // Implementar verificação real do status de staking
  return { staked: false };
};

const stakeWallet = async (wallet: string) => {
  // Implementar lógica real de staking
  return true;
};

export default function LandingMKS() {
  const [wallet, setWallet] = useState<string>("");
  const [isStaked, setIsStaked] = useState<boolean>(false);

  useEffect(() => {
    if (!wallet) return;
    checkStakeStatus(wallet).then((res) => {
      setIsStaked(res.staked);
    });
  }, [wallet]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro no login com Google:", error);
    }
  };

  const handleWeb3Login = async () => {
    try {
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1",
        rpcTarget: process.env.NEXT_PUBLIC_INFURA_RPC_URL || "https://mainnet.infura.io/v3/YOUR_INFURA_ID",
        displayName: "Ethereum Mainnet",
        blockExplorer: "https://etherscan.io",
        ticker: "ETH",
        tickerName: "Ethereum"
      };

      const web3auth = new Web3Auth({
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
        web3AuthNetwork: "mainnet",
        chainConfig: chainConfig,
        enableLogging: true,
      });

      await web3auth.initModal();
      const web3authProvider = await web3auth.connect();
      
      if (web3authProvider) {
        const accounts = await web3authProvider.request({ method: "eth_accounts" }) as string[];
        if (accounts && accounts.length > 0) {
          setWallet(accounts[0]);
        }
      }
    } catch (error) {
      console.error("Erro no login com Web3Auth:", error);
    }
  };

  const handleStakeClick = async () => {
    if (!wallet) {
      // Se não tiver wallet, tenta conectar primeiro
      await handleWeb3Login();
      return;
    }
    await stakeWallet(wallet);
    setIsStaked(true);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: { 
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      <HeroSection />

      <div className="px-4 sm:px-6 py-12 flex flex-col gap-12">
        <motion.section 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={fadeIn}
          >
            <Card className="bg-zinc-900 border border-zinc-700 h-full">
              <CardContent className="p-6 space-y-4">
                <div className="mb-4">
                  <ChevronsUp className="h-10 w-10 text-[#c72262]" />
                </div>
                <h2 className="text-xl font-semibold">Por que $MKS?</h2>
                <p className="text-gray-400">
                  Big Techs dominaram o marketing. Com $MKS, você reconquista seu alcance, sua base e sua receita sem intermediários.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeIn}
          >
            <Card className="bg-zinc-900 border border-zinc-700 h-full">
              <CardContent className="p-6 space-y-4">
                <div className="mb-4">
                  <Webhook className="h-8 w-8 text-[#c72262]" />
                </div>
                <h2 className="text-xl font-semibold">Infraestrutura Real</h2>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#c72262]"/> Firebase + IPFS + Web3Auth</li>
                  <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#c72262]"/> MiniApps com IA e Dashboards</li>
                  <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#c72262]"/> Token gating, staking, badges</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeIn}
          >
            <Card className="bg-zinc-900 border border-zinc-700 h-full">
              <CardContent className="p-6 space-y-4">
                <div className="mb-4">
                  <Shield className="h-8 w-8 text-[#c72262]" />
                </div>
                <h2 className="text-xl font-semibold">Como Participar</h2>
                <ol className="text-gray-400 list-decimal list-inside space-y-2">
                  <li className="pl-2">Conecte sua carteira</li>
                  <li className="pl-2">Entre na whitelist</li>
                  <li className="pl-2">Receba, stake ou utilize o $MKS</li>
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-4xl mx-auto w-full"
        >
          <Card className="bg-zinc-900 border border-lime-400/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h1 className="text-[#c72262] font-bold text-xl mb-2">1,000,000</h1>
                  <p className="text-gray-400 text-sm">Total de tokens $MKS</p>
                </div>
                <div>
                  <h1 className="text-[#c72262] font-bold text-xl mb-2">25%</h1>
                  <p className="text-gray-400 text-sm">Alocado para comunidade</p>
                </div>
                <div>
                  <h1 className="text-[#c72262] font-bold text-xl mb-2">Q2 2024</h1>
                  <p className="text-gray-400 text-sm">Lançamento previsto</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Seção de Participação */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Coluna da Esquerda - PriceDisplay */}
              <div className="flex justify-center">
                <PriceDisplay nftData={{ tokenId: "1", contractAddress: process.env.NEXT_PUBLIC_MKS_CONTRACT_ADDRESS || "" }} />
              </div>

              {/* Coluna da Direita - Participação */}
              <div className="space-y-8">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-center lg:text-left"
                >
                  Em breve você poderá participar do Ecossistema
                </motion.h3>

                <div className="bg-gray-800/50 border border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center gap-4 opacity-60 cursor-not-allowed select-none">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-400 text-center lg:text-left"
                  >
                    Faça parte da revolução do marketing descentralizado. Stake seus tokens e ganhe recompensas.
                  </motion.p>
                  <button
                    className="mt-2 px-6 py-2 rounded bg-gray-700 text-gray-400 font-semibold opacity-70 cursor-not-allowed"
                    disabled
                  >
                    Stake (em breve)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
    </main>
  );
}