import type { kanban_template_column } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";

export const kanbanTemplateColumnEndpoint = createSimpleEndpoint<kanban_template_column>()({
  basePath: "/api/private/kanban_template_column",
  routes: {
    store: "/api/private/kanban_template_column/store",
    update: "/api/private/kanban_template_column/update",
    destroy: "/api/private/kanban_template_column/destroy",
    many: "/api/private/kanban_template_column/many",
  },
});

export type KanbanTemplateColumn = kanban_template_column;

// Direct function exports for backwards compatibility
export const kanbanTemplateColumnStore = kanbanTemplateColumnEndpoint.store;
export const kanbanTemplateColumnUpdate = kanbanTemplateColumnEndpoint.update;
export const kanbanTemplateColumnDestroy = kanbanTemplateColumnEndpoint.destroy;
export const kanbanTemplateColumnMany = kanbanTemplateColumnEndpoint.many;
