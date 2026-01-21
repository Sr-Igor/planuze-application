import type { client_document } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

/**
 * Client Document endpoint
 */
export const clientDocumentEndpoint = createSimpleEndpoint<client_document>()({
  basePath: "/api/private/client_document",
  routes: {
    store: "/api/private/client_document/store",
    update: "/api/private/client_document/update",
    destroy: "/api/private/client_document/destroy",
    trash: "/api/private/client_document/trash",
    restore: "/api/private/client_document/restore",
  },
});

export type ClientDocument = client_document;

// Direct function exports for backwards compatibility
export const clientDocumentStore = clientDocumentEndpoint.store;
export const clientDocumentUpdate = clientDocumentEndpoint.update;
export const clientDocumentDestroy = clientDocumentEndpoint.destroy;
export const clientDocumentTrash = clientDocumentEndpoint.trash;
export const clientDocumentRestore = clientDocumentEndpoint.restore;
