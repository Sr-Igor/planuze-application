//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@repo/utils/includeLogs";

const query: Record<"include", Prisma.kanban_template_columnInclude> = {
  include: {
    logs,
  },
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/kanban_template_column/store",
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
    route: "/api/private/kanban_template_column/update",
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
    route: "/api/private/kanban_template_column/destroy",
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
    route: "/api/private/kanban_template_column/trash",
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
    route: "/api/private/kanban_template_column/restore",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const many = async (ids: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/kanban_template_column/many",
    body,
    query,
    params: { ids },
  });
  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
