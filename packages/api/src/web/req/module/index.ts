//Utils
import { callEndpoint } from "@repo/types";

import { handleReq } from "../../../handle";

export const indexPublic = async () => {
  const handle = callEndpoint({
    route: "/api/public/module/index",
  });

  return handleReq(handle);
};

export const indexPrivate = async () => {
  const handle = callEndpoint({
    route: "/api/private/module/index",
  });

  return handleReq(handle);
};
