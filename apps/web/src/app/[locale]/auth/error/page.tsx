"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { ChevronLeft, CircleX } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui-new";

import { CenterTemplate } from "@/templates/center";

import * as classes from "./styles";

export default function LoginPage() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const t = useLang();

  return (
    <CenterTemplate>
      <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-10">
        <CircleX className="text-red-500" size={108} />
        <p className={classes.errorMessage}>{error || t.error("error_unexpected")}</p>
        <Button onClick={() => replace("/")}>
          <ChevronLeft />
          <span>{t.helper("back")}</span>
        </Button>
      </div>
    </CenterTemplate>
  );
}
