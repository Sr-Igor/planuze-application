import * as api from "#/web/req/project_kanban_cycle_card_file";
import { useNestedArray } from "#/hooks/use-nested-array";
import { IUseCallerProps } from "#/types";

import { project_kanban_cycle_card_file } from "@repo/types";

export const useProjectKanbanCycleCardFile = (
  props: IUseCallerProps<project_kanban_cycle_card_file>
) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "project_kanban_cycle_card",
    cache: "project_kanban_cycle_card_file",
    field: "project_kanban_cycle_card_files",
    accessKey: props.filters?.project_kanban_cycle_card_id,
  });
};
