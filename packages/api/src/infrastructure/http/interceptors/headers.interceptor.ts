import type { InternalAxiosRequestConfig } from "axios";

import { fingerprint } from "@repo/utils";

/**
 * Default headers interceptor
 * Adds common headers to all requests
 */
export const headersInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  // Default timeout
  config.timeout = config.timeout ?? 240000;

  // Device fingerprint
  const visitorId = await fingerprint();
  if (visitorId) {
    config.headers["x-device"] = visitorId;
  }

  // Locale based on URL (client-side only)
  if (globalThis.window !== undefined) {
    const locale = globalThis.window.location.pathname.split("/")[1]?.split("-")[0] || "pt";
    config.headers["Accept-Language"] = locale;
  }

  return config;
};
