//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@repo/utils/includeLogs";

const query: Record<"include", Prisma.work_typeInclude> = {
  include: {
    logs,
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/work_type/index",
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
  });
};

export const store = async (body: any, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/work_type/store",
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
    route: "/api/private/work_type/update",
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
    route: "/api/private/work_type/destroy",
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
    route: "/api/private/work_type/many",
    params: { ids },
    query: {
      ...filters,
      ...query,
    },
    body,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const trash = async (filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/work_type/trash",
    query: { ...filters, ...query },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/work_type/restore",
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
