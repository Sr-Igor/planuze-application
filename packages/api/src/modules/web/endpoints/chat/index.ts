import type { chat, EndpointBody, EndpointParams, EndpointQuery, Pagination } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// Chat DTOs - derived from endpoint types
// =============================================================================

export type ChatMessagesBody = EndpointBody<"/api/private/chat/messages">;
export type ChatShowParams = EndpointParams<"/api/private/chat/show">;
export type ChatIndexQuery = EndpointQuery<"/api/private/chat/index">;

/**
 * Chat endpoints
 */
export const chatEndpoint = {
  /**
   * Get chat messages
   */
  messages: (body: ChatMessagesBody) =>
    typedRequest<{ chat: string; new?: boolean }>()({
      route: "/api/private/chat/messages",
      body,
    }),

  /**
   * List all chats
   */
  index: (query?: ChatIndexQuery) =>
    typedRequest<Pagination<chat>>()({
      route: "/api/private/chat/index",
      query,
    }),

  /**
   * Get a specific chat
   */
  show: (params: ChatShowParams) =>
    typedRequest<chat>()({
      route: "/api/private/chat/show",
      params,
    }),

  /**
   * Get chat categories
   */
  category: () =>
    typedRequest<{ keys: string[] }>()({
      route: "/api/private/chat/category",
    }),
};

// Direct function exports for backwards compatibility
export const chatMessages = chatEndpoint.messages;
export const chatIndex = chatEndpoint.index;
export const chatShow = chatEndpoint.show;
export const chatCategory = chatEndpoint.category;
