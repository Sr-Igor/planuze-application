import { useMutation } from "@tanstack/react-query";

import {
  vectorizeEndpoint,
  type VectorizeUpdateParams,
  type VectorizeUpdateBody,
  type VectorizeDestroyParams,
  type VectorizeDestroyBody,
} from "../endpoints/vectorize";

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
    mutationFn: ({
      params,
      body,
    }: {
      params: VectorizeUpdateParams;
      body: VectorizeUpdateBody;
    }) => vectorizeEndpoint.update(params, body),
    onSuccess: (e) => {
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  const destroy = useMutation({
    mutationFn: ({
      params,
      body,
    }: {
      params: VectorizeDestroyParams;
      body: VectorizeDestroyBody;
    }) => vectorizeEndpoint.destroy(params, body),
    onSuccess: (e) => {
      callbacks?.destroy?.onSuccess?.(e);
    },
    onError: callbacks?.destroy?.onError,
  });

  return { update, destroy };
};
