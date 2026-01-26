import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { module as ModuleType, Pagination } from "@repo/types";

import { moduleEndpoint } from "../endpoints/module";
import type {
  ModuleIndexQuery,
  ModuleStoreDTO,
  ModuleUpdateDTO,
} from "../endpoints/module/module.types";

export interface UseModuleCallbacks {
  store?: {
    onSuccess?: (data: ModuleType) => void;
    onError?: (error: unknown) => void;
  };
  update?: {
    onSuccess?: (data: ModuleType) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseModuleProps {
  callbacks?: UseModuleCallbacks;
  filters?: ModuleIndexQuery;
  enabledIndex?: boolean;
  id?: string;
}

export const useModule = ({ callbacks, filters, enabledIndex, id }: UseModuleProps = {}) => {
  const queryClient = useQueryClient();
  const indexKey = ["module", filters];

  const index = useQuery<Pagination<ModuleType>>({
    queryKey: indexKey,
    queryFn: () => moduleEndpoint.index(filters),
    enabled: !!enabledIndex,
  });

  const store = useMutation({
    mutationFn: (body: ModuleStoreDTO) => moduleEndpoint.store(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: indexKey });
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: ModuleUpdateDTO) => {
      if (!id) throw new Error("ID is required for update");
      return moduleEndpoint.update({ id }, body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: indexKey });
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  return { index, store, update };
};
