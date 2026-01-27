"use client";

import { useState, useTransition } from "react";

import { useLocale } from "next-intl";
import Image from "next/image";

import { Check, Loader2 } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { usePathname, useRouter } from "@repo/language/navigation";
import {
  Button,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui";

import { languages } from "./options";

export const AppLanguage = () => {
  const t = useLang();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (newLanguage: string | null) => {
    if (!newLanguage || newLanguage === locale) return;

    setOpen(false);
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-auto justify-between border-2 px-3 py-1 text-xs"
            >
              <div className="flex flex-1 items-center gap-2">
                {languages.find((l) => l.value === locale)?.item.flag && (
                  <Image
                    src={languages.find((l) => l.value === locale)?.item?.flag as any}
                    alt={locale}
                    width={20}
                    height={20}
                  />
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={`${t.helper("search_language")}`} />
              <CommandList>
                <CommandEmpty>{t.helper("no_language_found")}</CommandEmpty>
                <CommandGroup>
                  {languages.map((language) => (
                    <CommandItem
                      key={language.value}
                      value={language.value}
                      onSelect={() => handleLanguageChange(language.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          locale === language.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex items-center gap-2">
                        {language.item.flag && (
                          <Image
                            src={language.item.flag}
                            alt={language.label}
                            width={20}
                            height={20}
                          />
                        )}
                        <span>{language.label}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </span>
    </span>
  );
};
