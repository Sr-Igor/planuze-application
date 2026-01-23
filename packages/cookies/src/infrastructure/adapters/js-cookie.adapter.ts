import Cookies from "js-cookie";

import type {
  CookieOptions,
  ICookieStorage,
} from "../../core/domain/interfaces/cookie-storage.interface";
import { cookieConfig } from "../../shared/config/cookie-config";

/**
 * Cookie storage implementation using js-cookie library
 * 
 * @principle Open/Closed - Implements ICookieStorage, can be swapped without changing consumers
 * @principle Liskov Substitution - Can replace any ICookieStorage implementation
 */
export class JsCookieAdapter implements ICookieStorage {
  private readonly defaultOptions: Cookies.CookieAttributes;

  constructor(options?: CookieOptions) {
    this.defaultOptions = {
      expires: options?.expires ?? cookieConfig.expirationDays,
      path: options?.path,
      domain: options?.domain,
      secure: options?.secure,
      sameSite: options?.sameSite,
    };
  }

  /**
   * Gets a cookie value by key
   */
  get(key: string): string | undefined {
    return Cookies.get(key);
  }

  /**
   * Sets a cookie value with merged options
   */
  set(key: string, value: string, options?: CookieOptions): void {
    const mergedOptions: Cookies.CookieAttributes = {
      ...this.defaultOptions,
      ...options,
    };
    Cookies.set(key, value, mergedOptions);
  }

  /**
   * Removes a cookie by key
   */
  remove(key: string): void {
    Cookies.remove(key);
  }

  /**
   * Gets all cookies as a key-value object
   */
  getAll(): Record<string, string> {
    return Cookies.get() as Record<string, string>;
  }
}

/**
 * Default singleton instance of the cookie storage
 */
let defaultStorage: ICookieStorage | null = null;

/**
 * Gets the default cookie storage instance (singleton)
 */
export const getCookieStorage = (): ICookieStorage => {
  if (!defaultStorage) {
    defaultStorage = new JsCookieAdapter();
  }
  return defaultStorage;
};

/**
 * Sets a custom cookie storage implementation
 * Useful for testing or when switching cookie libraries
 */
export const setCookieStorage = (storage: ICookieStorage): void => {
  defaultStorage = storage;
};
