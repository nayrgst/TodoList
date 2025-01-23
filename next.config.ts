import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { 
        protocol: "https",
        hostname: "https://lh3.googleusercontent.com/",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ]
  }
};

export default nextConfig;
