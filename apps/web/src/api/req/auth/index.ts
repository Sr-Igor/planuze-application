//Utils
import { callEndpoint } from "@repo/api/generator";

import { handleReq } from "@/api/handle";

export const login = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/public/auth/login",
    body,
  });

  return handleReq(handle);
};

export const hidrate = async () => {
  const handle = callEndpoint({
    route: "/api/private/auth/hidrate",
  });

  return handleReq(handle);
};

export const confirm = async () => {
  const handle = callEndpoint({
    route: "/api/private/auth/confirm",
  });

  return handleReq(handle);
};

export const code = async (code: string) => {
  const handle = callEndpoint({
    route: "/api/private/auth/code",
    params: { code },
  });

  return handleReq(handle);
};

export const recovery = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/public/auth/recovery",
    body,
  });

  return handleReq(handle);
};

export const reset = async (code: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/public/auth/reset",
    params: { code },
    body,
  });

  return handleReq({ ...handle, showSuccess: true });
};

export const changePassword = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/auth/reset",
    body,
  });

  return handleReq({ ...handle, showSuccess: true });
};

export const owner = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/auth/owner",
    body,
  });

  return handleReq({ ...handle, showSuccess: true });
};
