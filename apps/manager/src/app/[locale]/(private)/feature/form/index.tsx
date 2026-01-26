"use client";

import { useEffect, useState } from "react";

import { useAction, useModule } from "@repo/api/manager";
import { hookValidate, useFormList } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { feature } from "@repo/types";
import { AppDialog, Button, Checkbox } from "@repo/ui";

import { Square } from "./square";
import { FormType, useFields } from "./use-fields";

export interface IDialogProps {
  modalTitle?: string;
  modalDescription?: string;
  onSubmit: (data: FormType) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  loading?: boolean;
  values?: feature;
}

export const FormDialog = ({
  open,
  setOpen,
  modalDescription,
  modalTitle,
  onSubmit,
  loading,
  values,
}: IDialogProps) => {
  const t = useLang();

  const { index: modulesIndex } = useModule({ enabledIndex: true, filters: {} });
  const modules = modulesIndex.data?.data || [];
  const modulesOptions = modules.map((mod: any) => ({ label: mod.title, value: mod.id }));

  const { index: actionsIndex } = useAction({
    enabledIndex: true,
  });

  const actions = actionsIndex.data?.data || [];
  const actionsOptions = actions.map((action) => ({ label: action.title, value: action.id }));

  const { fields, defaultValues, schema } = useFields({ disabled: loading, modulesOptions });

  const { Form, formProps, hook } = useFormList({
    fields,
    schema,
    defaultValues,
    values: values || defaultValues,
  });

  //Handlers
  const handleSubmit = () => {
    const hooks = [{ hook, data: values }];
    hookValidate(hooks, (form) => {
      onSubmit({ ...form, actions: acts?.join(",") });
    });
  };

  const [acts, setActs] = useState<string[]>(values?.actions?.split(",") || []);

  useEffect(() => {
    setActs(values?.actions?.split(",") || []);
  }, [open]);

  const handleActions = (value: string) => {
    if (acts.includes(value)) {
      setActs(acts.filter((act) => act !== value));
    } else {
      setActs([...acts, value]);
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
      title={modalTitle}
      description={modalDescription}
      className="w-800px! max-w-[90vw]!"
      footer={
        <Button onClick={handleSubmit} type="submit" data-testid="submit-button" color="primary">
          {t.helper("save")}
        </Button>
      }
    >
      <Square />
      <Form
        onSubmit={handleSubmit}
        fields={formProps.fields}
        hook={hook}
        className="grid grid-cols-12 gap-4"
      />

      <div className="bg-sidebar-accent rounded-md p-4">
        <p className="mb-3 text-sm font-semibold">{t.feature("actions_available")}</p>
        <div className="grid grid-cols-3 gap-4">
          {actionsOptions?.map((action, idx) => (
            <label
              htmlFor={`${action.value}-${idx}`}
              key={`${action.value}-${idx}`}
              className="bg-background flex items-center gap-2 rounded-md p-2"
            >
              <Checkbox
                className="bg-gray-500"
                id={`${action.value}-${idx}`}
                checked={acts.includes(action.value)}
                onCheckedChange={() => handleActions(action.value)}
              />
              {t.permission(`${action.label}`)}
            </label>
          ))}
        </div>
      </div>
    </AppDialog>
  );
};
