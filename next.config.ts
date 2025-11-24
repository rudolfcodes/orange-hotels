import type { NextConfig } from "next";

// configure https://images.unsplash.com/
const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
