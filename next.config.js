/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Otimizações para produção
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const match = module.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                return match ? `vendor.${match[1].replace('@', '')}` : 'vendor';
              },
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    // Fallbacks para módulos do Node.js
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      assert: require.resolve('assert'),
      os: require.resolve('os-browserify'),
      path: require.resolve('path-browserify'),
      'process/browser': require.resolve('process/browser'),
    };

    // Configurações adicionais
    config.externals = [...(config.externals || []), { bufferutil: 'bufferutil', 'utf-8-validate': 'utf-8-validate' }];
    config.ignoreWarnings = [{ module: /node_modules\/@walletconnect/ }];
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules/,
    };

    return config;
  },
  // Configuração para exportação estática
  trailingSlash: true,
  // Removido assetPrefix temporariamente para debug
  // assetPrefix: 'https://markcash.eth.limo',
};

module.exports = nextConfig;