//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";
import { setFormData } from "@repo/form/formData";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.client_fileInclude> = {
  include: {
    logs,
  },
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/client_file/store",
    body,
    query,
  });

  return handleReq({
    ...handle,
    body: setFormData(body, ["file"]),
    showSuccess: false,
    hideError: true,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};

export const update = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/client_file/update",
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
    route: "/api/private/client_file/destroy",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: false,
  });
};
