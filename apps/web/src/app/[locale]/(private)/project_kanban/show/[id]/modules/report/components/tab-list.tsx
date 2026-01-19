import { FileDown } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";

import { cn } from "@repo/ui";

import { useKanbanShow } from "../../../context";
import { tabs } from "../constants";

export const TabList = () => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { params, setParams, callers, loadings } = useKanbanShow();

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="bg-muted flex items-center justify-between overflow-hidden rounded-sm">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            onClick={() => setParams({ ...params, report_tab: tab.value })}
            className={cn(
              "flex h-full w-full flex-1 cursor-pointer items-center justify-center gap-1 p-2 text-xs font-medium",
              params.report_tab === tab.value && "bg-foreground text-background"
            )}
          >
            {tab.icon}
            <p className="hidden xl:block">{t(`report.tab.${tab.value}`)}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => callers.report.onExport()}
        loading={loadings.report.exported}
        size="sm"
        variant="outline"
      >
        <FileDown className="h-4 w-4" />
        <p className="hidden xl:block">{t("report.export")}</p>
      </Button>
    </div>
  );
};
