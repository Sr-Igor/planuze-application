"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { SendHorizontal } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { useAuth } from "@repo/api/web/callers/auth";
import { CenterTemplate } from "@/templates/center";
import { hookValidate } from "@repo/form";

import { useForm } from "./use-form";

export default function Recovery() {
  const [sent, setSent] = useState(false);
  const t = useLang();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const route = useRouter();

  const { Form, formProps, hook, isDirty } = useForm({ email });

  const { recovery } = useAuth({
    callbacks: {
      recovery: {
        onSuccess: () => {
          setSent(true);
        },
      },
    },
  });

  const handleSubmit = () => {
    const hooks = [{ hook }];
    hookValidate(hooks, (form) => {
      recovery.mutate(form);
    });
  };

  return (
    <CenterTemplate>
      <div className="flex w-full flex-col items-center justify-start overflow-hidden p-4">
        <p className="mb-2 text-xl font-bold md:text-2xl">
          {email ? t.page.recovery("title_no_password") : t.page.recovery("title")}
        </p>
        <p className="text-muted-foreground mb-10 text-center text-sm">
          {email ? t.page.recovery("description_no_password") : t.page.recovery("description")}
        </p>
        {!sent && (
          <>
            <Form
              {...formProps}
              hook={hook}
              className="mb-2 grid w-full max-w-[320px] grid-cols-1 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                isDirty && handleSubmit();
              }}
            />

            <Button
              disabled={!isDirty}
              loading={recovery.isPending}
              onClick={handleSubmit}
              className="mt-2 w-[200px] py-3 text-base font-semibold shadow-sm transition-all duration-200"
            >
              <SendHorizontal />
              <span>{t.page.recovery("send_recovery")}</span>
            </Button>
          </>
        )}
        {sent && (
          <>
            <p className="text-foreground text-md mb-10 text-center">
              {email ? t.page.recovery("sent_no_password") : t.page.recovery("sent")} <br />
              {t.page.recovery("check_spam")}
            </p>
          </>
        )}
        <Button
          variant="outline"
          className="mt-5 w-[200px]"
          onClick={() => route.back()}
          disabled={recovery.isPending}
        >
          {t.helper("back")}
        </Button>
      </div>
    </CenterTemplate>
  );
}
