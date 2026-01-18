//Utils
import { callEndpoint, Prisma } from "@repo/types";
import { logs } from "@repo/utils/includeLogs";
import { setFormData } from "#/utils/form-data";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.company_fileInclude> = {
  include: {
    logs,
  },
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/company_file/store",
    body,
    query,
  });

  return handleReq({
    ...handle,
    body: setFormData(body, ["file"]),
    showSuccess: true,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};

export const update = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/company_file/update",
    params: { id },
    body,
    query,
  });

  return handleReq({
    ...handle,
    body,
    showSuccess: false,
    hideError: true,
  });
};

export const destroy = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/company_file/destroy",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
