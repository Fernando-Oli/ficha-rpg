import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactStrictMode: false, // Desativa Strict Mode
  /* config options here */
  output: 'export',
  // assetPrefix: './',
  images: {
      unoptimized: true,
    },
};

export default nextConfig;