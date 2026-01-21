import type { profile_role } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const profileRoleEndpoint = createSimpleEndpoint<profile_role>()({
  basePath: "/api/private/profile_role",
  routes: {
    store: "/api/private/profile_role/store",
    update: "/api/private/profile_role/update",
    destroy: "/api/private/profile_role/destroy",
    trash: "/api/private/profile_role/trash",
    restore: "/api/private/profile_role/restore",
  },
});

export type ProfileRole = profile_role;

// Direct function exports for backwards compatibility
export const profileRoleStore = profileRoleEndpoint.store;
export const profileRoleUpdate = profileRoleEndpoint.update;
export const profileRoleDestroy = profileRoleEndpoint.destroy;
export const profileRoleTrash = profileRoleEndpoint.trash;
export const profileRoleRestore = profileRoleEndpoint.restore;
