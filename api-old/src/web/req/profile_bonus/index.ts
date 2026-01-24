//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.profile_bonusInclude> = {
  include: {
    logs,
    cost_center: true,
  },
};

export const trash = async (filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bonus/trash",
    query: { ...filters, ...query },
  });

  return handleReq({
    ...handle,
  });
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bonus/store",
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
    route: "/api/private/profile_bonus/update",
    body,
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const destroy = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bonus/destroy",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const restore = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/profile_bonus/restore",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
