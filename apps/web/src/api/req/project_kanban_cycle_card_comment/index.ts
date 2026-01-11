//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";

const query: Record<"include", Prisma.project_kanban_cycle_card_commentInclude> = {
  include: {
    profile: {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    },
  },
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_cycle_card_comment/store",
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
    route: "/api/private/project_kanban_cycle_card_comment/update",
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
    route: "/api/private/project_kanban_cycle_card_comment/destroy",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
