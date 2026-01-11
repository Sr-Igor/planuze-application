import { level } from '@/api/generator/types';
import { useBase } from '@/api/hooks/use-base';
import * as api from '@/api/req/level';
import { IUseCallerProps } from '@/api/types';

export const useLevel = (props: IUseCallerProps<level>) => {
    return useBase({
        ...props,
        api,
        cache: 'level'
    });
};
