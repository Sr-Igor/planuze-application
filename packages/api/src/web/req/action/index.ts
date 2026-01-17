import { callEndpoint } from "@repo/types";

import { handleReq } from "../../../handle";

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
