import type { NextConfig } from "next";
import tailwindcss from "@tailwindcss/vite";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;