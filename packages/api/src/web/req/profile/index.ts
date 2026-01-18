//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";
import { setFormData } from "@repo/form/formData";

import { handleReq } from "../../../handle";

const indexQuery: Record<"include", Prisma.profileInclude> = {
  include: {
    logs,
    user: {
      select: {
        avatar: true,
        email: true,
        id: true,
        name: true,
      },
    },
    level: {
      select: {
        title: true,
      },
    },
  },
};

const query: Record<"include", Prisma.profileInclude> = {
  include: {
    logs,
    user: {
      select: {
        avatar: true,
        email: true,
        id: true,
        name: true,
      },
    },
    level: {
      select: {
        title: true,
      },
    },
    profile_address: {
      include: {
        logs,
      },
    },
    profile_documents: {
      include: {
        logs,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
    profile_contacts: {
      include: {
        logs,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
    profile_files: {
      include: {
        logs,
      },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    },
    profile_roles: {
      include: {
        logs,
        role: true,
        cost_center: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
    profile_bonus: {
      include: {
        logs,
        cost_center: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
  },
};

export const index = async (filters: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile/index",
    query: { ...filters, include: indexQuery.include },
  });

  return handleReq({
    ...handle,
  });
};

export const show = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/profile/show",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    hideError: true,
  });
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/profile/store",
    body,
  });

  return handleReq({
    ...handle,
    body: setFormData(body, ["anonymous_avatar"]),
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
    route: "/api/private/profile/update",
    body,
    params: { id },
    query: {
      ...filters,
      ...query,
    },
  });

  return handleReq({
    ...handle,
    body: setFormData(body, ["anonymous_avatar"]),
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
    route: "/api/private/profile/destroy",
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
    route: "/api/private/profile/many",
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
    route: "/api/private/profile/trash",
    query: { ...filters, include: indexQuery.include },
  });

  return handleReq({
    ...handle,
  });
};

export const restore = async (id: string, filters: any = {}) => {
  const handle = callEndpoint({
    route: "/api/private/profile/restore",
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
