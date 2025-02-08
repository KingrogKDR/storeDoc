import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cloud.appwrite.io"], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
