import { useInfiniteQuery } from "@tanstack/react-query";

import { project_kanban_objective } from "@repo/types";

import { index } from "@repo/api/web/req/project_kanban_objective";
import { useAccess } from "@/hooks/access";
import { Pagination } from "@/types/pagination";

import { ISelectProps, ISelectReturnProps } from "../types";

export const useIndexObjective = ({ search, kanban }: ISelectProps): ISelectReturnProps => {
  const { permissions } = useAccess();
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
      return index(params);
    },
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: perm.index,
  });

  return objectives;
};
