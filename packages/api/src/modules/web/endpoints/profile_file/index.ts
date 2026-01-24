import type { profile_file } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const profileFileEndpoint = createSimpleEndpoint<profile_file>()({
  basePath: "/api/private/profile_file",
  routes: {
    store: "/api/private/profile_file/store",
    update: "/api/private/profile_file/update",
    destroy: "/api/private/profile_file/destroy",
  },
  formDataFields: ["file"],
  defaultQuery: {
    include: { logs },
  },
});

export type ProfileFile = profile_file;

// Direct function exports for backwards compatibility
export const profileFileStore = profileFileEndpoint.store;
export const profileFileUpdate = profileFileEndpoint.update;
export const profileFileDestroy = profileFileEndpoint.destroy;
