"use client";

import { useClean } from "@repo/cookies";
import { useLang } from "@repo/language/hooks";
import { CenterTemplate } from "@repo/templates";
import { Button } from "@repo/ui";

import { WavyBackground } from "./waves";

export const LoaderTemplate = () => {
  const t = useLang();

  const { clean } = useClean();

  return (
    <WavyBackground>
      <CenterTemplate>
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-bold">{t.helper("configuring_access")}</h1>
          <h3 className="text-muted-foreground text-lg">{t.helper("redirecting_in")}</h3>
        </div>

        <Button className="mt-[300px]" variant="destructive" onClick={() => clean()}>
          {t.helper("exit")}
        </Button>
      </CenterTemplate>
    </WavyBackground>
  );
};
