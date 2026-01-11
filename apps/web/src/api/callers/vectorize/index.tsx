import { useMutation } from "@tanstack/react-query";

import { client } from "@repo/api/generator/types";

import * as api from "@/api/req/vectorize";
import { IUseCallerProps } from "@/api/types";

export const useVectorize = ({ callbacks }: IUseCallerProps<client>) => {
  const update = useMutation({
    mutationFn: ({ file, body }: any) => api.update(file, body),
    onSuccess: (e) => {
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation({
    mutationFn: ({ file, body }: any) => api.destroy(file, body),
    onSuccess: (e) => {
      callbacks?.destroy?.onSuccess?.(e);
    },
    onError: callbacks?.destroy?.onError,
  });

  return { update, destroy };
};
