import type { project_member } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectMemberEndpoint = createSimpleEndpoint<project_member>()({
  basePath: "/api/private/project_member",
  routes: {
    index: "/api/private/project_member/index",
    store: "/api/private/project_member/store",
    update: "/api/private/project_member/update",
    destroy: "/api/private/project_member/destroy",
    many: "/api/private/project_member/many",
  },
  defaultQuery: {
    include: {
      profile: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              email: true,
            },
          },
        },
      },
      logs,
    },
  },
});

export type ProjectMember = project_member;

// Direct function exports for backwards compatibility
export const projectMemberIndex = projectMemberEndpoint.index;
export const projectMemberStore = projectMemberEndpoint.store;
export const projectMemberUpdate = projectMemberEndpoint.update;
export const projectMemberDestroy = projectMemberEndpoint.destroy;
export const projectMemberMany = projectMemberEndpoint.many;
