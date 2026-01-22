import { useMutation, useQuery } from "@tanstack/react-query";

import { useAuth } from "@repo/redux/hook";
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
}

/**
 * Hook for Subscription operations
 * Matches old-project behavior: hasLevel && hasProfile && hasTwoAuth ? api.index() : Promise.resolve({ data: { data: [] } })
 */
export const useSubscription = ({ enabledIndex = false, callbacks }: UseSubscriptionProps = {}) => {
  const indexKey = cacheKeys.subscription.index();
  const { hasLevel, hasProfile, hasTwoAuth } = useAuth();

  const index = useQuery<Pagination<subscription>>({
    queryKey: indexKey,
    queryFn: () =>
      hasLevel && hasProfile && hasTwoAuth
        ? subscriptionEndpoint.index()
        : Promise.resolve({ data: { data: [] } } as unknown as Pagination<subscription>),
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
      callbacks?.portal?.onSuccess?.(e as any);
    },
    onError: callbacks?.portal?.onError,
  });

  return { index, upgrade, portal };
};
