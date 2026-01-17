"use client";

import { profile } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { AppAvatar } from "@/components/ui/app-avatar";
import { useIntlFormat } from "@/hooks/intl-format";
import { cn } from "@/lib/utils";
import { DataForm } from "@/templates/data-form";
import { useShow } from "@/templates/show/context";
import { timeLabel } from "@repo/utils/timeLabel";

import { useForm } from "./use-form";

export const Data = () => {
  const t = useLang();
  const { dates } = useIntlFormat();
  const { data, profile } = useShow<profile>();

  const { Form, formProps, hook } = useForm({
    data,
    profile,
  });

  return (
    <DataForm data={data} isDirty={false} isError={false} loading={false}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <AppAvatar
            src={data?.user?.avatar || ""}
            path="user/avatar"
            publicFile
            name={data?.user?.name || ""}
            className="h-10 w-10 md:h-30 md:w-30"
            fallbackClassName="text-xl md:text-5xl"
          />

          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">{data?.user?.name}</h2>
            <p className="text-sm font-semibold">{data?.user?.email}</p>
            {data?.createdAt && (
              <p className="text-muted-foreground text-xs">
                {t.page.profile("show.data.registered_at")}:{" "}
                {dates.format(new Date(data?.createdAt || ""))}
              </p>
            )}
            {data?.createdAt && (
              <p className="text-muted-foreground text-xs">
                {t.page.profile("show.data.company_time")}:{" "}
                {timeLabel({ date: data?.createdAt, t })}
              </p>
            )}
          </div>
        </div>

        <Form
          {...formProps}
          hook={hook}
          onlyRead
          className={cn(
            "grid grid-cols-1 gap-3 max-md:flex max-md:flex-col max-md:p-2 lg:grid-cols-2"
          )}
        />
      </div>
    </DataForm>
  );
};
