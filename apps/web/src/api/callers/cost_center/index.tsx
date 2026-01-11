import { cost_center } from '@/api/generator/types';
import { useBase } from '@/api/hooks/use-base';
import * as api from '@/api/req/cost_center';
import { IUseCallerProps } from '@/api/types';

export const useCostCenter = (props: IUseCallerProps<cost_center>) => {
    return useBase({
        ...props,
        api,
        cache: 'cost_center'
    });
};
