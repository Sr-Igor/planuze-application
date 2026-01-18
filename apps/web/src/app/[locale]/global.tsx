"use client";

import { useAction } from "@repo/api/web/callers/action";
import { useCountry } from "@repo/api/web/callers/country";
import { useModule } from "@repo/api/web/callers/module";
import { useTabId } from "@repo/hooks";
import { useIntlFormat } from "@repo/language/hooks";
//Modals
import { ErrorModal } from "@/templates/modal/error";
import { InactiveModal } from "@/templates/modal/inactive";
import { InviteModal } from "@/templates/modal/invite";
import { NotFoundModal } from "@/templates/modal/not_found";
import { ProfileModal } from "@/templates/modal/profile";
import { RedirectModal } from "@/templates/modal/redirect";

export const Global = ({ children }: { children: React.ReactNode }) => {
  useModule();
  useAction();
  useCountry();
  useTabId();

  useIntlFormat();

  return (
    <>
      {children}
      <ErrorModal />
      <NotFoundModal />
      <ProfileModal />
      <InviteModal />
      <RedirectModal />
      <InactiveModal />
    </>
  );
};
