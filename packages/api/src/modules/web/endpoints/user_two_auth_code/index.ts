import type { user_two_auth_code } from "@repo/types";

import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * User Two-Factor Authentication Code endpoints
 */
export const userTwoAuthCodeEndpoint = {
  /**
   * Generate a new 2FA code
   */
  store: async (id: string) => {
    return handleRequest<user_two_auth_code>(
      "POST",
      `/api/private/user_two_auth_code/store`,
      undefined,
      { params: { id } }
    );
  },

  /**
   * Verify 2FA code
   */
  confirm: async (id: string, body: any) => {
    return handleRequest(
      "POST",
      `/api/private/user_two_auth_code/confirm`,
      body,
      { params: { id } },
      { showSuccess: true }
    );
  },
};

export type UserTwoAuthCode = user_two_auth_code;

// Direct function exports for backwards compatibility
export const userTwoAuthCodeStore = userTwoAuthCodeEndpoint.store;
export const userTwoAuthCodeConfirm = userTwoAuthCodeEndpoint.confirm;
