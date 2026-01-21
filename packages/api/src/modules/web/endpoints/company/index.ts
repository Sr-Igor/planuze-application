export * from "./company.endpoint";
export * from "./company.queries";
export * from "./company.types";

// Direct function exports for backwards compatibility
import { companyEndpoint } from "./company.endpoint";

export const companyIndex = companyEndpoint.index;
export const companyShow = companyEndpoint.show;
export const companyStore = companyEndpoint.store;
export const companyUpdate = companyEndpoint.update;
export const companyDestroy = companyEndpoint.destroy;
export const companyMany = companyEndpoint.many;
export const companyTrash = companyEndpoint.trash;
export const companyRestore = companyEndpoint.restore;
