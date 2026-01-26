import { useRouter } from 'next/navigation';

import { State } from '../types';

export function usePlanActions() {
    const router = useRouter();

    const handleDelete = (setState: (obj: Partial<State>) => void) => {
        setState({ delete: true });
    };

    const handleCancel = (setState: (obj: Partial<State>) => void, action?: string) => {
        if (!action) {
            router.back();
        } else {
            setState({ tab: action as any, cancel: false, dirty: false });
        }
    };

    const handleCancelDialog = (setState: (obj: Partial<State>) => void) => {
        setState({ cancel: false, action: '' });
    };

    const handleDeleteDialog = (setState: (obj: Partial<State>) => void) => {
        setState({ delete: false });
    };

    return {
        handleDelete,
        handleCancel,
        handleCancelDialog,
        handleDeleteDialog
    };
}
