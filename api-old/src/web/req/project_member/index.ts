//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.project_memberInclude> = {
  include: {
    profile: {
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    },
    logs,
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_member/index",
    query: {
      ...filters,
      ...query,
      orderKey: "createdAt",
      orderValue: "desc",
    },
  });

  return handleReq({
    ...handle,
  });
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_member/store",
    body,
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const destroy = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/project_member/destroy",
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
    route: "/api/private/project_member/trash",
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/project_member/restore",
    query,
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
