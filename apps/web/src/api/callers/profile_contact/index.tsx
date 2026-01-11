import { profile_contact } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/profile_contact';
import { IUseCallerProps } from '@/api/types';

export const useProfileContact = (props: IUseCallerProps<profile_contact>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'profile',
        cache: 'profile_contact',
        field: 'profile_contacts',
        accessKey: props.filters?.profile_id
    });
};
