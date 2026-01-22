import type { user } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type {
  AuthCodeParams,
  ChangePasswordDTO,
  LoginDTO,
  OwnerDTO,
  OwnerDTOInput,
  RecoveryDTO,
  ResetPasswordDTO,
  ResetPasswordParams,
} from "./auth.types";

/**
 * Authentication endpoints
 */
export const authEndpoint = {
  /**
   * Login with email and password
   */
  login: (body: LoginDTO) => typedRequest<user>()({ route: "/api/public/auth/login", body }),

  /**
   * Hydrate user session (get current user data)
   */
  hidrate: () => typedRequest<user>()({ route: "/api/private/auth/hidrate" }),

  /**
   * Confirm 2FA session
   */
  confirm: () => typedRequest<boolean>()({ route: "/api/private/auth/confirm" }),

  /**
   * Verify 2FA code
   */
  code: (params: AuthCodeParams) =>
    typedRequest<user>()({ route: "/api/private/auth/code", params }),

  /**
   * Request password recovery email
   */
  recovery: (body: RecoveryDTO) =>
    typedRequest<void>()({ route: "/api/public/auth/recovery", body }),

  /**
   * Reset password with recovery code
   */
  reset: (params: ResetPasswordParams, body: ResetPasswordDTO) =>
    typedRequest<void>()({ route: "/api/public/auth/reset", params, body }, { showSuccess: true }),

  /**
   * Change password for authenticated user
   */
  changePassword: (body: ChangePasswordDTO) =>
    typedRequest<void>()({ route: "/api/private/auth/reset", body }, { showSuccess: true }),

  /**
   * Register as owner (new company)
   * Note: OwnerDTOInput is flexible (Partial) for forms, but API accepts full OwnerDTO
   * The type assertion is safe because OwnerDTOInput includes required profile_id
   */
  owner: (body: OwnerDTOInput) =>
    typedRequest<void>()(
      { route: "/api/private/auth/owner", body: body as OwnerDTO },
      { showSuccess: true }
    ),
};
