import * as api from "#/web/req/project_kanban_report";
import keys from "#/cache/keys";
import { IUseCallerProps } from "#/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import { IIndexResponseDTO } from "./types";

export const useProjectKanbanReport = ({ filters, enabledIndex }: IUseCallerProps<any>) => {
  const indexKey = keys.project_kanban_report.index(filters);

  const index = useQuery<IIndexResponseDTO>({
    queryKey: indexKey,
    queryFn: () => api.index(filters),
    enabled: !!enabledIndex,
  });

  const exported = useMutation({
    mutationKey: keys.project_kanban_report.export(filters),
    mutationFn: () => api.exported({ ...filters, export: true }),
  });

  return { index, exported };
};
