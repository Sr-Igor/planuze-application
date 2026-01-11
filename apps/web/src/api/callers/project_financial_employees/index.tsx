import { project_financial_employees } from '@/api/generator/types';
import { useInsert } from '@/api/hooks/use-insert';
import * as api from '@/api/req/project_financial_employees';
import { IUseCallerProps } from '@/api/types';

import { placeholder } from './placeholder';

export const useProjectFinancialEmployees = (props: IUseCallerProps<project_financial_employees>) => {
    return useInsert({
        ...props,
        api,
        cache: 'project_financial_employees',
        placeholder
    });
};
