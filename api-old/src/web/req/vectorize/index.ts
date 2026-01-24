//Utils
import { callEndpoint } from "@repo/types";

import { handleReq } from "../../../handle";

export const update = async (file: any, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/vectorize/update",
    body,
    params: { file },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const destroy = async (file: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/vectorize/destroy",
    params: { file },
    body,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
