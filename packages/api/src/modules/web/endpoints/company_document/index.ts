import type { company_document } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const companyDocumentEndpoint = createSimpleEndpoint<company_document>()({
  basePath: "/api/private/company_document",
  routes: {
    store: "/api/private/company_document/store",
    update: "/api/private/company_document/update",
    destroy: "/api/private/company_document/destroy",
    trash: "/api/private/company_document/trash",
    restore: "/api/private/company_document/restore",
  },
});

export type CompanyDocument = company_document;

// Direct function exports for backwards compatibility
export const companyDocumentStore = companyDocumentEndpoint.store;
export const companyDocumentUpdate = companyDocumentEndpoint.update;
export const companyDocumentDestroy = companyDocumentEndpoint.destroy;
export const companyDocumentTrash = companyDocumentEndpoint.trash;
export const companyDocumentRestore = companyDocumentEndpoint.restore;
