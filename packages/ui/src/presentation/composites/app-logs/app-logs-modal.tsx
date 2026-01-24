import { History } from "lucide-react";

import { useLang } from "@repo/language/hooks";

import { ScrollArea } from "../../primitives/scroll-area";
import { AppDialog } from "../app-dialog";
import { AppLogs } from "./app-logs";
import type { LogEntry, LogsComparisonProps } from "./types";

export interface AppLogsModalProps<T = Record<string, unknown>> {
  /**
   * Whether the modal is open
   */
  open: boolean;
  /**
   * Callback when the modal open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Data containing logs
   */
  data?: (Partial<T> & { logs?: LogEntry[] }) | null;
  /**
   * Additional logs configuration
   */
  logs?: Partial<Omit<LogsComparisonProps<T>, "logs">>;
}

export const AppLogsModal = <T = Record<string, unknown>,>({
  open,
  onOpenChange,
  data,
  logs,
}: AppLogsModalProps<T>) => {
  const { helper } = useLang();

  return (
    <AppDialog
      title={
        <span className="flex items-center text-sm font-bold md:text-base">
          <History className="mr-2 h-4 w-4" />
          {helper("logs")}
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
        <AppLogs<T> logs={data?.logs || []} {...logs} />
      </ScrollArea>
    </AppDialog>
  );
};

AppLogsModal.displayName = "AppLogsModal";
