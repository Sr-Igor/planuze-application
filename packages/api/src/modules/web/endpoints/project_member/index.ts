import type { project_member } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const projectMemberEndpoint = createSimpleEndpoint<project_member>()({
  basePath: "/api/private/project_member",
  routes: {
    index: "/api/private/project_member/index",
    store: "/api/private/project_member/store",
    trash: "/api/private/project_member/trash",
    destroy: "/api/private/project_member/destroy",
    restore: "/api/private/project_member/restore",
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
export const projectMemberTrash = projectMemberEndpoint.trash;
export const projectMemberDestroy = projectMemberEndpoint.destroy;
export const projectMemberRestore = projectMemberEndpoint.restore;
