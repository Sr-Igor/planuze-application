"use client";

import { useEffect } from "react";

import { IValidatorRequest } from "@deviobr/validator";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { useFormList } from "@/hooks/form";
import { Field } from "@/hooks/form/types";
import { hookValidate } from "@repo/utils/submitForm";

import { IRenameProps } from "../types/interfaces";

interface RenameDialogProps {
  rename?: IRenameProps;
  onRename: (file: { id: string; name: string }, index: number) => void;
  onClose: () => void;
  disabled?: boolean;
}

export const RenameDialog = ({
  rename,
  onRename,
  onClose,
  disabled = false,
}: RenameDialogProps) => {
  const t = useLang();

  const schema: IValidatorRequest = {
    body: [
      {
        key: "name",
        method: "string",
        coerse: "string",
      },
    ],
  };

  const fields: Field<Partial<{ name: string }>>[] = [
    {
      field: "input",
      name: "name",
      label: "name",
      className: "col-span-2",
      disabled,
    },
  ];

  const { hook, formProps, Form, isDirty, isError } = useFormList<Partial<{ name: string }>>({
    fields,
    schema,
    values: rename?.item,
  });

  const handleSubmit = () => {
    const hooks = [{ hook, data: rename?.item }];
    hookValidate(hooks, (form) => {
      onRename({ id: rename!.item!.id!, name: form.name }, rename!.index!);
      onClose();
    });
  };

  useEffect(() => {
    if (rename?.open) {
      // Reset form when dialog opens
      hook.reset();
    }
  }, [rename?.open, hook]);

  return (
    <AppDialog
      open={rename?.open || false}
      onOpenChange={onClose}
      title={t.helper("rename_file")}
      description={t.helper("rename_file_description")}
      loading={false}
      footer={
        <Button
          onClick={handleSubmit}
          className="w-full"
          type="submit"
          data-testid="submit-button"
          loading={false}
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
