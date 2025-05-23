'use client';

import { useAccount, useConnect } from 'wagmi';

export function useWeb3() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  const login = async () => {
    if (connectors[0]) {
      await connect({ connector: connectors[0] });
    }
  };

  return {
    address,
    isConnected,
    login,
    loading: false
  };
} 