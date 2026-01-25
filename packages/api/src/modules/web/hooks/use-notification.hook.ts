import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  useMutation,
  type UseMutationResult,
} from "@tanstack/react-query";

import type { notification, Pagination } from "@repo/types";

import { useCache } from "../../../infrastructure/cache";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { notificationClean, notificationEndpoint } from "../endpoints/notification";

/**
 * Update notification input
 */
export interface NotificationUpdateInput {
  id: string;
  read: boolean;
}

/**
 * Extended return type for useNotification hook
 */
export interface UseNotificationReturn {
  index: UseInfiniteQueryResult<InfiniteData<Pagination<notification>>, Error>;
  update: UseMutationResult<notification, Error, NotificationUpdateInput>;
  clean: UseMutationResult<void, Error, void>;
}

/**
 * Hook for Notification operations
 *
 * Uses useInfiniteQuery for index to support infinite scroll pagination
 */
export const useNotification = (props: UseCallerProps<notification>): UseNotificationReturn => {
  const { filters, enabledIndex, callbacks } = props;

  const cache = useCache();
  const indexKey = cacheKeys.notification.index(filters);

  /**
   * Index query with infinite pagination support
   */
  const index = useInfiniteQuery<Pagination<notification>, Error>({
    queryKey: indexKey,
    queryFn: ({ pageParam = 1 }) =>
      notificationEndpoint.index({ ...filters, page: pageParam as number }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!enabledIndex,
  });

  /**
   * Update notification (mark as read/unread)
   */
  const update = useMutation<notification, Error, NotificationUpdateInput>({
    mutationFn: ({ id, read }) =>
      notificationEndpoint.update(id, { read }) as Promise<notification>,
    onSuccess: (data) => {
      cache.refetchQueries(indexKey);
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  /**
   * Clean all notifications (mark all as read)
   */
  const clean = useMutation<void, Error, void>({
    mutationFn: () => notificationClean(),
    onSuccess: () => {
      cache.invalidateQueries(indexKey);
    },
  });

  return { index, update, clean };
};
