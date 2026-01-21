"use client";

import { useEffect } from "react";

import { hookValidate } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import { AppDialog, Button } from "@repo/ui";

import { GenericItem, IFormDialogProps } from "../../type";

export const FormDialog = <T,>({
  open,
  setOpen,
  onSubmit,
  loading,
  state,
  useForm,
  page,
  translate,
  data,
  indexData,
}: IFormDialogProps<GenericItem<T>>) => {
  const t = useLang();

  const { Form, formProps, hook, isDirty, isError, config } = useForm({
    disabled: loading,
    state,
    data,
    indexData,
  });

  //Handlers
  const handleSubmit = () => {
    const hooks = [{ hook, data: state.item }];
    hookValidate(hooks, (form) => {
      onSubmit(form);
    });
  };

  useEffect(() => {
    if (!open) hook.reset(state.item || config?.defaultValues);
  }, [open]);

  return (
    <AppDialog
      open={open}
      onOpenChange={(open) => setOpen({ open })}
      title={
        state.mode === "store"
          ? t.page[page](`${translate}.modal.store.title`)
          : t.page[page](`${translate}.modal.update.title`)
      }
      description={
        state.mode === "store"
          ? t.page[page](`${translate}.modal.store.description`)
          : t.page[page](`${translate}.modal.update.description`)
      }
      loading={loading}
      footer={
        <Button
          onClick={handleSubmit}
          className="w-full"
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
