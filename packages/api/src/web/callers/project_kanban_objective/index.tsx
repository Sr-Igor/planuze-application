import * as api from "#/web/req/project_kanban_objective";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { project_kanban_objective } from "@repo/types";

export const useProjectKanbanObjective = (props: IUseCallerProps<project_kanban_objective>) => {
  return useBase({
    ...props,
    api,
    cache: "project_kanban_objective",
  });
};
