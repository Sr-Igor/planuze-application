import { profile_file } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/profile_file';
import { IUseCallerProps } from '@/api/types';

export const useProfileFile = (props: IUseCallerProps<profile_file>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'profile',
        cache: 'profile_file',
        field: 'profile_files',
        accessKey: props.filters?.profile_id
    });
};
