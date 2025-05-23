'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { ethers } from 'ethers';

const Web3Context = createContext<any>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const init = async () => {
      try {
        const instance = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
          web3AuthNetwork: 'mainnet',
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x1',
            rpcTarget: 'https://rpc.ankr.com/eth',
            displayName: 'Ethereum Mainnet',
            blockExplorer: 'https://etherscan.io',
            ticker: 'ETH',
            tickerName: 'Ethereum',
          },
        });

        await instance.init();
        setWeb3auth(instance);

        if (instance.provider) {
          const ethersProvider = new ethers.providers.Web3Provider(instance.provider);
          const signer = ethersProvider.getSigner();
          const userAddress = await signer.getAddress();

          setProvider(ethersProvider);
          setAddress(userAddress);
        }

        setLoading(false);
      } catch (err) {
        console.error('Erro ao iniciar Web3Auth:', err);
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) return;
    const connectedProvider = await web3auth.connect();
    const ethersProvider = new ethers.providers.Web3Provider(connectedProvider);
    const signer = ethersProvider.getSigner();
    const userAddress = await signer.getAddress();

    setProvider(ethersProvider);
    setAddress(userAddress);
  };

  const logout = async () => {
    if (!web3auth) return;
    await web3auth.logout();
    setProvider(null);
    setAddress(null);
  };

  return (
    <Web3Context.Provider value={{ login, logout, provider, address, loading }}>
      {children}
    </Web3Context.Provider>
  );
}; 