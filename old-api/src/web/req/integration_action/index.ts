//Utils
import { callEndpoint } from "@repo/types";

import { handleReq } from "../../../handle";

export const update = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/integration_action/update",
    body,
    params: { id },
    query: {
      include: {
        action: true,
        feature: true,
      },
    },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
