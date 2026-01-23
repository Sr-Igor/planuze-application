import type { InternalAxiosRequestConfig } from "axios";

import { getModule, getProfile, getToken, getTwoAuth } from "@repo/cookies";
import { store } from "@repo/redux/store";

/**
 * Authentication interceptor
 * Adds authentication headers to requests
 */
export const authInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const token = getToken();
  const twoAuthCode = getTwoAuth();

  // Get moduleId and profileId with fallback to Redux store
  let moduleId = getModule();
  let profileId = getProfile();

  // Fallback to Redux store if cookies are not available
  if (!moduleId || !profileId) {
    const state = store.getState() as any;
    moduleId = moduleId || state.module?.moduleId;
    profileId = profileId || state.module?.profileId;
  }

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
