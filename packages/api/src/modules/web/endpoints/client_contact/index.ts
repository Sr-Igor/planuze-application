import type { client_contact } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

/**
 * Client Contact endpoint
 */
export const clientContactEndpoint = createSimpleEndpoint<client_contact>()({
  basePath: "/api/private/client_contact",
  routes: {
    store: "/api/private/client_contact/store",
    update: "/api/private/client_contact/update",
    destroy: "/api/private/client_contact/destroy",
    trash: "/api/private/client_contact/trash",
    restore: "/api/private/client_contact/restore",
  },
});

export type ClientContact = client_contact;

// Direct function exports for backwards compatibility
export const clientContactStore = clientContactEndpoint.store;
export const clientContactUpdate = clientContactEndpoint.update;
export const clientContactDestroy = clientContactEndpoint.destroy;
export const clientContactTrash = clientContactEndpoint.trash;
export const clientContactRestore = clientContactEndpoint.restore;
