import type { module as ModuleType } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { moduleEndpoint } from "../endpoints/module";

/**
 * Hook for Module operations
 */
export const useModule = (props: UseCallerProps<ModuleType> = {}): UseInsertReturn<ModuleType> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;

  return useInsert<ModuleType>({
    endpoint: moduleEndpoint as any,
    cacheKeys: cacheKeys.module,
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
