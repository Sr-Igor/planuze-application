import { useEffect, useState } from "react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { project_kanban_cycle_card_type } from "@/api/generator/types";
import { CustomDelete } from "@/app/[locale]/(private)/project_kanban/show/[id]/modules/delete";
import { hookValidate } from "@/utils/submitForm";

import { useForm } from "./use-form";

interface DestroyCardTypeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDestroy: (form: any) => void;
  loading?: boolean;
  item?: project_kanban_cycle_card_type;
}

export const DestroyCardType = ({
  open,
  onOpenChange,
  onDestroy,
  loading,
  item,
}: DestroyCardTypeProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const [value, setValue] = useState("transfer");

  const { Form, formProps, hook } = useForm({
    disabled: false,
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
      title={t("delete.cardType.title")}
      description={t("delete.cardType.description")}
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
