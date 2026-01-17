"use client";

import { useMemo, useState } from "react";

import { ClockArrowDown, EllipsisVertical, PackageOpen, Plus, Trash2, X } from "lucide-react";

import { project_kanban_cycle_card_type } from "@repo/types";
import { useLang } from "@repo/language/hook";
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
import { AppDialog, AppDropdownMenu, Trash } from "@repo/ui/app";

import { Input } from "@/components/form/input";
import { Permission } from "@/components/ui/permission";
import { useAccess } from "@/hooks/access";

import { useKanbanShow } from "../../../context";
import { Card } from "./card";

interface ICardTypeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CardType = ({ open, onOpenChange }: ICardTypeProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban");

  const lang = useLang();
  const t = lang.page.kanban;

  const [search, setSearch] = useState("");

  const { state, data, loadings, general, callers } = useKanbanShow();

  const filtered = useMemo(() => {
    return data.cardsTypes.filter((cardType) =>
      cardType.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [data.cardsTypes, search]);

  return (
    <>
      <Drawer
        direction="right"
        open={open}
        onOpenChange={onOpenChange}
        closeThreshold={0.75}
        activeSnapPoint={0.75}
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-row items-start justify-between border-b">
            <span>
              <DrawerTitle>{t("drawer.cardType.title")}</DrawerTitle>
              <DrawerDescription>{t("drawer.cardType.description")}</DrawerDescription>
            </span>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="size-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="mb-4 flex items-center justify-between gap-2 px-4 py-4">
            <Input
              icon="Search"
              placeholder={t("drawer.cardType.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Permission permission={["store"]} feature="project_kanban">
              <Button size="sm" variant="secondary" onClick={() => state.cardType.form()}>
                <Plus />
              </Button>
            </Permission>

            <AppDropdownMenu
              trigger={
                <Button size="sm">
                  <EllipsisVertical />
                </Button>
              }
              groups={[
                {
                  title: t("drawer.cardType.actions.title"),
                  items: [
                    {
                      icon: "Plus",
                      label: t("drawer.cardType.actions.new_cardType"),
                      onClick: () => state.cardType.form(),
                      isVisible: perm.store,
                    },
                    {
                      separator: true,
                    },
                    {
                      icon: "Trash",
                      label: t("drawer.cardType.actions.trash"),
                      onClick: () => general.handleState({ type: "cardType", modes: ["trash"] }),
                      isVisible: perm.trash,
                    },
                  ],
                },
              ]}
            />
          </div>
          <ScrollArea className="h-full overflow-y-auto px-4 text-sm">
            <div className="mb-20 flex h-full flex-col gap-2">
              {filtered.map((cardType, index) => (
                <Card key={index} card={cardType} loading={!!loadings.cardType.index} />
              ))}
              {filtered.length === 0 && (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-2">
                  <PackageOpen size={48} />
                  <p className="text-muted-foreground text-md text-center font-semibold">
                    {t("drawer.cardType.no_results")}
                  </p>
                  <Permission permission={["store"]} feature="project_kanban">
                    <Button size="sm" variant="secondary" onClick={() => state.cardType.form()}>
                      <Plus />
                      {t("drawer.cardType.actions.new_cardType")}
                    </Button>
                  </Permission>
                </div>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <Permission permission={["trash"]} feature="project_kanban">
        <AppDialog
          title={
            <span className="text-md flex items-center font-bold">
              <Trash2 className="mr-2" />
              {t("drawer.cardType.actions.trash")}
            </span>
          }
          open={general.isOpen("cardType", ["trash"])}
          className={"sm:max-w-[600px]"}
          onOpenChange={() => general.handleClose(["trash"])}
        >
          <ScrollArea
            className="bg-background w-full overflow-hidden rounded-lg border"
            style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
          >
            <Trash<project_kanban_cycle_card_type>
              items={callers.cardType.onTrash()?.data || []}
              loading={loadings.cardType.restore || loadings.cardType.trash}
              showKeys={["title"]}
              actions={[
                {
                  label: t("drawer.cardType.actions.restore"),
                  icon: <ClockArrowDown className="h-4 w-4" />,
                  onClick: callers.cardType.onRestore,
                  isVisible: () => perm.restore,
                },
              ]}
            />
          </ScrollArea>
        </AppDialog>
      </Permission>
    </>
  );
};
