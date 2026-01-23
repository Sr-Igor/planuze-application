/**
 * User information stored in cookie
 * Used for tracking user state flags
 */
export interface IUserInfo {
  /**
   * Whether user needs to confirm email
   */
  confirm: boolean;

  /**
   * Whether user needs to complete welcome flow
   */
  welcome: boolean;

  /**
   * Whether user needs to select a plan
   */
  plans: boolean;
}

/**
 * Creates an empty user info with default values
 */
export const createEmptyUserInfo = (): IUserInfo => ({
  confirm: false,
  welcome: false,
  plans: false,
});
