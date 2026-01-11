import { client_address } from '@/api/generator/prisma-types';
import { useNestedField } from '@/api/hooks/use-nested-field';
import * as api from '@/api/req/client_address';
import { IUseCallerProps } from '@/api/types';

export const useClientAddress = (props: IUseCallerProps<client_address>) => {
    return useNestedField({
        ...props,
        api,
        rootCache: 'client',
        cache: 'client_address',
        field: 'client_address',
        accessKey: props.filters?.client_id
    });
};
