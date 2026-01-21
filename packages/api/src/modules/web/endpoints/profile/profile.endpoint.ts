import type { profile } from "@repo/types";

import { createTypedEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { profileQueries } from "./profile.queries";
import type { CreateProfileDTO, UpdateProfileDTO } from "./profile.types";

/**
 * Typed routes for profile endpoint
 */
const profileRoutes = {
  index: "/api/private/profile/index",
  show: "/api/private/profile/show",
  store: "/api/private/profile/store",
  update: "/api/private/profile/update",
  destroy: "/api/private/profile/destroy",
  many: "/api/private/profile/many",
  trash: "/api/private/profile/trash",
  restore: "/api/private/profile/restore",
} as const;

/**
 * CRUD endpoint for Profile using callEndpoint from @repo/types
 */
export const profileEndpoint = createTypedEndpoint<profile, CreateProfileDTO, UpdateProfileDTO>({
  basePath: "/api/private/profile",
  routes: profileRoutes,
  queries: profileQueries,
  formDataFields: ["anonymous_avatar"],
});
