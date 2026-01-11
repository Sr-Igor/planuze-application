import { project_version } from '@/api/generator/types';
import { useInsert } from '@/api/hooks/use-insert';
import * as api from '@/api/req/project_version';
import { IUseCallerProps } from '@/api/types';

import { placeholder } from './placeholder';

export const useProjectVersion = (props: IUseCallerProps<project_version>) => {
    return useInsert({
        ...props,
        api,
        cache: 'project_version',
        placeholder
    });
};
