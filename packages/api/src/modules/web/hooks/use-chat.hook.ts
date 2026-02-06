import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

import { useUserAuth } from "@repo/redux/hooks";
import type { chat, chat_action, Pagination } from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { chatEndpoint, ChatMessagesBody } from "../endpoints/chat";

// =============================================================================
// Types
// =============================================================================

export interface UseChatCallbacks {
  messages?: {
    onSuccess?: (data: { chat: string; new?: boolean }) => void;
    onError?: (error: Error) => void;
  };
  action?: {
    onSuccess?: (data: chat_action, vars: any) => void;
    onError?: (error: Error, vars: any) => void;
  };
}

export interface UseChatProps {
  id?: string;
  enabledIndex?: boolean;
  enabledShow?: boolean;
  enabledCategory?: boolean;
  callbacks?: UseChatCallbacks;
}

export interface UseChatReturn {
  index: UseInfiniteQueryResult<InfiniteData<Pagination<chat>>, Error>;
  show: UseQueryResult<chat, Error>;
  messages: UseMutationResult<{ chat: string; new?: boolean }, Error, ChatMessagesBody>;
  category: UseQueryResult<{ keys: string[] }, Error>;
  action: UseMutationResult<any, Error, any>;
}

// =============================================================================
// Hook
// =============================================================================

export const useChat = ({
  id,
  callbacks,
  enabledIndex,
  enabledShow,
  enabledCategory,
}: UseChatProps = {}): UseChatReturn => {
  const indexKey = cacheKeys.chat.index();
  const showKey = cacheKeys.chat.show(id);
  const categoryKey = cacheKeys.chat.category();

  const { enabledPrivateRoutes, hasProfile, hasTwoAuth, warning } = useUserAuth();

  /**
   * Index query with infinite pagination support
   */
  const index = useInfiniteQuery<Pagination<chat>, Error>({
    queryKey: indexKey,
    queryFn: ({ pageParam = 1 }) => chatEndpoint.index({ page: String(pageParam), limit: "10" }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!enabledIndex && enabledPrivateRoutes && !warning?.locked,
  });

  /**
   * Show query for a specific chat
   */
  const show = useQuery<chat, Error>({
    queryKey: showKey,
    queryFn: () => chatEndpoint.show({ id: id! }),
    enabled: !!enabledShow && !!id && !warning?.locked,
  });

  /**
   * Send message mutation
   */
  const messages = useMutation<{ chat: string; new?: boolean }, Error, ChatMessagesBody>({
    mutationFn: (body) =>
      chatEndpoint.messages({
        chat: body.chat,
        features: body.features || "",
        question: body.question || "",
        mode: body.mode,
      }),
    onSuccess: (data) => {
      callbacks?.messages?.onSuccess?.(data);
    },
    onError: (error) => {
      callbacks?.messages?.onError?.(error);
    },
  });

  /**
   * Category query
   */
  const category = useQuery<{ keys: string[] }, Error>({
    queryKey: categoryKey,
    queryFn: () => chatEndpoint.category(),
    enabled:
      !!enabledCategory && enabledPrivateRoutes && hasProfile && hasTwoAuth && !warning?.locked,
  });

  /**
   * Action mutation
   */
  const action = useMutation<any, Error, any>({
    mutationFn: (body) => chatEndpoint.action({ id: id! }, body),
    onSuccess: (data, vars) => {
      callbacks?.action?.onSuccess?.(data, vars);
    },
    onError: (error, vars) => {
      callbacks?.action?.onError?.(error, vars);
    },
  });

  return { messages, index, show, category, action };
};
