import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    qualities: [75, 85],
  },
  trailingSlash: true,
};

export default nextConfig;
