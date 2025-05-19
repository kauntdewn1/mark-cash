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
  // Desabilita rotas API em modo estático
  rewrites: async () => {
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT) {
      return [];
    }
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  assetPrefix: 'https://markcash.eth.limo',
  basePath: '',
  trailingSlash: true,
};

module.exports = nextConfig;