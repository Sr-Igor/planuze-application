import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { Footer } from './components/footer';
import { Header } from './components/header';
import { History } from './components/historic';
import { Initial } from './components/initial';
import { Messages } from './components/messages';
import { usePage } from './hooks/use-page';
import { Sparkles } from 'lucide-react';

export const Chat = () => {
    const {
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
        setLocalMessages,
        show,
        unread,
        isAwaitingIa,
        submitMessage
    } = usePage();

    const [showMessages, setShowMessages] = useState(!!chat);
    const [transitioning, setTransitioning] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(chat?.id);
    const nextChatId = chat?.id;
    const transitionTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Troca entre Initial/Messages OU troca de chat
        if (!!chat !== showMessages || (showMessages && currentChatId !== nextChatId)) {
            setTransitioning(true);
            if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
            transitionTimeout.current = setTimeout(() => {
                setShowMessages(!!chat);
                setCurrentChatId(nextChatId);
                setTransitioning(false);
            }, 200); // duração da transição reduzida
        }
        // Cleanup
        return () => {
            if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
        };
    }, [chat, nextChatId, showMessages, currentChatId]);

    if (!categories.length) return null;

    return (
        <div
            onClick={() => !open && setOpen(true)}
            className={cn(
                // Mobile: tela cheia, sem borda, sem arredondamento
                'fixed right-0 bottom-0 z-100 flex items-center justify-center overflow-hidden transition-all duration-300',
                'bg-background border border-gray-300 shadow-2xl shadow-purple-200/50 dark:border-purple-500/20 dark:shadow-purple-900/30',
                open
                    ? 'h-180 w-124 rounded-lg'
                    : 'right-5 bottom-5 h-14 w-14 cursor-pointer rounded-4xl hover:bg-purple-200/10 max-md:h-12 max-md:w-12',
                'max-w-full',
                'sm:right-5 sm:bottom-5',
                'xs:w-screen xs:h-screen xs:rounded-none xs:right-0 xs:bottom-0 xs:border-0 xs:shadow-none xs:max-w-none xs:max-h-none'
            )}
            style={{
                // @ts-ignore
                '--tw-xs': 'screen and (max-width: 552px)'
            }}>
            <Sparkles
                className={cn(
                    'text-muted-foreground absolute transition-all duration-300 max-md:h-5 max-md:w-5',
                    open && 'opacity-0',
                    unread && 'animate-pulse text-purple-500 duration-2000'
                )}
            />

            <History
                open={historyOpen}
                setOpen={setHistoryOpen}
                pages={index?.data?.pages?.map((page) => page.data) || []}
                fetchNextPage={index.fetchNextPage}
                hasNextPage={!!index.hasNextPage}
                isFetchingNextPage={index.isFetchingNextPage}
                setChat={setChat}
            />

            <div
                className={cn(
                    'pointer-events-none absolute flex h-full min-h-0 w-full flex-col opacity-0 transition-all duration-300',
                    open && 'pointer-events-auto opacity-100'
                )}>
                <Header
                    setChat={setChat}
                    setLocalMessages={setLocalMessages}
                    setHistoryOpen={setHistoryOpen}
                    setOpen={setOpen}
                />
                <div className='xs:gap-0 flex h-full min-h-0 flex-col gap-1'>
                    <div className='xs:gap-0 relative flex h-full flex-col gap-1'>
                        {/* Transição suave entre Initial e Messages */}
                        <div className='relative h-full w-full'>
                            {/* Initial */}
                            <div
                                className={cn(
                                    'absolute inset-0 transition-all duration-200',
                                    showMessages || transitioning
                                        ? 'pointer-events-none translate-y-4 opacity-0'
                                        : 'z-10 translate-y-0 opacity-100'
                                )}>
                                <Initial
                                    user={user}
                                    categories={categories}
                                    features={features}
                                    setFeatures={setFeatures}
                                />
                            </div>
                            {/* Messages */}
                            <div
                                className={cn(
                                    'absolute inset-0 transition-all duration-200',
                                    showMessages && !transitioning
                                        ? 'z-10 translate-y-0 opacity-100'
                                        : 'pointer-events-none translate-y-4 opacity-0'
                                )}>
                                {/* Renderiza as mensagens do chat atual apenas quando não está em transição de saída */}
                                {showMessages && (!transitioning || currentChatId === nextChatId) && (
                                    <Messages
                                        localMessages={localMessages}
                                        messagesEndRef={messagesEndRef}
                                        loading={show.isLoading}
                                        isAwaitingIa={isAwaitingIa}
                                    />
                                )}
                            </div>
                        </div>
                        <Footer
                            question={question}
                            setQuestion={setQuestion}
                            setLocalMessages={setLocalMessages}
                            onSend={submitMessage}
                            disabled={isAwaitingIa}
                            show={features.length > 0 || !!chat}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
