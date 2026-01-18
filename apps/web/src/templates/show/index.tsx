"use client";

import { useCallback, useEffect, useMemo } from "react";

import { useParams } from "next/navigation";

import { z } from "zod";

import { useLang } from "@repo/language/hooks";

import { useAccess } from "@/hooks/access";
import { useSearchParams } from "@/hooks/search-params";
import { cn } from "@repo/ui-new";

import { Cancel, Header, Tabs } from "./components";
import { Delete } from "./components/delete";
import { ShowProvider } from "./context";
import { useActions, useInternalShow } from "./hooks";
import { IShowTemplateProps } from "./types";

export const ShowTemplate = <T extends { id: string }>({
  useTabs,
  path,
  id,
  hookReq,
  defaultTab,
  baseUrl,
  pageKey = "show",
  rootClassName,
  undeletableProps,
  customHeader,
  hideTabs,
  hideQueryParams,
  data,
}: IShowTemplateProps<T>) => {
  id = id || (useParams().id as string);

  const t = useLang();
  const pageT = t.page[path];
  const pgKey = pageKey ? `${pageKey}.` : "";

  const { permissions, profile, userView, companyView, access } = useAccess();
  const perm = permissions();

  // Schema para tab do show
  const tabSchema = useMemo(
    () =>
      z.object({
        [`tab-${path}`]: z.string().default(defaultTab),
      }),
    [path, defaultTab]
  );

  const { params: tabParams, setParams } = useSearchParams({
    schema: tabSchema,
    replace: true,
    scroll: false,
  });

  // Tab inicial baseado nos parâmetros da URL
  const initialTab = tabParams[`tab-${path}`] || defaultTab;

  const { state, setState, show, handleTabChange, destroy } = useInternalShow({
    hookReq,
    id,
    defaultTab: initialTab,
    baseUrl,
    setParams: hideQueryParams ? undefined : setParams,
    path,
    data,
  });

  const { handleDelete, handleCancel, handleCancelDialog, handleDeleteDialog } = useActions();

  const tabs = useTabs({ data: show?.data, getPermissions: permissions });

  const undeletable = useMemo(() => {
    return undeletableProps?.(show?.data, profile, pageT);
  }, [show?.data, profile, pageT, undeletableProps]);

  const translateProps = show?.data || { name: "" };

  const headerProps = useMemo(
    () => ({
      id,
      isLoading: !!show?.isLoading || (!show?.data?.id && state.loading) || !!show?.isError,
      onDelete: () => handleDelete(setState),
      isDeleting: !!destroy?.isPending,
      title: id
        ? pageT(`${pgKey}edit.title`, translateProps)
        : pageT(`${pgKey}new.title`, translateProps),
      description: id
        ? pageT(`${pgKey}edit.description`, translateProps)
        : pageT(`${pgKey}new.description`, translateProps),
      undeletable,
      customHeader: customHeader?.(show?.data, permissions),
    }),
    [
      id,
      show?.isLoading,
      show?.data?.id,
      state.loading,
      show?.isError,
      handleDelete,
      setState,
      destroy?.isPending,
      pageT,
      pgKey,
      undeletable,
    ]
  );

  const tabsProps = useMemo(
    () => ({
      currentTab: state.tab,
      onTabChange: handleTabChange,
      loading: state.disabled || false,
      isDirty: state.dirty || false,
      hasData: !!show?.data,
      hideTabs,
      tabs,
    }),
    [
      state.tab,
      handleTabChange,
      state.dirty,
      show?.data,
      tabs,
      state.disabled,
      show?.data,
      hideTabs,
    ]
  );

  useEffect(() => {
    const tab = tabParams[`tab-${path}`];

    const foundTab = tabs.find((t) => t.value === tab);
    const isValid = !!foundTab && !foundTab?.invisible;

    if (!isValid && !hideQueryParams) {
      setParams({ [`tab-${path}`]: defaultTab });
    } else if (tab && tab !== state.tab) setState({ tab });
  }, [tabParams]);

  const handleCancelConfirm = useCallback(() => {
    handleCancel(setState, state.action, setParams, path);
  }, [handleCancel, setState, state.action, setParams, path]);

  return (
    <ShowProvider
      data={show?.data}
      state={state}
      handleState={setState}
      permissions={perm}
      getPermissions={permissions}
      profile={profile}
      userView={userView}
      companyView={companyView}
      access={access}
    >
      <div className="flex w-full justify-center">
        <div
          className={
            rootClassName || cn("flex flex-col gap-4 p-2 sm:m-4 sm:p-4", "mx-auto w-full max-w-6xl")
          }
        >
          <Header<T> {...headerProps}>
            <Tabs {...tabsProps} />
          </Header>

          <Cancel
            open={state.cancel || false}
            onConfirm={handleCancelConfirm}
            onCancel={() => handleCancelDialog(setState)}
            title={t.helper("cancel_title")}
            description={t.helper("cancel_description")}
            confirmText={t.helper("confirm")}
          />

          {!!destroy && (
            <Delete
              open={state.delete || false}
              onConfirm={() => {
                destroy?.mutate({});
                handleDeleteDialog(setState);
              }}
              onCancel={() => handleDeleteDialog(setState)}
              isPending={!!destroy?.isPending}
              title={pageT(`${pgKey}exclude.title`)}
              description={pageT(`${pgKey}exclude.description`)}
              confirmText={t.helper("delete")}
            />
          )}
        </div>
      </div>
    </ShowProvider>
  );
};
