import { useCache } from '@/api/cache';
import keys from '@/api/cache/keys';
import { integration, integration_action } from '@/api/generator/types';
import * as api from '@/api/req/integration_action';
import { IUseCallerProps } from '@/api/types';
import { useMutation } from '@tanstack/react-query';

export const useIntegrationAction = ({ callbacks, id }: IUseCallerProps<integration_action>) => {
    const showKey = keys.integration.show(id);
    const cache = useCache();

    const update = useMutation({
        mutationFn: (body: any) => api.update(id!, body),
        onSuccess: (e, variables) => {
            const module_id = variables?.module_id;

            cache.setQueriesData(showKey, (oldData: integration) => {
                const oldIntegrationActions = (oldData?.integration_actions || [])?.filter(
                    (la: any) => la.feature.module_id !== module_id
                );

                return {
                    ...oldData,
                    integration_actions: [...oldIntegrationActions, ...e]
                };
            });

            callbacks?.update?.onSuccess?.(e);
        },
        onError: callbacks?.update?.onError
    });

    return { update };
};
