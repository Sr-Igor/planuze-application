import { useMutation } from "@tanstack/react-query";

import type { user_two_auth } from "@repo/types";

import {
  userTwoAuthEndpoint,
  type UserTwoAuthStoreBody,
  type UserTwoAuthUpdateBody,
  type UserTwoAuthDestroyBody,
  type UserTwoAuthConfirmBody,
} from "../endpoints/user_two_auth";

export interface UseUserTwoAuthCallbacks {
  confirm?: {
    onSuccess?: (data: user_two_auth[]) => void;
    onError?: (error: unknown) => void;
  };
  resend?: {
    onSuccess?: (data: user_two_auth[]) => void;
    onError?: (error: unknown) => void;
  };
  store?: {
    onSuccess?: (data: user_two_auth[]) => void;
    onError?: (error: unknown) => void;
  };
  update?: {
    onSuccess?: (data: user_two_auth[]) => void;
    onError?: (error: unknown) => void;
  };
  destroy?: {
    onSuccess?: (data: user_two_auth[]) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseUserTwoAuthProps {
  id?: string;
  callbacks?: UseUserTwoAuthCallbacks;
}

export const useUserTwoAuth = ({ callbacks, id }: UseUserTwoAuthProps = {}) => {
  const store = useMutation<user_two_auth[], Error, UserTwoAuthStoreBody>({
    mutationFn: (body) =>
      userTwoAuthEndpoint.store(body) as unknown as Promise<user_two_auth[]>,
    onSuccess: (e) => {
      callbacks?.store?.onSuccess?.(e);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation<user_two_auth[], Error, UserTwoAuthUpdateBody>({
    mutationFn: (body) =>
      userTwoAuthEndpoint.update(id!, body) as unknown as Promise<user_two_auth[]>,
    onSuccess: (e) => {
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation<user_two_auth[], Error, UserTwoAuthDestroyBody>({
    mutationFn: (body) =>
      userTwoAuthEndpoint.destroy(id!, body) as unknown as Promise<user_two_auth[]>,
    onSuccess: (e) => {
      callbacks?.destroy?.onSuccess?.(e);
    },
    onError: callbacks?.destroy?.onError,
  });

  const resend = useMutation<void, Error, string | undefined>({
    mutationFn: (internalId) => userTwoAuthEndpoint.resend(internalId || id!),
    onSuccess: (e) => {
      callbacks?.resend?.onSuccess?.(e as unknown as user_two_auth[]);
    },
    onError: callbacks?.resend?.onError,
  });

  const confirm = useMutation<void, Error, UserTwoAuthConfirmBody>({
    mutationFn: (body) => userTwoAuthEndpoint.confirm(id!, body),
    onSuccess: (e) => {
      callbacks?.confirm?.onSuccess?.(e as unknown as user_two_auth[]);
    },
    onError: callbacks?.confirm?.onError,
  });

  return { store, update, destroy, resend, confirm };
};
