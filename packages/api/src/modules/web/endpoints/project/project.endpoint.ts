import type { project } from "@repo/types";

import { createTypedEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { projectQueries } from "./project.queries";
import type { CreateProjectDTO, UpdateProjectDTO } from "./project.types";

/**
 * Typed routes for project endpoint
 */
const projectRoutes = {
  index: "/api/private/project/index",
  show: "/api/private/project/show",
  store: "/api/private/project/store",
  update: "/api/private/project/update",
  destroy: "/api/private/project/destroy",
  many: "/api/private/project/many",
  trash: "/api/private/project/trash",
  restore: "/api/private/project/restore",
} as const;

/**
 * CRUD endpoint for Project using callEndpoint from @repo/types
 */
export const projectEndpoint = createTypedEndpoint<project, CreateProjectDTO, UpdateProjectDTO>({
  basePath: "/api/private/project",
  routes: projectRoutes,
  queries: projectQueries,
});
