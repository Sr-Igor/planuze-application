import { useEffect, useState } from "react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { project_kanban_cycle_card } from "@/api/generator/types";
import { CustomDelete } from "@/app/[locale]/(private)/project_kanban/show/[id]/modules/delete";
import { hookValidate } from "@/utils/submitForm";

import { useForm } from "./use-form";

interface DestroyCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDestroy: (form: any) => void;
  loading?: boolean;
  item?: project_kanban_cycle_card;
}

export const DestroyCard = ({ open, onOpenChange, onDestroy, loading, item }: DestroyCardProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const isPrincipal = item?.project_kanban_cycle_card_type?.principal;

  const [value, setValue] = useState("unlink_cards");

  const { Form, formProps, hook } = useForm({
    disabled: !!loading,
    item,
  });

  const handleSubmit = async () => {
    if (!isPrincipal || value === "unlink_cards") {
      onDestroy({ unlink_cards: true });
    } else if (value === "delete_cards") {
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
        setValue("unlink_cards");
      }, 100);
    }
  }, [open]);
  return (
    <AppDialog
      title={t("delete.card.title")}
      description={t("delete.card.description")}
      open={open}
      loading={loading}
      onOpenChange={onOpenChange}
      footer={
        <Button variant="destructive" onClick={handleSubmit} loading={loading}>
          {lang.helper("delete")}
        </Button>
      }
    >
      {isPrincipal && (
        <CustomDelete
          Form={Form}
          formProps={formProps}
          hook={hook}
          value={value}
          setValue={setValue}
          loading={loading}
          options={[
            {
              label: t("delete.options.unlink_cards"),
              value: "unlink_cards",
              className: "border-yellow-500 bg-yellow-900/50",
            },
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
      )}
    </AppDialog>
  );
};
