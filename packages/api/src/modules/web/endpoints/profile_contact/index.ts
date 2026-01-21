import type { profile_contact } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const profileContactEndpoint = createSimpleEndpoint<profile_contact>()({
  basePath: "/api/private/profile_contact",
  routes: {
    store: "/api/private/profile_contact/store",
    update: "/api/private/profile_contact/update",
    destroy: "/api/private/profile_contact/destroy",
    trash: "/api/private/profile_contact/trash",
    restore: "/api/private/profile_contact/restore",
  },
});

export type ProfileContact = profile_contact;

// Direct function exports for backwards compatibility
export const profileContactStore = profileContactEndpoint.store;
export const profileContactUpdate = profileContactEndpoint.update;
export const profileContactDestroy = profileContactEndpoint.destroy;
export const profileContactTrash = profileContactEndpoint.trash;
export const profileContactRestore = profileContactEndpoint.restore;
