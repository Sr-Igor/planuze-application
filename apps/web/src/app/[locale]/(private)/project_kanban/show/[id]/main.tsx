"use client";

import { useState } from "react";

import { Columns, Kanban } from "lucide-react";

import { project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { Permission } from "@/components/ui/permission";
import { cn } from "@repo/ui";
import { Cancel } from "@/templates/show/components";

import { Empty } from "./components/empty";
import { Header } from "./components/header";
import { Line } from "./components/line";
import { Loader } from "./components/loader";
import { Locked } from "./components/locked";
import { useKanbanShow } from "./context";
import { CardFormChange } from "./modules/card-form-change";
import { CardEditForm } from "./modules/card-form-edit";
import { CardFormMove } from "./modules/card-form-move";
import { CardFormStore } from "./modules/card-form-store";
import { CardTypeModalForm } from "./modules/card-type-modal-form";
import { DestroyAllocation } from "./modules/delete/allocation";
import { DestroyCard } from "./modules/delete/card";
import { DestroyCardType } from "./modules/delete/card-type";
import { DestroyColumn } from "./modules/delete/column";
import { DestroyConfig } from "./modules/delete/config";
import { DestroyCycle } from "./modules/delete/cycle";
import { DestroyGlobalAllocation } from "./modules/delete/global_allocation";
import { DestroyMember } from "./modules/delete/member";
import { DestroyTool } from "./modules/delete/tool";
import { KanbanBoard } from "./modules/dnd/principal";
import { TasksBoard } from "./modules/dnd/tasks";
import { Allocation } from "./modules/drawers/allocation";
import { useForm as useAllocationForm } from "./modules/drawers/allocation/use-form";
import { CardTrash } from "./modules/drawers/card-trash";
import { CardType } from "./modules/drawers/card-type";
import { useForm as useCardTypeForm } from "./modules/drawers/card-type/use-form";
import { Column } from "./modules/drawers/column";
import { useForm as useColumnForm } from "./modules/drawers/column/use-form";
import { Config } from "./modules/drawers/config";
import { useForm as useConfigForm } from "./modules/drawers/config/use-form";
import { Cycle } from "./modules/drawers/cycle";
import { useForm as useCycleForm } from "./modules/drawers/cycle/use-form";
import { GlobalAllocation } from "./modules/drawers/global_allocation";
import { useForm as useGlobalAllocationForm } from "./modules/drawers/global_allocation/use-form";
import { Member } from "./modules/drawers/member";
import { useForm as useMemberForm } from "./modules/drawers/member/use-form";
import { Tool } from "./modules/drawers/tool";
import { useForm as useToolForm } from "./modules/drawers/tool/use-form";
import { List } from "./modules/list";
import { ModalLogs } from "./modules/logs";
import { ModalForm } from "./modules/modal-form";
import { Report } from "./modules/report";
import { Feature, Mode } from "./types";

export const KanbanContainer = () => {
  const lang = useLang();
  const t = lang.page.kanban;

  const [lineOpen, setLineOpen] = useState(false);

  const className = lineOpen ? "h-[calc(100vh-315px)]" : "h-[calc(100vh-180px)]";

  const { page, state, loadings, params, general, callers, unload } = useKanbanShow();

  const isLoading =
    loadings.kanban.show || (loadings.cycle.show && page.kanban?.project_kanban_cycles?.length);
  const emptyState = !!page.kanban?.id && !page.kanban?.project_kanban_cycles?.length;
  const emptyColumns = !!page.kanban?.id && !page.cycle?.project_kanban_cycle_columns?.length;

  const isStore = general.state.modes?.includes("store");
  const isStoreColumn = !general.state.column?.id;
  const isStoreCycle = !general.state.cycle?.id;
  const isStoreMember = !general.state.member?.id;
  const isStoreAllocation = !general.state.allocation?.id;
  const isStoreConfig = !general.state.config?.id;
  const isStoreGlobalAllocation = !general.state.globalAllocation?.id;
  const isStoreTool = !general.state.tool?.id;

  const onOpenChange = (feature: Feature, mode?: Mode[], customConfirm?: () => void) => {
    const modes: Mode[] = mode ? mode : ["store", "update"];
    const onConfirm = () => {
      unload.handleState({
        feature,
        dirty: false,
        modes,
      });
      customConfirm ? customConfirm() : general.handleClose(modes);
    };
    const isInDirty = unload.isInDirty(feature, modes);

    if (isInDirty) {
      unload.setCancel({
        modes: mode || [isStore ? "store" : "update"],
        feature,
        onConfirm,
      });
    } else {
      onConfirm();
    }
  };

  return (
    <div className="overflow-hidden">
      <Header />
      <Permission
        permission={["index", "show"]}
        method="all"
        feature="project_kanban_cycle"
        fallback={<Locked />}
      >
        <Line open={lineOpen} setOpen={setLineOpen} />

        {/* ------------------------------------------ Board ------------------------------------------ */}

        <div className={cn("relative flex flex-col overflow-hidden", className)}>
          <Loader loading={!!isLoading} />

          <Empty
            visible={
              (emptyState || emptyColumns) &&
              params.view !== "list" &&
              params.view !== "reports" &&
              !isLoading
            }
            icon={emptyState ? <Kanban size={60} /> : <Columns size={60} />}
            title={emptyState ? t("empty.no_cycles_found") : t("empty.no_columns_found")}
            description={emptyState ? t("empty.cycle") : t("empty.column")}
            button={{
              label: emptyState ? t("button.new_cycle") : t("button.new_column"),
              onClick: () => (emptyState ? state.cycle.form() : state.column.form()),
            }}
          />

          {!isLoading && (
            <>
              {(params.view === "principal" || !params.view) && <KanbanBoard />}
              {params.view === "tasks" && <TasksBoard />}
              {params.view === "list" && <List open={lineOpen} />}
              {params.view === "reports" && <Report />}
            </>
          )}
        </div>
      </Permission>

      {/* ------------------------------------------ Management ------------------------------------------ */}

      <Permission permission={["index"]} feature="project_kanban_cycle">
        <Cycle
          open={general.isOpen("cycle", ["show"])}
          onOpenChange={() => general.handleClose(["show"])}
        />
      </Permission>

      <Permission permission={["index"]} feature="project_config">
        <Config
          open={general.isOpen("config", ["show"])}
          onOpenChange={() => general.handleClose(["show"])}
        />
      </Permission>

      <Permission permission={["index"]} feature="project_tool">
        <Tool
          open={general.isOpen("tool", ["show"])}
          onOpenChange={() => general.handleClose(["show"])}
        />
      </Permission>

      <Permission permission={["index"]} feature="project_allocation">
        <GlobalAllocation
          open={general.isOpen("globalAllocation", ["show"])}
          onOpenChange={() => general.handleClose(["show"])}
        />
      </Permission>

      <Permission permission={["index"]} feature="project_kanban_cycle">
        <CardType
          open={general.isOpen("cardType", ["show"])}
          onOpenChange={() => general.handleClose(["show"])}
        />
      </Permission>

      <Permission permission={["index"]} feature="project_kanban_cycle">
        <Column
          open={general.isOpen("column", ["show"])}
          onOpenChange={() => general.handleClose(["show"])}
        />
      </Permission>

      <Permission permission={["index"]} feature="project_member">
        <Member
          open={general.isOpen("member", ["show"])}
          onOpenChange={() => general.handleClose(["show"])}
        />
      </Permission>

      <Permission permission={["index"]} feature="project_kanban_cycle">
        <Allocation
          open={general.isOpen("allocation", ["show"])}
          onOpenChange={() => general.handleClose(["show"])}
        />
      </Permission>

      {/* ------------------------------------------ Card Trash ------------------------------------------ */}
      <Permission permission={["trash"]} feature="project_kanban_cycle_card">
        <CardTrash
          open={general.isOpen("card", ["trash"])}
          onOpenChange={() => general.handleClose(["trash"])}
        />
      </Permission>

      {/* ------------------------------------------ Logs ------------------------------------------ */}
      <ModalLogs
        open={!!general.state.modes?.includes("logs")}
        onOpenChange={() => general.handleClose(["logs"])}
        state={general.state}
      />

      {/* ------------------------------------------ Destroys ------------------------------------------ */}
      <Permission permission={["destroy"]} feature="project_kanban_cycle">
        <DestroyColumn
          open={general.isOpen("column", ["destroy"])}
          onOpenChange={() => general.handleClose(["destroy"])}
          onDestroy={callers.onDestroy}
          loading={loadings.destroy}
          item={general.state.column}
        />
      </Permission>

      <Permission permission={["destroy"]} feature="project_config">
        <DestroyConfig
          open={general.isOpen("config", ["destroy"])}
          onOpenChange={() => general.handleClose(["destroy"])}
          onDestroy={callers.onDestroy}
          loading={loadings.destroy}
        />
      </Permission>

      <Permission permission={["destroy"]} feature="project_tool">
        <DestroyTool
          open={general.isOpen("tool", ["destroy"])}
          onOpenChange={() => general.handleClose(["destroy"])}
          onDestroy={callers.onDestroy}
          loading={loadings.destroy}
        />
      </Permission>

      <Permission permission={["destroy"]} feature="project_allocation">
        <DestroyGlobalAllocation
          open={general.isOpen("globalAllocation", ["destroy"])}
          onOpenChange={() => general.handleClose(["destroy"])}
          onDestroy={callers.onDestroy}
          loading={loadings.destroy}
        />
      </Permission>

      <Permission permission={["destroy"]} feature="project_kanban_cycle_card">
        <DestroyCard
          open={general.isOpen("card", ["destroy"])}
          onOpenChange={() => general.handleClose(["destroy"])}
          onDestroy={callers.onDestroy}
          loading={loadings.destroy}
          item={general.state.card}
        />
      </Permission>

      <Permission permission={["destroy"]} feature="project_kanban_cycle">
        <DestroyCycle
          open={general.isOpen("cycle", ["destroy"])}
          onOpenChange={() => general.handleClose(["destroy"])}
          onDestroy={callers.onDestroy}
          loading={loadings.destroy}
          item={general.state.cycle}
        />
      </Permission>

      <Permission permission={["destroy"]} feature="project_kanban_cycle">
        <DestroyCardType
          open={general.isOpen("cardType", ["destroy"])}
          onOpenChange={() => general.handleClose(["destroy"])}
          onDestroy={callers.onDestroy}
          loading={loadings.destroy}
          item={general.state.cardType}
        />
      </Permission>

      <Permission permission={["destroy"]} feature="project_member">
        <DestroyMember
          open={general.isOpen("member", ["destroy"])}
          onOpenChange={() => general.handleClose(["destroy"])}
          onDestroy={() => callers.onDestroy({})}
          loading={loadings.destroy}
        />
      </Permission>

      <Permission permission={["destroy"]} feature="project_kanban_cycle">
        <DestroyAllocation
          open={general.isOpen("allocation", ["destroy"])}
          onOpenChange={() => general.handleClose(["destroy"])}
          onDestroy={() => callers.onDestroy({})}
          loading={loadings.destroy}
        />
      </Permission>

      {/* ------------------------------------------ STORE and UPDATE ------------------------------------------ */}
      <Permission permission={["store", "update"]} method="any" feature="project_kanban_cycle">
        <ModalForm
          feature="column"
          open={general.isOpen("column", ["store", "update"])}
          title={
            isStoreColumn ? t("modal-form.column.store.title") : t("modal-form.column.update.title")
          }
          description={
            isStoreColumn
              ? t("modal-form.column.store.description")
              : t("modal-form.column.update.description")
          }
          onOpenChange={() => onOpenChange("column")}
          item={general.state.column}
          loading={loadings.column.action}
          onSubmit={callers.column.onSubmit}
          useForm={useColumnForm}
        />
      </Permission>

      <Permission permission={["store", "update"]} method="any" feature="project_config">
        <ModalForm
          feature="config"
          open={general.isOpen("config", ["store", "update"])}
          title={
            isStoreConfig ? t("modal-form.config.store.title") : t("modal-form.config.update.title")
          }
          description={
            isStoreConfig
              ? t("modal-form.column.store.description")
              : t("modal-form.config.update.description")
          }
          onOpenChange={() => onOpenChange("config")}
          item={general.state.config}
          loading={loadings.config.action}
          onSubmit={callers.config.onSubmit}
          useForm={useConfigForm}
        />
      </Permission>

      <Permission permission={["store", "update"]} method="any" feature="project_tool">
        <ModalForm
          feature="tool"
          open={general.isOpen("tool", ["store", "update"])}
          title={isStoreTool ? t("modal-form.tool.store.title") : t("modal-form.tool.update.title")}
          description={
            isStoreTool
              ? t("modal-form.tool.store.description")
              : t("modal-form.tool.update.description")
          }
          onOpenChange={() => onOpenChange("tool")}
          item={general.state.tool}
          loading={loadings.tool.action}
          onSubmit={callers.tool.onSubmit}
          useForm={useToolForm}
        />
      </Permission>

      <Permission permission={["store", "update"]} method="any" feature="project_allocation">
        <ModalForm
          feature="globalAllocation"
          open={general.isOpen("globalAllocation", ["store", "update"])}
          title={
            isStoreGlobalAllocation
              ? t("modal-form.globalAllocation.store.title")
              : t("modal-form.globalAllocation.update.title")
          }
          description={
            isStoreGlobalAllocation
              ? t("modal-form.globalAllocation.store.description")
              : t("modal-form.globalAllocation.update.description")
          }
          onOpenChange={() => onOpenChange("globalAllocation")}
          item={general.state.globalAllocation}
          loading={loadings.globalAllocation.action}
          onSubmit={callers.globalAllocation.onSubmit}
          useForm={useGlobalAllocationForm}
        />
      </Permission>

      <Permission permission={["store", "update"]} method="any" feature="project_kanban_cycle">
        <ModalForm
          feature="cycle"
          open={general.isOpen("cycle", ["store", "update"])}
          title={
            isStoreCycle ? t("modal-form.cycle.store.title") : t("modal-form.cycle.update.title")
          }
          description={
            isStoreCycle
              ? t("modal-form.cycle.store.description")
              : t("modal-form.cycle.update.description")
          }
          onOpenChange={() => onOpenChange("cycle")}
          item={general.state.cycle}
          loading={loadings.cycle.action}
          onSubmit={callers.cycle.onSubmit}
          useForm={useCycleForm}
        />
      </Permission>

      <Permission permission={["update"]} feature="project_kanban_cycle">
        <ModalForm
          feature="cardType"
          open={general.isOpen("cardType", ["update"])}
          title={t("modal-form.cardType.update.title")}
          description={t("modal-form.cardType.update.description")}
          onOpenChange={() => onOpenChange("cardType")}
          item={general.state.cardType}
          loading={loadings.cardType.action}
          onSubmit={callers.cardType.onSubmit}
          useForm={useCardTypeForm}
          alert={
            general.state.cardType
              ? {
                  variant: "default",
                  title: t("modal-form.cardType.update.alert.title"),
                  description: t("modal-form.cardType.update.alert.description"),
                }
              : undefined
          }
        />
      </Permission>

      <Permission permission={["store"]} feature="project_kanban_cycle">
        <CardTypeModalForm
          open={general.isOpen("cardType", ["store"])}
          onOpenChange={() => {
            onOpenChange("cardType", ["store"], () => general.handleClose(["store"]));
          }}
          item={general.state.cardType}
          loading={loadings.cardType.action}
          onSubmit={callers.cardType.onSubmit}
        />
      </Permission>

      <Permission permission={["store", "update"]} method="any" feature="project_member">
        <ModalForm
          feature="member"
          open={general.isOpen("member", ["store", "update"])}
          title={
            isStoreMember ? t("modal-form.member.store.title") : t("modal-form.member.update.title")
          }
          description={
            isStoreMember
              ? t("modal-form.member.store.description")
              : t("modal-form.member.update.description")
          }
          onOpenChange={() => onOpenChange("member")}
          item={general.state.member}
          loading={loadings.member.action}
          onSubmit={callers.member.onSubmit}
          useForm={useMemberForm}
        />
      </Permission>

      <Permission permission={["store", "update"]} method="any" feature="project_kanban_cycle">
        <ModalForm
          feature="allocation"
          open={general.isOpen("allocation", ["store", "update"])}
          onOpenChange={() => onOpenChange("allocation")}
          title={
            isStoreAllocation
              ? t("modal-form.allocation.store.title")
              : t("modal-form.allocation.update.title")
          }
          description={
            isStoreAllocation
              ? t("modal-form.allocation.store.description")
              : t("modal-form.allocation.update.description")
          }
          item={general.state.allocation}
          loading={loadings.allocation.action}
          onSubmit={callers.allocation.onSubmit}
          useForm={useAllocationForm}
        />
      </Permission>

      <Permission permission={["store"]} feature="project_kanban_cycle_card">
        <CardFormStore
          open={general.isOpen("card", ["store"])}
          onOpenChange={() => {
            onOpenChange("card", ["store"], () =>
              general.handleClose(["store"], { ...general.state, forcedMode: undefined })
            );
          }}
          item={general.state.card}
          anchor={general.state.anchor}
          loading={loadings.card.action}
          kanban={page.kanban}
          onSubmit={callers.card.onSubmit}
        />
      </Permission>

      <Permission permission={["update", "show"]} method="any" feature="project_kanban_cycle_card">
        <CardEditForm
          open={general.isOpen("card", ["update"])}
          onOpenChange={() => {
            onOpenChange("card", ["update", "new_comment", "update_comment", "upload"], () => {
              general.handleClose(["update"]);
            });
          }}
          loading={loadings.card.action}
          onSubmit={(form, close) =>
            callers.card.onSubmit(form as Partial<project_kanban_cycle_card>, close)
          }
        />
      </Permission>

      <Permission permission={["update"]} feature="project_kanban_cycle_card">
        <CardFormMove
          open={general.isOpen("card", ["move"])}
          onOpenChange={() => {
            onOpenChange("card", ["move"], () => general.handleClose(["move"]));
          }}
          item={general.state.card}
          loading={loadings.card.action}
          onSubmit={callers.card.onSubmit}
        />
      </Permission>

      <Permission permission={["update"]} feature="project_kanban_cycle_card">
        <CardFormChange
          open={general.isOpen("card", ["change"])}
          onOpenChange={() => {
            onOpenChange("card", ["change"], () => general.handleClose(["change"]));
          }}
          item={general.state.card}
          loading={loadings.card.action}
          onSubmit={callers.card.onSubmit}
        />
      </Permission>

      {/* ------------------------------------------ Cancel ------------------------------------------ */}
      <Cancel
        open={!!unload.cancel}
        title={t("cancel.title")}
        description={t("cancel.description")}
        confirmText={t("cancel.confirm")}
        onConfirm={() => {
          unload.cancel?.onConfirm();
          unload.setCancel(null);
        }}
        onCancel={() => unload.setCancel(null)}
      />
    </div>
  );
};
