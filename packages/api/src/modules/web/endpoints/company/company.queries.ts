import type { Prisma } from "@repo/types";

import { logs } from "../../../../shared/constants";

/**
 * Default queries for the company endpoint
 */
export const companyQueries: {
  index: { include: Prisma.companyInclude };
  show: { include: Prisma.companyInclude };
  store: { include: Prisma.companyInclude };
  update: { include: Prisma.companyInclude };
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
      company_address: {
        include: { logs },
      },
      company_documents: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      company_contacts: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      company_files: {
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
      company_address: {
        include: { logs },
      },
      company_documents: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      company_contacts: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      company_files: {
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
      company_address: {
        include: { logs },
      },
      company_documents: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      company_contacts: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      company_files: {
        include: { logs },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      },
    },
  },
};
