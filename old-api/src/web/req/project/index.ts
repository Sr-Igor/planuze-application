//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.projectInclude> = {
  include: {
    client: {
      select: {
        name: true,
      },
    },
    project_kanbans: true,
    project_configs: true,
    logs,
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/project/index",
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
    route: "/api/private/project/show",
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
    route: "/api/private/project/store",
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
    route: "/api/private/project/update",
    body,
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

export const destroy = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project/destroy",
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
    route: "/api/private/project/many",
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
    route: "/api/private/project/trash",
    query: { ...filters, ...query },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/project/restore",
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
