import { getCookieStorage } from "../../infrastructure/adapters/js-cookie.adapter";
import { COOKIE_KEYS } from "../../shared/constants/cookie-keys.constant";

/**
 * Token Service
 * Manages JWT authentication token storage
 * 
 * @principle Single Responsibility - Only handles token CRUD
 * @principle Dependency Inversion - Depends on ICookieStorage abstraction
 */
export const tokenService = {
  /**
   * Gets the current authentication token
   */
  get(): string | undefined {
    const storage = getCookieStorage();
    return storage.get(COOKIE_KEYS.TOKEN);
  },

  /**
   * Sets the authentication token
   * @param token - JWT token to store
   */
  set(token: string): void {
    if (!token) return;
    const storage = getCookieStorage();
    storage.set(COOKIE_KEYS.TOKEN, token);
  },

  /**
   * Removes the authentication token
   */
  remove(): void {
    const storage = getCookieStorage();
    storage.remove(COOKIE_KEYS.TOKEN);
  },
};

// Backwards-compatible exports
export const getToken = (): string | undefined => tokenService.get();
export const setToken = async (token: string): Promise<void> => {
  tokenService.set(token);
};
