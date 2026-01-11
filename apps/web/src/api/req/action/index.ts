//Utils
import { callEndpoint } from "@repo/api/generator";

import { handleReq } from "@/api/handle";

export const index = async () => {
  const handle = callEndpoint({
    route: "/api/public/action/index",
    query: {
      orderKey: "createdAt",
      orderValue: "asc",
    },
  });

  return handleReq({
    ...handle,
  });
};
