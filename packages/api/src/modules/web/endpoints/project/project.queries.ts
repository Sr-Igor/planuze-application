import type { Prisma } from "@repo/types";

import { logs } from "../../../../shared/constants";

/**
 * Default queries for the project endpoint
 */
export const projectQueries: {
  index: { include: Prisma.projectInclude };
  show: { include: Prisma.projectInclude };
  store: { include: Prisma.projectInclude };
  update: { include: Prisma.projectInclude };
} = {
  /**
   * Query for listing (index)
   */
  index: {
    include: {
      client: {
        select: {
          name: true,
        },
      },
      project_kanbans: true,
      project_configs: true,
      logs,
    },
  },

  /**
   * Query for details (show)
   */
  show: {
    include: {
      client: {
        select: {
          name: true,
        },
      },
      project_kanbans: true,
      project_configs: true,
      logs,
    },
  },

  /**
   * Query for creation (store)
   */
  store: {
    include: {
      client: {
        select: {
          name: true,
        },
      },
      project_kanbans: true,
      project_configs: true,
      logs,
    },
  },

  /**
   * Query for update
   */
  update: {
    include: {
      client: {
        select: {
          name: true,
        },
      },
      project_kanbans: true,
      project_configs: true,
      logs,
    },
  },
};
