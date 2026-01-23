/**
 * Cookie keys configuration
 * Centralized location for all cookie key names
 * 
 * @principle Single Source of Truth - All keys defined in one place
 */
export const COOKIE_KEYS = {
  /**
   * JWT authentication token
   */
  TOKEN: process.env.NEXT_PUBLIC_TOKEN_LOCAL!,

  /**
   * Selected module ID (tab-scoped)
   */
  MODULE: process.env.NEXT_PUBLIC_MODULE_LOCAL!,

  /**
   * Selected profile ID (tab-scoped)
   */
  PROFILE: process.env.NEXT_PUBLIC_PROFILE_LOCAL!,

  /**
   * User info object (JSON serialized)
   */
  USER: process.env.NEXT_PUBLIC_USER_LOCAL!,

  /**
   * Two-factor authentication code
   */
  TWO_AUTH: process.env.NEXT_PUBLIC_TWO_AUTH_LOCAL!,

  /**
   * Tab ID storage key (sessionStorage)
   */
  TAB_ID: process.env.NEXT_PUBLIC_TAB_ID_KEY || "app_tab_id",
} as const;

/**
 * Type for cookie key names
 */
export type CookieKeyName = keyof typeof COOKIE_KEYS;
