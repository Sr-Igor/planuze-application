"use project";

import { useRouter } from "next/navigation";

import { project } from "@repo/api/generator/types";

import { useProject } from "@/api/callers/project";
import { useLogs } from "@/hooks/logs";
import { useUnload } from "@/hooks/unload";
import { cn } from "@/lib/utils";
import { DataForm } from "@/templates/data-form";
import { useShow } from "@/templates/show/context";
import { hookValidate } from "@/utils/submitForm";

import { useForm } from "./use-form";

export const Data = () => {
  const logs = useLogs();
  const router = useRouter();
  const { data, handleState, permissions } = useShow<project>();

  const canEdit = data?.id ? permissions.update : permissions.store;

  const { update, store } = useProject({
    id: data?.id,
    callbacks: {
      update: {
        onSuccess: () => handleState({ loading: false }),
        onError: () => handleState({ loading: false }),
      },
      store: {
        onSuccess: (d) => router.replace(`/project/show/${(d as project).id}`),
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
      data?.id ? update.mutate(form) : store.mutate(form);
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
      logs={logs.project()}
    >
      <Form
        {...formProps}
        hook={hook}
        className={cn(
          "grid grid-cols-1 gap-3 max-md:flex max-md:flex-col max-md:p-2 lg:grid-cols-2"
        )}
        onSubmit={(e) => {
          e.preventDefault();
          isDirty && handleSubmit();
        }}
      />
    </DataForm>
  );
};
