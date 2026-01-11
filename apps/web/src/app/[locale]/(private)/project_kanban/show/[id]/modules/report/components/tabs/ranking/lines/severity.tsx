import { useLang } from "@repo/language/hook";

import { ICriticalCard } from "@/api/callers/project_kanban_report/types";

export interface iLineSeverityProps {
  card: ICriticalCard;
}

export const LineSeverity = ({ card }: iLineSeverityProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div key={card.id} className="border-border rounded-md border p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="font-medium">
            #{card.publicId} - {card.title}
          </p>
          <p className="text-muted-foreground text-sm">
            {card.assignee} • {card.column}
          </p>
        </div>
        <span className="rounded-md border bg-red-500/50 px-2 py-1 text-xs font-bold text-white">
          {t("report.rank.line.days_late", { days: card.daysLate })}
        </span>
      </div>
    </div>
  );
};
