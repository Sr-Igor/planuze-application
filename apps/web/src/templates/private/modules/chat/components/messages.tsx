import { useEffect, useRef } from "react";

import { AlertCircle, BotMessageSquare, Check, Loader2, User, X } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, cn, Skeleton } from "@repo/ui";

export interface IMessagesProps {
  localMessages: any[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  loading: boolean;
  isAwaitingIa?: boolean;
  handleAction: (body: any) => void;
  actionLoading: boolean;
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
  actionLoading,
  handleAction,
}: IMessagesProps) => {
  const t = useLang();

  const containerRef = useRef<HTMLDivElement>(null);

  const chatName = process.env.NEXT_PUBLIC_AI_CHAT_NAME || t.chat("ai");

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

              const isLastMessage = idx === localMessages.length - 1;

              let isAction = false;
              let isActionCompleted = false;
              let isActionError = false;
              let actionData: any = null;
              let displayMessage = msg.message;

              if (
                !isUser &&
                typeof msg.message === "string" &&
                (msg.message.trim().startsWith("{") || msg.message.trim().startsWith("["))
              ) {
                try {
                  const parsed = JSON.parse(msg.message);
                  if (
                    parsed &&
                    typeof parsed === "object" &&
                    parsed.subject &&
                    parsed.action &&
                    parsed.payload
                  ) {
                    isAction = true;
                    actionData = parsed;
                    displayMessage = parsed.message;

                    if (parsed.error) {
                      isActionError = true;
                    } else if (["ACCEPTED", "REJECTED"].includes(parsed.action)) {
                      isActionCompleted = true;
                    }
                  }
                } catch (e) {
                  // Falha silenciosa
                }
              }

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
                      "max-w-[80%] rounded-lg px-2 py-1.5 text-xs wrap-break-word shadow transition-colors sm:max-w-[70%] sm:px-3 sm:py-2 sm:text-sm",
                      isUser
                        ? "bg-primary/80 text-primary-foreground border-primary/40 rounded-br-none border"
                        : "bg-muted dark:bg-background/80 text-foreground border-muted/30 rounded-bl-none border",
                      (msg.error || isActionError) && "border border-red-800 text-red-600",
                      isAction && !isActionError && "bg-accent! border-l-4 border-l-purple-500"
                    )}
                    tabIndex={0}
                    aria-label={isUser ? t.chat("user") : isIa ? chatName : msg.sender}
                  >
                    <span className="mb-0.5 block text-[11px] opacity-70 sm:text-xs">
                      {isUser ? t.chat("user") : isIa ? chatName : msg.sender}
                    </span>
                    <div className="relative">
                      {loading && <Skeleton className="absolute h-4 w-full" />}

                      {isAction ? (
                        <div className="flex flex-col gap-3 pt-1">
                          <p
                            className={
                              cn(loading ? "opacity-0" : "opacity-100") +
                              " leading-relaxed wrap-break-word"
                            }
                          >
                            {displayMessage}
                          </p>

                          <div className="border-foreground/5 mt-1 flex min-h-[30px] flex-wrap items-center justify-end gap-2 border-t pt-1">
                            {isActionError ? (
                              <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                                <AlertCircle className="h-3.5 w-3.5" />
                                {t.chat("error")}
                              </span>
                            ) : isActionCompleted ? (
                              actionData?.action === "ACCEPTED" ? (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                                  <Check className="h-3.5 w-3.5" />
                                  {t.chat("ACCEPTED")}
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                                  <X className="h-3.5 w-3.5" />
                                  {t.chat("REJECTED")}
                                </span>
                              )
                            ) : (
                              isLastMessage && (
                                <>
                                  {!actionLoading && (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="bg-tr h-7 gap-1.5 border-red-200 px-3 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          handleAction({ ...actionData, accepted: false });
                                        }}
                                      >
                                        <X className="h-3.5 w-3.5" />
                                        {t.chat("decline")}
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="h-7 gap-1.5 bg-green-600 px-3 text-xs text-white shadow-sm hover:bg-green-700"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleAction({ ...actionData, accepted: true });
                                        }}
                                      >
                                        <Check className="h-3.5 w-3.5" />
                                        {t.chat("accept")}
                                      </Button>
                                    </>
                                  )}

                                  {actionLoading && (
                                    <div className="flex h-8 items-center justify-center">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                  )}
                                </>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <p
                          className={cn(loading ? "opacity-0" : "opacity-100") + " wrap-break-word"}
                        >
                          {msg.error ? t.chat(`errors.${msg.message}`) : msg.message}
                        </p>
                      )}
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
