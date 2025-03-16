import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: [
      "cdn.mos.cms.futurecdn.net",
      "cdn.royalcanin-weshare-online.io",
      "www.rainforest-alliance.org",
    ],
  },
};

export default nextConfig;
