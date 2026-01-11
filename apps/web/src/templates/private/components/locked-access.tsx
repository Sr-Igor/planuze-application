import { useRouter } from "next/navigation";

import { FilePen, MousePointerBan } from "lucide-react";

import { profile } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { set } from "@/store/modules/module/actions";

import { ProfileSwitcher } from "./profile-switch";

interface ForbiddenAccessProps {
  company: string;
  profile?: profile;
}

export const LockedAccess = ({ company, profile }: ForbiddenAccessProps) => {
  const t = useLang();

  const router = useRouter();
  const { all } = useAppSelector((state) => state.module);
  const dispatch = useAppDispatch();

  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-6 text-center text-lg font-semibold">
      <MousePointerBan size={108} className="text-destructive" />
      <div>
        <h1 className="text-foreground mb-4 text-xl font-semibold sm:text-4xl md:text-3xl">
          {t.warning("locked.title")}
        </h1>
        <p className="text-sm sm:text-base">{t.warning("locked.description", { company })}</p>
      </div>

      {profile?.level?.administrator && (
        <Button
          variant={"secondary"}
          onClick={() => {
            const admModule = all.find((m) => m.title === "admin");
            dispatch(set({ moduleId: admModule?.id || "" }));
            router.push(`/subscription?tab-subscription=plans`);
          }}
        >
          <FilePen />
          {t.warning("locked.regularize")}
        </Button>
      )}

      <ProfileSwitcher />
    </div>
  );
};
