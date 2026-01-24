import * as api from "#/web/req/kanban_template_card_type";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { kanban_template_card_type } from "@repo/types";

export const useKanbanTemplateCardType = (props: IUseCallerProps<kanban_template_card_type>) => {
  return useBase({
    ...props,
    api,
    cache: "kanban_template_card_type",
  });
};
