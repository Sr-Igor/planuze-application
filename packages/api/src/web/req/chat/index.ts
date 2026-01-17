//Utils
import { callEndpoint } from "@repo/types";

import { handleReq } from "../../../handle";

export const messages = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/chat/messages",
    body,
  });

  return handleReq(handle);
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/chat/index",
    query: filters,
  });

  return handleReq({
    ...handle,
  });
};

export const show = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/chat/show",
    params: { id },
  });

  return handleReq({
    ...handle,
  });
};

export const category = async () => {
  const handle = callEndpoint({
    route: "/api/private/chat/category",
  });

  return handleReq({
    ...handle,
  });
};
