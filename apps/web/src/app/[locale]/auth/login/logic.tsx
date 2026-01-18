"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { LogInIcon } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui-new";

import { useAuth } from "@repo/api/web/callers/auth";
import { useUserSet } from "@/hooks/user-set";
import { fingerprint } from "@repo/utils/fingerprint";
import { hookValidate } from "@repo/form";

import { useForm, FormType } from "./use-form";

export const AuthLogic = () => {
  const t = useLang();

  const route = useRouter();
  const pathname = usePathname();
  const isAuth = pathname.includes("/auth/login");

  const { setter } = useUserSet(isAuth ? "/dashboard" : null);

  const { login } = useAuth({
    callbacks: {
      login: {
        onSuccess: setter,
      },
    },
  });

  const { Form, formProps, hook, isDirty } = useForm();

  const handleSubmit = () => {
    hookValidate(
      [{ hook }],
      (form: FormType) => {
        login.mutate(form);
      },
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-10">
      <Form
        {...formProps}
        className="mb-2 grid w-full grid-cols-1 gap-4"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (isDirty) {
            handleSubmit();
          }
        }}
      />
      <div className="mb-5 flex w-full justify-end">
        <button
          className="text-primary text-sm hover:text-blue-400 hover:underline hover:underline-offset-2"
          onClick={() => route.push("/auth/recovery")}
        >
          Esqueceu sua senha?
        </button>
      </div>
      <Button
        disabled={!isDirty || login.isPending}
        onClick={handleSubmit}
        className="mt-2 w-full py-3 text-base font-semibold shadow-sm transition-all duration-200"
      >
        <LogInIcon />
        <span>{t.page.login("enter")}</span>
      </Button>

      <div className="m-2 flex flex-col items-center gap-2">
        <p className="text-muted-foreground text-sm">{t.page.login("or")}</p>
      </div>

      <Button
        disabled={login.isPending}
        variant="outline"
        onClick={async () => {
          const currentDeviceId = await fingerprint();
          globalThis.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL}/${currentDeviceId}`;
        }}
        className="flex w-full items-center justify-center gap-2 py-3 text-base font-semibold shadow transition-all duration-200"
      >
        <Image src="/svg/google.svg" alt="google" width={24} height={24} className="h-6 w-6" />
        <span>{t.page.login("enter_with_google")}</span>
      </Button>
      <div className="m-5 flex w-full flex-col items-center gap-2 border-t pt-5">
        <p className="text-muted-foreground text-sm">
          {t.page.login("not_account")}{" "}
          <Link
            className="text-primary font-semibold transition-all duration-200 hover:text-blue-400 hover:underline hover:underline-offset-2"
            href="/auth/register"
          >
            {t.page.login("create_account")}
          </Link>
        </p>
      </div>
    </div>
  );
};
