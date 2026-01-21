import { useMutation } from "@tanstack/react-query";

import { vectorizeEndpoint } from "../endpoints/vectorize";

export interface UseVectorizeCallbacks {
  update?: {
    onSuccess?: (data: unknown) => void;
    onError?: (error: unknown) => void;
  };
  destroy?: {
    onSuccess?: (data: unknown) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseVectorizeProps {
  callbacks?: UseVectorizeCallbacks;
}

export const useVectorize = ({ callbacks }: UseVectorizeProps = {}) => {
  const update = useMutation({
    mutationFn: ({ file, body }: { file: string; body: unknown }) =>
      vectorizeEndpoint.update(file, body),
    onSuccess: (e) => {
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation({
    mutationFn: ({ file, body }: { file: string; body: unknown }) =>
      vectorizeEndpoint.destroy(file, body),
    onSuccess: (e) => {
      callbacks?.destroy?.onSuccess?.(e);
    },
    onError: callbacks?.destroy?.onError,
  });

  return { update, destroy };
};
