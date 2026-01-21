import { useMutation } from "@tanstack/react-query";

import type { user } from "@repo/types";

import { userEndpoint } from "../endpoints/user";

export interface UseUserCallbacks {
  store?: {
    onSuccess?: (data: user) => void;
    onError?: (error: unknown) => void;
  };
  update?: {
    onSuccess?: (data: user) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseUserProps {
  id?: string;
  callbacks?: UseUserCallbacks;
}

export const useUser = ({ callbacks, id }: UseUserProps = {}) => {
  const store = useMutation({
    mutationFn: (body: unknown) => userEndpoint.store(body),
    onSuccess: (e) => {
      callbacks?.store?.onSuccess?.(e);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: unknown) => userEndpoint.update(id!, body),
    onSuccess: (e) => {
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  return { store, update };
};
