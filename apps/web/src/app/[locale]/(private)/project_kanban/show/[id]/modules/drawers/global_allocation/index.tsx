"use client";

import { useMemo, useState } from "react";

import { ClockArrowDown, EllipsisVertical, Info, PackageOpen, Plus, Trash2, X } from "lucide-react";

import { project_allocation } from "@repo/types";
import { useLang } from "@repo/language/hook";
import {
  Alert,
  AlertDescription,
  AlertTitle,
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

import { Input } from "@repo/form";
import { Permission } from "@/components/ui/permission";
import { useAccess } from "@/hooks/access";
import { useTrash } from "@/hooks/trash";

import { useKanbanShow } from "../../../context";
import { Card } from "./card";

interface IGlobalAllocationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GlobalAllocation = ({ open, onOpenChange }: IGlobalAllocationProps) => {
  const trash = useTrash();

  const { permissions } = useAccess();
  const perm = permissions("project_allocation");

  const lang = useLang();
  const t = lang.page.kanban;

  const [search, setSearch] = useState("");

  const { state, data, loadings, general, callers } = useKanbanShow();

  const filtered = useMemo(() => {
    return data.globalAllocations.filter(
      (globalAllocation) =>
        `V${globalAllocation.project_version?.version?.toString()}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        globalAllocation.profile?.user?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data.globalAllocations, search]);

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
              <DrawerTitle>{t("drawer.globalAllocation.title")}</DrawerTitle>
              <DrawerDescription>{t("drawer.globalAllocation.description")}</DrawerDescription>
            </span>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="size-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="mt-2 px-4">
            <Alert className="bg-blue-500 text-white">
              <AlertTitle className="flex items-center gap-2">
                <Info className="size-4" />
                {t("drawer.globalAllocation.alert.title")}
              </AlertTitle>
              <AlertDescription className="flex items-center gap-2 text-white">
                {t("drawer.globalAllocation.alert.description")}
              </AlertDescription>
            </Alert>
          </div>

          <div className="mb-4 flex items-center justify-between gap-2 px-4 py-4">
            <Input
              icon="Search"
              placeholder={t("drawer.globalAllocation.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Permission permission={["store"]} feature="project_allocation">
              <Button size="sm" variant="secondary" onClick={() => state.globalAllocation.form()}>
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
                  title: t("drawer.globalAllocation.actions.title"),
                  items: [
                    {
                      icon: "Plus",
                      label: t("drawer.globalAllocation.actions.new_globalAllocation"),
                      onClick: () => state.globalAllocation.form(),
                      isVisible: perm.store,
                    },
                    {
                      separator: true,
                    },
                    {
                      icon: "Trash",
                      label: t("drawer.globalAllocation.actions.trash"),
                      onClick: () =>
                        general.handleState({ type: "globalAllocation", modes: ["trash"] }),
                      isVisible: perm.trash,
                    },
                  ],
                },
              ]}
            />
          </div>
          <ScrollArea className="h-full overflow-y-auto px-4 text-sm">
            <div className="mb-20 flex h-full flex-col gap-2">
              {filtered.map((globalAllocation, index) => (
                <Card
                  key={index}
                  card={globalAllocation}
                  loading={!!loadings.globalAllocation.index}
                />
              ))}
              {filtered.length === 0 && (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-2">
                  <PackageOpen size={48} />
                  <p className="text-muted-foreground text-md text-center font-semibold">
                    {t("drawer.globalAllocation.no_results")}
                  </p>
                  <Permission permission={["store"]} feature="project_allocation">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => state.globalAllocation.form()}
                    >
                      <Plus />
                      {t("drawer.globalAllocation.actions.new_globalAllocation")}
                    </Button>
                  </Permission>
                </div>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <Permission permission={["trash"]} feature="project_allocation">
        <AppDialog
          title={
            <span className="text-md flex items-center font-bold">
              <Trash2 className="mr-2" />
              {t("drawer.globalAllocation.actions.trash")}
            </span>
          }
          open={general.isOpen("globalAllocation", ["trash"])}
          className={"sm:max-w-[600px]"}
          onOpenChange={() => general.handleClose(["trash"])}
        >
          <ScrollArea
            className="bg-background w-full overflow-hidden rounded-lg border"
            style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
          >
            <Trash<project_allocation>
              items={callers.globalAllocation.onTrash()?.data || []}
              loading={loadings.globalAllocation.restore || loadings.globalAllocation.trash}
              {...trash.project_allocation()}
              actions={[
                {
                  label: t("drawer.globalAllocation.actions.restore"),
                  icon: <ClockArrowDown className="h-4 w-4" />,
                  onClick: callers.globalAllocation.onRestore,
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
