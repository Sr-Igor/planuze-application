/**
 * Cookie storage options
 */
export interface CookieOptions {
  /**
   * Number of days until the cookie expires
   */
  expires?: number;
  
  /**
   * Cookie path
   */
  path?: string;
  
  /**
   * Cookie domain
   */
  domain?: string;
  
  /**
   * Secure flag (HTTPS only)
   */
  secure?: boolean;
  
  /**
   * SameSite attribute
   */
  sameSite?: "strict" | "lax" | "none";
}

/**
 * Contract for cookie storage implementation
 * Abstracts the underlying cookie library (js-cookie, etc.)
 * 
 * @principle Single Responsibility - Only handles cookie CRUD operations
 * @principle Dependency Inversion - High-level modules depend on this abstraction
 */
export interface ICookieStorage {
  /**
   * Gets a cookie value by key
   */
  get(key: string): string | undefined;

  /**
   * Sets a cookie value
   */
  set(key: string, value: string, options?: CookieOptions): void;

  /**
   * Removes a cookie by key
   */
  remove(key: string): void;

  /**
   * Gets all cookies as a key-value object
   */
  getAll(): Record<string, string>;
}
