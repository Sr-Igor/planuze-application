//Utils
import { callEndpoint } from "@repo/api/generator";

import { handleReq } from "@/api/handle";

export const index = async () => {
  const handle = callEndpoint({
    route: "/api/private/subscription/index",
    query: {
      include: {
        subscription_plan: {
          include: {
            subscription_plan_features: {
              include: {
                feature: {
                  include: {
                    module: true,
                  },
                },
                subscription_plan_feature_actions: true,
              },
            },
          },
        },
        company: {
          include: {
            company_invoices: {
              orderBy: {
                createdAt: "desc",
              },
            },
            subscription_changes: {
              include: {
                to_plan: true,
                from_plan: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
      orderKey: "createdAt",
      orderValue: "desc",
    },
  });

  return handleReq(handle);
};

export const show = async () => {
  const handle = callEndpoint({
    route: "/api/private/subscription/show",
    params: { id: "" },
  });

  return handleReq({
    ...handle,
  });
};

export const update = async (price_id: string) => {
  const handle = callEndpoint({
    route: "/api/private/subscription/update",
    params: { price_id },
  });

  return handleReq({
    ...handle,
  });
};
