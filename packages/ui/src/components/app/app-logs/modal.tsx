import { History } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { ScrollArea } from "@repo/ui";

import { AppDialog } from "../app-dialog";
import { ILogsComparison, Logs } from "./index";

export interface IAppLogsModalProps<T = Record<string, any>> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Partial<T> | null;
  logs?: Partial<Omit<ILogsComparison<T>, "logs">>;
}

export const AppLogsModal = <T = Record<string, any>,>({
  open,
  onOpenChange,
  data,
  logs,
}: IAppLogsModalProps<T>) => {
  const t = useLang();
  return (
    <AppDialog
      title={
        <span className="flex items-center text-sm font-bold md:text-base">
          <History className="mr-2 h-4 w-4" />
          {t.helper("logs")}
        </span>
      }
      open={open}
      className={"w-[95vw] max-w-[600px]"}
      onOpenChange={onOpenChange}
    >
      <ScrollArea
        className="bg-background w-full overflow-hidden rounded-lg border p-3"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <Logs<T> logs={(data as T & { logs?: ILogsComparison<T>["logs"] })?.logs || []} {...logs} />
      </ScrollArea>
    </AppDialog>
  );
};
