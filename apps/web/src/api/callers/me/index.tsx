import { useQuery } from "@tanstack/react-query";

import { profile } from "@repo/api/generator/types";

import keys from "@/api/cache/keys";
import * as api from "@/api/req/me";
import { IUseCallerProps } from "@/api/types";

export const useMe = ({ enabledShow, id }: IUseCallerProps<profile>) => {
  const showKey = keys.me.show(id);

  const show = useQuery<profile>({
    queryKey: showKey,
    queryFn: () => api.show(id!),
    enabled: !!enabledShow,
  });

  return { show };
};
