import * as api from "#/web/req/chat";
import keys from "#/cache/keys";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import { chat } from "@repo/types";
import { useAuth } from "@repo/redux/hook";

import { Pagination } from "../../../@types";

export interface IUseCallerProps {
  enabledIndex?: boolean;
  enabledShow?: boolean;
  enabledCategory?: boolean;
  id?: string;
  callbacks?: {
    messages?: {
      onSuccess?: (data: any) => void;
      onError?: (error: any) => void;
    };
  };
}

export const useChat = ({
  id,
  callbacks,
  enabledIndex,
  enabledShow,
  enabledCategory,
}: IUseCallerProps) => {
  const indexKey = keys.chat.index();
  const showKey = keys.chat.show(id);
  const categoryKey = keys.chat.category();

  const { enabledPrivateRoutes, hasProfile, hasTwoAuth } = useAuth();

  const index = useInfiniteQuery<Pagination<chat>>({
    queryKey: indexKey,
    queryFn: ({ pageParam = 1 }) => api.index({ page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!enabledIndex && enabledPrivateRoutes,
  });

  const show = useQuery<chat>({
    queryKey: showKey,
    queryFn: () => api.show(id!),
    enabled: !!enabledShow,
  });

  const messages = useMutation({
    mutationFn: (body: any) => api.messages(body),
    onSuccess: (data) => {
      callbacks?.messages?.onSuccess?.(data);
    },
    onError: (error) => {
      callbacks?.messages?.onError?.(error);
    },
  });

  const category = useQuery<{ keys: string[] }>({
    queryKey: categoryKey,
    queryFn: () => api.category(),
    enabled: !!enabledCategory && enabledPrivateRoutes && hasProfile && hasTwoAuth,
  });

  return { messages, index, show, category };
};
