//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.kanban_template_cardInclude> = {
  include: {
    logs,
    kanban_template_card_type: true,
  },
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/kanban_template_card/store",
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
    route: "/api/private/kanban_template_card/destroy",
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
    route: "/api/private/kanban_template_card/trash",
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
    route: "/api/private/kanban_template_card/restore",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
