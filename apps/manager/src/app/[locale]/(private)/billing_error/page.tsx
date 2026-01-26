"use client";

import React, { useCallback, useState } from "react";

import { Eraser, TicketX } from "lucide-react";

import { baseFilterParams } from "@repo/hooks";
import { useLang } from "@repo/language/hooks";
import { ListTemplate } from "@repo/templates";
import { billing_error } from "@repo/types";
import { Button } from "@repo/ui";

import { usePage, useReq, useTable } from "./hooks";
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

  const { index } = useReq({ state, handleState });
  const { isInitialState } = usePage({ baseFilters: baseFilterParams, index, handleState, state });

  //Translations
  const t = useLang();

  //Render
  return (
    <ListTemplate<billing_error>
      titlePage={
        <h1 className="mb-5 flex items-center gap-2 text-2xl font-bold max-sm:text-xl">
          <TicketX /> {t.page.billing_error("title")}
        </h1>
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
        events: {
          onFiltersChange: (newFilter) =>
            handleState({
              filters: {
                ...state.filters,
                ...newFilter,
                orderValue:
                  newFilter.orderValue === ""
                    ? "desc"
                    : (newFilter.orderValue ?? state.filters.orderValue),
              },
            }),
        },
      }}
    />
  );
}
