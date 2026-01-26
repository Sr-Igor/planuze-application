"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { RotateCcw } from "lucide-react";

import { useAuth } from "@repo/api/web";
import { hookValidate } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { CenterTemplate } from "@repo/templates";
import { Button } from "@repo/ui";

import { useUserSet } from "@/hooks/user-set";

import { useForm } from "./use-form";

export default function Reset() {
  const t = useLang();

  const route = useRouter();
  const code = useSearchParams().get("code")!;

  const { Form, formProps, hook, isDirty } = useForm();

  useEffect(() => {
    if (!code) {
      route.push(`/auth/error?error=${t.error("invalid_code")}`);
    }
  }, [code]);

  const { setter } = useUserSet();

  const { reset } = useAuth({
    callbacks: {
      reset: {
        onSuccess: setter,
      },
    },
  });

  const handleSubmit = () => {
    const hooks = [{ hook }];
    hookValidate(hooks, (form) => {
      reset.mutate({ code, body: form });
    });
  };

  return (
    <CenterTemplate>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="mb-2 text-2xl font-bold">{t.page.reset("title")}</p>
        <p className="text-muted-foreground mb-10 text-sm">{t.page.reset("description")}</p>
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
          disabled={!isDirty}
          loading={reset.isPending}
          onClick={handleSubmit}
          className="mt-10 w-full py-3 text-base font-semibold shadow-sm transition-all duration-200"
        >
          <RotateCcw />
          <span>{t.page.reset("reset")}</span>
        </Button>
      </div>
    </CenterTemplate>
  );
}
