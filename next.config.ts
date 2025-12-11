import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Trailing slashes help with GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
