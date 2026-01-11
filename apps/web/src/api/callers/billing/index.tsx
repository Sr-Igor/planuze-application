import * as api from '@/api/req/billing';
import { useMutation } from '@tanstack/react-query';

export interface IUseCallerProps {
    callbacks?: {
        checkout?: {
            onSuccess?: (data: any) => void;
            onError?: (e: any) => void;
        };
        test?: {
            onSuccess?: (data: any) => void;
            onError?: (e: any) => void;
        };
    };
}

export const useBilling = ({ callbacks }: IUseCallerProps) => {
    const checkout = useMutation({
        mutationFn: (price: string) => api.checkout(price),
        onSuccess: (e) => {
            callbacks?.checkout?.onSuccess?.(e);
        },
        onError: callbacks?.checkout?.onError
    });

    const test = useMutation({
        mutationFn: (test: string) => api.test(test),
        onSuccess: (e) => {
            callbacks?.test?.onSuccess?.(e);
        },
        onError: callbacks?.test?.onError
    });

    return { checkout, test };
};
