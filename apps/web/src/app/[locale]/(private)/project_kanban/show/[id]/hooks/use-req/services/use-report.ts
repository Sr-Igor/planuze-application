import { project_kanban } from "@repo/api/generator/types";

import { useProjectKanbanReport } from "@/api/callers/project_kanban_report";
import { useAccess } from "@/hooks/access";

import { IParams } from "../../use-query/types";

export interface IUseReportProps {
  params: IParams;
  kanban?: project_kanban;
}

export const useReport = ({ kanban, params }: IUseReportProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_report");

  const requests = useProjectKanbanReport({
    filters: {
      project_id: kanban?.project_id,
      project_kanban_id: kanban?.id,
      project_kanban_cycle_id: params?.report_cycle,
      project_version_id: params?.report_version,
      project_kanban_cycle_card_type_id: params?.report_cardType,
      project_kanban_objective_id: params?.report_objective,
      work_type_id: params?.report_workType,
      profile_id: params?.report_member,
    },
    enabledIndex: !!kanban?.project_id && perm.index && params.view === "reports",
  });
  return requests;
};
