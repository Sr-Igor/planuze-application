import { createId } from '@paralleldrive/cuid2';

import { IUseReqProps } from './types';

export const useReq = <T extends { id: string }, R extends { id: string }>({
    permissions,
    data,
    setItems,
    openTrash,
    setOpenTrash,
    hookReq,
    setOpenOrder,
    filters
}: IUseReqProps<T, R>) => {
    const requests = hookReq?.({
        enableTrash: permissions.trash && openTrash,
        filters,
        callbacks: {
            restore: {
                onSuccess: (item) => {
                    setItems((prev: any) => {
                        return [{ ...item, local_id: createId() }, ...prev].sort((a, b) => {
                            const aCreatedAt = a.createdAt ? new Date(a.createdAt).getTime() : Date.now();
                            const bCreatedAt = b.createdAt ? new Date(b.createdAt).getTime() : Date.now();
                            return bCreatedAt - aCreatedAt;
                        });
                    });
                    setOpenTrash(false);
                }
            },
            many: {
                onSuccess: (e: any) => {
                    setOpenOrder?.(false);
                }
            }
        }
    });

    return requests;
};
