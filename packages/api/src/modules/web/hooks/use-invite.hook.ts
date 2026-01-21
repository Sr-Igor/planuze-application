import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";

import type { invite, Pagination, user } from "@repo/types";

import { useCrud, type UseCrudReturn } from "../../../application/hooks/use-crud.hook";
import { useCache } from "../../../infrastructure/cache";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import type { UseCallerProps } from "../../../shared/types/api.types";
import { inviteEndpoint, inviteFeedback, inviteMe } from "../endpoints/invite";

/**
 * Extended props for useInvite hook
 */
export interface UseInviteProps extends UseCallerProps<invite> {
  enabledMe?: boolean;
  callbacks?: UseCallerProps<invite>["callbacks"] & {
    feedback?: {
      onSuccess?: (data: { invite: invite; user: user }) => void;
      onError?: (error: unknown) => void;
    };
  };
}

/**
 * Extended return type for useInvite hook
 */
export interface UseInviteReturn extends UseCrudReturn<invite> {
  me: UseQueryResult<Pagination<invite>, Error>;
  feedback: UseMutationResult<{ invite: invite; user: user }, Error, { id: string; accepted: boolean }>;
}

/**
 * Hook for Invite CRUD operations with me and feedback
 */
export const useInvite = (props: UseInviteProps): UseInviteReturn => {
  const { filters, id, enabledIndex, enabledShow, enableTrash, enabledMe, callbacks } = props;

  const cache = useCache();
  const meKey = (cacheKeys.invite.me?.() || ["invite_me"]) as string[];

  const crudResult = useCrud<invite>({
    endpoint: inviteEndpoint as any,
    cacheKeys: cacheKeys.invite,
    id,
    filters,
    enabled: {
      index: enabledIndex,
      show: enabledShow,
      trash: enableTrash,
    },
    callbacks: {
      store: callbacks?.store,
      update: callbacks?.update,
      destroy: callbacks?.destroy,
      many: callbacks?.many,
      restore: callbacks?.restore,
    },
  });

  const me = useQuery<Pagination<invite>, Error>({
    queryKey: meKey,
    queryFn: () => inviteMe(),
    enabled: !!enabledMe,
  });

  const feedback = useMutation<{ invite: invite; user: user }, Error, { id: string; accepted: boolean }>({
    mutationFn: (data) => inviteFeedback({ id: data.id }, { accepted: data.accepted }),
    onSuccess: (data) => {
      cache.invalidateQueries(meKey);
      callbacks?.feedback?.onSuccess?.(data);
    },
    onError: callbacks?.feedback?.onError,
  });

  return { ...crudResult, me, feedback };
};
