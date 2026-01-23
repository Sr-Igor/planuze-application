"use client";

import { LoaderCircle } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";

import { useSignOut } from "../../../../../packages/cookies/src";
import { CenterTemplate } from "../center";

export interface LoaderTemplateProps {
  inConfig?: boolean;
}

export const LoaderTemplate = ({ inConfig }: LoaderTemplateProps) => {
  const t = useLang();

  const { out } = useSignOut();

  return (
    <CenterTemplate>
      {/* {inConfig && ( */}
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-bold">{t.helper("configuring_access")}</h1>
        <h3 className="text-muted-foreground text-lg">{t.helper("redirecting_in")}</h3>
      </div>
      {/* )} */}

      <LoaderCircle className="animate-spin" size={100} />
      <Button className="mt-10" variant="destructive" onClick={() => out()}>
        {t.helper("exit")}
      </Button>
    </CenterTemplate>
  );
};
