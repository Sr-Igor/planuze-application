/**
 * @repo/cookies-new
 * 
 * Cookie management library built with SOLID principles and Clean Architecture.
 * Provides type-safe cookie storage with tab isolation support.
 */

// ============================================================================
// Core Layer Exports (Types & Interfaces)
// ============================================================================

export type {
  ICookieStorage,
  CookieOptions,
} from "./core/domain/interfaces/cookie-storage.interface";

export type { IUserInfo } from "./core/domain/entities/user-info.entity";
export { createEmptyUserInfo } from "./core/domain/entities/user-info.entity";

export { CookieKey } from "./core/domain/value-objects/cookie-key.vo";

// ============================================================================
// Infrastructure Layer Exports
// ============================================================================

export {
  JsCookieAdapter,
  getCookieStorage,
  setCookieStorage,
} from "./infrastructure/adapters/js-cookie.adapter";

export { tabIdService } from "./infrastructure/services/tab-id.service";
export { pushNotificationService } from "./infrastructure/services/push-notification.service";

// ============================================================================
// Application Layer - Services
// ============================================================================

export {
  tokenService,
  getToken,
  setToken,
} from "./application/services/token.service";

export {
  moduleService,
  getModule,
  setModule,
} from "./application/services/module.service";

export {
  profileService,
  getProfile,
  setProfile,
} from "./application/services/profile.service";

export {
  userService,
  getUser,
  setUser,
} from "./application/services/user.service";

export {
  twoAuthService,
  getTwoAuth,
  setTwoAuth,
} from "./application/services/two-auth.service";

export {
  signoutService,
  cleanCookies,
} from "./application/services/signout.service";

// ============================================================================
// Application Layer - Hooks
// ============================================================================

export { useTabId } from "./application/hooks/use-tab-id.hook";
export { useSignOut } from "./application/hooks/use-signout.hook";

// ============================================================================
// Shared Layer
// ============================================================================

export { COOKIE_KEYS } from "./shared/constants/cookie-keys.constant";
export type { CookieKeyName } from "./shared/constants/cookie-keys.constant";
export { cookieConfig } from "./shared/config/cookie-config";

// ============================================================================
// Legacy Compatibility - Default Export (matches old package)
// ============================================================================

import { getCookieStorage } from "./infrastructure/adapters/js-cookie.adapter";

/**
 * Default cookie operations (backwards compatible with old package)
 */
const Cookies = {
  get: (key: string) => getCookieStorage().get(key),
  set: (key: string, value: string) => getCookieStorage().set(key, value),
  remove: (key: string) => getCookieStorage().remove(key),
  getAll: () => getCookieStorage().getAll(),
  options: {},
};

export default Cookies;
