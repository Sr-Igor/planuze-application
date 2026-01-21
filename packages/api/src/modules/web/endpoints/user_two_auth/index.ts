import type { user_two_auth } from "@repo/types";

import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * User Two-Factor Authentication endpoints
 */
export const userTwoAuthEndpoint = {
  /**
   * Enable 2FA
   */
  store: async (body: any) => {
    return handleRequest<user_two_auth>(
      "POST",
      "/api/private/user_two_auth/store",
      body,
      undefined,
      {
        showSuccess: true,
      }
    );
  },

  /**
   * Update 2FA settings
   */
  update: async (id: string, body: any) => {
    return handleRequest<user_two_auth>(
      "PUT",
      `/api/private/user_two_auth/update`,
      body,
      { params: { id } },
      { showSuccess: true }
    );
  },

  /**
   * Disable 2FA
   */
  destroy: async (id: string, body: any) => {
    return handleRequest<user_two_auth>(
      "DELETE",
      `/api/private/user_two_auth/destroy`,
      body,
      { params: { id } },
      { showSuccess: true }
    );
  },

  /**
   * Resend 2FA code
   */
  resend: async (id: string) => {
    return handleRequest(
      "POST",
      `/api/private/user_two_auth/resend`,
      undefined,
      { params: { id } },
      { showSuccess: true }
    );
  },

  /**
   * Confirm 2FA setup
   */
  confirm: async (id: string, body: any) => {
    return handleRequest(
      "POST",
      `/api/private/user_two_auth/confirm`,
      body,
      { params: { id } },
      { showSuccess: true }
    );
  },
};

export type UserTwoAuth = user_two_auth;

// Direct function exports for backwards compatibility
export const userTwoAuthStore = userTwoAuthEndpoint.store;
export const userTwoAuthUpdate = userTwoAuthEndpoint.update;
export const userTwoAuthDestroy = userTwoAuthEndpoint.destroy;
export const userTwoAuthResend = userTwoAuthEndpoint.resend;
export const userTwoAuthConfirm = userTwoAuthEndpoint.confirm;
