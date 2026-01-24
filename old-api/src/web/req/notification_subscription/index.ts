//Utils
import { callEndpoint } from "@repo/types";

import { handleReq } from "../../../handle";

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/notification_subscription/store",
    body,
  });

  return handleReq(handle);
};

export const key = async () => {
  const handle = callEndpoint({
    route: "/api/private/notification_subscription/key",
  });

  return handleReq(handle);
};
