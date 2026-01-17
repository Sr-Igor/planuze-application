//Utils
import { callEndpoint } from "@repo/types";
import { Prisma } from "@repo/types/prisma-types";
import { logs } from "@repo/utils/includeLogs";
import { setFormData } from "@repo/utils/submitForm/formData";

import { handleReq } from "../../../handle";

const query: Record<"include", Prisma.companyInclude> = {
  include: {
    logs,
    company_address: {
      include: {
        logs,
      },
    },
    company_documents: {
      include: {
        logs,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
    company_contacts: {
      include: {
        logs,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
    company_files: {
      include: {
        logs,
      },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    },
  },
};

export const show = async (id: string) => {
  const handle = callEndpoint({
    route: "/api/private/company/show",
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    hideError: true,
  });
};

export const update = async (id: string, body: any) => {
  const handle = callEndpoint({
    route: "/api/private/company/update",
    body,
    params: { id },
    query,
  });

  return handleReq({
    ...handle,
    body: setFormData(body, ["logo"]),
    showSuccess: true,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};

export const store = async (body: any) => {
  const handle = callEndpoint({
    route: "/api/private/company/store",
    body,
    query,
  });

  return handleReq({
    ...handle,
    body: setFormData(body, ["logo"]),
    showSuccess: false,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};
