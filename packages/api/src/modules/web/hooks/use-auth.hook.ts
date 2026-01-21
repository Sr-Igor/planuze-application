import { useMutation, useQuery } from "@tanstack/react-query";

import type { user } from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { authEndpoint } from "../endpoints/auth";
import type {
  ChangePasswordDTO,
  LoginDTO,
  OwnerDTOInput,
  RecoveryDTO,
  ResetPasswordDTO,
} from "../endpoints/auth/auth.types";

export interface UseAuthCallbacks {
  login?: {
    onSuccess?: (data: user) => void;
    onError?: (error: unknown) => void;
  };
  confirm?: {
    onSuccess?: (data: boolean) => void;
    onError?: (error: unknown) => void;
  };
  code?: {
    onSuccess?: (data: user) => void;
    onError?: (error: unknown) => void;
  };
  recovery?: {
    onSuccess?: (data: boolean) => void;
    onError?: (error: unknown) => void;
  };
  reset?: {
    onSuccess?: (user: user) => void;
    onError?: (error: unknown) => void;
  };
  changePassword?: {
    onSuccess?: (user: user) => void;
    onError?: (error: unknown) => void;
  };
  owner?: {
    onSuccess?: (data: boolean) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseAuthProps {
  enableHydrate?: boolean;
  userId?: string;
  callbacks?: UseAuthCallbacks;
}

export const useAuth = ({ callbacks, enableHydrate = false, userId }: UseAuthProps = {}) => {
  const hydrateKey = cacheKeys.auth.hydrate(userId);

  const login = useMutation({
    mutationFn: (body: LoginDTO) => authEndpoint.login(body),
    onSuccess: (e) => {
      callbacks?.login?.onSuccess?.(e);
    },
    onError: callbacks?.login?.onError,
  });

  const hidrate = useQuery<user>({
    queryKey: hydrateKey,
    queryFn: () => authEndpoint.hidrate(),
    enabled: enableHydrate,
    refetchOnWindowFocus: false,
    refetchInterval: 3000,
  });

  const confirm = useMutation({
    mutationFn: () => authEndpoint.confirm(),
    onSuccess: (e) => {
      callbacks?.confirm?.onSuccess?.(e);
    },
    onError: callbacks?.confirm?.onError,
  });

  const code = useMutation({
    mutationFn: (authCode: string) => authEndpoint.code({ code: authCode }),
    onSuccess: (e) => {
      callbacks?.code?.onSuccess?.(e);
    },
    onError: callbacks?.code?.onError,
  });

  const recovery = useMutation({
    mutationFn: (body: RecoveryDTO) => authEndpoint.recovery(body),
    onSuccess: () => {
      callbacks?.recovery?.onSuccess?.(true);
    },
    onError: callbacks?.recovery?.onError,
  });

  const reset = useMutation({
    mutationFn: (data: { code: string; body: ResetPasswordDTO }) =>
      authEndpoint.reset({ code: data.code }, data.body),
    onSuccess: () => {
      callbacks?.reset?.onSuccess?.({} as user);
    },
    onError: callbacks?.reset?.onError,
  });

  const changePassword = useMutation({
    mutationFn: (body: ChangePasswordDTO) => authEndpoint.changePassword(body),
    onSuccess: () => {
      callbacks?.changePassword?.onSuccess?.({} as user);
    },
    onError: callbacks?.changePassword?.onError,
  });

  const owner = useMutation({
    mutationFn: (body: OwnerDTOInput) => authEndpoint.owner(body),
    onSuccess: () => {
      callbacks?.owner?.onSuccess?.(true);
    },
    onError: callbacks?.owner?.onError,
  });

  return { login, hidrate, confirm, code, recovery, reset, changePassword, owner };
};
