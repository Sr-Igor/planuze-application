import * as api from "#/web/req/subscription";
import keys from "#/cache/keys";
import { IUseCallerProps } from "#/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import { subscription } from "@repo/types";
import { useAuth } from "@repo/redux/hook";

import { Pagination } from "../../../@types";
import { placeholderData } from "./placeholder";

export interface IUseSubscriptionProps extends Omit<IUseCallerProps<subscription>, "callbacks"> {
  callbacks?: {
    upgrade?: {
      onSuccess?: (data: { url: string }) => void;
      onError?: (e: any) => void;
    };
    portal?: {
      onSuccess?: (data: { url: string }) => void;
      onError?: (e: any) => void;
    };
  };
}

export const useSubscription = ({ enabledIndex = false, callbacks }: IUseSubscriptionProps) => {
  const indexKey = keys.subscription.index();

  const { hasLevel, hasProfile, hasTwoAuth } = useAuth();

  const index = useQuery<Pagination<subscription>>({
    queryKey: indexKey,
    queryFn: () =>
      hasLevel && hasProfile && hasTwoAuth ? api.index() : Promise.resolve({ data: { data: [] } }),
    placeholderData,
    enabled: !!enabledIndex,
    initialData: placeholderData,
  });

  const upgrade = useMutation({
    mutationFn: (price_id: string) => api.update(price_id),
    onSuccess: (e) => {
      callbacks?.upgrade?.onSuccess?.(e);
    },
    onError: callbacks?.upgrade?.onError,
  });

  const portal = useMutation({
    mutationFn: () => api.show(),
    onSuccess: (e) => {
      callbacks?.portal?.onSuccess?.(e);
    },
    onError: callbacks?.portal?.onError,
  });

  return { index, upgrade, portal };
};
