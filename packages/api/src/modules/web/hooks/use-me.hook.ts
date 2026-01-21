import { useQuery } from "@tanstack/react-query";

import type { profile } from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { meEndpoint } from "../endpoints/me";

export interface UseMeProps {
  id?: string | null;
  enabledShow?: boolean;
}

export const useMe = ({ enabledShow, id }: UseMeProps = {}) => {
  const showKey = cacheKeys.me.show(id);

  const show = useQuery<profile>({
    queryKey: showKey,
    queryFn: () => meEndpoint.show(id!),
    enabled: !!enabledShow && !!id,
  });

  return { show };
};
