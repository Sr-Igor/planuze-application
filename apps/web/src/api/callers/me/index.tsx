import keys from '@/api/cache/keys';
import { profile } from '@/api/generator/types';
import * as api from '@/api/req/me';
import { IUseCallerProps } from '@/api/types';
import { useQuery } from '@tanstack/react-query';

export const useMe = ({ enabledShow, id }: IUseCallerProps<profile>) => {
    const showKey = keys.me.show(id);

    const show = useQuery<profile>({
        queryKey: showKey,
        queryFn: () => api.show(id!),
        enabled: !!enabledShow
    });

    return { show };
};
