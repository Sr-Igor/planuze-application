"use client";

import { useParams, useRouter } from "next/navigation";

import { project_kanban_objective } from "@repo/types";

import { useProjectKanbanObjective } from "@repo/api/web/callers/project_kanban_objective";
import { useLogs } from "@/hooks/logs";
import { useUnload } from "@/hooks/unload";
import { cn } from "@repo/ui-new";
import { DataForm } from "@/templates/data-form";
import { useShow } from "@/templates/show/context";
import { hookValidate } from "@repo/form";

import { useForm } from "./use-form";

export const Data = () => {
  const logs = useLogs();
  const router = useRouter();
  const { project } = useParams();
  const splitProject = project?.toString().split("-");
  const projectKanbanId = splitProject?.[0];
  const projectId = splitProject?.[1];
  const { data, handleState, permissions } = useShow<project_kanban_objective>();

  const canEdit = data?.id ? permissions.update : permissions.store;

  const { update, store } = useProjectKanbanObjective({
    id: data?.id,
    callbacks: {
      update: {
        onSuccess: () => handleState({ loading: false }),
        onError: () => handleState({ loading: false }),
      },
      store: {
        onSuccess: (d) =>
          router.replace(
            `/project_kanban_objective/show/${project}/${(d as project_kanban_objective).id}`
          ),
      },
    },
  });

  const { Form, formProps, hook, isDirty, isError } = useForm({
    data,
    disabled: !canEdit || update.isPending,
  });

  useUnload(isDirty, (dirty) => handleState({ dirty }));

  const handleSubmit = () => {
    const hooks = [{ hook, data }];
    hookValidate(hooks, (form) => {
      handleState({ loading: true });
      data?.id
        ? update.mutate(form)
        : store.mutate({ ...form, project_id: projectId, project_kanban_id: projectKanbanId });
    });
  };

  const handleDiscard = () => {
    hook.reset(data || {});
    handleState({ dirty: false });
  };

  return (
    <DataForm
      data={data}
      isDirty={isDirty}
      isError={isError}
      loading={update.isPending}
      handleSubmit={handleSubmit}
      handleDiscard={handleDiscard}
      handleCancel={() => {
        isDirty ? handleState({ cancel: true }) : router.back();
      }}
      logs={logs.project_kanban_objective()}
    >
      <Form
        {...formProps}
        hook={hook}
        className={cn(
          "grid grid-cols-1 gap-3 max-md:flex max-md:flex-col max-md:p-2 lg:grid-cols-3"
        )}
        onSubmit={(e) => {
          e.preventDefault();
          isDirty && handleSubmit();
        }}
      />
    </DataForm>
  );
};
