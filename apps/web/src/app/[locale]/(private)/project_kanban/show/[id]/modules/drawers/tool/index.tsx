"use client";

import { useMemo, useState } from "react";

import { ClockArrowDown, EllipsisVertical, PackageOpen, Plus, Trash2, X } from "lucide-react";

import { Input } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { project_tool } from "@repo/types";
import {
  AppDialog,
  AppDropdownMenu,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  ScrollArea,
  Trash,
} from "@repo/ui";

import { Permission } from "@/components/permission";
import { useAccess } from "@/hooks/access";

import { useKanbanShow } from "../../../context";
import { Card } from "./card";

interface IToolProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Tool = ({ open, onOpenChange }: IToolProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_tool");

  const lang = useLang();
  const t = lang.page.kanban;

  const [search, setSearch] = useState("");

  const { state, data, loadings, general, callers } = useKanbanShow();

  const filtered = useMemo(() => {
    return data.tools.filter((item) => item.title?.toLowerCase().includes(search.toLowerCase()));
  }, [data.tools, search]);

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
              <DrawerTitle>{t("drawer.tool.title")}</DrawerTitle>
              <DrawerDescription>{t("drawer.tool.description")}</DrawerDescription>
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
              placeholder={t("drawer.tool.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Permission permission={["store"]} feature="project_kanban_cycle">
              <Button size="sm" variant="secondary" onClick={() => state.tool.form()}>
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
                  title: t("drawer.tool.actions.title"),
                  items: [
                    {
                      icon: "Plus",
                      label: t("drawer.tool.actions.new_tool"),
                      onClick: () => state.tool.form(),
                      isVisible: perm.store,
                    },
                    {
                      separator: true,
                    },
                    {
                      icon: "Trash",
                      label: t("drawer.tool.actions.trash"),
                      onClick: () => state.tool.trash(),
                      isVisible: perm.trash,
                    },
                  ],
                },
              ]}
            />
          </div>
          <ScrollArea className="h-full overflow-y-auto px-4 text-sm">
            <div className="mb-20 flex h-full flex-col gap-2">
              {filtered.map((item, idx) => (
                <Card key={`${item.id}.${idx}`} item={item} loading={!!loadings.cycle.index} />
              ))}
              {filtered.length === 0 && (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-2">
                  <PackageOpen size={48} />
                  <p className="text-muted-foreground text-md text-center font-semibold">
                    {t("drawer.tool.no_results")}
                  </p>
                  <Permission permission={["store"]} feature="project_kanban_cycle">
                    <Button size="sm" variant="secondary" onClick={() => state.tool.form()}>
                      <Plus />
                      {t("drawer.tool.actions.new_tool")}
                    </Button>
                  </Permission>
                </div>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <Permission permission={["trash"]} feature="project_kanban_cycle">
        <AppDialog
          title={
            <span className="text-md flex items-center font-bold">
              <Trash2 className="mr-2" />
              {t("drawer.tool.actions.trash")}
            </span>
          }
          open={general.isOpen("tool", ["trash"])}
          className={"sm:max-w-[600px]"}
          onOpenChange={() => general.handleClose(["trash"])}
        >
          <ScrollArea
            className="bg-background w-full overflow-hidden rounded-lg border"
            style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
          >
            <Trash<project_tool>
              items={callers.tool.onTrash()?.data || []}
              loading={loadings.tool.restore || loadings.tool.trash}
              showKeys={["title"]}
              actions={[
                {
                  label: t("drawer.tool.actions.restore"),
                  icon: <ClockArrowDown className="h-4 w-4" />,
                  onClick: callers.tool.onRestore,
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
