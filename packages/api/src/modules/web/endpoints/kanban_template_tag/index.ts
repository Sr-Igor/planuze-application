import type { kanban_template_tag } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const kanbanTemplateTagEndpoint = createSimpleEndpoint<kanban_template_tag>()({
  basePath: "/api/private/kanban_template_tag",
  routes: {
    index: "/api/private/kanban_template_tag/index",
    store: "/api/private/kanban_template_tag/store",
    update: "/api/private/kanban_template_tag/update",
    destroy: "/api/private/kanban_template_tag/destroy",
    many: "/api/private/kanban_template_tag/many",
    trash: "/api/private/kanban_template_tag/trash",
    restore: "/api/private/kanban_template_tag/restore",
  },
  defaultQuery: {
    include: { logs },
  },
});

export type KanbanTemplateTag = kanban_template_tag;

// Direct function exports for backwards compatibility
export const kanbanTemplateTagIndex = kanbanTemplateTagEndpoint.index;
export const kanbanTemplateTagStore = kanbanTemplateTagEndpoint.store;
export const kanbanTemplateTagUpdate = kanbanTemplateTagEndpoint.update;
export const kanbanTemplateTagDestroy = kanbanTemplateTagEndpoint.destroy;
export const kanbanTemplateTagMany = kanbanTemplateTagEndpoint.many;
export const kanbanTemplateTagTrash = kanbanTemplateTagEndpoint.trash;
export const kanbanTemplateTagRestore = kanbanTemplateTagEndpoint.restore;
