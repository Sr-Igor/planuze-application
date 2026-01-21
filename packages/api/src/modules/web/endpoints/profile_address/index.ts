import type { profile_address } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const profileAddressEndpoint = createSimpleEndpoint<profile_address>()({
  basePath: "/api/private/profile_address",
  routes: {
    store: "/api/private/profile_address/store",
    update: "/api/private/profile_address/update",
  },
  defaultQuery: {
    include: { logs },
  },
});

export type ProfileAddress = profile_address;

// Direct function exports for backwards compatibility
export const profileAddressStore = profileAddressEndpoint.store;
export const profileAddressUpdate = profileAddressEndpoint.update;
