"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { createPortal } from "react-dom";

import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle, PackageOpen } from "lucide-react";

import { profileIndex } from "@repo/api/web";
import { useDebounce } from "@repo/hooks";
import { useLang } from "@repo/language/hooks";
import { Pagination, profile } from "@repo/types";
import {
  AppAvatar,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@repo/ui";

interface MentionPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (profile: profile) => void;
  query: string;
  position: { top: number; left: number };
  mentionQuery?: Record<string, string>;
  editor?: any;
}

export const MentionPopover: React.FC<MentionPopoverProps> = ({
  open,
  onOpenChange,
  onSelect,
  query,
  position,
  mentionQuery,
  editor,
}) => {
  const t = useLang();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const popoverRef = useRef<HTMLDivElement>(null);

  const inputDebounced = useDebounce(query, 300);
  const isDebouncing = query !== inputDebounced;

  const queryIndex = useInfiniteQuery<Pagination<profile>>({
    queryKey: ["mention-profiles", inputDebounced],
    queryFn: ({ pageParam = 1 }) => {
      const params: Record<string, any> = { page: pageParam, limit: 10, ...mentionQuery };
      if (inputDebounced) params.search = inputDebounced;
      return profileIndex(params);
    },
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage?.page + 1 : undefined,
    initialPageParam: 1,
    enabled: open,
  });

  const data = queryIndex.data?.pages.flatMap((page) => page.data) ?? [];

  const items = useMemo(
    () =>
      data.map((item: profile) => ({
        label: item.user?.name || "",
        value: item.id,
        item: item,
      })),
    [data]
  );

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isAtBottom && queryIndex.hasNextPage && !queryIndex.isFetchingNextPage) {
        queryIndex.fetchNextPage();
      }
    },
    [queryIndex]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      const popover = popoverRef.current;
      if (!popover) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          e.stopPropagation();
          setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          // Keep focus on editor asynchronously
          if (editor) {
            setTimeout(() => {
              editor.commands.focus();
            }, 0);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          e.stopPropagation();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          if (editor) {
            setTimeout(() => {
              editor.commands.focus();
            }, 0);
          }
          break;
        case "Enter":
          e.preventDefault();
          e.stopPropagation();
          if (items[selectedIndex]) {
            onSelect(items[selectedIndex].item);
          }
          break;
        case "Escape":
          e.preventDefault();
          e.stopPropagation();
          onOpenChange(false);
          if (editor) {
            setTimeout(() => {
              editor.commands.focus();
            }, 0);
          }
          break;
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown, true);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [open, items, selectedIndex, onSelect, onOpenChange, editor]);

  useEffect(() => {
    if (popoverRef.current) {
      const selectedItem = popoverRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Reset selectedIndex to 0 when popover opens
  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
    }
  }, [open]);

  // Ensure selectedIndex doesn't exceed number of items
  useEffect(() => {
    if (items.length > 0 && selectedIndex >= items.length) {
      setSelectedIndex(0);
    }
  }, [items.length, selectedIndex]);

  if (!open) return null;

  const popoverContent = (
    <div
      ref={popoverRef}
      className="fixed z-[50] max-w-[300px] min-w-[200px]"
      data-mention-popover
      tabIndex={-1}
      style={{
        top: position.top,
        left: position.left,
        pointerEvents: "auto",
      }}
    >
      <div className="bg-popover max-h-80 rounded-md border p-0 shadow-md">
        <Command shouldFilter={false} value={items[selectedIndex]?.value || ""}>
          <CommandList
            className="max-h-64 overflow-auto"
            onWheel={(e) => {
              e.stopPropagation();
            }}
            onScroll={handleScroll}
          >
            {(queryIndex.isLoading || isDebouncing) && items.length === 0 && (
              <span className="flex w-full items-center justify-center p-4">
                <LoaderCircle className="animate-spin" size={20} />
              </span>
            )}

            {!queryIndex.isLoading && !isDebouncing && data.length === 0 && (
              <CommandEmpty className="flex flex-col items-center justify-center gap-2 p-6 text-xs font-semibold">
                <PackageOpen size={26} />
                {t.helper("no_results")}
              </CommandEmpty>
            )}

            <CommandGroup>
              {items.map((item, index) => (
                <CommandItem
                  key={`${item.value}-${item.label}`}
                  data-index={index}
                  value={item.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelect(item.item);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn("cursor-pointer", selectedIndex === index && "bg-accent/50")}
                >
                  <div className="flex w-full items-center gap-2 text-sm">
                    {item && (
                      <AppAvatar
                        src={item?.item.user?.avatar || item?.item.anonymous_avatar || ""}
                        path="user/avatar"
                        publicFile
                        name={item?.item.user?.name || item?.item.anonymous_name || "-"}
                        className="h-4 w-4"
                        fallbackClassName="text-[10px]"
                      />
                    )}
                    <span>
                      <p className="line-clamp-1 flex-1 truncate">
                        {item?.item.user?.name || item?.item.anonymous_name || item?.label}
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        {item?.item.user?.email || item?.item.anonymous_email || "-"}
                      </p>
                    </span>
                  </div>
                </CommandItem>
              ))}

              {queryIndex.isFetchingNextPage && (
                <div className="flex items-center justify-center p-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  <span className="text-muted-foreground ml-2 text-sm">
                    {t.helper("loading_more")}
                  </span>
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );

  // Render using Portal to escape Dialog hierarchy
  return createPortal(popoverContent, document.body);
};
