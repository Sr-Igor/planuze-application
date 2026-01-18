//Utils
import { callEndpoint } from "@repo/types";
import { setFormData } from "#/utils/form-data";

import { handleReq } from "../../../handle";

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/public/user/store",
    body,
  });

  return handleReq(handle);
};

export const update = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/user/update",
    params: { id },
    body,
  });

  return handleReq({
    ...handle,
    body: setFormData(body, ["avatar"]),
    showSuccess: true,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};
