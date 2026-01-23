/**
 * Value object for cookie keys
 * Ensures cookie keys are valid and properly formatted
 * 
 * @principle Single Responsibility - Only validates and holds cookie key
 */
export class CookieKey {
  private readonly key: string;

  private constructor(key: string) {
    this.key = key;
  }

  /**
   * Creates a CookieKey from a string
   * @throws Error if key is empty or invalid
   */
  static create(key: string): CookieKey {
    if (!key || key.trim() === "") {
      throw new Error("Cookie key cannot be empty");
    }

    // Cookie keys should not contain special characters
    if (/[=;,\s]/.test(key)) {
      throw new Error("Cookie key contains invalid characters");
    }

    return new CookieKey(key);
  }

  /**
   * Creates a tab-scoped cookie key
   * @param baseKey - The base cookie key
   * @param tabId - The tab identifier
   */
  static createTabScoped(baseKey: string, tabId: string | null): CookieKey {
    if (!tabId) {
      return CookieKey.create(baseKey);
    }
    return CookieKey.create(`${baseKey}-${tabId}`);
  }

  /**
   * Gets the string value of the key
   */
  getValue(): string {
    return this.key;
  }

  /**
   * Converts to string for use in APIs
   */
  toString(): string {
    return this.key;
  }
}
