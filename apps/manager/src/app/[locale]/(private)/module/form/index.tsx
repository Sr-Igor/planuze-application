"use client";

import { hookValidate, useFormList } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { company } from "@repo/types";
import { AppDialog, Button } from "@repo/ui";

import { FormType, useFields } from "./use-fields";

export interface IDialogProps {
  modalTitle?: string;
  modalDescription?: string;
  onSubmit: (data: FormType) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  loading?: boolean;
  values?: FormType;
  companies?: company[];
}

export const FormDialog = ({
  open,
  setOpen,
  modalDescription,
  modalTitle,
  onSubmit,
  loading,
  values,
  companies = [],
}: IDialogProps) => {
  const t = useLang();

  const { fields, defaultValues, schema } = useFields({ disabled: loading, companies });

  const { Form, formProps, hook } = useFormList({
    fields,
    schema,
    defaultValues,
    values: values || defaultValues,
  });

  const handleSubmit = () => {
    const hooks = [{ hook, data: values }];
    hookValidate(hooks, (form) => {
      onSubmit(form);
    });
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
      title={modalTitle}
      description={modalDescription}
      footer={
        <Button
          onClick={handleSubmit}
          className="w-full"
          type="submit"
          data-testid="submit-button"
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
