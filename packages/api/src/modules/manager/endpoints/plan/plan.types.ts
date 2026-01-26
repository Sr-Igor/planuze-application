import type { EndpointBody, EndpointParams, EndpointQuery } from "@repo/types";

export type PlanIndexQuery = EndpointQuery<"/manager/private/plan/index">;
export type PlanStoreDTO = EndpointBody<"/manager/private/plan/store">;
export type PlanUpdateDTO = EndpointBody<"/manager/private/plan/update">;
export type PlanUpdateParams = EndpointParams<"/manager/private/plan/update">;
