"use client";

import { useRouter } from "next/navigation";

import { level } from "@repo/api/generator/types";

import { useLevel } from "@/api/callers/level";
import { useLogs } from "@/hooks/logs";
import { useUnload } from "@/hooks/unload";
import { cn } from "@/lib/utils";
import { DataForm } from "@/templates/data-form";
import { useShow } from "@/templates/show/context";
import { hookValidate } from "@repo/utils/submitForm";

import { useForm } from "./use-form";

export const Data = () => {
  const router = useRouter();
  const logs = useLogs();

  const { data, handleState, permissions } = useShow<level>();

  const isAdministrator = !!data?.administrator;
  const canEdit = data?.id ? permissions.update : permissions.store;

  const { Form, formProps, hook, isDirty, isError } = useForm({
    data,
    disabled: isAdministrator || !canEdit,
  });

  useUnload(isDirty, (dirty) => handleState({ dirty }));

  //Handlers
  const handleSubmit = () => {
    const hooks = [{ hook, data }];
    hookValidate(hooks, (form) => {
      handleState({ loading: true });
      data?.id ? update.mutate(form) : store.mutate(form);
    });
  };

  const { update, store } = useLevel({
    id: data?.id,
    callbacks: {
      store: {
        onSuccess: (e) => {
          router.replace(`/level/show/${(e as level).id}`);
        },
      },
      update: {
        onSuccess: (e) => handleState({ loading: false }),
        onError: () => handleState({ loading: false }),
      },
    },
  });

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
      logs={logs.level()}
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
