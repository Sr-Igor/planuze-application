"use client";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@repo/ui";

import { useInvite } from "@repo/api/web/callers/invite";
import { Invite } from "@/app/[locale]/config/welcome/options/invite";
import { useAuth } from "@repo/redux/hook";
import { useModal } from "@/hooks/modal";
import { useAppSelector } from "@repo/redux/hook";
import { useUserSet } from "@/hooks/user-set";

export const InviteModal = () => {
  const t = useLang();

  const { hasTwoAuth, user } = useAuth();
  const { invite: isModalOpen } = useAppSelector((state) => state.modal);
  const { setModal } = useModal();

  const handleClose = (delay: number = 0) => {
    setTimeout(() => {
      setModal({ invite: false });
    }, delay);
  };

  const { me, feedback } = useInvite({
    enabledMe: !!user?.id && hasTwoAuth,
    callbacks: {
      feedback: {
        onSuccess: (data) => {
          if (data.invite.accepted) {
            handleClose();
            setter(data.user);
          }
        },
      },
    },
  });

  const { setter } = useUserSet();

  const invites = me.data?.data || [];

  return (
    <Dialog open={isModalOpen} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.helper("invites")}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t.helper("invite_description")}
          </DialogDescription>
        </DialogHeader>

        {invites.length > 0 ? (
          <ScrollArea className="h-[30vh]">
            <Invite
              invites={invites}
              onFeedback={feedback.mutate}
              loading={feedback.isPending || me.isPending}
            />
          </ScrollArea>
        ) : (
          <div className="flex min-h-[30vh] items-center justify-center">
            <p className="text-muted-foreground">{t.helper("no_invites")}</p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => handleClose()}>{t.helper("back")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
