import { CalendarDays, DecimalsArrowRight, MousePointerClick, PencilLine } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { TabsList, TabsTrigger } from "@repo/ui";
import { AppTooltip } from "@repo/ui/app";

import { cn } from "@repo/ui";

export interface IFilterTabsProps {
  countFilters: {
    selects: number;
    dates: number;
    open: number;
    interval: number;
    total: number;
  };
  tab: string;
  setTab: (tab: string) => void;
  isReport?: boolean;
}

export const Badge = ({ count }: { count: number }) => {
  if (!count) return null;
  return (
    <div className="text-bold flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
      {count > 9 ? "9+" : count}
    </div>
  );
};

export const FilterTabs = ({ countFilters, tab, setTab, isReport = false }: IFilterTabsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const className = `h-full data-[state=active]:bg-transparent`;
  const classNameActive = `text-blue-500`;

  if (isReport) {
    return (
      <TabsList className="p-0">
        <AppTooltip text={t("component.line.selects")}>
          <TabsTrigger
            value="selects"
            onClick={() => setTab?.("selects")}
            className={cn(className, classNameActive)}
          >
            <MousePointerClick />
            <Badge count={countFilters.selects} />
          </TabsTrigger>
        </AppTooltip>
      </TabsList>
    );
  }

  return (
    <TabsList className="p-0">
      <AppTooltip text={t("component.line.selects")}>
        <TabsTrigger
          value="selects"
          onClick={() => setTab?.("selects")}
          className={cn(className, tab === "selects" && classNameActive)}
        >
          <MousePointerClick />
          <Badge count={countFilters.selects} />
        </TabsTrigger>
      </AppTooltip>
      <AppTooltip text={t("component.line.dates")}>
        <TabsTrigger
          value="dates"
          onClick={() => setTab?.("dates")}
          className={cn(className, tab === "dates" && classNameActive)}
        >
          <CalendarDays />
          <Badge count={countFilters.dates} />
        </TabsTrigger>
      </AppTooltip>
      <AppTooltip text={t("component.line.interval")}>
        <TabsTrigger
          value="interval"
          onClick={() => setTab?.("interval")}
          className={cn(className, tab === "interval" && classNameActive)}
        >
          <DecimalsArrowRight />
          <Badge count={countFilters.interval} />
        </TabsTrigger>
      </AppTooltip>
      <AppTooltip text={t("component.line.open")}>
        <TabsTrigger
          value="open"
          onClick={() => setTab?.("open")}
          className={cn(className, tab === "open" && classNameActive)}
        >
          <PencilLine />
          <Badge count={countFilters.open} />
        </TabsTrigger>
      </AppTooltip>
    </TabsList>
  );
};
