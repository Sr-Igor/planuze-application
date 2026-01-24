//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.planInclude> = {
  include: {
    plan_features: {
      include: {
        feature: {
          include: {
            module: true,
          },
        },
      },
    },
  },
};

export const indexPublic = async () => {
  const handle = callEndpoint({
    route: "/api/public/plan/index",
    query,
  });

  return handleReq(handle);
};

export const indexPrivate = async () => {
  const handle = callEndpoint({
    route: "/api/private/plan/index",
    query,
  });

  return handleReq(handle);
};
