import { Kanban, Loader2 } from "lucide-react";

import { useLang } from "@repo/language/hooks";

import { cn } from "@repo/ui-new";

export interface LoaderProps {
  loading: boolean;
}

export const Loader = ({ loading }: LoaderProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div
      className={cn(
        "border-border bg-sidebar absolute top-0 left-0 z-50 mt-[20px] flex h-[calc(100%-40px)] w-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-md border",
        "opacity-100",
        "transition-opacity duration-300 ease-in-out",
        !loading && "pointer-events-none opacity-0"
      )}
    >
      <Kanban className="rotate-180 animate-bounce" size={80} />
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin" size={20} />
        <p className="animate-pulse">{t("component.loader.loading")}</p>
      </div>
    </div>
  );
};
