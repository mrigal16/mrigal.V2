import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://mrigal.digitservz.dz/:path*",
        permanent: true, // 308 status for permanent redirect
      },
    ];
  },
};

export default nextConfig;
