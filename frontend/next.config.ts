import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lite-tech-api.litebox.ai',
      },
      {
        protocol: 'https',
        hostname: 'test-backend-production-41a9.up.railway.app',
      },
    ],
  },
};

export default nextConfig;
