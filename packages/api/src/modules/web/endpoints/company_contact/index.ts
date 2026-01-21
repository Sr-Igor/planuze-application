import type { company_contact } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const companyContactEndpoint = createSimpleEndpoint<company_contact>()({
  basePath: "/api/private/company_contact",
  routes: {
    store: "/api/private/company_contact/store",
    update: "/api/private/company_contact/update",
    destroy: "/api/private/company_contact/destroy",
    trash: "/api/private/company_contact/trash",
    restore: "/api/private/company_contact/restore",
  },
  defaultQuery: {
    include: { logs },
  },
});

export type CompanyContact = company_contact;

// Direct function exports for backwards compatibility
export const companyContactStore = companyContactEndpoint.store;
export const companyContactUpdate = companyContactEndpoint.update;
export const companyContactDestroy = companyContactEndpoint.destroy;
export const companyContactTrash = companyContactEndpoint.trash;
export const companyContactRestore = companyContactEndpoint.restore;
