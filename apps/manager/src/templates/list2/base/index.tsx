"use client";

import { useCallback, useState } from "react";

import { ArchiveRestore, Eraser, History, Plus, Trash2 } from "lucide-react";

import {
  baseFilterParams,
  defaultPaginationParams,
  PaginationParams,
  paginationSchema,
  usePaginationParams,
} from "@repo/hooks";
import { useLang } from "@repo/language/hooks";
import { AppDialog, Button, Icon } from "@repo/ui";

import { ListTemplate } from "@/templates/list2";

import { FormDialog } from "./form";
import { usePage, useReq } from "./hooks";
import { ISingleTemplateProps, State } from "./types";

export const defaultState: State<any> = {
  mode: "destroy",
  loadingLines: [],
  filters: defaultPaginationParams,
  selected: [],
};

export function BaseTemplate<T extends { id: string; logs?: any[] }>({
  hookReq,
  useTable,
  path,
  useActions,
  useForm,
  redirect,
  showLogs = true,
  logs,
  customHeaderRight,
  headerRightLeft,
  headerRightRight,
  titlePage: titlePageComponent,
  rootClassName,
  hideCheckbox,
  isTrash,
  events,
  customFilters,
  trashUrl,
  state: extendedState,
  setState: setExtendedState,
}: Readonly<ISingleTemplateProps<T>>) {
  //States
  const [internalState, setInternalState] = useState<State<T>>(defaultState);

  const state = extendedState || internalState;
  const setState = setExtendedState || setInternalState;

  const { resetParams } = usePaginationParams(paginationSchema);

  //Handlers
  const handleState = useCallback((updates: Partial<State<T>>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const requests = useReq({ state, handleState, hookReq, isTrash, customFilters });

  const page = isTrash ? requests?.trash : requests?.index;

  const { actions } = useActions?.({ state, handleState, requests }) || { actions: [] };
  const { columns, disabledCheckbox } = useTable?.({ state, handleState, requests }) || {
    columns: [],
  };

  const { isBusy, isInitialState, push } = usePage({ index: page, handleState, state });

  //Translations
  const t = useLang();
  const pageT = t.page[path];

  const tableActions = showLogs
    ? [
        ...actions.slice(0, -1),
        {
          label: t.helper("logs"),
          icon: <History />,
          onClick: (item: T) => {
            handleState({ open: true, mode: "logs", item });
          },
          isVisible: () => showLogs,
        },
        ...actions.slice(-1),
      ]
    : actions;

  const vars = {
    total: state.selected.length,
    ...(state.item || {}),
  };

  const redirectWithBar = redirect?.startsWith("/");

  const titlePage =
    titlePageComponent !== undefined ? (
      titlePageComponent
    ) : (
      <h1 className="mb-5 flex items-center gap-2 text-center text-sm font-bold md:text-2xl">
        <Icon className="hidden h-5 w-5 md:block" />{" "}
        <span className="line-clamp-1 flex-1 truncate text-left">{pageT(`title`)}</span>
      </h1>
    );

  const headerRight =
    customHeaderRight !== undefined ? (
      customHeaderRight
    ) : (
      <div className="flex items-center gap-2">
        {headerRightLeft}

        {!isTrash && !hideCheckbox && (
          <Button
            onClick={() => handleState({ open: true, mode: "destroyMany" })}
            variant="destructive"
            disabled={!state.selected.length || isBusy}
            className="flex items-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="mr-2" />
            <span className="ml-2 hidden lg:inline-block">{t.helper("delete", vars)}</span>
            <span>({state.selected.length})</span>
          </Button>
        )}

        {isTrash && !hideCheckbox && (
          <Button
            onClick={() => handleState({ open: true, mode: "restoreMany" })}
            variant="secondary"
            disabled={!state.selected.length || isBusy}
            className="flex items-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArchiveRestore className="mr-2" />
            <span className="ml-2 hidden lg:inline-block">{t.helper("restore", vars)}</span>
            <span>({state.selected.length})</span>
          </Button>
        )}

        {(!!useForm || redirect) && (
          <Button
            onClick={() =>
              redirect
                ? redirectWithBar
                  ? push(redirect)
                  : push(`${path}/${redirect}`)
                : handleState({ open: true, mode: "new", item: undefined })
            }
            disabled={isBusy}
          >
            <Plus />
            <span className="ml-2 hidden lg:inline-block">{pageT(`new`)}</span>
          </Button>
        )}
        {headerRightRight}
      </div>
    );

  //Render
  return (
    <>
      <ListTemplate<T>
        rootClassName={rootClassName}
        titlePage={titlePage}
        headerRight={headerRight}
        headerLeft={
          <Button
            variant="outline"
            className="text-xs text-gray-500 max-sm:hidden"
            onClick={() => {
              resetParams();
              handleState({ filters: baseFilterParams });
            }}
            disabled={isInitialState}
          >
            <Eraser />
            <span className="ml-2 hidden lg:inline-block">{t.helper("reset_filters", vars)}</span>
          </Button>
        }
        search={{
          value: state.filters.search || "",
          onValueChange: (searchValue) =>
            handleState({ filters: { ...state.filters, search: searchValue, page: 1 } }),
        }}
        table={{
          data: page?.data?.data,
          filters: {
            page: state.filters.page || 1,
            pages: page?.data?.pages || 1,
            limit: state.filters.limit || 10,
            count: page?.data?.count || 0,
            orderKey: state.filters.orderKey || "",
            orderValue: (state.filters.orderValue as "asc" | "desc" | "") || "",
          },
          columns,
          loading: page?.isLoading || page?.isError,
          actions: tableActions,
          selected: !!requests?.many && !hideCheckbox ? state.selected : undefined,
          loadingLines: state.loadingLines,
          events: {
            onSelectionChange: !hideCheckbox ? (selected) => handleState({ selected }) : undefined,
            onFiltersChange: (newFilter) =>
              handleState({ filters: { ...state.filters, ...newFilter } as PaginationParams }),
            onRowDoubleClick: (item) => {
              redirect
                ? redirectWithBar
                  ? push(`${redirect}/${item.id}`)
                  : push(`${path}/${redirect}/${item.id}`)
                : handleState({ open: true, mode: "edit", item });
            },
            ...events,
          },
          disabledCheckbox,
        }}
      />

      {!!useForm && (
        <FormDialog
          modalTitle={pageT(`modal.${state.mode}.title`, vars)}
          modalDescription={pageT(`modal.${state.mode}.description`, vars)}
          open={state.open && ["new", "edit"].includes(state.mode)}
          setOpen={() => handleState({ open: false })}
          useForm={useForm}
          state={state}
          handleState={handleState}
          requests={requests}
          loading={requests?.update?.isPending || requests?.store?.isPending}
          onSubmit={(data) => {
            if (state.item) {
              requests?.update?.mutate(data);
              handleState({ loadingLines: [state.item.id] });
            } else {
              requests?.store?.mutate(data);
            }
          }}
        />
      )}

      {!isTrash && (
        <AppDialog
          open={state.open && ["destroy", "destroyMany"].includes(state.mode)}
          onOpenChange={() => handleState({ open: false, item: undefined })}
          title={pageT(
            state.selected?.length > 1 && state.mode === "destroyMany"
              ? `modal.destroyMany.title`
              : `modal.destroy.title`,
            vars
          )}
          description={pageT(
            state.selected?.length > 1 && state.mode === "destroyMany"
              ? `modal.destroyMany.description`
              : `modal.destroy.description`,
            vars
          )}
          footer={
            <Button
              variant="destructive"
              onClick={() => {
                if (state.mode === "destroy" && state.item) {
                  handleState({ loadingLines: [state.item.id], open: undefined });
                  requests?.destroy?.mutate({});
                } else if (state.mode === "destroyMany" && state.selected.length > 0) {
                  handleState({ loadingLines: state.selected, open: undefined });
                  requests?.many?.mutate({
                    ids: state.selected?.join(","),
                    body: {
                      deleted: true,
                      deletedAt: new Date(),
                    },
                  });
                }
              }}
            >
              {t.helper("delete", vars)}
            </Button>
          }
        />
      )}

      {isTrash && (
        <AppDialog
          open={state.open && ["restore", "restoreMany"].includes(state.mode)}
          onOpenChange={() => handleState({ open: false, item: undefined })}
          title={pageT(
            state.selected?.length > 1 && state.mode === "restoreMany"
              ? `modal.restoreMany.title`
              : `modal.restore.title`,
            vars
          )}
          description={pageT(
            state.selected?.length > 1 && state.mode === "restoreMany"
              ? `modal.restoreMany.description`
              : `modal.restore.description`,
            vars
          )}
          footer={
            <Button
              variant="default"
              onClick={() => {
                if (state.mode === "restore" && state.item) {
                  handleState({ loadingLines: [state.item.id], open: undefined });
                  requests?.restore?.mutate({});
                } else if (state.mode === "restoreMany" && state.selected.length > 0) {
                  handleState({ loadingLines: state.selected, open: undefined });
                  requests?.many?.mutate({
                    ids: state.selected?.join(","),
                    body: {
                      deleted: false,
                      deletedAt: null,
                    },
                  });
                }
              }}
            >
              {t.helper("restore", vars)}
            </Button>
          }
        />
      )}
    </>
  );
}
