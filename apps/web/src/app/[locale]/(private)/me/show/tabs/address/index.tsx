"use client";

import { profile } from "@repo/types";

import { cn } from "@repo/ui";
import { DataForm } from "@/templates/data-form";
import { useShow } from "@/templates/show/context";

import { useForm } from "./use-form";

export const Address = () => {
  const { data } = useShow<profile>();
  const address = data?.profile_address;

  const { Form, formProps, hook } = useForm({ data: address });

  return (
    <DataForm data={address} isDirty={false} isError={false} loading={false}>
      <Form
        {...formProps}
        hook={hook}
        onlyRead
        className={cn(
          "grid grid-cols-1 gap-3 max-md:flex max-md:flex-col max-md:p-6 lg:grid-cols-3 xl:grid-cols-6"
        )}
      />
    </DataForm>
  );
};
