"use client";

import { useState } from "react";

import { kanban_template } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { useKanbanTemplate } from "@/api/callers/kanban_template";
import { BaseTemplate, defaultState } from "@/templates/list/base";
import { State } from "@/templates/list/base/types";

import { useActions, useTable } from "./hooks";

export default function Page() {
  const lang = useLang();
  const t = lang.page.kanban_template;

  const [state, setState] = useState<State<kanban_template>>(defaultState);

  const { store } = useKanbanTemplate({
    filters: state.filters,
    callbacks: {
      store: {
        onSuccess: () => {
          setState({ ...defaultState, open: false });
        },
      },
    },
  });

  return (
    <>
      <BaseTemplate<kanban_template>
        path="kanban_template"
        redirect="show"
        hookReq={useKanbanTemplate}
        useTable={useTable}
        useActions={useActions}
        state={state}
        setState={setState}
      />

      <AppDialog
        open={state.open && state.mode === "clone"}
        onOpenChange={() => setState({ ...defaultState, open: false })}
        title={t("modal.clone.title")}
        loading={store.isPending}
        description={t("modal.clone.description")}
        footer={
          <Button
            loading={store.isPending}
            onClick={() =>
              store.mutate({
                //@ts-ignore
                template_id: state.item?.id,
              })
            }
          >
            {lang.helper("clone")}
          </Button>
        }
      />
    </>
  );
}
