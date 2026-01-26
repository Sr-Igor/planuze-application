import type { plan_feature } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type { PlanFeatureDestroyParams, PlanFeatureStoreDTO } from "./plan_feature.types";

export const planFeatureEndpoint = {
  store: (body: PlanFeatureStoreDTO) =>
    typedRequest<plan_feature>()({ route: "/manager/private/plan_feature/store", body }),
  destroy: (params: PlanFeatureDestroyParams) =>
    typedRequest<void>()({ route: "/manager/private/plan_feature/destroy", params }),
};
