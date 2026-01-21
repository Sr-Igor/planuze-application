import type { client_address } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

/**
 * Client Address endpoint - only supports store and update
 */
export const clientAddressEndpoint = createSimpleEndpoint<client_address>()({
  basePath: "/api/private/client_address",
  routes: {
    store: "/api/private/client_address/store",
    update: "/api/private/client_address/update",
  },
  defaultQuery: {
    include: { logs },
  },
});

export type ClientAddress = client_address;

// Direct function exports for backwards compatibility
export const clientAddressStore = clientAddressEndpoint.store;
export const clientAddressUpdate = clientAddressEndpoint.update;
