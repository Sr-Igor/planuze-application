import type { kanban_template } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const kanbanTemplateEndpoint = createSimpleEndpoint<kanban_template>()({
  basePath: "/api/private/kanban_template",
  routes: {
    index: "/api/private/kanban_template/index",
    show: "/api/private/kanban_template/show",
    store: "/api/private/kanban_template/store",
    update: "/api/private/kanban_template/update",
    destroy: "/api/private/kanban_template/destroy",
    many: "/api/private/kanban_template/many",
    trash: "/api/private/kanban_template/trash",
    restore: "/api/private/kanban_template/restore",
  },
  defaultQuery: {
    include: {
      logs,
      kanban_template_cards: {
        include: {
          logs,
          kanban_template_card_type: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      kanban_template_columns: {
        include: { logs },
        orderBy: {
          order: "desc",
        },
      },
      profile: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  },
});

export type KanbanTemplate = kanban_template;

// Direct function exports for backwards compatibility
export const kanbanTemplateIndex = kanbanTemplateEndpoint.index;
export const kanbanTemplateShow = kanbanTemplateEndpoint.show;
export const kanbanTemplateStore = kanbanTemplateEndpoint.store;
export const kanbanTemplateUpdate = kanbanTemplateEndpoint.update;
export const kanbanTemplateDestroy = kanbanTemplateEndpoint.destroy;
export const kanbanTemplateMany = kanbanTemplateEndpoint.many;
export const kanbanTemplateTrash = kanbanTemplateEndpoint.trash;
export const kanbanTemplateRestore = kanbanTemplateEndpoint.restore;
