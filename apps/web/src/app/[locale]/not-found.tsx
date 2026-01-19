"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";

import { CenterTemplate } from "@/templates/center";

export default function NotFound() {
  const { replace } = useRouter();
  const t = useLang();

  return (
    <CenterTemplate>
      <>
        <Image alt="not found" src={"/images/not_found.gif"} width={150} height={150} />
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
