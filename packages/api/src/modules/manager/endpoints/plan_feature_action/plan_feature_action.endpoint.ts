import type { plan_feature_action } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type {
  PlanFeatureActionDestroyParams,
  PlanFeatureActionStoreDTO,
} from "./plan_feature_action.types";

export const planFeatureActionEndpoint = {
  store: (body: PlanFeatureActionStoreDTO) =>
    typedRequest<plan_feature_action>()({
      route: "/manager/private/plan_feature_action/store",
      body,
    }),
  destroy: (params: PlanFeatureActionDestroyParams) =>
    typedRequest<void>()({ route: "/manager/private/plan_feature_action/destroy", params }),
};
