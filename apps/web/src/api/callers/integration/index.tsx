import { integration } from '@/api/generator/types';
import { useBase } from '@/api/hooks/use-base';
import * as api from '@/api/req/integration';
import { IUseCallerProps } from '@/api/types';

export const useIntegration = (props: IUseCallerProps<integration>) => {
    return useBase({
        ...props,
        api,
        cache: 'integration'
    });
};
