import { useMutation } from "@tanstack/react-query";

import { billingEndpoint } from "../endpoints/billing";

export interface UseBillingCallbacks {
  checkout?: {
    onSuccess?: (data: { url: string }) => void;
    onError?: (error: any) => void;
  };
  test?: {
    onSuccess?: (data: { url: string }) => void;
    onError?: (error: any) => void;
  };
}

export interface UseBillingProps {
  callbacks?: UseBillingCallbacks;
}

export const useBilling = ({ callbacks }: UseBillingProps = {}) => {
  const checkout = useMutation({
    mutationFn: (price_id: string) => billingEndpoint.checkout({ price_id }),
    onSuccess: (e) => {
      callbacks?.checkout?.onSuccess?.(e);
    },
    onError: callbacks?.checkout?.onError,
  });

  const test = useMutation({
    mutationFn: (test: string) => billingEndpoint.test({ test }),
    onSuccess: (e) => {
      callbacks?.test?.onSuccess?.(e);
    },
    onError: callbacks?.test?.onError,
  });

  return { checkout, test };
};
