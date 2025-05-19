/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
    return config;
  },
  assetPrefix: 'https://markcash.eth.limo',
  basePath: '',
  trailingSlash: true,
};

module.exports = nextConfig;