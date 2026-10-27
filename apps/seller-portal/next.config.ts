import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (process.env.VERCEL ? '/seller' : undefined),
  transpilePackages: ['@gogate/ui-kit', '@gogate/shared-types', '@gogate/payment-engine', '@gogate/logistics-engine', '@gogate/database'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
