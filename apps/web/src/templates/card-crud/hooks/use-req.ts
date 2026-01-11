import { IUseReqProps } from '../type';

export const useReq = <T>({
    data,
    state,
    handleState,
    getPermissions,
    hookReq,
    pathKey,
    filters,
    externalData
}: IUseReqProps<T>) => {
    const fallback = {
        onSuccess: () => {
            handleState({ open: false, loading: false });
        }
    };

    const requests = hookReq({
        enabledIndex: getPermissions(pathKey)?.index && !!data?.id && !externalData,
        enableTrash: getPermissions(pathKey)?.trash && !!data?.id && state?.open && state?.mode === 'trash',
        id: state?.item?.id,
        filters,
        callbacks: {
            store: fallback,
            update: fallback,
            destroy: fallback,
            restore: fallback
        }
    });

    return {
        ...requests,
        index: externalData
            ? {
                  data: {
                      data: externalData
                  },
                  isLoading: false,
                  isFetching: false,
                  isError: false,
                  isPlaceholderData: false,
                  isPending: false,
                  isSuccess: true
              }
            : requests.index
    };
};
