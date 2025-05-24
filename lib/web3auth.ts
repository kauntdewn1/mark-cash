import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';

export const web3auth = new Web3Auth({
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
  web3AuthNetwork: 'mainnet',
  enableLogging: true,
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    network: 'mainnet',
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
  },
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1',
    rpcTarget: 'https://rpc.ankr.com/eth',
    displayName: 'Ethereum Mainnet',
    blockExplorerUrl: 'https://etherscan.io',
    ticker: 'ETH',
    tickerName: 'Ethereum',
  },
});

(web3auth as any).configureAdapter?.(openloginAdapter);