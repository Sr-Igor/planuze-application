import type { EndpointBody, user } from "@repo/types";

import { setFormData } from "../../../../application/services/form-data.service";
import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// User Types
// =============================================================================

export type UserStoreBody = EndpointBody<"/api/public/user/store">;
export type UserUpdateBody = EndpointBody<"/api/private/user/update">;

/**
 * User endpoints
 */
export const userEndpoint = {
  /**
   * Register a new user (public)
   */
  store: (body: UserStoreBody) =>
    typedRequest<user>()({
      route: "/api/public/user/store",
      body,
    }),

  /**
   * Update user profile (with avatar upload)
   */
  update: (id: string, body: UserUpdateBody) =>
    typedRequest<user>()(
      {
        route: "/api/private/user/update",
        params: { id },
        body,
      },
      {
        showSuccess: true,
        axiosConfig: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        transformBody: (b) => setFormData(b as Record<string, unknown>, ["avatar"]),
      }
    ),
};

export type User = user;

// Direct function exports for backwards compatibility
export const userStore = userEndpoint.store;
export const userUpdate = userEndpoint.update;
