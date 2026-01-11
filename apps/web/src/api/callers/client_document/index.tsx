import { client_document } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/client_document';
import { IUseCallerProps } from '@/api/types';

export const useClientDocument = (props: IUseCallerProps<client_document>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'client',
        cache: 'client_document',
        field: 'client_documents',
        accessKey: props.filters?.client_id
    });
};
