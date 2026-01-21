import { useMutation, useQuery } from "@tanstack/react-query";

import type { Pagination, subscription } from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { subscriptionPlaceholder } from "../../../shared/constants/placeholders";
import { subscriptionEndpoint } from "../endpoints/subscription";

export interface UseSubscriptionCallbacks {
  upgrade?: {
    onSuccess?: (data: { url: string }) => void;
    onError?: (error: unknown) => void;
  };
  portal?: {
    onSuccess?: (data: { url: string }) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseSubscriptionProps {
  enabledIndex?: boolean;
  callbacks?: UseSubscriptionCallbacks;
  isAuthenticated?: boolean;
}

export const useSubscription = ({
  enabledIndex = false,
  callbacks,
  isAuthenticated = false,
}: UseSubscriptionProps = {}) => {
  const indexKey = cacheKeys.subscription.index();

  const index = useQuery<Pagination<subscription>>({
    queryKey: indexKey,
    queryFn: async (): Promise<Pagination<subscription>> =>
      isAuthenticated ? subscriptionEndpoint.index() : { data: [], page: 1, pages: 1, count: 0 },
    placeholderData: subscriptionPlaceholder,
    initialData: subscriptionPlaceholder,
    enabled: !!enabledIndex,
  });

  const upgrade = useMutation({
    mutationFn: (priceId: string) => subscriptionEndpoint.update(priceId),
    onSuccess: (e) => {
      callbacks?.upgrade?.onSuccess?.(e);
    },
    onError: callbacks?.upgrade?.onError,
  });

  const portal = useMutation({
    mutationFn: () => subscriptionEndpoint.show(),
    onSuccess: (e) => {
      callbacks?.portal?.onSuccess?.({ url: (e as unknown as { url: string }).url });
    },
    onError: callbacks?.portal?.onError,
  });

  return { index, upgrade, portal };
};
