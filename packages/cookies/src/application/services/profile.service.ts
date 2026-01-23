import { getCookieStorage } from "../../infrastructure/adapters/js-cookie.adapter";
import { tabIdService } from "../../infrastructure/services/tab-id.service";
import { COOKIE_KEYS } from "../../shared/constants/cookie-keys.constant";

/**
 * Profile Service
 * Manages profile ID storage with tab-scoped isolation
 * 
 * @principle Single Responsibility - Only handles profile cookie
 * @principle Dependency Inversion - Depends on abstractions
 */
export const profileService = {
  /**
   * Gets the current profile ID for this tab
   */
  get(): string | undefined {
    const storage = getCookieStorage();
    const key = tabIdService.createTabScopedKey(COOKIE_KEYS.PROFILE);
    return storage.get(key);
  },

  /**
   * Sets the profile ID for this tab
   * @param profileId - Profile ID to store
   */
  set(profileId: string): void {
    if (!profileId) return;
    const storage = getCookieStorage();
    const key = tabIdService.createTabScopedKey(COOKIE_KEYS.PROFILE);
    storage.set(key, profileId);
  },

  /**
   * Removes the profile ID for this tab
   */
  remove(): void {
    const storage = getCookieStorage();
    const key = tabIdService.createTabScopedKey(COOKIE_KEYS.PROFILE);
    storage.remove(key);
  },
};

// Backwards-compatible exports
export const getProfile = (): string | undefined => profileService.get();
export const setProfile = async (profileId: string): Promise<void> => {
  profileService.set(profileId);
};
