import type { company_file } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const companyFileEndpoint = createSimpleEndpoint<company_file>()({
  basePath: "/api/private/company_file",
  routes: {
    store: "/api/private/company_file/store",
    update: "/api/private/company_file/update",
    destroy: "/api/private/company_file/destroy",
    trash: "/api/private/company_file/trash",
    restore: "/api/private/company_file/restore",
  },
  formDataFields: ["file"],
  defaultQuery: {
    include: { logs },
  },
});

export type CompanyFile = company_file;

// Direct function exports for backwards compatibility
export const companyFileStore = companyFileEndpoint.store;
export const companyFileUpdate = companyFileEndpoint.update;
export const companyFileDestroy = companyFileEndpoint.destroy;
export const companyFileTrash = companyFileEndpoint.trash;
export const companyFileRestore = companyFileEndpoint.restore;
