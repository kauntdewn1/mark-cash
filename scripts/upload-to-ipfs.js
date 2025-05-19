require('dotenv').config({ path: '.env.local' });
const { Web3Storage } = require('web3.storage');
const path = require('path');
const fs = require('fs');

// Configuração do cliente Web3Storage
const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

async function uploadToIPFS() {
  try {
    if (!process.env.WEB3_STORAGE_TOKEN) {
      throw new Error('WEB3_STORAGE_TOKEN não encontrado no .env.local');
    }

    console.log('Iniciando upload para Web3.Storage...');
    
    // Usa o comando CLI do web3.storage
    const { execSync } = require('child_process');
    const result = execSync('npx web3.storage put ./out --name=markcash.eth', { encoding: 'utf-8' });
    
    console.log('Upload concluído!');
    console.log(result);
    
  } catch (error) {
    console.error('Erro durante o upload:', error);
    process.exit(1);
  }
}

uploadToIPFS(); 