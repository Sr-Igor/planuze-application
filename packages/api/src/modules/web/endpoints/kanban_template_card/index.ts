import type { kanban_template_card } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const kanbanTemplateCardEndpoint = createSimpleEndpoint<kanban_template_card>()({
  basePath: "/api/private/kanban_template_card",
  routes: {
    store: "/api/private/kanban_template_card/store",
    update: "/api/private/kanban_template_card/update",
    destroy: "/api/private/kanban_template_card/destroy",
    many: "/api/private/kanban_template_card/many",
  },
  defaultQuery: {
    include: {
      logs,
      kanban_template_card_type: true,
    },
  },
});

export type KanbanTemplateCard = kanban_template_card;

// Direct function exports for backwards compatibility
export const kanbanTemplateCardStore = kanbanTemplateCardEndpoint.store;
export const kanbanTemplateCardUpdate = kanbanTemplateCardEndpoint.update;
export const kanbanTemplateCardDestroy = kanbanTemplateCardEndpoint.destroy;
export const kanbanTemplateCardMany = kanbanTemplateCardEndpoint.many;
