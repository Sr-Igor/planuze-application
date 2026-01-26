"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { NotFoundGif } from "@repo/assets";
import { useLang } from "@repo/language/hooks";
import { CenterTemplate } from "@repo/templates";
import { Button } from "@repo/ui";

export default function NotFound() {
  const { replace } = useRouter();
  const t = useLang();

  return (
    <CenterTemplate>
      <>
        <Image alt="not found" src={NotFoundGif} width={150} height={150} />
        <h1 className="text-muted-foreground pb-5 text-center text-xl font-semibold">
          {t.helper("not_found_page")}
        </h1>
        <Button onClick={() => replace("/")}>
          <ChevronLeft />
          <span>{t.helper("back")}</span>
        </Button>
      </>
    </CenterTemplate>
  );
}
