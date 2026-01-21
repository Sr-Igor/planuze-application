import type { Prisma } from "@repo/types";

import { logs } from "../../../../shared/constants";

/**
 * Default queries for the client endpoint
 * Centralizes Prisma includes for reuse with full type safety
 */
export const clientQueries: {
  index: { include: Prisma.clientInclude };
  show: { include: Prisma.clientInclude };
  store: { include: Prisma.clientInclude };
  update: { include: Prisma.clientInclude };
} = {
  /**
   * Query for listing (index)
   */
  index: {
    include: { logs },
  },

  /**
   * Query for details (show)
   */
  show: {
    include: {
      logs,
      client_address: {
        include: { logs },
      },
      client_documents: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      client_contacts: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      client_files: {
        include: { logs },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      },
    },
  },

  /**
   * Query for creation (store)
   */
  store: {
    include: {
      logs,
      client_address: {
        include: { logs },
      },
      client_documents: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      client_contacts: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      client_files: {
        include: { logs },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      },
    },
  },

  /**
   * Query for update
   */
  update: {
    include: {
      logs,
      client_address: {
        include: { logs },
      },
      client_documents: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      client_contacts: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      client_files: {
        include: { logs },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      },
    },
  },
};
