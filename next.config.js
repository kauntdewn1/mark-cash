/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    optimizePackageImports: ['@web3auth/modal', 'firebase'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    config.cache = false; // Disable webpack caching
    config.resolve.alias['@react-native-async-storage/async-storage'] = false;
    return config;
  },
  // Configuração para exportação estática
  trailingSlash: true,
  // Removido assetPrefix temporariamente para debug
  // assetPrefix: 'https://markcash.eth.limo',
};

module.exports = nextConfig;