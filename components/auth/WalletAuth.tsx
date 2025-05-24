'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Web3Auth } from '@web3auth/modal';
import { Button } from '@/components/ui/button';
import { CHAIN_NAMESPACES } from '@web3auth/base';

export function WalletAuth() {
  const { login, logout, isAuthenticated, loading } = useAuth();
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
          web3AuthNetwork: 'mainnet',
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x1',
            rpcTarget: 'https://rpc.ankr.com/eth/28ef22650a74b0b5a294732f7e8fa069b8c0c8cc173cc1928822648ab2f515c4',
            displayName: 'Ethereum Mainnet',
            blockExplorer: 'https://etherscan.io',
            ticker: 'ETH',
            tickerName: 'Ethereum',
          },
          enableLogging: true,
        });

        await web3authInstance.init();
        setWeb3auth(web3authInstance);
      } catch (error) {
        console.error('Erro ao inicializar Web3Auth:', error);
        setError('Erro ao inicializar autenticação');
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
      setError('Erro ao conectar carteira');
    }
  };

  const handleLogout = async () => {
    if (!web3auth) return;

    try {
      await web3auth.logout();
      await logout();
    } catch (error) {
      console.error('Erro ao desconectar carteira:', error);
      setError('Erro ao desconectar carteira');
    }
  };

  if (loading) {
    return (
      <Button disabled variant="outline" className="bg-zinc-800 text-white hover:bg-zinc-700">
        Carregando...
      </Button>
    );
  }

  if (error) {
    return (
      <Button 
        onClick={handleLogin} 
        variant="outline" 
        className="bg-red-800 text-white hover:bg-red-700"
      >
        Tentar novamente
      </Button>
    );
  }

  return isAuthenticated ? (
    <Button 
      onClick={handleLogout} 
      variant="outline" 
      className="bg-zinc-800 text-white hover:bg-zinc-700"
    >
      Desconectar
    </Button>
  ) : (
    <Button
      onClick={handleLogin}
      className="relative group px-6 py-3 font-bold text-white bg-[rgb(170,20,77)] hover:bg-[rgb(140,15,60)] rounded-lg overflow-hidden transition-all shadow-md"
    >
      <span className="absolute inset-0 w-full h-full transform scale-110 opacity-30 bg-[rgb(170,20,77)] blur-2xl group-hover:opacity-50 transition-all duration-300"></span>
      <span className="relative z-10">⚡ Conectar Wallet</span>
    </Button>
  );
} 