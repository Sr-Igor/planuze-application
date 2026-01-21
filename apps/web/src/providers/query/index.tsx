"use client";

import { useState } from "react";

//React-query
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useModal } from "@/hooks/modal";

export interface IProviderProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: IProviderProps) => {
  const { setModal, modal } = useModal();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            retry: (failureCount, error: any) => {
              if (modal.inactive) return false;

              const data = error?.data || error?.response?.data;
              const isConnectionError = data?.connectionError;

              if (isConnectionError && failureCount < 3) {
                return true;
              }
              return false;
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
        },
        queryCache: new QueryCache({
          onError: (error: any) => {
            const data = error?.data || error?.response?.data;
            const status = data?.status || error?.response?.status;
            const message = data?.error || error?.message;
            const code = data?.code;
            const method = data?.method || error?.config?.method?.toUpperCase();
            const isGetMethod = method === "GET";

            if (!isGetMethod) return;

            if (code === "profile_inactive") {
              !modal.inactive && setModal({ inactive: true });
              return;
            }

            if (code === "profile_not_found") return;

            switch (status) {
              case 404:
                setModal({ not_found: true });
                break;
              case 403:
              case 400:
              case 500:
                !modal.error && setModal({ error: true, message, code, canClose: false });
                break;
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error: any, _, __, mutation) => {
            const data = error?.data || error?.response?.data;

            const message = data?.error || error?.message;
            const code = data?.code;
            const isConnectionError = data?.connectionError;

            if (modal.inactive) return;

            if (isConnectionError && mutation.state.failureCount < 3) {
              return;
            } else if (isConnectionError && !modal.error) {
              setModal({ error: true, message, code, canClose: true });
            }
          },
        }),
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
