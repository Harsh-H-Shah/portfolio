import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Served at https://harsh-h-shah.github.io/portfolio/
  basePath: '/portfolio',
  images: {
    unoptimized: true,
  },
  // Trailing slashes help with GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
