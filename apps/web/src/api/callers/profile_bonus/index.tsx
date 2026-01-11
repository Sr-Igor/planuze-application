import { profile_bonus } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/profile_bonus';
import { IUseCallerProps } from '@/api/types';

export const useProfileBonus = (props: IUseCallerProps<profile_bonus>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'profile',
        cache: 'profile_bonus',
        field: 'profile_bonus',
        accessKey: props.filters?.profile_id
    });
};
