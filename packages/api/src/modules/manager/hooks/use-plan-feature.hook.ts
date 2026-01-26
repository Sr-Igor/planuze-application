import { useMutation } from "@tanstack/react-query";

import type { plan_feature } from "@repo/types";

import { planFeatureEndpoint } from "../endpoints/plan_feature";
import type { PlanFeatureStoreDTO } from "../endpoints/plan_feature/plan_feature.types";

export interface UsePlanFeatureCallbacks {
  store?: {
    onSuccess?: (data: plan_feature) => void;
    onError?: (error: unknown) => void;
  };
  destroy?: {
    onSuccess?: (data: void) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UsePlanFeatureProps {
  callbacks?: UsePlanFeatureCallbacks;
}

export const usePlanFeature = ({ callbacks }: UsePlanFeatureProps = {}) => {
  const store = useMutation({
    mutationFn: (body: PlanFeatureStoreDTO) => planFeatureEndpoint.store(body),
    onSuccess: (data) => {
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const destroy = useMutation({
    mutationFn: (id: string) => planFeatureEndpoint.destroy({ id }),
    onSuccess: (data) => {
      callbacks?.destroy?.onSuccess?.(data);
    },
    onError: callbacks?.destroy?.onError,
  });

  return { store, destroy };
};
