import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/humphcey-portfolio",
  assetPrefix: "/humphcey-portfolio",
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
