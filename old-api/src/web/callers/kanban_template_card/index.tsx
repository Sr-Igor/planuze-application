import * as api from "#/web/req/kanban_template_card";
import { useNestedArray } from "#/hooks/use-nested-array";
import { IUseCallerProps } from "#/types";

import { kanban_template_card } from "@repo/types";

export const useKanbanTemplateCard = (props: IUseCallerProps<kanban_template_card>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "kanban_template",
    cache: "kanban_template_card",
    field: "kanban_template_cards",
    accessKey: props.filters?.kanban_template_id,
    nestedArrayOptions: {
      orderKey: "createdAt",
      orderValue: "desc",
      dataType: "date",
    },
  });
};
