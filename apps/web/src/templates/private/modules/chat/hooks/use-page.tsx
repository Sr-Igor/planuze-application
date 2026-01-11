import { useEffect, useRef, useState } from 'react';

import keys from '@/api/cache/keys';
import { useChat } from '@/api/callers/chat';
import { useAppSelector } from '@/hooks/redux';
//Socket
import { socket } from '@/providers/socket';
import { useQueryClient } from '@tanstack/react-query';

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

    const user = useAppSelector((state) => state.user);

    const queryClient = useQueryClient();

    const { messages, index, show, category } = useChat({
        enabledIndex: true,
        enabledShow: !!chat?.id,
        enabledCategory: true,
        id: chat?.id,
        callbacks: {
            messages: {
                onSuccess: (data) => {
                    setChat({ id: data.chat });

                    if (data.new) queryClient.refetchQueries({ queryKey: keys.chat.index() });
                },
                onError: () => {
                    setIsAwaitingIa(false);
                }
            }
        }
    });

    const submitMessage = () => {
        setIsAwaitingIa(true);
        messages.mutate({ question, features, chat: chat?.id });
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
        open && messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
                const idx = prev.findIndex((msg) => msg.id === data.id && msg.sender === 'ai');
                if (idx !== -1) {
                    // Concatena fragmento na mensagem existente
                    const updated = [...prev];
                    updated[idx] = {
                        ...updated[idx],
                        message: updated[idx].message + data.message
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
        submitMessage
    };
};
