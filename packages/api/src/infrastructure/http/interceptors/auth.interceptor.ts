import type { InternalAxiosRequestConfig } from "axios";

import { getModule, getProfile, getToken, getTwoAuth } from "@repo/cookies";

/**
 * Authentication interceptor
 * Adds authentication headers to requests
 */
export const authInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const token = getToken();
  const moduleId = getModule();
  const profileId = getProfile();
  const twoAuthCode = getTwoAuth();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (moduleId) {
    config.headers["x-module"] = moduleId;
  }

  if (profileId) {
    config.headers["x-profile"] = profileId;
  }

  if (twoAuthCode) {
    config.headers["x-code"] = twoAuthCode;
  }

  return config;
};
