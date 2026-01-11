import { useMutation, useQuery } from "@tanstack/react-query";

import { invite, user } from "@repo/api/generator/types";

import { useCache } from "@/api/cache";
import keys from "@/api/cache/keys";
import { useBase } from "@/api/hooks/use-base";
import * as api from "@/api/req/invite";
import { IUseCallerProps } from "@/api/types";
import { Pagination } from "@/types/pagination";

export interface IUseInviteProps extends IUseCallerProps<invite> {
  enabledMe?: boolean;
  callbacks?: IUseCallerProps<invite>["callbacks"] & {
    feedback?: {
      onSuccess?: (data: { invite: invite; user: user }) => void;
      onError?: () => void;
    };
  };
}

export const useInvite = (props: IUseInviteProps) => {
  const cache = useCache();
  const meKey = keys.invite.me();

  const requests = useBase({
    ...props,
    api,
    cache: "invite",
  });

  const me = useQuery<Pagination<invite>>({
    queryKey: meKey,
    queryFn: () => api.me(),
    enabled: !!props.enabledMe,
  });

  const feedback = useMutation({
    mutationFn: (data: { id: string; accepted: boolean }) =>
      api.feedback(data.id!, { accepted: data.accepted }),
    onSuccess: (e) => {
      cache.invalidateIndex(meKey);
      props.callbacks?.feedback?.onSuccess?.(e);
    },
    onError: props.callbacks?.feedback?.onError,
  });

  return { ...requests, me, feedback };
};
