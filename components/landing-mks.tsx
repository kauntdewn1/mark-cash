"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, ChevronsUp, Webhook, Shield } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { useAccount, useConnect } from 'wagmi';
import { MarqueeBar } from '@/components/MarqueeBar';


// Importação dinâmica dos componentes
const HeroSection = dynamic(() => import('./HeroSection'), { 
  ssr: false,
  loading: () => <div className="min-h-[50vh] flex items-center justify-center">Carregando...</div>
});

const PriceDisplay = dynamic(() => import('./PriceDisplay'), { 
  ssr: false,
  loading: () => <div className="aspect-square bg-black border border-lime-500 flex items-center justify-center">Carregando...</div>
});


export default function LandingMKS() {
  useAccount();
  useConnect();

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
                  <h1 className="text-[#c72262] font-bold text-xl mb-2">Q2 2025/2</h1>
                  <p className="text-gray-400 text-sm">Lançamento programado</p>
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
                  Estatísticas do Token
                </motion.h3>

                <div className="bg-gray-800/50 border border-gray-400 rounded-lg p-6 flex flex-col items-center gap-4">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-gray-900/50 p-4 rounded-lg text-center"
                    >
                      <p className="text-sm text-gray-400">Holders</p>
                      <p className="text-2xl font-bold text-yellow-500">1,234</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="bg-gray-900/50 p-4 rounded-lg text-center"
                    >
                      <p className="text-sm text-gray-400">Volume 24h</p>
                      <p className="text-2xl font-bold text-green-500">$45.2K</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="bg-gray-900/50 p-4 rounded-lg text-center"
                    >
                      <p className="text-sm text-gray-400">Liquidez</p>
                      <p className="text-2xl font-bold text-blue-500">$128.5K</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="bg-gray-900/50 p-4 rounded-lg text-center"
                    >
                      <p className="text-sm text-gray-400">Preço</p>
                      <p className="text-2xl font-bold text-pink-500">$0.00012</p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 text-center"
                  >
                    <a
                      href="https://app.uniswap.org/#/swap?outputCurrency=0x58edcf4b0ae4591b873664734fd6731ae1aae962"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 rounded bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition-colors"
                    >
                      Comprar no Uniswap
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <MarqueeBar />
    </main>
  );
}
