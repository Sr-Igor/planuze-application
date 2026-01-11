import { profile } from '@/api/generator/types';
import { useBase } from '@/api/hooks/use-base';
import * as api from '@/api/req/profile';
import { IUseCallerProps } from '@/api/types';

export const useProfile = (props: IUseCallerProps<profile>) => {
    return useBase({
        ...props,
        api,
        cache: 'profile'
    });
};
