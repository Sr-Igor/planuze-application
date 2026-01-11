//Utils
import { callEndpoint } from "@repo/api/generator";

import { handleReq } from "@/api/handle";

export const store = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/user_two_auth_code/store",
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: false,
  });
};

export const confirm = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/user_two_auth_code/confirm",
    params: { id },
    body,
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
