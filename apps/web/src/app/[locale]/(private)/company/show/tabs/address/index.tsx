"use client";

import { company } from "@repo/types";

import { useCompanyAddress } from "@repo/api/web/callers/company_address";
import { useLogs } from "@/hooks/logs";
import { useUnload } from "@/hooks/unload";
import { cn } from "@repo/ui-new";
import { DataForm } from "@/templates/data-form";
import { useShow } from "@/templates/show/context";
import { hookValidate } from "@repo/form";

import { FormType, useForm } from "./use-form";

export const Address = () => {
  const logs = useLogs();
  const { data, handleState, permissions } = useShow<company>();
  const address = data?.company_address;

  const { update, store } = useCompanyAddress({
    filters: {
      company_id: data?.id,
    },
    id: address?.id,
    callbacks: {
      store: {
        onSuccess: () => {
          handleState({ loading: false });
        },
      },
      update: {
        onSuccess: () => {
          handleState({ loading: false });
        },
        onError: () => handleState({ loading: false }),
      },
    },
  });

  const canEdit = address?.id ? permissions.update : permissions.store;

  const { Form, formProps, hook, isDirty, isError } = useForm({
    data: address,
    disabled: !canEdit || update.isPending || store.isPending,
  });

  useUnload(isDirty, (dirty) => handleState({ dirty }));

  //Handlers
  const handleSubmit = () => {
    if (!canEdit) return;

    const hooks = [{ hook, data }];
    hookValidate(hooks, (form) => {
      const newForm = {
        ...form,
        company_id: data?.id,
      };

      handleState({ loading: true });
      address?.id ? update.mutate(newForm) : store.mutate(newForm);
    });
  };

  const handleDiscard = () => {
    hook.reset((address || {}) as FormType);
    handleState({ dirty: false });
  };

  return (
    <DataForm
      data={address}
      isDirty={isDirty}
      isError={isError}
      loading={update.isPending || store.isPending}
      handleSubmit={handleSubmit}
      handleDiscard={handleDiscard}
      logs={logs.company_address()}
    >
      <Form
        {...formProps}
        hook={hook}
        className={cn(
          "grid grid-cols-1 gap-3 max-md:flex max-md:flex-col max-md:p-6 lg:grid-cols-3 xl:grid-cols-6"
        )}
        onSubmit={(e) => {
          e.preventDefault();
          isDirty && handleSubmit();
        }}
      />
    </DataForm>
  );
};
