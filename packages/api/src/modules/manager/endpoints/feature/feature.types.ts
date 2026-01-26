import type { EndpointBody, EndpointParams, EndpointQuery } from "@repo/types";

export type FeatureIndexQuery = EndpointQuery<"/manager/private/feature/index">;
export type FeatureStoreDTO = EndpointBody<"/manager/private/feature/store">;
export type FeatureUpdateDTO = EndpointBody<"/manager/private/feature/update">;
export type FeatureUpdateParams = EndpointParams<"/manager/private/feature/update">;
