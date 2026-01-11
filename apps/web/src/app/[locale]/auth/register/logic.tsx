"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogInIcon } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { useUser } from "@/api/callers/user";
import { user } from "@/api/generator/types";
import { useAppDispatch } from "@/hooks/redux";
import { create } from "@/store/modules/user/actions";
import { fingerprint } from "@/utils/fingerprint";
import { hookValidate } from "@/utils/submitForm";

import { useForm } from "./use-form";

export const AuthLogic = () => {
  const t = useLang();

  const dispatch = useAppDispatch();
  const route = useRouter();

  const { Form, formProps, hook, isDirty, isError } = useForm();

  const { store } = useUser({
    callbacks: {
      store: {
        onSuccess: (e) => {
          const user = e as user;

          try {
            if (!user?.user_tokens?.[0].token)
              return route.push(`/auth/error?error=${t.error("error_token")}`);

            dispatch(create(user));

            route.push("/config/code/confirm");
          } catch (error) {
            route.push(`/auth/error?error=${t.error("error_register")}`);
          }
        },
      },
    },
  });

  const handleSubmit = () => {
    const hooks = [{ hook }];
    hookValidate(hooks, (form) => {
      store.mutate(form);
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-10">
      <Form
        {...formProps}
        hook={hook}
        className="mb-2 grid w-full grid-cols-1 gap-10"
        onSubmit={(e) => {
          e.preventDefault();
          isDirty && handleSubmit();
        }}
      />
      <Button
        disabled={!isDirty || isError}
        loading={store.isPending}
        onClick={handleSubmit}
        className="mt-10 w-full py-3 text-base font-semibold shadow-sm transition-all duration-200"
      >
        <LogInIcon />
        <span>{t.page.login("register")}</span>
      </Button>

      <div className="m-2 flex flex-col items-center gap-2">
        <p className="text-muted-foreground text-sm">{t.page.login("or")}</p>
      </div>

      <Button
        disabled={store.isPending}
        variant="outline"
        onClick={async () => {
          const currentDeviceId = await fingerprint();
          window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL}/${currentDeviceId}`;
        }}
        className="flex w-full items-center justify-center gap-2 py-3 text-base font-semibold shadow transition-all duration-200"
      >
        <Image src="/svg/google.svg" alt="google" width={24} height={24} className="h-6 w-6" />
        <span>{t.page.login("enter_with_google")}</span>
      </Button>

      <div className="m-5 flex w-full flex-col items-center gap-2 border-t pt-5">
        <p className="text-muted-foreground text-sm">
          {t.page.login("already_account")}{" "}
          <Link
            className="text-primary font-semibold transition-all duration-200 hover:text-blue-400 hover:underline hover:underline-offset-2"
            href="/auth/login"
          >
            {t.page.login("do_login")}
          </Link>
        </p>
      </div>
    </div>
  );
};
