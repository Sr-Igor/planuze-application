"use client";

import { signoutService } from "../services/signout.service";

/**
 * React hook for handling user signout
 * 
 * @param callback - If true, includes callbackUrl in redirect
 * @returns Object with out function to perform signout
 * 
 * @example
 * ```tsx
 * const { out } = useSignOut();
 * 
 * // Simple logout
 * await out();
 * 
 * // Logout with callback
 * const { out } = useSignOut(true);
 * await out();
 * 
 * // Logout with custom redirect
 * await out('/custom-page');
 * ```
 */
export const useSignOut = (callback?: boolean) => {
  const out = async (redirect?: string) => {
    await signoutService.performSignout({
      redirect,
      includeCallback: callback,
    });
  };

  return { out };
};
