import { useMutation } from "@tanstack/react-query";

import {
  type UserTwoAuthCodeConfirmBody,
  userTwoAuthCodeEndpoint,
} from "../endpoints/user_two_auth_code";

export interface UseUserTwoAuthCodeCallbacks {
  confirm?: {
    onSuccess?: (data: boolean) => void;
    onError?: (error: unknown) => void;
  };
  store?: {
    onSuccess?: (data: boolean) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseUserTwoAuthCodeProps {
  id?: string;
  callbacks?: UseUserTwoAuthCodeCallbacks;
}

export const useUserTwoAuthCode = ({ callbacks, id }: UseUserTwoAuthCodeProps = {}) => {
  const store = useMutation<boolean>({
    mutationFn: () => userTwoAuthCodeEndpoint.store(id!) as unknown as Promise<boolean>,
    onSuccess: (e) => {
      callbacks?.store?.onSuccess?.(e);
    },
    onError: callbacks?.store?.onError,
  });

  const confirm = useMutation({
    mutationFn: (body: UserTwoAuthCodeConfirmBody) =>
      userTwoAuthCodeEndpoint.confirm(id!, body) as unknown as Promise<boolean>,
    onSuccess: (e) => {
      callbacks?.confirm?.onSuccess?.(e);
    },
    onError: callbacks?.confirm?.onError,
  });

  return { store, confirm };
};
