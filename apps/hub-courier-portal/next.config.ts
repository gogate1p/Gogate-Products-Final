import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (process.env.VERCEL ? '/hub' : undefined),
  transpilePackages: ['@gogate/ui-kit', '@gogate/shared-types', '@gogate/payment-engine', '@gogate/logistics-engine', '@gogate/database'],
};

export default nextConfig;
