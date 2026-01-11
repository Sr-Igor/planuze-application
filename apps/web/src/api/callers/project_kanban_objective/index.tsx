import { project_kanban_objective } from "@repo/api/generator/types";

import { useBase } from "@/api/hooks/use-base";
import * as api from "@/api/req/project_kanban_objective";
import { IUseCallerProps } from "@/api/types";

export const useProjectKanbanObjective = (props: IUseCallerProps<project_kanban_objective>) => {
  return useBase({
    ...props,
    api,
    cache: "project_kanban_objective",
  });
};
