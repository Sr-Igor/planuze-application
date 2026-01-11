import * as api from '@/api/req/user_two_auth_code';
import { useMutation } from '@tanstack/react-query';

export interface IUseCallerProps {
    id?: string;
    callbacks?: {
        confirm?: {
            onSuccess?: (data: boolean) => void;
            onError?: (error: any) => void;
        };
        store?: {
            onSuccess?: (data: boolean) => void;
            onError?: (error: any) => void;
        };
    };
}

export const useUserTwoAuthCode = ({ callbacks, id }: IUseCallerProps) => {
    const store = useMutation<boolean>({
        mutationFn: () => api.store(id!),
        onSuccess: (e) => {
            callbacks?.store?.onSuccess?.(e);
        },
        onError: callbacks?.store?.onError
    });

    const confirm = useMutation({
        mutationFn: (body: any) => api.confirm(id!, body),
        onSuccess: (e) => {
            callbacks?.confirm?.onSuccess?.(e);
        },
        onError: callbacks?.confirm?.onError
    });

    return { store, confirm };
};
