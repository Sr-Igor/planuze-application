import { project_tool } from '@/api/generator/types';
import { useInsert } from '@/api/hooks/use-insert';
import * as api from '@/api/req/project_tool';
import { IUseCallerProps } from '@/api/types';

import { placeholder } from './placeholder';

export const useProjectTool = (props: IUseCallerProps<project_tool>) => {
    return useInsert({
        ...props,
        api,
        cache: 'project_tool',
        placeholder
    });
};
