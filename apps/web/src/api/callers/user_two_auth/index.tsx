import { user_two_auth } from '@/api/generator/types';
import * as api from '@/api/req/user_two_auth';
import { useMutation } from '@tanstack/react-query';

export interface IUseCallerProps {
    id?: string;
    callbacks?: {
        confirm?: {
            onSuccess?: (data: user_two_auth[]) => void;
            onError?: (error: any) => void;
        };
        resend?: {
            onSuccess?: (data: user_two_auth[]) => void;
            onError?: (error: any) => void;
        };
        store?: {
            onSuccess?: (data: user_two_auth[]) => void;
            onError?: (error: any) => void;
        };
        update?: {
            onSuccess?: (data: user_two_auth[]) => void;
            onError?: (error: any) => void;
        };
        destroy?: {
            onSuccess?: (data: user_two_auth[]) => void;
            onError?: (error: any) => void;
        };
    };
}

export const useUserTwoAuth = ({ callbacks, id }: IUseCallerProps) => {
    const store = useMutation<user_two_auth[]>({
        mutationFn: (body: any) => api.store(body),
        onSuccess: (e) => {
            callbacks?.store?.onSuccess?.(e);
        },
        onError: callbacks?.store?.onError
    });

    const update = useMutation<user_two_auth[]>({
        mutationFn: (body: any) => api.update(id!, body),
        onSuccess: (e) => {
            callbacks?.update?.onSuccess?.(e);
        },
        onError: callbacks?.update?.onError
    });

    const destroy = useMutation<user_two_auth[]>({
        mutationFn: (body: any) => api.destroy(id!, body),
        onSuccess: (e) => {
            callbacks?.destroy?.onSuccess?.(e);
        },
        onError: callbacks?.destroy?.onError
    });

    const resend = useMutation({
        mutationFn: (internalId?: string) => api.resend(internalId || id!),
        onSuccess: (e) => {
            callbacks?.resend?.onSuccess?.(e);
        },
        onError: callbacks?.resend?.onError
    });

    const confirm = useMutation({
        mutationFn: (body: any) => api.confirm(id!, body),
        onSuccess: (e) => {
            callbacks?.confirm?.onSuccess?.(e);
        },
        onError: callbacks?.confirm?.onError
    });

    return { store, update, destroy, resend, confirm };
};
