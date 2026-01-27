"use client";

import { useRouter } from "next/navigation";

import { Ticket } from "lucide-react";

import { useProfile } from "@repo/api/web";
import { useLang } from "@repo/language/hooks";
import { useUserAccess } from "@repo/redux/hooks";
import { profile } from "@repo/types";
import { Button } from "@repo/ui";

import { BaseTemplate } from "@/templates/list/base";

import { useActions, useTable } from "./hooks";

export default function Page() {
  const t = useLang();
  const router = useRouter();

  const { verifyAccess, module, profile, permissions } = useUserAccess();
  const hasAccess = verifyAccess("invite", "index", module?.id);

  const canStore = permissions("profile").show || permissions("profile").update;

  return (
    <BaseTemplate<profile>
      path="profile"
      hookReq={useProfile}
      useTable={(props) => useTable({ ...props, profile })}
      useActions={useActions}
      redirect="/profile/show"
      headerRightRight={
        hasAccess && (
          <Button variant="secondary" onClick={() => router.push("/invite")}>
            <Ticket />
            <span className="ml-2 hidden lg:inline-block">{t.page.profile("invites")}</span>
          </Button>
        )
      }
      events={{
        onRowDoubleClick: (item) => {
          canStore && router.push(`/profile/show/${item.id}`);
        },
      }}
    />
  );
}
