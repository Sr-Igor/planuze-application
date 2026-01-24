import * as api from "#/web/req/kanban_template_tag";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { kanban_template_tag } from "@repo/types";

export const useKanbanTemplateTag = (props: IUseCallerProps<kanban_template_tag>) => {
  return useBase({
    ...props,
    api,
    cache: "kanban_template_tag",
  });
};
