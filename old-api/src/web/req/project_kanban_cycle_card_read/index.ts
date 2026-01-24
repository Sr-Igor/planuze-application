//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";

import { handleReq } from "../../../handle";

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
    route: "/api/private/project_kanban_cycle_card_read/store",
    body,
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: false,
  });
};
