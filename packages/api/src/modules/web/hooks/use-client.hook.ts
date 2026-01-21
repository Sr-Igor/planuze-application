import type { client } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { clientEndpoint } from "../endpoints/client/client.endpoint";

/**
 * Hook for Client CRUD operations
 *
 * @example
 * ```tsx
 * const { index, show, store, update, destroy } = useClient({
 *   filters: { page: 1 },
 *   enabledIndex: true,
 *   id: clientId,
 *   enabledShow: !!clientId,
 * });
 *
 * // Create client
 * store.mutate({ name: 'New Client' });
 *
 * // List clients
 * const clients = index.data?.data;
 * ```
 */
export const useClient = (props: UseCallerProps<client>): UseCrudReturn<client> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<client>({
    endpoint: clientEndpoint,
    cacheKeys: cacheKeys.client,
    id,
    filters,
    enabled: {
      index: enabledIndex,
      show: enabledShow,
      trash: enableTrash,
    },
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      many: callbacks?.many,
      restore: callbacks?.restore,
    },
  });
};
