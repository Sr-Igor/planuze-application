"use client";

import { useEffect } from "react";

import { AlertCircleIcon } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Alert, AlertDescription, AlertTitle, Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { IUseHookProps } from "@/templates/card-list/cards/register/types";
import { hookValidate } from "@repo/form";

import { useKanbanShow } from "../../context";
import { Feature } from "../../types";

interface ModalFormProps<T extends { id: string }> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: T;
  loading?: boolean;
  onSubmit: (data: T) => void;
  useForm: (props: IUseHookProps<T>) => any;
  title: string;
  description: string;
  feature: Feature;
  alert?: {
    variant?: "destructive" | "default";
    title?: string;
    description?: string;
  };
}

export const ModalForm = <T extends { id: string }>({
  open,
  onOpenChange,
  item,
  onSubmit,
  loading,
  useForm,
  title,
  description,
  feature,
  alert,
}: ModalFormProps<T>) => {
  const t = useLang();

  const { Form, formProps, hook, isDirty, isError } = useForm({
    disabled: false,
    item,
  });

  const { unload } = useKanbanShow();

  //Handlers
  const handleSubmit = () => {
    const hooks = [{ hook, data: item }];
    hookValidate(hooks, (form) => {
      onSubmit(form);
    });
  };

  useEffect(() => {
    if (!open) setTimeout(() => hook.reset(), 100);
  }, [open]);

  useEffect(() => {
    unload.handleState({
      feature,
      dirty: isDirty,
      modes: [item ? "update" : "store"],
    });
  }, [isDirty]);

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      className="max-w-2xl"
      title={title}
      description={description}
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
      {alert && (
        <Alert variant={alert?.variant || "destructive"}>
          <AlertCircleIcon />
          {alert?.title && <AlertTitle>{alert?.title}</AlertTitle>}
          {alert?.description && <AlertDescription>{alert?.description}</AlertDescription>}
        </Alert>
      )}
      <Form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
        fields={formProps.fields}
        hook={hook}
        className="grid grid-cols-2 gap-4"
      />
    </AppDialog>
  );
};
