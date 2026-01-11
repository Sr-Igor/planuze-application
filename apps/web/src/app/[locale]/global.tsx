"use client";

import { useAction } from "@/api/callers/action";
import { useCountry } from "@/api/callers/country";
import { useModule } from "@/api/callers/module";
import { useIntlFormat } from "@/hooks/intl-format";
import { useTabId } from "@/hooks/tab";
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
