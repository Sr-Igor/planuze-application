"use client";

import { useParams, useRouter } from "next/navigation";

import { useLang } from "@repo/language/hook";

import { useProfile } from "@/api/callers/profile";
import { profile } from "@/api/generator/types";
import { AppAvatar } from "@/components/ui/app-avatar";
import { useIntlFormat } from "@/hooks/intl-format";
import { useLogs } from "@/hooks/logs";
import { useUnload } from "@/hooks/unload";
import { cn } from "@/lib/utils";
import { DataForm } from "@/templates/data-form";
import { useShow } from "@/templates/show/context";
import { hookValidate } from "@/utils/submitForm";
import { timeLabel } from "@/utils/timeLabel";

import { useAnonymousForm } from "./use-anonymous-form";
import { useProfileForm } from "./use-profile-form";

export const Data = () => {
  const { id } = useParams();

  const logs = useLogs();

  const { dates } = useIntlFormat();

  const router = useRouter();
  const t = useLang();
  const { data, handleState, permissions, profile } = useShow<profile>();

  const canEdit = data?.id ? permissions.update : permissions.store;

  const { update, store } = useProfile({
    id: data?.id,
    callbacks: {
      update: {
        onSuccess: () => handleState({ loading: false }),
        onError: () => handleState({ loading: false }),
      },
      store: {
        onSuccess: (d) => router.replace(`/profile/show/${(d as profile).id}`),
      },
    },
  });
  const isLoading = update.isPending || store.isPending;

  const formProfile = useProfileForm({
    data,
    disabled: !canEdit || isLoading,
    profile,
  });

  const formAnonymous = useAnonymousForm({
    data,
    disabled: !canEdit || isLoading,
  });

  const formProps = !id || data?.anonymous ? formAnonymous : formProfile;

  useUnload(formProps.isDirty, (dirty) => handleState({ dirty }));

  const handleSubmit = () => {
    const hooks = [{ hook: formProps.hook, data }];
    hookValidate(hooks, (form) => {
      handleState({ loading: true });
      data?.id ? update.mutate(form) : store.mutate(form);
    });
  };

  const handleDiscard = () => {
    formProps.hook.reset(data || {});
    handleState({ dirty: false });
  };

  return (
    <DataForm
      data={data}
      isDirty={formProps.isDirty}
      isError={formProps.isError}
      loading={update.isPending}
      handleSubmit={handleSubmit}
      handleDiscard={handleDiscard}
      handleCancel={() => {
        formProps.isDirty ? handleState({ cancel: true }) : router.back();
      }}
      logs={logs.profile()}
    >
      <div className="flex flex-col gap-5">
        {!data?.anonymous && id && (
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
        )}

        <formProps.Form
          {...formProps.formProps}
          hook={formProps.hook}
          className={cn(
            "grid grid-cols-1 gap-3 max-md:flex max-md:flex-col max-md:p-2 lg:grid-cols-2"
          )}
          onSubmit={(e) => {
            e.preventDefault();
            formProps.isDirty && handleSubmit();
          }}
        />
      </div>
    </DataForm>
  );
};
