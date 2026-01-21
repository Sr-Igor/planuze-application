import { useMutation } from "@tanstack/react-query";

import {
  notificationSubscriptionEndpoint,
  type NotificationSubscriptionStoreBody,
} from "../endpoints/notification_subscription";

export interface UseNotificationSubscriptionCallbacks {
  key?: {
    onSuccess?: (data: { key: string }) => void;
    onError?: (error: unknown) => void;
  };
  store?: {
    onSuccess?: (data: unknown) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseNotificationSubscriptionProps {
  callbacks?: UseNotificationSubscriptionCallbacks;
}

export const useNotificationSubscription = ({
  callbacks,
}: UseNotificationSubscriptionProps = {}) => {
  const store = useMutation({
    mutationFn: (body: NotificationSubscriptionStoreBody) =>
      notificationSubscriptionEndpoint.store(body),
    onSuccess: callbacks?.store?.onSuccess,
    onError: callbacks?.store?.onError,
  });

  const key = useMutation({
    mutationFn: () => notificationSubscriptionEndpoint.key(),
    onSuccess: callbacks?.key?.onSuccess,
    onError: callbacks?.key?.onError,
  });

  return { store, key };
};
