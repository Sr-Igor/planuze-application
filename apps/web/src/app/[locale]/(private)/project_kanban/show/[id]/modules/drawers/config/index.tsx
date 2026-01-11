"use client";

import { useMemo, useState } from "react";

import { ClockArrowDown, EllipsisVertical, PackageOpen, Plus, Trash2, X } from "lucide-react";

import { project_config } from "@repo/api/generator/types";
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
import { useTrash } from "@/hooks/trash";

import { useKanbanShow } from "../../../context";
import { Card } from "./card";

interface IConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Config = ({ open, onOpenChange }: IConfigProps) => {
  const trash = useTrash();

  const { permissions } = useAccess();
  const perm = permissions("project_config");

  const lang = useLang();
  const t = lang.page.kanban;

  const [search, setSearch] = useState("");

  const { state, data, loadings, general, callers } = useKanbanShow();

  const filtered = useMemo(() => {
    return data.configs.filter((config) =>
      `V${config.project_version?.version?.toString()}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [data.configs, search]);

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
              <DrawerTitle>{t("drawer.config.title")}</DrawerTitle>
              <DrawerDescription>{t("drawer.config.description")}</DrawerDescription>
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
              placeholder={t("drawer.config.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Permission permission={["store"]} feature="project_config">
              <Button size="sm" variant="secondary" onClick={() => state.config.form()}>
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
                  title: t("drawer.config.actions.title"),
                  items: [
                    {
                      icon: "Plus",
                      label: t("drawer.config.actions.new_config"),
                      onClick: () => state.config.form(),
                      isVisible: perm.store,
                    },
                    {
                      separator: true,
                    },
                    {
                      icon: "Trash",
                      label: t("drawer.config.actions.trash"),
                      onClick: () => general.handleState({ type: "config", modes: ["trash"] }),
                      isVisible: perm.trash,
                    },
                  ],
                },
              ]}
            />
          </div>
          <ScrollArea className="h-full overflow-y-auto px-4 text-sm">
            <div className="mb-20 flex h-full flex-col gap-2">
              {filtered.map((config, index) => (
                <Card key={index} card={config} loading={!!loadings.config.index} />
              ))}
              {filtered.length === 0 && (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-2">
                  <PackageOpen size={48} />
                  <p className="text-muted-foreground text-md text-center font-semibold">
                    {t("drawer.config.no_results")}
                  </p>
                  <Permission permission={["store"]} feature="project_config">
                    <Button size="sm" variant="secondary" onClick={() => state.config.form()}>
                      <Plus />
                      {t("drawer.config.actions.new_config")}
                    </Button>
                  </Permission>
                </div>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <Permission permission={["trash"]} feature="project_config">
        <AppDialog
          title={
            <span className="text-md flex items-center font-bold">
              <Trash2 className="mr-2" />
              {t("drawer.config.actions.trash")}
            </span>
          }
          open={general.isOpen("config", ["trash"])}
          className={"sm:max-w-[600px]"}
          onOpenChange={() => general.handleClose(["trash"])}
        >
          <ScrollArea
            className="bg-background w-full overflow-hidden rounded-lg border"
            style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
          >
            <Trash<project_config>
              items={callers.config.onTrash()?.data || []}
              loading={loadings.config.restore || loadings.config.trash}
              {...trash.project_config()}
              actions={[
                {
                  label: t("drawer.config.actions.restore"),
                  icon: <ClockArrowDown className="h-4 w-4" />,
                  onClick: callers.config.onRestore,
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
