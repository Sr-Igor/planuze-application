"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { differenceInSeconds } from "date-fns";
import { LogOut } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui";
import { AppCountdown } from "@repo/ui";

import { useAuth } from "@repo/api/web/callers/auth";
import { useSignOut } from "@repo/cookies";
import { useAppDispatch, useAppSelector } from "@repo/redux/hook";
import { update } from "@repo/redux/store/modules/user/actions";
import { CenterTemplate } from "@/templates/center";

const TIME = 1;

export default function Page() {
  const mode = useParams()?.mode as string;
  const t = useLang();

  const [resend, setResend] = useState<number>(-1);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const codeDate = new Date(
    mode === "confirm" ? user?.confirm_date || "" : user?.recovery_date || ""
  );

  useEffect(() => {
    const diff = codeDate ? differenceInSeconds(new Date(), codeDate) : TIME;

    if (isNaN(diff) || (diff > TIME * 60 && !user?.confirmed)) confirm.mutate();

    setTimeout(() => {
      setResend(0);
    }, 1000);
  }, []);

  const { out } = useSignOut();

  const { confirm, code } = useAuth({
    callbacks: {
      confirm: {
        onSuccess: () => {
          const date = new Date().toISOString();
          const data = mode === "confirm" ? { confirm_date: date } : { recovery_date: date };

          dispatch(update(data));
          setResend(0);
        },
        onError: () => {
          setResend(1);
        },
      },
      code: {
        onSuccess: (e) => {
          dispatch(update(e));
          router.replace(mode === "confirm" ? "/config/welcome" : "/dashboard");
        },
      },
    },
  });

  const [otp, setOtp] = useState("");

  const inputClassName = "bg-muted/10 text-muted-foreground border-border bg-sidebar/80";

  return (
    <CenterTemplate>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{t.page.code("title", { mode: t.page.code(mode) })}</h1>
        <p className="text-muted-foreground text-md text-center">{t.page.code("description")}</p>

        <div className="mt-5">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            onComplete={() => code.mutate(otp)}
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

        <div className="flex h-8 w-full max-w-[320px] items-center justify-end gap-2">
          {resend === 1 && (
            <Button
              variant="link"
              size="sm"
              disabled={confirm.isPending}
              onClick={() => confirm.mutate()}
            >
              {t.helper("send_again")}
            </Button>
          )}

          {resend === 0 && (
            <>
              <p className="text-muted-foreground text-sm">{t.helper("resend_in")}</p>
              <AppCountdown
                expire={TIME}
                onExpire={() => {
                  setResend(1);
                }}
                date={codeDate || new Date()}
                className="text-muted-foreground text-sm"
              />
            </>
          )}
        </div>

        <Button
          className="w-full max-w-[320px]"
          onClick={() => code.mutate(otp)}
          disabled={otp.length < 6}
          loading={code.isPending || confirm.isPending}
        >
          {t.helper("confirm")}
        </Button>
        <Button
          variant="destructive"
          className="w-full max-w-[120px]"
          onClick={() => out()}
          disabled={code.isPending || confirm.isPending}
        >
          <LogOut />
          {t.helper("exit")}
        </Button>
      </div>
    </CenterTemplate>
  );
}
