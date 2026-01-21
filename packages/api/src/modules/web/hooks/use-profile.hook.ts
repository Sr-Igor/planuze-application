import type { profile } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { profileEndpoint } from "../endpoints/profile/profile.endpoint";

/**
 * Hook for Profile CRUD operations
 *
 * @example
 * ```tsx
 * const { index, show, store, update, destroy } = useProfile({
 *   filters: { page: 1 },
 *   enabledIndex: true,
 *   id: profileId,
 *   enabledShow: !!profileId,
 * });
 * ```
 */
export const useProfile = (props: UseCallerProps<profile>): UseCrudReturn<profile> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useCrud<profile>({
    endpoint: profileEndpoint,
    cacheKeys: cacheKeys.profile,
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
