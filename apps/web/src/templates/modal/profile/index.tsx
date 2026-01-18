"use client";

import { useRouter } from "next/navigation";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";

import { AppAvatar } from "@repo/ui/app";
import { getProfile } from "@repo/cookies";
import { useModal } from "@/hooks/modal";
import { useAppSelector } from "@repo/redux/hook";
import { cn } from "@repo/ui";

export const ProfileModal = () => {
  const t = useLang();
  const user = useAppSelector((state) => state.user);
  const profileIdCookie = getProfile();
  const { profileId: profileIdStore, all } = useAppSelector((state) => state.module);
  const route = useRouter();

  const profileId = profileIdCookie || profileIdStore;

  const {
    setModal,
    modal: { profile: isModalOpen },
  } = useModal();

  const handleClose = (delay: number = 0) => {
    setTimeout(() => {
      setModal({ profile: false });
    }, delay);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.helper("select_a_company")}</DialogTitle>
          <DialogDescription>{t.helper("select_a_company_description")}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {user?.profiles?.map((profile) => (
            <button
              key={profile.id}
              className={cn(
                "bg-muted hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-colors",
                profileId === profile.id && "border-green-500"
              )}
              onClick={() => {
                if (profileId === profile.id) return handleClose();
                const personalModule = all.find((m) => m.title === "personal");
                route.push(`/hidrate?profileId=${profile.id}&moduleId=${personalModule?.id}`);
                handleClose(300);
              }}
            >
              <AppAvatar
                src={profile?.company?.logo || ""}
                path="company/logo"
                name={profile?.company?.name || ""}
                className="h-25 w-25"
                fallbackClassName="text-5xl"
                publicFile
              />
              <p className="text-md font-medium">{profile.company?.name}</p>
            </button>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={() => handleClose()}>{t.helper("back")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
