//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.project_kanban_cycle_cardInclude> = {
  include: {
    logs: {
      ...logs,
      orderBy: {
        createdAt: "asc",
      },
    },

    project_member: {
      select: {
        profile: {
          select: {
            id: true,
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
    },
    project_kanban_cycle_cards: {
      include: {
        project_kanban_cycle_card_type: true,
        project_kanban_cycle_column: true,
        project_kanban_cycle: true,
      },
    },
    project_kanban_cycle_card_comments: {
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
      orderBy: {
        createdAt: "desc",
      },
    },
    project_kanban_cycle_card_files: {
      include: {
        logs,
      },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    },
    work_type: true,
    card: {
      include: {
        project_kanban_cycle_card_type: true,
        project_kanban_cycle_column: true,
        project_kanban_cycle: true,
      },
    },
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
    project_kanban_cycle_card_tags: true,
    project_kanban_cycle_card_type: true,
    project_kanban_cycle_column: true,
    project_kanban_cycle: true,
    project_kanban_objective: true,
    project_kanban_objective_target: true,
    project_kanban_cycle_card_reads: {
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
      orderBy: {
        createdAt: "desc",
      },
    },
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_cycle_card/index",
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
  });
};

export const show = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_cycle_card/show",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
  });
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_cycle_card/store",
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
    route: "/api/private/project_kanban_cycle_card/update",
    body,
    query,
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const destroy = async (id: string, q: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_cycle_card/destroy",
    params: { id },
    query: {
      ...query,
      ...q,
    },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const many = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_cycle_card/many",
    params: { id },
    body,
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const trash = async (filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_cycle_card/trash",
    query: {
      ...filters,
      include: {
        logs,
        project_kanban_cycle_column: true,
        project_kanban_cycle_card_type: true,
        project_kanban_cycle: true,
        card: true,
      },
    },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/project_kanban_cycle_card/restore",
    body,
    query,
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
