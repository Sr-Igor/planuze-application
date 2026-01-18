import { useEffect } from "react";

import { PackageOpen } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { ScrollArea } from "@repo/ui-new";

import { Permission } from "@/components/permission";
import { useShow } from "@/templates/show/context";

import { Card } from "./components/card";
import { FormDialog } from "./components/form";
import { Header } from "./components/header";
import { Logs } from "./components/logs";
import { Trash } from "./components/trash";
import { usePage, useReq } from "./hooks";
import { GenericItem, ICardCrudProps } from "./type";

export const CardCrud = <T,>({
  hookReq,
  getFilters,
  pathKey,
  page,
  translate,
  card,
  useForm,
  logs,
  trash,
  getBodyKeys,
  hideActions,
  externalData,
}: ICardCrudProps<GenericItem<T>>) => {
  const t = useLang();

  const { data, handleState: handleShowState } = useShow<GenericItem<T>>();

  const { state, handleState, data: showData, getPermissions } = usePage<T>();

  const filters = getFilters?.(showData) || {};

  const requests = useReq<T>({
    data,
    state,
    handleState,
    getPermissions,
    hookReq,
    pathKey,
    filters,
    externalData,
  });

  const disabled =
    !!requests?.destroy?.isPending ||
    !!requests?.update?.isPending ||
    !!requests?.store?.isPending ||
    !!requests?.restore?.isPending;

  useEffect(() => {
    handleShowState({ disabled });
  }, [disabled]);

  const items = requests?.index?.data?.data || [];

  return (
    <div className="flex h-full flex-col gap-4">
      <Header
        state={state}
        handleState={handleState}
        page={page}
        translate={translate}
        pathKey={pathKey}
      />
      <ScrollArea
        className="flex h-full flex-1 flex-col gap-4 px-5"
        style={{ maxHeight: "calc(100vh - 410px)" }}
      >
        <span className="flex flex-col gap-4">
          {items.map((item: GenericItem<T>) => {
            return (
              <Card
                key={item.id}
                loading={!!requests?.index?.isPending || !!requests?.index?.isPlaceholderData}
                onShow={async () => {
                  if (requests.showMutation) {
                    handleState({ item, mode: "update" });
                    //@ts-ignore
                    const res = await requests.showMutation?.mutateAsync(item.id);
                    handleState({ open: true, item: res, mode: "update" });
                  } else {
                    handleState({ open: true, item, mode: "update" });
                  }
                }}
                onLogs={async () => {
                  if (requests.showMutation) {
                    handleState({ item, mode: "logs" });
                    //@ts-ignore
                    const res = await requests.showMutation?.mutateAsync(item.id);
                    handleState({ open: true, item: res, mode: "logs" });
                  } else {
                    handleState({ open: true, item, mode: "logs" });
                  }
                }}
                onDestroy={() => {
                  requests?.destroy?.mutate({});
                }}
                item={item}
                page={page}
                translate={translate}
                handleState={handleState}
                pathKey={pathKey}
                disabled={!!requests?.showMutation?.isPending || !!requests?.destroy?.isPending}
                showLoading={
                  !!requests?.showMutation?.isPending &&
                  state?.item?.id === item.id &&
                  state?.mode === "update"
                }
                logsLoading={
                  !!requests?.showMutation?.isPending &&
                  state?.item?.id === item.id &&
                  state?.mode === "logs"
                }
                destroyLoading={!!requests?.destroy?.isPending && state?.item?.id === item.id}
                hasShow={!!requests?.showMutation}
                hideActions={hideActions}
                {...card}
              />
            );
          })}
        </span>
      </ScrollArea>
      {!items.length && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5">
          <PackageOpen size={60} className="text-muted-foreground" />
          <p className="text-muted-foreground text-md text-center font-semibold">
            {t.page[page](`${translate}.empty`)}
          </p>
        </div>
      )}

      <Permission permission={["store", "update"]} method="any">
        <FormDialog<GenericItem<T>>
          open={state?.open && (state?.mode === "store" || state?.mode === "update")}
          setOpen={handleState}
          onSubmit={(data) => {
            const payload = {
              ...data,
              ...(getBodyKeys?.(showData) || {}),
            };

            state?.item ? requests?.update?.mutate(data) : requests?.store?.mutate(payload);
          }}
          data={data}
          loading={!!requests?.store?.isPending || !!requests?.update?.isPending}
          state={state}
          page={page}
          translate={translate}
          useForm={useForm}
          indexData={requests?.index?.data?.data}
        />
      </Permission>

      <Logs state={state} handleState={handleState} logs={logs} />

      <Permission permission={["trash"]}>
        <Trash
          state={state}
          handleState={handleState}
          data={requests?.trash?.data?.data || []}
          getPermissions={getPermissions}
          pathKey={pathKey}
          loading={!!requests?.trash?.isPending || !!requests?.restore?.isPending}
          onRestore={(item) => {
            handleState({ item });
            //@ts-ignore
            requests?.restore?.mutate();
          }}
          trash={trash}
        />
      </Permission>
    </div>
  );
};
