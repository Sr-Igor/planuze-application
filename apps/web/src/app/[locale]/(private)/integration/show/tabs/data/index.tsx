"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { BookOpenText, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { useLang } from "@repo/language/hook";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";

import { useIntegration } from "@/api/callers/integration";
import { integration } from "@/api/generator/types";
import { useLogs } from "@/hooks/logs";
import { useUnload } from "@repo/hooks/unload";
import { cn } from "@/lib/utils";
import { DataForm } from "@/templates/data-form";
import { useShow } from "@/templates/show/context";
import { hookValidate } from "@/utils/submitForm";

import { useForm } from "./use-form";

export const Data = () => {
  const logs = useLogs();
  const router = useRouter();
  const t = useLang();

  const [response, setResponse] = useState<{
    token: string;
    redirect: string;
  } | null>(null);

  const handleCloseToken = () => {
    response?.redirect && router.replace(response?.redirect);
  };

  const { data, handleState, permissions } = useShow<integration>();

  const canEdit = data?.id ? permissions.update : permissions.store;

  const { Form, formProps, hook, isDirty, isError } = useForm({
    data,
    disabled: !canEdit,
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

  const handleDiscard = () => {
    hook.reset(data || {});
    handleState({ dirty: false });
  };

  const { update, store } = useIntegration({
    id: data?.id,
    callbacks: {
      store: {
        onSuccess: (d) => {
          const e = d as integration;
          hook.reset();
          handleState({ loading: false, dirty: false });
          setResponse({ token: e.token, redirect: `/integration/show/${e.id}` });
        },
      },
      update: {
        onSuccess: (e) => handleState({ loading: false }),
        onError: () => handleState({ loading: false }),
      },
    },
  });

  return (
    <>
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
        logs={logs.integration()}
      >
        <Form
          {...formProps}
          hook={hook}
          className={cn("grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-2")}
          onSubmit={(e) => {
            e.preventDefault();
            isDirty && handleSubmit();
          }}
        />
      </DataForm>
      <Dialog open={!!response?.token} onOpenChange={(e) => !e && handleCloseToken()}>
        <DialogContent>
          <DialogTitle className="text-2xl font-semibold">
            {t.page.integration("show.token.title")}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {t.page.integration("show.token.description")}
          </DialogDescription>
          <DialogHeader className="flex flex-col items-start justify-start gap-4 p-2">
            <div className="bg-muted flex w-full items-center justify-center gap-2 rounded-md p-2">
              <p className="max-w-[320px] flex-1 truncate text-sm">{response?.token}</p>
              <Button
                variant={"outline"}
                onClick={() => {
                  response?.token && navigator.clipboard.writeText(response?.token);
                  toast.info(t.helper("copied"));
                }}
              >
                <CopyIcon className="size-4" size={16} />
                <span className="text-xs">{t.helper("copy")}</span>
              </Button>
            </div>

            <div className="mt-4 flex flex-col gap-2 rounded-md border border-blue-500 bg-blue-900/50 p-2">
              <p className="text-[12px] font-semibold text-white">
                {t.page.integration("show.token.warning")}
              </p>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"default"}
              onClick={() => window.open(process.env.NEXT_PUBLIC_API_DOCS, "_blank")}
            >
              <BookOpenText />
              <span className="text-xs">{t.helper("api_docs")}</span>
            </Button>
            <Button variant={"secondary"} onClick={handleCloseToken}>
              <span>{t.helper("close")}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
