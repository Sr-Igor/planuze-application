import { useCallback, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { State } from '../types';

export function useActions() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = useCallback((setState: (obj: Partial<State>) => void) => {
        setState({ delete: true });
    }, []);

    const handleCancel = useCallback(
        (
            setState: (obj: Partial<State>) => void,
            action?: string,
            setParams?: (updates: Record<string, any>) => void,
            path?: string
        ) => {
            if (!action) {
                router.back();
            } else {
                setState({ tab: action as any, cancel: false, dirty: false });
                // Atualiza a URL com a nova tab de forma não-bloqueante
                if (setParams && path) {
                    startTransition(() => {
                        setParams({ [`tab-${path}`]: action });
                    });
                }
            }
        },
        [router, startTransition]
    );

    const handleCancelDialog = useCallback((setState: (obj: Partial<State>) => void) => {
        setState({ cancel: false, action: '' });
    }, []);

    const handleDeleteDialog = useCallback((setState: (obj: Partial<State>) => void) => {
        setState({ delete: false });
    }, []);

    return {
        handleDelete,
        handleCancel,
        handleCancelDialog,
        handleDeleteDialog,
        isPending
    };
}
