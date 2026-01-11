import { useCache } from '@/api/cache';
import keys from '@/api/cache/keys';
import { level } from '@/api/generator/types';
import * as api from '@/api/req/level_action';
import { IUseCallerProps } from '@/api/types';
import { useMutation } from '@tanstack/react-query';

export const useLevelAction = ({ callbacks, id }: IUseCallerProps<level>) => {
    const showKey = keys.level.show(id);
    const cache = useCache();

    const update = useMutation({
        mutationFn: (body: any) => api.update(id!, body),
        onSuccess: (e, variables) => {
            const module_id = variables?.module_id;

            cache.setQueriesData(showKey, (oldData: level) => {
                const oldLevelActions = (oldData?.level_actions || [])?.filter(
                    (la: any) => la.feature.module_id !== module_id
                );

                return {
                    ...oldData,
                    level_actions: [...oldLevelActions, ...e]
                };
            });

            callbacks?.update?.onSuccess?.(e);
        },
        onError: callbacks?.update?.onError
    });

    return { update };
};
