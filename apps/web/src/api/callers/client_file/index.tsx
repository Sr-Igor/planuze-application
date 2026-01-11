import { client_file } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/client_file';
import { IUseCallerProps } from '@/api/types';

export const useClientFile = (props: IUseCallerProps<client_file>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'client',
        cache: 'client_file',
        field: 'client_files',
        accessKey: props.filters?.client_id
    });
};
