import type { client, Pagination } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type { BillingErrorIndexQuery } from "./billing_error.types";

export const billingErrorEndpoint = {
  index: (query?: BillingErrorIndexQuery) =>
    typedRequest<Pagination<client>>()({
      route: "/manager/private/billing_error/index",
      query: {
        ...query,
        include: {
          company: {
            select: {
              name: true,
            },
          },
        },
      },
    }),
};
