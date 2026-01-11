import { client_contact } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/client_contact';
import { IUseCallerProps } from '@/api/types';

export const useClientContact = (props: IUseCallerProps<client_contact>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'client',
        cache: 'client_contact',
        field: 'client_contacts',
        accessKey: props.filters?.client_id
    });
};
