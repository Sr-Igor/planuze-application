import type { EndpointBody, EndpointParams } from "@repo/types";

export type PlanFeatureStoreDTO = EndpointBody<"/manager/private/plan_feature/store">;
export type PlanFeatureDestroyParams = EndpointParams<"/manager/private/plan_feature/destroy">;
