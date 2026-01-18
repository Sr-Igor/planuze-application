"use client";

import { useTransition } from "react";

import { useLocale } from "next-intl";
import Image from "next/image";

import { Loader2 } from "lucide-react";

import { usePathname, useRouter } from "@repo/language/navigation";

import { cn } from "@/lib/utils";

import { SimpleSelect } from "@repo/form";
import { languages } from "./options";

export const AppLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLanguage: string | null) => {
    if (!newLanguage || newLanguage === locale) return;

    startTransition(() => {
      try {
        router.push(pathname, { locale: newLanguage as "en" | "pt-BR" });
      } catch (error) {
        console.error("Erro ao alterar idioma:", error);
      }
    });
  };

  return (
    <span className="relative overflow-hidden">
      <span
        className={cn(
          "absolute z-[-1] flex h-full w-full items-center justify-center opacity-0",
          "transition-opacity duration-300 ease-in-out",
          isPending && "z-1 opacity-100"
        )}
      >
        <Loader2 className="size-4 animate-spin" />
      </span>
      <span
        className={cn(
          "overflow-hidden",
          "transition-opacity duration-300 ease-in-out",
          isPending && "opacity-0"
        )}
      >
        <SimpleSelect
          className="bg-background border-2"
          options={languages}
          value={locale}
          clearable={false}
          onChange={handleLanguageChange}
          formatterOptions={({ item, label }) => (
            <div className="flex items-center gap-2">
              {item?.flag && <Image src={item.flag} alt={label} width={20} height={20} />}
              <span>{label}</span>
            </div>
          )}
          customSelect={(item) => {
            return (
              <div>
                {item?.flag && <Image src={item.flag} alt={item.name} width={20} height={20} />}
              </div>
            );
          }}
        />
      </span>
    </span>
  );
};
