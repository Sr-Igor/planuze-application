//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@/utils/includeLogs";

const query: Record<"include", Prisma.project_versionInclude> = {
  include: {
    logs,
    owner: {
      select: {
        id: true,
        anonymous_name: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    },
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_version/index",
    query: {
      ...filters,
      orderKey: "createdAt",
      orderValue: "desc",
      include: {
        owner: {
          select: {
            anonymous_name: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
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
    route: "/api/private/project_version/show",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    hideError: true,
  });
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_version/store",
    body,
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const update = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_version/update",
    body,
    query,
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const destroy = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/project_version/destroy",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const trash = async (filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_version/trash",
    query: { ...filters, ...query },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/project_version/restore",
    query,
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
