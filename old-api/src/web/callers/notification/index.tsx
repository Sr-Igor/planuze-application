import * as api from "#/web/req/notification";
import { useCache } from "#/cache";
import keys from "#/cache/keys";
import { IUseCallerProps } from "#/types";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { notification } from "@repo/types";

import { Pagination } from "../../../@types";

export const useNotification = ({
  callbacks,
  filters,
  enabledIndex,
}: IUseCallerProps<notification>) => {
  const indexKey = keys.notification.index(filters);
  const cache = useCache();

  const index = useInfiniteQuery<Pagination<notification>>({
    queryKey: indexKey,
    queryFn: ({ pageParam = 1 }) => api.index({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!enabledIndex,
  });

  const update = useMutation({
    mutationFn: (data: { id: string; read: boolean }) => api.update(data.id, { read: data.read }),
    onSuccess: (e) => {
      cache.invalidateQueries(indexKey);
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  const clean = useMutation({
    mutationFn: api.clean,
    onSuccess: () => {
      cache.invalidateQueries(indexKey);
    },
  });

  return { index, update, clean };
};
