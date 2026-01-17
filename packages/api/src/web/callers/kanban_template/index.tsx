import * as api from "#/web/req/kanban_template";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { kanban_template } from "@repo/types";

export const useKanbanTemplate = (props: IUseCallerProps<kanban_template>) => {
  return useBase({
    ...props,
    api,
    cache: "kanban_template",
  });
};
