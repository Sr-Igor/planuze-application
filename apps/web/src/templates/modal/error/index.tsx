"use client";

import { RotateCcw, XCircle } from "lucide-react";

import { useClean } from "@repo/cookies";
import { useModal } from "@repo/hooks";
import { useLang } from "@repo/language/hooks";
import { useAppSelector } from "@repo/redux/hook";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";

export const ErrorModal = () => {
  const t = useLang();

  const user = useAppSelector((state) => state.user);
  const { error: isModalOpen, message, code, canClose } = useAppSelector((state) => state.modal);

  const { clean } = useClean();

  const handlePrimaryAction = () => {
    window.location.reload();
  };

  const { setModal } = useModal();

  const handleClose = () => {
    setModal({ error: false });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => canClose && handleClose()}>
      <DialogContent closeButton={!!canClose}>
        <DialogHeader className="flex flex-col items-center justify-center gap-4 p-5 text-center">
          <XCircle className="size-20 text-red-500" />
          <DialogTitle className="text-2xl font-semibold">{t.modal("error.title")}</DialogTitle>
          <DialogDescription className="rounded-md border-2 border-red-500 px-4 py-2 font-bold text-red-500">
            {message || t.error(code || "connection_error")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button onClick={handlePrimaryAction}>
              <RotateCcw />
              {t.helper("reload_page")}
            </Button>
            {canClose && (
              <Button variant="outline" onClick={handleClose} className="min-w-[150px]">
                {t.helper("close")}
              </Button>
            )}
            {!canClose && user?.id && (
              <Button variant="destructive" onClick={() => clean()} className="min-w-[150px]">
                {t.helper("exit")}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
