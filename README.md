# MarkCash ($MKS)

Token utilitário multi-chain para marketing digital descentralizado.

## Tecnologias

- Next.js 14
- TypeScript
- Tailwind CSS
- Web3Auth
- Firebase
- IPFS

## Funcionalidades

- Autenticação Web3
- Staking de tokens
- Terminal de preços em tempo real
- Interface retro com efeitos visuais
- Integração com múltiplas blockchains

## Configuração

1. Clone o repositório
```bash
git clone https://github.com/kauntdewn1/mark-cash.git
```

2. Instale as dependências
```bash
yarn install
```

2.1 Se já estiver trabalhando considere limpar o cache
```bash
yarn cache clean

Remover a pasta node_modules e o arquivo yarn.lock:
rm -rf node_modules yarn.lock

Reinstalar as dependências:
yarn install

2.3 Instala essas disgracas
```bash
yarn add wagmi viem
yarn add bs58 @solana/web3.js
yarn add date-fns
yarn add papaparse @types/papaparse
yarn add wagmi viem @tanstack/react-query
yarn add @web3auth/modal
yarn add @radix-ui/react-toast class-variance-authority lucide-react
yarn add clsx tailwind-merge
yarn add @web3auth/modal @web3auth/base
yarn add ethers@5.7.2

3. Configure as variáveis de ambiente
```bash
cp .env.local
```

4. Inicie o servidor de desenvolvimento
```bash
yarn dev
```

## Variáveis de Ambiente

- `NEXT_PUBLIC_WEB3AUTH_CLIENT_ID`
- `NEXT_PUBLIC_INFURA_RPC_URL`
- `NEXT_PUBLIC_MKS_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_ETHERSCAN_API_KEY`

## Deploy

### Netlify

1. Faça login no [Netlify](https://app.netlify.com)
2. Clique em "New site from Git"
3. Selecione o repositório do GitHub
4. Configure as variáveis de ambiente no painel do Netlify
5. Clique em "Deploy site"

O site será automaticamente atualizado quando houver novos commits na branch main.

## Licença

MIT 