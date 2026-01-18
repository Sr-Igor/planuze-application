"use client";

import { useEffect, useState } from "react";

import { project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { hookValidate } from "@repo/form";

import { useKanbanShow } from "../../context";
import { CustomDelete } from "../delete";
import { useForm } from "./use-form";

interface CardFormMoveProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: project_kanban_cycle_card;
  loading?: boolean;
  onSubmit: (data: Partial<project_kanban_cycle_card>) => void;
}

export const CardFormMove = ({
  open,
  onOpenChange,
  item,
  onSubmit,
  loading,
}: CardFormMoveProps) => {
  const t = useLang();
  const tKanban = t.page.kanban;

  const isPrincipal = item?.project_kanban_cycle_card_type?.principal;

  const { Form, formProps, hook, isDirty, isError, config } = useForm({
    disabled: !!loading,
    card: item,
  });

  const { unload } = useKanbanShow();

  const [value, setValue] = useState("move_cards");

  //Handlers
  const handleSubmit = () => {
    const hooks = [{ hook, data: { card_id: item?.card_id } }];
    hookValidate(hooks, (form) => {
      if (config.cycleId !== item?.project_kanban_cycle_id && !form.card_id) {
        form.card_id = null;
      }

      onSubmit({ ...form, action: value });
    });
  };

  useEffect(() => {
    if (!open) setTimeout(() => hook.reset(), 100);
  }, [open]);

  useEffect(() => {
    unload.handleState({
      feature: "card",
      dirty: isDirty,
      modes: ["move"],
    });
  }, [isDirty]);

  const cycleId = hook.watch("project_kanban_cycle_id");
  const isDiffCycle = cycleId !== item?.project_kanban_cycle_id;

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={tKanban("card-form-move.title")}
      description={tKanban("card-form-move.description")}
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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        fields={formProps.fields}
        hook={hook}
        className="grid grid-cols-2 gap-4"
      />
      {isPrincipal && isDiffCycle && (
        <CustomDelete
          value={value}
          setValue={setValue}
          loading={loading}
          options={[
            {
              label: tKanban("delete.options.move_cards"),
              value: "move_cards",
              className: "border-blue-500 bg-blue-900/50",
            },
            {
              label: tKanban("delete.options.unlink_cards"),
              value: "unlink_cards",
              className: "border-yellow-500 bg-yellow-900/50",
            },
          ]}
        />
      )}
    </AppDialog>
  );
};
