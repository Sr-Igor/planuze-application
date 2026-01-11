import { company_contact } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/company_contact';
import { IUseCallerProps } from '@/api/types';

export const useCompanyContact = (props: IUseCallerProps<company_contact>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'company',
        cache: 'company_contact',
        field: 'company_contacts',
        accessKey: props.filters?.company_id
    });
};
