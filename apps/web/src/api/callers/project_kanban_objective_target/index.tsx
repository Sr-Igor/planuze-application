import { project_kanban_objective_target } from "@repo/api/generator/types";

import { useNestedArray } from "@/api/hooks/use-nested-array";
import * as api from "@/api/req/project_kanban_objective_target";
import { IUseCallerProps } from "@/api/types";

export const useProjectKanbanObjectiveTarget = (
  props: IUseCallerProps<project_kanban_objective_target>
) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "project_kanban_objective",
    cache: "project_kanban_objective_target",
    field: "project_kanban_objective_targets",
    accessKey: props.filters?.project_kanban_objective_id,
  });
};
