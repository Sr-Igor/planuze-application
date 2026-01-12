//Utils
import { callEndpoint } from "@repo/api/generator";
import { Prisma } from "@repo/api/generator/prisma-types";

import { handleReq } from "@/api/handle";
import { logs } from "@repo/utils/includeLogs";
import { setFormData } from "@repo/utils/submitForm/formData";

const query: Record<"include", Prisma.clientInclude> = {
  include: {
    logs,
    client_address: {
      include: {
        logs,
      },
    },
    client_documents: {
      include: {
        logs,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
    client_contacts: {
      include: {
        logs,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
    client_files: {
      include: {
        logs,
      },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    },
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/client/index",
    query: { ...filters, include: { logs } },
  });

  return handleReq({
    ...handle,
  });
};

export const show = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/client/show",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    hideError: true,
  });
};

export const store = async (body: any, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/client/store",
    body,
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
    body: setFormData(body, ["avatar"]),
    showSuccess: true,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};

export const update = async (id: string, body: any, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/client/update",
    body,
    params: { id },
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
    body: setFormData(body, ["avatar"]),
    showSuccess: true,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};

export const destroy = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/client/destroy",
    params: { id },
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const many = async (ids: string, body: any, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/client/many",
    params: { ids },
    body,
    query: {
      ...filters,
      ...query,
    },
  });
  return handleReq({
    ...handle,
    showSuccess: true,
  });
};

export const trash = async (filters?: any) => {
  const handle = callEndpoint({
    route: "/api/private/client/trash",
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/client/restore",
    query: {
      ...filters,
      ...query,
    },
    params: { id },
  });

  return handleReq({
    ...handle,
    showSuccess: true,
  });
};
