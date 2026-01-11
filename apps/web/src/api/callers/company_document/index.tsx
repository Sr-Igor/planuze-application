import { company_document } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/company_document';
import { IUseCallerProps } from '@/api/types';

export const useCompanyDocument = (props: IUseCallerProps<company_document>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'company',
        cache: 'company_document',
        field: 'company_documents',
        accessKey: props.filters?.company_id
    });
};
