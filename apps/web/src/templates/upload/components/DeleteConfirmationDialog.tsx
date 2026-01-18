"use client";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { IUploadFile } from "../types/interfaces";

interface DeleteConfirmationDialogProps {
  file?: IUploadFile;
  index?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteConfirmationDialog = ({
  file,
  index,
  open,
  onOpenChange,
  onConfirm,
}: DeleteConfirmationDialogProps) => {
  const t = useLang();

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t.helper("exclude_file_title")}
      description={t.helper("exclude_file_description")}
      className="w-[95vw] max-w-md sm:max-w-lg"
      footer={
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className="w-full text-xs sm:w-auto md:text-sm"
          >
            {t.helper("delete")}
          </Button>
        </div>
      }
    />
  );
};
