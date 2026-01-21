import type { EndpointBody, user_two_auth_code } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// User Two-Factor Authentication Code Types
// =============================================================================

export type UserTwoAuthCodeConfirmBody = EndpointBody<"/api/private/user_two_auth_code/confirm">;

/**
 * User Two-Factor Authentication Code endpoints
 */
export const userTwoAuthCodeEndpoint = {
  /**
   * Generate a new 2FA code
   */
  store: (id: string) =>
    typedRequest<user_two_auth_code>()({
      route: "/api/private/user_two_auth_code/store",
      params: { id },
    }),

  /**
   * Verify 2FA code
   */
  confirm: (id: string, body: UserTwoAuthCodeConfirmBody) =>
    typedRequest<void>()(
      {
        route: "/api/private/user_two_auth_code/confirm",
        params: { id },
        body,
      },
      { showSuccess: true }
    ),
};

export type UserTwoAuthCode = user_two_auth_code;

// Direct function exports for backwards compatibility
export const userTwoAuthCodeStore = userTwoAuthCodeEndpoint.store;
export const userTwoAuthCodeConfirm = userTwoAuthCodeEndpoint.confirm;
