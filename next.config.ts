import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.12"],
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
