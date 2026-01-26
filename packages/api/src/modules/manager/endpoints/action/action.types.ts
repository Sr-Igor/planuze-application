import type { EndpointBody, EndpointParams, EndpointQuery } from "@repo/types";

export type ActionIndexQuery = EndpointQuery<"/manager/private/action/index">;
export type ActionStoreDTO = EndpointBody<"/manager/private/action/store">;
export type ActionUpdateDTO = EndpointBody<"/manager/private/action/update">;
export type ActionUpdateParams = EndpointParams<"/manager/private/action/update">;
