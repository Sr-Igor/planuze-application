import {
  project_kanban_objective,
  project_kanban_objective_target,
} from "@repo/types";

import { useProjectKanbanObjectiveTarget } from "@repo/api/web/callers/project_kanban_objective_target";
import { useLogs } from "@/hooks/logs";
import { useTrash } from "@/hooks/trash";
import { CardListTemplate } from "@/templates/card-list";
import { RegisterCard } from "@/templates/card-list/cards/register";
import { useShow } from "@/templates/show/context";

import { useForm } from "./use-form";

export const Target = () => {
  const logs = useLogs();
  const trash = useTrash();

  return (
    <CardListTemplate<project_kanban_objective, project_kanban_objective_target>
      path="project_kanban_objective"
      translate="show.target"
      dataAccess="project_kanban_objective_targets"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<project_kanban_objective_target>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={logs.project_kanban_objective_target()}
          />
        );
      }}
      hookReq={useProjectKanbanObjectiveTarget}
      getFilters={(data) => ({
        project_kanban_objective_id: data?.id,
      })}
      getBodyKeys={(data) => ({
        project_kanban_objective_id: data?.id,
        project_id: data?.project_id,
        project_kanban_id: data?.project_kanban_id,
      })}
      trash={trash.project_kanban_objective_target()}
    />
  );
};
