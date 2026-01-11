import { role } from '@/api/generator/types';
import { useBase } from '@/api/hooks/use-base';
import * as api from '@/api/req/role';
import { IUseCallerProps } from '@/api/types';

export const useRole = (props: IUseCallerProps<role>) => {
    return useBase({
        ...props,
        api,
        cache: 'role'
    });
};
