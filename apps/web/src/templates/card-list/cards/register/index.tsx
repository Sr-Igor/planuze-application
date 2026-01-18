import { useState } from "react";

import { CircleX, HistoryIcon, Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import * as C from "@repo/ui";
import { AppDialog, AppLogsModal } from "@repo/ui/app";

import { Permission } from "@/components/ui/permission";
import { useUnload } from "@/hooks/unload";
import { cn } from "@repo/ui";
import { hookValidate } from "@repo/form";

import { IRegisterCardProps } from "./types";
import { useReq } from "./use-req";

export const RegisterCard = <T extends { id: string; order?: number }>({
  item,
  onDelete,
  updateItem,
  path,
  bodyKeys,
  hookReq,
  useForm,
  logs,
  translate,
  handleState,
  useShow,
  filters,
  deleteChildren,
  beforeDelete,
  local_id,
}: IRegisterCardProps<T>) => {
  const t = useLang();
  const pageT = t.page[path];

  const { data, state, permissions } = useShow();

  const requests = useReq({
    item,
    handleState,
    state,
    data,
    updateItem,
    local_id,
    hookReq,
    filters,
  });

  const canEdit = item?.id ? permissions.update : permissions.store;
  const { Form, formProps, hook, isDirty, isError } = useForm({
    disabled: requests?.update?.isPending || requests?.store?.isPending || !canEdit,
    item,
  });

  const [openLogs, setOpenLogs] = useState(false);
  const [exclude, setExclude] = useState<boolean>(false);

  useUnload(isDirty || !item?.id, (dirty) => handleState({ dirty }));

  const handleSubmit = () => {
    const hooks = [{ hook, data: item.id ? item : undefined }];
    hookValidate(hooks, (form) => {
      const newForm = {
        ...form,
        ...bodyKeys,
        createdAt: (item as any)?.createdAt || new Date().toISOString(),
      };

      handleState({ loading: true });
      item?.id ? requests?.update?.mutate(form) : requests?.store?.mutate(newForm);
    });
  };

  const showFooter = !logs?.hidden || permissions.destroy;

  const handleDelete = (props: any = {}) => {
    handleState({ loading: true });
    requests?.destroy?.mutate(props);
    setExclude(false);
  };

  return (
    <>
      <C.Card
        className={cn(
          "flex flex-col overflow-hidden p-0 lg:flex-row",
          (isDirty || !item?.id) && "border border-yellow-500"
        )}
      >
        <C.CardContent className="relative flex w-full flex-col p-0 lg:flex-row">
          {!!item?.order && (
            <div className="bg-foreground absolute top-0 left-0 flex min-h-5 min-w-5 items-center justify-center rounded-br-md">
              <p className="text-background text-[12px] font-bold">{item?.order}</p>
            </div>
          )}
          <div className="flex-1 p-4 md:p-8">
            <Form
              {...formProps}
              hook={hook}
              className={cn("grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4", formProps.className)}
              onSubmit={(e: any) => {
                e.preventDefault();
                isDirty && handleSubmit();
              }}
            />
          </div>
          {showFooter && (
            <C.CardFooter className="md:border-border flex flex-col gap-2 p-4 md:flex-row md:justify-between md:border-l md:p-6">
              <div className="flex w-full gap-2 md:w-auto">
                {item.id && (
                  <Permission permission={["destroy"]}>
                    <Button
                      variant="destructive"
                      disabled={requests?.update?.isPending || requests?.store?.isPending}
                      loading={requests?.destroy?.isPending}
                      onClick={() => {
                        setExclude(true);
                      }}
                      size="sm"
                      className="flex-1 text-xs md:flex-none md:text-sm"
                    >
                      <Trash className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </Permission>
                )}

                {!item.id && (
                  <Permission permission={["store"]}>
                    <Button
                      variant="destructive"
                      disabled={requests?.update?.isPending || requests?.store?.isPending}
                      loading={requests?.destroy?.isPending}
                      onClick={() => {
                        onDelete();
                      }}
                      size="sm"
                      className="flex-1 text-xs md:flex-none md:text-sm"
                    >
                      <CircleX className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </Permission>
                )}

                {!logs?.hidden && (
                  <Button
                    onClick={() => setOpenLogs(true)}
                    variant={"ghost"}
                    size="icon"
                    className="h-8 w-8 flex-1 md:h-9 md:w-9 md:flex-none"
                    // @ts-ignore
                    disabled={!item?.logs?.length}
                  >
                    <HistoryIcon className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                )}
              </div>

              <Permission permission={[item?.id ? "update" : "store"]}>
                <Button
                  type="submit"
                  className="w-full text-xs md:w-auto md:text-sm"
                  onClick={handleSubmit}
                  disabled={!isDirty || isError || requests?.destroy?.isPending}
                  loading={requests?.update?.isPending || requests?.store?.isPending}
                  size="sm"
                >
                  {t.helper("save")}
                </Button>
              </Permission>
            </C.CardFooter>
          )}
        </C.CardContent>
      </C.Card>

      <Permission permission={["destroy"]}>
        <AppDialog
          open={exclude}
          onOpenChange={setExclude}
          title={pageT(`${translate}.exclude.title`)}
          description={pageT(`${translate}.exclude.description`)}
          className="w-[95vw] max-w-md sm:max-w-lg"
          footer={
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="destructive"
                onClick={() => {
                  if (beforeDelete) {
                    beforeDelete(handleDelete);
                  } else {
                    handleDelete();
                  }
                }}
                className="w-full text-xs sm:w-auto md:text-sm"
              >
                {t.helper("delete")}
              </Button>
            </div>
          }
        >
          {deleteChildren?.(item as T)}
        </AppDialog>
      </Permission>

      {!logs?.hidden && (
        <AppLogsModal<T> open={openLogs} onOpenChange={setOpenLogs} data={item} logs={logs} />
      )}
    </>
  );
};
