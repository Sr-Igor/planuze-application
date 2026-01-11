import { useMutation, useQuery } from "@tanstack/react-query";

import { company } from "@repo/api/generator/types";

import { useCache } from "@/api/cache";
import keys from "@/api/cache/keys";
import * as api from "@/api/req/company";
import { IUseCallerProps } from "@/api/types";

export const useCompany = ({ callbacks, enabledShow, id }: IUseCallerProps<company>) => {
  const showKey = keys.company.show(id);
  const cache = useCache();

  const show = useQuery<company>({
    queryKey: showKey,
    queryFn: () => api.show(id!),
    enabled: !!enabledShow,
  });

  const update = useMutation({
    mutationFn: (body: any) => api.update(id!, body),
    onSuccess: (e) => {
      cache.replaceShow({ key: showKey, item: e });
      callbacks?.update?.onSuccess?.(e);
    },
    onError: callbacks?.update?.onError,
  });

  const store = useMutation({
    mutationFn: (body: any) => api.store(body),
    onSuccess: (e) => {
      cache.replaceShow({ key: showKey, item: e });
      callbacks?.store?.onSuccess?.(e);
    },
    onError: callbacks?.store?.onError,
  });

  return { update, show, store };
};
