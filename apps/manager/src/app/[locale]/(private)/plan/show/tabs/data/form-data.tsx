"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { usePlan } from "@repo/api/manager";
import { hookValidate, useFormList } from "@repo/form";
import { useUnload } from "@repo/hooks";
import { useLang } from "@repo/language/hooks";
import { Button, cn } from "@repo/ui";

import { AppTabs } from "@/components/app-tabs";

import { usePlanShow } from "../../context";
import { FormType, useFields } from "./hooks";

export const FormData = () => {
  const router = useRouter();
  const t = useLang();

  const { data, handleState } = usePlanShow();
  const [currentTab, setCurrentTab] = useState<"free" | "paid">("paid");
  const {
    defaultValues,
    generalFields,
    freeFields,
    paidFields,
    generalSchema,
    freeSchema,
    paidSchema,
  } = useFields({
    disabled: false,
    item: data,
  });

  useEffect(() => {
    setCurrentTab(data?.price ? "paid" : "free");
  }, [data?.price]);

  const generalForm = useFormList<FormType>({
    fields: generalFields,
    schema: generalSchema,
    values: data,
    defaultValues,
  });

  const freeForm = useFormList<FormType>({
    fields: freeFields,
    schema: freeSchema,
    values: data,
    defaultValues,
  });

  const paidForm = useFormList<FormType>({
    fields: paidFields,
    schema: paidSchema,
    values: data,
    defaultValues,
  });

  const currency = paidForm.hook.watch("currency");

  const isDirty =
    generalForm.isDirty || (currentTab === "paid" ? paidForm.isDirty : freeForm.isDirty);
  const isError =
    generalForm.isError || (currentTab === "paid" ? paidForm.isError : freeForm.isError);

  useUnload(isDirty, (dirty) => handleState({ dirty }));

  const handleSubmit = () => {
    const hooks = [{ hook: generalForm.hook, data }];

    if (currentTab === "paid") {
      hooks.push({ hook: paidForm.hook, data });
    } else {
      hooks.push({ hook: freeForm.hook, data });
    }

    handleState({ loading: true });
    hookValidate(hooks, (form) => {
      const newForm = { ...form };

      if (currentTab === "paid") {
        newForm.free_test = null;
      } else {
        newForm.price = null;
        newForm.is_popular = false;
      }

      data?.id ? update.mutate(newForm) : store.mutate(newForm);
    });
  };

  const { update, store } = usePlan({
    id: data?.id,
    callbacks: {
      store: {
        onSuccess: (e) => {
          router.replace(`/plan/show/${e.id}`);
        },
      },
      update: {
        onSuccess: (e) => handleState({ loading: false }),
        onError: () => handleState({ loading: false }),
      },
    },
  });

  return (
    <span
      className="relative flex w-full flex-col justify-between gap-4 p-3 md:p-5"
      style={{ maxHeight: "calc(100vh - 400px)" }}
    >
      <generalForm.Form
        {...generalForm.formProps}
        hook={generalForm.hook}
        className={cn("grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4")}
        onSubmit={(e) => {
          e.preventDefault();
          generalForm.isDirty && handleSubmit();
        }}
      />

      <div className="mt-5 w-[50%]">
        <AppTabs
          headerClassName="px-2 sm:px-5 min-w-max"
          value={currentTab}
          onChange={(tab) => {
            setCurrentTab(tab as any);
          }}
          tabs={[
            {
              title: t.helper("paid"),
              value: "paid" as const,
              children: (
                <paidForm.Form
                  {...paidForm.formProps}
                  hook={paidForm.hook}
                  fields={paidForm.formProps.fields.map((field) => {
                    if (field.name === "price") {
                      return {
                        ...field,
                        currency,
                        onCurrencyChange: (currency: string) => {
                          paidForm.hook.setValue("currency", currency);
                        },
                      };
                    }
                    return field;
                  })}
                  className={cn("grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3")}
                  onSubmit={(e) => {
                    e.preventDefault();
                    paidForm.isDirty && handleSubmit();
                  }}
                />
              ),
            },
            {
              title: t.helper("free"),
              value: "free" as const,
              children: (
                <freeForm.Form
                  {...freeForm.formProps}
                  hook={freeForm.hook}
                  className={cn("grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3")}
                  onSubmit={(e) => {
                    e.preventDefault();
                    freeForm.isDirty && handleSubmit();
                  }}
                />
              ),
            },
          ]}
          className="w-full"
        />
      </div>

      <span className="mt-5 flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-end">
        <Button
          variant={"outline"}
          disabled={update.isPending || store.isPending}
          onClick={() => {
            isDirty ? handleState({ cancel: true }) : router.back();
          }}
          className="w-full text-xs md:w-auto md:text-sm"
        >
          {isDirty ? t.helper("cancel") : t.helper("back")}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isDirty || isError || update.isPending || store.isPending}
          className="w-full text-xs md:w-auto md:text-sm"
        >
          {t.helper("save")}
        </Button>
      </span>
    </span>
  );
};
