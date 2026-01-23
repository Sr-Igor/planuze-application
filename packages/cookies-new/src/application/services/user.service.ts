import type { IUserInfo } from "../../core/domain/entities/user-info.entity";
import { createEmptyUserInfo } from "../../core/domain/entities/user-info.entity";
import { getCookieStorage } from "../../infrastructure/adapters/js-cookie.adapter";
import { COOKIE_KEYS } from "../../shared/constants/cookie-keys.constant";

/**
 * User Service
 * Manages user info object storage with JSON serialization
 * 
 * @principle Single Responsibility - Only handles user info cookie
 * @principle Dependency Inversion - Depends on abstractions
 */
export const userService = {
  /**
   * Gets the current user info
   * Returns empty user info if not found or invalid
   */
  get(): IUserInfo {
    const storage = getCookieStorage();
    const value = storage.get(COOKIE_KEYS.USER);

    if (!value) {
      return createEmptyUserInfo();
    }

    try {
      return JSON.parse(value) as IUserInfo;
    } catch {
      return createEmptyUserInfo();
    }
  },

  /**
   * Sets the user info
   * @param data - User info to store
   */
  set(data: IUserInfo): void {
    const storage = getCookieStorage();
    storage.set(COOKIE_KEYS.USER, JSON.stringify(data));
  },

  /**
   * Removes the user info
   */
  remove(): void {
    const storage = getCookieStorage();
    storage.remove(COOKIE_KEYS.USER);
  },
};

// Re-export the interface for external use
export type { IUserInfo };

// Backwards-compatible exports
export const getUser = (): IUserInfo => userService.get();
export const setUser = async (data: IUserInfo): Promise<void> => {
  userService.set(data);
};
