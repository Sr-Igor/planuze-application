import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import initializeBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

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
    "@repo/form",
    "@repo/tailwind-config",
    "@repo/language",
    "@repo/utils",
    "@repo/hooks",
    "@repo/redux",
    "@repo/assets",
  ],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  turbopack: {
    root: path.resolve(process.cwd(), "../../"),
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
    config.plugins = config.plugins || [];
    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
