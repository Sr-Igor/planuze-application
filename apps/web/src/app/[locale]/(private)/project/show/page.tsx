"use client";

import { useRouter } from "next/navigation";

import { Kanban } from "lucide-react";

import { project_kanban } from "@repo/types";
import { Button } from "@repo/ui-new";

import { useProject } from "@repo/api/web/callers/project";
import { useProjectKanban } from "@repo/api/web/callers/project_kanban";
import { ShowTemplate } from "@/templates/show";

import { useTabs } from "./use-tabs";

export default function Page() {
  const router = useRouter();

  const { store } = useProjectKanban({});

  return (
    <ShowTemplate
      useTabs={useTabs}
      path="project"
      hookReq={useProject}
      defaultTab="data"
      baseUrl="/project"
      rootClassName="flex flex-col gap-4 p-2 sm:m-4 sm:p-4 w-full"
      customHeader={(data, permissions) => {
        const perm = permissions("project_kanban");
        const hasKanban = !!data?.project_kanbans?.length;
        const show = hasKanban ? perm.update : perm.store;
        if (!show) return null;

        return (
          <Button
            size="sm"
            variant="secondary"
            loading={store.isPending}
            onClick={async () => {
              if (hasKanban) {
                router.push(`/project_kanban/show/${data?.project_kanbans?.[0]?.id}`);
              } else {
                const res = await store.mutateAsync({
                  project_id: data?.id,
                });
                router.push(`/project_kanban/show/${(res as project_kanban).id}`);
              }
            }}
          >
            <Kanban />
            {hasKanban ? "Gerenciar Kanban" : "Criar Kanban"}
          </Button>
        );
      }}
    />
  );
}
