//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@repo/utils/includeLogs";
import { setFormData } from "@repo/utils/submitForm/formData";

const query: Record<"include", Prisma.profile_fileInclude> = {
  include: {
    logs,
  },
};
export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile_file/store",
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
    route: "/api/private/profile_file/update",
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
    route: "/api/private/profile_file/destroy",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    showSuccess: false,
  });
};
