import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { feature, Pagination } from "@repo/types";

import { featureEndpoint } from "../endpoints/feature";
import type {
  FeatureIndexQuery,
  FeatureStoreDTO,
  FeatureUpdateDTO,
} from "../endpoints/feature/feature.types";

export interface UseFeatureCallbacks {
  store?: {
    onSuccess?: (data: feature) => void;
    onError?: (error: unknown) => void;
  };
  update?: {
    onSuccess?: (data: feature) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseFeatureProps {
  callbacks?: UseFeatureCallbacks;
  filters?: FeatureIndexQuery;
  enabledIndex?: boolean;
  id?: string;
}

export const useFeature = ({ callbacks, filters, enabledIndex, id }: UseFeatureProps = {}) => {
  const queryClient = useQueryClient();
  const indexKey = ["feature", filters];

  const index = useQuery<Pagination<feature>>({
    queryKey: indexKey,
    queryFn: () => featureEndpoint.index(filters),
    enabled: !!enabledIndex,
  });

  const store = useMutation({
    mutationFn: (body: FeatureStoreDTO) => featureEndpoint.store(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: indexKey });
      callbacks?.store?.onSuccess?.(data);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: FeatureUpdateDTO) => {
      if (!id) throw new Error("ID is required for update");
      return featureEndpoint.update({ id }, body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: indexKey });
      callbacks?.update?.onSuccess?.(data);
    },
    onError: callbacks?.update?.onError,
  });

  return { index, store, update };
};
