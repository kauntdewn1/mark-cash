import { Web3Storage } from 'web3.storage';
import { ethers } from 'ethers';

// Configuração do Web3.Storage
const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_CLIENT_KEY || '' });

export const generateENSContentHash = async (data: any) => {
  try {
    // Criar arquivo para upload
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const file = new File([blob], 'ens-content.json', { type: 'application/json' });
    
    // Upload para IPFS via web3.storage
    const cid = await client.put([file]);
    
    // Converter CID para formato ENS (ipfs://)
    const ensContentHash = `ipfs://${cid}`;
    
    // Gerar hash keccak256 do conteúdo (formato que o ENS espera)
    const contentHash = ethers.keccak256(ethers.toUtf8Bytes(ensContentHash));
    
    return {
      cid,
      ensContentHash,
      contentHash
    };
  } catch (error) {
    console.error('Erro ao gerar Content Hash do ENS:', error);
    throw error;
  }
};

export const getENSContent = async (cid: string) => {
  try {
    const res = await client.get(cid);
    if (!res) throw new Error('CID não encontrado');
    
    const files = await res.files();
    if (files.length === 0) throw new Error('Nenhum arquivo encontrado');
    
    const text = await files[0].text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Erro ao buscar conteúdo do ENS:', error);
    throw error;
  }
}; 