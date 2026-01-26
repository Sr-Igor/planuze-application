import type { EndpointBody, EndpointParams } from "@repo/types";

export type PlanFeatureActionStoreDTO = EndpointBody<"/manager/private/plan_feature_action/store">;
export type PlanFeatureActionDestroyParams =
  EndpointParams<"/manager/private/plan_feature_action/destroy">;
