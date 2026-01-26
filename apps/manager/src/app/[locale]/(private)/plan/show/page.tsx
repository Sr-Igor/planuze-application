"use client";

import { useParams } from "next/navigation";

import { useLang } from "@repo/language/hooks";
import { cn } from "@repo/ui";

import { useModal } from "@/hooks/modal";

import { PlanCancelDialog, PlanHeader, PlanTabs } from "./components";
import { PlanShowProvider } from "./context";
import { useAdminPlanShow, usePlanActions } from "./hooks";
import { FormData, Modules } from "./tabs";

export default function Page() {
  const t = useLang();

  const id = useParams().id as string;

  const { state, setState, show, handleTabChange } = useAdminPlanShow(id);
  const { handleCancel, handleCancelDialog } = usePlanActions();

  useModal(show);

  const tabs = [
    {
      title: t.page.plans("show.tabs.data"),
      value: "data" as const,
      children: <FormData />,
    },
    {
      title: t.page.plans("show.tabs.modules"),
      value: "modules" as const,
      children: <Modules />,
      disabled: !show.data?.id,
    },
  ];

  return (
    <PlanShowProvider data={show.data} state={state} handleState={setState}>
      <div className="flex w-full justify-center">
        <div
          className={cn("m-2 flex flex-col gap-4 p-2 sm:m-4 sm:p-4", "mx-auto w-full max-w-6xl")}
        >
          <PlanHeader
            id={id}
            isLoading={show.isLoading || (!show?.data?.id && state.loading) || show.isError}
            title={id ? t.page.plans("show.edit.title") : t.page.plans("show.new.title")}
            description={
              id ? t.page.plans("show.edit.description") : t.page.plans("show.new.description")
            }
          >
            <PlanTabs
              currentTab={state.tab}
              onTabChange={handleTabChange}
              isDirty={state.dirty || false}
              hasData={!!show.data}
              tabs={tabs}
            />
          </PlanHeader>

          <PlanCancelDialog
            open={state.cancel || false}
            onConfirm={() => handleCancel(setState, state.action)}
            onCancel={() => handleCancelDialog(setState)}
            title={t.page.plans("show.cancel.title")}
            description={t.page.plans("show.cancel.description")}
            confirmText={t.helper("confirm")}
          />
        </div>
      </div>
    </PlanShowProvider>
  );
}
