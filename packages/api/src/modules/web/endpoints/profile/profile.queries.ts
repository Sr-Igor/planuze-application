import type { Prisma } from "@repo/types";

import { logs } from "../../../../shared/constants";

/**
 * Default queries for the profile endpoint
 */
export const profileQueries: {
  index: { include: Prisma.profileInclude };
  show: { include: Prisma.profileInclude };
  store: { include: Prisma.profileInclude };
  update: { include: Prisma.profileInclude };
  destroy: { include: Prisma.profileInclude };
  many: { include: Prisma.profileInclude };
  restore: { include: Prisma.profileInclude };
} = {
  /**
   * Query for listing (index) - lighter version
   */
  index: {
    include: {
      logs,
      user: {
        select: {
          avatar: true,
          email: true,
          id: true,
          name: true,
        },
      },
      level: {
        select: {
          title: true,
        },
      },
    },
  },

  /**
   * Query for details (show) - full version
   */
  show: {
    include: {
      logs,
      user: {
        select: {
          avatar: true,
          email: true,
          id: true,
          name: true,
        },
      },
      level: {
        select: {
          title: true,
        },
      },
      profile_address: {
        include: { logs },
      },
      profile_documents: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      profile_contacts: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      profile_files: {
        include: { logs },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      },
      profile_roles: {
        include: {
          logs,
          role: true,
          cost_center: true,
        },
        orderBy: { createdAt: "desc" },
      },
      profile_bonus: {
        include: {
          logs,
          cost_center: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  },

  /**
   * Query for creation (store)
   */
  store: {
    include: {
      logs,
      user: {
        select: {
          avatar: true,
          email: true,
          id: true,
          name: true,
        },
      },
      level: {
        select: {
          title: true,
        },
      },
    },
  },

  /**
   * Query for update
   */
  update: {
    include: {
      logs,
      user: {
        select: {
          avatar: true,
          email: true,
          id: true,
          name: true,
        },
      },
      level: {
        select: {
          title: true,
        },
      },
      profile_address: {
        include: { logs },
      },
      profile_documents: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      profile_contacts: {
        include: { logs },
        orderBy: { createdAt: "desc" },
      },
      profile_files: {
        include: { logs },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      },
      profile_roles: {
        include: {
          logs,
          role: true,
          cost_center: true,
        },
        orderBy: { createdAt: "desc" },
      },
      profile_bonus: {
        include: {
          logs,
          cost_center: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  },

  destroy: {
    include: {
      logs,
      user: {
        select: {
          avatar: true,
          email: true,
          id: true,
          name: true,
        },
      },
      level: {
        select: {
          title: true,
        },
      },
    },
  },

  many: {
    include: {
      logs,
      user: {
        select: {
          avatar: true,
          email: true,
          id: true,
          name: true,
        },
      },
      level: {
        select: {
          title: true,
        },
      },
    },
  },

  restore: {
    include: {
      logs,
      user: {
        select: {
          avatar: true,
          email: true,
          id: true,
          name: true,
        },
      },
      level: {
        select: {
          title: true,
        },
      },
    },
  },
};
