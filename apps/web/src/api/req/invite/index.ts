//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@/utils/includeLogs";

const query: Record<"include", Prisma.inviteInclude> = {
  include: {
    logs,
    level: {
      select: {
        title: true,
      },
    },
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/invite/index",
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq(handle);
};

export const store = async (body: any, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/invite/store",
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
    route: "/api/private/invite/update",
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
    route: "/api/private/invite/destroy",
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
    route: "/api/private/invite/many",
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
    route: "/api/private/invite/trash",
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq(handle);
};

export const restore = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/invite/restore",
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

export const me = async (filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/invite/me",
    query: {
      ...filters,
      include: {
        company: {
          select: {
            logo: true,
            name: true,
          },
        },
      },
      orderKey: "createdAt",
      orderValue: "desc",
    },
  });

  return handleReq(handle);
};

export const feedback = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/invite/feedback",
    body,
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
