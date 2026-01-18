"use client";

import { useRouter } from "next/navigation";

import { Ticket } from "lucide-react";

import { profile } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui-new";

import { useProfile } from "@repo/api/web/callers/profile";
import { useAccess } from "@/hooks/access";
import { BaseTemplate } from "@/templates/list/base";

import { useActions, useTable } from "./hooks";

export default function Page() {
  const t = useLang();
  const router = useRouter();

  const { verifyAccess, module, profile, permissions } = useAccess();
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
