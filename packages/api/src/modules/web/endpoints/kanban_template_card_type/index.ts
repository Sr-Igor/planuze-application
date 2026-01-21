import type { kanban_template_card_type } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const kanbanTemplateCardTypeEndpoint = createSimpleEndpoint<kanban_template_card_type>()({
  basePath: "/api/private/kanban_template_card_type",
  routes: {
    index: "/api/private/kanban_template_card_type/index",
    store: "/api/private/kanban_template_card_type/store",
    update: "/api/private/kanban_template_card_type/update",
    destroy: "/api/private/kanban_template_card_type/destroy",
    many: "/api/private/kanban_template_card_type/many",
    trash: "/api/private/kanban_template_card_type/trash",
    restore: "/api/private/kanban_template_card_type/restore",
  },
});

export type KanbanTemplateCardType = kanban_template_card_type;

// Direct function exports for backwards compatibility
export const kanbanTemplateCardTypeIndex = kanbanTemplateCardTypeEndpoint.index;
export const kanbanTemplateCardTypeStore = kanbanTemplateCardTypeEndpoint.store;
export const kanbanTemplateCardTypeUpdate = kanbanTemplateCardTypeEndpoint.update;
export const kanbanTemplateCardTypeDestroy = kanbanTemplateCardTypeEndpoint.destroy;
export const kanbanTemplateCardTypeMany = kanbanTemplateCardTypeEndpoint.many;
export const kanbanTemplateCardTypeTrash = kanbanTemplateCardTypeEndpoint.trash;
export const kanbanTemplateCardTypeRestore = kanbanTemplateCardTypeEndpoint.restore;
