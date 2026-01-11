import { project } from '@/api/generator/types';
import { useBase } from '@/api/hooks/use-base';
import * as api from '@/api/req/project';
import { IUseCallerProps } from '@/api/types';

export const useProject = (props: IUseCallerProps<project>) => {
    return useBase({
        ...props,
        api,
        cache: 'project'
    });
};
