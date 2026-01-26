"use client";

import { LoaderIcon } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { useAppSelector } from "@repo/redux/hook";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui";

export const RedirectModal = () => {
  const t = useLang();

  const { redirect: isModalOpen } = useAppSelector((state) => state.modal);

  return (
    <Dialog open={isModalOpen}>
      <DialogContent closeButton={false}>
        <DialogHeader className="flex flex-col items-center justify-center gap-4 p-5 text-center">
          <LoaderIcon className="size-20 animate-spin text-green-500" />
          <DialogTitle className="text-2xl font-semibold">{t.modal("redirect.title")}</DialogTitle>
          <DialogDescription className="text-sm">
            {t.modal("redirect.description")}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
