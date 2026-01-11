import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import initializeBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = initializeBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER_ENABLED === "true",
});

const withNextIntl = createNextIntlPlugin("../../packages/language/src/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    "@repo/ui",
    "@repo/fonts",
    "@repo/api",
    "@repo/tailwind-config",
    "@repo/language",
    "@repo/hooks",
  ],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "node:fs/promises": "fs/promises",
      "node:path": "path",
    };
    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
