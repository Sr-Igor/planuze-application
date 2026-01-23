import { getCookieStorage } from "../../infrastructure/adapters/js-cookie.adapter";
import { COOKIE_KEYS } from "../../shared/constants/cookie-keys.constant";

/**
 * Two-Factor Auth Service
 * Manages two-factor authentication code storage
 * 
 * @principle Single Responsibility - Only handles 2FA code cookie
 * @principle Dependency Inversion - Depends on abstractions
 */
export const twoAuthService = {
  /**
   * Gets the current two-factor auth code
   */
  get(): string | undefined {
    const storage = getCookieStorage();
    return storage.get(COOKIE_KEYS.TWO_AUTH);
  },

  /**
   * Sets the two-factor auth code
   * @param code - 2FA code to store
   */
  set(code: string): void {
    if (!code) return;
    const storage = getCookieStorage();
    storage.set(COOKIE_KEYS.TWO_AUTH, code);
  },

  /**
   * Removes the two-factor auth code
   */
  remove(): void {
    const storage = getCookieStorage();
    storage.remove(COOKIE_KEYS.TWO_AUTH);
  },
};

// Backwards-compatible exports
export const getTwoAuth = (): string | undefined => twoAuthService.get();
export const setTwoAuth = async (code: string): Promise<void> => {
  twoAuthService.set(code);
};
