import { useEffect, useRef, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useCleanCache } from "@repo/api";
import keys from "@repo/api/cache/keys";
import { useChat } from "@repo/api/web";
import { useAppSelector } from "@repo/redux/hooks";

//Socket
import { socket } from "@/providers/socket";

import { Modes } from "../components/mode";

export const usePage = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<any>();
  const [question, setQuestion] = useState<string | undefined>(undefined);
  const [features, setFeatures] = useState<string[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [unread, setUnread] = useState(false);
  const [isAwaitingIa, setIsAwaitingIa] = useState(false);
  const [mode, setMode] = useState<Modes>("AUTO");

  const user = useAppSelector((state) => state.user);

  const queryClient = useQueryClient();

  const updateMessageAction = (actionId: string, updates: any) => {
    setLocalMessages((prev) =>
      prev.map((msg) => {
        try {
          if (
            typeof msg.message === "string" &&
            (msg.message.trim().startsWith("{") || msg.message.trim().startsWith("["))
          ) {
            const parsed = JSON.parse(msg.message);
            if (parsed.action_id === actionId) {
              return {
                ...msg,
                message: JSON.stringify({
                  ...parsed,
                  ...updates,
                }),
              };
            }
          }
        } catch (e) {
          // Ignore parsing errors
        }
        return msg;
      })
    );
  };

  const { cleanCacheByBatch } = useCleanCache();

  const { messages, index, show, category, action } = useChat({
    enabledIndex: true,
    enabledShow: !!chat?.id,
    enabledCategory: true,
    id: chat?.id,
    callbacks: {
      messages: {
        onSuccess: (data: any) => {
          setChat({ id: data.chat });

          setLocalMessages((prev) =>
            prev.map((msg) => (msg.sending ? { ...msg, sending: false } : msg))
          );

          if (data.new) queryClient.refetchQueries({ queryKey: keys.chat.index() });
        },
        onError: () => {
          setIsAwaitingIa(false);
          setLocalMessages((prev) =>
            prev.map((msg) => (msg.sending ? { ...msg, sending: false, error: true } : msg))
          );
        },
      },
      action: {
        onSuccess: (data: any, vars: any) => {
          updateMessageAction(data.action_id, {
            action: data.action,
            error: data.error,
          });

          cleanCacheByBatch({ keys: [vars.subject], clearSimilar: true });
        },
        onError: (_, vars) => {
          if (vars?.action_id) {
            updateMessageAction(vars.action_id, {
              error: true,
            });
          }
        },
      },
    },
  });

  const submitMessage = () => {
    setIsAwaitingIa(true);
    messages.mutate({
      question: question || "",
      features: features.join(","),
      chat: chat?.id,
      mode,
    });
  };

  const categories = category.data?.keys || [];

  // Sempre que trocar de chat e show.data for carregado, inicializa as mensagens locais
  useEffect(() => {
    if (show.data?.chat_messages) {
      setLocalMessages([...show.data.chat_messages]);
      setIsAwaitingIa(false);
    }
  }, [show.data?.chat_messages]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    open && messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, localMessages]);

  useEffect(() => {
    if (open) setUnread(false);
  }, [open]);

  useEffect(() => {
    if (!chat) return;

    const handler = (data: any) => {
      setIsAwaitingIa(false);
      !open && setUnread(true);
      setLocalMessages((prev) => {
        const idx = prev.findIndex((msg) => msg.id === data.id && msg.sender === "ai");
        if (idx !== -1) {
          // Concatena fragmento na mensagem existente
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            message: updated[idx].message + data.message,
          };
          return updated;
        } else {
          // Adiciona nova mensagem
          return [...prev, data];
        }
      });
    };

    socket.on(`chat:${chat.id}`, handler);
    return () => {
      socket.off(`chat:${chat.id}`, handler);
    };
  }, [chat, socket, open]);

  const handleAction = (body: any) => {
    action.mutate(body);
  };

  return {
    open,
    setOpen,
    chat,
    setChat,
    question,
    setQuestion,
    features,
    setFeatures,
    historyOpen,
    setHistoryOpen,
    localMessages,
    messagesEndRef,
    user,
    categories,
    index,
    show,
    setLocalMessages,
    unread,
    setUnread,
    isAwaitingIa,
    submitMessage,
    handleAction,
    mode,
    setMode,
    actionLoading: action.isPending,
  };
};
