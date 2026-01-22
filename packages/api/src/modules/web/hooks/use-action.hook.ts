import { useEffect } from "react";

import { useAppDispatch } from "@repo/redux/hook";
import { set as setModule } from "@repo/redux/store/modules/module/actions";
import type { action } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { actionEndpoint } from "../endpoints/action";

/**
 * Hook for Action operations
 *
 * IMPORTANT: This hook dispatches actions to Redux state (matches old-project behavior)
 */
export const useAction = (props: UseCallerProps<action> = {}): UseInsertReturn<action> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;
  const dispatch = useAppDispatch();

  const result = useInsert<action>({
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

  // Dispatch to Redux when data arrives (matches old-project behavior)
  useEffect(() => {
    if (result.index?.data?.data) {
      dispatch(setModule({ actions: result.index.data.data }));
    }
  }, [result.index.data, dispatch]);

  return result;
};
