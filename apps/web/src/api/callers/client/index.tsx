import { client } from '@/api/generator/types';
import { useBase } from '@/api/hooks/use-base';
import * as api from '@/api/req/client';
import { IUseCallerProps } from '@/api/types';

export const useClient = (props: IUseCallerProps<client>) => {
    return useBase({
        ...props,
        api,
        cache: 'client'
    });
};
