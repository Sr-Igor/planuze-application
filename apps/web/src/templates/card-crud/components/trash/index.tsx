import { ClockArrowDown, Trash2 } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { ScrollArea } from "@repo/ui-new";
import { AppDialog, Trash as TrashComponent } from "@repo/ui-new";

import { GenericItem, ITrashProps } from "../../type";

export const Trash = <T,>({
  state,
  handleState,
  data,
  loading,
  onRestore,
  getPermissions,
  trash,
  pathKey,
}: ITrashProps<GenericItem<T>>) => {
  const t = useLang();

  return (
    <AppDialog
      title={
        <span className="text-md flex items-center font-bold">
          <Trash2 className="mr-2" />
          {t.helper("trash")}
        </span>
      }
      loading={loading}
      open={state?.open && state?.mode === "trash"}
      className={"sm:max-w-[600px]"}
      onOpenChange={() => handleState({ open: false })}
    >
      <ScrollArea
        className="bg-background w-full overflow-hidden rounded-lg border"
        style={{ height: "calc(100vh - 200px)", maxHeight: "500px" }}
      >
        <TrashComponent<GenericItem<T>>
          items={data}
          loading={loading}
          actions={
            getPermissions(pathKey).restore
              ? [
                  {
                    label: t.helper("restore"),
                    icon: <ClockArrowDown className="h-4 w-4" />,
                    onClick: onRestore,
                  },
                ]
              : undefined
          }
          {...trash}
        />
      </ScrollArea>
    </AppDialog>
  );
};
