"use client";

import { CircleCheck, PackageOpen, Pen, Plus, RefreshCw, Trash } from "lucide-react";

import { user_two_auth } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui-new";
import { AppDialog, StatusCircle } from "@repo/ui-new";

import { Form } from "@repo/form";

import { NeedRedefine } from "../../components/NeedRedefine";
import { usePage } from "./hooks/use-page";

export const TwoFactor = () => {
  const t = useLang();

  const {
    getIcon,
    form,
    confirmForm,
    destroyForm,
    store,
    update,
    destroy,
    resend,
    confirm,
    setState,
    state,
    user,
    handleSubmit,
    handleDestroy,
    handleConfirm,
  } = usePage();

  const auths: user_two_auth[] = user?.user_two_auths || [];
  const { dates } = useIntlFormat();
  const needRedefine = user?.need_reset;
  const isLoading = update.isPending || store.isPending;

  return (
    <div className="relative flex h-full w-full flex-col justify-between gap-3 p-2 sm:gap-4 sm:p-3 md:p-5">
      {needRedefine && <NeedRedefine user={user} />}

      {!needRedefine && (
        <>
          <div className="flex flex-col gap-10 p-10">
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setState({ ...state, open: true, modal: "store", item: null });
                }}
              >
                <Plus className="h-4 w-4" />
                {t.page.my_profile("show.two_factor.add")}
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {auths?.map((auth) => (
                <Card key={auth.id} className="flex w-full flex-row justify-between">
                  <CardHeader className="flex items-start justify-start">
                    <CardTitle className="flex items-center gap-2">
                      {getIcon(auth.method)}
                      <span className="text-sm font-medium first-letter:uppercase">
                        {auth.target}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {t.page.my_profile("show.two_factor.confirmed")}:{" "}
                      </span>
                      <StatusCircle status={auth.confirmed} className="h-4 w-4" />
                    </CardDescription>
                    <CardDescription className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {t.page.my_profile("show.two_factor.active")}:{" "}
                      </span>
                      <StatusCircle status={auth.active} className="h-4 w-4" />
                    </CardDescription>
                    <CardDescription className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {t.page.my_profile("show.two_factor.confirmed_in")}:{" "}
                      </span>
                      <span className="text-xs font-medium">
                        {dates.formatDate(auth.confirmed_in)}
                      </span>
                    </CardDescription>
                    <CardDescription className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {t.page.my_profile("show.two_factor.created_at")}:{" "}
                      </span>
                      <span className="text-xs font-medium">
                        {dates.formatDate(auth.createdAt)}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center gap-2">
                    {!auth.confirmed && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() =>
                            setState({ ...state, open: true, item: auth, modal: "confirm" })
                          }
                        >
                          <CircleCheck />
                          {t.helper("confirm")}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => resend.mutate(auth.id)}
                          loading={resend.isPending}
                        >
                          <RefreshCw />
                          {t.helper("resend")}
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      onClick={() =>
                        setState({ ...state, open: true, item: auth, modal: "update" })
                      }
                    >
                      <Pen />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setState({ ...state, open: true, item: auth, modal: "exclude" })
                      }
                    >
                      <Trash />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {!auths.length && (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-2">
                  <PackageOpen size={60} />
                  <p className="text-muted-foreground text-md">
                    {t.page.my_profile("show.two_factor.no_auths")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <AppDialog
            title={t.page.my_profile("show.two_factor.modal.title")}
            description={t.page.my_profile("show.two_factor.modal.description")}
            open={state.open && (state.modal === "store" || state.modal === "update")}
            loading={isLoading}
            onOpenChange={(open) => setState({ ...state, open, item: null })}
            footer={
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                disabled={!form.isDirty || form.isError}
                color="primary"
              >
                {t.helper("save")}
              </Button>
            }
          >
            <div className="flex flex-col gap-2">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                fields={form.formProps.fields}
                hook={form.hook}
                className="grid grid-cols-2 gap-4"
              />
            </div>
          </AppDialog>

          <AppDialog
            title={t.page.my_profile("show.two_factor.exclude.title")}
            description={t.page.my_profile("show.two_factor.exclude.description")}
            open={state.open && state.modal === "exclude"}
            loading={isLoading}
            onOpenChange={(open) => setState({ ...state, open, item: null })}
            footer={
              <Button
                loading={destroy.isPending}
                disabled={!destroyForm.isDirty || destroyForm.isError}
                onClick={handleDestroy}
                variant="destructive"
              >
                {t.helper("delete")}
              </Button>
            }
          >
            <div className="flex flex-col gap-2">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDestroy();
                }}
                fields={destroyForm.formProps.fields}
                hook={destroyForm.hook}
                className="grid grid-cols-2 gap-4"
              />
            </div>
          </AppDialog>

          <AppDialog
            title={t.page.my_profile("show.two_factor.confirm.title")}
            description={t.page.my_profile("show.two_factor.confirm.description")}
            open={state.open && state.modal === "confirm"}
            loading={confirm.isPending}
            onOpenChange={(open) => setState({ ...state, open, item: null })}
            footer={
              <Button
                loading={confirm.isPending}
                disabled={!confirmForm.isDirty || confirmForm.isError}
                onClick={handleConfirm}
                color="primary"
              >
                {t.helper("confirm")}
              </Button>
            }
          >
            <div className="flex flex-col gap-2">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConfirm();
                }}
                fields={confirmForm.formProps.fields}
                hook={confirmForm.hook}
                className="grid grid-cols-2 gap-4"
              />
            </div>
          </AppDialog>
        </>
      )}
    </div>
  );
};
