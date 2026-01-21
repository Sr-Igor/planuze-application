import type { notification } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { typedRequest } from "../../../../infrastructure/http/axios-client";

export const notificationEndpoint = createSimpleEndpoint<notification>()({
  basePath: "/api/private/notification",
  routes: {
    index: "/api/private/notification/index",
    update: "/api/private/notification/update",
    many: "/api/private/notification/many",
  },
});

// Custom endpoints
export const notificationClean = () =>
  typedRequest<void>()({
    route: "/api/private/notification/clean",
  });

export type Notification = notification;

// Direct function exports for backwards compatibility
export const notificationIndex = notificationEndpoint.index;
export const notificationUpdate = notificationEndpoint.update;
export const notificationMany = notificationEndpoint.many;
