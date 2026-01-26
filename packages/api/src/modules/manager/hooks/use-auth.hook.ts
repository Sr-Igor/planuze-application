import { useMutation } from "@tanstack/react-query";

import type { user } from "@repo/types";

import { authEndpoint } from "../endpoints/auth";
import type { LoginDTO } from "../endpoints/auth/auth.types";

export interface UseAuthCallbacks {
  login?: {
    onSuccess?: (data: user) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseAuthProps {
  callbacks?: UseAuthCallbacks;
}

export const useAuth = ({ callbacks }: UseAuthProps = {}) => {
  const login = useMutation({
    mutationFn: (body: LoginDTO) => authEndpoint.login(body),
    onSuccess: (data) => {
      callbacks?.login?.onSuccess?.(data);
    },
    onError: callbacks?.login?.onError,
  });

  return { login };
};
