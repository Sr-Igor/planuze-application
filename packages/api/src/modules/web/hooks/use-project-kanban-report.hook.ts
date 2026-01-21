import { useMutation, useQuery } from "@tanstack/react-query";

import type { QueryFilters } from "../../../core/domain/interfaces/endpoint.interface";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import {
  IKanbanReportResponse,
  projectKanbanReportPlaceholder,
} from "../../../shared/constants/placeholders";
import { projectKanbanReportEndpoint } from "../endpoints/project_kanban_report";

export interface UseProjectKanbanReportProps {
  filters?: QueryFilters;
  enabledIndex?: boolean;
}

export const useProjectKanbanReport = ({
  filters,
  enabledIndex,
}: UseProjectKanbanReportProps = {}) => {
  const indexKey = cacheKeys.project_kanban_report.index(filters);

  const index = useQuery<IKanbanReportResponse>({
    queryKey: indexKey,
    queryFn: () => projectKanbanReportEndpoint.index(filters),
    placeholderData: projectKanbanReportPlaceholder,
    enabled: !!enabledIndex,
  });

  const exported = useMutation({
    mutationKey: cacheKeys.project_kanban_report.index({ ...filters, export: true }),
    mutationFn: () => projectKanbanReportEndpoint.export({ ...filters, export: true }),
  });

  return { index, exported };
};
