import { useInfiniteQuery } from "@tanstack/react-query";

import { projectKanbanObjectiveIndex } from "@repo/api/web";
import { useUserAccess } from "@repo/redux/hooks";
import { Pagination, project_kanban_objective } from "@repo/types";

import { ISelectProps, ISelectReturnProps } from "../types";

export const useIndexObjective = ({ search, kanban }: ISelectProps): ISelectReturnProps => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_kanban_objective");

  const queryParams = {
    limit: 10,
    project_kanban_id: kanban?.id,
  };

  const hash = { ...queryParams, search: search || undefined };

  const objectives = useInfiniteQuery<Pagination<project_kanban_objective>>({
    queryKey: ["kanban-selects-objective", hash],
    queryFn: ({ pageParam = 1 }) => {
      const params: Record<string, any> = { page: pageParam, ...queryParams };
      if (search) params.search = search;
      return projectKanbanObjectiveIndex!(params);
    },
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: perm.index,
  });

  return objectives;
};
