import { useInfiniteQuery } from "@tanstack/react-query";

import { project_version } from "@repo/types";

import { index } from "@repo/api/web/req/project_version";
import { useAccess } from "@/hooks/access";
import { Pagination } from "@/types/pagination";

import { ISelectProps, ISelectReturnProps } from "../types";

export const useIndexVersion = ({ search, kanban }: ISelectProps): ISelectReturnProps => {
  const { permissions } = useAccess();
  const perm = permissions("project_version");

  const queryParams = {
    limit: 10,
    project_id: kanban?.project_id,
  };

  const hash = { ...queryParams, search: search || undefined };

  const versions = useInfiniteQuery<Pagination<project_version>>({
    queryKey: ["kanban-selects-version", hash],
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

  return versions;
};
