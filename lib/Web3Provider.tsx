'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';

interface Web3ContextType {
  web3auth: Web3Auth | null;
  loading: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType>({
  web3auth: null,
  loading: true,
  error: null,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
          web3AuthNetwork: 'sapphire_devnet',
          enableLogging: true,
        });

        await web3authInstance.init();
        setWeb3auth(web3authInstance);
      } catch (error) {
        console.error('Erro ao inicializar Web3Auth:', error);
        setError('Erro ao inicializar autenticação');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <Web3Context.Provider value={{ web3auth, loading, error }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) throw new Error('useWeb3 must be used within a Web3Provider');
  return context;
}; 