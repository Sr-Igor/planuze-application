import type { client_file } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

/**
 * Client File endpoint - with file upload support
 */
export const clientFileEndpoint = createSimpleEndpoint<client_file>()({
  basePath: "/api/private/client_file",
  routes: {
    store: "/api/private/client_file/store",
    update: "/api/private/client_file/update",
    destroy: "/api/private/client_file/destroy",
    trash: "/api/private/client_file/trash",
    restore: "/api/private/client_file/restore",
  },
  formDataFields: ["file"],
  defaultQuery: {
    include: { logs },
  },
});

export type ClientFile = client_file;

// Direct function exports for backwards compatibility
export const clientFileStore = clientFileEndpoint.store;
export const clientFileUpdate = clientFileEndpoint.update;
export const clientFileDestroy = clientFileEndpoint.destroy;
export const clientFileTrash = clientFileEndpoint.trash;
export const clientFileRestore = clientFileEndpoint.restore;
