import * as api from "#/web/req/notification_subscription";
import { useMutation } from "@tanstack/react-query";

export interface IUseCallerProps {
  callbacks?: {
    key?: {
      onSuccess?: (data: any) => void;
      onError?: () => void;
    };
    store?: {
      onSuccess?: (data: any) => void;
      onError?: () => void;
    };
  };
}

export const useNotificationSubscription = ({ callbacks }: IUseCallerProps) => {
  const store = useMutation({
    mutationFn: (body: any) => api.store(body),
    onSuccess: callbacks?.store?.onSuccess,
    onError: callbacks?.store?.onError,
  });

  const key = useMutation({
    mutationFn: api.key,
    onSuccess: callbacks?.key?.onSuccess,
    onError: callbacks?.key?.onError,
  });

  return { store, key };
};
