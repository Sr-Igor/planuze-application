import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Pagination, plan } from "@repo/types";

import { planEndpoint } from "../endpoints/plan";
import type { PlanIndexQuery, PlanStoreDTO, PlanUpdateDTO } from "../endpoints/plan/plan.types";

export interface UsePlanCallbacks {
  store?: {
    onSuccess?: (data: plan) => void;
    onError?: (error: unknown) => void;
  };
  update?: {
    onSuccess?: (data: plan) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UsePlanProps {
  callbacks?: UsePlanCallbacks;
  filters?: PlanIndexQuery;
  enabledIndex?: boolean;
  enabledShow?: boolean;
  id?: string;
}

export const usePlan = ({
  callbacks,
  filters,
  enabledIndex,
  enabledShow,
  id,
}: UsePlanProps = {}) => {
  const queryClient = useQueryClient();
  const indexKey = ["plan", filters];
  const showKey = ["plan_show", id];

  const index = useQuery<Pagination<plan>>({
    queryKey: indexKey,
    queryFn: () => planEndpoint.index(filters),
    enabled: !!enabledIndex,
  });

  const show = useQuery<plan>({
    queryKey: showKey,
    queryFn: () => {
      if (!id) throw new Error("ID is required for show");
      return planEndpoint.show(id);
    },
    enabled: !!enabledShow && !!id,
  });

  const store = useMutation({
    mutationFn: (body: PlanStoreDTO) => planEndpoint.store(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: indexKey });
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: PlanUpdateDTO) => {
      if (!id) throw new Error("ID is required for update");
      return planEndpoint.update({ id }, body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: indexKey });
      // Update the cache for show as well
      if (id) {
        queryClient.setQueryData(showKey, data);
      }
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  return { index, show, store, update };
};
