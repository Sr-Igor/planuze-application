import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import type { chat, Pagination } from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { chatEndpoint } from "../endpoints/chat";

export interface UseChatCallbacks {
  messages?: {
    onSuccess?: (data: unknown) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseChatProps {
  id?: string;
  enabledIndex?: boolean;
  enabledShow?: boolean;
  enabledCategory?: boolean;
  callbacks?: UseChatCallbacks;
}

export const useChat = ({
  id,
  callbacks,
  enabledIndex,
  enabledShow,
  enabledCategory,
}: UseChatProps = {}) => {
  const indexKey = cacheKeys.chat.index();
  const showKey = cacheKeys.chat.show(id);
  const categoryKey = cacheKeys.chat.category();

  const index = useInfiniteQuery<Pagination<chat>>({
    queryKey: indexKey,
    queryFn: ({ pageParam = 1 }) =>
      chatEndpoint.index({ page: String(pageParam), limit: "10" }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!enabledIndex,
  });

  const show = useQuery<chat>({
    queryKey: showKey,
    queryFn: () => chatEndpoint.show({ id: id! }),
    enabled: !!enabledShow && !!id,
  });

  const messages = useMutation({
    mutationFn: (body: { chat?: string; features?: string; question?: string }) =>
      chatEndpoint.messages({
        chat: body.chat,
        features: body.features || "",
        question: body.question || "",
      }),
    onSuccess: (data) => {
      callbacks?.messages?.onSuccess?.(data);
    },
    onError: (error) => {
      callbacks?.messages?.onError?.(error);
    },
  });

  const category = useQuery<{ keys: string[] }>({
    queryKey: categoryKey,
    queryFn: () => chatEndpoint.category(),
    enabled: !!enabledCategory,
  });

  return { messages, index, show, category };
};
