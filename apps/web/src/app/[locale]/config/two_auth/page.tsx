"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { KeyRound, Mail, Phone } from "lucide-react";

import { useLang } from "@repo/language/hook";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  RadioGroup,
  RadioGroupItem,
} from "@repo/ui";

import { useUserTwoAuthCode } from "@/api/callers/user_two_auth_code";
import { user_two_auth } from "@/api/generator/types";
import { useAuth } from "@/hooks/auth";
import { useSignOut } from "@/hooks/cookies/signout";
import { setTwoAuth } from "@/hooks/cookies/two_auth";
import { cn } from "@/lib/utils";
import { CenterTemplate } from "@/templates/center";

const inputClassName = "bg-muted/10 text-muted-foreground border-border bg-sidebar/80";

export default function Page() {
  const t = useLang();
  const { user } = useAuth();
  const auths: user_two_auth[] = user?.user_two_auths?.filter((i) => i.confirmed && i.active) || [];
  const router = useRouter();

  const { out } = useSignOut();

  const [otp, setOtp] = useState("");
  const [view, setView] = useState<"auths" | "code">("auths");
  const [selectedAuth, setSelectedAuth] = useState<user_two_auth | null>(auths[0] || null);

  const { store, confirm } = useUserTwoAuthCode({
    id: selectedAuth?.id,
    callbacks: {
      store: {
        onSuccess: () => setView("code"),
      },
      confirm: {
        onSuccess: () => {
          setTwoAuth(otp);
          router.replace("/hidrate?openProfileModal=true");
        },
      },
    },
  });

  const getIcon = (method: string) => {
    switch (method) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      default:
        return <KeyRound className="h-4 w-4" />;
    }
  };

  return (
    <CenterTemplate>
      <div className="flex h-full w-full flex-col items-center justify-center px-10">
        <h1 className="text-2xl font-bold">{t.page.two_auth("title")}</h1>
        <p className="text-muted-foreground mb-4 text-center text-sm">
          {t.page.two_auth("description")}
        </p>
        <div className="flex flex-col gap-2">
          {view === "auths" && (
            <RadioGroup>
              {auths.map((auth) => (
                <Card
                  key={auth.id}
                  className={cn(
                    "hover:bg-muted flex w-full cursor-pointer flex-row justify-between",
                    selectedAuth?.id === auth.id && "bg-muted border-green-500"
                  )}
                  onClick={() => setSelectedAuth(auth)}
                >
                  <CardHeader className="flex items-start justify-start">
                    <CardTitle className="flex items-center gap-2">
                      {getIcon(auth.method)}
                      <span className="text-sm font-medium first-letter:uppercase">
                        {auth.target}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="flex items-center gap-2">
                    <RadioGroupItem
                      value={auth.id}
                      checked={selectedAuth?.id === auth.id}
                      className="data-[state=checked]:text-primary-background data-[state=checked]:bg-green-500"
                    />
                  </CardFooter>
                </Card>
              ))}
            </RadioGroup>
          )}

          {view === "code" && (
            <div className="mt-5 flex w-full max-w-[320px] items-center justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                onComplete={() => confirm.mutate({ code: otp })}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className={inputClassName} />
                  <InputOTPSlot index={1} className={inputClassName} />
                  <InputOTPSlot index={2} className={inputClassName} />
                  <InputOTPSlot index={3} className={inputClassName} />
                  <InputOTPSlot index={4} className={inputClassName} />
                  <InputOTPSlot index={5} className={inputClassName} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}

          {view === "auths" && (
            <Button
              disabled={!selectedAuth}
              loading={store.isPending}
              onClick={() => {
                store.mutate();
              }}
              className="mt-4"
            >
              {t.page.two_auth("receive_code")}
            </Button>
          )}

          {view === "code" && (
            <>
              <Button
                variant="default"
                onClick={() => confirm.mutate({ code: otp })}
                className="mt-4"
                disabled={otp.length < 6}
              >
                {t.helper("confirm")}
              </Button>
              <Button
                variant="outline"
                onClick={() => setView("auths")}
                className="mt-4"
                disabled={confirm.isPending}
              >
                {t.helper("back")}
              </Button>
            </>
          )}

          <Button
            variant="destructive"
            onClick={() => out()}
            className="mt-4"
            disabled={confirm.isPending}
          >
            {t.helper("exit")}
          </Button>
        </div>
      </div>
    </CenterTemplate>
  );
}
