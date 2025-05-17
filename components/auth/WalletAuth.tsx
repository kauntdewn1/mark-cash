'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Web3Auth } from '@web3auth/modal';
import { Button } from '@/components/ui/button';

export function WalletAuth() {
  const { login, logout, isAuthenticated, loading } = useAuth();
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
          chainConfig: {
            chainNamespace: 'eip155',
            chainId: '0x1',
            rpcTarget: 'https://rpc.ankr.com/eth',
            displayName: 'Ethereum Mainnet',
            blockExplorer: 'https://etherscan.io',
            ticker: 'ETH',
            tickerName: 'Ethereum',
          },
          web3AuthNetwork: 'mainnet',
          enableLogging: true,
        });

        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);
      } catch (error) {
        console.error('Erro ao inicializar Web3Auth:', error);
      }
    };

    init();
  }, []);

  const handleLogin = async () => {
    if (!web3auth) return;

    try {
      const web3authProvider = await web3auth.connect();
      if (!web3authProvider) return;

      const accounts = await web3authProvider.request({ method: 'eth_accounts' }) as string[];
      const walletAddress = accounts[0];

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });

      const { firebaseToken } = await res.json();
      await login(firebaseToken);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    }
  };

  const handleLogout = async () => {
    if (!web3auth) return;

    try {
      await web3auth.logout();
      await logout();
    } catch (error) {
      console.error('Erro ao desconectar carteira:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <Button onClick={handleLogout} variant="outline">
          Desconectar Carteira
        </Button>
      ) : (
        <Button onClick={handleLogin} variant="default">
          Conectar Carteira
        </Button>
      )}
    </div>
  );
} 