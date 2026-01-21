import type { profile_document } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const profileDocumentEndpoint = createSimpleEndpoint<profile_document>()({
  basePath: "/api/private/profile_document",
  routes: {
    store: "/api/private/profile_document/store",
    update: "/api/private/profile_document/update",
    destroy: "/api/private/profile_document/destroy",
    trash: "/api/private/profile_document/trash",
    restore: "/api/private/profile_document/restore",
  },
});

export type ProfileDocument = profile_document;

// Direct function exports for backwards compatibility
export const profileDocumentStore = profileDocumentEndpoint.store;
export const profileDocumentUpdate = profileDocumentEndpoint.update;
export const profileDocumentDestroy = profileDocumentEndpoint.destroy;
export const profileDocumentTrash = profileDocumentEndpoint.trash;
export const profileDocumentRestore = profileDocumentEndpoint.restore;
