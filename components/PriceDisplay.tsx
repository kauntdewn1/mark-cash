'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NFTData {
  tokenId: string;
  contractAddress: string;
}

interface PriceDisplayProps {
  tokenGeckoId?: string;
  tokenSymbol?: string;
  nftData?: NFTData;
}

async function getTokenSupply(contractAddress: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.etherscan.io/v2/api?chainid=1&module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`);
    
    if (!response.ok) {
      console.error('Failed to fetch token supply from Etherscan');
      return null;
    }

    const data = await response.json();
    
    if (data.status === '1' && data.result) {
      // Converte o supply de wei para ETH
      const supplyInEth = parseFloat(data.result) / 1e18;
      return supplyInEth.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching token supply:', error);
    return null;
  }
}

const PriceDisplay: FC<PriceDisplayProps> = ({ nftData }) => {
  const [showTerminal, setShowTerminal] = useState(true);
  const [supply, setSupply] = useState<string | null>(null);

  useEffect(() => {
    if (nftData?.contractAddress) {
      getTokenSupply(nftData.contractAddress).then(setSupply);
    }
  }, [nftData?.contractAddress]);

  return (
    <motion.div
      className="relative aspect-square bg-black text-lime-400 font-mono text-left p-4 border border-lime-500 max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 5 }}
      transition={{ duration: 1 }}
    >
      <div className="scanline" />
      <div className="crt-effect" />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span>C:\\MKS\\STATUS.EXE</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-lime-400 font-mono text-sm">→ Q1 - Fase de implantação de sistema</p>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-xl mb-7 font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">TOKEN: $MKS/ETH</p>
          {supply && (
            <p className="text-lime-400 font-mono text-sm mb-4">
              Supply Total: {supply} MKS
            </p>
          )}
          <p className="mt-2 text-lime-400 font-mono text-sm">
            __?names=Web3Auth!=!<span className="animate-blink">_</span>
          </p>
          <p className="mt-2 text-lime-400 font-mono text-sm">
            __?stack=Firebase+IPFS!=!<span className="animate-blink">_</span>
          </p>
          <p className="mt-2 text-lime-400 font-mono text-sm">
            __?core=$MKS!=!<span className="animate-blink">_</span>
          </p>
        </div>

        <div className="mt-auto">
          <div className="bg-lime-400 text-black p-2 mb-2">
            <p className="font-bold">[MENSAGEM DO SISTEMA]</p>
          </div>
          <p className="whitespace-pre-line text-sm">
            {"\"Enquanto todos buscam visibilidade,\nvocê já entendeu o valor.\""}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceDisplay; 