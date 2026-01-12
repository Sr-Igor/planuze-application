"use client";

import { useEffect } from "react";

import { project_kanban_cycle_card } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { hookValidate } from "@repo/utils/submitForm";

import { useForm } from "./use-form";

interface RestoreCardFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: project_kanban_cycle_card;
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const RestoreCardForm = ({
  open,
  onOpenChange,
  item,
  onSubmit,
  loading,
}: RestoreCardFormProps) => {
  const t = useLang();
  const tKanban = t.page.kanban;

  const { Form, formProps, hook, isError } = useForm({
    disabled: false,
    item,
    open,
  });

  //Handlers
  const handleSubmit = () => {
    const hooks = [{ hook, data: {} }];
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
      title={tKanban("drawer.cardTrash.restore.title")}
      description={tKanban("drawer.cardTrash.restore.description")}
      loading={loading}
      footer={
        <Button
          onClick={handleSubmit}
          type="submit"
          data-testid="submit-button"
          loading={loading}
          disabled={isError}
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
