//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@/utils/includeLogs";

const query: Record<"include", Prisma.company_configInclude> = {
  include: {
    logs,
  },
};

export const show = async () => {
  const handle = callEndpoint({
    route: "/api/private/company_config/show",
    query,
  });

  return handleReq(handle);
};

export const update = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/company_config/update",
    body,
    params: { id },
    query,
  });

  return handleReq(handle);
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/company_config/store",
    body,
    query,
  });

  return handleReq(handle);
};
