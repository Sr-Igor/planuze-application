import type { Pagination, plan } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type { PlanIndexQuery, PlanStoreDTO, PlanUpdateDTO, PlanUpdateParams } from "./plan.types";

export const planEndpoint = {
  index: (query?: PlanIndexQuery) =>
    typedRequest<Pagination<plan>>()({
      route: "/manager/private/plan/index",
      query: { ...query, include: { company: { select: { name: true } } } },
    }),
  show: (id: string) =>
    typedRequest<plan>()(
      {
        route: "/manager/private/plan/show",
        params: { id },
        query: {
          include: {
            plan_features: {
              include: {
                feature: { include: { module: true } },
                plan_feature_actions: { include: { action: true } },
              },
            },
          },
        },
      },
      { hideError: true }
    ),
  store: (body: PlanStoreDTO) =>
    typedRequest<plan>()({ route: "/manager/private/plan/store", body }, { showSuccess: true }),
  update: (params: PlanUpdateParams, body: PlanUpdateDTO) =>
    typedRequest<plan>()(
      { route: "/manager/private/plan/update", params, body },
      { showSuccess: true }
    ),
};
