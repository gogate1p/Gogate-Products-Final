import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@gogate/ui-kit', '@gogate/shared-types', '@gogate/payment-engine', '@gogate/logistics-engine', '@gogate/database'],
};

export default nextConfig;
