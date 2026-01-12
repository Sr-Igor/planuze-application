"use client";

import { useEffect } from "react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { hookValidate } from "@repo/utils/submitForm";

import { IDialogProps } from "../types";

export const FormDialog = <T extends { id: string }>({
  open,
  setOpen,
  modalDescription,
  modalTitle,
  onSubmit,
  loading,
  state,
  handleState,
  useForm,
  requests,
  permissions,
}: IDialogProps<T>) => {
  const t = useLang();

  const { Form, formProps, hook, isDirty, isError } = useForm!({
    disabled: loading || (state.item ? !permissions.update : !permissions.store),
    state,
    handleState,
    requests,
  });

  //Handlers
  const handleSubmit = () => {
    const hooks = [{ hook, data: state.item }];
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
      onOpenChange={setOpen}
      title={modalTitle}
      description={modalDescription}
      loading={loading}
      footer={
        <Button
          onClick={handleSubmit}
          className="w-full"
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
      <Form
        onSubmit={(e) => {
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
