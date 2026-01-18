"use client";

import { useEffect, useState } from "react";

import { project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { Dialog, DialogContent, Tabs, TabsContent } from "@repo/ui";

import { ISelected } from "@repo/form";
import { Permission } from "@/components/ui/permission";
import { useAccess } from "@/hooks/access";

import { useKanbanShow } from "../../context";
import { Actions } from "./components/actions";
import { CardTypeTitle } from "./components/card-type-title";
import {
  DependenciesAndObjectives,
  Description,
  Logs,
  Movements,
  PlanningAndEffort,
  Upload,
} from "./components/columns";
import { Views } from "./components/columns/views";
import {
  CardTags,
  Column,
  Cycle,
  Parent,
  Responsible,
  Title,
  WorkType,
} from "./components/form/fields";
import { Header } from "./components/header";
import { Infos, Line } from "./components/infos";
import { LifeTime } from "./components/life-time";
import { Loader } from "./components/loader";
import { MobileDetailsTab } from "./components/mobile-details-tab";
import { MobileHistoryTab } from "./components/mobile-history-tab";
import { ReadButton } from "./components/read-button";
import { SaveButton } from "./components/save-button";
import { TabButtons } from "./components/tab-buttons";
import { useCardForm } from "./use-form";

interface CardEditFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
  onSubmit: (
    data: Partial<
      Omit<project_kanban_cycle_card, "project_kanban_cycle_card_tags"> & {
        project_kanban_cycle_card_tags?: ISelected[];
      }
    >,
    close?: boolean
  ) => void;
}

export const CardEditForm = ({ open, onOpenChange, onSubmit, loading }: CardEditFormProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle_card");

  const lang = useLang();
  const t = lang.page.kanban;

  const [tab, setTab] = useState("details");
  const { page, data, callers, loadings, unload, setParams, general } = useKanbanShow();

  const isCharging = loadings.card.show;

  const item = callers.card.onShow();

  const cardType = item?.project_kanban_cycle_card_type;

  const { hook, handleSubmit, isDisabled, cycleId, objectiveId, isDirty } = useCardForm({
    item,
    onSubmit,
  });

  useEffect(() => {
    if (!open) {
      setParams({ card_id: undefined });
      setTimeout(() => {
        hook.reset();
        setTab("details");
      }, 100);
    } else {
      setParams({ card_id: general.state.card?.id });
    }
  }, [open]);

  useEffect(() => {
    unload.handleState({
      feature: "card",
      dirty: isDirty,
      modes: ["update"],
    });
  }, [isDirty]);

  return (
    <Dialog open={open} onOpenChange={(open) => !loading && onOpenChange?.(open)}>
      <Tabs value={tab} onValueChange={setTab}>
        <DialogContent
          className="flex h-[90vh]! max-h-[90vh]! w-[90vw]! max-w-[90vw]! flex-1 flex-col gap-0 overflow-hidden p-0"
          closeButton={!loading}
        >
          <Loader loading={loading} isCharging={isCharging} />

          <Header cardType={cardType}>
            <div className="flex w-full items-center justify-between gap-2">
              <CardTypeTitle cardType={cardType} item={item} />
            </div>
            <Title
              hook={hook}
              placeholder={t("card-form-edit.placeholder.title")}
              disabled={!perm.update}
            />
            <div className="flex h-full w-full items-end justify-end px-2 py-4 md:justify-between">
              <div className="mb-2 hidden flex-1 items-center gap-4 md:flex">
                <Responsible
                  hook={hook}
                  placeholder={t("card-form-edit.placeholder.responsible")}
                  disabled={!perm.update}
                />
                <CardTags hook={hook} disabled={!perm.update} />
              </div>
              <div className="flex items-center gap-2">
                <Permission permission={["update"]} feature="project_kanban_cycle_card">
                  <SaveButton
                    isDisabled={isDisabled}
                    loading={loading}
                    handleSubmit={handleSubmit}
                  />
                </Permission>
                <Permission permission={["store"]} feature="project_kanban_cycle_card">
                  <ReadButton item={item} />
                </Permission>
                <Actions item={item} />
              </div>
            </div>
          </Header>

          <TabButtons item={item} />
          <Infos>
            <div className="flex flex-shrink-0 items-center gap-10 px-4 py-2">
              <Line>
                <Cycle
                  hook={hook}
                  cycles={data.cycles}
                  label={`${t("card-form-edit.label.cycle")}:`}
                  disabled={!perm.update}
                />
                <Column
                  hook={hook}
                  cycleId={cycleId}
                  cycles={data.cycles}
                  item={item}
                  label={`${t("card-form-edit.label.column")}:`}
                  disabled={!perm.update}
                />
              </Line>

              <Line>
                <WorkType
                  hook={hook}
                  item={item}
                  label={`${t("card-form-edit.label.work_type")}:`}
                  disabled={!perm.update}
                />
                {!cardType?.principal && (
                  <Parent
                    hook={hook}
                    item={item}
                    cycleId={cycleId}
                    label={`${t("card-form-edit.label.parent")}:`}
                    placeholder={t("card-form-edit.placeholder.parent")}
                    disabled={!perm.update}
                  />
                )}
              </Line>
            </div>
            <div className="flex flex-shrink-0 flex-col items-end justify-center gap-2">
              <LifeTime item={item} name={page?.kanban?.project?.name} />
            </div>
          </Infos>
          <div className="h-[calc(100vh-380px)] overflow-hidden">
            <TabsContent value="details">
              <MobileDetailsTab hook={hook} item={item} objectiveId={objectiveId} />
              <div className="hidden grid-cols-6 gap-4 px-2 xl:grid">
                <div className="col-span-3 h-full">
                  <Description hook={hook} item={item} />
                </div>
                <div className="col-span-1 h-full">
                  <PlanningAndEffort hook={hook} />
                </div>
                <div className="col-span-2 h-full">
                  <DependenciesAndObjectives hook={hook} item={item} objectiveId={objectiveId} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="logs">
              <MobileHistoryTab item={item} />
              <div className="hidden grid-cols-6 gap-4 px-2 xl:grid">
                <div className="col-span-3 h-full">
                  <Logs item={item} />
                </div>
                <div className="col-span-3 h-full">
                  <Movements item={item} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="views">
              <Views item={item} />
            </TabsContent>
            <TabsContent value="files">
              <Upload item={item} />
            </TabsContent>
          </div>
        </DialogContent>
      </Tabs>
    </Dialog>
  );
};
