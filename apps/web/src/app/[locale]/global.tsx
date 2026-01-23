"use client";

import { useAction, useCountry, useModule } from "@repo/api/web";
import { useIntlFormat } from "@repo/language/hooks";

//Modals
import { ErrorModal } from "@/templates/modal/error";
import { InactiveModal } from "@/templates/modal/inactive";
import { InviteModal } from "@/templates/modal/invite";
import { NotFoundModal } from "@/templates/modal/not_found";
import { ProfileModal } from "@/templates/modal/profile";
import { RedirectModal } from "@/templates/modal/redirect";

import { useTabId } from "../../../../../packages/cookies/src";

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
