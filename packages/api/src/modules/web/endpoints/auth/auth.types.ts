import type { EndpointBody, EndpointParams } from "@repo/types";

// =============================================================================
// Auth DTOs - derived directly from API endpoint types
// =============================================================================

/**
 * Login request payload
 */
export type LoginDTO = EndpointBody<"/api/public/auth/login">;

/**
 * Password recovery request
 */
export type RecoveryDTO = EndpointBody<"/api/public/auth/recovery">;

/**
 * Password reset request (public route)
 * Requires code param separately
 */
export type ResetPasswordDTO = EndpointBody<"/api/public/auth/reset">;
export type ResetPasswordParams = EndpointParams<"/api/public/auth/reset">;

/**
 * Change password request (private route)
 */
export type ChangePasswordDTO = EndpointBody<"/api/private/auth/reset">;

/**
 * Owner transfer request (strict - as expected by API)
 */
export type OwnerDTO = EndpointBody<"/api/private/auth/owner">;

/**
 * Owner transfer request (flexible - for forms that don't require current_password)
 * Use this when the UI doesn't require password confirmation
 */
export type OwnerDTOInput = Partial<OwnerDTO> & Pick<OwnerDTO, "profile_id">;

/**
 * 2FA code verification params
 */
export type AuthCodeParams = EndpointParams<"/api/private/auth/code">;
