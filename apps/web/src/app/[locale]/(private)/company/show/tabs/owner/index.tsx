import { useState } from "react";

import { RotateCcwKey } from "lucide-react";

import { useAuth } from "@repo/api/web";
import { useLang } from "@repo/language/hooks";
import { useUserAuth } from "@repo/redux/hooks";
import { AppAvatar, Button, Card, CardHeader } from "@repo/ui";

import { useShow } from "@/templates/show/context";

import { ModalForm } from "./modal";

export const Owner = () => {
  const t = useLang();
  const { profile, user } = useUserAuth();
  const [open, setOpen] = useState(false);

  const { handleState } = useShow();

  const { owner } = useAuth({
    callbacks: {
      owner: {
        onSuccess: () => {
          handleState({ tab: "data" });
        },
      },
    },
  });

  if (!profile?.owner) return null;

  return (
    <>
      <div className="flex h-full w-full flex-col gap-3 p-3 sm:gap-4 md:p-5">
        <div className="flex flex-col items-end gap-2">
          <Button onClick={() => setOpen(true)}>
            <RotateCcwKey />
            {t.page.company("show.owner.change_property")}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <span className="flex items-center gap-2">
              <AppAvatar
                src={user?.avatar || ""}
                path={"user/avatar"}
                name={user?.name || ""}
                className="h-7 w-7"
                publicFile
              />
              <p>{user?.name}</p>
            </span>
          </CardHeader>
        </Card>
      </div>

      <ModalForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={(data) => owner.mutate(data)}
        profile={profile}
        loading={owner.isPending}
        user={user}
      />
    </>
  );
};
