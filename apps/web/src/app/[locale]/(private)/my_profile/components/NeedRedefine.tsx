import { Key } from "lucide-react";

import { user } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { useSignOut } from "@repo/cookies";

export interface INeedRedefineProps {
  user: user | null;
}

export const NeedRedefine = ({ user }: INeedRedefineProps) => {
  const t = useLang();
  const { out } = useSignOut();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 rounded-lg border p-4">
      <Key className="h-10 w-10" />
      <h4 className="text-xl font-bold">{t.page.my_profile("show.password.no_password")}</h4>
      <p className="text-muted-foreground text-md font-semibold">
        {t.page.my_profile("show.password.action_required")}
      </p>
      <p className="text-muted-foreground text-md font-semibold">
        {t.page.my_profile("show.password.redirect_to_email")}
      </p>
      <Button
        onClick={() => out(`/auth/recovery?email=${user?.email}`)}
        className="w-full text-xs sm:w-auto sm:text-sm"
      >
        {t.page.my_profile("show.password.define_password")}
      </Button>
    </div>
  );
};
