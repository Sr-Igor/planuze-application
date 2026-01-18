import { useEffect, useState } from "react";

import { createId } from "@paralleldrive/cuid2";
import { AlignJustify, ArrowUpDown } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  Dialog,
  DialogDNDContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@repo/ui";

import { DndWrapper, ProviderDND, DraggableItem } from "@repo/ui/app";

import { Permission } from "@/components/ui/permission";

interface IOrderModalProps {
  data: any[];
  titleKey: string;
  onSave: (items: any[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  loading?: boolean;
  disabled?: boolean;
  useChild?: boolean;
  dirtyCallback?: (isDirty: boolean) => void;
}

export const OrderModal = ({
  data,
  titleKey,
  onSave,
  open,
  setOpen,
  loading,
  disabled,
  useChild = true,
  dirtyCallback,
}: IOrderModalProps) => {
  const t = useLang();

  const [items, setItems] = useState<any[]>(data);
  const [originalItems, setOriginalItems] = useState<any[]>([]);

  useEffect(() => {
    if (!data || !open) return;

    const sortedData = [...data].sort((a: any, b: any) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      return orderB - orderA;
    });

    const processedItems = sortedData.map((item) => ({
      ...item,
      local_id: createId(),
      order: item.order ?? 0,
    }));

    setItems(processedItems);
    setOriginalItems(processedItems);
  }, [data, open]);

  const isDirty = (() => {
    if (items.length !== originalItems.length) return true;

    return items.some((item, index) => {
      const originalItem = originalItems[index];
      if (!originalItem) return true;

      return item.id !== originalItem.id;
    });
  })();

  useEffect(() => {
    dirtyCallback?.(isDirty);
  }, [isDirty]);

  return (
    <>
      {useChild && (
        <div className="flex h-full flex-col gap-4">
          <span className="flex items-center justify-end gap-2">
            <Permission permission={["update"]}>
              <Button
                variant={"outline"}
                disabled={disabled}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <ArrowUpDown />
                {t.helper("order")}
              </Button>
            </Permission>
          </span>
        </div>
      )}
      <Dialog open={open} onOpenChange={(open) => !loading && setOpen(open)}>
        <DialogDNDContent className="flex min-h-[500px] max-w-2xl flex-col" closeButton={!loading}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {t.helper("order")} - {items.length} {t.helper("items")}
              </span>
            </DialogTitle>
            <p className="text-muted-foreground text-sm">{t.helper("order_description")}</p>
          </DialogHeader>

          <ScrollArea
            className="flex h-full flex-1 flex-col"
            style={{ maxHeight: "calc(100vh - 410px)" }}
          >
            <DndWrapper>
              <ProviderDND
                items={items}
                setOrder={(reorderedItems) => {
                  const itemsWithUpdatedOrder = reorderedItems.map((item, index) => ({
                    ...item,
                    order: reorderedItems.length - index,
                  }));
                  setItems(itemsWithUpdatedOrder);
                }}
              >
                <div className="relative flex h-full flex-col">
                  {items?.map((item, idx) => {
                    return (
                      <DraggableItem
                        key={`${item.id || item.local_id}`}
                        item={item}
                        index={idx}
                        disabled={loading}
                      >
                        <div className="bg-card relative flex h-12 min-h-12 w-full items-center gap-4 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
                          <AlignJustify size={16} />
                          <div className="flex flex-1 items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div>
                                <span className="bg-sidebar-accent text-accent-foreground flex min-h-5 min-w-5 items-center justify-center rounded-full text-sm">
                                  {item?.order}
                                </span>
                              </div>
                              <span className="text-foreground truncate text-sm font-medium">
                                {item?.[titleKey] || "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DraggableItem>
                    );
                  })}
                </div>
              </ProviderDND>
            </DndWrapper>
          </ScrollArea>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => {
                setOpen(false);
              }}
            >
              {t.helper("cancel")}
            </Button>
            <Button
              onClick={() => {
                onSave(items);
              }}
              loading={loading}
              disabled={!isDirty}
            >
              {t.helper("save")}
            </Button>
          </DialogFooter>
        </DialogDNDContent>
      </Dialog>
    </>
  );
};
