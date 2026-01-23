import { getCookieStorage } from "../../infrastructure/adapters/js-cookie.adapter";
import { pushNotificationService } from "../../infrastructure/services/push-notification.service";
import { COOKIE_KEYS } from "../../shared/constants/cookie-keys.constant";

/**
 * Signout Service
 * Handles complete logout process including cleanup
 * 
 * @principle Single Responsibility - Only handles signout logic
 * @principle Dependency Inversion - Depends on abstractions
 */
export const signoutService = {
  /**
   * Clears all cookies
   */
  cleanCookies(): void {
    const storage = getCookieStorage();
    const cookies = storage.getAll();

    for (const cookie in cookies) {
      storage.remove(cookie);
    }
  },

  /**
   * Clears localStorage
   */
  clearLocalStorage(): void {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },

  /**
   * Performs complete signout
   * @param options - Signout options
   */
  async performSignout(options?: {
    redirect?: string;
    includeCallback?: boolean;
  }): Promise<void> {
    const { redirect, includeCallback = false } = options ?? {};

    // Unsubscribe from push notifications
    await pushNotificationService.unsubscribe();

    // Clear localStorage
    this.clearLocalStorage();

    // Remove token
    const storage = getCookieStorage();
    storage.remove(COOKIE_KEYS.TOKEN);

    // Clean all cookies
    this.cleanCookies();

    // Redirect
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      if (redirect) {
        window.location.href = redirect;
      } else {
        window.location.href = includeCallback
          ? `/auth/login?callbackUrl=${currentPath}`
          : "/auth/login";
      }
    }
  },
};

// Backwards-compatible export
export const cleanCookies = (): void => signoutService.cleanCookies();
