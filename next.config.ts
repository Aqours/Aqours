import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 31536000, // 1 year
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index.html",
      },
    ];
  },
};

export default nextConfig;
