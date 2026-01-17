import { BookOpen, Eye, History, Paperclip } from "lucide-react";

import { project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { Separator, TabsList, TabsTrigger } from "@repo/ui";

export interface ITabButtonsProps {
  item?: project_kanban_cycle_card | null;
}

const listClassName = "bg-secondary border-foreground/10 h-10 w-full rounded-none border p-0";
const triggerClassName =
  "text-foreground m-0 h-full flex-1 rounded-none data-[state=active]:bg-foreground/10 px-4";
const separatorClassName = "bg-foreground/10";

export const TabButtons = ({ item }: ITabButtonsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <TabsList className={listClassName}>
      <TabsTrigger value="details" className={triggerClassName}>
        <BookOpen />
        <span className="hidden md:block">{t("card-form-edit.details")}</span>
      </TabsTrigger>
      <Separator orientation="vertical" className={separatorClassName} />
      <TabsTrigger value="logs" className={triggerClassName}>
        <History />
        <span className="hidden md:block">{t("card-form-edit.history")}</span>
      </TabsTrigger>
      <Separator orientation="vertical" className={separatorClassName} />
      <TabsTrigger value="views" className={triggerClassName}>
        <Eye />
        <span className="hidden md:block">{t("card-form-edit.views")}</span>
      </TabsTrigger>
      <Separator orientation="vertical" className={separatorClassName} />
      <TabsTrigger value="files" className={triggerClassName}>
        <Paperclip />
        <span className="hidden md:block">
          {t("card-form-edit.files")} ({item?.project_kanban_cycle_card_files?.length})
        </span>
      </TabsTrigger>
    </TabsList>
  );
};
