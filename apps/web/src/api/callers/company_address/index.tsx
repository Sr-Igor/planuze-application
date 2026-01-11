import { company_address } from '@/api/generator/prisma-types';
import { useNestedField } from '@/api/hooks/use-nested-field';
import * as api from '@/api/req/company_address';
import { IUseCallerProps } from '@/api/types';

export const useCompanyAddress = (props: IUseCallerProps<company_address>) => {
    return useNestedField({
        ...props,
        api,
        rootCache: 'company',
        cache: 'company_address',
        field: 'company_address',
        accessKey: props.filters?.company_id
    });
};
