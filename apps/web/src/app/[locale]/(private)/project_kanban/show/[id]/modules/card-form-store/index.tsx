"use client";

import { useEffect } from "react";

import { project_kanban, project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui";

import { hookValidate } from "@repo/form";

import { useKanbanShow } from "../../context";
import { useForm } from "./use-form";

interface CardFormStoreProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: project_kanban_cycle_card;
  loading?: boolean;
  onSubmit: (data: Partial<project_kanban_cycle_card>) => void;
  kanban?: project_kanban;
  anchor?: project_kanban_cycle_card;
}

export const CardFormStore = ({
  open,
  onOpenChange,
  item,
  onSubmit,
  loading,
  kanban,
  anchor,
}: CardFormStoreProps) => {
  const t = useLang();
  const tKanban = t.page.kanban;

  const { Form, formProps, hook, isDirty, isError } = useForm({
    disabled: !!loading,
    project_id: kanban?.project_id,
    anchor,
  });

  const { unload } = useKanbanShow();

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

  useEffect(() => {
    unload.handleState({
      feature: "card",
      dirty: isDirty,
      modes: ["store"],
    });
  }, [isDirty]);

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={tKanban("card-form-store.title")}
      description={tKanban("card-form-store.description")}
      loading={loading}
      height={500}
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
