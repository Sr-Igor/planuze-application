import { useInfiniteQuery } from "@tanstack/react-query";

import { workTypeIndex } from "@repo/api/web";
import { Pagination, work_type } from "@repo/types";

import { useAccess } from "@/hooks/access";

import { ISelectProps, ISelectReturnProps } from "../types";

export const useIndexWorkType = ({ search }: ISelectProps): ISelectReturnProps => {
  const { permissions } = useAccess();
  const perm = permissions("work_type");

  const queryParams = {
    limit: 10,
  };

  const hash = { ...queryParams, search: search || undefined };

  const workTypes = useInfiniteQuery<Pagination<work_type>>({
    queryKey: ["kanban-selects-work-type", hash],
    queryFn: ({ pageParam = 1 }) => {
      const params: Record<string, any> = { page: pageParam, ...queryParams };
      if (search) params.search = search;
      return workTypeIndex(params);
    },
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: perm.index,
  });

  return workTypes;
};
