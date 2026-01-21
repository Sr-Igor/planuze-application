import type { integration } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const integrationEndpoint = createSimpleEndpoint<integration>()({
  basePath: "/api/private/integration",
  routes: {
    index: "/api/private/integration/index",
    show: "/api/private/integration/show",
    store: "/api/private/integration/store",
    update: "/api/private/integration/update",
    destroy: "/api/private/integration/destroy",
    many: "/api/private/integration/many",
    trash: "/api/private/integration/trash",
    restore: "/api/private/integration/restore",
  },
  defaultQuery: {
    include: {
      logs,
      integration_actions: {
        include: {
          action: true,
          feature: true,
        },
      },
    },
  },
});

export type Integration = integration;

// Direct function exports for backwards compatibility
export const integrationIndex = integrationEndpoint.index;
export const integrationShow = integrationEndpoint.show;
export const integrationStore = integrationEndpoint.store;
export const integrationUpdate = integrationEndpoint.update;
export const integrationDestroy = integrationEndpoint.destroy;
export const integrationMany = integrationEndpoint.many;
export const integrationTrash = integrationEndpoint.trash;
export const integrationRestore = integrationEndpoint.restore;
