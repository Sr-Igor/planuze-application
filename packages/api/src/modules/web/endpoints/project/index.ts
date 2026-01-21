// Direct function exports for backwards compatibility
import { projectEndpoint } from "./project.endpoint";

export * from "./project.endpoint";
export * from "./project.queries";
export * from "./project.types";

export const projectIndex = projectEndpoint.index;
export const projectShow = projectEndpoint.show;
export const projectStore = projectEndpoint.store;
export const projectUpdate = projectEndpoint.update;
export const projectDestroy = projectEndpoint.destroy;
export const projectMany = projectEndpoint.many;
export const projectTrash = projectEndpoint.trash;
export const projectRestore = projectEndpoint.restore;
