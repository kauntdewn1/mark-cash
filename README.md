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

3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
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