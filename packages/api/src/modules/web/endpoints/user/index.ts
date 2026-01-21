import type { user } from "@repo/types";

import { setFormData } from "../../../../application/services/form-data.service";
import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * User endpoints
 */
export const userEndpoint = {
  /**
   * Register a new user (public)
   */
  store: async (body: any) => {
    return handleRequest<user>("POST", "/api/public/user/store", body);
  },

  /**
   * Update user profile (with avatar upload)
   */
  update: async (id: string, body: any) => {
    return handleRequest<user>(
      "PUT",
      `/api/private/user/update`,
      setFormData(body, ["avatar"]),
      {
        params: { id },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      { showSuccess: true }
    );
  },
};

export type User = user;

// Direct function exports for backwards compatibility
export const userStore = userEndpoint.store;
export const userUpdate = userEndpoint.update;
