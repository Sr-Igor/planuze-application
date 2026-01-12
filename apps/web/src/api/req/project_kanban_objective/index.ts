//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@repo/utils/includeLogs";

const query: Record<"include", Prisma.project_kanban_objectiveInclude> = {
  include: {
    logs,
    project: {
      select: {
        name: true,
      },
    },
    project_kanban_objective_targets: {
      include: {
        logs,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_objective/index",
    query: {
      ...filters,
      include: {
        logs,
        project: {
          select: {
            name: true,
          },
        },
      },
    },
  });

  return handleReq({
    ...handle,
  });
};

export const show = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_objective/show",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    hideError: true,
  });
};

export const store = async (body: any, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_objective/store",
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

export const update = async (id: string, body: any, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_objective/update",
    body,
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

export const destroy = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_objective/destroy",
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
    route: "/api/private/project_kanban_objective/many",
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
    route: "/api/private/project_kanban_objective/trash",
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_objective/restore",
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
