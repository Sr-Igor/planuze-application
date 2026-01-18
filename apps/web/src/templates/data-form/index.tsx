"use client";

import { useState } from "react";

import { HistoryIcon } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import { AppLogsModal, ILogsComparison } from "@repo/ui/app";

import { Permission } from "@/components/ui/permission";

export interface DataFormProps<T> {
  children: React.ReactNode;
  isDirty: boolean;
  isError: boolean;
  loading: boolean;
  handleCancel?: () => void;
  handleDiscard?: () => void;
  handleSubmit?: () => void;
  data?: (T & { id: string; logs?: any[] }) | null;
  logs?: Partial<Omit<ILogsComparison<T>, "logs">>;
  skipPermission?: boolean;
}

export const DataForm = <T,>({
  children,
  isDirty,
  loading,
  handleCancel,
  isError,
  handleSubmit,
  handleDiscard,
  data,
  logs,
  skipPermission,
}: DataFormProps<T>) => {
  const t = useLang();

  const [openLogs, setOpenLogs] = useState(false);

  return (
    <div className="flex h-full w-full flex-col justify-between gap-3 p-3 sm:gap-4 md:p-5">
      {children}
      <div className="flex items-center justify-between">
        <span className="mt-4 flex w-full flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center sm:justify-end">
          {!!data && !!data?.logs && (
            <Button
              onClick={() => setOpenLogs(true)}
              variant={"secondary"}
              disabled={!data?.logs?.length}
            >
              <HistoryIcon className="h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4" />
            </Button>
          )}
          <Permission permission={!skipPermission ? [data?.id ? "update" : "store"] : []}>
            {!!handleCancel && (
              <Button
                variant={"outline"}
                disabled={loading}
                onClick={handleCancel}
                className="w-full text-xs sm:w-auto sm:text-sm"
              >
                {isDirty ? t.helper("cancel") : t.helper("back")}
              </Button>
            )}
            {!!data?.id && !!handleDiscard && isDirty && (
              <Button
                variant={"secondary"}
                onClick={handleDiscard}
                disabled={loading}
                className="w-full text-xs md:w-auto md:text-sm"
              >
                {t.helper("discard")}
              </Button>
            )}
            {!!handleSubmit && (
              <Button
                onClick={handleSubmit}
                disabled={!isDirty || isError}
                loading={loading}
                className="w-full text-xs sm:w-auto sm:text-sm"
              >
                {t.helper("save")}
              </Button>
            )}
          </Permission>
        </span>
      </div>

      <AppLogsModal open={openLogs} onOpenChange={setOpenLogs} data={data} logs={logs} />
    </div>
  );
};
