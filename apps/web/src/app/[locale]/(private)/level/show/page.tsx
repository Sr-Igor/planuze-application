"use client";

import { level } from "@repo/api/generator/types";

import { useLevel } from "@/api/callers/level";
import { ShowTemplate } from "@/templates/show";

import { useTabs } from "./use-tabs";

export default function Page() {
  return (
    <ShowTemplate<level>
      useTabs={useTabs}
      path="level"
      hookReq={useLevel}
      defaultTab="data"
      baseUrl="/level"
      undeletableProps={(data, profile, translate) => {
        const isAdministrator = !!data?.administrator;
        const isEditingOwnLevel = profile?.level_id === data?.id;

        if (isAdministrator) {
          return {
            title: translate("show.alert.admin_level.description"),
            icon: "ShieldAlertIcon",
            className: "text-red-500",
          };
        } else if (isEditingOwnLevel) {
          return {
            title: translate("show.alert.own_level.description"),
            icon: "ShieldAlertIcon",
            className: "text-amber-500",
          };
        }
      }}
    />
  );
}
