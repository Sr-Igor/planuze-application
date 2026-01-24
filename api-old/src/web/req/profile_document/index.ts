//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.profile_documentInclude> = {
  include: {
    logs,
  },
};

export const trash = async (filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_document/trash",
    query: { ...filters, ...query },
  });

  return handleReq({
    ...handle,
  });
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_document/store",
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
    route: "/api/private/profile_document/update",
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
    route: "/api/private/profile_document/destroy",
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
    route: "/api/private/profile_document/restore",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
