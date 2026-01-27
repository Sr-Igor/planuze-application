"use client";

import { useMemo, useState } from "react";

import { ClockArrowDown, EllipsisVertical, PackageOpen, Plus, Trash2, X } from "lucide-react";

import { Input } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { useUserAccess, useUserAuth } from "@repo/redux/hooks";
import { project_member } from "@repo/types";
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

import { useKanbanShow } from "../../../context";
import { Card } from "./card";

interface IMemberProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Member = ({ open, onOpenChange }: IMemberProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_member");

  const lang = useLang();
  const t = lang.page.kanban;

  const { profile } = useUserAuth();

  const [search, setSearch] = useState("");

  const { state, loadings, general, callers } = useKanbanShow();

  const members = callers.member.onIndex()?.data || [];

  const filtered = useMemo(() => {
    if (!search) return members;

    return members.filter(
      (member) =>
        member.profile?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        member.profile?.anonymous_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [members, search]);

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
              <DrawerTitle>{t("drawer.member.title")}</DrawerTitle>
              <DrawerDescription>{t("drawer.member.description")}</DrawerDescription>
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
              placeholder={t("drawer.member.placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Permission permission={["store"]} feature="project_member">
              <Button size="sm" variant="secondary" onClick={() => state.member.form()}>
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
                  title: t("drawer.member.actions.title"),
                  items: [
                    {
                      icon: "Plus",
                      label: t("drawer.member.actions.new_member"),
                      onClick: () => state.member.form(),
                      isVisible: perm.store,
                    },
                    {
                      separator: true,
                    },
                    {
                      icon: "Trash",
                      label: t("drawer.member.actions.trash"),
                      onClick: () => general.handleState({ type: "member", modes: ["trash"] }),
                      isVisible: perm.trash,
                    },
                  ],
                },
              ]}
            />
          </div>
          <ScrollArea className="h-full overflow-y-auto px-4 text-sm">
            <div className="mb-20 flex h-full flex-col gap-2">
              {filtered.map((member, index) => (
                <Card
                  key={index}
                  card={member}
                  loading={!!loadings.member.index}
                  profile={profile}
                />
              ))}
              {filtered.length === 0 && (
                <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-2">
                  <PackageOpen size={48} />
                  <p className="text-muted-foreground text-md text-center font-semibold">
                    {t("drawer.member.no_results")}
                  </p>
                  <Permission permission={["store"]} feature="project_member">
                    <Button size="sm" variant="secondary" onClick={() => state.member.form()}>
                      <Plus />
                      {t("drawer.member.actions.new_member")}
                    </Button>
                  </Permission>
                </div>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <Permission permission={["trash"]} feature="project_member">
        <AppDialog
          title={
            <span className="text-md flex items-center font-bold">
              <Trash2 className="mr-2" />
              {t("drawer.member.trash")}
            </span>
          }
          open={general.isOpen("member", ["trash"])}
          className={"sm:max-w-[600px]"}
          onOpenChange={() => general.handleClose(["trash"])}
        >
          <ScrollArea
            className="bg-background w-full overflow-hidden rounded-lg border"
            style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
          >
            <Trash<project_member>
              items={callers.member.onTrash()?.data || []}
              loading={loadings.member.restore || loadings.member.trash}
              showKeys={["profile"]}
              format={{
                profile: (_, item) => item.profile?.user?.name,
              }}
              actions={[
                {
                  label: t("drawer.member.actions.restore"),
                  icon: <ClockArrowDown className="h-4 w-4" />,
                  onClick: callers.member.onRestore,
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
