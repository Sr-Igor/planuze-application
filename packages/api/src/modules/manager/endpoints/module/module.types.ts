import type { EndpointBody, EndpointParams, EndpointQuery } from "@repo/types";

export type ModuleIndexQuery = EndpointQuery<"/manager/private/module/index">;
export type ModuleStoreDTO = EndpointBody<"/manager/private/module/store">;
export type ModuleUpdateDTO = EndpointBody<"/manager/private/module/update">;
export type ModuleUpdateParams = EndpointParams<"/manager/private/module/update">;
