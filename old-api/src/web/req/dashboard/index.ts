//Utils
import { exporteXlsx } from "#/global/export-xlsx";
import { handleReq } from "#/handle";

import { callEndpoint } from "@repo/types";

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/dashboard/index",
    query: filters,
  });

  return handleReq(handle);
};

export const exported = async (filters: any) => {
  const response = await exporteXlsx("/api/private/dashboard/index", filters);
  return response;
};
