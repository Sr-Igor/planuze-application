import { useMutation } from "@tanstack/react-query";

import type { plan_feature_action } from "@repo/types";

import { planFeatureActionEndpoint } from "../endpoints/plan_feature_action";
import type { PlanFeatureActionStoreDTO } from "../endpoints/plan_feature_action/plan_feature_action.types";

export interface UsePlanFeatureActionCallbacks {
  store?: {
    onSuccess?: (data: plan_feature_action) => void;
    onError?: (error: unknown) => void;
  };
  destroy?: {
    onSuccess?: (data: void) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UsePlanFeatureActionProps {
  callbacks?: UsePlanFeatureActionCallbacks;
}

export const usePlanFeatureAction = ({ callbacks }: UsePlanFeatureActionProps = {}) => {
  const store = useMutation({
    mutationFn: (body: PlanFeatureActionStoreDTO) => planFeatureActionEndpoint.store(body),
    onSuccess: (data) => {
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const destroy = useMutation({
    mutationFn: (id: string) => planFeatureActionEndpoint.destroy({ id }),
    onSuccess: (data) => {
      callbacks?.destroy?.onSuccess?.(data);
    },
    onError: callbacks?.destroy?.onError,
  });

  return { store, destroy };
};
