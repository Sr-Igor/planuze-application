import type { profile } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const meEndpoint = createSimpleEndpoint<profile>()({
  basePath: "/api/private/me",
  routes: {
    show: "/api/private/me/show",
  },
});

export type Me = profile;

// Direct function exports for backwards compatibility
export const meShow = meEndpoint.show;
