'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { ethers } from 'ethers';

interface Web3ContextType {
  web3auth: Web3Auth | null;
  provider: ethers.providers.Web3Provider | null;
  address: string | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType>({
  web3auth: null,
  provider: null,
  address: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
          web3AuthNetwork: 'sapphire_devnet',
          enableLogging: true,
        });

        await web3authInstance.init();
        setWeb3auth(web3authInstance);

        if (web3authInstance.provider) {
          const ethersProvider = new ethers.providers.Web3Provider(web3authInstance.provider);
          const signer = ethersProvider.getSigner();
          const userAddress = await signer.getAddress();

          setProvider(ethersProvider);
          setAddress(userAddress);
        }
      } catch (error) {
        console.error('Erro ao inicializar Web3Auth:', error);
        setError('Erro ao inicializar autenticação');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) return;
    try {
      const web3authProvider = await web3auth.connect();
      if (!web3authProvider) return;

      const ethersProvider = new ethers.providers.Web3Provider(web3authProvider);
      const signer = ethersProvider.getSigner();
      const userAddress = await signer.getAddress();

      setProvider(ethersProvider);
      setAddress(userAddress);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      setError('Erro ao conectar carteira');
    }
  };

  const logout = async () => {
    if (!web3auth) return;
    try {
      await web3auth.logout();
      setProvider(null);
      setAddress(null);
    } catch (error) {
      console.error('Erro ao desconectar carteira:', error);
      setError('Erro ao desconectar carteira');
    }
  };

  return (
    <Web3Context.Provider value={{ web3auth, provider, address, loading, error, login, logout }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) throw new Error('useWeb3 must be used within a Web3Provider');
  return context;
}; 