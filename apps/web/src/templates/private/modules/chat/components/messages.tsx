import { useEffect, useRef } from "react";

import { BotMessageSquare, User } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Skeleton } from "@repo/ui";

import { cn } from "@repo/ui";

export interface IMessagesProps {
  localMessages: any[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  loading: boolean;
  isAwaitingIa?: boolean;
}

const LoadingBubble = () => {
  const t = useLang();
  return (
    <div className="animate-fade-in flex items-end gap-2">
      <BotMessageSquare />
      <div className="bg-muted dark:bg-background/80 text-foreground flex max-w-[80%] items-center rounded-lg rounded-bl-none px-2 py-1.5 shadow sm:max-w-[70%] sm:px-3 sm:py-2">
        <span className="mb-0.5 block text-xs opacity-70">{t.chat("ai")}</span>
        <span className="ml-2 flex gap-1">
          <span className="bg-foreground/40 inline-block h-2 w-2 animate-bounce rounded-full [animation-delay:0ms]"></span>
          <span className="bg-foreground/40 inline-block h-2 w-2 animate-bounce rounded-full [animation-delay:150ms]"></span>
          <span className="bg-foreground/40 inline-block h-2 w-2 animate-bounce rounded-full [animation-delay:300ms]"></span>
        </span>
      </div>
    </div>
  );
};

export const Messages = ({
  localMessages,
  messagesEndRef,
  loading,
  isAwaitingIa,
}: IMessagesProps) => {
  const t = useLang();

  const containerRef = useRef<HTMLDivElement>(null);

  // Animação suave ao adicionar mensagens
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [localMessages, isAwaitingIa]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={containerRef}
        className="bg-background/80 min-h-0 flex-1 overflow-y-auto rounded border px-2 py-1 sm:px-4 sm:py-2"
      >
        {localMessages.length ? (
          localMessages
            .sort(
              (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )
            .map((msg: any, idx: number) => {
              const isUser = msg.sender === "user";
              const isIa = msg.sender === "ai";
              return (
                <div
                  key={msg.id + idx}
                  className={cn(
                    "animate-fade-in mb-3 flex w-full items-end gap-1 sm:mb-4 sm:gap-2",
                    isUser ? "justify-end" : "justify-start"
                  )}
                >
                  {/* Avatar */}
                  {!isUser && <BotMessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-2 py-1.5 text-xs break-words shadow transition-colors sm:max-w-[70%] sm:px-3 sm:py-2 sm:text-sm",
                      isUser
                        ? "bg-primary/80 text-primary-foreground border-primary/40 rounded-br-none border"
                        : "bg-muted dark:bg-background/80 text-foreground border-muted/30 rounded-bl-none border",
                      msg.error && "border border-red-800 text-red-600"
                    )}
                    tabIndex={0}
                    aria-label={isUser ? t.chat("user") : isIa ? t.chat("ai") : msg.sender}
                  >
                    <span className="mb-0.5 block text-[11px] opacity-70 sm:text-xs">
                      {isUser ? t.chat("user") : isIa ? t.chat("ai") : msg.sender}
                    </span>
                    <div className="relative">
                      {loading && <Skeleton className="absolute h-4 w-full" />}
                      <p className={cn(loading ? "opacity-0" : "opacity-100") + " break-words"}>
                        {msg.error ? t.chat(`errors.${msg.message}`) : msg.message}
                      </p>
                    </div>
                  </div>
                  {/* Avatar usuário */}
                  {isUser && <User className="h-5 w-5 sm:h-6 sm:w-6" />}
                </div>
              );
            })
        ) : (
          <span className="text-muted-foreground text-xs sm:text-sm">{t.chat("empty")}</span>
        )}
        {/* Loading IA */}
        {(isAwaitingIa || localMessages?.length === 1) && <LoadingBubble />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
