"use client";

import { useRouter } from "next/navigation";

import { user } from "@repo/types";

import { useUser } from "@repo/api/web/callers/user";
import { useAppDispatch, useAppSelector } from "@repo/redux/hook";
import { useUnload } from "@/hooks/unload";
import { cn } from "@repo/ui";
import { update as updateUser } from "@repo/redux/store/modules/user/actions";
import { DataForm } from "@/templates/data-form";
import { useShow } from "@/templates/show/context";
import { hookValidate } from "@repo/form";

import { useForm } from "./use-form";

export const Data = () => {
  const router = useRouter();
  const { handleState } = useShow<user>();

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { update } = useUser({
    id: user?.id,
    callbacks: {
      update: {
        onSuccess: (e) => {
          dispatch(updateUser(e as user));
          handleState({ loading: false });
        },
        onError: () => handleState({ loading: false }),
      },
    },
  });

  const { Form, formProps, hook, isDirty, isError } = useForm({
    data: user,
    disabled: update.isPending,
    profiles: user?.profiles,
  });

  useUnload(isDirty, (dirty) => handleState({ dirty }));

  const handleSubmit = () => {
    const hooks = [{ hook, data: { avatar: user?.avatar, name: user?.name } }];
    hookValidate(hooks, (form) => {
      handleState({ loading: true });
      update.mutate(form);
    });
  };

  const handleDiscard = () => {
    hook.reset(user || {});
    handleState({ dirty: false });
  };

  return (
    <DataForm
      data={user}
      isDirty={isDirty}
      isError={isError}
      skipPermission
      loading={update.isPending}
      handleSubmit={handleSubmit}
      handleDiscard={handleDiscard}
      handleCancel={() => {
        isDirty ? handleState({ cancel: true }) : router.back();
      }}
    >
      <Form
        {...formProps}
        hook={hook}
        className={cn(
          "grid grid-cols-1 gap-3 max-md:flex max-md:flex-col max-md:p-2 lg:grid-cols-6"
        )}
        onSubmit={(e) => {
          e.preventDefault();
          isDirty && handleSubmit();
        }}
      />
    </DataForm>
  );
};
