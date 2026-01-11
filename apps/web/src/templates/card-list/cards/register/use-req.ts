import { Pagination } from '@/types/pagination';

import { IUseReqRegisterCardProps } from './types';

export const useReq = <T extends { id: string }>({
    hookReq,
    handleState,
    data,
    item,
    updateItem,
    local_id,
    filters
}: IUseReqRegisterCardProps<T>) => {
    const onReturn = () => handleState({ loading: false, dirty: false });

    const callBack = {
        onSuccess: (item: T | Pagination<T>) => {
            onReturn();
            updateItem(local_id, item as T);
        },
        onError: onReturn
    };

    const requests = hookReq?.({
        id: item?.id,
        filters,
        callbacks: {
            store: callBack,
            update: callBack,
            destroy: {
                onSuccess: () => {
                    onReturn();
                    updateItem(local_id);
                },
                onError: onReturn
            }
        }
    });

    return requests;
};
