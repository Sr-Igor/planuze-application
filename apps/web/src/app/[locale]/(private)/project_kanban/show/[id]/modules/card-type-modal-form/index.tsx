"use client";

import { useEffect, useState } from "react";

import { useLang } from "@repo/language/hooks";
import { Button , AppDialog } from "@repo/ui";

import { AppTabs } from "@/components/app-tabs";
import { hookValidate } from "@repo/form";

import { useKanbanShow } from "../../context";
import { useForm } from "../drawers/card-type/use-form";
import { useTemplateForm } from "../drawers/card-type/use-template-form";

interface CardTypeModalFormProps<T extends { id: string }> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: T;
  loading?: boolean;
  onSubmit: (data: T) => void;
}

export const CardTypeModalForm = <T extends { id: string }>({
  open,
  onOpenChange,
  item,
  onSubmit,
  loading,
}: CardTypeModalFormProps<T>) => {
  const t = useLang();
  const tKanban = t.page.kanban;

  const [tab, setTab] = useState("template");

  const { Form, formProps, hook, isDirty, isError } = useForm({
    disabled: false,
    item,
  });

  const { unload } = useKanbanShow();

  const {
    Form: FormTemplate,
    formProps: formPropsTemplate,
    hook: hookTemplate,
    isDirty: isDirtyTemplate,
    isError: isErrorTemplate,
  } = useTemplateForm({
    disabled: false,
  });

  //Handlers
  const handleSubmit = () => {
    const hooks = [tab === "template" ? { hook: hookTemplate } : { hook, data: item }] as any;
    hookValidate(
      hooks,
      (form) => {
        onSubmit(form);
      },
      (e) => {
        console.error(e);
      }
    );
  };

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setTab("template");
        hook.reset();
        hookTemplate.reset();
      }, 100);
    }
  }, [open]);

  useEffect(() => {
    unload.handleState({
      feature: "cardType",
      dirty: isDirty,
      modes: [item ? "update" : "store"],
    });
  }, [isDirty]);

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={tKanban("card-type-modal-form.title")}
      description={tKanban("card-type-modal-form.description")}
      loading={loading}
      footer={
        <Button
          onClick={handleSubmit}
          type="submit"
          data-testid="submit-button"
          loading={loading}
          disabled={tab === "template" ? !isDirtyTemplate || isErrorTemplate : !isDirty || isError}
          color="primary"
        >
          {t.helper("save")}
        </Button>
      }
    >
      <AppTabs
        value={tab}
        onChange={setTab}
        tabs={[
          {
            title: tKanban("card-type-modal-form.tabs.template"),
            value: "template",
            children: (
              <FormTemplate
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                fields={formPropsTemplate.fields}
                hook={hookTemplate}
                className="grid grid-cols-2 gap-4"
              />
            ),
          },
          {
            title: tKanban("card-type-modal-form.tabs.manual"),
            value: "manual",
            children: (
              <Form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                fields={formProps.fields}
                hook={hook}
                className="grid grid-cols-2 gap-4"
              />
            ),
          },
        ]}
      />
    </AppDialog>
  );
};
