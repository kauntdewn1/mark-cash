/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['@web3auth/modal', 'firebase'],
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    config.cache = false; // Disable webpack caching
    return config;
  }
};

module.exports = nextConfig;