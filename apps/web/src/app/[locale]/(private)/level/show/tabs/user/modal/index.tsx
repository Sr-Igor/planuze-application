"use client";

import { useEffect } from "react";

import { AlertCircleIcon } from "lucide-react";

import { profile } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Alert, AlertDescription, Button } from "@repo/ui-new";
import { AppDialog } from "@repo/ui-new";

import { hookValidate } from "@repo/form";

import { useForm } from "./use-form";

interface ModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
  onSubmit: (data: { profile_id: string }) => void;
  profiles: profile[];
}

export const ModalForm = ({ open, onOpenChange, profiles, onSubmit, loading }: ModalFormProps) => {
  const t = useLang();

  const { Form, formProps, hook, isDirty, isError } = useForm({
    disabled: false,
    profiles,
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

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t.page.level("show.profile.define_user")}
      description={t.page.level("show.profile.define_user_description")}
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
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertDescription className="text-xs font-semibold">
            {t.page.level("show.profile.define_user_alert_title")}
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
    </AppDialog>
  );
};
