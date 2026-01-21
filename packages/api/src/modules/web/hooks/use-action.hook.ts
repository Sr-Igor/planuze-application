import type { action } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { actionEndpoint } from "../endpoints/action";

/**
 * Hook for Action operations
 */
export const useAction = (props: UseCallerProps<action> = {}): UseInsertReturn<action> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<action>({
    endpoint: actionEndpoint as any,
    cacheKeys: cacheKeys.action,
    id,
    filters,
    enabledIndex,
    enabledShow,
    enableTrash,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });
};
