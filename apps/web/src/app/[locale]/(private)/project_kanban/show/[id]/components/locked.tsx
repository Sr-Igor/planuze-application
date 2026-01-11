import { Ban } from "lucide-react";

import { useLang } from "@repo/language/hook";

import { cn } from "@/lib/utils";

export const Locked = () => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 z-50 mt-[20px] flex h-[calc(100%-80px)] w-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden"
      )}
    >
      <Ban className="text-destructive" size={80} />
      <h3 className="text-2xl font-bold">{t("component.locked.title")}</h3>
      <p className="text-muted-foreground text-xl">{t("component.locked.description")}</p>
    </div>
  );
};
