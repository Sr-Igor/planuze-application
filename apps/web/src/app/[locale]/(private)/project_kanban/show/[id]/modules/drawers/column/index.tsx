"use client";

import { useEffect, useMemo, useState } from "react";

import { ClockArrowDown, EllipsisVertical, PackageOpen, Plus, Trash2, X } from "lucide-react";

import { project_kanban_cycle_column } from "@repo/types";
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
import { AppDialog, AppDropdownMenu, Trash } from "@repo/ui";

import { Input } from "@repo/form";
import { Permission } from "@/components/permission";
import { useAccess } from "@/hooks/access";
import { OrderModal } from "@/templates/modal/order";

import { useKanbanShow } from "../../../context";
import { Card } from "./card";

interface IColumnProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Column = ({ open, onOpenChange }: IColumnProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle");

  const lang = useLang();
  const t = lang.page.kanban;

  const [search, setSearch] = useState("");

  const { page, state, loadings, general, callers, unload } = useKanbanShow();

  const columns = page.cycle?.project_kanban_cycle_columns || [];

  const filtered = useMemo(() => {
    return columns.filter((column) => column.title.toLowerCase().includes(search.toLowerCase()));
  }, [columns, search]);

  const [isDirty, setIsDirty] = useState(false);
  useEffect(() => {
    unload.handleState({
      feature: "column",
      dirty: isDirty,
      modes: ["order"],
    });
  }, [isDirty]);

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
              <DrawerTitle>{t("drawer.column.title")}</DrawerTitle>
              <DrawerDescription>{t("drawer.column.description")}</DrawerDescription>
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
              placeholder={t("drawer.column.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Permission permission={["store"]} feature="project_kanban_cycle">
              <Button size="sm" variant="secondary" onClick={() => state.column.form()}>
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
                  title: t("drawer.column.actions.title"),
                  items: [
                    {
                      icon: "Plus",
                      label: t("drawer.column.actions.new_column"),
                      onClick: () => state.column.form(),
                      isVisible: perm.store,
                    },
                    {
                      separator: true,
                    },
                    {
                      icon: "ListOrdered",
                      label: t("drawer.column.actions.order"),
                      onClick: () => general.handleState({ type: "column", modes: ["order"] }),
                      isVisible: perm.many,
                    },
                    {
                      separator: true,
                    },
                    {
                      icon: "Trash",
                      label: t("drawer.column.actions.trash"),
                      onClick: () => general.handleState({ type: "column", modes: ["trash"] }),
                      isVisible: perm.trash,
                    },
                  ],
                },
              ]}
            />
          </div>
          <ScrollArea className="h-full overflow-y-auto px-4 text-sm">
            <div className="mb-20 flex h-full flex-col gap-2">
              {filtered.map((column, index) => (
                <Card key={index} card={column} loading={!!loadings.cycle.index} />
              ))}
              {filtered.length === 0 && (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-2">
                  <PackageOpen size={48} />
                  <p className="text-muted-foreground text-md text-center font-semibold">
                    {t("drawer.column.no_results")}
                  </p>

                  <Permission permission={["store"]} feature="project_kanban_cycle">
                    <Button size="sm" variant="secondary" onClick={() => state.column.form()}>
                      <Plus />
                      {t("drawer.column.actions.new_column")}
                    </Button>
                  </Permission>
                </div>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <Permission permission={["many"]} feature="project_kanban_cycle">
        <OrderModal
          data={columns}
          titleKey="title"
          useChild={false}
          onSave={callers.column.onMany}
          loading={loadings.column.many}
          open={general.isOpen("column", ["order"])}
          setOpen={() => {
            const onConfirm = () => {
              unload.handleState({
                feature: "column",
                dirty: false,
                modes: ["order"],
              });
              general.handleClose(["order"]);
            };

            const isInDirty = unload.isInDirty("column", ["order"]);
            if (isInDirty) {
              unload.setCancel({
                modes: ["order"],
                feature: "column",
                onConfirm,
              });
            } else {
              onConfirm();
            }
          }}
          dirtyCallback={setIsDirty}
        />
      </Permission>

      <Permission permission={["trash"]} feature="project_kanban_cycle">
        <AppDialog
          title={
            <span className="text-md flex items-center font-bold">
              <Trash2 className="mr-2" />
              {t("drawer.column.actions.trash")}
            </span>
          }
          open={general.isOpen("column", ["trash"])}
          className={"sm:max-w-[600px]"}
          onOpenChange={() => general.handleClose(["trash"])}
        >
          <ScrollArea
            className="bg-background w-full overflow-hidden rounded-lg border"
            style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
          >
            <Trash<project_kanban_cycle_column>
              items={callers.column.onTrash()?.data || []}
              loading={loadings.column.restore || loadings.column.trash}
              showKeys={["title"]}
              actions={[
                {
                  label: t("drawer.column.actions.restore"),
                  icon: <ClockArrowDown className="h-4 w-4" />,
                  onClick: callers.column.onRestore,
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
