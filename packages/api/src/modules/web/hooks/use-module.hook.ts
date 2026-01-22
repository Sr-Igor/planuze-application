import { useEffect } from "react";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { useAppDispatch, useAuth } from "@repo/redux/hook";
import { set as setModule } from "@repo/redux/store/modules/module/actions";
import type { module as ModuleType, Pagination } from "@repo/types";

import { useInsert, type UseInsertReturn } from "../../../application/hooks/use-insert.hook";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { moduleEndpoint } from "../endpoints/module";

/**
 * Hook for Module operations
 * Supports both public and private endpoints based on authentication state
 * Matches old-project behavior: hasProfile && hasTwoAuth ? api.indexPrivate() : api.indexPublic()
 *
 * IMPORTANT: This hook dispatches modules to Redux state (matches old-project behavior)
 */
export const useModule = (props: UseCallerProps<ModuleType> = {}): UseInsertReturn<ModuleType> => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, callbacks } = props;
  const { hasProfile, hasTwoAuth } = useAuth();
  const dispatch = useAppDispatch();

  // Create a dynamic endpoint that chooses public/private based on auth state
  const dynamicEndpoint = {
    ...moduleEndpoint,
    index: (filters?: Record<string, unknown>) => {
      // Match old-project logic: hasProfile && hasTwoAuth ? api.indexPrivate() : api.indexPublic()
      if (hasProfile && hasTwoAuth) {
        return moduleEndpoint.indexPrivate(filters);
      }
      return moduleEndpoint.indexPublic(filters);
    },
  };

  // Use useInsert for other operations, but we need to override the index query
  const insertResult = useInsert<ModuleType>({
    endpoint: dynamicEndpoint as any,
    cacheKeys: cacheKeys.module,
    id,
    filters,
    enabledIndex: false, // Disable default index, we'll create our own
    enabledShow,
    enableTrash,
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      restore: callbacks?.restore,
    },
  });

  // Custom index query that chooses public/private based on auth state
  const indexKey = cacheKeys.module.index(filters);
  const index: UseQueryResult<Pagination<ModuleType>, Error> = useQuery<
    Pagination<ModuleType>,
    Error
  >({
    queryKey: indexKey,
    queryFn: () => {
      if (hasProfile && hasTwoAuth) {
        return moduleEndpoint.indexPrivate({ ...filters, return: undefined });
      }
      return moduleEndpoint.indexPublic({ ...filters, return: undefined });
    },
    enabled: !!enabledIndex,
    refetchOnWindowFocus: false,
  });

  // Dispatch to Redux when data arrives (matches old-project behavior)
  useEffect(() => {
    if (index?.data?.data) {
      dispatch(setModule({ all: index.data.data }));
    }
  }, [index.data, dispatch]);

  return {
    ...insertResult,
    index,
  };
};
