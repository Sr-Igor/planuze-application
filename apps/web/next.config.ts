import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import initializeBundleAnalyzer from "@next/bundle-analyzer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
    "@repo/form",
    "@repo/tailwind-config",
    "@repo/language",
    "@repo/utils",
    "@repo/hooks",
    "@repo/redux",
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
    config.plugins = config.plugins || [];
    config.plugins.push({
      apply: (compiler: any) => {
        compiler.hooks.normalModuleFactory.tap("HashAliasResolver", (nmf: any) => {
          nmf.hooks.beforeResolve.tap("HashAliasResolver", (data: any) => {
            if (data.request?.startsWith("#/")) {
              const contextPath = data.context || data.contextInfo?.issuer || "";
              const packagesMatch = contextPath.match(/packages\/([^/]+)\//);

              if (packagesMatch) {
                const packageName = packagesMatch[1];
                const packageSrcPath = path.resolve(
                  __dirname,
                  "../../packages",
                  packageName,
                  "src"
                );

                if (fs.existsSync(packageSrcPath)) {
                  const requestPath = data.request.replace(/^#\//, "");
                  data.request = path.join(packageSrcPath, requestPath);
                }
              }
            }
          });
        });
      },
    });

    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
