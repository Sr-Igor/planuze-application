"use client";

import { useEffect } from "react";

import { AlertCircleIcon } from "lucide-react";

import { hookValidate } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { project_kanban_cycle_card } from "@repo/types";
import { Alert, AlertDescription, AlertTitle, AppDialog, Button } from "@repo/ui";

import { useKanbanShow } from "../../context";
import { useForm } from "./use-form";

interface CardFormChangeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: project_kanban_cycle_card;
  loading?: boolean;
  onSubmit: (data: Partial<project_kanban_cycle_card>) => void;
}

export const CardFormChange = ({
  open,
  onOpenChange,
  item,
  onSubmit,
  loading,
}: CardFormChangeProps) => {
  const t = useLang();
  const tKanban = t.page.kanban;

  const { Form, formProps, hook, isDirty, isError } = useForm({
    disabled: !!loading,
    card: item,
  });

  const { unload, data } = useKanbanShow();

  const cardType = data.cardsTypes?.find(
    (cardType) => cardType.id === item?.project_kanban_cycle_card_type_id
  );

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
      feature: "card",
      dirty: isDirty,
      modes: ["change"],
    });
  }, [isDirty]);

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={tKanban("card-form-change.title")}
      description={tKanban("card-form-change.description")}
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
      {cardType?.principal && (
        <Alert variant="default">
          <AlertCircleIcon />
          <AlertTitle>{tKanban("card-form-change.caution.title")}</AlertTitle>
          <AlertDescription>{tKanban("card-form-change.caution.description")}</AlertDescription>
        </Alert>
      )}
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
