import { Requests } from '@/types/hookReq';

import { IUseReqProps } from '../types';

export const useReq = <T extends { id: string }>({
    state,
    handleState,
    hookReq,
    isTrash,
    customFilters = {}
}: IUseReqProps<T>): Requests<T> => {
    const callbacks = {
        onSuccess: () => {
            handleState({ open: false, item: undefined, selected: [], loadingLines: [] });
        },
        onError: () => {
            handleState({ loadingLines: [] });
        }
    };

    const collectKeys = hookReq({});

    const requests = hookReq({
        enabledIndex: !isTrash,
        enableTrash: !!isTrash,
        filters: { ...state.filters, ...customFilters },
        id: state?.item?.id,
        callbacks: Object.keys(collectKeys).reduce(
            (acc, key) => {
                acc[key] = callbacks;
                return acc;
            },
            {} as Record<string, any>
        )
    });

    return requests;
};
