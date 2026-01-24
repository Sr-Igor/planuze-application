//Utils
import { callEndpoint } from "@repo/types";

import { handleReq } from "../../../handle";

export const show = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/me/show",
    params: { id },
  });

  return handleReq({
    ...handle,
    hideError: true,
  });
};
