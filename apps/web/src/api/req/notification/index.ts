//Utils
import { callEndpoint } from "@repo/api/generator";

import { handleReq } from "@/api/handle";

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/notification/index",
    query: {
      ...filters,
      orderKey: "createdAt",
      orderValue: "desc",
      include: {
        company: {
          select: {
            logo: true,
          },
        },
      },
    },
  });

  return handleReq(handle);
};

export const update = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/notification/update",
    body,
    params: { id },
  });

  return handleReq(handle);
};

export const clean = async () => {
  const handle = callEndpoint({
    route: "/api/private/notification/clean",
  });

  return handleReq(handle);
};
