import { AppDialog, Button } from "@repo/ui";

import { PlanCancelDialogProps } from "../types";

export function PlanCancelDialog({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText,
}: PlanCancelDialogProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onCancel}
      title={title}
      description={description}
      className="w-[95vw] max-w-md sm:max-w-lg"
      footer={
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="destructive" onClick={onConfirm} className="w-full sm:w-auto">
            {confirmText}
          </Button>
        </div>
      }
    />
  );
}
