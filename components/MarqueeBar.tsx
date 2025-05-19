import React from 'react';

export function MarqueeBar() {
  return (
    <div className="w-full bg-black border-t border-b border-gray-800 py-2 overflow-hidden whitespace-nowrap">
      <span className="inline-block animate-marquee text-green-500 font-mono text-base md:text-lg px-4">
        $MKS — Governance e staking off-chain em desenvolvimento — $MKS — Utilidade real para automações de marketing — $MKS — Acesse o grupo para mais informações, link no rodapé.
      </span>
    </div>
  );
} 