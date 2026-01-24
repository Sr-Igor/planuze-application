import type { kanban_template_column } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const kanbanTemplateColumnEndpoint = createSimpleEndpoint<kanban_template_column>()({
  basePath: "/api/private/kanban_template_column",
  routes: {
    store: "/api/private/kanban_template_column/store",
    update: "/api/private/kanban_template_column/update",
    destroy: "/api/private/kanban_template_column/destroy",
    many: "/api/private/kanban_template_column/many",
    restore: "/api/private/kanban_template_column/restore",
  },
  defaultQuery: {
    include: { logs },
  },
});

export type KanbanTemplateColumn = kanban_template_column;

// Direct function exports for backwards compatibility
export const kanbanTemplateColumnStore = kanbanTemplateColumnEndpoint.store;
export const kanbanTemplateColumnUpdate = kanbanTemplateColumnEndpoint.update;
export const kanbanTemplateColumnDestroy = kanbanTemplateColumnEndpoint.destroy;
export const kanbanTemplateColumnMany = kanbanTemplateColumnEndpoint.many;
export const kanbanTemplateColumnRestore = kanbanTemplateColumnEndpoint.restore;
