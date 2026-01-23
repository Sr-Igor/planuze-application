/**
 * Cookie configuration
 */
export const cookieConfig = {
  /**
   * Number of days until cookies expire
   * Defaults to value from environment variable
   */
  expirationDays: Number(process.env.NEXT_PUBLIC_COOKIE_EXPIRE_DAYS || 7),
};
