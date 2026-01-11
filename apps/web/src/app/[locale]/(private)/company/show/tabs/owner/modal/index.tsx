"use client";

import { useEffect } from "react";

import { AlertCircleIcon } from "lucide-react";

import { profile, user } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { Alert, AlertDescription, Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { NeedRedefine } from "@/app/[locale]/(private)/my_profile/components/NeedRedefine";
import { cn } from "@/lib/utils";
import { hookValidate } from "@/utils/submitForm";

import { useForm } from "./use-form";

interface ModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
  onSubmit: (data: { profile_id: string }) => void;
  user?: user | null;
  profile?: profile | null;
}

export const ModalForm = ({
  open,
  onOpenChange,
  profile,
  onSubmit,
  loading,
  user,
}: ModalFormProps) => {
  const t = useLang();

  const { Form, formProps, hook, isDirty, isError } = useForm({
    disabled: false,
    profile,
  });

  //Handlers
  const handleSubmit = () => {
    const hooks = [{ hook }];
    hookValidate(hooks, (form) => {
      onSubmit(form);
    });
  };

  useEffect(() => {
    if (!open) setTimeout(() => hook.reset(), 100);
  }, [open]);
  const needRedefine = user?.need_reset;

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t.page.company("show.owner.modal.title")}
      description={t.page.company("show.owner.modal.description")}
      className={cn(needRedefine && "min-w-4xl")}
      loading={loading}
      footer={
        <Button
          onClick={handleSubmit}
          type="submit"
          data-testid="submit-button"
          loading={loading}
          disabled={!isDirty || isError}
          color="primary"
        >
          {t.helper("save")}
        </Button>
      }
    >
      <>
        {needRedefine && <NeedRedefine user={user} />}
        {!needRedefine && (
          <>
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertDescription className="text-xs font-semibold">
                {t.page.company("show.owner.modal.alert_title")}
              </AlertDescription>
            </Alert>
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleSubmit();
              }}
              fields={formProps.fields}
              hook={hook}
              className="grid grid-cols-2 gap-4"
            />
          </>
        )}
      </>
    </AppDialog>
  );
};
