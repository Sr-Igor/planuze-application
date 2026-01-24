import * as api from "#/web/req/me";
import keys from "#/cache/keys";
import { IUseCallerProps } from "#/types";
import { useQuery } from "@tanstack/react-query";

import { profile } from "@repo/types";

export const useMe = ({ enabledShow, id }: IUseCallerProps<profile>) => {
  const showKey = keys.me.show(id);

  const show = useQuery<profile>({
    queryKey: showKey,
    queryFn: () => api.show(id!),
    enabled: !!enabledShow,
  });

  return { show };
};
