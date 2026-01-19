import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui";

import { CancelProps } from "../types";

export function Cancel({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText,
}: CancelProps) {
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
