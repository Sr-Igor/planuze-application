// Direct function exports for backwards compatibility
import { clientEndpoint } from "./client.endpoint";

export * from "./client.endpoint";
export * from "./client.queries";
export * from "./client.types";

export const clientIndex = clientEndpoint.index;
export const clientShow = clientEndpoint.show;
export const clientStore = clientEndpoint.store;
export const clientUpdate = clientEndpoint.update;
export const clientDestroy = clientEndpoint.destroy;
export const clientMany = clientEndpoint.many;
export const clientTrash = clientEndpoint.trash;
export const clientRestore = clientEndpoint.restore;
