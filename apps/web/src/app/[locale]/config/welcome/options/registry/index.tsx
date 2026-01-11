"use client";

import { LogInIcon } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { hookValidate } from "@/utils/submitForm";

import { useForm } from "./use-form";

export interface IRegistryProps {
  onStore: (data: any) => void;
  loading: boolean;
}

export const Registry = ({ onStore, loading }: IRegistryProps) => {
  const t = useLang();

  const { Form, formProps, hook, isDirty } = useForm({ disabled: loading });

  const handleSubmit = () => {
    const hooks = [{ hook }];
    hookValidate(hooks, (form) => {
      onStore({ ...form });
    });
  };

  return (
    <>
      <Form
        {...formProps}
        hook={hook}
        className="mb-2 grid w-full grid-cols-1 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          isDirty && handleSubmit();
        }}
      />
      <Button
        disabled={!isDirty}
        loading={loading}
        onClick={handleSubmit}
        className="mt-4 w-full py-3 text-base font-semibold shadow-sm transition-all duration-200"
      >
        <LogInIcon />
        <span>{t.page.login("register")}</span>
      </Button>
    </>
  );
};
