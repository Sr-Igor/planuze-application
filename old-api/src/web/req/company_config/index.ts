//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";

import { handleReq } from "../../../handle";

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
