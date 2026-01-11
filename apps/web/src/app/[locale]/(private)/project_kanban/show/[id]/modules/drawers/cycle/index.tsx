"use client";

import { useEffect, useMemo, useState } from "react";

import { ClockArrowDown, EllipsisVertical, PackageOpen, Plus, Trash2, X } from "lucide-react";

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

import { project_kanban_cycle } from "@/api/generator/types";
import { Input } from "@/components/form/input";
import { Permission } from "@/components/ui/permission";
import { useAccess } from "@/hooks/access";
import { OrderModal } from "@/templates/modal/order";

import { useKanbanShow } from "../../../context";
import { Card } from "./card";

interface ICycleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Cycle = ({ open, onOpenChange }: ICycleProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle");

  const lang = useLang();
  const t = lang.page.kanban;

  const [search, setSearch] = useState("");

  const { state, data, loadings, general, callers, unload } = useKanbanShow();

  const filtered = useMemo(() => {
    return data.cycles.filter((cycle) => cycle.title.toLowerCase().includes(search.toLowerCase()));
  }, [data.cycles, search]);

  const [isDirty, setIsDirty] = useState(false);
  useEffect(() => {
    unload.handleState({
      feature: "cycle",
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
              <DrawerTitle>{t("drawer.cycle.title")}</DrawerTitle>
              <DrawerDescription>{t("drawer.cycle.description")}</DrawerDescription>
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
              placeholder={t("drawer.cycle.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Permission permission={["store"]} feature="project_kanban_cycle">
              <Button size="sm" variant="secondary" onClick={() => state.cycle.form()}>
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
                  title: t("drawer.cycle.actions.title"),
                  items: [
                    {
                      icon: "Plus",
                      label: t("drawer.cycle.actions.new_cycle"),
                      onClick: () => state.cycle.form(),
                      isVisible: perm.store,
                    },
                    {
                      separator: true,
                    },
                    {
                      icon: "ListOrdered",
                      label: t("drawer.cycle.actions.order"),
                      onClick: () => general.handleState({ type: "cycle", modes: ["order"] }),
                      isVisible: perm.many,
                    },
                    {
                      separator: true,
                    },
                    {
                      icon: "Trash",
                      label: t("drawer.cycle.actions.trash"),
                      onClick: () => general.handleState({ type: "cycle", modes: ["trash"] }),
                      isVisible: perm.trash,
                    },
                  ],
                },
              ]}
            />
          </div>
          <ScrollArea className="h-full overflow-y-auto px-4 text-sm">
            <div className="mb-20 flex h-full flex-col gap-2">
              {filtered.map((cycle, index) => (
                <Card key={index} card={cycle} loading={!!loadings.cycle.index} />
              ))}
              {filtered.length === 0 && (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-2">
                  <PackageOpen size={48} />
                  <p className="text-muted-foreground text-md text-center font-semibold">
                    {t("drawer.cycle.no_results")}
                  </p>
                  <Permission permission={["store"]} feature="project_kanban_cycle">
                    <Button size="sm" variant="secondary" onClick={() => state.cycle.form()}>
                      <Plus />
                      {t("drawer.cycle.actions.new_cycle")}
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
          data={data.cycles}
          titleKey="title"
          useChild={false}
          onSave={callers.cycle.onMany}
          loading={loadings.cycle.many}
          open={general.isOpen("cycle", ["order"])}
          setOpen={() => {
            const onConfirm = () => {
              unload.handleState({
                feature: "cycle",
                dirty: false,
                modes: ["order"],
              });
              general.handleClose(["order"]);
            };

            const isInDirty = unload.isInDirty("cycle", ["order"]);
            if (isInDirty) {
              unload.setCancel({
                modes: ["order"],
                feature: "cycle",
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
              {t("drawer.cycle.actions.trash")}
            </span>
          }
          open={general.isOpen("cycle", ["trash"])}
          className={"sm:max-w-[600px]"}
          onOpenChange={() => general.handleClose(["trash"])}
        >
          <ScrollArea
            className="bg-background w-full overflow-hidden rounded-lg border"
            style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
          >
            <Trash<project_kanban_cycle>
              items={callers.cycle.onTrash()?.data || []}
              loading={loadings.cycle.restore || loadings.cycle.trash}
              showKeys={["title"]}
              actions={[
                {
                  label: t("drawer.cycle.actions.restore"),
                  icon: <ClockArrowDown className="h-4 w-4" />,
                  onClick: callers.cycle.onRestore,
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
