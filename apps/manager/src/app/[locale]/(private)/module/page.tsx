"use client";

import React, { useCallback, useState } from "react";

import { Eraser, Package, Plus } from "lucide-react";

import { baseFilterParams } from "@repo/hooks";
import { useLang } from "@repo/language/hooks";
import { module } from "@repo/types";
import { Button } from "@repo/ui";

import { ListTemplate } from "@/templates/list";

import { FormDialog } from "./form";
import { useActions, usePage, useReq, useTable } from "./hooks";
import { State } from "./types";

const defaultState: State = {
  mode: "new",
  filters: baseFilterParams,
};

export default function Page() {
  //States
  const [state, setState] = useState<State>(defaultState);

  //Handlers
  const handleState = useCallback((updates: Partial<State>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  //Hooks
  const { columns } = useTable();
  const { actions } = useActions({ handleState });

  const { index, store, update, companies } = useReq({ state, handleState });
  const { isInitialState } = usePage({ baseFilters: baseFilterParams, index, handleState, state });

  //Translations
  const t = useLang();

  //Render
  return (
    <>
      <ListTemplate<module>
        titlePage={
          <h1 className="mb-5 flex items-center gap-2 text-2xl font-bold max-sm:text-xl">
            <Package /> {t.page.modules("title")}
          </h1>
        }
        headerRight={
          <div className="flex items-center gap-2">
            <Button onClick={() => handleState({ open: true, mode: "new", item: undefined })}>
              <Plus />
              <span className="ml-2 hidden lg:inline-block">{t.page.modules("new")}</span>
            </Button>
          </div>
        }
        headerLeft={
          <Button
            variant="outline"
            className="text-xs text-gray-500 max-sm:hidden"
            onClick={() => handleState({ filters: baseFilterParams })}
            disabled={isInitialState}
          >
            <Eraser />
            <span className="ml-2 hidden lg:inline-block">{t.helper("reset_filters")}</span>
          </Button>
        }
        search={{
          value: state.filters.search || "",
          onValueChange: (searchValue) =>
            handleState({ filters: { ...state.filters, search: searchValue, page: 1 } }),
        }}
        table={{
          data: index.data?.data,
          filters: {
            page: state.filters.page || 1,
            pages: index.data?.pages || 1,
            limit: state.filters.limit || 10,
            count: index.data?.count || 0,
            orderKey: state.filters.orderKey || "",
            orderValue: (state.filters.orderValue as "asc" | "desc" | "") || "",
          },
          columns,
          loading: index.isLoading || index.isError,
          actions,
          handleEvent: (newFilter) => handleState({ filters: { ...state.filters, ...newFilter } }),
        }}
      />

      <FormDialog
        modalTitle={t.page.modules(`modal.${state.mode!}.title`)}
        modalDescription={t.page.modules(`modal.${state.mode!}.description`)}
        open={state.open && ["new", "edit"].includes(state.mode)}
        setOpen={() => handleState({ open: false, item: undefined })}
        values={state.item}
        companies={companies}
        loading={update.isPending || store.isPending}
        onSubmit={(data) => {
          if (state.item) {
            update.mutate(data);
          } else {
            store.mutate(data);
          }
        }}
      />
    </>
  );
}
