"use client";

import { useCallback, useEffect } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useLang } from "@repo/language/hooks";
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader } from "@repo/ui-new";
import { InfoModalLayout } from "@repo/ui-new";

import { useModal } from "@/hooks/modal";

export const NotFoundModal = () => {
  const t = useLang();

  const router = useRouter();
  const pathName = usePathname();

  const {
    setModal,
    modal: { not_found: isModalOpen },
  } = useModal();

  useEffect(() => {
    setModal({ not_found: false });
  }, [pathName]);

  const handleBack = useCallback(() => {
    const isInternalReferrer =
      typeof window !== "undefined" && document.referrer.startsWith(window.location.origin);

    if (isInternalReferrer) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  const handleClose = () => {
    setModal({ not_found: false });
  };

  const handlePrimaryAction = () => {
    handleBack();
    handleClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <InfoModalLayout
            icon={<Image src={"/images/not_found.gif"} height={100} width={100} alt="" />}
            title={t.modal("not_found.title")}
            description={t.modal("not_found.description")}
          />
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handlePrimaryAction}>{t.helper("back")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
