"use client";

import { useEffect, useState } from "react";

import { Loader2, PackageOpen, X } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  ScrollArea,
} from "@repo/ui";

import { Input } from "@repo/form";
import { Permission } from "@/components/ui/permission";
import { useDebounce } from "@/@repo/hooks";

import { useKanbanShow } from "../../../context";
import { Card } from "./card";
import { RestoreCardForm } from "./restore";

interface ICardTrashProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CardTrash = ({ open, onOpenChange }: ICardTrashProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { callers, general, setParams, params, loadings } = useKanbanShow();

  const [search, setSearch] = useState(params.trash_search);
  const debouncedValue = useDebounce(search, 500);
  const isDebouncing = search !== debouncedValue;

  useEffect(() => {
    setParams({ trash_search: debouncedValue });
  }, [debouncedValue]);

  const index = callers.card.onTrash();
  const cards = index?.data?.pages.flatMap((page) => page.data) ?? [];
  const isLoading = index?.isLoading || index?.isPlaceholderData || isDebouncing;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      index.hasNextPage &&
      !index.isFetchingNextPage &&
      index.hasNextPage
    ) {
      index.fetchNextPage();
    }
  };

  return (
    <>
      <Drawer
        direction="right"
        open={open}
        onOpenChange={onOpenChange}
        closeThreshold={0.75}
        activeSnapPoint={0.75}
      >
        <DrawerContent className="max-w-[600px]!">
          <DrawerHeader className="flex flex-row items-start justify-between border-b">
            <span>
              <DrawerTitle>
                {t("drawer.cardTrash.title")}
                {!isLoading && ` (${index?.data?.pages[0]?.count})`}
              </DrawerTitle>
              <DrawerDescription>{t("drawer.cardTrash.description")}</DrawerDescription>
            </span>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="size-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="mb-4 flex items-center justify-between gap-5 px-4 py-4">
            <Input
              icon="Search"
              placeholder={t("drawer.cardTrash.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ScrollArea
            className="bg-background overflow-y-auto"
            onScroll={handleScroll}
            style={{ maxHeight: "calc(100vh - 140px)" }}
          >
            <div className="mb-20 flex h-full flex-col">
              {cards.map((cycle, index) => (
                <Card key={index} card={cycle} loading={isLoading} />
              ))}
              {!cards?.length && !isLoading && (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-2">
                  <PackageOpen size={48} />
                  <p className="text-muted-foreground text-md text-center font-semibold">
                    {t("drawer.cardTrash.no_results")}
                  </p>
                </div>
              )}
              {index.isFetchingNextPage && (
                <div className="flex h-full min-h-[30px] flex-col items-center justify-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                </div>
              )}
              {!isLoading && !index.hasNextPage && !!cards?.length && (
                <div className="flex h-full min-h-[30px] flex-col items-center justify-center gap-2 pt-10">
                  <p className="text-muted-foreground text-center text-sm font-thin">
                    {t("drawer.cardTrash.no_more_results")}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <Permission permission={["restore"]} feature="project_kanban_cycle_card">
        <RestoreCardForm
          open={general.isOpen("card", ["restore"])}
          onOpenChange={() => general.handleClose(["restore"])}
          item={general.state.card}
          onSubmit={callers.card.onRestore}
          loading={loadings.card.restore || false}
        />
      </Permission>
    </>
  );
};
