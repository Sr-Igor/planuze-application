import { getCookieStorage } from "../../infrastructure/adapters/js-cookie.adapter";
import { tabIdService } from "../../infrastructure/services/tab-id.service";
import { COOKIE_KEYS } from "../../shared/constants/cookie-keys.constant";

/**
 * Module Service
 * Manages module ID storage with tab-scoped isolation
 * 
 * @principle Single Responsibility - Only handles module cookie
 * @principle Dependency Inversion - Depends on abstractions
 */
export const moduleService = {
  /**
   * Gets the current module ID for this tab
   */
  get(): string | undefined {
    const storage = getCookieStorage();
    const key = tabIdService.createTabScopedKey(COOKIE_KEYS.MODULE);
    return storage.get(key);
  },

  /**
   * Sets the module ID for this tab
   * @param moduleId - Module ID to store
   */
  set(moduleId: string): void {
    if (!moduleId) return;
    const storage = getCookieStorage();
    const key = tabIdService.createTabScopedKey(COOKIE_KEYS.MODULE);
    storage.set(key, moduleId);
  },

  /**
   * Removes the module ID for this tab
   */
  remove(): void {
    const storage = getCookieStorage();
    const key = tabIdService.createTabScopedKey(COOKIE_KEYS.MODULE);
    storage.remove(key);
  },
};

// Backwards-compatible exports
export const getModule = (): string | undefined => moduleService.get();
export const setModule = async (moduleId: string): Promise<void> => {
  moduleService.set(moduleId);
};
