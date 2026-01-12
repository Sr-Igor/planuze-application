//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@repo/utils/includeLogs";

const query: Record<"include", Prisma.profile_bank_accountInclude> = {
  include: {
    logs,
  },
};

export const index = async (filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bank_account/index",
    query: { ...filters, include: { logs } },
  });

  return handleReq({
    ...handle,
  });
};

export const store = async (body: any, filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bank_account/store",
    body,
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
  });
};

export const update = async (id: string, body: any, filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bank_account/update",
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

export const destroy = async (id: string, filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bank_account/destroy",
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

export const trash = async (filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bank_account/trash",
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string, filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bank_account/restore",
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
