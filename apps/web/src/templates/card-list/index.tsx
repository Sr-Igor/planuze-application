import { Fragment, useEffect, useState } from "react";

import { createId } from "@paralleldrive/cuid2";
import { ClockArrowDown, PackageOpen, Plus, Trash2 } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, ScrollArea } from "@repo/ui";
import { AppDialog, Trash } from "@repo/ui";

import { Permission } from "@/components/permission";

import { OrderModal } from "../modal/order";
import { State } from "../show/types";
import { ICardListTemplateProps } from "./types";
import { useReq } from "./use-req";

export const CardListTemplate = <T extends { id: string }, R extends { id: string }>({
  dataAccess,
  path,
  card,
  hookReq,
  translate,
  trash,
  order,
  useShow,
  getBodyKeys,
  getFilters,
}: ICardListTemplateProps<T, R>) => {
  const t = useLang();
  const pageT = t.page[path];

  const { data, state, handleState, permissions } = useShow();

  const [openTrash, setOpenTrash] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [items, setItems] = useState<Partial<R & { local_id: string; createdAt: string }>[]>([]);

  useEffect(() => {
    setItems((prev) => {
      const newItems = [...prev];
      const newData = (data as any)?.[dataAccess] as R[];

      if (!newData) return prev;

      newData.forEach((item) => {
        const existingIndex = newItems.findIndex((i) => i.id === item.id);
        if (existingIndex !== -1) {
          newItems[existingIndex] = {
            ...item,
            local_id: newItems[existingIndex]?.local_id ?? createId(),
            createdAt: newItems[existingIndex]?.createdAt ?? new Date().toISOString(),
          } as Partial<R & { local_id: string; createdAt: string }>;
        } else {
          const tempIndex = newItems.findIndex((i) => !i.id && i.local_id);
          if (tempIndex !== -1) {
            newItems[tempIndex] = {
              ...item,
              local_id: newItems[tempIndex]?.local_id ?? createId(),
              createdAt: newItems[tempIndex]?.createdAt ?? new Date().toISOString(),
            } as Partial<R & { local_id: string; createdAt: string }>;
          } else {
            newItems.push({
              ...item,
              local_id: createId(),
              createdAt: new Date().toISOString(),
            } as Partial<R & { local_id: string; createdAt: string }>);
          }
        }
      });

      if (!order) return newItems;
      return newItems?.sort((a: any, b: any) => {
        // Se ambos têm order, use order
        if (a.order && b.order) {
          return b.order - a.order;
        }
        // Se um tem order e outro não, priorize o que tem order
        if (a.order && !b.order) return -1;
        if (!a.order && b.order) return 1;
        // Se nenhum tem order, use createdAt
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        // Fallback para order se createdAt não estiver disponível
        return (b.order || 0) - (a.order || 0);
      });
    });
  }, [(data as any)?.[dataAccess]]);

  const updateItem = (local_id: string, item?: R) => {
    setItems((prev) => {
      if (!item) return prev.filter((i) => i.local_id !== local_id);

      const newItems = [...prev];
      const index = newItems.findIndex((i) => i.local_id === local_id);

      if (index !== -1) {
        const prevItem = prev?.find((i) => i.local_id === local_id);
        newItems[index] = {
          ...item,
          local_id: prevItem?.local_id ?? createId(),
          createdAt: prevItem?.createdAt ?? new Date().toISOString(),
        } as Partial<R & { local_id: string; createdAt: string }>;
      }

      return newItems;
    });
  };

  const filters = getFilters?.(data as T) || {};
  const bodyKeys = getBodyKeys?.(data as T) || {};

  const requests = useReq({
    permissions,
    data: data as T,
    setItems,
    setOpenTrash,
    hookReq,
    setOpenOrder,
    filters,
    openTrash,
  });

  const [internalState, setInternalState] = useState<Record<string, Partial<State>>>({});
  const handleInternalState = (state: Partial<State>, local_id: string) => {
    setInternalState((prev) => {
      const newState = {
        ...prev,
        [local_id]: {
          ...prev[local_id],
          ...state,
        },
      };

      return newState;
    });
  };

  useEffect(() => {
    const isDirty = Object.values(internalState).some((s) => s.dirty);
    const isLoading = Object.values(internalState).some((s) => s.loading);

    handleState({
      ...state,
      dirty: isDirty,
      loading: isLoading,
    });
  }, [internalState]);

  const onSave = (items: any[]) => {
    requests?.many?.mutate({
      ids: items.map((item) => item.id),
      body: {
        data: items.map((item) => {
          return {
            id: item.id,
            order: item.order,
          };
        }),
      },
    });
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <span className="flex items-center justify-end gap-2 px-5">
        {!!order && (
          <OrderModal
            data={items || []}
            onSave={onSave}
            {...order}
            open={openOrder}
            setOpen={setOpenOrder}
            disabled={state.dirty || !items.length}
            loading={requests?.many?.isPending}
          />
        )}
        <Permission permission={["trash"]}>
          <Button
            variant={"outline"}
            onClick={() => {
              setOpenTrash(true);
            }}
          >
            <Trash2 />
            {t.helper("trash")}
          </Button>
        </Permission>
        <Permission permission={["store"]}>
          <Button
            disabled={state.loading}
            onClick={() => {
              const newItem = {
                ...(Object.create(null) as R),
                local_id: createId(),
                createdAt: new Date().toISOString(),
              } as Partial<R & { local_id: string; createdAt: string; order?: number }>;

              if (order) {
                const lastOrder = items.reduce((acc, item: any) => {
                  return acc > item?.order ? acc : item?.order;
                }, 0);
                newItem.order = (lastOrder + 1) as any;
              }

              setItems((prev) => [newItem, ...prev]);
              handleState({ dirty: true });
            }}
          >
            <Plus />
            {pageT(`${translate}.new`)}
          </Button>
        </Permission>
      </span>

      {!!items?.length && (
        <ScrollArea
          className="flex h-full flex-1 flex-col gap-4 px-5"
          style={{ maxHeight: "calc(100vh - 410px)" }}
        >
          <span className="flex flex-col gap-4">
            {items?.map((item, idx) => {
              return (
                <Fragment key={`${item.id}.${item.local_id}`}>
                  {card({
                    local_id: item.local_id!,
                    item,
                    onDelete: () => {
                      handleInternalState({ dirty: false, loading: false }, item.local_id!);
                      setItems((prev) => prev.filter((_, index) => index !== idx));
                    },
                    updateItem,
                    translate,
                    dataAccess,
                    hookReq,
                    path,
                    bodyKeys,
                    handleState: (state) => handleInternalState(state, item.local_id!),
                    useShow,
                    filters,
                  })}
                </Fragment>
              );
            })}
          </span>
        </ScrollArea>
      )}
      {!items?.length && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5">
          <PackageOpen size={60} className="text-muted-foreground" />
          <p className="text-muted-foreground text-md text-center font-semibold">
            {pageT(`${translate}.empty`)}
          </p>
        </div>
      )}

      <AppDialog
        title={
          <span className="text-md flex items-center font-bold">
            <Trash2 className="mr-2" />
            {t.helper("trash")}
          </span>
        }
        open={openTrash}
        className={"sm:max-w-[600px]"}
        onOpenChange={setOpenTrash}
      >
        <ScrollArea
          className="bg-background w-full overflow-hidden rounded-lg border"
          style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
        >
          <Trash<R>
            items={requests?.trash?.data?.data || []}
            loading={
              requests?.restore?.isPending ||
              requests?.trash?.isLoading ||
              requests?.trash?.isPending
            }
            actions={
              permissions.restore
                ? [
                    {
                      label: t.helper("restore"),
                      icon: <ClockArrowDown className="h-4 w-4" />,
                      onClick: (item) => {
                        requests?.restore?.mutate(item.id);
                      },
                    },
                  ]
                : undefined
            }
            {...trash}
          />
        </ScrollArea>
      </AppDialog>
    </div>
  );
};
