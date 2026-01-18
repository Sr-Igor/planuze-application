import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { Permission } from "@/components/permission";

import { IDeleteProps } from "../types";

export function Delete({
  open,
  onConfirm,
  onCancel,
  isPending,
  title,
  description,
  confirmText,
}: IDeleteProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onCancel}
      title={title}
      description={description}
      className="w-[95vw] max-w-md sm:max-w-lg"
      footer={
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Permission permission={["destroy"]}>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {confirmText}
            </Button>
          </Permission>
        </div>
      }
    />
  );
}
