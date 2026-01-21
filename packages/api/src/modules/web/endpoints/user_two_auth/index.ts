import type { EndpointBody, user_two_auth } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// User Two-Factor Authentication Types
// =============================================================================

export type UserTwoAuthStoreBody = EndpointBody<"/api/private/user_two_auth/store">;
export type UserTwoAuthUpdateBody = EndpointBody<"/api/private/user_two_auth/update">;
export type UserTwoAuthDestroyBody = EndpointBody<"/api/private/user_two_auth/destroy">;
export type UserTwoAuthConfirmBody = EndpointBody<"/api/private/user_two_auth/confirm">;

/**
 * User Two-Factor Authentication endpoints
 */
export const userTwoAuthEndpoint = {
  /**
   * Enable 2FA
   */
  store: (body: UserTwoAuthStoreBody) =>
    typedRequest<user_two_auth>()(
      {
        route: "/api/private/user_two_auth/store",
        body,
      },
      { showSuccess: true }
    ),

  /**
   * Update 2FA settings
   */
  update: (id: string, body: UserTwoAuthUpdateBody) =>
    typedRequest<user_two_auth>()(
      {
        route: "/api/private/user_two_auth/update",
        params: { id },
        body,
      },
      { showSuccess: true }
    ),

  /**
   * Disable 2FA
   */
  destroy: (id: string, body: UserTwoAuthDestroyBody) =>
    typedRequest<user_two_auth>()(
      {
        route: "/api/private/user_two_auth/destroy",
        params: { id },
        body,
      },
      { showSuccess: true }
    ),

  /**
   * Resend 2FA code
   */
  resend: (id: string) =>
    typedRequest<void>()(
      {
        route: "/api/private/user_two_auth/resend",
        params: { id },
      },
      { showSuccess: true }
    ),

  /**
   * Confirm 2FA setup
   */
  confirm: (id: string, body: UserTwoAuthConfirmBody) =>
    typedRequest<void>()(
      {
        route: "/api/private/user_two_auth/confirm",
        params: { id },
        body,
      },
      { showSuccess: true }
    ),
};

export type UserTwoAuth = user_two_auth;

// Direct function exports for backwards compatibility
export const userTwoAuthStore = userTwoAuthEndpoint.store;
export const userTwoAuthUpdate = userTwoAuthEndpoint.update;
export const userTwoAuthDestroy = userTwoAuthEndpoint.destroy;
export const userTwoAuthResend = userTwoAuthEndpoint.resend;
export const userTwoAuthConfirm = userTwoAuthEndpoint.confirm;
