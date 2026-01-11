import * as React from "react";

import { X } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button, Skeleton } from "@repo/ui";

import { chat } from "@/api/generator/types";
import { cn } from "@/lib/utils";

export interface IHistoryProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pages: chat[][]; // agora recebe páginas
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  setChat: React.Dispatch<React.SetStateAction<chat | null>>;
}
export const History = ({
  open,
  setOpen,
  pages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  setChat,
}: IHistoryProps) => {
  const t = useLang();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Flatten pages
  const data = pages.flat();

  // Infinite scroll handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div
      className={cn(
        "align-center bg-background/60 absolute top-0 right-0 z-100 flex h-full w-full justify-end transition-all duration-300",
        !open && "z-[-10]"
      )}
      onClick={() => setOpen(false)}
    >
      <div
        className={cn(
          "bg-background flex w-[50%] flex-col gap-2 rounded-lg border shadow-2xl transition-all duration-300",
          "xs:w-full xs:rounded-none xs:border-0 xs:shadow-none xs:max-w-none",
          !open && "mr-[-100%]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="xs:px-1 xs:py-1 flex items-center justify-between border-b px-2 py-1">
          <p className="xs:text-xs text-xs font-bold sm:text-sm">{t.chat("history")}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            title={t.chat("close")}
            className="h-7 w-7 sm:h-9 sm:w-9"
          >
            <X />
          </Button>
        </div>
        <div
          className="xs:gap-1 xs:px-1 flex flex-col gap-2 overflow-y-auto"
          ref={containerRef}
          onScroll={handleScroll}
          style={{ maxHeight: "70vh" }}
        >
          {data.map((c) => (
            <div
              className="hover:bg-primary/10 dark:hover:bg-primary/20 border-muted/30 xs:rounded xs:border-0 xs:p-2 xs:text-xs cursor-pointer rounded-lg border p-2 transition-colors duration-200"
              key={c.id}
              onClick={() => {
                setChat(c);
                setOpen(false);
              }}
            >
              <p className="truncate text-xs font-semibold">{c.title || "-"}</p>
              <span className="text-muted-foreground xs:text-[10px] text-[11px]">
                {c.createdAt && new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
          {isFetchingNextPage && (
            <div className="flex flex-col gap-2">
              <Skeleton className="bg-muted h-10 w-full rounded-xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
