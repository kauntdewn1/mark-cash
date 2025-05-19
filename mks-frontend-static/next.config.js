/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['@web3auth/modal'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    config.cache = false;
    return config;
  }
};

module.exports = nextConfig; 