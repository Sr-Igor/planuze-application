import { useCallback, useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { IUseHookProps, State } from '../types';

export function useInternalShow<T extends { id: string }>({
    hookReq,
    id,
    defaultTab,
    baseUrl,
    setParams,
    path,
    data
}: IUseHookProps<T>) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [state, setState] = useState<State>({
        tab: defaultTab
    });

    const handleState = useCallback((obj: Partial<State>) => {
        setState((prev) => ({ ...prev, ...obj }));
    }, []);

    const requests = hookReq?.({
        enabledShow: !!id && !data,
        id: id || '',
        callbacks: {
            destroy: {
                onSuccess: () => {
                    baseUrl ? router.push(baseUrl) : router.back();
                }
            }
        }
    });

    const handleTabChange = useCallback(
        (tab: string) => {
            if (state.dirty) {
                handleState({ cancel: true, action: tab });
                return;
            }

            // Atualiza o estado local imediatamente para resposta rápida
            handleState({ tab, dirty: false });

            // Atualiza a URL de forma não-bloqueante
            if (setParams && path) {
                startTransition(() => {
                    setParams({ [`tab-${path}`]: tab });
                });
            }
        },
        [state.dirty, handleState, setParams, path, startTransition]
    );

    return {
        state,
        setState: handleState,
        show: {
            data: data || requests?.show?.data,
            isLoading: requests?.show?.isLoading,
            isError: requests?.show?.isError
        },
        destroy: requests?.destroy,
        handleTabChange,
        isPending
    };
}
