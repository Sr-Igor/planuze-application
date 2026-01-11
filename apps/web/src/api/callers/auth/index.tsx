import keys from '@/api/cache/keys';
import { user } from '@/api/generator/types';
import * as api from '@/api/req/auth';
import { useAppSelector } from '@/hooks/redux';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface IUseCallerProps {
    enableHidrate?: boolean;
    callbacks?: {
        login?: {
            onSuccess?: (data: user) => void;
            onError?: (error: user) => void;
        };
        confirm?: {
            onSuccess?: (data: boolean) => void;
            onError?: (error: any) => void;
        };
        code?: {
            onSuccess?: (data: user) => void;
            onError?: (error: any) => void;
        };
        recovery?: {
            onSuccess?: (data: boolean) => void;
            onError?: (error: any) => void;
        };
        reset?: {
            onSuccess?: (user: user) => void;
            onError?: (error: any) => void;
        };
        changePassword?: {
            onSuccess?: (user: user) => void;
            onError?: (error: any) => void;
        };
        owner?: {
            onSuccess?: (data: boolean) => void;
            onError?: (error: any) => void;
        };
    };
}

export const useAuth = ({ callbacks, enableHidrate = false }: IUseCallerProps) => {
    const user = useAppSelector((state) => state.user);
    const hydrateKey = keys.auth.hydrate(user?.id);

    const login = useMutation({
        mutationFn: (body: any) => api.login(body),
        onSuccess: (e) => {
            callbacks?.login?.onSuccess?.(e);
        },
        onError: callbacks?.login?.onError
    });

    const hidrate = useQuery({
        queryKey: hydrateKey,
        queryFn: () => api.hidrate(),
        enabled: enableHidrate,
        refetchOnWindowFocus: false,
        refetchInterval: 3000
    });

    const confirm = useMutation({
        mutationFn: () => api.confirm(),
        onSuccess: (e) => {
            callbacks?.confirm?.onSuccess?.(e);
        },
        onError: callbacks?.confirm?.onError
    });

    const code = useMutation({
        mutationFn: (code: string) => api.code(code),
        onSuccess: (e) => {
            callbacks?.code?.onSuccess?.(e);
        },
        onError: callbacks?.code?.onError
    });

    const recovery = useMutation({
        mutationFn: (body: any) => api.recovery(body),
        onSuccess: (e) => {
            callbacks?.recovery?.onSuccess?.(e);
        },
        onError: callbacks?.recovery?.onError
    });

    const reset = useMutation({
        mutationFn: (data: { code: string; body: any }) => api.reset(data.code, data.body),
        onSuccess: (e) => {
            callbacks?.reset?.onSuccess?.(e);
        },
        onError: callbacks?.reset?.onError
    });

    const changePassword = useMutation({
        mutationFn: (body: any) => api.changePassword(body),
        onSuccess: (e) => {
            callbacks?.changePassword?.onSuccess?.(e);
        },
        onError: callbacks?.changePassword?.onError
    });

    const owner = useMutation({
        mutationFn: (body: any) => api.owner(body),
        onSuccess: (e) => {
            callbacks?.owner?.onSuccess?.(e);
        },
        onError: callbacks?.owner?.onError
    });

    return { login, hidrate, confirm, code, recovery, reset, changePassword, owner };
};
