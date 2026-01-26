"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { LogInIcon } from "lucide-react";

import { useAuth } from "@repo/api/manager";
import { hookValidate, useFormList } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { useAppDispatch } from "@repo/redux/hook";
import { create } from "@repo/redux/store/modules/admin/actions";
import { Button } from "@repo/ui";

import { fields, schema } from "./fields";

export const AuthLogic = () => {
  const t = useLang();

  const dispatch = useAppDispatch();
  const route = useRouter();
  const callback = useSearchParams().get("callbackUrl");

  const { Form, formProps, hook, isDirty } = useFormList({ fields, schema });

  const { login } = useAuth({
    callbacks: {
      login: {
        onSuccess: (admin) => {
          dispatch(create(admin));
          route.push(callback || "/dashboard");
        },
      },
    },
  });

  const handleSubmit = () => {
    const hooks = [{ hook }];
    hookValidate(hooks, (form) => {
      login.mutate(form);
    });
  };

  return (
    <div className="mt-10 w-full border p-10">
      <Form
        {...formProps}
        hook={hook}
        className="mb-2 grid w-full grid-cols-1 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          isDirty && handleSubmit();
        }}
      />
      <Button
        disabled={!isDirty || login.isPending}
        onClick={handleSubmit}
        className="mt-2 w-full py-3 text-base font-semibold shadow-sm transition-all duration-200"
      >
        <LogInIcon />
        <span>{t.page.login("enter")}</span>
      </Button>
    </div>
  );
};
