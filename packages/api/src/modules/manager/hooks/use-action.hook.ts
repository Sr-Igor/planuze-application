import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { action, Pagination } from "@repo/types";

import { actionEndpoint } from "../endpoints/action";
import type {
  ActionIndexQuery,
  ActionStoreDTO,
  ActionUpdateDTO,
} from "../endpoints/action/action.types";

export interface UseActionCallbacks {
  store?: {
    onSuccess?: (data: action) => void;
    onError?: (error: unknown) => void;
  };
  update?: {
    onSuccess?: (data: action) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseActionProps {
  callbacks?: UseActionCallbacks;
  filters?: ActionIndexQuery;
  enabledIndex?: boolean;
  id?: string;
}

export const useAction = ({ callbacks, filters, enabledIndex, id }: UseActionProps = {}) => {
  const queryClient = useQueryClient();
  const indexKey = ["action", filters];

  const index = useQuery<Pagination<action>>({
    queryKey: indexKey,
    queryFn: () => actionEndpoint.index(filters),
    enabled: !!enabledIndex,
  });

  const store = useMutation({
    mutationFn: (body: ActionStoreDTO) => actionEndpoint.store(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: indexKey });
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: ActionUpdateDTO) => {
      if (!id) throw new Error("ID is required for update");
      return actionEndpoint.update({ id }, body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: indexKey });
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  return { index, store, update };
};
