import * as api from "#/web/req/project_kanban_objective_target";
import { useNestedArray } from "#/hooks/use-nested-array";
import { IUseCallerProps } from "#/types";

import { project_kanban_objective_target } from "@repo/types";

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
