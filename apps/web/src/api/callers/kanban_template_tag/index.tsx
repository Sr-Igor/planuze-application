import { kanban_template_tag } from "@repo/api/generator/types";

import { useBase } from "@/api/hooks/use-base";
import * as api from "@/api/req/kanban_template_tag";
import { IUseCallerProps } from "@/api/types";

export const useKanbanTemplateTag = (props: IUseCallerProps<kanban_template_tag>) => {
  return useBase({
    ...props,
    api,
    cache: "kanban_template_tag",
  });
};
