import { useMutation } from "@tanstack/react-query";

import { user } from "@repo/api/generator/types";

import * as api from "@/api/req/user";
import { IUseCallerProps } from "@/api/types";

export const useUser = ({ callbacks, id }: IUseCallerProps<user>) => {
  const store = useMutation({
    mutationFn: (body: any) => api.store(body),
    onSuccess: (e) => {
      callbacks?.store?.onSuccess?.(e);
    },
    onError: callbacks?.store?.onError,
  });

  const update = useMutation({
    mutationFn: (body: any) => api.update(id!, body),
    onSuccess: (e) => {
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  return { store, update };
};
