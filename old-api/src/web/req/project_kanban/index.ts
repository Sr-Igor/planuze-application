//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.project_kanbanInclude> = {
  include: {
    logs,
    project: {
      select: {
        name: true,
      },
    },
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban/index",
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
  });
};

export const show = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban/show",
    params: { id },
    query: {
      ...query,
      include: {
        ...query.include,
        project_kanban_cycles: {
          include: {
            logs,
            work_type: true,
            project_kanban_cycle_columns: true,
            project_version: true,
            kanban_template: true,
          },
          orderBy: {
            order: "desc",
          },
        },
      },
    },
  });

  return handleReq({
    ...handle,
    hideError: true,
  });
};

export const store = async (body: any, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban/store",
    body,
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const destroy = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban/destroy",
    params: { id },
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const many = async (ids: string, body: any, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban/many",
    params: { ids },
    body,
    query: {
      ...filters,
      ...query,
    },
  });
  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const trash = async (filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban/trash",
    query: {
      ...filters,
      ...query,
      include: {
        ...query.include,
        project_kanban_cycles: true,
      },
    },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban/restore",
    query: {
      ...filters,
      ...query,
    },
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
