import { useEffect, useState } from "react";

import { project_kanban_cycle_column } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { hookValidate } from "@repo/utils/submitForm";

import { CustomDelete } from "..";
import { useForm } from "./use-form";

interface DestroyColumnProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDestroy: (form: any) => void;
  loading?: boolean;
  item?: project_kanban_cycle_column;
}

export const DestroyColumn = ({
  open,
  onOpenChange,
  onDestroy,
  loading,
  item,
}: DestroyColumnProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { page } = useKanbanShow();

  const [value, setValue] = useState("transfer");

  const { Form, formProps, hook } = useForm({
    disabled: false,
    cycle: page.cycle,
    item,
  });

  const handleSubmit = async () => {
    if (value === "delete_cards") {
      onDestroy({ delete_cards: true });
      return;
    }

    const hooks = [{ hook }];
    hookValidate(hooks, (form) => {
      onDestroy(form);
    });
  };

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        hook.reset();
        setValue("transfer");
      }, 100);
    }
  }, [open]);

  return (
    <AppDialog
      title={t("delete.column.title")}
      description={t("delete.column.description")}
      open={open}
      loading={loading}
      onOpenChange={onOpenChange}
      footer={
        <Button variant="destructive" onClick={handleSubmit} loading={loading}>
          {lang.helper("delete")}
        </Button>
      }
    >
      <CustomDelete
        Form={Form}
        formProps={formProps}
        hook={hook}
        value={value}
        setValue={setValue}
        options={[
          {
            label: t("delete.options.delete_cards"),
            value: "delete_cards",
            className: "border-red-500 bg-red-900/50",
          },
          {
            label: t("delete.options.transfer"),
            value: "transfer",
            className: "border-blue-500 bg-blue-900/50",
          },
        ]}
      />
    </AppDialog>
  );
};
