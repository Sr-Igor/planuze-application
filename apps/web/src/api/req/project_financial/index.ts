//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@/utils/includeLogs";

const query: Record<"include", Prisma.project_financialInclude> = {
  include: {
    logs,
    work_type: true,
    project_version: true,
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_financial/index",
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
    route: "/api/private/project_financial/store",
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
    route: "/api/private/project_financial/update",
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
    route: "/api/private/project_financial/destroy",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const trash = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_financial/trash",
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
    route: "/api/private/project_financial/restore",
    query,
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
