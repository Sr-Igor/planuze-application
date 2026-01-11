"use client";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { useAuth } from "@/api/callers/auth";
import { user } from "@/api/generator/types";
import { useSignOut } from "@/hooks/cookies/signout";
import { useAppSelector } from "@/hooks/redux";
import { useUnload } from "@repo/hooks/unload";
import { useUserSet } from "@/hooks/user-set";
import { cn } from "@/lib/utils";
import { useShow } from "@/templates/show/context";
import { hookValidate } from "@/utils/submitForm";

import { NeedRedefine } from "../../components/NeedRedefine";
import { useForm } from "./use-form";

export const Password = () => {
  const t = useLang();
  const { handleState } = useShow<user>();

  const user = useAppSelector((state) => state.user);
  const { out } = useSignOut();

  const { setter } = useUserSet(null, false);

  const { changePassword } = useAuth({
    callbacks: {
      changePassword: {
        onSuccess: (data) => {
          setter(data);
          hook.reset(config.defaultValues);
          handleState({ loading: false, dirty: false });
        },
        onError: () => handleState({ loading: false }),
      },
    },
  });

  const { Form, formProps, hook, isDirty, isError, config } = useForm({
    data: user,
    disabled: changePassword.isPending,
  });

  useUnload(isDirty, (dirty) => handleState({ dirty }));

  const handleSubmit = () => {
    const hooks = [{ hook }];
    hookValidate(hooks, (form) => {
      handleState({ loading: true });
      changePassword.mutate(form);
    });
  };

  const handleDiscard = () => {
    hook.reset(config.defaultValues);
    handleState({ dirty: false });
  };

  const needRedefine = user?.need_reset;
  return (
    <div className="relative flex h-full w-full flex-col justify-between gap-3 p-2 sm:gap-4 sm:p-3 md:p-5">
      {needRedefine && <NeedRedefine user={user} />}

      {!needRedefine && (
        <>
          <div className="flex flex-col items-center justify-center">
            <Form
              {...formProps}
              hook={hook}
              className={cn(
                "grid grid-cols-1 gap-8 max-md:flex max-md:flex-col max-md:p-2 md:min-w-[500px] lg:grid-cols-2"
              )}
              onSubmit={(e) => {
                e.preventDefault();
                isDirty && handleSubmit();
              }}
            />
            <div className="mt-10 flex items-end justify-end gap-2">
              <span className="text-muted-foreground text-sm">
                {t.page.my_profile("show.password.forgot_password")}
              </span>
              <button className="text-sm text-blue-500" onClick={() => out(`/auth/recovery`)}>
                {t.page.my_profile("show.password.redefine_password")}
              </button>
            </div>
          </div>
          <span className="mt-4 flex w-full flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center sm:justify-end">
            {isDirty && (
              <Button
                variant={"outline"}
                onClick={handleDiscard}
                disabled={changePassword.isPending}
                className="w-full text-xs md:w-auto md:text-sm"
              >
                {t.helper("discard")}
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={!isDirty || isError}
              loading={changePassword.isPending}
              className="w-full text-xs sm:w-auto sm:text-sm"
            >
              {t.helper("save")}
            </Button>
          </span>
        </>
      )}
    </div>
  );
};
